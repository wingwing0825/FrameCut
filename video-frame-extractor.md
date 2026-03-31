# Video Frame Extractor

- Original name: 影片轉圖片 App
- English filename name: video-frame-extractor
- Intake status: In progress (proceeding with assumptions requested by user)

## Goal

Convert uploaded video files into image frames for Live2D motion reference.

## Target Users

Individual creators who need frame-by-frame references for Live2D animation.

## Core Features

1. Select/upload one local video file.
2. Choose output mode:
   - Auto create folder in current workspace.
   - Custom output folder picker.
3. One-click extraction with ffmpeg and clear status messages.

## Platform Scope

Windows desktop utility (PowerShell GUI / WinForms).

## UI Theme and Visual Direction

Simple utility UI focused on speed and clarity.

## Key User Flows

1. Open app.
2. Pick video file.
3. Choose output location mode.
4. Click Extract.
5. Open output folder after completion.

## Data and Authentication

No account, no login, no persistent data storage.

## Integrations

Local `ffmpeg` command line tool.

## Delivery Plan and MVP Scope

MVP in this workspace:
1. GUI app script.
2. One-click launcher.
3. Updated usage docs.

## Success Metrics

1. User can complete extraction without touching command line arguments.
2. Output folder is predictable and easy to find.
3. Failure cases (missing ffmpeg / invalid input) are explicit.

## Open Questions

1. Future: batch multi-video extraction needed or not.
2. Future: add progress bar based on parsed ffmpeg logs.
