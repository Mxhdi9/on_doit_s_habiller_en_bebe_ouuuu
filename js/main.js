const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll("button[data-page]");
const navLinks = document.querySelectorAll(".nav-link");
const body = document.body;
const ACCESS_CODE = "7236";
const INITIAL_AMBIENT_VOLUME = 50;
const ARCHIVE_VAULT_CODE = "5556904";
const DEX_PHOTO_FILE = "./assets/images/dex-reveal.svg";
const DEX_PHOTO_FALLBACK = "./assets/images/dex-reveal.svg";
const NADIR_PHOTO_FILE = "./assets/images/nadir-profile.svg";
const NADIR_PHOTO_FALLBACK = "./assets/images/nadir-profile.svg";
const PANAM_PHOTO_FILE = "./assets/images/panam-profile.svg";
const PANAM_PHOTO_FALLBACK = "./assets/images/panam-profile.svg";
const CAIN_PHOTO_FILE = "./assets/images/cain-profile.svg";
const CAIN_PHOTO_FALLBACK = "./assets/images/cain-profile.svg";
const CATEGORY_BACKGROUND_FILE = "./assets/images/archive/accueil.svg";
const LOCAL_MEDIA_ROUTE = "/local-media/";
const LOCAL_MEDIA_SOURCES = {
  dex: `${LOCAL_MEDIA_ROUTE}dex`,
  nadir: `${LOCAL_MEDIA_ROUTE}subjects/nadir`,
  panam: `${LOCAL_MEDIA_ROUTE}subjects/panam`,
  cain: `${LOCAL_MEDIA_ROUTE}subjects/cain`,
  cover: `${LOCAL_MEDIA_ROUTE}archive/accueil`,
  cam01: `${LOCAL_MEDIA_ROUTE}archive/cam01`,
  cam02: `${LOCAL_MEDIA_ROUTE}archive/cam02`,
  cam03: `${LOCAL_MEDIA_ROUTE}archive/cam03`,
  cam04: `${LOCAL_MEDIA_ROUTE}archive/cam04`,
  cam05: `${LOCAL_MEDIA_ROUTE}archive/cam05`,
  cam06: `${LOCAL_MEDIA_ROUTE}archive/cam06-video`,
  cam06Image: `${LOCAL_MEDIA_ROUTE}archive/cam06-image`,
};

const fragmentCodes = {
  frag01: "TRACE",
  silence: "MUR",
  contrat: "PAPIER",
  bolivie: "SUD",
  cataleya: "LIEN",
};

const state = {
  unlockedFragments: new Set(JSON.parse(localStorage.getItem("ascalonFragments") || "[]")),
  n17Unlocked: localStorage.getItem("ascalonN17Delgado") === "true",
  archiveVaultUnlocked: localStorage.getItem("ascalonArchiveVault") === "true",
  openedOperations: new Set(JSON.parse(localStorage.getItem("ascalonOperationsOpened") || "[]")),
  ambientMuted: false,
  ambientVolume: INITIAL_AMBIENT_VOLUME,
};

const accessFlash = document.getElementById("accessFlash");
const signalModal = document.getElementById("signalModal");
const signalMessage = document.getElementById("signalMessage");
const closeSignal = document.getElementById("closeSignal");
const brandButton = document.getElementById("brandButton");
const ambientAudio = document.getElementById("ambientAudio");
const ambientControl = document.getElementById("ambientControl");
const ambientVolume = document.getElementById("ambientVolume");
const ambientVolumeLabel = document.getElementById("ambientVolumeLabel");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const finalFile = document.getElementById("finalFile");
const dexModal = document.getElementById("dexModal");
const closeDex = document.getElementById("closeDex");
const backDex = document.getElementById("backDex");
const revealDex = document.getElementById("revealDex");
const dexSpoiler = document.getElementById("dexSpoiler");
const dexFigure = document.getElementById("dexFigure");
const dexImage = document.getElementById("dexImage");
const dexFallbackNote = document.getElementById("dexFallbackNote");
const panamProfileImage = document.getElementById("panamProfileImage");
const cainProfileImage = document.getElementById("cainProfileImage");
const entryGate = document.getElementById("entryGate");
const entryForm = document.getElementById("entryForm");
const entryCode = document.getElementById("entryCode");
const entryDisplay = document.getElementById("entryDisplay");
const entryKeys = document.querySelectorAll("[data-entry-key]");
const entryFeedback = document.getElementById("entryFeedback");
const n17NameModal = document.getElementById("n17NameModal");
const n17NameForm = document.getElementById("n17NameForm");
const n17NameInput = document.getElementById("n17NameInput");
const n17NameFeedback = document.getElementById("n17NameFeedback");
const closeN17Name = document.getElementById("closeN17Name");
const subjectRows = document.querySelectorAll(".subject-row");
const subjectPreviewTitle = document.getElementById("subjectPreviewTitle");
const subjectPreviewDetail = document.getElementById("subjectPreviewDetail");
const subjectPreviewHint = document.getElementById("subjectPreviewHint");
const subjectPreviewOpen = document.getElementById("subjectPreviewOpen");
const consoleForm = document.getElementById("consoleForm");
const consoleInput = document.getElementById("consoleInput");
const terminalLog = document.getElementById("terminalLog");
const archiveAccessPanel = document.getElementById("archiveAccessPanel");
const archiveContent = document.getElementById("archiveContent");
const archivePinDisplay = document.getElementById("archivePinDisplay");
const archiveAccessFeedback = document.getElementById("archiveAccessFeedback");
const vaultKeys = document.querySelectorAll("[data-vault-key]");
let dexTriedLocalPhoto = false;
let nadirProfileFallbackApplied = false;
let panamProfileFallbackApplied = false;
let cainProfileFallbackApplied = false;
let archiveVaultInput = "";
let entryInput = "";
let activeOperationId = null;
const operationSessionAccess = new Set();
let selectedSubjectAction = null;

const archiveGame = document.getElementById("archiveGame");
const archiveBoot = document.getElementById("archiveBoot");
const archiveInterface = document.getElementById("archiveInterface");
const archiveLaunch = document.getElementById("archiveLaunch");
const archiveExitIntro = document.getElementById("archiveExitIntro");
const archiveExit = document.getElementById("archiveExit");
const archiveBackMenu = document.getElementById("archiveBackMenu");
const archiveNextFragment = document.getElementById("archiveNextFragment");
const archiveCoverImage = document.getElementById("archiveCoverImage");
const archiveDamaged = document.getElementById("archiveDamaged");
const archiveFinal = document.getElementById("archiveFinal");
const archiveSecret = document.getElementById("archiveSecret");
const archiveLog = document.getElementById("archiveLog");
const archivePercent = document.getElementById("archivePercent");
const archiveProgressFill = document.getElementById("archiveProgressFill");
const archiveTimestamp = document.getElementById("archiveTimestamp");
const cameraFrame = document.getElementById("cameraFrame");
const cameraStatic = document.getElementById("cameraStatic");
const cameraScreen = document.getElementById("cameraScreen");
const cameraLabel = document.getElementById("cameraLabel");
const cameraSignal = document.getElementById("cameraSignal");
const cameraButtons = document.querySelectorAll(".camera-button");
const dossierTriggers = document.querySelectorAll("[data-dossier-trigger]");
const operationMap = document.getElementById("operationMap");
const operationMapStage = document.getElementById("operationMapStage");
const operationOfficialMap = document.getElementById("operationOfficialMap");
const operationEarthCanvas = document.getElementById("operationEarthCanvas");
const operationPoints = document.getElementById("operationPoints");
const operationLines = document.getElementById("operationLines");
const operationLaserLayer = document.getElementById("operationLaserLayer");
const operationCount = document.getElementById("operationCount");
const operationBriefingCard = document.getElementById("operationBriefingCard");
const operationBriefingIndex = document.getElementById("operationBriefingIndex");
const operationBriefingTitle = document.getElementById("operationBriefingTitle");
const operationBriefingLocation = document.getElementById("operationBriefingLocation");
const operationBriefingYear = document.getElementById("operationBriefingYear");
const operationBriefingType = document.getElementById("operationBriefingType");
const operationBriefingImpact = document.getElementById("operationBriefingImpact");
const operationBriefingStatus = document.getElementById("operationBriefingStatus");
const operationBriefingSubjects = document.getElementById("operationBriefingSubjects");
const operationBriefingClass = document.getElementById("operationBriefingClass");
const operationContactStrip = document.getElementById("operationContactStrip");
const missionListToggle = document.getElementById("missionListToggle");
const operationZoomOut = document.getElementById("operationZoomOut");
const operationZoomIn = document.getElementById("operationZoomIn");
const operationResetMap = document.getElementById("operationResetMap");
const operationEmpty = document.getElementById("operationEmpty");
const operationDetails = document.getElementById("operationDetails");
const operationLockForm = document.getElementById("operationLockForm");
const operationUnlockCode = document.getElementById("operationUnlockCode");
const operationLockHint = document.getElementById("operationLockHint");
const operationLockFeedback = document.getElementById("operationLockFeedback");
const operationImage = document.getElementById("operationImage");
const operationTitle = document.getElementById("operationTitle");
const operationLocation = document.getElementById("operationLocation");
const operationYear = document.getElementById("operationYear");
const operationType = document.getElementById("operationType");
const operationImpact = document.getElementById("operationImpact");
const operationStatus = document.getElementById("operationStatus");
const operationSubjects = document.getElementById("operationSubjects");
const operationNote = document.getElementById("operationNote");
const classificationFill = document.getElementById("classificationFill");
const closeOperationFile = document.getElementById("closeOperationFile");
const closeOperationPreview = document.getElementById("closeOperationPreview");
const operationHiddenMessage = document.getElementById("operationHiddenMessage");
const operationAlert = document.getElementById("operationAlert");
const operationAlertTitle = document.getElementById("operationAlertTitle");
const operationAlertText = document.getElementById("operationAlertText");
const operationFile = document.getElementById("operationFile");
const operationSide = document.querySelector(".page-cartography .ops-side");
let pendingOperationId = null;
let operationMapPointer = null;
const operationMapTransform = {
  x: 0,
  y: 0,
  scale: 1,
  hoverScale: 1,
  rotate: 0,
  tilt: 0,
  mouseTiltX: 0,
  mouseTiltY: 0,
};
let missionOrbitFrame = null;
let missionOrbitBase = null;

const GAME_MEDIA = {
  cover: "./assets/images/archive/accueil.svg",
  cam01: "./assets/images/archive/cam01-exterieur.svg",
  cam02: "./assets/images/archive/cam02-entree.svg",
  cam03: "./assets/images/archive/cam03-couloir.svg",
  cam04: "./assets/images/archive/cam04-salon.svg",
  cam05: "./assets/images/archive/cam05-cuisine.svg",
  cam06: "./assets/images/archive/cam06-couloir.svg",
  cam06Image: "./assets/images/archive/cam06-chambre.svg",
};

const MEDIA_REFRESH_TOKEN = "ascalon-20260610-subjects";

function shouldUseLocalMediaRoute() {
  return ["127.0.0.1", "localhost"].includes(window.location.hostname);
}

function mediaUrl(src, key = "") {
  const resolved = shouldUseLocalMediaRoute() && LOCAL_MEDIA_SOURCES[key] ? LOCAL_MEDIA_SOURCES[key] : src;

  if (!resolved || resolved.startsWith("data:")) {
    return resolved;
  }

  const joiner = resolved.includes("?") ? "&" : "?";
  return `${resolved}${joiner}v=${MEDIA_REFRESH_TOKEN}`;
}

function setMediaSource(element, src, key) {
  if (!element) {
    return;
  }

  const nextSrc = mediaUrl(src, key);
  if (nextSrc && element.getAttribute("src") !== nextSrc) {
    element.src = nextSrc;
  }
}

function applyStaticMediaSources() {
  document.documentElement.style.setProperty(
    "--category-bg-image",
    `url("${mediaUrl(CATEGORY_BACKGROUND_FILE, "cover")}")`
  );
  setMediaSource(document.getElementById("nadirProfileImage"), NADIR_PHOTO_FILE, "nadir");
  setMediaSource(panamProfileImage, PANAM_PHOTO_FILE, "panam");
  setMediaSource(cainProfileImage, CAIN_PHOTO_FILE, "cain");
  setMediaSource(dexImage, DEX_PHOTO_FILE, "dex");
}

function fallbackImageDataUri(title, subtitle = "SOURCE NON RESTAURÉE") {
  const safeTitle = title.replace(/[<&>]/g, "");
  const safeSubtitle = subtitle.replace(/[<&>]/g, "");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#070908"/>
          <stop offset="0.55" stop-color="#111615"/>
          <stop offset="1" stop-color="#020303"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="45%" r="60%">
          <stop offset="0" stop-color="#6f1f25" stop-opacity="0.28"/>
          <stop offset="0.45" stop-color="#192322" stop-opacity="0.22"/>
          <stop offset="1" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <pattern id="scan" width="100%" height="14" patternUnits="userSpaceOnUse">
          <rect width="100%" height="7" fill="rgba(255,255,255,0.035)"/>
          <rect y="7" width="100%" height="7" fill="rgba(0,0,0,0.16)"/>
        </pattern>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <rect width="1280" height="720" fill="url(#glow)"/>
      <path d="M120 560 C300 420 430 610 620 480 S930 390 1110 500" fill="none" stroke="#6f1f25" stroke-width="4" opacity="0.42"/>
      <rect x="120" y="118" width="1040" height="484" fill="none" stroke="#d7c58e" stroke-opacity="0.18"/>
      <path d="M120 118 L1160 602 M1160 118 L120 602" stroke="#d7c58e" stroke-opacity="0.12" stroke-width="2"/>
      <g fill="#f0e8d5" font-family="monospace" text-anchor="middle">
        <text x="640" y="338" font-size="42" letter-spacing="8">${safeTitle}</text>
        <text x="640" y="392" font-size="20" fill="#d7c58e" opacity="0.72">${safeSubtitle}</text>
      </g>
      <rect width="1280" height="720" fill="url(#scan)" opacity="0.45"/>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const GAME_MEDIA_FALLBACKS = {
  cover: fallbackImageDataUri("ARCHIVE VIDEO", "DOSSIER N.D.R"),
  cam01: fallbackImageDataUri("CAM 01", "EXTERIEUR"),
  cam02: fallbackImageDataUri("CAM 02", "ENTREE"),
  cam03: fallbackImageDataUri("CAM 03", "COULOIR"),
  cam04: fallbackImageDataUri("CAM 04", "SALON"),
  cam05: fallbackImageDataUri("CAM 05", "CUISINE"),
  cam06: fallbackImageDataUri("CAM 06", "SIGNAL ENDOMMAGE"),
  cam06Image: fallbackImageDataUri("CAM 06", "ARCHIVE CORROMPUE"),
};

function wireArchiveMediaFallbacks(container = document) {
  container.querySelectorAll("[data-archive-media]").forEach((media) => {
    const key = media.dataset.archiveMedia;
    if (!key) {
      return;
    }

    const source = media.dataset.archiveSrc || GAME_MEDIA[key];
    if (source && media.getAttribute("src") !== mediaUrl(source, key)) {
      media.src = mediaUrl(source, key);
    }

    if (media.dataset.fallbackWired !== "true") {
      media.dataset.fallbackWired = "true";
      media.addEventListener("error", () => {
        if (media.tagName === "IMG") {
          media.src = GAME_MEDIA_FALLBACKS[key] || GAME_MEDIA_FALLBACKS.cover;
        }
      });
    }
  });

  container.querySelectorAll("[data-archive-video]").forEach((media) => {
    const key = media.dataset.archiveVideo;
    const source = media.dataset.archiveSrc || GAME_MEDIA[key];
    if (source && media.getAttribute("src") !== mediaUrl(source, key)) {
      media.src = mediaUrl(source, key);
    }

    if (media.dataset.fallbackWired !== "true") {
      media.dataset.fallbackWired = "true";
      media.addEventListener("loadeddata", () => {
        media.classList.remove("hidden");
      });
      media.addEventListener("error", () => {
        media.classList.add("hidden");
      });
    }
  });
}

applyStaticMediaSources();

document.getElementById("nadirProfileImage")?.addEventListener("error", (event) => {
  if (nadirProfileFallbackApplied) {
    return;
  }

  nadirProfileFallbackApplied = true;
  event.currentTarget.src = NADIR_PHOTO_FALLBACK;
});

panamProfileImage?.addEventListener("error", () => {
  if (panamProfileFallbackApplied) {
    return;
  }

  panamProfileFallbackApplied = true;
  panamProfileImage.src = PANAM_PHOTO_FALLBACK;
});

cainProfileImage?.addEventListener("error", () => {
  if (cainProfileFallbackApplied) {
    return;
  }

  cainProfileFallbackApplied = true;
  cainProfileImage.src = CAIN_PHOTO_FALLBACK;
});

archiveCoverImage.src = mediaUrl(GAME_MEDIA.cover, "cover");
archiveCoverImage.addEventListener("error", () => {
  archiveCoverImage.src = GAME_MEDIA_FALLBACKS.cover;
});

function syncAmbientAudioControl() {
  if (!ambientAudio || !ambientVolume || !ambientVolumeLabel) {
    return;
  }

  const volume = clampNumber(Number.isFinite(state.ambientVolume) ? state.ambientVolume : 50, 0, 100);
  ambientAudio.volume = volume / 100;
  ambientAudio.muted = volume === 0;
  ambientVolume.value = String(Math.round(volume));
  ambientVolume.style.setProperty("--ambient-progress", `${volume}%`);
  ambientVolumeLabel.textContent = `Audio ${Math.round(volume)}%`;
}

function startAmbientAudio() {
  if (!ambientAudio) {
    return;
  }

  syncAmbientAudioControl();
  ambientAudio.muted = state.ambientVolume === 0;
  if (ambientAudio.networkState === HTMLMediaElement.NETWORK_EMPTY) {
    ambientAudio.load();
  }
  const playAttempt = ambientAudio.play();
  if (playAttempt) {
    playAttempt
      .then(() => {
        ambientControl?.classList.remove("needs-start");
      })
      .catch(() => {
        ambientControl?.classList.add("needs-start");
      });
  }
}

function attemptAmbientAutoplay() {
  if (!ambientAudio) {
    return;
  }

  syncAmbientAudioControl();
  ambientAudio.muted = true;
  if (ambientAudio.networkState === HTMLMediaElement.NETWORK_EMPTY) {
    ambientAudio.load();
  }

  const playAttempt = ambientAudio.play();
  if (!playAttempt) {
    ambientAudio.muted = state.ambientVolume === 0;
    return;
  }

  playAttempt
    .then(() => {
      ambientAudio.volume = INITIAL_AMBIENT_VOLUME / 100;
      ambientAudio.muted = false;
      return ambientAudio.play();
    })
    .then(() => {
      ambientControl?.classList.remove("needs-start");
    })
    .catch(() => {
      ambientAudio.muted = false;
      ambientControl?.classList.add("needs-start");
    });
}

function initializeAmbientAudio() {
  state.ambientVolume = INITIAL_AMBIENT_VOLUME;
  state.ambientMuted = false;
  localStorage.setItem("ascalonAmbientVolume", String(INITIAL_AMBIENT_VOLUME));
  localStorage.setItem("ascalonAmbientMuted", "false");
  syncAmbientAudioControl();
  attemptAmbientAutoplay();
}

function setAmbientVolume(value, persist = true) {
  state.ambientVolume = clampNumber(Number(value) || 0, 0, 100);
  state.ambientMuted = state.ambientVolume === 0;
  if (persist) {
    localStorage.setItem("ascalonAmbientVolume", String(Math.round(state.ambientVolume)));
    localStorage.setItem("ascalonAmbientMuted", String(state.ambientMuted));
  }
  ambientControl?.classList.remove("needs-start");
  syncAmbientAudioControl();
  startAmbientAudio();
}

function setupOfficialOperationMap() {
  if (!operationMap || !operationOfficialMap) {
    return;
  }

  const setLoaded = () => {
    operationMap.classList.add("official-map-loaded");
    drawOperationEarth();
  };
  const setFallback = () => {
    operationMap.classList.remove("official-map-loaded");
    drawOperationEarth();
  };

  if (operationOfficialMap.complete && operationOfficialMap.naturalWidth > 0) {
    setLoaded();
  }

  operationOfficialMap.addEventListener("load", setLoaded);
  operationOfficialMap.addEventListener("error", setFallback);
}

const OPERATIONS_IMAGE_BASE = "./assets/images/operations/";
const OPERATION_FALLBACK_IMAGE = `${OPERATIONS_IMAGE_BASE}no-signal.svg`;
const OPERATION_PLACEHOLDER_IMAGE = "no-signal.svg";

// Dossiers d'opérations affichés sur la cartographie tactique.
const operations = [
  {
    id: "night-glass",
    name: "OP. NIGHT GLASS",
    location: "Los Santos",
    year: "2021",
    type: "surveillance / récupération",
    impact: "3",
    status: "effacé",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 17.2,
    y: 31.1,
    classification: 66,
    labelX: 22,
    labelY: 58,
  },
  {
    id: "red-harbor",
    name: "OP. RED HARBOR",
    location: "Cayo Perico",
    year: "2021",
    type: "extraction",
    impact: "6",
    status: "classifié",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 29.2,
    y: 40,
    classification: 72,
    labelX: 22,
    labelY: 42,
  },
  {
    id: "altiplano",
    name: "OP. ALTIPLANO",
    location: "La Paz, Bolivie",
    year: "2022",
    type: "rupture de protocole",
    impact: "inconnu",
    status: "anomalie",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 31.1,
    y: 59.2,
    classification: 92,
    labelX: 20,
    labelY: 54,
  },
  {
    id: "black-rain",
    name: "OP. BLACK RAIN",
    location: "Seattle",
    year: "2022",
    type: "protection privée",
    impact: "2",
    status: "nié",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 16.1,
    y: 23.6,
    classification: 58,
    labelX: -120,
    labelY: 44,
  },
  {
    id: "sand-veil",
    name: "OP. SAND VEIL",
    location: "Marrakech",
    year: "2023",
    type: "transfert sécurisé",
    impact: "4",
    status: "classifié",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 47.8,
    y: 32.4,
    classification: 75,
    labelX: -140,
    labelY: 56,
  },
  {
    id: "iron-saint",
    name: "OP. IRON SAINT",
    location: "Marseille",
    year: "2023",
    type: "neutralisation ciblée",
    impact: "5",
    status: "supprimé",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 51.5,
    y: 25.9,
    classification: 81,
    labelX: 26,
    labelY: 76,
  },
  {
    id: "dead-signal",
    name: "OP. DEAD SIGNAL",
    location: "Liberty City",
    year: "2024",
    type: "sabotage réseau",
    impact: "1",
    status: "partiel",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 29.4,
    y: 27.4,
    classification: 64,
    labelX: 24,
    labelY: 76,
  },
  {
    id: "white-room",
    name: "OP. WHITE ROOM",
    location: "Berlin",
    year: "2024",
    type: "interrogatoire privé",
    impact: "0",
    status: "sensible",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 53.7,
    y: 20.8,
    classification: 94,
    labelX: 34,
    labelY: 102,
  },
  {
    id: "mute-angel",
    name: "OP. MUTE ANGEL",
    location: "Paris",
    year: "2024",
    type: "filature",
    impact: "2",
    status: "archivé",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 50.6,
    y: 22.9,
    classification: 70,
    labelX: -146,
    labelY: 92,
  },
  {
    id: "echo-veil",
    name: "OP. ECHO VEIL",
    location: "Lisbonne",
    year: "2025",
    type: "récupération de données",
    impact: "inconnu",
    status: "fragmenté",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 47.5,
    y: 28.5,
    classification: 68,
    labelX: -150,
    labelY: 40,
  },
  {
    id: "cold-shell",
    name: "OP. COLD SHELL",
    location: "Rotterdam",
    year: "2025",
    type: "escorte maritime",
    impact: "7",
    status: "nié",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 51.3,
    y: 21.2,
    classification: 78,
    labelX: -132,
    labelY: 130,
  },
  {
    id: "no-witness",
    name: "OP. NO WITNESS",
    location: "Milan",
    year: "2025",
    type: "opération privée",
    impact: "4",
    status: "effacé",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 52.6,
    y: 24.7,
    classification: 76,
    labelX: 44,
    labelY: 36,
  },
  {
    id: "blue-funeral",
    name: "OP. BLUE FUNERAL",
    location: "Genève",
    year: "2025",
    type: "pression diplomatique",
    impact: "1",
    status: "ultra classifié",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 51.7,
    y: 24.3,
    classification: 88,
    labelX: -150,
    labelY: 4,
  },
  {
    id: "broken-halo",
    name: "OP. BROKEN HALO",
    location: "Londres",
    year: "2025",
    type: "infiltration",
    impact: "3",
    status: "classifié",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 50,
    y: 21.4,
    classification: 84,
    labelX: -130,
    labelY: 162,
  },
  {
    id: "bolivia-loop",
    name: "OP. BOLIVIA LOOP",
    location: "Santa Cruz",
    year: "2025",
    type: "reprise de contact",
    impact: "0",
    status: "anomalie",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 32.4,
    y: 59.9,
    classification: 90,
    labelX: 28,
    labelY: 112,
  },
  {
    id: "black-orchid",
    name: "OP. BLACK ORCHID",
    location: "Monaco",
    year: "2026",
    type: "surveillance financière",
    impact: "0",
    status: "confidentiel",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 52.1,
    y: 25.7,
    classification: 71,
    labelX: 42,
    labelY: 130,
  },
  {
    id: "sleeping-wire",
    name: "OP. SLEEPING WIRE",
    location: "Madrid",
    year: "2026",
    type: "interception",
    impact: "2",
    status: "partiel",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 49,
    y: 27.5,
    classification: 73,
    labelX: -138,
    labelY: 128,
  },
  {
    id: "ash-market",
    name: "OP. ASH MARKET",
    location: "Istanbul",
    year: "2026",
    type: "transaction",
    impact: "5",
    status: "classifié",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 58,
    y: 27.2,
    classification: 82,
    labelX: 30,
    labelY: 72,
  },
  {
    id: "silent-contract",
    name: "OP. SILENT CONTRACT",
    location: "Vancouver",
    year: "2026",
    type: "contrat privé",
    impact: "1",
    status: "confirmé",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 15.8,
    y: 22.6,
    classification: 86,
    labelX: 24,
    labelY: 102,
  },
  {
    id: "east-cipher",
    name: "OP. EAST CIPHER",
    location: "Tokyo",
    year: "2026",
    type: "récupération d’actifs",
    impact: "2",
    status: "classifié",
    image: OPERATION_PLACEHOLDER_IMAGE,
    x: 88.8,
    y: 30.2,
    classification: 100,
    labelX: -148,
    labelY: 74,
  },
];

const operationSubjectLinks = {
  "night-glass": "N-17",
  "red-harbor": "N-17 / P-13 / C-14",
  altiplano: "N-17 / C-14",
  "black-rain": "P-13",
  "sand-veil": "N-17 / P-13",
  "iron-saint": "N-17",
  "dead-signal": "N-17 / C-14",
  "white-room": "N-17 / C-14",
  "mute-angel": "N-17",
  "echo-veil": "N-17 / P-13",
  "cold-shell": "N-17 / P-13",
  "no-witness": "N-17",
  "blue-funeral": "N-17",
  "broken-halo": "N-17 / P-13",
  "bolivia-loop": "N-17",
  "black-orchid": "C-14 / canal Duval",
  "sleeping-wire": "N-17 / P-13",
  "ash-market": "N-17 / S-12",
  "silent-contract": "N-17 / P-13",
  "east-cipher": "C-14 / canal CIPHER",
};

const operationGeoCoordinates = {
  "night-glass": [-118.2437, 34.0522],
  "red-harbor": [-74.3, 12.8],
  altiplano: [-68.1193, -16.4897],
  "black-rain": [-122.3321, 47.6062],
  "sand-veil": [-7.9811, 31.6295],
  "iron-saint": [5.3698, 43.2965],
  "dead-signal": [-74.006, 40.7128],
  "white-room": [13.405, 52.52],
  "mute-angel": [2.3522, 48.8566],
  "echo-veil": [-9.1393, 38.7223],
  "cold-shell": [4.4777, 51.9244],
  "no-witness": [9.19, 45.4642],
  "blue-funeral": [6.1432, 46.2044],
  "broken-halo": [-0.1276, 51.5072],
  "bolivia-loop": [-63.1812, -17.7833],
  "black-orchid": [7.4246, 43.7384],
  "sleeping-wire": [-3.7038, 40.4168],
  "ash-market": [28.9784, 41.0082],
  "silent-contract": [-123.1207, 49.2827],
  "east-cipher": [139.6917, 35.6895],
};

function projectWorldMapPoint(longitude, latitude) {
  const rawX = ((longitude + 180) / 360) * 100;
  const rawY = ((90 - latitude) / 180) * 100;

  return {
    x: clampNumber(2.8 + rawX * 0.944, 0, 100),
    y: clampNumber(10 + rawY * 1.1, 0, 100),
  };
}

operations.forEach((operation) => {
  const coordinates = operationGeoCoordinates[operation.id];
  if (!coordinates) {
    return;
  }

  Object.assign(operation, projectWorldMapPoint(coordinates[0], coordinates[1]));
});

const operationConnections = [
  ["night-glass", "red-harbor"],
  ["red-harbor", "altiplano"],
  ["black-rain", "dead-signal"],
  ["dead-signal", "mute-angel"],
  ["mute-angel", "white-room"],
  ["white-room", "cold-shell"],
  ["cold-shell", "broken-halo"],
  ["sand-veil", "iron-saint"],
  ["iron-saint", "no-witness"],
  ["no-witness", "ash-market"],
  ["bolivia-loop", "east-cipher"],
  ["black-orchid", "blue-funeral"],
  ["sleeping-wire", "echo-veil"],
  ["silent-contract", "black-rain"],
  ["ash-market", "east-cipher"],
];

const cameraData = {
  cam01: {
    label: "CAM 01 — EXTÉRIEUR",
    short: "EXTÉRIEUR",
    signal: "SIGNAL OK",
    stage: 20,
    log: "",
  },
  cam02: {
    label: "CAM 02 — ENTRÉE",
    short: "ENTRÉE",
    signal: "AUDIO INSTABLE",
    stage: 40,
    log: "",
  },
  cam03: {
    label: "CAM 03 — COULOIR",
    short: "COULOIR",
    signal: "SIGNAL FAIBLE",
    stage: 60,
    log: "",
  },
  cam04: {
    label: "CAM 04 — SALON",
    short: "SALON",
    signal: "IMAGE DÉGRADÉE",
    stage: 60,
    log: "",
  },
  cam05: {
    label: "CAM 05 — CUISINE",
    short: "CUISINE",
    signal: "AUDIO INSTABLE",
    stage: 60,
    log: "",
  },
  cam06: {
    label: "CAM 06 — CHAMBRE",
    short: "CHAMBRE",
    signal: "ACCÈS ENDOMMAGÉ",
    stage: 100,
    log: "",
  },
};

function mediaScene(cameraId, notes) {
  return `
    <div class="camera-scene media-scene">
      <img class="camera-media" src="${mediaUrl(GAME_MEDIA[cameraId], cameraId)}" data-archive-media="${cameraId}" data-archive-src="${GAME_MEDIA[cameraId]}" alt="" />
      <div class="camera-media-vignette"></div>
      <div class="cctv-glitch-layer" aria-hidden="true"></div>
      ${notes}
    </div>
  `;
}

const cameraScenes = {
  cam01: () => mediaScene("cam01", ""),
  cam02: () => mediaScene("cam02", `
      <p class="scene-note subtitle-note">Nadir : Maman ?</p>
  `),
  cam03: () => mediaScene("cam03", `
      <p class="scene-note subtitle-note">Nadir : Maman ?</p>
  `),
  cam04: () => mediaScene("cam04", ""),
  cam05: () => mediaScene("cam05", `
      <p class="scene-note subtitle-note">Nadir : ...</p>
  `),
};

const archiveState = {
  activeCamera: "cam01",
  unlocked: new Set(["cam01", "cam02"]),
  viewed: new Set(),
  progress: 0,
  dossierClicks: 0,
  secretShown: false,
};

let archiveTimers = [];

function clearArchiveTimers() {
  archiveTimers.forEach((timer) => window.clearTimeout(timer));
  archiveTimers = [];
}

function queueArchiveTimer(delay, callback) {
  const timer = window.setTimeout(callback, delay);
  archiveTimers.push(timer);
  return timer;
}

window.addEventListener("load", () => {
  body.classList.add("loaded");
  body.classList.add("locked");
  body.classList.remove("home-view");
  initializeAmbientAudio();
  updateEntryDisplay();
  setupOfficialOperationMap();
  entryGate.classList.remove("hidden");
  entryKeys[0]?.focus();
  restoreState();
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (body.classList.contains("locked")) {
      visualPulse("CODE REQUIS");
      entryKeys[0]?.focus();
      return;
    }

    const target = button.dataset.page;
    if (target) {
      showPage(target);
    }
  });
});

function showPage(pageName) {
  pages.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageName);
  });

  body.classList.toggle("home-view", pageName === "home");
  body.classList.toggle("cartography-view", pageName === "cartography");
  window.scrollTo({ top: 0, behavior: "smooth" });
  visualPulse(pageName === "error" ? "FICHIER RETIRÉ" : "ACCÈS LOCAL");
}

function visualPulse(text) {
  accessFlash.textContent = text;
  accessFlash.classList.remove("show");
  void accessFlash.offsetWidth;
  accessFlash.classList.add("show");
  window.setTimeout(() => accessFlash.classList.remove("show"), 540);
}

function normalizeCode(value) {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

function updateEntryDisplay() {
  if (!entryCode || !entryDisplay) {
    return;
  }

  entryCode.value = entryInput;
  entryDisplay.textContent = entryInput ? "•".repeat(entryInput.length).padEnd(ACCESS_CODE.length, "·") : "•".repeat(ACCESS_CODE.length);
}

function handleEntryKey(key) {
  if (key === "clear") {
    entryInput = "";
    entryFeedback.textContent = "";
    updateEntryDisplay();
    return;
  }

  if (key === "enter") {
    handleEntryAttempt();
    return;
  }

  if (!/^\d$/.test(key) || entryInput.length >= ACCESS_CODE.length) {
    return;
  }

  entryInput += key;
  entryFeedback.textContent = "";
  updateEntryDisplay();

  if (entryInput.length === ACCESS_CODE.length) {
    handleEntryAttempt();
  }
}

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleEntryAttempt();
});

entryKeys.forEach((button) => {
  button.addEventListener("click", () => handleEntryKey(button.dataset.entryKey));
});

document.addEventListener("keydown", (event) => {
  if (!body.classList.contains("locked")) {
    return;
  }

  if (/^\d$/.test(event.key)) {
    event.preventDefault();
    handleEntryKey(event.key);
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    entryInput = entryInput.slice(0, -1);
    updateEntryDisplay();
  }

  if (event.key === "Enter") {
    event.preventDefault();
    handleEntryKey("enter");
  }
});

function handleEntryAttempt() {
  if (normalizeCode(entryInput || entryCode.value) === ACCESS_CODE) {
    unlockEntry(true);
  } else {
    entryFeedback.textContent = "ACCÈS REFUSÉ";
    entryInput = "";
    updateEntryDisplay();
    visualPulse("ACCÈS REFUSÉ");
  }
}

function unlockEntry(withPulse) {
  body.classList.remove("locked");
  body.classList.add("home-view");
  entryGate.classList.add("hidden");
  startAmbientAudio();
  if (withPulse) {
    visualPulse("SESSION OUVERTE");
  }
}

ambientVolume?.addEventListener("input", (event) => {
  setAmbientVolume(event.target.value);
});
["pointerdown", "click", "keydown", "touchstart"].forEach((eventName) => {
  document.addEventListener(eventName, startAmbientAudio, { capture: true, passive: true });
});

document.getElementById("n17Form").addEventListener("submit", (event) => {
  event.preventDefault();
  handleN17Attempt();
});

document.getElementById("n17Code").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleN17Attempt();
  }
});

function unlockN17Access(feedbackTarget = null) {
  state.n17Unlocked = true;
  localStorage.setItem("ascalonN17Delgado", "true");
  revealN17();
  if (feedbackTarget) {
    feedbackTarget.textContent = "Identité confirmée.";
  }
  visualPulse("N-17 OUVERT");
}

function handleN17Attempt() {
  const input = document.getElementById("n17Code");
  const feedback = document.getElementById("n17Feedback");

  unlockN17Access(feedback);
  input.value = "";
}

function revealN17() {
  document.getElementById("n17Lock").classList.add("hidden");
  document.getElementById("n17File").classList.remove("hidden");
}

function openN17NameGate() {
  n17NameModal?.classList.remove("hidden");
  if (n17NameInput) {
    n17NameInput.value = "";
    n17NameInput.focus();
  }
  if (n17NameFeedback) {
    n17NameFeedback.textContent = "";
  }
  visualPulse("IDENTITÉ REQUISE");
}

function closeN17NameGate() {
  n17NameModal?.classList.add("hidden");
}

function handleN17NameGate(event) {
  event.preventDefault();
  unlockN17Access(n17NameFeedback);
  closeN17NameGate();
  showPage("n17");
}

function updateSubjectPreview(row) {
  const isN17 = row.hasAttribute("data-n17-gate");
  const isP13 = row.hasAttribute("data-p13-gate");
  const isC14 = row.hasAttribute("data-c14-gate");

  selectedSubjectAction = isN17 ? "n17" : isP13 ? "p13" : isC14 ? "c14" : null;

  subjectPreviewTitle.textContent = isN17
    ? "Sujet N-17 // dossier actif"
    : row.dataset.subjectTitle || row.querySelector("span")?.textContent || "Sujet inconnu";
  subjectPreviewDetail.textContent = isN17
    ? "Dossier prioritaire. Sujet classé tireur d’élite et élément supérieur du programme ASCALON."
    : row.dataset.subjectDetail || "Entrée lacunaire.";
  subjectPreviewHint.textContent = isN17
    ? ""
    : row.dataset.subjectHint || "Aucun indice exploitable.";

  subjectPreviewOpen.classList.toggle("hidden", !selectedSubjectAction);
  subjectPreviewOpen.textContent = isP13 ? "Ouvrir P-13" : isC14 ? "Ouvrir C-14" : "Ouvrir la fiche";
}

subjectRows.forEach((row) => {
  row.addEventListener("click", () => {
    subjectRows.forEach((item) => item.classList.toggle("selected", item === row));
    updateSubjectPreview(row);

    if (row.hasAttribute("data-n17-gate")) {
      unlockN17Access();
      showPage("n17");
      return;
    }

    if (row.hasAttribute("data-p13-gate")) {
      showPage("p13");
      return;
    }

    if (row.hasAttribute("data-c14-gate")) {
      showPage("c14");
    }
  });
});

subjectPreviewOpen?.addEventListener("click", () => {
  if (selectedSubjectAction === "p13") {
    showPage("p13");
    return;
  }

  if (selectedSubjectAction === "n17") {
    unlockN17Access();
    showPage("n17");
    return;
  }

  if (selectedSubjectAction === "c14") {
    showPage("c14");
  }
});
n17NameForm?.addEventListener("submit", handleN17NameGate);
closeN17Name?.addEventListener("click", closeN17NameGate);
n17NameModal?.addEventListener("click", (event) => {
  if (event.target === n17NameModal) {
    closeN17NameGate();
  }
});

document.querySelectorAll(".archive-card").forEach((card) => {
  const form = card.querySelector(".archive-form");
  const input = card.querySelector("input");
  const feedback = card.querySelector(".form-feedback");
  const id = card.dataset.fragment;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleFragmentAttempt(card, input, feedback, id);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleFragmentAttempt(card, input, feedback, id);
    }
  });
});

function handleFragmentAttempt(card, input, feedback, id) {
  if (normalizeCode(input.value) === fragmentCodes[id]) {
    unlockFragment(id);
    feedback.textContent = "Fragment restauré.";
    visualPulse("FRAGMENT OUVERT");
  } else {
    feedback.textContent = "Code fragment invalide.";
    visualPulse("ACCÈS REFUSÉ");
  }
}

function unlockFragment(id) {
  state.unlockedFragments.add(id);
  localStorage.setItem("ascalonFragments", JSON.stringify([...state.unlockedFragments]));
  renderFragments();
}

function renderFragments() {
  document.querySelectorAll(".archive-card").forEach((card) => {
    const unlocked = state.unlockedFragments.has(card.dataset.fragment);
    card.classList.toggle("unlocked", unlocked);
    card.querySelector(".fragment-text").classList.toggle("hidden", !unlocked);
    card.querySelector(".archive-form").classList.toggle("hidden", unlocked);
  });

  if (!progressText || !progressFill || !finalFile) {
    return;
  }

  const progress = state.unlockedFragments.size * 20;
  progressText.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;
  finalFile.classList.toggle("hidden", progress < 100);
}

function restoreState() {
  if (state.n17Unlocked) {
    revealN17();
  }
  renderFragments();
  renderArchiveVault();
  drawOperationEarth();
  renderOperationMap();
  applyOperationMapTransform();
  updateBriefingPreview();
  renderOperationHiddenMessage();
}

function isOperationUnlocked(operation) {
  return true;
}

function operationSubjectsFor(operation) {
  return operationSubjectLinks[operation.id] || "N-17";
}

function openedOperationCount() {
  return operations.filter((operation) => state.openedOperations.has(operation.id)).length;
}

function operationAsset(imageName) {
  return `${OPERATIONS_IMAGE_BASE}${imageName}`;
}

function clampNumber(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) {
    value += 2147483646;
  }

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function drawOperationEarth() {
  if (!operationEarthCanvas) {
    return;
  }

  const canvas = operationEarthCanvas;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const random = seededRandom(17091997);

  ctx.clearRect(0, 0, width, height);

  const sky = ctx.createLinearGradient(0, 0, width, height);
  sky.addColorStop(0, "#8ea0a3");
  sky.addColorStop(0.2, "#7c8c85");
  sky.addColorStop(0.45, "#4f6656");
  sky.addColorStop(0.68, "#2f473c");
  sky.addColorStop(1, "#203238");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(31, 73, 91, 0.62)";
  ctx.beginPath();
  ctx.moveTo(0, height * 0.12);
  ctx.bezierCurveTo(width * 0.18, height * 0.05, width * 0.28, height * 0.24, width * 0.42, height * 0.18);
  ctx.bezierCurveTo(width * 0.62, height * 0.09, width * 0.75, height * 0.16, width, height * 0.1);
  ctx.lineTo(width, 0);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(23, 62, 82, 0.7)";
  ctx.beginPath();
  ctx.moveTo(width * 0.72, height);
  ctx.bezierCurveTo(width * 0.8, height * 0.76, width * 0.9, height * 0.68, width, height * 0.63);
  ctx.lineTo(width, height);
  ctx.closePath();
  ctx.fill();

  for (let i = 0; i < 900; i += 1) {
    const x = random() * width;
    const y = random() * height;
    const size = 8 + random() * 72;
    const alpha = 0.035 + random() * 0.055;
    const green = 70 + Math.floor(random() * 65);
    ctx.fillStyle = `rgba(${green - 24}, ${green}, ${green - 34}, ${alpha})`;
    ctx.fillRect(x, y, size, size * (0.45 + random() * 0.9));
  }

  function drawRoad(x1, y1, x2, y2, widthRoad, color = "rgba(214, 218, 204, 0.55)") {
    ctx.save();
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(41, 48, 48, 0.58)";
    ctx.lineWidth = widthRoad + 5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = widthRoad;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }

  for (let i = 0; i < 52; i += 1) {
    const horizontal = random() > 0.5;
    const x = random() * width;
    const y = random() * height;
    const len = 180 + random() * 640;
    const angle = (horizontal ? 0 : Math.PI / 2) + (random() - 0.5) * 0.45;
    drawRoad(x, y, x + Math.cos(angle) * len, y + Math.sin(angle) * len, 2 + random() * 5);
  }

  operations.forEach((operation, index) => {
    const cx = (operation.x / 100) * width;
    const cy = (operation.y / 100) * height;
    const cluster = 14 + (index % 4) * 5;
    const spread = 90 + (index % 5) * 26;

    for (let i = 0; i < cluster; i += 1) {
      const bx = cx + (random() - 0.5) * spread;
      const by = cy + (random() - 0.5) * spread;
      const bw = 14 + random() * 42;
      const bh = 10 + random() * 36;
      const rot = (random() - 0.5) * 0.55;

      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(rot);
      ctx.fillStyle = "rgba(245, 238, 221, 0.5)";
      ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
      ctx.fillStyle = "rgba(113, 50, 42, 0.42)";
      ctx.fillRect(-bw / 2, -bh / 2, bw, 4 + random() * 8);
      ctx.restore();
    }

    ctx.save();
    ctx.strokeStyle = "rgba(227, 229, 218, 0.42)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 30 + (index % 3) * 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  });

  const image = ctx.getImageData(0, 0, width, height);
  const data = image.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (random() - 0.5) * 26;
    data[i] = clampNumber(data[i] + noise, 0, 255);
    data[i + 1] = clampNumber(data[i + 1] + noise, 0, 255);
    data[i + 2] = clampNumber(data[i + 2] + noise, 0, 255);
  }
  ctx.putImageData(image, 0, 0);
}

function applyOperationMapTransform() {
  if (!operationMapStage) {
    return;
  }

  const tiltX = operationMapTransform.tilt + operationMapTransform.mouseTiltX;
  const tiltY = operationMapTransform.mouseTiltY;
  const stageScale = operationMapTransform.scale * operationMapTransform.hoverScale;

  operationMapStage.style.setProperty("--map-rotate", `${operationMapTransform.rotate}deg`);
  operationMapStage.style.setProperty("--map-rotate-inverse", `${-operationMapTransform.rotate}deg`);
  operationMapStage.style.setProperty("--map-tilt", `${tiltX}deg`);
  operationMapStage.style.setProperty("--map-tilt-inverse", `${-tiltX}deg`);
  operationMapStage.style.setProperty("--map-tilt-y", `${tiltY}deg`);
  operationMapStage.style.setProperty("--map-tilt-y-inverse", `${-tiltY}deg`);
  operationMapStage.style.transform = `
    translate3d(calc(-50% + ${operationMapTransform.x}px), calc(-50% + ${operationMapTransform.y}px), 0)
    rotateX(${tiltX}deg)
    rotateY(${tiltY}deg)
    rotateZ(${operationMapTransform.rotate}deg)
    scale(${stageScale})
  `;
  window.requestAnimationFrame(updateMissionLaser);
}

function resetOperationMapView() {
  stopMissionOrbit();
  operationMapTransform.x = 0;
  operationMapTransform.y = 0;
  operationMapTransform.scale = 1;
  operationMapTransform.hoverScale = 1;
  operationMapTransform.rotate = 0;
  operationMapTransform.tilt = 0;
  operationMapTransform.mouseTiltX = 0;
  operationMapTransform.mouseTiltY = 0;
  applyOperationMapTransform();
  updateMissionLaser();
}

function zoomOperationMap(direction) {
  operationMapTransform.scale = clampNumber(operationMapTransform.scale + direction * 0.16, 0.76, 2.45);
  applyOperationMapTransform();
  updateMissionLaser();
}

function handleOperationMapHover(event) {
  if (!operationMap || operationMapPointer) {
    return;
  }

  const rect = operationMap.getBoundingClientRect();
  const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
  const yRatio = (event.clientY - rect.top) / rect.height - 0.5;
  operationMapTransform.mouseTiltX = clampNumber(yRatio * -8, -4, 4);
  operationMapTransform.mouseTiltY = clampNumber(xRatio * 12, -6, 6);
  operationMapTransform.hoverScale = 1.03;
  applyOperationMapTransform();
}

function resetOperationMapHover() {
  operationMapTransform.mouseTiltX = 0;
  operationMapTransform.mouseTiltY = 0;
  operationMapTransform.hoverScale = 1;
  applyOperationMapTransform();
}

function operationIndex(operation) {
  return operations.findIndex((item) => item.id === operation.id);
}

function updateBriefingPreview(operation = null) {
  if (!operationBriefingCard) {
    return;
  }

  operationBriefingCard.classList.toggle("hidden", !operation);

  if (!operation) {
    operationBriefingCard.classList.remove("mission-reveal");
    operationBriefingIndex.textContent = "SIGNAL 00";
    operationBriefingTitle.textContent = "Sélectionner une mission";
    operationBriefingLocation.textContent = "---";
    operationBriefingYear.textContent = "---";
    operationBriefingType.textContent = "---";
    operationBriefingImpact.textContent = "---";
    operationBriefingStatus.textContent = "---";
    operationBriefingSubjects.textContent = "---";
    operationBriefingClass.textContent = "---";
    updateMissionLaser();
    return;
  }

  const index = operation ? operationIndex(operation) : -1;
  operationBriefingCard.classList.remove("mission-reveal");
  void operationBriefingCard.offsetWidth;
  operationBriefingCard.classList.add("mission-reveal");

  operationBriefingIndex.textContent = index >= 0 ? `SIGNAL ${String(index + 1).padStart(2, "0")}` : "SIGNAL 00";
  operationBriefingTitle.textContent = operation ? operation.name : "Sélectionner une mission";
  operationBriefingLocation.textContent = operation ? operation.location : "---";
  operationBriefingYear.textContent = operation ? operation.year : "---";
  operationBriefingType.textContent = operation ? operation.type : "---";
  operationBriefingImpact.textContent = operation ? operation.impact : "---";
  operationBriefingStatus.textContent = operation ? operation.status : "---";
  operationBriefingSubjects.textContent = operation ? operationSubjectsFor(operation) : "---";
  operationBriefingClass.textContent = operation ? `${operation.classification}%` : "---";
  window.requestAnimationFrame(updateMissionLaser);
}

function focusOperationMap(operation) {
  if (!operationMapStage || !operationMap) {
    return;
  }

  const stageWidth = operationMapStage.offsetWidth || 1800;
  const stageHeight = operationMapStage.offsetHeight || 900;
  operationMapTransform.scale = 1.62;
  operationMapTransform.hoverScale = 1;
  operationMapTransform.x = ((50 - operation.x) / 100) * stageWidth * 0.72;
  operationMapTransform.y = ((50 - operation.y) / 100) * stageHeight * 0.58;
  operationMapTransform.rotate = clampNumber((operation.x - 50) * 0.12, -8, 8);
  operationMapTransform.tilt = clampNumber((50 - operation.y) * 0.08, -4, 4);
  operationMapTransform.mouseTiltX = 0;
  operationMapTransform.mouseTiltY = 0;
  applyOperationMapTransform();
}

function updateMissionLaser() {
  if (!operationLaserLayer || !operationMap || !operationBriefingCard) {
    return;
  }

  const activePoint = operationPoints?.querySelector(".operation-point.active");
  if (!activePoint || operationBriefingCard.classList.contains("hidden")) {
    operationLaserLayer.innerHTML = "";
    return;
  }

  const mapRect = operationMap.getBoundingClientRect();
  const pointRect = activePoint.getBoundingClientRect();
  const cardRect = operationBriefingCard.getBoundingClientRect();
  const x1 = pointRect.left + pointRect.width / 2 - mapRect.left;
  const y1 = pointRect.top + pointRect.height / 2 - mapRect.top;
  const x2 = cardRect.left + cardRect.width / 2 - mapRect.left;
  const y2 = cardRect.top + cardRect.height * 0.58 - mapRect.top;

  operationLaserLayer.setAttribute("viewBox", `0 0 ${mapRect.width} ${mapRect.height}`);
  operationLaserLayer.innerHTML = `
    <defs>
      <filter id="missionLaserGlow">
        <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
        <feMerge>
          <feMergeNode in="blur"></feMergeNode>
          <feMergeNode in="SourceGraphic"></feMergeNode>
        </feMerge>
      </filter>
    </defs>
    <line class="mission-laser-shadow" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>
    <line class="mission-laser" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"></line>
    <circle class="mission-laser-lock" cx="${x1}" cy="${y1}" r="8"></circle>
  `;
}

function setMissionListCollapsed(collapsed) {
  operationContactStrip?.classList.toggle("collapsed", collapsed);
  missionListToggle?.classList.toggle("hidden", !collapsed);
}

function stopMissionOrbit() {
  if (missionOrbitFrame) {
    window.cancelAnimationFrame(missionOrbitFrame);
    missionOrbitFrame = null;
  }

  missionOrbitBase = null;
  operationMap?.classList.remove("mission-orbiting");
}

function startMissionOrbit(operation) {
  stopMissionOrbit();
  missionOrbitBase = {
    operation,
    startedAt: performance.now(),
    rotate: operationMapTransform.rotate,
    x: operationMapTransform.x,
    y: operationMapTransform.y,
  };
  operationMap?.classList.add("mission-orbiting");

  const orbit = (time) => {
    if (!missionOrbitBase || activeOperationId !== operation.id) {
      return;
    }

    const elapsed = (time - missionOrbitBase.startedAt) / 1000;
    operationMapTransform.rotate = missionOrbitBase.rotate + Math.sin(elapsed * 0.75) * 2.8;
    operationMapTransform.x = missionOrbitBase.x + Math.cos(elapsed * 0.7) * 24;
    operationMapTransform.y = missionOrbitBase.y + Math.sin(elapsed * 0.52) * 12;
    applyOperationMapTransform();
    missionOrbitFrame = window.requestAnimationFrame(orbit);
  };

  missionOrbitFrame = window.requestAnimationFrame(orbit);
}

function renderOperationContactStrip() {
  if (!operationContactStrip) {
    return;
  }

  operationContactStrip.innerHTML = `
    <div class="operation-menu-head">
      <span>Index missions</span>
      <strong>${String(operations.length).padStart(2, "0")}</strong>
      <button class="window-close mission-strip-close" type="button" data-close-mission-list aria-label="Fermer la liste">×</button>
    </div>
    ${operations
      .map((operation, index) => {
        const active = operation.id === activeOperationId ? " active" : "";
        const unlocked = isOperationUnlocked(operation);
        const opened = state.openedOperations.has(operation.id) ? " opened" : "";
      return `
        <button class="contact-chip${active}${opened}" type="button" data-strip-operation="${operation.id}" aria-label="${operation.name} — ${operation.location}">
          <span>${String(index + 1).padStart(2, "0")}</span>
          <b>${operation.name}</b>
          <em>${operation.location}</em>
          <small>${unlocked ? operationSubjectsFor(operation) : "CODE REQUIS"}</small>
          <i>${unlocked ? operation.status : "LOCKED"}</i>
        </button>
      `;
      })
      .join("")}
  `;

  operationContactStrip.querySelectorAll("[data-strip-operation]").forEach((button) => {
    button.addEventListener("click", () => selectOperation(button.dataset.stripOperation));
  });
  operationContactStrip.querySelector("[data-close-mission-list]")?.addEventListener("click", () => setMissionListCollapsed(true));
}

function renderOperationMap() {
  if (!operationPoints || !operationLines) {
    return;
  }

  const byId = new Map(operations.map((operation) => [operation.id, operation]));

  operationLines.innerHTML = operationConnections
    .map(([fromId, toId]) => {
      const from = byId.get(fromId);
      const to = byId.get(toId);

      if (!from || !to) {
        return "";
      }

      return `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" />`;
    })
    .join("");

  operationPoints.innerHTML = "";
  if (operationCount) {
    operationCount.textContent = `${operations.length} signaux // ${openedOperationCount()} ouverts`;
  }

  operations.forEach((operation, index) => {
    const button = document.createElement("button");
    const unlocked = isOperationUnlocked(operation);
    button.type = "button";
    button.className = "operation-point";
    button.classList.toggle("locked", !unlocked);
    button.classList.toggle("active", operation.id === activeOperationId);
    button.style.left = `${operation.x}%`;
    button.style.top = `${operation.y}%`;
    button.style.setProperty("--label-x", `${operation.labelX ?? 24}px`);
    button.style.setProperty("--label-y", `${operation.labelY ?? 68}px`);
    button.dataset.operation = operation.id;
    button.innerHTML = `
      <span class="pin-beam"></span>
      <span class="pin-dot"></span>
      <span class="pin-card">
        <i></i>
        <b>${operation.location}</b>
        <em>${unlocked ? operation.name : "LOCKED"}</em>
        <small>${unlocked ? operationSubjectsFor(operation) : "CODE REQUIS"}</small>
      </span>
      <strong>${String(index + 1).padStart(2, "0")}</strong>
    `;
    button.setAttribute("aria-label", `${operation.name} — ${unlocked ? operation.location : "verrouillé"}`);
    button.addEventListener("click", () => selectOperation(operation.id));
    operationPoints.appendChild(button);
  });

  renderOperationContactStrip();
}

function selectOperation(operationId) {
  const operation = operations.find((item) => item.id === operationId);

  if (!operation) {
    return;
  }

  if (operationId !== activeOperationId && !operationSessionAccess.has(operationId)) {
    operationSessionAccess.clear();
  }

  activeOperationId = operationId;
  renderOperationMap();
  focusOperationMap(operation);

  if (!isOperationUnlocked(operation)) {
    stopMissionOrbit();
    updateBriefingPreview();
    showOperationLock(operation);
    return;
  }

  openOperationFile(operation);
}

function showOperationLock(operation) {
  pendingOperationId = operation.id;
  operationEmpty.classList.add("hidden");
  operationDetails.classList.add("hidden");
  operationLockForm.classList.remove("hidden");
  operationFile?.classList.add("lock-open");
  operationSide?.classList.add("lock-open");
  operationUnlockCode.value = "";
  operationLockFeedback.textContent = "";
  operationLockHint.textContent = operation.hint || "Ce dossier exige une clé interne.";
  operationMap.classList.add("file-open");
  visualPulse("ACCÈS REFUSÉ");
  operationUnlockCode.focus();
}

function openOperationFile(operation) {
  pendingOperationId = null;
  operationEmpty.classList.add("hidden");
  operationLockForm.classList.add("hidden");
  operationFile?.classList.remove("lock-open");
  operationSide?.classList.remove("lock-open");
  operationDetails.classList.remove("hidden");
  operationMap.classList.add("file-open");

  state.openedOperations.add(operation.id);
  localStorage.setItem("ascalonOperationsOpened", JSON.stringify([...state.openedOperations]));
  updateBriefingPreview(operation);
  startMissionOrbit(operation);

  operationImage.classList.remove("image-missing");
  operationImage.src = operationAsset(operation.image);
  operationTitle.textContent = operation.name;
  operationLocation.textContent = operation.location;
  operationYear.textContent = operation.year;
  operationType.textContent = operation.type;
  operationImpact.textContent = operation.impact;
  operationStatus.textContent = operation.status;
  operationSubjects.textContent = operationSubjectsFor(operation);
  operationNote.textContent = "";
  classificationFill.style.width = `${operation.classification}%`;

  renderOperationHiddenMessage();
  renderOperationMap();
  window.setTimeout(updateMissionLaser, 60);
  visualPulse("DOSSIER OUVERT");

  if (operation.id === "east-cipher") {
    triggerEmotionalAnomaly();
  }
}

function closeOperationPanel() {
  activeOperationId = null;
  pendingOperationId = null;
  operationSessionAccess.clear();
  stopMissionOrbit();
  updateBriefingPreview();
  operationMap.classList.remove("file-open");
  operationDetails.classList.add("hidden");
  operationLockForm.classList.add("hidden");
  operationFile?.classList.remove("lock-open");
  operationSide?.classList.remove("lock-open");
  operationEmpty.classList.remove("hidden");
  renderOperationMap();
}

function unlockPendingOperation() {
  const operation = operations.find((item) => item.id === pendingOperationId);

  if (!operation) {
    return;
  }

  if (normalizeCode(operationUnlockCode.value) === operation.code) {
    operationLockFeedback.textContent = "Accès accordé. Dossier restauré.";
    visualPulse("DOSSIER DÉVERROUILLÉ");
    operationSessionAccess.add(operation.id);
    openOperationFile(operation);
    return;
  }

  operationLockFeedback.textContent = "Code refusé. Tentative enregistrée.";
  operationUnlockCode.value = "";
  visualPulse("ACCÈS REFUSÉ");
}

function renderOperationHiddenMessage() {
  if (!operationHiddenMessage) {
    return;
  }

  operationHiddenMessage.classList.add("hidden");
}

function triggerEmotionalAnomaly() {
  operationMap.classList.add("operation-anomaly");
  operationAlertTitle.textContent = "CANAL SECONDAIRE OUVERT";
  operationAlertText.textContent = "Données restaurées. Niveau de classification maximal.";
  operationAlert.classList.remove("hidden");

  window.setTimeout(() => {
    operationAlertTitle.textContent = "SIGNAL INSTABLE";
    operationAlertText.textContent = "Données restaurées. Niveau de classification maximal.";
  }, 1800);

  window.setTimeout(() => {
    operationAlert.classList.add("hidden");
    operationMap.classList.remove("operation-anomaly");
  }, 5600);
}

operationImage.addEventListener("error", () => {
  if (operationImage.src.endsWith("no-signal.svg")) {
    operationImage.classList.add("image-missing");
    return;
  }

  operationImage.src = OPERATION_FALLBACK_IMAGE;
});

closeOperationFile.addEventListener("click", closeOperationPanel);
closeOperationPreview?.addEventListener("click", closeOperationPanel);
document.querySelectorAll("[data-close-operation-panel]").forEach((button) => {
  button.addEventListener("click", closeOperationPanel);
});
missionListToggle?.addEventListener("click", () => setMissionListCollapsed(false));

operationLockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  unlockPendingOperation();
});

if (operationMap && operationMapStage) {
  operationMap.addEventListener("contextmenu", (event) => event.preventDefault());
  operationMap.addEventListener("mousemove", handleOperationMapHover);
  operationMap.addEventListener("mouseleave", resetOperationMapHover);

  operationMap.addEventListener("pointerdown", (event) => {
    if (
      event.target.closest(".operation-point") ||
      event.target.closest(".ops-map-controls") ||
      event.target.closest(".operation-contact-strip") ||
      event.target.closest(".mission-list-toggle")
    ) {
      return;
    }

    if (event.button !== 0 && event.button !== 2) {
      return;
    }

    event.preventDefault();
    stopMissionOrbit();
    operationMapPointer = {
      id: event.pointerId,
      mode: event.button === 2 ? "rotate" : "pan",
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: operationMapTransform.x,
      startY: operationMapTransform.y,
      startRotate: operationMapTransform.rotate,
      startTilt: operationMapTransform.tilt,
    };
    operationMap.classList.add(operationMapPointer.mode === "rotate" ? "is-rotating" : "is-panning");
    operationMap.setPointerCapture(event.pointerId);
  });

  operationMap.addEventListener("pointermove", (event) => {
    if (!operationMapPointer || operationMapPointer.id !== event.pointerId) {
      return;
    }

    const deltaX = event.clientX - operationMapPointer.startClientX;
    const deltaY = event.clientY - operationMapPointer.startClientY;

    if (operationMapPointer.mode === "pan") {
      operationMapTransform.x = operationMapPointer.startX + deltaX;
      operationMapTransform.y = operationMapPointer.startY + deltaY;
    } else {
      operationMapTransform.rotate = operationMapPointer.startRotate + deltaX * 0.18;
      operationMapTransform.tilt = clampNumber(operationMapPointer.startTilt - deltaY * 0.035, -6, 6);
    }

    applyOperationMapTransform();
    updateMissionLaser();
  });

  const stopOperationMapInteraction = (event) => {
    if (!operationMapPointer || operationMapPointer.id !== event.pointerId) {
      return;
    }

    operationMap.classList.remove("is-panning", "is-rotating");
    operationMapPointer = null;
    if (operationMap.hasPointerCapture(event.pointerId)) {
      operationMap.releasePointerCapture(event.pointerId);
    }
  };

  operationMap.addEventListener("pointerup", stopOperationMapInteraction);
  operationMap.addEventListener("pointercancel", stopOperationMapInteraction);
  operationContactStrip?.addEventListener("wheel", (event) => {
    event.stopPropagation();
  });
  operationContactStrip?.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
  });
  operationMap.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      stopMissionOrbit();
      zoomOperationMap(event.deltaY > 0 ? -1 : 1);
    },
    { passive: false },
  );
}

operationZoomOut.addEventListener("click", () => zoomOperationMap(-1));
operationZoomIn.addEventListener("click", () => zoomOperationMap(1));
operationResetMap.addEventListener("click", resetOperationMapView);
window.addEventListener("resize", () => {
  drawOperationEarth();
  updateMissionLaser();
});

function renderArchiveVault() {
  if (!archiveAccessPanel || !archiveContent || !archiveAccessFeedback) {
    return;
  }

  const unlocked = state.archiveVaultUnlocked;
  archiveAccessPanel.classList.toggle("hidden", unlocked);
  archiveContent.classList.toggle("hidden", !unlocked);
  archiveAccessFeedback.textContent = unlocked ? "Accès archives confirmé." : "";
  updateArchivePinDisplay();
}

function updateArchivePinDisplay() {
  if (!archivePinDisplay) {
    return;
  }

  if (!archiveVaultInput) {
    archivePinDisplay.textContent = "•••••••";
    return;
  }

  archivePinDisplay.textContent = "•".repeat(archiveVaultInput.length).padEnd(ARCHIVE_VAULT_CODE.length, "·");
}

function handleVaultKey(key) {
  if (state.archiveVaultUnlocked) {
    return;
  }

  if (key === "clear") {
    archiveVaultInput = "";
    archiveAccessFeedback.textContent = "Saisie effacée.";
    updateArchivePinDisplay();
    return;
  }

  if (key === "enter") {
    validateArchiveVault();
    return;
  }

  if (!/^\d$/.test(key) || archiveVaultInput.length >= ARCHIVE_VAULT_CODE.length) {
    return;
  }

  archiveVaultInput += key;
  archiveAccessFeedback.textContent = "";
  updateArchivePinDisplay();

  if (archiveVaultInput.length === ARCHIVE_VAULT_CODE.length) {
    validateArchiveVault();
  }
}

function validateArchiveVault() {
  if (archiveVaultInput === ARCHIVE_VAULT_CODE) {
    state.archiveVaultUnlocked = true;
    localStorage.setItem("ascalonArchiveVault", "true");
    archiveAccessFeedback.textContent = "Accès autorisé. Fichiers ouverts.";
    visualPulse("FICHIERS OUVERTS");
    renderArchiveVault();
  } else {
    archiveVaultInput = "";
    archiveAccessFeedback.textContent = "Séquence refusée. Le clavier reste froid.";
    visualPulse("ACCÈS REFUSÉ");
    updateArchivePinDisplay();
  }
}

vaultKeys.forEach((button) => {
  button.addEventListener("click", () => handleVaultKey(button.dataset.vaultKey));
});

document.addEventListener("keydown", (event) => {
  const archivesPage = document.getElementById("page-archives");
  const archivesActive = archivesPage?.classList.contains("active");

  if (!archivesActive || state.archiveVaultUnlocked || body.classList.contains("locked")) {
    return;
  }

  if (/^\d$/.test(event.key)) {
    event.preventDefault();
    handleVaultKey(event.key);
  }

  if (event.key === "Backspace") {
    event.preventDefault();
    archiveVaultInput = archiveVaultInput.slice(0, -1);
    updateArchivePinDisplay();
  }

  if (event.key === "Enter") {
    event.preventDefault();
    validateArchiveVault();
  }
});

function openSignal(message) {
  signalMessage.textContent = message;
  signalModal.classList.remove("hidden");
  visualPulse("SIGNAL INTERCEPTÉ");
}

function closeSignalModal() {
  signalModal.classList.add("hidden");
}

closeSignal.addEventListener("click", closeSignalModal);
signalModal.addEventListener("click", (event) => {
  if (event.target === signalModal) {
    closeSignalModal();
  }
});

function openDexModal() {
  dexModal.classList.remove("hidden");
  dexSpoiler.classList.remove("hidden");
  dexFigure.classList.add("hidden");
  visualPulse("IMAGE EXTRAITE");
}

function closeDexModal() {
  dexModal.classList.add("hidden");
}

function revealDexImage() {
  dexSpoiler.classList.add("hidden");
  dexTriedLocalPhoto = false;
  dexFallbackNote.classList.add("hidden");
  dexImage.classList.remove("hidden");
  dexImage.src = mediaUrl(DEX_PHOTO_FILE, "dex");
  dexFigure.classList.remove("hidden");
}

closeDex.addEventListener("click", closeDexModal);
backDex.addEventListener("click", closeDexModal);
revealDex.addEventListener("click", revealDexImage);
dexModal.addEventListener("click", (event) => {
  if (event.target === dexModal) {
    closeDexModal();
  }
});

dexImage.addEventListener("load", () => {
  dexImage.classList.remove("hidden");
  dexFallbackNote.classList.add("hidden");
});

dexImage.addEventListener("error", () => {
  if (!dexTriedLocalPhoto) {
    dexTriedLocalPhoto = true;
    dexImage.src = DEX_PHOTO_FALLBACK;
    return;
  }

  dexImage.classList.add("hidden");
  dexFallbackNote.classList.remove("hidden");
});

function startMamanArchive() {
  resetArchive();
  archiveGame.classList.remove("hidden");
  archiveGame.setAttribute("aria-hidden", "false");
  body.classList.add("archive-active");
  visualPulse("ARCHIVE VIDÉO");
}

function resetArchive() {
  clearArchiveTimers();
  archiveCoverImage.src = mediaUrl(GAME_MEDIA.cover, "cover");
  archiveState.activeCamera = "cam01";
  archiveState.unlocked = new Set(["cam01", "cam02"]);
  archiveState.viewed = new Set();
  archiveState.progress = 0;
  archiveState.dossierClicks = 0;
  archiveState.secretShown = false;

  archiveBoot.classList.remove("hidden");
  archiveInterface.classList.add("hidden");
  archiveDamaged.classList.add("hidden");
  archiveFinal.classList.add("hidden");
  archiveSecret.classList.add("hidden");
  cameraStatic.classList.add("hidden");
  cameraScreen.classList.remove("switching");
  archiveLog.innerHTML = "";
  updateArchiveProgress(0);
  updateCameraButtons();
}

function launchArchive() {
  archiveBoot.classList.add("hidden");
  archiveInterface.classList.remove("hidden");
  selectCamera("cam01", true);
}

function closeArchive() {
  clearArchiveTimers();
  archiveGame.classList.add("hidden");
  archiveGame.setAttribute("aria-hidden", "true");
  body.classList.remove("archive-active");
}

function selectCamera(cameraId, instant = false) {
  if (!archiveState.unlocked.has(cameraId)) {
    visualPulse("CAMÉRA VERROUILLÉE");
    return;
  }

  if (cameraId === "cam06") {
    startDamagedCamera();
    return;
  }

  clearArchiveTimers();
  archiveState.activeCamera = cameraId;
  cameraStatic.classList.remove("hidden");
  cameraScreen.classList.add("switching");
  updateCameraButtons();

  queueArchiveTimer(instant ? 80 : 420, () => {
    renderCamera(cameraId);
    markCameraViewed(cameraId);
    runCameraTimeline(cameraId);
    cameraStatic.classList.add("hidden");
    cameraScreen.classList.remove("switching");
  });
}

function renderCamera(cameraId) {
  const camera = cameraData[cameraId];
  cameraFrame.innerHTML = cameraScenes[cameraId]();
  wireArchiveMediaFallbacks(cameraFrame);
  cameraLabel.textContent = camera.label;
  cameraSignal.textContent = camera.signal;
  if (camera.log) {
    addArchiveLog("cam", camera.log);
  }
}

function markCameraViewed(cameraId) {
  archiveState.viewed.add(cameraId);

  if (cameraId === "cam01") {
    updateArchiveProgress(20);
  }

  if (cameraId === "cam02") {
    updateArchiveProgress(40);
  }

  if (cameraId === "cam03") {
    updateArchiveProgress(60);
  }

  if (archiveState.viewed.has("cam04") && archiveState.viewed.has("cam05")) {
    updateArchiveProgress(80);
  }

  updateCameraButtons();
}

function runCameraTimeline(cameraId) {
  if (cameraId === "cam02") {
    queueArchiveTimer(2400, () => {
      unlockCamera("cam03");
    });
  }

  if (cameraId === "cam03") {
    queueArchiveTimer(2100, () => {
      unlockCamera("cam04");
      unlockCamera("cam05");
    });
  }

  if (cameraId === "cam04" || cameraId === "cam05") {
    queueArchiveTimer(900, () => {
      if (archiveState.viewed.has("cam04") && archiveState.viewed.has("cam05")) {
        unlockCamera("cam06");
        updateArchiveProgress(80);
      }
    });
  }
}

function unlockCamera(cameraId) {
  archiveState.unlocked.add(cameraId);
  updateCameraButtons();
}

function updateCameraButtons() {
  cameraButtons.forEach((button) => {
    const cameraId = button.dataset.cam;
    const unlocked = archiveState.unlocked.has(cameraId);
    const camera = cameraData[cameraId];
    button.classList.toggle("locked", !unlocked);
    button.classList.toggle("active", cameraId === archiveState.activeCamera && archiveInterface && !archiveInterface.classList.contains("hidden"));
    button.querySelector("span").textContent = unlocked ? camera.short : "LOCKED";
  });
}

function updateArchiveProgress(value) {
  archiveState.progress = Math.max(archiveState.progress, value);
  archivePercent.textContent = `${archiveState.progress}%`;
  archiveProgressFill.style.width = `${archiveState.progress}%`;
}

function startDamagedCamera() {
  clearArchiveTimers();
  archiveState.activeCamera = "cam06";
  archiveState.viewed.add("cam06");
  updateArchiveProgress(100);
  updateCameraButtons();
  archiveInterface.classList.add("hidden");
  archiveDamaged.classList.remove("hidden");
  archiveFinal.classList.add("hidden");
  showDamagedStep("signal");

  queueArchiveTimer(1700, () => showDamagedStep("corridor"));
  queueArchiveTimer(4900, () => showDamagedStep("bedroom"));
  queueArchiveTimer(8500, () => {
    archiveDamaged.classList.add("hidden");
    archiveFinal.classList.remove("hidden");
  });
}

function showDamagedStep(step) {
  const steps = {
    signal: `
      <div class="damaged-screen damaged-signal">
        <p>CAM 06 — ACCÈS ENDOMMAGÉ</p>
        <span>SIGNAL FAIBLE</span>
      </div>
    `,
    corridor: `
      <div class="damaged-screen damaged-corridor damaged-media-screen">
        <video class="archive-sequence-media" src="${mediaUrl(GAME_MEDIA.cam06, "cam06")}" data-archive-video="cam06" data-archive-src="${GAME_MEDIA.cam06}" autoplay muted playsinline></video>
        <div class="camera-media-vignette"></div>
        <div class="cctv-glitch-layer" aria-hidden="true"></div>
      </div>
    `,
    bedroom: `
      <div class="damaged-screen damaged-bedroom damaged-media-screen">
        <img class="archive-sequence-media" src="${mediaUrl(GAME_MEDIA.cam06Image, "cam06Image")}" data-archive-media="cam06Image" data-archive-src="${GAME_MEDIA.cam06Image}" alt="" />
        <div class="camera-media-vignette"></div>
        <div class="cctv-glitch-layer" aria-hidden="true"></div>
        <div class="blink-shutter" aria-hidden="true"></div>
      </div>
    `,
  };

  archiveDamaged.innerHTML = steps[step];
  wireArchiveMediaFallbacks(archiveDamaged);
}

function addArchiveLog(label, text) {
  const line = document.createElement("p");
  const labelNode = document.createElement("span");
  labelNode.textContent = label;
  line.append(labelNode, ` ${text}`);
  archiveLog.appendChild(line);
  archiveLog.scrollTop = archiveLog.scrollHeight;
}

function handleDossierClick() {
  archiveState.dossierClicks += 1;

  if (archiveState.dossierClicks >= 5 && !archiveState.secretShown) {
    archiveState.secretShown = true;
    archiveSecret.classList.remove("hidden");
    addArchiveLog("sys", "fragment lié au protocole ASCALON détecté.");
    appendConsoleLine("sys", "fragment lié au protocole ASCALON détecté.");
    window.setTimeout(() => archiveSecret.classList.add("hidden"), 3600);
  }
}

archiveLaunch.addEventListener("click", launchArchive);
archiveExitIntro.addEventListener("click", closeArchive);
archiveExit.addEventListener("click", closeArchive);
archiveBackMenu.addEventListener("click", resetArchive);
archiveNextFragment.addEventListener("click", () => {
  closeArchive();
  showPage("messages");
});

cameraButtons.forEach((button) => {
  button.addEventListener("click", () => selectCamera(button.dataset.cam));
});

dossierTriggers.forEach((trigger) => {
  trigger.addEventListener("click", handleDossierClick);
});

window.startMamanArchive = startMamanArchive;

consoleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleConsoleCommand();
});

consoleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleConsoleCommand();
  }
});

function handleConsoleCommand() {
  const rawCommand = consoleInput.value.trim();
  const command = normalizeCode(rawCommand);

  if (!command) {
    return;
  }

  appendConsoleLine(">", rawCommand);
  consoleInput.value = "";

  const responses = {
    AIDE: "commandes : ETAT, N17, TRACE, SCELLE, DEX, MAMAN, EFFACER.",
    HELP: "commandes : ETAT, N17, TRACE, SCELLE, DEX, MAMAN, EFFACER.",
    ETAT: "archive ouverte. niveau incomplet.",
    STATUS: "archive ouverte. niveau incomplet.",
    N17: "sujet actif. douleur consignée. motif absent.",
    TRACE: "une trace mène au foyer. une autre au sud.",
    SCELLE: "trois pages manquent. aucune autorité visible.",
    DUVAL: "nom reconnu. entrée verrouillée.",
    NADIR: "sujet N-17. dossier incomplet.",
    CATALEYA: "nom lumineux. protocole instable.",
    DEX: "image extraite. source non confirmée.",
    EFFACER: "",
    CLEAR: "",
  };

  if (command === "MAMAN") {
    if (window.startMamanArchive) {
      window.startMamanArchive();
    } else {
      appendConsoleLine("sys", "module archive indisponible.");
    }
    return;
  }

  if (command === "DEX") {
    appendConsoleLine("sys", responses.DEX);
    openDexModal();
    return;
  }

  if (command === "EFFACER" || command === "CLEAR") {
    terminalLog.innerHTML = "";
    appendConsoleLine("sys", "tampon vidé.");
    return;
  }

  appendConsoleLine("sys", responses[command] || "aucune réponse.");
}

function appendConsoleLine(label, text) {
  const line = document.createElement("p");
  const labelNode = document.createElement("span");
  labelNode.textContent = label;
  line.append(labelNode, ` ${text}`);
  terminalLog.appendChild(line);
  terminalLog.scrollTop = terminalLog.scrollHeight;
}

document.getElementById("downloadReport")?.addEventListener("click", () => {
  alert("Rapport final indisponible — archive déplacée.");
});
