/* Read-only viewer. Report content is supplied only after archive decryption. */
(() => {
  "use strict";
  const readers = new WeakMap();
  const escape = value => String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));

  function inline(value) {
    return String(value).split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).map(part => {
      if (part.startsWith("**") && part.endsWith("**")) return `<strong>${escape(part.slice(2, -2))}</strong>`;
      if (part.startsWith("`") && part.endsWith("`")) return `<code>${escape(part.slice(1, -1))}</code>`;
      if (part.startsWith("*") && part.endsWith("*")) return `<em>${escape(part.slice(1, -1))}</em>`;
      return escape(part);
    }).join("").replace(/█{2,}/g, '<span class="nodal-police-redaction">$&</span>');
  }

  function renderBody(lines) {
    const output = [];
    let sectionOpen = false;
    for (let i = 0; i < lines.length;) {
      const line = lines[i].trim();
      if (!line || /^---+$/.test(line)) { i++; continue; }
      if (/^#{1,6}\s/.test(line)) {
        if (sectionOpen) output.push("</section>");
        output.push(`<section class="nodal-police-section"><h2>${inline(line.replace(/^#{1,6}\s+/, ""))}</h2>`);
        sectionOpen = true;
        i++;
        continue;
      }
      const block = [];
      while (i < lines.length && lines[i].trim() && !/^(?:#{1,6}\s|---+$)/.test(lines[i].trim())) block.push(lines[i++].trim());
      if (block.every(item => item.startsWith(">"))) {
        output.push(`<blockquote class="nodal-police-transcript"><p>${block.map(item => inline(item.replace(/^>\s?/, ""))).join("<br>")}</p></blockquote>`);
      } else if (block.every(item => item.startsWith("— "))) {
        output.push(`<ul>${block.map(item => `<li>${inline(item.slice(2))}</li>`).join("")}</ul>`);
      } else {
        output.push(`<p>${block.map(inline).join("<br>")}</p>`);
      }
    }
    if (sectionOpen) output.push("</section>");
    return output.join("");
  }

  function seal() {
    return `<svg class="nodal-police-seal" viewBox="0 0 160 160" role="img" aria-label="Emblème de la cellule d’enquête">
      <circle cx="80" cy="80" r="73" fill="none" stroke="currentColor" stroke-width="2"/>
      <circle cx="80" cy="80" r="67" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2 3"/>
      <circle cx="80" cy="80" r="56" fill="none" stroke="currentColor" opacity=".5"/>
      <path d="M80 40 108 51v24c0 19-13 34-28 42-15-8-28-23-28-42V51Z" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="m80 55 5 15 16 1-12 10 4 16-13-9-13 9 4-16-12-10 16-1Z" fill="currentColor"/>
      <path d="M46 113C29 96 30 70 43 53M114 113c17-17 16-43 3-60M37 88l9 4m-9-18 8 6m-4-20 7 9m75 19-9 4m9-18-8 6m4-20-7 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <text x="80" y="30" fill="currentColor" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="8" letter-spacing="1.7">SÉCURITÉ INTÉRIEURE</text>
      <text x="80" y="135" fill="currentColor" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-size="9" letter-spacing="3">D C S I</text>
    </svg>`;
  }

  function render(data) {
    const lines = String(data.text).replace(/\r\n/g, "\n").trimEnd().split("\n");
    const divider = lines.findIndex(line => /^---+$/.test(line.trim()));
    const intro = lines.slice(0, divider < 0 ? 0 : divider).filter(line => line.trim());
    const institution = intro.filter(line => /^#{1,6}\s/.test(line));
    const metadata = intro.filter(line => !/^#{1,6}\s/.test(line));
    return `<div class="nodal-police-viewer">
      <div class="nodal-police-toolbar"><div class="nodal-police-file"><strong>Rapport police.txt</strong><span>Lecture seule</span></div><div class="nodal-police-tools">
        <button type="button" data-nodal-report-top>Début du texte</button>
        <button type="button" data-nodal-report-autoscroll aria-pressed="false">Lecture automatique</button>
        <button type="button" data-nodal-lock>Verrouiller</button>
      </div></div>
      <div class="nodal-police-scroll" tabindex="0" role="document" aria-label="Rapport police">
        <article class="nodal-police-document"><header class="nodal-police-heading">${seal()}
          ${institution.map(line => `<p>${inline(line.replace(/^#{1,6}\s+/, ""))}</p>`).join("")}
          <h1>Rapport police</h1><p class="nodal-police-reference">${escape(data.reference)}</p>
        </header><div class="nodal-police-meta">${metadata.map(line => `<p>${inline(line.trim())}</p>`).join("")}</div>
        ${renderBody(lines.slice(divider < 0 ? 0 : divider + 1))}
        </article>
      </div>
      <footer class="nodal-police-status"><span>${escape(data.classification)} · ${escape(data.reference)}</span><output data-nodal-report-progress aria-label="Position de lecture">0 %</output></footer>
    </div>`;
  }

  function mount(element) {
    if (readers.has(element)) return;
    const scroll = element.querySelector(".nodal-police-scroll");
    if (!scroll) return;
    const button = element.querySelector("[data-nodal-report-autoscroll]");
    const progress = element.querySelector("[data-nodal-report-progress]");
    const listeners = new AbortController();
    let frame = 0, running = false, previousTime = 0, position = scroll.scrollTop;
    const update = () => {
      const maximum = scroll.scrollHeight - scroll.clientHeight;
      const percent = maximum > 0 ? Math.min(100, Math.round(scroll.scrollTop / maximum * 100)) : 100;
      progress.value = `${percent} %`;
    };
    const pause = () => {
      running = false;
      previousTime = 0;
      cancelAnimationFrame(frame);
      frame = 0;
      button.setAttribute("aria-pressed", "false");
      button.textContent = "Lecture automatique";
    };
    const advance = time => {
      if (!element.isConnected || element.classList.contains("hidden") || !element.classList.contains("is-active") || document.hidden) return pause();
      if (previousTime) {
        position += Math.min(time - previousTime, 64) * .025;
        scroll.scrollTop = position;
      }
      previousTime = time;
      if (scroll.scrollTop >= scroll.scrollHeight - scroll.clientHeight - 1) { update(); pause(); return; }
      frame = requestAnimationFrame(advance);
    };
    button.addEventListener("click", () => {
      if (running) return pause();
      if (scroll.scrollTop >= scroll.scrollHeight - scroll.clientHeight - 1) scroll.scrollTop = 0;
      position = scroll.scrollTop;
      running = true;
      previousTime = 0;
      button.setAttribute("aria-pressed", "true");
      button.textContent = "Mettre en pause";
      frame = requestAnimationFrame(advance);
    }, {signal: listeners.signal});
    element.querySelector("[data-nodal-report-top]").addEventListener("click", () => {pause(); scroll.scrollTop = 0; scroll.focus({preventScroll: true});}, {signal: listeners.signal});
    scroll.addEventListener("scroll", update, {signal: listeners.signal, passive: true});
    for (const event of ["wheel", "pointerdown", "keydown"]) scroll.addEventListener(event, pause, {signal: listeners.signal, passive: true});
    const resize = new ResizeObserver(update);
    resize.observe(scroll);
    readers.set(element, {pause, dispose() {pause(); listeners.abort(); resize.disconnect();}});
    update();
    scroll.focus({preventScroll: true});
  }

  function pause(element) { readers.get(element)?.pause(); }
  function dispose(element) { readers.get(element)?.dispose(); readers.delete(element); }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) document.querySelectorAll(".police-report-window").forEach(pause);
  });
  window.NodalPoliceReportViewer = Object.freeze({render, mount, pause, dispose});
})();
