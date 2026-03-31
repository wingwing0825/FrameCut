const textMap = {
  appTitle: "影片影格轉圖片",
  appSubtitle: "適用於 Live2D 動作參考",
  step1: "步驟 1：選擇影片",
  step2: "步驟 2：輸出設定",
  step3: "步驟 3：開始轉換",
  chooseVideo: "把影片拖曳到這裡，或點擊選擇影片",
  noVideo: "尚未選擇影片",
  formatLabel: "圖片格式",
  perSecondLabel: "每秒輸出幾張",
  perSecondHint: "例子：1 = 每秒 1 張，10 = 每秒 10 張",
  perSecondPreviewPrefix: "目前設定：每秒 ",
  perSecondPreviewSuffix: " 張",
  perSecondPreviewAllFrames: "目前設定：每一偵都輸出（最多）",
  allFramesLabel: "每一偵都輸出（忽略「每秒幾張」）",
  outputModeTitle: "輸出方式",
  zipModeLabel: "下載 ZIP（所有瀏覽器可用）",
  folderModeLabel: "直接寫入資料夾（Chrome / Edge）",
  chooseFolderBtn: "選擇輸出資料夾",
  folderNotPicked: "尚未選擇資料夾",
  folderPickedPrefix: "已選擇資料夾：",
  statusReady: "就緒",
  statusInit: "載入 ffmpeg.wasm 中...",
  statusConverting: "轉換中，請稍候...",
  statusDone: "完成",
  statusError: "發生錯誤",
  convertStart: "開始轉換",
  downloadResult: "下載結果",
  clearLog: "清空紀錄",
  clearedLog: "已清空紀錄。",
  folderModeUnsupported:
    "你的瀏覽器不支援選資料夾寫入，請改用 Chrome 或 Edge，或選 ZIP 下載。",
  chooseFolderFirst: "請先選擇輸出資料夾。",
  chooseVideoFirst: "請先選擇影片。",
  loadingLibFail: "載入 ffmpeg.wasm 失敗，請檢查網路後再試。",
  preparing: "正在準備轉換...",
  extractionDonePrefix: "轉換完成，總共輸出 ",
  extractionDoneSuffix: " 張圖片。",
  zipReady: "ZIP 已準備好，請點「下載結果」。",
  folderWriteDone: "已寫入輸出資料夾：",
  modeAllFramesLog: "輸出模式：每一偵都輸出",
  modePerSecondPrefix: "輸出模式：每秒 ",
  modePerSecondSuffix: " 張",
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
  dropZoneText: byId("dropZoneText"),
  videoMeta: byId("videoMeta"),
  formatLabel: byId("formatLabel"),
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
  el.dropZoneText.textContent = textMap.chooseVideo;
  el.videoMeta.textContent = textMap.noVideo;
  el.formatLabel.textContent = textMap.formatLabel;
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