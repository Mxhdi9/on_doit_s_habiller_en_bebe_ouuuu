/* A fictional, admin-only NODAL experience. Browser escape/navigation stays available. */
(() => {
  "use strict";
  let settings = null;
  let screen = null;
  let state = "closed";
  let returnFocus = null;
  let desktopWasInert = false;
  let ownsFullscreen = false;
  let choiceRecorded = false;
  const timers = new Set();
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const later = (callback, delay) => {
    const owner = screen;
    const timer = window.setTimeout(() => {
      timers.delete(timer);
      if (screen === owner) callback();
    }, delay);
    timers.add(timer);
  };

  function close({ restoreFocus = true } = {}) {
    if (!screen) return;
    const previousScreen = screen;
    screen = null;
    state = "closed";
    timers.forEach(window.clearTimeout);
    timers.clear();
    ownsFullscreen = false;
    settings.desktop.inert = desktopWasInert;
    document.body.classList.remove("nadir-app-open");
    previousScreen.remove();
    if (document.fullscreenElement === previousScreen) {
      document.exitFullscreen?.().catch(() => {});
    }
    if (restoreFocus && returnFocus?.isConnected && returnFocus.getClientRects().length && !returnFocus.closest("[inert]")) {
      returnFocus.focus({ preventScroll: true });
    } else if (restoreFocus && !settings.desktop.classList.contains("hidden")) {
      (settings.desktop.querySelector(".nodal-icon[data-nodal-nadir]") || settings.desktop).focus({ preventScroll: true });
    }
    returnFocus = null;
    document.dispatchEvent(new CustomEvent("ascalon:overlaychange"));
  }

  function exitExperience() {
    if (!screen) return;
    close({ restoreFocus: false });
    settings.onExit?.();
  }

  function setChoiceLabel(value) {
    const label = screen.querySelector("[data-nadir-label]");
    label.textContent = value;
    label.dataset.glitchLabel = value;
  }

  function renderCommitted() {
    state = "committed";
    screen.dataset.state = state;
    setChoiceLabel("Tuer");
    screen.querySelector("[data-nadir-phase]").textContent = "INTENTION RÉÉCRITE";
    screen.querySelector("[data-nadir-message]").textContent = "Vous avez demandé de le sauver. Le protocole a enregistré autre chose.";
    screen.querySelector("[data-nadir-integrity]").textContent = "COMPROMISE";
    screen.querySelector("[data-nadir-status]").textContent = "DÉCISION SCELLÉE / N-17";
    screen.querySelector("[data-nadir-receipt]").textContent = "AUCUN RETOUR AU SEIN DU PROTOCOLE.";
    const choice = screen.querySelector("[data-nadir-choice]");
    choice.disabled = true;
    choice.setAttribute("aria-label", "Tuer");
    delete choice.dataset.glitch;
  }

  function commitChoice() {
    if (!screen || state !== "ready") return;
    choiceRecorded = true;
    state = "rewriting";
    screen.dataset.state = state;
    const choice = screen.querySelector("[data-nadir-choice]");
    choice.disabled = true;
    screen.focus({ preventScroll: true });
    screen.querySelector("[data-nadir-phase]").textContent = "TRANSMISSION DE LA DÉCISION";
    setChoiceLabel("Sauver");
    screen.querySelector("[data-nadir-status]").textContent = "ÉCRITURE EN COURS";
    const reducedMotion = motion.matches;
    if (!reducedMotion) {
      choice.dataset.glitch = "scramble";
      // Only the visual label scrambles; its accessible name stays stable.
      [[90, "SΛUVER"], [200, "SAU█ER"], [310, "SΛ/VER"], [420, "T█/R"],
        [530, "TU▓R"], [650, "TU_R"], [740, "TUER"]].forEach(([delay, label]) => {
        later(() => { if (!motion.matches) setChoiceLabel(label); }, delay);
      });
      later(() => {
        setChoiceLabel("Tuer");
        choice.dataset.glitch = "settle";
      }, 800);
    }
    later(() => {
      renderCommitted();
      // This hook is for a future RP cue; it performs no action outside this scene.
      screen.dispatchEvent(new CustomEvent("ascalon:nadir-choice", {
        bubbles: true,
        detail: { requested: "save", recorded: "kill", subject: "N-17" },
      }));
    }, reducedMotion ? 120 : 1040);
  }

  function open() {
    if (!settings?.canOpen() || screen) return false;
    returnFocus = document.activeElement;
    desktopWasInert = settings.desktop.inert;
    settings.desktop.inert = true;
    state = "initializing";
    screen = document.createElement("section");
    screen.className = "nadir-app";
    screen.dataset.state = state;
    screen.setAttribute("role", "dialog");
    screen.setAttribute("aria-modal", "true");
    screen.setAttribute("aria-labelledby", "nadirAppName");
    screen.setAttribute("aria-describedby", "nadirAppMessage");
    screen.tabIndex = -1;
    screen.innerHTML = `
      <header class="nadir-app__header">
        <span class="nadir-app__wordmark" id="nadirAppName">NADIR<span>.EXE</span></span>
        <span class="nadir-app__channel">CANAL PRIVILÉGIÉ / ADMIN</span>
        <span class="nadir-app__connection"><i></i>CONNEXION ÉTABLIE</span>
      </header>
      <div class="nadir-app__body">
        <aside class="nadir-app__rail" aria-hidden="true"><span>ORG-20-0717</span><span>SECTEUR KAPPA</span><span>N17_PROTOCOL</span></aside>
        <main class="nadir-app__core">
          <p class="nadir-app__eyebrow" data-nadir-phase>ÉTABLISSEMENT DU LIEN NEURAL</p>
          <div class="nadir-app__sigil" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none"><circle class="nadir-orbit" cx="100" cy="100" r="87"/><circle cx="100" cy="100" r="72" stroke-dasharray="2 8"/><path d="M100 0v28m0 144v28M0 100h28m144 0h28M38 38l15 15m94 94 15 15M38 162l15-15m94-94 15-15"/><path class="nadir-mark" d="M66 137V63h15l38 49V63h15v74h-15L81 88v49H66Z"/><path d="M85 153h30M85 47h30"/></svg>
          </div>
          <p class="nadir-app__subject">SUJET N-17</p>
          <p class="nadir-app__message" id="nadirAppMessage" data-nadir-message>Il est encore temps d’intervenir.</p>
          <button class="nadir-app__choice" data-nadir-choice type="button" aria-label="Sauver" disabled>
            <span class="nadir-app__choice-index" aria-hidden="true">01</span>
            <span data-nadir-label data-glitch-label="Sauver" aria-hidden="true">Sauver</span>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>
          </button>
          <p class="nadir-app__receipt" data-nadir-receipt role="status" aria-live="polite">Authentification de l’opérateur…</p>
        </main>
        <aside class="nadir-app__telemetry" aria-hidden="true">
          <span>LIEN NEURAL</span>
          <div class="nadir-app__wave"><svg viewBox="0 0 180 60" fill="none"><path d="M0 30h34l7-8 7 16 10-35 11 54 11-35 8 8h25l7-9 7 17 9-28 10 32 7-12h27"/></svg></div>
          <dl><div><dt>IDENTIFIANT</dt><dd>N-17</dd></div><div><dt>INTÉGRITÉ</dt><dd data-nadir-integrity>STABLE</dd></div><div><dt>OPÉRATEUR</dt><dd>ADMIN</dd></div></dl>
        </aside>
      </div>
      <footer class="nadir-app__footer"><span>ASCALON / INTERFACE DE DÉCISION</span><span data-nadir-status>SYNCHRONISATION</span><button class="nadir-app__escape" type="button" data-nadir-exit>Échap · Quitter l’expérience</button></footer>
    `.replace(/^\s+/gm, "");
    settings.host.appendChild(screen);
    document.body.classList.add("nadir-app-open");
    screen.querySelector("[data-nadir-choice]").addEventListener("click", commitChoice);
    screen.querySelector("[data-nadir-exit]").addEventListener("click", exitExperience);
    screen.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent("ascalon:overlaychange"));

    // Requested only from the launch click. A denied request falls back to the viewport.
    const openedScreen = screen;
    if (!document.fullscreenElement && openedScreen.requestFullscreen) {
      try {
        const request = openedScreen.requestFullscreen({ navigationUI: "hide" });
        Promise.resolve(request).then(() => {
          if (screen === openedScreen) ownsFullscreen = document.fullscreenElement === openedScreen;
          else if (document.fullscreenElement === openedScreen) document.exitFullscreen?.().catch(() => {});
        }).catch(() => {});
      } catch (_) { /* CEF/embedded browsers may not support native fullscreen. */ }
    }
    if (choiceRecorded) {
      renderCommitted();
      return true;
    }
    later(() => {
      state = "ready";
      screen.dataset.state = state;
      screen.querySelector("[data-nadir-phase]").textContent = "INTERVENTION DISPONIBLE";
      screen.querySelector("[data-nadir-status]").textContent = "EN ATTENTE DE VOTRE DÉCISION";
      screen.querySelector("[data-nadir-receipt]").textContent = "AUTORISATION ADMINISTRATEUR CONFIRMÉE";
      const choice = screen.querySelector("[data-nadir-choice]");
      choice.disabled = false;
      if (document.activeElement === screen) choice.focus({ preventScroll: true });
    }, motion.matches ? 100 : 1600);
    return true;
  }

  document.addEventListener("keydown", event => {
    if (!screen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      exitExperience();
    } else if (event.key === "Tab") {
      const controls = [...screen.querySelectorAll("button:not(:disabled)")];
      const first = controls[0], last = controls[controls.length - 1];
      if (!first) return;
      if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !controls.includes(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    }
  }, true);

  document.addEventListener("fullscreenchange", () => {
    if (screen && ownsFullscreen && document.fullscreenElement !== screen) exitExperience();
  });
  window.addEventListener("pagehide", () => close({ restoreFocus: false }));
  window.NadirExperience = Object.freeze({
    configure(options) { if (!settings) settings = options; },
    open,
    close,
    reset() { close({ restoreFocus: false }); choiceRecorded = false; },
    get active() { return screen !== null; },
    get state() { return state; },
  });
})();
