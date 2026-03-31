const textMap = {
  appTitle: "\u5f71\u7247\u5f71\u683c\u8f49\u5716\u7247",
  appSubtitle: "\u9069\u7528\u65bc Live2D \u52d5\u4f5c\u53c3\u8003",
  step1: "\u6b65\u9a5f 1\uff1a\u9078\u64c7\u5f71\u7247",
  step2: "\u6b65\u9a5f 2\uff1a\u8f38\u51fa\u8a2d\u5b9a",
  step3: "\u6b65\u9a5f 3\uff1a\u958b\u59cb\u8f49\u63db",
  chooseVideoBtn: "\u9078\u64c7\u5f71\u7247",
  chooseVideo: "\u628a\u5f71\u7247\u62d6\u66f3\u5230\u9019\u88e1\uff0c\u6216\u9ede\u64ca\u9078\u64c7\u5f71\u7247",
  noVideo: "\u5c1a\u672a\u9078\u64c7\u5f71\u7247",
  formatLabel: "\u5716\u7247\u683c\u5f0f",
  formatPng: "PNG\uff08\u7121\u5931\u771f\uff09",
  formatJpg: "JPG\uff08\u8f03\u7d30\uff09",
  formatWebp: "WEBP\uff08\u58d3\u7e2e\uff09",
  perSecondLabel: "\u6bcf\u79d2\u8f38\u51fa\u5e7e\u5f35",
  perSecondHint: "\u4f8b\u5b50\uff1a1 = \u6bcf\u79d2 1 \u5f35\uff0c10 = \u6bcf\u79d2 10 \u5f35",
  perSecondPreviewPrefix: "\u76ee\u524d\u8a2d\u5b9a\uff1a\u6bcf\u79d2 ",
  perSecondPreviewSuffix: " \u5f35",
  perSecondPreviewAllFrames: "\u76ee\u524d\u8a2d\u5b9a\uff1a\u6bcf\u4e00\u5075\u90fd\u8f38\u51fa\uff08\u6700\u591a\uff09",
  allFramesLabel: "\u6bcf\u4e00\u5075\u90fd\u8f38\u51fa\uff08\u5ffd\u7565\u300c\u6bcf\u79d2\u5e7e\u5f35\u300d\uff09",
  outputModeTitle: "\u8f38\u51fa\u65b9\u5f0f",
  zipModeLabel: "\u4e0b\u8f09 ZIP\uff08\u6240\u6709\u700f\u89bd\u5668\u53ef\u7528\uff09",
  folderModeLabel: "\u76f4\u63a5\u5beb\u5165\u8cc7\u6599\u593e\uff08Chrome / Edge\uff09",
  chooseFolderBtn: "\u9078\u64c7\u8f38\u51fa\u8cc7\u6599\u593e",
  folderNotPicked: "\u5c1a\u672a\u9078\u64c7\u8cc7\u6599\u593e",
  folderPickedPrefix: "\u5df2\u9078\u64c7\u8cc7\u6599\u593e\uff1a",
  statusReady: "\u5c31\u7dd2",
  statusInit: "\u8f09\u5165 ffmpeg.wasm \u4e2d...",
  statusConverting: "\u8f49\u63db\u4e2d\uff0c\u8acb\u7a0d\u5019...",
  statusDone: "\u5b8c\u6210",
  statusError: "\u767c\u751f\u932f\u8aa4",
  convertStart: "\u958b\u59cb\u8f49\u63db",
  downloadResult: "\u4e0b\u8f09\u7d50\u679c",
  clearLog: "\u6e05\u7a7a\u7d00\u9304",
  clearedLog: "\u5df2\u6e05\u7a7a\u7d00\u9304\u3002",
  folderModeUnsupported:
    "\u4f60\u7684\u700f\u89bd\u5668\u4e0d\u652f\u63f4\u9078\u8cc7\u6599\u593e\u5beb\u5165\uff0c\u8acb\u6539\u7528 Chrome \u6216 Edge\uff0c\u6216\u9078 ZIP \u4e0b\u8f09\u3002",
  chooseFolderFirst: "\u8acb\u5148\u9078\u64c7\u8f38\u51fa\u8cc7\u6599\u593e\u3002",
  chooseVideoFirst: "\u8acb\u5148\u9078\u64c7\u5f71\u7247\u3002",
  loadingLibFail: "\u8f09\u5165 ffmpeg.wasm \u5931\u6557\uff0c\u8acb\u6aa2\u67e5\u7db2\u8def\u5f8c\u518d\u8a66\u3002",
  preparing: "\u6b63\u5728\u6e96\u5099\u8f49\u63db...",
  extractionDonePrefix: "\u8f49\u63db\u5b8c\u6210\uff0c\u7e3d\u5171\u8f38\u51fa ",
  extractionDoneSuffix: " \u5f35\u5716\u7247\u3002",
  zipReady: "ZIP \u5df2\u6e96\u5099\u597d\uff0c\u8acb\u9ede\u300c\u4e0b\u8f09\u7d50\u679c\u300d\u3002",
  folderWriteDone: "\u5df2\u5beb\u5165\u8f38\u51fa\u8cc7\u6599\u593e\uff1a",
  modeAllFramesLog: "\u8f38\u51fa\u6a21\u5f0f\uff1a\u6bcf\u4e00\u5075\u90fd\u8f38\u51fa",
  modePerSecondPrefix: "\u8f38\u51fa\u6a21\u5f0f\uff1a\u6bcf\u79d2 ",
  modePerSecondSuffix: " \u5f35",
  preset1: "1 \u5f35/\u79d2",
  preset5: "5 \u5f35/\u79d2",
  preset10: "10 \u5f35/\u79d2",
  preset24: "24 \u5f35/\u79d2",
  logPrefix: "[LOG] ",
  errorPrefix: "[ERROR] ",
};

const FPS_MIN = 1;
const FPS_MAX = 60;

const byId = (id) => document.getElementById(id);

const el = {
  title: byId("title"),
  subtitle: byId("subtitle"),
  step1Title: byId("step1Title"),
  step2Title: byId("step2Title"),
  step3Title: byId("step3Title"),
  chooseVideoBtn: byId("chooseVideoBtn"),
  dropZoneText: byId("dropZoneText"),
  videoMeta: byId("videoMeta"),
  formatLabel: byId("formatLabel"),
  optionPng: byId("optionPng"),
  optionJpg: byId("optionJpg"),
  optionWebp: byId("optionWebp"),
  perSecondLabel: byId("perSecondLabel"),
  perSecondHint: byId("perSecondHint"),
  perSecondPreview: byId("perSecondPreview"),
  allFramesLabel: byId("allFramesLabel"),
  outputModeTitle: byId("outputModeTitle"),
  zipModeLabel: byId("zipModeLabel"),
  folderModeLabel: byId("folderModeLabel"),
  pickFolderBtn: byId("pickFolderBtn"),
  folderName: byId("folderName"),
  videoInput: byId("videoInput"),
  dropZone: byId("dropZone"),
  formatSelect: byId("formatSelect"),
  perSecondInput: byId("perSecondInput"),
  perSecondSlider: byId("perSecondSlider"),
  allFramesCheck: byId("allFramesCheck"),
  convertBtn: byId("convertBtn"),
  downloadBtn: byId("downloadBtn"),
  clearBtn: byId("clearBtn"),
  progressBar: byId("progressBar"),
  statusText: byId("statusText"),
  logBox: byId("logBox"),
  preset1: byId("preset1"),
  preset5: byId("preset5"),
  preset10: byId("preset10"),
  preset24: byId("preset24"),
  presetButtons: Array.from(document.querySelectorAll(".fps-preset")),
};

const state = {
  ffmpeg: null,
  ffmpegReady: false,
  outputMode: "zip",
  directoryHandle: null,
  selectedVideo: null,
  zipBlob: null,
  zipName: "",
  converting: false,
};

function setStaticTexts() {
  document.title = textMap.appTitle;
  el.title.textContent = textMap.appTitle;
  el.subtitle.textContent = textMap.appSubtitle;
  el.step1Title.textContent = textMap.step1;
  el.step2Title.textContent = textMap.step2;
  el.step3Title.textContent = textMap.step3;
  el.chooseVideoBtn.textContent = textMap.chooseVideoBtn;
  el.dropZoneText.textContent = textMap.chooseVideo;
  el.videoMeta.textContent = textMap.noVideo;
  el.formatLabel.textContent = textMap.formatLabel;
  el.optionPng.textContent = textMap.formatPng;
  el.optionJpg.textContent = textMap.formatJpg;
  el.optionWebp.textContent = textMap.formatWebp;
  el.perSecondLabel.textContent = textMap.perSecondLabel;
  el.perSecondHint.textContent = textMap.perSecondHint;
  el.allFramesLabel.textContent = textMap.allFramesLabel;
  el.outputModeTitle.textContent = textMap.outputModeTitle;
  el.zipModeLabel.textContent = textMap.zipModeLabel;
  el.folderModeLabel.textContent = textMap.folderModeLabel;
  el.pickFolderBtn.textContent = textMap.chooseFolderBtn;
  el.folderName.textContent = textMap.folderNotPicked;
  el.statusText.textContent = textMap.statusReady;
  el.convertBtn.textContent = textMap.convertStart;
  el.downloadBtn.textContent = textMap.downloadResult;
  el.clearBtn.textContent = textMap.clearLog;
  el.preset1.textContent = textMap.preset1;
  el.preset5.textContent = textMap.preset5;
  el.preset10.textContent = textMap.preset10;
  el.preset24.textContent = textMap.preset24;
}

function log(message) {
  el.logBox.value += `${textMap.logPrefix}${message}\n`;
  el.logBox.scrollTop = el.logBox.scrollHeight;
}

function logError(message) {
  el.logBox.value += `${textMap.errorPrefix}${message}\n`;
  el.logBox.scrollTop = el.logBox.scrollHeight;
}

function setStatus(text) {
  el.statusText.textContent = text;
}

function setProgress(percent) {
  const value = Math.max(0, Math.min(100, Math.round(percent)));
  el.progressBar.value = value;
}

function supportsFolderPicker() {
  return typeof window.showDirectoryPicker === "function";
}

function getOutputMode() {
  const checked = document.querySelector('input[name="outputMode"]:checked');
  return checked ? checked.value : "zip";
}

function clampPerSecond(value) {
  if (!Number.isFinite(value)) return FPS_MIN;
  return Math.max(FPS_MIN, Math.min(FPS_MAX, Math.round(value)));
}

function getPerSecondValue() {
  return clampPerSecond(Number(el.perSecondInput.value));
}

function updateRatePreview() {
  if (el.allFramesCheck.checked) {
    el.perSecondPreview.textContent = textMap.perSecondPreviewAllFrames;
    return;
  }

  const perSecond = getPerSecondValue();
  el.perSecondPreview.textContent = `${textMap.perSecondPreviewPrefix}${perSecond}${textMap.perSecondPreviewSuffix}`;
}

function syncPerSecondControls(nextValue) {
  const safe = clampPerSecond(Number(nextValue));
  const safeText = String(safe);

  if (el.perSecondInput.value !== safeText) {
    el.perSecondInput.value = safeText;
  }
  if (el.perSecondSlider.value !== safeText) {
    el.perSecondSlider.value = safeText;
  }

  updateRatePreview();
}

function updateRateInputEnabled() {
  const disabled = state.converting || el.allFramesCheck.checked;

  el.perSecondInput.disabled = disabled;
  el.perSecondSlider.disabled = disabled;
  for (const btn of el.presetButtons) {
    btn.disabled = disabled;
  }

  updateRatePreview();
}

function setBusy(busy) {
  state.converting = busy;
  el.convertBtn.disabled = busy;
  el.videoInput.disabled = busy;
  el.formatSelect.disabled = busy;
  el.allFramesCheck.disabled = busy;
  updateRateInputEnabled();
  el.pickFolderBtn.disabled =
    busy || state.outputMode !== "folder" || !supportsFolderPicker();
}

function formatBytes(bytes) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}

function onVideoSelected(file) {
  state.selectedVideo = file ?? null;
  state.zipBlob = null;
  el.downloadBtn.disabled = true;

  if (!file) {
    el.videoMeta.textContent = textMap.noVideo;
    return;
  }

  const modified = new Date(file.lastModified).toLocaleString();
  el.videoMeta.textContent = `${file.name} | ${formatBytes(file.size)} | ${modified}`;
}

async function ensureFFmpeg() {
  if (state.ffmpegReady) return;

  setStatus(textMap.statusInit);
  log(textMap.statusInit);

  try {
    const [{ FFmpeg }, { toBlobURL }] = await Promise.all([
      import("./vendor/ffmpeg/index.js"),
      import("./vendor/util/index.js"),
    ]);

    const ffmpeg = new FFmpeg();
    ffmpeg.on("log", ({ message }) => {
      if (message) log(message);
    });
    ffmpeg.on("progress", ({ progress }) => {
      if (typeof progress === "number") {
        setProgress(progress * 100);
      }
    });

    const coreBase = "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${coreBase}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(`${coreBase}/ffmpeg-core.wasm`, "application/wasm"),
    });

    state.ffmpeg = ffmpeg;
    state.ffmpegReady = true;
    log("ffmpeg.wasm ready");
  } catch (err) {
    throw new Error(`${textMap.loadingLibFail} ${err.message || err}`);
  }
}

async function resetFsWorkspace() {
  const ffmpeg = state.ffmpeg;

  try {
    const oldFiles = await ffmpeg.listDir("/frames");
    for (const item of oldFiles) {
      if (item.name === "." || item.name === "..") continue;
      if (item.isDir) {
        await ffmpeg.deleteDir(`/frames/${item.name}`);
      } else {
        await ffmpeg.deleteFile(`/frames/${item.name}`);
      }
    }
    await ffmpeg.deleteDir("/frames");
  } catch (_err) {
    // ignore
  }

  try {
    await ffmpeg.createDir("/frames");
  } catch (_err) {
    // ignore
  }

  try {
    await ffmpeg.deleteFile("/input_video");
  } catch (_err) {
    // ignore
  }
}

function getSafeBaseName(fileName) {
  const dot = fileName.lastIndexOf(".");
  const base = dot > 0 ? fileName.slice(0, dot) : fileName;
  return base.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").trim() || "video";
}

async function collectFrameFiles(formatExt) {
  const entries = await state.ffmpeg.listDir("/frames");
  const files = entries
    .filter((it) => !it.isDir && it.name.toLowerCase().endsWith(`.${formatExt}`))
    .sort((a, b) => a.name.localeCompare(b.name));
  return files;
}

async function saveToZip(frameFiles, zipName) {
  const { default: JSZip } = await import("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm");
  const zip = new JSZip();

  for (const file of frameFiles) {
    const data = await state.ffmpeg.readFile(`/frames/${file.name}`);
    zip.file(file.name, data);
  }

  state.zipBlob = await zip.generateAsync({ type: "blob" });
  state.zipName = zipName;
  el.downloadBtn.disabled = false;
  log(textMap.zipReady);
}

async function getUniqueSubFolder(parent, baseName) {
  let index = 1;
  while (index < 1000) {
    const candidateName = index === 1 ? baseName : `${baseName}_${index}`;
    try {
      await parent.getDirectoryHandle(candidateName, { create: false });
      index += 1;
    } catch (_e) {
      return await parent.getDirectoryHandle(candidateName, { create: true });
    }
  }
  throw new Error("Cannot create output folder.");
}

async function saveToFolder(frameFiles, subFolderBase) {
  if (!state.directoryHandle) {
    throw new Error(textMap.chooseFolderFirst);
  }

  const targetFolder = await getUniqueSubFolder(state.directoryHandle, subFolderBase);
  for (const file of frameFiles) {
    const data = await state.ffmpeg.readFile(`/frames/${file.name}`);
    const handle = await targetFolder.getFileHandle(file.name, { create: true });
    const writable = await handle.createWritable();
    await writable.write(data);
    await writable.close();
  }

  log(`${textMap.folderWriteDone} ${subFolderBase}`);
}

async function convertVideo() {
  if (state.converting) return;
  if (!state.selectedVideo) {
    alert(textMap.chooseVideoFirst);
    return;
  }

  const exportAllFrames = el.allFramesCheck.checked;
  const perSecond = getPerSecondValue();
  syncPerSecondControls(perSecond);

  if (state.outputMode === "folder" && !state.directoryHandle) {
    alert(textMap.chooseFolderFirst);
    return;
  }

  setBusy(true);
  setProgress(0);
  setStatus(textMap.preparing);
  state.zipBlob = null;
  el.downloadBtn.disabled = true;
  el.logBox.value = "";

  try {
    await ensureFFmpeg();
    await resetFsWorkspace();

    const formatExt = el.formatSelect.value;
    const inputData = new Uint8Array(await state.selectedVideo.arrayBuffer());
    await state.ffmpeg.writeFile("/input_video", inputData);

    const args = ["-hide_banner", "-stats", "-y", "-i", "/input_video"];
    if (exportAllFrames) {
      args.push("-fps_mode", "passthrough");
      log(textMap.modeAllFramesLog);
    } else {
      const perSecondText = String(perSecond);
      args.push("-vf", `fps=${perSecondText}`);
      log(`${textMap.modePerSecondPrefix}${perSecondText}${textMap.modePerSecondSuffix}`);
    }

    if (formatExt === "jpg") {
      args.push("-q:v", "2");
    }
    args.push(`/frames/frame_%06d.${formatExt}`);

    log(`ffmpeg ${args.join(" ")}`);
    setStatus(textMap.statusConverting);
    await state.ffmpeg.exec(args);

    const frameFiles = await collectFrameFiles(formatExt);
    if (frameFiles.length === 0) {
      throw new Error("No frame output generated.");
    }

    const baseName = getSafeBaseName(state.selectedVideo.name);
    if (state.outputMode === "folder") {
      await saveToFolder(frameFiles, `${baseName}_frames`);
    } else {
      await saveToZip(frameFiles, `${baseName}_frames.zip`);
    }

    setProgress(100);
    setStatus(textMap.statusDone);
    log(`${textMap.extractionDonePrefix}${frameFiles.length}${textMap.extractionDoneSuffix}`);
  } catch (err) {
    setStatus(textMap.statusError);
    const msg = err?.message || String(err);
    logError(msg);
    alert(msg);
  } finally {
    setBusy(false);
  }
}

async function pickOutputFolder() {
  if (!supportsFolderPicker()) {
    alert(textMap.folderModeUnsupported);
    return;
  }
  try {
    const handle = await window.showDirectoryPicker({ mode: "readwrite" });
    state.directoryHandle = handle;
    el.folderName.textContent = `${textMap.folderPickedPrefix} ${handle.name}`;
  } catch (_err) {
    // user cancelled
  }
}

function downloadZip() {
  if (!state.zipBlob) return;
  const name = state.zipName || "frames.zip";
  const url = URL.createObjectURL(state.zipBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function bindEvents() {
  el.videoInput.addEventListener("change", (e) => {
    const file = e.target.files?.[0];
    onVideoSelected(file || null);
  });

  el.dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    el.dropZone.classList.add("dragover");
  });
  el.dropZone.addEventListener("dragleave", () => {
    el.dropZone.classList.remove("dragover");
  });
  el.dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    el.dropZone.classList.remove("dragover");
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    onVideoSelected(file);
  });

  el.perSecondInput.addEventListener("input", () => {
    syncPerSecondControls(el.perSecondInput.value);
  });

  el.perSecondSlider.addEventListener("input", () => {
    syncPerSecondControls(el.perSecondSlider.value);
  });

  for (const btn of el.presetButtons) {
    btn.addEventListener("click", () => {
      syncPerSecondControls(btn.dataset.fps);
    });
  }

  el.allFramesCheck.addEventListener("change", updateRateInputEnabled);

  document.querySelectorAll('input[name="outputMode"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      state.outputMode = getOutputMode();
      if (state.outputMode === "folder" && !supportsFolderPicker()) {
        alert(textMap.folderModeUnsupported);
        document.querySelector('input[name="outputMode"][value="zip"]').checked = true;
        state.outputMode = "zip";
      }
      el.pickFolderBtn.disabled =
        state.outputMode !== "folder" || state.converting || !supportsFolderPicker();
    });
  });

  el.pickFolderBtn.addEventListener("click", pickOutputFolder);
  el.convertBtn.addEventListener("click", convertVideo);
  el.downloadBtn.addEventListener("click", downloadZip);
  el.clearBtn.addEventListener("click", () => {
    el.logBox.value = "";
    log(textMap.clearedLog);
  });
}

function init() {
  setStaticTexts();
  bindEvents();
  syncPerSecondControls(el.perSecondInput.value);
  updateRateInputEnabled();

  state.outputMode = getOutputMode();
  el.pickFolderBtn.disabled = state.outputMode !== "folder" || !supportsFolderPicker();
  if (!supportsFolderPicker()) {
    log(textMap.folderModeUnsupported);
  }
}

init();