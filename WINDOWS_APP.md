# Windows App Guide

This guide covers the Windows desktop version and command-line script.

## Files

1. `video-frame-app.ps1` - Windows GUI app
2. `run-video-frame-app.bat` - double-click launcher
3. `extract-frames.ps1` - command-line extractor

## GUI App

### Start

Double-click:

```text
run-video-frame-app.bat
```

### What it does

1. Pick a video file
2. Choose image format (PNG/JPG/WEBP)
3. Set `Every N frames`
4. Choose output mode:
   - Auto create output folder in workspace
   - Custom parent folder
5. Click `Start`

## ffmpeg requirements

Desktop app needs local ffmpeg. It will try these paths in order:

1. `.\ffmpeg\bin\ffmpeg.exe`
2. `.\ffmpeg.exe`
3. `ffmpeg` from system PATH

## Command-line usage

```powershell
.\extract-frames.ps1 -InputVideo "C:\path\to\video.mp4"
```

Common options:

```powershell
.\extract-frames.ps1 -InputVideo "C:\video.mp4" -OutputDir "C:\frames"
.\extract-frames.ps1 -InputVideo "C:\video.mp4" -EveryNFrame 2
.\extract-frames.ps1 -InputVideo "C:\video.mp4" -Format jpg
.\extract-frames.ps1 -InputVideo "C:\video.mp4" -Overwrite
```
