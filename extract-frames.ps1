param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$InputVideo,

    [Parameter(Position = 1)]
    [string]$OutputDir = "",

    [ValidateSet("png", "jpg", "jpeg", "webp")]
    [string]$Format = "png",

    [int]$EveryNFrame = 1,

    [switch]$Overwrite
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $false

if ($EveryNFrame -lt 1) {
    throw "EveryNFrame must be an integer greater than or equal to 1."
}

if (-not (Test-Path -LiteralPath $InputVideo)) {
    throw "Input video not found: $InputVideo"
}

$resolvedInput = (Resolve-Path -LiteralPath $InputVideo).Path
$videoInfo = Get-Item -LiteralPath $resolvedInput
$videoName = [System.IO.Path]::GetFileNameWithoutExtension($videoInfo.Name)
$videoDir = $videoInfo.DirectoryName

if ([string]::IsNullOrWhiteSpace($OutputDir)) {
    $OutputDir = Join-Path $videoDir "$videoName`_frames"
}

if (-not (Test-Path -LiteralPath $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

$resolvedOutput = (Resolve-Path -LiteralPath $OutputDir).Path

$scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$ffmpegExe = $null
$localCandidates = @(
    (Join-Path $scriptRoot "ffmpeg\\bin\\ffmpeg.exe"),
    (Join-Path $scriptRoot "ffmpeg.exe")
)
foreach ($candidate in $localCandidates) {
    if (Test-Path -LiteralPath $candidate) {
        $ffmpegExe = $candidate
        break
    }
}
if ($null -eq $ffmpegExe) {
    $ffmpegCmd = Get-Command ffmpeg -ErrorAction SilentlyContinue
    if ($null -ne $ffmpegCmd) {
        $ffmpegExe = $ffmpegCmd.Source
    }
}
if ($null -eq $ffmpegExe) {
    throw "ffmpeg was not found. Install ffmpeg and add it to PATH, or place ffmpeg.exe at .\\ffmpeg\\bin\\ffmpeg.exe"
}

$extension = if ($Format -eq "jpeg") { "jpg" } else { $Format }
$outputPattern = Join-Path $resolvedOutput "frame_%06d.$extension"

$ffmpegArgs = @("-hide_banner", "-stats")

if ($Overwrite.IsPresent) {
    $ffmpegArgs += "-y"
} else {
    $ffmpegArgs += "-n"
}

$ffmpegArgs += @("-i", $resolvedInput)

if ($EveryNFrame -gt 1) {
    $ffmpegArgs += @("-vf", "select='not(mod(n\,$EveryNFrame))'", "-fps_mode", "vfr")
} else {
    $ffmpegArgs += @("-fps_mode", "passthrough")
}

if ($extension -eq "jpg") {
    # 2 is high quality for JPEG output.
    $ffmpegArgs += @("-q:v", "2")
}

$ffmpegArgs += $outputPattern

Write-Host "Starting frame extraction..."
Write-Host "Input: $resolvedInput"
Write-Host "Output folder: $resolvedOutput"
Write-Host "Format: $extension"
if ($EveryNFrame -gt 1) {
    Write-Host "Mode: keep 1 frame every $EveryNFrame frames"
} else {
    Write-Host "Mode: extract every frame"
}

& $ffmpegExe @ffmpegArgs

if ($LASTEXITCODE -ne 0) {
    throw "ffmpeg failed with exit code: $LASTEXITCODE"
}

Write-Host "Done. Frames saved to: $resolvedOutput"
