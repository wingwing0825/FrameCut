Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$PSNativeCommandUseErrorActionPreference = $false

$script:scriptRoot = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$script:lastOutputFolder = ""
$script:isRunning = $false
$script:eagleApiBase = "http://localhost:41595/api/v2"
$script:eagleFolderMap = @{}

function Convert-UnicodeEscapes([string]$text) {
    return [System.Text.RegularExpressions.Regex]::Replace(
        $text,
        "\\u([0-9a-fA-F]{4})",
        { param($m) [char][Convert]::ToInt32($m.Groups[1].Value, 16) }
    )
}

$rawText = [ordered]@{
    AppTitle          = "FrameCut"
    Subtitle          = "\u9069\u7528\u65bc Live2D \u52d5\u4f5c\u53c3\u8003"
    GroupStep1        = "\u6b65\u9a5f 1\uff1a\u9078\u64c7\u5f71\u7247"
    VideoPathLabel    = "\u5f71\u7247\u6a94\u6848"
    BrowseVideo       = "\u9078\u64c7\u5f71\u7247"
    VideoHint         = "\u652f\u63f4\u683c\u5f0f\uff1amp4 / mov / mkv / avi / webm / flv / wmv"
    DragHint          = "\u4e5f\u53ef\u4ee5\u628a\u5f71\u7247\u62d6\u66f3\u5230\u4e0a\u65b9\u8f38\u5165\u6846"
    FileInfoLabel     = "\u6a94\u6848\u8cc7\u8a0a"
    NoVideoSelected   = "\u5c1a\u672a\u9078\u64c7\u5f71\u7247"
    FileInfoFormat    = "\u6a94\u540d\uff1a{0}    \u5927\u5c0f\uff1a{1:N2} MB    \u4fee\u6539\u6642\u9593\uff1a{2:yyyy-MM-dd HH:mm:ss}"
    AppFolderHint     = "\u5de5\u5177\u8cc7\u6599\u593e\uff1a"

    GroupStep2        = "\u6b65\u9a5f 2\uff1a\u8f38\u51fa\u8a2d\u5b9a"
    OutputModeLabel   = "\u8f38\u51fa\u4f4d\u7f6e"
    AutoOutput        = "\u81ea\u52d5\u5efa\u7acb\u5728\u672c\u5de5\u5177\u8cc7\u6599\u593e"
    CustomOutput      = "\u81ea\u8a02\u8f38\u51fa\u7236\u8cc7\u6599\u593e"
    ChooseFolder      = "\u9078\u64c7\u8cc7\u6599\u593e"
    AutoPreviewLabel  = "\u81ea\u52d5\u8f38\u51fa\u9810\u89bd"
    OutputPreviewLabel = "\u8f38\u51fa\u5f8c\u8cc7\u6599\u593e"
    OutputPreviewTip  = "\u7cfb\u7d71\u6703\u81ea\u52d5\u5efa\u7acb\u4e0d\u91cd\u8907\u7684\u8cc7\u6599\u593e\u540d\u7a31\u3002"
    FormatLabel       = "\u5716\u7247\u683c\u5f0f"
    FormatPng         = "PNG\uff08\u7121\u5931\u771f\uff09"
    FormatJpg         = "JPG\uff08\u6a94\u6848\u8f03\u5c0f\uff09"
    FormatWebp        = "WEBP\uff08\u58d3\u7e2e\u4f73\uff09"
    EveryNLabel       = "\u6bcf N \u5075\u8f38\u51fa 1 \u5f35"
    EveryNHelp        = "1 = \u6bcf\u4e00\u5075\u90fd\u8f38\u51fa"
    Overwrite         = "\u8986\u84cb\u5df2\u5b58\u5728\u6a94\u6848"
    TooltipEveryN     = "\u8a2d\u5b9a\u70ba 1 \u4ee3\u8868\u6bcf\u4e00\u5075\u90fd\u8f38\u51fa\uff0c\u8a2d\u5b9a\u70ba 2 \u4ee3\u8868\u6bcf 2 \u5075\u8f38\u51fa 1 \u5f35\u3002"
    TooltipAuto       = "\u81ea\u52d5\u6a21\u5f0f\u6703\u5728\u672c\u5de5\u5177\u8cc7\u6599\u593e\u5efa\u7acb\u65b0\u8cc7\u6599\u593e\uff0c\u4e0d\u6703\u8986\u84cb\u820a\u5c08\u6848\u3002"
    TooltipCustom     = "\u81ea\u8a02\u6a21\u5f0f\u6703\u5728\u4f60\u9078\u7684\u7236\u8cc7\u6599\u593e\u5e95\u4e0b\u5efa\u7acb <\u5f71\u7247\u540d>_frames\u3002"
    EagleImport       = "\u8f49\u63db\u5f8c\u532f\u5165 Eagle App\uff08\u672c\u6a5f\uff09"
    EagleFolderLabel  = "Eagle \u5206\u985e"
    LoadEagleFolders  = "\u8f09\u5165 Eagle \u5206\u985e"
    EagleFolderRoot   = "\u6839\u76ee\u9304\uff08\u4e0d\u5206\u985e\uff09"
    EagleFolderHint   = "\u4e0d\u8f09\u5165\u5206\u985e\u4e5f\u53ef\u7528\uff0c\u6703\u532f\u5165\u5230 Eagle \u6839\u76ee\u9304\u3002"
    TooltipEagle      = "\u9700\u8981\u5148\u958b\u555f Eagle \u684c\u9762\u7248\uff0c\u8f49\u63db\u5b8c\u5f8c\u6703\u81ea\u52d5\u532f\u5165\u5716\u7247\u3002"

    GroupStep3        = "\u6b65\u9a5f 3\uff1a\u958b\u59cb\u8f49\u63db"
    Extract           = "\u958b\u59cb\u8f49\u63db"
    OpenOutput        = "\u958b\u555f\u8f38\u51fa\u8cc7\u6599\u593e"
    OpenAppFolder     = "\u958b\u555f\u5de5\u5177\u8cc7\u6599\u593e"
    ClearLog          = "\u6e05\u7a7a\u7d00\u9304"
    BtnClose          = "\u95dc\u9589"

    GroupLog          = "\u8f49\u63db\u7d00\u9304"
    StatusReady       = "\u5c31\u7dd2"
    StatusValidating  = "\u6aa2\u67e5\u8f38\u5165\u4e2d..."
    StatusExtracting  = "\u8f49\u63db\u4e2d..."
    StatusRunning     = "\u57f7\u884c\u4e2d\uff0c\u8acb\u7a0d\u5019..."
    StatusImporting   = "\u532f\u5165 Eagle \u4e2d..."
    StatusDone        = "\u5b8c\u6210"
    StatusError       = "\u767c\u751f\u932f\u8aa4"

    ErrNoFfmpeg       = "\u627e\u4e0d\u5230 ffmpeg\u3002\u8acb\u5b89\u88dd\u5f8c\u52a0\u5165 PATH\uff0c\u6216\u628a ffmpeg.exe \u653e\u5230\u672c\u5de5\u5177\u8cc7\u6599\u593e\\ffmpeg\\bin\\ffmpeg.exe\u3002"
    ErrSelectVideo    = "\u8acb\u5148\u9078\u64c7\u5f71\u7247\u6a94\u6848\u3002"
    ErrVideoNotFound  = "\u627e\u4e0d\u5230\u5f71\u7247\u6a94\u6848\u3002"
    ErrEveryN         = "\u6bcf N \u5075\u5fc5\u9808\u5927\u65bc\u6216\u7b49\u65bc 1\u3002"
    ErrChooseCustom   = "\u8acb\u9078\u64c7\u81ea\u8a02\u8f38\u51fa\u7236\u8cc7\u6599\u593e\u3002"
    ErrCustomNotFound = "\u81ea\u8a02\u8f38\u51fa\u7236\u8cc7\u6599\u593e\u4e0d\u5b58\u5728\u3002"
    ErrEagleNotRunning = "\u627e\u4e0d\u5230 Eagle API\uff08http://localhost:41595\uff09\u3002\u8acb\u5148\u958b\u555f Eagle \u684c\u9762\u7248\u3002"
    OpenOutputFirst   = "\u5c1a\u672a\u6709\u53ef\u958b\u555f\u7684\u8f38\u51fa\u8cc7\u6599\u593e\u3002"

    LogStartTime      = "\u958b\u59cb\u6642\u9593\uff1a"
    LogEndTime        = "\u7d50\u675f\u6642\u9593\uff1a"
    LogInput          = "\u8f38\u5165\u5f71\u7247\uff1a"
    LogOutput         = "\u8f38\u51fa\u8cc7\u6599\u593e\uff1a"
    LogFormat         = "\u5716\u7247\u683c\u5f0f\uff1a"
    LogModeAll        = "\u8f38\u51fa\u898f\u5247\uff1a\u6bcf\u4e00\u5075\u90fd\u8f38\u51fa"
    LogModeEveryNPrefix = "\u8f38\u51fa\u898f\u5247\uff1a\u6bcf "
    LogModeEveryNSuffix = " \u5075\u8f38\u51fa 1 \u5f35"
    LogFfmpegCommand  = "ffmpeg \u53c3\u6578\uff1a"
    LogRunFfmpeg      = "\u958b\u59cb\u57f7\u884c ffmpeg..."
    LogDonePrefix     = "\u8f49\u63db\u5b8c\u6210\uff0c\u7e3d\u5171\u8f38\u51fa "
    LogDoneSuffix     = " \u5f35\u5716\u7247\u3002"
    LogEagleFolderLoadedPrefix = "Eagle \u5206\u985e\u5df2\u8f09\u5165\uff0c\u5171 "
    LogEagleFolderLoadedSuffix = " \u500b\u3002"
    LogEagleImportStart = "\u958b\u59cb\u532f\u5165 Eagle..."
    LogEagleImportTarget = "Eagle \u5206\u985e\uff1a"
    LogEagleImportProgressPrefix = "Eagle \u532f\u5165\u9032\u5ea6\uff1a"
    LogEagleImportDonePrefix = "Eagle \u532f\u5165\u5b8c\u6210\uff0c\u6210\u529f "
    LogEagleImportDoneSuffix = " \u5f35\u3002"
    ClearLogDone      = "\u5df2\u6e05\u7a7a\u7d00\u9304\u3002"

    MsgDoneTitle      = "\u8f49\u63db\u5b8c\u6210"
    MsgInstallTitle   = "\u5b89\u88dd\u63d0\u793a"
    MsgInstallFfmpeg  = "\u5075\u6e2c\u5230\u5c1a\u672a\u627e\u5230 ffmpeg\u3002\u53ef\u5b89\u88dd\u5f8c\u52a0\u5165 PATH\uff0c\u6216\u628a ffmpeg.exe \u653e\u5230\u672c\u5de5\u5177\u8cc7\u6599\u593e\\ffmpeg\\bin\\ffmpeg.exe\u3002"
    MsgErrorTitle     = "\u932f\u8aa4"
    MsgSuccessTitle   = "\u6210\u529f"

    OpenVideoFilter   = "\u5f71\u7247\u6a94\u6848|*.mp4;*.mov;*.mkv;*.avi;*.webm;*.flv;*.wmv|\u6240\u6709\u6a94\u6848|*.*"
    OpenVideoTitle    = "\u8acb\u9078\u64c7\u5f71\u7247\u6a94\u6848"
    OpenFolderDesc    = "\u8acb\u9078\u64c7\u8f38\u51fa\u7236\u8cc7\u6599\u593e"
}

$script:T = @{}
foreach ($key in $rawText.Keys) {
    $script:T[$key] = Convert-UnicodeEscapes -text ([string]$rawText[$key])
}

function Test-FfmpegAvailable {
    return $null -ne (Get-FfmpegExecutable)
}

function Get-FfmpegExecutable {
    $localCandidates = @(
        (Join-Path $script:scriptRoot "ffmpeg\\bin\\ffmpeg.exe"),
        (Join-Path $script:scriptRoot "ffmpeg.exe")
    )

    foreach ($candidate in $localCandidates) {
        if (Test-Path -LiteralPath $candidate) {
            return $candidate
        }
    }

    $cmd = Get-Command ffmpeg -ErrorAction SilentlyContinue
    if ($null -ne $cmd) {
        return $cmd.Source
    }

    return $null
}

function Get-VideoName([string]$videoPath) {
    if ([string]::IsNullOrWhiteSpace($videoPath)) {
        return "video"
    }
    return [System.IO.Path]::GetFileNameWithoutExtension($videoPath)
}

function Get-UniqueFolderPath([string]$baseFolder) {
    if (-not (Test-Path -LiteralPath $baseFolder)) {
        return $baseFolder
    }

    $index = 2
    while ($true) {
        $candidate = "$baseFolder`_$index"
        if (-not (Test-Path -LiteralPath $candidate)) {
            return $candidate
        }
        $index++
    }
}

function Get-AutoBaseFolder([string]$videoPath) {
    $name = Get-VideoName -videoPath $videoPath
    return Join-Path $script:scriptRoot "$name`_frames"
}

function Resolve-TargetOutputFolder([string]$videoPath, [bool]$useAutoOutput, [string]$customParentFolder) {
    $videoName = Get-VideoName -videoPath $videoPath

    if ($useAutoOutput) {
        $basePath = Get-AutoBaseFolder -videoPath $videoPath
        return Get-UniqueFolderPath -baseFolder $basePath
    }

    if ([string]::IsNullOrWhiteSpace($customParentFolder)) {
        throw $script:T.ErrChooseCustom
    }

    if (-not (Test-Path -LiteralPath $customParentFolder)) {
        throw $script:T.ErrCustomNotFound
    }

    $customBase = Join-Path $customParentFolder "$videoName`_frames"
    return Get-UniqueFolderPath -baseFolder $customBase
}

function Format-DisplayArgs([string[]]$args) {
    return ($args | ForEach-Object {
            if ($_ -match "\s") {
                '"' + $_.Replace('"', '\"') + '"'
            } else {
                $_
            }
        }) -join " "
}

function Append-Log([string]$line) {
    if ([string]::IsNullOrWhiteSpace($line)) {
        return
    }

    $script:txtLog.AppendText($line + [Environment]::NewLine)
    $script:txtLog.SelectionStart = $script:txtLog.TextLength
    $script:txtLog.ScrollToCaret()
    [System.Windows.Forms.Application]::DoEvents() | Out-Null
}

function Update-CustomFolderEnabled {
    $enabled = $script:rbCustom.Checked -and (-not $script:isRunning)
    $script:txtCustomFolder.Enabled = $enabled
    $script:btnBrowseFolder.Enabled = $enabled
}

function Set-InputsEnabled([bool]$enabled) {
    $script:txtVideoPath.Enabled = $enabled
    $script:btnBrowseVideo.Enabled = $enabled
    $script:rbAuto.Enabled = $enabled
    $script:rbCustom.Enabled = $enabled
    $script:cmbFormat.Enabled = $enabled
    $script:numEveryN.Enabled = $enabled
    $script:chkOverwrite.Enabled = $enabled
    $script:btnExtract.Enabled = $enabled
    $script:btnClearLog.Enabled = $enabled
    $script:btnOpenAppFolder.Enabled = $enabled
    $script:btnClose.Enabled = $enabled
    $script:chkImportEagle.Enabled = $enabled

    if (-not $enabled) {
        $script:btnOpenOutput.Enabled = $false
    } else {
        $script:btnOpenOutput.Enabled = (-not [string]::IsNullOrWhiteSpace($script:lastOutputFolder)) -and (Test-Path -LiteralPath $script:lastOutputFolder)
    }

    Update-CustomFolderEnabled
    Update-EagleControlsEnabled
}

function Set-RunningState([bool]$running, [string]$statusText) {
    $script:isRunning = $running
    Set-InputsEnabled -enabled (-not $running)

    if ($running) {
        $script:progressBar.Style = [System.Windows.Forms.ProgressBarStyle]::Marquee
        $script:progressBar.MarqueeAnimationSpeed = 30
    } else {
        $script:progressBar.Style = [System.Windows.Forms.ProgressBarStyle]::Blocks
        $script:progressBar.MarqueeAnimationSpeed = 0
        $script:progressBar.Value = 0
    }

    $script:statusLabel.Text = $statusText
    [System.Windows.Forms.Application]::DoEvents() | Out-Null
}

function Refresh-VideoInfo {
    $videoPath = $script:txtVideoPath.Text.Trim()
    if ([string]::IsNullOrWhiteSpace($videoPath) -or -not (Test-Path -LiteralPath $videoPath)) {
        $script:lblFileInfoValue.Text = $script:T.NoVideoSelected
        return
    }

    $file = Get-Item -LiteralPath $videoPath
    $sizeMb = [Math]::Round(($file.Length / 1MB), 2)
    $script:lblFileInfoValue.Text = [string]::Format($script:T.FileInfoFormat, $file.Name, $sizeMb, $file.LastWriteTime)
}

function Refresh-OutputPreview {
    $videoPath = $script:txtVideoPath.Text.Trim()

    $script:txtAutoFolder.Text = Get-AutoBaseFolder -videoPath $videoPath

    try {
        if ([string]::IsNullOrWhiteSpace($videoPath)) {
            $script:txtOutputPreview.Text = $script:T.ErrSelectVideo
            return
        }

        if ($script:rbAuto.Checked) {
            $preview = Resolve-TargetOutputFolder -videoPath $videoPath -useAutoOutput $true -customParentFolder ""
            $script:txtOutputPreview.Text = $preview
            return
        }

        if ([string]::IsNullOrWhiteSpace($script:txtCustomFolder.Text.Trim())) {
            $script:txtOutputPreview.Text = $script:T.ErrChooseCustom
            return
        }

        $previewCustom = Resolve-TargetOutputFolder -videoPath $videoPath -useAutoOutput $false -customParentFolder $script:txtCustomFolder.Text.Trim()
        $script:txtOutputPreview.Text = $previewCustom
    }
    catch {
        $script:txtOutputPreview.Text = $_.Exception.Message
    }
}

function Get-SelectedExtension {
    switch ($script:cmbFormat.SelectedIndex) {
        1 { return "jpg" }
        2 { return "webp" }
        default { return "png" }
    }
}

function Invoke-EagleApi([string]$method, [string]$path, $body = $null) {
    $uri = $script:eagleApiBase + $path
    $params = @{
        Method      = $method
        Uri         = $uri
        ErrorAction = "Stop"
    }

    if ($null -ne $body) {
        $params["ContentType"] = "application/json"
        $params["Body"] = ($body | ConvertTo-Json -Depth 12 -Compress)
    }

    $response = Invoke-RestMethod @params
    if ($null -eq $response) {
        throw "Empty Eagle API response."
    }
    if ($response.status -ne "success") {
        if (-not [string]::IsNullOrWhiteSpace([string]$response.message)) {
            throw [string]$response.message
        }
        throw "Eagle API request failed."
    }
    return $response.data
}

function Test-EagleAvailable {
    try {
        [void](Invoke-EagleApi -method "GET" -path "/app/info")
        return $true
    }
    catch {
        return $false
    }
}

function Add-EagleFolderNode($node, [string]$parentPath, [System.Collections.Generic.List[object]]$flatList) {
    if ($null -eq $node) { return }
    $name = [string]$node.name
    if ([string]::IsNullOrWhiteSpace($name)) { return }

    $display = if ([string]::IsNullOrWhiteSpace($parentPath)) { $name } else { "$parentPath / $name" }
    $flatList.Add([pscustomobject]@{
            Id      = [string]$node.id
            Display = $display
        }) | Out-Null

    foreach ($child in @($node.children)) {
        Add-EagleFolderNode -node $child -parentPath $display -flatList $flatList
    }
}

function Get-EagleFoldersFlat {
    $flat = New-Object 'System.Collections.Generic.List[object]'
    $offset = 0
    $limit = 200

    while ($true) {
        $data = Invoke-EagleApi -method "GET" -path ("/folder/get?offset=" + $offset + "&limit=" + $limit)
        $rows = @($data.data)
        foreach ($row in $rows) {
            Add-EagleFolderNode -node $row -parentPath "" -flatList $flat
        }

        if ($rows.Count -lt $limit) {
            break
        }
        $offset += $limit
    }

    return @($flat)
}

function Update-EagleControlsEnabled {
    $enabled = (-not $script:isRunning) -and $script:chkImportEagle.Checked
    $script:btnLoadEagleFolders.Enabled = $enabled
    $script:cmbEagleFolder.Enabled = $enabled
}

function Get-SelectedEagleFolderId {
    $selected = [string]$script:cmbEagleFolder.SelectedItem
    if ([string]::IsNullOrWhiteSpace($selected)) {
        return ""
    }
    if ($script:eagleFolderMap.ContainsKey($selected)) {
        return [string]$script:eagleFolderMap[$selected]
    }
    return ""
}

function Import-FramesToEagle([System.IO.FileInfo[]]$frameFiles, [string]$videoName, [string]$folderId) {
    $total = @($frameFiles).Count
    if ($total -eq 0) {
        return 0
    }

    $imported = 0
    $batchSize = 200

    for ($offset = 0; $offset -lt $total; $offset += $batchSize) {
        $end = [Math]::Min($offset + $batchSize - 1, $total - 1)
        $batch = @($frameFiles[$offset..$end])
        $items = @()

        foreach ($file in $batch) {
            $payload = [ordered]@{
                path = $file.FullName
                name = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
                tags = @("FrameCut", $videoName)
            }
            if (-not [string]::IsNullOrWhiteSpace($folderId)) {
                $payload["folders"] = @($folderId)
            }
            $items += [pscustomobject]$payload
        }

        [void](Invoke-EagleApi -method "POST" -path "/item/add" -body @{ items = $items })
        $imported += $batch.Count
        Append-Log -line ($script:T.LogEagleImportProgressPrefix + " " + $imported + "/" + $total)
    }

    return $imported
}

$form = New-Object System.Windows.Forms.Form
$form.Text = $script:T.AppTitle
$form.StartPosition = "CenterScreen"
$form.Size = New-Object System.Drawing.Size(980, 820)
$form.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::FixedDialog
$form.MaximizeBox = $false
$form.BackColor = [System.Drawing.Color]::FromArgb(246, 248, 252)
$form.Font = New-Object System.Drawing.Font("Microsoft JhengHei UI", 10)

$banner = New-Object System.Windows.Forms.Panel
$banner.Location = New-Object System.Drawing.Point(0, 0)
$banner.Size = New-Object System.Drawing.Size(980, 72)
$banner.BackColor = [System.Drawing.Color]::FromArgb(31, 78, 121)
$form.Controls.Add($banner)

$lblTitle = New-Object System.Windows.Forms.Label
$lblTitle.Text = $script:T.AppTitle
$lblTitle.ForeColor = [System.Drawing.Color]::White
$lblTitle.Font = New-Object System.Drawing.Font("Microsoft JhengHei UI", 16, [System.Drawing.FontStyle]::Bold)
$lblTitle.Location = New-Object System.Drawing.Point(20, 12)
$lblTitle.Size = New-Object System.Drawing.Size(620, 32)
$banner.Controls.Add($lblTitle)

$lblSubtitle = New-Object System.Windows.Forms.Label
$lblSubtitle.Text = $script:T.Subtitle
$lblSubtitle.ForeColor = [System.Drawing.Color]::FromArgb(222, 235, 247)
$lblSubtitle.Location = New-Object System.Drawing.Point(22, 45)
$lblSubtitle.Size = New-Object System.Drawing.Size(700, 24)
$banner.Controls.Add($lblSubtitle)

$groupStep1 = New-Object System.Windows.Forms.GroupBox
$groupStep1.Text = $script:T.GroupStep1
$groupStep1.Location = New-Object System.Drawing.Point(20, 84)
$groupStep1.Size = New-Object System.Drawing.Size(930, 160)
$form.Controls.Add($groupStep1)

$lblVideoPath = New-Object System.Windows.Forms.Label
$lblVideoPath.Text = $script:T.VideoPathLabel
$lblVideoPath.Location = New-Object System.Drawing.Point(16, 30)
$lblVideoPath.Size = New-Object System.Drawing.Size(120, 22)
$groupStep1.Controls.Add($lblVideoPath)

$txtVideoPath = New-Object System.Windows.Forms.TextBox
$txtVideoPath.Location = New-Object System.Drawing.Point(16, 54)
$txtVideoPath.Size = New-Object System.Drawing.Size(770, 28)
$txtVideoPath.AllowDrop = $true
$groupStep1.Controls.Add($txtVideoPath)
$script:txtVideoPath = $txtVideoPath

$btnBrowseVideo = New-Object System.Windows.Forms.Button
$btnBrowseVideo.Text = $script:T.BrowseVideo
$btnBrowseVideo.Location = New-Object System.Drawing.Point(800, 52)
$btnBrowseVideo.Size = New-Object System.Drawing.Size(110, 31)
$groupStep1.Controls.Add($btnBrowseVideo)
$script:btnBrowseVideo = $btnBrowseVideo

$lblVideoHint = New-Object System.Windows.Forms.Label
$lblVideoHint.Text = $script:T.VideoHint
$lblVideoHint.ForeColor = [System.Drawing.Color]::FromArgb(80, 80, 80)
$lblVideoHint.Location = New-Object System.Drawing.Point(16, 86)
$lblVideoHint.Size = New-Object System.Drawing.Size(620, 20)
$groupStep1.Controls.Add($lblVideoHint)

$lblDragHint = New-Object System.Windows.Forms.Label
$lblDragHint.Text = $script:T.DragHint
$lblDragHint.ForeColor = [System.Drawing.Color]::FromArgb(80, 80, 80)
$lblDragHint.Location = New-Object System.Drawing.Point(16, 106)
$lblDragHint.Size = New-Object System.Drawing.Size(620, 20)
$groupStep1.Controls.Add($lblDragHint)

$lblFileInfoTitle = New-Object System.Windows.Forms.Label
$lblFileInfoTitle.Text = $script:T.FileInfoLabel
$lblFileInfoTitle.Location = New-Object System.Drawing.Point(16, 126)
$lblFileInfoTitle.Size = New-Object System.Drawing.Size(120, 20)
$groupStep1.Controls.Add($lblFileInfoTitle)

$lblFileInfoValue = New-Object System.Windows.Forms.Label
$lblFileInfoValue.Text = $script:T.NoVideoSelected
$lblFileInfoValue.Location = New-Object System.Drawing.Point(104, 126)
$lblFileInfoValue.Size = New-Object System.Drawing.Size(806, 20)
$groupStep1.Controls.Add($lblFileInfoValue)
$script:lblFileInfoValue = $lblFileInfoValue

$groupStep2 = New-Object System.Windows.Forms.GroupBox
$groupStep2.Text = $script:T.GroupStep2
$groupStep2.Location = New-Object System.Drawing.Point(20, 252)
$groupStep2.Size = New-Object System.Drawing.Size(930, 238)
$form.Controls.Add($groupStep2)

$lblOutputMode = New-Object System.Windows.Forms.Label
$lblOutputMode.Text = $script:T.OutputModeLabel
$lblOutputMode.Location = New-Object System.Drawing.Point(16, 30)
$lblOutputMode.Size = New-Object System.Drawing.Size(120, 22)
$groupStep2.Controls.Add($lblOutputMode)

$rbAuto = New-Object System.Windows.Forms.RadioButton
$rbAuto.Text = $script:T.AutoOutput
$rbAuto.Location = New-Object System.Drawing.Point(20, 54)
$rbAuto.Size = New-Object System.Drawing.Size(380, 24)
$rbAuto.Checked = $true
$groupStep2.Controls.Add($rbAuto)
$script:rbAuto = $rbAuto

$txtAutoFolder = New-Object System.Windows.Forms.TextBox
$txtAutoFolder.Location = New-Object System.Drawing.Point(40, 80)
$txtAutoFolder.Size = New-Object System.Drawing.Size(870, 28)
$txtAutoFolder.ReadOnly = $true
$groupStep2.Controls.Add($txtAutoFolder)
$script:txtAutoFolder = $txtAutoFolder

$rbCustom = New-Object System.Windows.Forms.RadioButton
$rbCustom.Text = $script:T.CustomOutput
$rbCustom.Location = New-Object System.Drawing.Point(20, 111)
$rbCustom.Size = New-Object System.Drawing.Size(300, 24)
$groupStep2.Controls.Add($rbCustom)
$script:rbCustom = $rbCustom

$txtCustomFolder = New-Object System.Windows.Forms.TextBox
$txtCustomFolder.Location = New-Object System.Drawing.Point(40, 136)
$txtCustomFolder.Size = New-Object System.Drawing.Size(748, 28)
$txtCustomFolder.Enabled = $false
$groupStep2.Controls.Add($txtCustomFolder)
$script:txtCustomFolder = $txtCustomFolder

$btnBrowseFolder = New-Object System.Windows.Forms.Button
$btnBrowseFolder.Text = $script:T.ChooseFolder
$btnBrowseFolder.Location = New-Object System.Drawing.Point(800, 134)
$btnBrowseFolder.Size = New-Object System.Drawing.Size(110, 31)
$btnBrowseFolder.Enabled = $false
$groupStep2.Controls.Add($btnBrowseFolder)
$script:btnBrowseFolder = $btnBrowseFolder

$lblFormat = New-Object System.Windows.Forms.Label
$lblFormat.Text = $script:T.FormatLabel
$lblFormat.Location = New-Object System.Drawing.Point(16, 174)
$lblFormat.Size = New-Object System.Drawing.Size(72, 22)
$groupStep2.Controls.Add($lblFormat)

$cmbFormat = New-Object System.Windows.Forms.ComboBox
$cmbFormat.Location = New-Object System.Drawing.Point(92, 171)
$cmbFormat.Size = New-Object System.Drawing.Size(150, 30)
$cmbFormat.DropDownStyle = [System.Windows.Forms.ComboBoxStyle]::DropDownList
[void]$cmbFormat.Items.AddRange(@($script:T.FormatPng, $script:T.FormatJpg, $script:T.FormatWebp))
$cmbFormat.SelectedIndex = 0
$groupStep2.Controls.Add($cmbFormat)
$script:cmbFormat = $cmbFormat

$lblEveryN = New-Object System.Windows.Forms.Label
$lblEveryN.Text = $script:T.EveryNLabel
$lblEveryN.Location = New-Object System.Drawing.Point(262, 174)
$lblEveryN.Size = New-Object System.Drawing.Size(160, 22)
$groupStep2.Controls.Add($lblEveryN)

$numEveryN = New-Object System.Windows.Forms.NumericUpDown
$numEveryN.Location = New-Object System.Drawing.Point(424, 171)
$numEveryN.Size = New-Object System.Drawing.Size(100, 28)
$numEveryN.Minimum = 1
$numEveryN.Maximum = 10000
$numEveryN.Value = 1
$groupStep2.Controls.Add($numEveryN)
$script:numEveryN = $numEveryN

$lblEveryNHelp = New-Object System.Windows.Forms.Label
$lblEveryNHelp.Text = $script:T.EveryNHelp
$lblEveryNHelp.Location = New-Object System.Drawing.Point(536, 174)
$lblEveryNHelp.Size = New-Object System.Drawing.Size(160, 22)
$lblEveryNHelp.ForeColor = [System.Drawing.Color]::FromArgb(90, 90, 90)
$groupStep2.Controls.Add($lblEveryNHelp)

$chkOverwrite = New-Object System.Windows.Forms.CheckBox
$chkOverwrite.Text = $script:T.Overwrite
$chkOverwrite.Location = New-Object System.Drawing.Point(716, 173)
$chkOverwrite.Size = New-Object System.Drawing.Size(190, 24)
$chkOverwrite.Checked = $true
$groupStep2.Controls.Add($chkOverwrite)
$script:chkOverwrite = $chkOverwrite

$lblOutputPreviewTitle = New-Object System.Windows.Forms.Label
$lblOutputPreviewTitle.Text = $script:T.OutputPreviewLabel
$lblOutputPreviewTitle.Location = New-Object System.Drawing.Point(16, 204)
$lblOutputPreviewTitle.Size = New-Object System.Drawing.Size(120, 22)
$groupStep2.Controls.Add($lblOutputPreviewTitle)

$txtOutputPreview = New-Object System.Windows.Forms.TextBox
$txtOutputPreview.Location = New-Object System.Drawing.Point(104, 201)
$txtOutputPreview.Size = New-Object System.Drawing.Size(806, 28)
$txtOutputPreview.ReadOnly = $true
$groupStep2.Controls.Add($txtOutputPreview)
$script:txtOutputPreview = $txtOutputPreview

$groupStep3 = New-Object System.Windows.Forms.GroupBox
$groupStep3.Text = $script:T.GroupStep3
$groupStep3.Location = New-Object System.Drawing.Point(20, 498)
$groupStep3.Size = New-Object System.Drawing.Size(930, 136)
$form.Controls.Add($groupStep3)

$btnExtract = New-Object System.Windows.Forms.Button
$btnExtract.Text = $script:T.Extract
$btnExtract.Location = New-Object System.Drawing.Point(20, 28)
$btnExtract.Size = New-Object System.Drawing.Size(170, 36)
$btnExtract.BackColor = [System.Drawing.Color]::FromArgb(33, 115, 70)
$btnExtract.ForeColor = [System.Drawing.Color]::White
$btnExtract.FlatStyle = [System.Windows.Forms.FlatStyle]::Flat
$btnExtract.FlatAppearance.BorderSize = 0
$groupStep3.Controls.Add($btnExtract)
$script:btnExtract = $btnExtract

$btnOpenOutput = New-Object System.Windows.Forms.Button
$btnOpenOutput.Text = $script:T.OpenOutput
$btnOpenOutput.Location = New-Object System.Drawing.Point(202, 28)
$btnOpenOutput.Size = New-Object System.Drawing.Size(170, 36)
$btnOpenOutput.Enabled = $false
$groupStep3.Controls.Add($btnOpenOutput)
$script:btnOpenOutput = $btnOpenOutput

$btnOpenAppFolder = New-Object System.Windows.Forms.Button
$btnOpenAppFolder.Text = $script:T.OpenAppFolder
$btnOpenAppFolder.Location = New-Object System.Drawing.Point(384, 28)
$btnOpenAppFolder.Size = New-Object System.Drawing.Size(170, 36)
$groupStep3.Controls.Add($btnOpenAppFolder)
$script:btnOpenAppFolder = $btnOpenAppFolder

$btnClearLog = New-Object System.Windows.Forms.Button
$btnClearLog.Text = $script:T.ClearLog
$btnClearLog.Location = New-Object System.Drawing.Point(566, 28)
$btnClearLog.Size = New-Object System.Drawing.Size(130, 36)
$groupStep3.Controls.Add($btnClearLog)
$script:btnClearLog = $btnClearLog

$btnClose = New-Object System.Windows.Forms.Button
$btnClose.Text = $script:T.BtnClose
$btnClose.Location = New-Object System.Drawing.Point(710, 28)
$btnClose.Size = New-Object System.Drawing.Size(200, 36)
$groupStep3.Controls.Add($btnClose)
$script:btnClose = $btnClose

$chkImportEagle = New-Object System.Windows.Forms.CheckBox
$chkImportEagle.Text = $script:T.EagleImport
$chkImportEagle.Location = New-Object System.Drawing.Point(20, 70)
$chkImportEagle.Size = New-Object System.Drawing.Size(220, 24)
$groupStep3.Controls.Add($chkImportEagle)
$script:chkImportEagle = $chkImportEagle

$btnLoadEagleFolders = New-Object System.Windows.Forms.Button
$btnLoadEagleFolders.Text = $script:T.LoadEagleFolders
$btnLoadEagleFolders.Location = New-Object System.Drawing.Point(248, 66)
$btnLoadEagleFolders.Size = New-Object System.Drawing.Size(140, 31)
$btnLoadEagleFolders.Enabled = $false
$groupStep3.Controls.Add($btnLoadEagleFolders)
$script:btnLoadEagleFolders = $btnLoadEagleFolders

$cmbEagleFolder = New-Object System.Windows.Forms.ComboBox
$cmbEagleFolder.Location = New-Object System.Drawing.Point(396, 67)
$cmbEagleFolder.Size = New-Object System.Drawing.Size(514, 30)
$cmbEagleFolder.DropDownStyle = [System.Windows.Forms.ComboBoxStyle]::DropDownList
$cmbEagleFolder.Enabled = $false
[void]$cmbEagleFolder.Items.Add($script:T.EagleFolderRoot)
$cmbEagleFolder.SelectedIndex = 0
$groupStep3.Controls.Add($cmbEagleFolder)
$script:cmbEagleFolder = $cmbEagleFolder
$script:eagleFolderMap = @{ ($script:T.EagleFolderRoot) = "" }

$progressBar = New-Object System.Windows.Forms.ProgressBar
$progressBar.Location = New-Object System.Drawing.Point(20, 106)
$progressBar.Size = New-Object System.Drawing.Size(520, 18)
$progressBar.Style = [System.Windows.Forms.ProgressBarStyle]::Blocks
$progressBar.Maximum = 100
$groupStep3.Controls.Add($progressBar)
$script:progressBar = $progressBar

$statusLabel = New-Object System.Windows.Forms.Label
$statusLabel.Text = $script:T.StatusReady
$statusLabel.Location = New-Object System.Drawing.Point(552, 104)
$statusLabel.Size = New-Object System.Drawing.Size(358, 22)
$statusLabel.TextAlign = [System.Drawing.ContentAlignment]::MiddleRight
$groupStep3.Controls.Add($statusLabel)
$script:statusLabel = $statusLabel

$groupLog = New-Object System.Windows.Forms.GroupBox
$groupLog.Text = $script:T.GroupLog
$groupLog.Location = New-Object System.Drawing.Point(20, 642)
$groupLog.Size = New-Object System.Drawing.Size(930, 136)
$form.Controls.Add($groupLog)

$txtLog = New-Object System.Windows.Forms.TextBox
$txtLog.Location = New-Object System.Drawing.Point(16, 24)
$txtLog.Size = New-Object System.Drawing.Size(898, 100)
$txtLog.Multiline = $true
$txtLog.ScrollBars = [System.Windows.Forms.ScrollBars]::Vertical
$txtLog.ReadOnly = $true
$groupLog.Controls.Add($txtLog)
$script:txtLog = $txtLog

$tooltip = New-Object System.Windows.Forms.ToolTip
$tooltip.AutoPopDelay = 10000
$tooltip.InitialDelay = 400
$tooltip.ReshowDelay = 200
$tooltip.ShowAlways = $true
$tooltip.SetToolTip($numEveryN, $script:T.TooltipEveryN)
$tooltip.SetToolTip($rbAuto, $script:T.TooltipAuto)
$tooltip.SetToolTip($rbCustom, $script:T.TooltipCustom)
$tooltip.SetToolTip($txtOutputPreview, $script:T.OutputPreviewTip)
$tooltip.SetToolTip($chkImportEagle, $script:T.TooltipEagle)
$tooltip.SetToolTip($cmbEagleFolder, $script:T.EagleFolderHint)

$btnBrowseVideo.Add_Click({
    $dialog = New-Object System.Windows.Forms.OpenFileDialog
    $dialog.Filter = $script:T.OpenVideoFilter
    $dialog.Multiselect = $false
    $dialog.Title = $script:T.OpenVideoTitle
    if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
        $script:txtVideoPath.Text = $dialog.FileName
    }
})

$txtVideoPath.Add_DragEnter({
    if ($_.Data.GetDataPresent([System.Windows.Forms.DataFormats]::FileDrop)) {
        $_.Effect = [System.Windows.Forms.DragDropEffects]::Copy
    } else {
        $_.Effect = [System.Windows.Forms.DragDropEffects]::None
    }
})

$txtVideoPath.Add_DragDrop({
    $files = $_.Data.GetData([System.Windows.Forms.DataFormats]::FileDrop)
    if ($files -and $files.Length -gt 0) {
        $script:txtVideoPath.Text = [string]$files[0]
    }
})

$txtVideoPath.Add_TextChanged({
    Refresh-VideoInfo
    Refresh-OutputPreview
})

$rbAuto.Add_CheckedChanged({
    Update-CustomFolderEnabled
    Refresh-OutputPreview
})

$rbCustom.Add_CheckedChanged({
    Update-CustomFolderEnabled
    Refresh-OutputPreview
})

$txtCustomFolder.Add_TextChanged({
    Refresh-OutputPreview
})

$numEveryN.Add_ValueChanged({
    Refresh-OutputPreview
})

$btnBrowseFolder.Add_Click({
    $folderDialog = New-Object System.Windows.Forms.FolderBrowserDialog
    $folderDialog.Description = $script:T.OpenFolderDesc
    if ($folderDialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
        $script:txtCustomFolder.Text = $folderDialog.SelectedPath
    }
})

$chkImportEagle.Add_CheckedChanged({
    Update-EagleControlsEnabled
})

$btnLoadEagleFolders.Add_Click({
    if ($script:isRunning) {
        return
    }

    try {
        if (-not (Test-EagleAvailable)) {
            throw $script:T.ErrEagleNotRunning
        }

        $folders = Get-EagleFoldersFlat
        $script:cmbEagleFolder.Items.Clear()
        $script:eagleFolderMap = @{}

        [void]$script:cmbEagleFolder.Items.Add($script:T.EagleFolderRoot)
        $script:eagleFolderMap[$script:T.EagleFolderRoot] = ""

        foreach ($folder in ($folders | Sort-Object -Property Display)) {
            $label = [string]$folder.Display
            if ($script:eagleFolderMap.ContainsKey($label)) {
                $label = $label + " [" + [string]$folder.Id + "]"
            }
            [void]$script:cmbEagleFolder.Items.Add($label)
            $script:eagleFolderMap[$label] = [string]$folder.Id
        }

        $script:cmbEagleFolder.SelectedIndex = 0
        Append-Log -line ($script:T.LogEagleFolderLoadedPrefix + ($script:cmbEagleFolder.Items.Count - 1) + $script:T.LogEagleFolderLoadedSuffix)
    }
    catch {
        Append-Log -line ("[ERROR] " + $_.Exception.Message)
        [System.Windows.Forms.MessageBox]::Show(
            $_.Exception.Message,
            $script:T.MsgErrorTitle,
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Error
        ) | Out-Null
    }
})

$btnOpenAppFolder.Add_Click({
    Start-Process explorer.exe $script:scriptRoot | Out-Null
})

$btnOpenOutput.Add_Click({
    if ([string]::IsNullOrWhiteSpace($script:lastOutputFolder) -or -not (Test-Path -LiteralPath $script:lastOutputFolder)) {
        [System.Windows.Forms.MessageBox]::Show(
            $script:T.OpenOutputFirst,
            $script:T.MsgErrorTitle,
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Warning
        ) | Out-Null
        return
    }

    Start-Process explorer.exe $script:lastOutputFolder | Out-Null
})

$btnClearLog.Add_Click({
    $script:txtLog.Clear()
    Append-Log -line $script:T.ClearLogDone
})

$btnClose.Add_Click({
    if ($script:isRunning) {
        return
    }
    $form.Close()
})

$btnExtract.Add_Click({
    if ($script:isRunning) {
        return
    }

    $finalStatus = $script:T.StatusReady

    try {
        $script:txtLog.Clear()
        Set-RunningState -running $true -statusText $script:T.StatusValidating

        $videoPath = $script:txtVideoPath.Text.Trim()
        if ([string]::IsNullOrWhiteSpace($videoPath)) {
            throw $script:T.ErrSelectVideo
        }
        if (-not (Test-Path -LiteralPath $videoPath)) {
            throw $script:T.ErrVideoNotFound
        }
        $ffmpegExe = Get-FfmpegExecutable
        if ([string]::IsNullOrWhiteSpace($ffmpegExe)) {
            throw $script:T.ErrNoFfmpeg
        }

        $everyN = [int]$script:numEveryN.Value
        if ($everyN -lt 1) {
            throw $script:T.ErrEveryN
        }

        $importToEagle = $script:chkImportEagle.Checked
        $eagleFolderId = ""
        $eagleFolderName = $script:T.EagleFolderRoot
        if ($importToEagle) {
            if (-not (Test-EagleAvailable)) {
                throw $script:T.ErrEagleNotRunning
            }
            $eagleFolderId = Get-SelectedEagleFolderId
            if ($script:cmbEagleFolder.SelectedItem) {
                $eagleFolderName = [string]$script:cmbEagleFolder.SelectedItem
            }
        }

        $targetFolder = Resolve-TargetOutputFolder `
            -videoPath $videoPath `
            -useAutoOutput $script:rbAuto.Checked `
            -customParentFolder $script:txtCustomFolder.Text.Trim()

        if (-not (Test-Path -LiteralPath $targetFolder)) {
            New-Item -Path $targetFolder -ItemType Directory | Out-Null
        }

        $extension = Get-SelectedExtension
        $outputPattern = Join-Path $targetFolder "frame_%06d.$extension"

        $ffmpegArgs = @("-hide_banner", "-stats")
        if ($script:chkOverwrite.Checked) {
            $ffmpegArgs += "-y"
        } else {
            $ffmpegArgs += "-n"
        }

        $ffmpegArgs += @("-i", $videoPath)
        if ($everyN -gt 1) {
            $ffmpegArgs += @("-vf", "select='not(mod(n\,$everyN))'", "-fps_mode", "vfr")
        } else {
            $ffmpegArgs += @("-fps_mode", "passthrough")
        }

        if ($extension -eq "jpg") {
            $ffmpegArgs += @("-q:v", "2")
        }

        $ffmpegArgs += $outputPattern

        Append-Log -line ($script:T.LogStartTime + (Get-Date).ToString("yyyy-MM-dd HH:mm:ss"))
        Append-Log -line ($script:T.LogInput + $videoPath)
        Append-Log -line ($script:T.LogOutput + $targetFolder)
        Append-Log -line ($script:T.LogFormat + $extension)
        if ($everyN -eq 1) {
            Append-Log -line $script:T.LogModeAll
        } else {
            Append-Log -line ($script:T.LogModeEveryNPrefix + $everyN + $script:T.LogModeEveryNSuffix)
        }
        $displayCmd = '"' + $ffmpegExe.Replace('"', '\"') + '" ' + (Format-DisplayArgs -args $ffmpegArgs)
        Append-Log -line ($script:T.LogFfmpegCommand + $displayCmd)
        Append-Log -line $script:T.LogRunFfmpeg

        $script:statusLabel.Text = $script:T.StatusExtracting
        [System.Windows.Forms.Application]::DoEvents() | Out-Null

        $ffmpegOutput = New-Object System.Collections.Generic.List[string]
        $oldErrorActionPreference = $ErrorActionPreference
        try {
            $ErrorActionPreference = "Continue"
            & $ffmpegExe @ffmpegArgs 2>&1 | ForEach-Object {
                $line = [string]$_
                $ffmpegOutput.Add($line) | Out-Null
                Append-Log -line $line
            }
        }
        finally {
            $ErrorActionPreference = $oldErrorActionPreference
        }

        $ffmpegExitCode = $LASTEXITCODE
        if ($ffmpegExitCode -ne 0) {
            $tail = @($ffmpegOutput | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Select-Object -Last 12)
            $tailText = if ($tail.Count -gt 0) { ($tail -join [Environment]::NewLine) } else { "No ffmpeg output." }

            $hint = ""
            if ($tailText -match "already exists") {
                $hint = [Environment]::NewLine + [Environment]::NewLine + "Hint: enable overwrite."
            } elseif ($tailText -match "No such file or directory") {
                $hint = [Environment]::NewLine + [Environment]::NewLine + "Hint: check input/output path."
            } elseif ($tailText -match "Permission denied") {
                $hint = [Environment]::NewLine + [Environment]::NewLine + "Hint: choose a writable folder."
            } elseif ($tailText -match "usage: ffmpeg") {
                $hint = [Environment]::NewLine + [Environment]::NewLine + "Hint: this usually means invalid ffmpeg arguments."
            }

            throw ("ffmpeg exited with code " + $ffmpegExitCode + [Environment]::NewLine + [Environment]::NewLine + $tailText + $hint)
        }

        $frameFiles = @(Get-ChildItem -LiteralPath $targetFolder -File -Filter "*.$extension" -ErrorAction SilentlyContinue | Sort-Object Name)
        $count = $frameFiles.Count

        if ($importToEagle) {
            $script:statusLabel.Text = $script:T.StatusImporting
            [System.Windows.Forms.Application]::DoEvents() | Out-Null

            Append-Log -line ($script:T.LogEagleImportTarget + $eagleFolderName)
            Append-Log -line $script:T.LogEagleImportStart

            $imported = Import-FramesToEagle -frameFiles $frameFiles -videoName (Get-VideoName -videoPath $videoPath) -folderId $eagleFolderId
            Append-Log -line ($script:T.LogEagleImportDonePrefix + $imported + $script:T.LogEagleImportDoneSuffix)
        }

        $script:lastOutputFolder = $targetFolder
        $script:btnOpenOutput.Enabled = $true

        Append-Log -line ($script:T.LogDonePrefix + $count + $script:T.LogDoneSuffix)
        Append-Log -line ($script:T.LogEndTime + (Get-Date).ToString("yyyy-MM-dd HH:mm:ss"))

        $finalStatus = $script:T.StatusDone

        [System.Windows.Forms.MessageBox]::Show(
            ($script:T.LogDonePrefix + $count + $script:T.LogDoneSuffix + [Environment]::NewLine + $targetFolder),
            $script:T.MsgDoneTitle,
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Information
        ) | Out-Null
    }
    catch {
        $finalStatus = $script:T.StatusError
        Append-Log -line ("[ERROR] " + $_.Exception.Message)
        [System.Windows.Forms.MessageBox]::Show(
            $_.Exception.Message,
            $script:T.MsgErrorTitle,
            [System.Windows.Forms.MessageBoxButtons]::OK,
            [System.Windows.Forms.MessageBoxIcon]::Error
        ) | Out-Null
    }
    finally {
        Set-RunningState -running $false -statusText $finalStatus
        Refresh-OutputPreview
    }
})

Refresh-VideoInfo
Refresh-OutputPreview
Append-Log -line ($script:T.AppFolderHint + $script:scriptRoot)
Set-RunningState -running $false -statusText $script:T.StatusReady

if (-not (Test-FfmpegAvailable)) {
    Append-Log -line ("[WARN] " + $script:T.ErrNoFfmpeg)
    [System.Windows.Forms.MessageBox]::Show(
        $script:T.MsgInstallFfmpeg,
        $script:T.MsgInstallTitle,
        [System.Windows.Forms.MessageBoxButtons]::OK,
        [System.Windows.Forms.MessageBoxIcon]::Warning
    ) | Out-Null
}

[void]$form.ShowDialog()

