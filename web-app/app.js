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
  allFramesLabel: "\u6bcf\u4e00\u5075\u90fd\u8f38\u51fa\uff08\u5ffd\u7565\u300c\u6bcf\u79d2\u5e7e\u5f35\u300d\uff09",
  outputModeTitle: "\u8f38\u51fa\u65b9\u5f0f",
  zipModeLabel: "\u4e0b\u8f09 ZIP\uff08\u6240\u6709\u700f\u89bd\u5668\u53ef\u7528\uff09",
  eagleModeLabel: "\u532f\u5165 Eagle App\uff08\u53ef\u9078\u5206\u985e\uff09",
  folderModeLabel: "\u76f4\u63a5\u5beb\u5165\u8cc7\u6599\u593e\uff08Chrome / Edge\uff09",
  chooseFolderBtn: "\u9078\u64c7\u8f38\u51fa\u8cc7\u6599\u593e",
  folderNotPicked: "\u5c1a\u672a\u9078\u64c7\u8cc7\u6599\u593e",
  folderPickedPrefix: "\u5df2\u9078\u64c7\u8cc7\u6599\u593e\uff1a",
  loadEagleFoldersBtn: "\u8f09\u5165 Eagle \u5206\u985e",
  eagleRootOption: "\u6839\u76ee\u9304\uff08\u4e0d\u5206\u985e\uff09",
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
  eagleNotRunning:
    "\u5075\u6e2c\u4e0d\u5230 Eagle App\uff0c\u8acb\u5148\u958b\u555f Eagle\uff08\u684c\u9762\u7248\uff09\u518d\u8a66\u3002\u5982\u679c\u4f60\u4fc2\u7528\u96f2\u7aef\u7db2\u5740\uff0c\u8acb\u6539\u7528\u672c\u6a5f http://127.0.0.1:5173\u3002",
  eagleFoldersLoadedPrefix: "Eagle \u5206\u985e\u5df2\u8f09\u5165\uff0c\u5171 ",
  eagleFoldersLoadedSuffix: " \u500b\u5206\u985e\u3002",
  eagleImportDonePrefix: "\u5df2\u532f\u5165 Eagle\uff0c\u5171 ",
  eagleImportDoneSuffix: " \u5f35\u3002",
  eagleImportProgressPrefix: "Eagle \u532f\u5165\u4e2d\uff1a",
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
  allFramesLabel: byId("allFramesLabel"),
  outputModeTitle: byId("outputModeTitle"),
  zipModeLabel: byId("zipModeLabel"),
  eagleModeLabel: byId("eagleModeLabel"),
  folderModeLabel: byId("folderModeLabel"),
  eaglePanel: byId("eaglePanel"),
  loadEagleFoldersBtn: byId("loadEagleFoldersBtn"),
  eagleFolderSelect: byId("eagleFolderSelect"),
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
  el.allFramesLabel.textContent = textMap.allFramesLabel;
  el.outputModeTitle.textContent = textMap.outputModeTitle;
  el.zipModeLabel.textContent = textMap.zipModeLabel;
  el.eagleModeLabel.textContent = textMap.eagleModeLabel;
  el.folderModeLabel.textContent = textMap.folderModeLabel;
  el.loadEagleFoldersBtn.textContent = textMap.loadEagleFoldersBtn;
  el.eagleFolderSelect.innerHTML = "";
  const rootOption = document.createElement("option");
  rootOption.value = "";
  rootOption.textContent = textMap.eagleRootOption;
  el.eagleFolderSelect.appendChild(rootOption);
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

const EAGLE_API_BASE = "http://localhost:41595/api";

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

function syncPerSecondControls(nextValue) {
  const safe = clampPerSecond(Number(nextValue));
  const safeText = String(safe);

  if (el.perSecondInput.value !== safeText) {
    el.perSecondInput.value = safeText;
  }
  if (el.perSecondSlider.value !== safeText) {
    el.perSecondSlider.value = safeText;
  }
}

function updateRateInputEnabled() {
  const disabled = state.converting || el.allFramesCheck.checked;

  el.perSecondInput.disabled = disabled;
  el.perSecondSlider.disabled = disabled;
  for (const btn of el.presetButtons) {
    btn.disabled = disabled;
  }
}

function updateOutputModeUi() {
  el.pickFolderBtn.disabled =
    state.converting || state.outputMode !== "folder" || !supportsFolderPicker();
  el.eaglePanel.style.display = state.outputMode === "eagle" ? "flex" : "none";
  el.loadEagleFoldersBtn.disabled = state.converting || state.outputMode !== "eagle";
  el.eagleFolderSelect.disabled = state.converting || state.outputMode !== "eagle";
}

function setBusy(busy) {
  state.converting = busy;
  el.convertBtn.disabled = busy;
  el.videoInput.disabled = busy;
  el.formatSelect.disabled = busy;
  el.allFramesCheck.disabled = busy;
  updateRateInputEnabled();
  updateOutputModeUi();
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

async function saveToZip(frameFiles, zipName, showReadyLog = true) {
  const { default: JSZip } = await import("https://cdn.jsdelivr.net/npm/jszip@3.10.1/+esm");
  const zip = new JSZip();

  for (const file of frameFiles) {
    const data = await state.ffmpeg.readFile(`/frames/${file.name}`);
    zip.file(file.name, data);
  }

  state.zipBlob = await zip.generateAsync({ type: "blob" });
  state.zipName = zipName;
  el.downloadBtn.disabled = false;
  if (showReadyLog) {
    log(textMap.zipReady);
  }
}

async function eagleRequest(path, options = {}) {
  const response = await fetch(`${EAGLE_API_BASE}${path}`, options);
  if (!response.ok) {
    throw new Error(`Eagle API HTTP ${response.status}`);
  }

  let body;
  try {
    body = await response.json();
  } catch (_err) {
    throw new Error("Eagle API response parse failed.");
  }

  if (body?.status && body.status !== "success") {
    throw new Error(body.message || "Eagle API returned error.");
  }
  return body;
}

async function ensureEagleRunning() {
  try {
    await eagleRequest("/application/info", { method: "GET" });
  } catch (err) {
    throw new Error(`${textMap.eagleNotRunning} ${err?.message || err}`);
  }
}

function flattenEagleFolders(nodes, output, parentPath = "") {
  for (const node of nodes || []) {
    const displayName = parentPath ? `${parentPath} / ${node.name}` : node.name;
    output.push({ id: node.id, name: displayName });
    flattenEagleFolders(node.children || [], output, displayName);
  }
}

async function loadEagleFolders() {
  el.loadEagleFoldersBtn.disabled = true;
  try {
    await ensureEagleRunning();
    const info = await eagleRequest("/library/info", { method: "GET" });
    const flattened = [];
    flattenEagleFolders(info?.data?.folders || [], flattened);

    el.eagleFolderSelect.innerHTML = "";
    const rootOption = document.createElement("option");
    rootOption.value = "";
    rootOption.textContent = textMap.eagleRootOption;
    el.eagleFolderSelect.appendChild(rootOption);

    for (const folder of flattened) {
      const option = document.createElement("option");
      option.value = folder.id;
      option.textContent = folder.name;
      el.eagleFolderSelect.appendChild(option);
    }
    log(
      `${textMap.eagleFoldersLoadedPrefix}${flattened.length}${textMap.eagleFoldersLoadedSuffix}`,
    );
  } catch (err) {
    const msg = err?.message || String(err);
    logError(msg);
    alert(msg);
  } finally {
    el.loadEagleFoldersBtn.disabled = state.converting;
  }
}

function mimeFromFormat(formatExt) {
  if (formatExt === "jpg") return "image/jpeg";
  if (formatExt === "webp") return "image/webp";
  return "image/png";
}

function uint8ToBase64(uint8) {
  const chunk = 0x8000;
  let binary = "";
  for (let i = 0; i < uint8.length; i += chunk) {
    binary += String.fromCharCode(...uint8.subarray(i, i + chunk));
  }
  return btoa(binary);
}

async function importToEagle(frameFiles, formatExt, videoBaseName) {
  await ensureEagleRunning();
  const folderId = el.eagleFolderSelect.value || "";
  const mime = mimeFromFormat(formatExt);

  let index = 0;
  for (const file of frameFiles) {
    index += 1;
    const bytes = await state.ffmpeg.readFile(`/frames/${file.name}`);
    const base64 = uint8ToBase64(bytes);
    const payload = {
      url: `data:${mime};base64,${base64}`,
      name: file.name,
      tags: [videoBaseName, "FrameCut"],
    };
    if (folderId) {
      payload.folderId = folderId;
    }

    await eagleRequest("/item/addFromURL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (index % 10 === 0 || index === frameFiles.length) {
      log(`${textMap.eagleImportProgressPrefix} ${index}/${frameFiles.length}`);
    }
  }

  log(`${textMap.eagleImportDonePrefix}${frameFiles.length}${textMap.eagleImportDoneSuffix}`);
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
    } else if (state.outputMode === "eagle") {
      await importToEagle(frameFiles, formatExt, baseName);
    } else {
      const zipName = `${baseName}_frames.zip`;
      await saveToZip(frameFiles, zipName, true);
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
      updateOutputModeUi();
    });
  });

  el.pickFolderBtn.addEventListener("click", pickOutputFolder);
  el.loadEagleFoldersBtn.addEventListener("click", loadEagleFolders);
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
  updateOutputModeUi();
  if (!supportsFolderPicker()) {
    log(textMap.folderModeUnsupported);
  }
}

init();
