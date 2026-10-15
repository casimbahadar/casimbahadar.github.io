"use strict";

/* Edit these before you publish.
   email: the address the contact form and email links use.
   linkedin: your full profile URL. Leave it empty to hide the LinkedIn links. */
const CONFIG = {
  email: "hello@example.com",
  linkedin: ""
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Project illustrations ----------
   Each function returns the inside of a 240 x 180 SVG. The base styles are a
   still frame; motion runs only while a parent has the class is-playing. */

const SCENES = {
  "cadence"() {
    const lanes = [40, 82, 124, 166];
    let s = '<rect width="240" height="180" class="f-mist"/>';
    lanes.forEach(x => { s += `<rect x="${x}" y="0" width="34" height="180" rx="6" class="f-paper"/>`; });
    s += '<rect x="34" y="146" width="172" height="2" class="f-violet"/>';
    lanes.forEach(x => { s += `<rect x="${x + 3}" y="140" width="28" height="14" rx="5" class="s-violet"/>`; });
    const notes = [[0, 18, "f-lav2"], [1, 64, "f-violet"], [2, 104, "f-lav2"], [3, 36, "f-rose"], [0, 122, "f-violet"],
      [2, 4, "f-violet"], [3, 150, "f-lav2"], [1, 170, "f-rose"], [1, -6, "f-lav2"], [3, 90, "f-violet"]];
    notes.forEach(([lane, y, cls]) => {
      const d = -(((y + 12) / 208) * 2.4).toFixed(2);
      s += `<rect x="${lanes[lane] + 4}" y="0" width="26" height="10" rx="4" class="a-fall ${cls}" style="--y:${y}px;--d:${d}s"/>`;
    });
    return s;
  },

  "ludo"() {
    const ox = 45, oy = 15, c = 10;
    let s = `<rect width="240" height="180" class="f-mist"/><rect x="${ox}" y="${oy}" width="150" height="150" rx="4" class="f-paper s-line"/>`;
    for (let r = 0; r < 15; r++) {
      for (let col = 0; col < 15; col++) {
        const corner = (r < 6 || r > 8) && (col < 6 || col > 8);
        const centre = r >= 6 && r <= 8 && col >= 6 && col <= 8;
        if (corner || centre) continue;
        let cls = "f-paper";
        if (col === 7 && r >= 1 && r <= 5) cls = "f-mint";
        else if (r === 7 && col >= 9 && col <= 13) cls = "f-sun";
        else if (col === 7 && r >= 9 && r <= 13) cls = "f-lav2";
        else if (r === 7 && col >= 1 && col <= 5) cls = "f-rose";
        s += `<rect x="${ox + col * c}" y="${oy + r * c}" width="${c}" height="${c}" class="${cls} s-line"/>`;
      }
    }
    [[0, 0, "f-rose"], [9, 0, "f-mint"], [0, 9, "f-lav2"], [9, 9, "f-sun"]].forEach(([cx, cy, cls]) => {
      const x = ox + cx * c, y = oy + cy * c;
      s += `<rect x="${x}" y="${y}" width="60" height="60" class="${cls}"/>`;
      s += `<rect x="${x + 12}" y="${y + 12}" width="36" height="36" rx="5" class="f-paper"/>`;
      [[22, 22], [38, 22], [22, 38], [38, 38]].forEach(([a, b]) => { s += `<circle cx="${x + a}" cy="${y + b}" r="4.5" class="${cls}"/>`; });
    });
    s += '<path d="M105 75 L135 75 L120 90Z" class="f-mint"/><path d="M135 75 L135 105 L120 90Z" class="f-sun"/>';
    s += '<path d="M105 105 L135 105 L120 90Z" class="f-lav2"/><path d="M105 75 L105 105 L120 90Z" class="f-rose"/>';
    s += '<circle cx="60" cy="80" r="4.2" class="a-hop f-rose s-ink"/>';
    return s;
  },

  "lumoria"() {
    let s = '<rect width="240" height="180" class="f-mist"/>';
    s += '<path d="M22 118 C18 78 48 40 96 34 C140 28 170 20 204 44 C230 62 224 108 196 132 C170 154 120 160 80 150 C48 142 24 136 22 118Z" class="f-paper s-lav2"/>';
    [[62, 58, 7], [72, 52, 6], [70, 64, 5], [196, 70, 6], [204, 78, 5], [98, 140, 6], [110, 142, 5]].forEach(([x, y, r]) => { s += `<circle cx="${x}" cy="${y}" r="${r}" class="f-mint"/>`; });
    s += '<path d="M150 56 L160 40 L170 56Z M162 56 L172 42 L182 56Z" class="f-lav2"/>';
    s += '<path d="M50 112 H78 V80 H112 V96 H140 V64 H176 V100 H186 V122 H142 V134" pathLength="1" class="a-draw s-route"/>';
    const nodes = [[50, 112], [78, 80], [112, 96], [140, 64], [176, 100], [186, 122], [142, 134]];
    nodes.forEach(([x, y], i) => {
      const gym = i === 3 || i === 6;
      s += gym
        ? `<rect x="${x - 6}" y="${y - 6}" width="12" height="12" rx="2" class="a-pop f-violet" style="--d:${(i * 0.35).toFixed(2)}s"/>`
        : `<circle cx="${x}" cy="${y}" r="5.5" class="a-pop node" style="--d:${(i * 0.35).toFixed(2)}s"/>`;
    });
    return s;
  },

  "step-through"() {
    let s = '<rect width="240" height="180" class="f-mist"/><rect x="16" y="16" width="208" height="148" rx="12" class="f-ink"/>';
    s += '<g class="a-step"><rect x="22" y="30" width="196" height="18" rx="4" class="f-soft"/><path d="M27 34 l6 5 l-6 5z" class="f-sun"/></g>';
    const lines = [
      [0, [[26, "f-lav2"], [40, "f-mint"], [20, "f-lav"]]],
      [1, [[34, "f-sun"], [52, "f-lav"]]],
      [1, [[20, "f-lav2"], [64, "f-mint"]]],
      [2, [[44, "f-rose"], [30, "f-lav"]]],
      [1, [[30, "f-lav2"], [24, "f-sun"]]],
      [0, [[50, "f-mint"], [22, "f-lav"]]]
    ];
    lines.forEach(([indent, segs], i) => {
      let x = 42 + indent * 14;
      const y = 36 + i * 20;
      segs.forEach(([w, cls]) => { s += `<rect x="${x}" y="${y}" width="${w}" height="6" rx="3" class="${cls}"/>`; x += w + 6; });
    });
    return s;
  },

  "musical-forge"() {
    let s = '<rect width="240" height="180" class="f-mist"/><rect x="20" y="81" width="200" height="2" class="f-line"/>';
    const hs = [22, 40, 58, 34, 70, 46, 28, 62, 84, 52, 36, 66, 90, 60, 40, 72, 50, 30, 56, 38, 24, 16];
    hs.forEach((h, i) => {
      const cls = i % 3 === 0 ? "f-lav2" : "f-violet";
      s += `<rect x="${24 + i * 9}" y="${82 - h / 2}" width="5" height="${h}" rx="2.5" class="a-bar ${cls}" style="--d:${-(i * 0.07).toFixed(2)}s"/>`;
    });
    [["f-lav", 40], ["f-mint", 82], ["f-sun", 124], ["f-rose", 166]].forEach(([cls, x]) => {
      s += `<rect x="${x}" y="140" width="34" height="20" rx="6" class="${cls}"/><rect x="${x + 9}" y="148" width="16" height="4" rx="2" class="f-paper"/>`;
    });
    return s;
  },

  "forge-sequencer"() {
    let s = '<rect width="240" height="180" class="f-mist"/><rect x="16" y="16" width="208" height="148" rx="10" class="f-paper"/>';
    for (let r = 0; r < 7; r++) s += `<rect x="20" y="${20 + r * 20 + 1}" width="16" height="18" rx="3" class="${r % 2 ? "f-ink" : "f-lav"}"/>`;
    for (let r = 0; r <= 7; r++) s += `<line x1="40" y1="${20 + r * 20}" x2="220" y2="${20 + r * 20}" class="s-line"/>`;
    for (let col = 0; col <= 16; col++) s += `<line x1="${40 + col * 11.25}" y1="20" x2="${40 + col * 11.25}" y2="160" class="s-line"/>`;
    const notes = [[0, 0, 3, "f-violet"], [2, 3, 2, "f-lav2"], [1, 5, 4, "f-violet"], [4, 2, 2, "f-mint"], [3, 9, 3, "f-lav2"],
      [5, 6, 2, "f-sun"], [0, 12, 3, "f-violet"], [6, 0, 2, "f-rose"], [6, 8, 2, "f-rose"], [6, 14, 2, "f-rose"], [2, 13, 2, "f-lav2"]];
    notes.forEach(([row, col, len, cls]) => {
      s += `<rect x="${(40 + col * 11.25 + 1).toFixed(2)}" y="${20 + row * 20 + 3}" width="${(len * 11.25 - 2).toFixed(2)}" height="14" rx="3" class="${cls}"/>`;
    });
    s += '<rect x="40" y="16" width="2.5" height="148" class="a-sweep f-violet"/>';
    return s;
  },

  "ai-learners"() {
    let s = '<rect width="240" height="180" class="f-mist"/>';
    let x = 18;
    ["The", "cat", "sat", "on"].forEach((word, i) => {
      const w = word.length * 8.5 + 14;
      s += `<g class="a-pop" style="--d:${(i * 0.25).toFixed(2)}s"><rect x="${x}" y="24" width="${w}" height="26" rx="8" class="chip"/>`;
      s += `<text x="${x + w / 2}" y="42" text-anchor="middle" class="svg-text">${word}</text></g>`;
      x += w + 6;
    });
    s += `<g class="a-pop" style="--d:1.1s"><rect x="${x}" y="24" width="30" height="26" rx="8" class="chip-q"/><text x="${x + 15}" y="43" text-anchor="middle" class="svg-violet">?</text></g>`;
    [["the", 62, "f-violet"], ["a", 21, "f-lav2"], ["my", 9, "f-lav2"]].forEach(([word, pct, cls], i) => {
      const y = 82 + i * 28;
      s += `<text x="22" y="${y + 11}" class="svg-text">${word}</text>`;
      s += `<rect x="60" y="${y}" width="124" height="12" rx="6" class="f-paper"/>`;
      s += `<rect x="60" y="${y}" width="${(124 * pct / 100).toFixed(1)}" height="12" rx="6" class="a-grow ${cls}" style="--d:${(1.4 + i * 0.15).toFixed(2)}s"/>`;
      s += `<text x="190" y="${y + 11}" class="svg-muted">${pct}%</text>`;
    });
    return s;
  },

  "region-forge"() {
    let s = '<rect width="240" height="180" class="f-mist"/>';
    s += '<path d="M34 96 C30 60 70 34 118 36 C162 38 206 52 206 92 C206 130 170 154 124 152 C80 150 38 132 34 96Z" class="f-paper s-lav2"/>';
    s += '<circle cx="212" cy="146" r="10" class="f-paper s-lav2"/>';
    s += '<path d="M92 72 L102 54 L112 72Z M106 72 L118 50 L130 72Z" class="f-lav2"/>';
    [[62, 70, 6], [70, 78, 5], [160, 130, 6], [150, 136, 5]].forEach(([cx, cy, r]) => { s += `<circle cx="${cx}" cy="${cy}" r="${r}" class="f-mint"/>`; });
    s += '<path d="M58 104 L86 90 L124 94 L160 72 L184 102 L150 118 L110 128 L80 122" pathLength="1" class="a-draw s-route"/>';
    [[58, 104], [86, 90], [124, 94], [160, 72], [184, 102], [150, 118], [110, 128], [80, 122]].forEach(([cx, cy], i) => {
      const gym = i % 3 === 1;
      s += gym
        ? `<rect x="${cx - 6}" y="${cy - 6}" width="12" height="12" rx="2" class="a-pop f-violet" style="--d:${(i * 0.3).toFixed(2)}s"/>`
        : `<circle cx="${cx}" cy="${cy}" r="5" class="a-pop node" style="--d:${(i * 0.3).toFixed(2)}s"/>`;
    });
    s += '<rect x="12" y="12" width="92" height="26" rx="8" class="chip"/><text x="58" y="30" text-anchor="middle" class="svg-muted">Seed 4821</text>';
    return s;
  },

  "waypack"() {
    let s = '<rect width="240" height="180" class="f-paper"/>';
    s += '<rect x="150" y="120" width="60" height="60" class="f-mint-soft"/><rect x="0" y="0" width="60" height="30" class="f-mint-soft"/>';
    for (let x = 30; x < 240; x += 30) s += `<line x1="${x}" y1="0" x2="${x}" y2="180" class="s-grid"/>`;
    for (let y = 30; y < 180; y += 30) s += `<line x1="0" y1="${y}" x2="240" y2="${y}" class="s-grid"/>`;
    s += '<path d="M-10 150 L250 30" class="s-road"/>';
    s += '<rect x="90" y="60" width="60" height="60" rx="3" class="cell-hi"/>';
    [[40, 132, "f-rose", 0.2], [196, 44, "f-sun", 0.8], [134, 106, "f-sun", 1.4], [52, 50, "f-lav2", 2]].forEach(([cx, cy, cls, d]) => {
      s += `<circle cx="${cx}" cy="${cy}" r="5" class="a-pop ${cls}" style="--d:${d}s"/>`;
    });
    s += '<circle cx="120" cy="98" r="10" class="a-pulse s-violet"/>';
    s += '<path d="M120 100 C112 90 108 83 108 76 A12 12 0 1 1 132 76 C132 83 128 90 120 100Z" class="f-violet"/><circle cx="120" cy="76" r="4.5" class="f-paper"/>';
    return s;
  },

  "ashen"() {
    const ox = 24, oy = 30, c = 24;
    const unit = [1, 2], enemy = [6, 2];
    let s = '<rect width="240" height="180" class="f-mist"/>';
    for (let r = 0; r < 5; r++) {
      for (let col = 0; col < 8; col++) {
        const dist = Math.abs(col - unit[0]) + Math.abs(r - unit[1]);
        const threat = Math.abs(col - enemy[0]) + Math.abs(r - enemy[1]) === 1;
        let cls = "f-paper";
        if (threat) cls = "f-rose-soft";
        else if (dist > 0 && dist <= 3) cls = "f-lav";
        s += `<rect x="${ox + col * c}" y="${oy + r * c}" width="${c}" height="${c}" class="f-paper s-line"/>`;
        if (cls !== "f-paper") s += `<rect x="${ox + col * c + 2}" y="${oy + r * c + 2}" width="${c - 4}" height="${c - 4}" rx="3" class="${cls}"/>`;
      }
    }
    s += '<path d="M180 80 L190 90 L180 100 L170 90Z" class="f-rose s-ink"/>';
    s += '<g class="a-march"><circle cx="60" cy="90" r="8" class="f-violet"/><rect x="58" y="72" width="2" height="12" class="f-ink"/><path d="M60 72 L70 75 L60 78Z" class="f-sun"/></g>';
    return s;
  },

  "blackened"() {
    let s = '<rect width="240" height="180" class="f-ink"/><circle cx="120" cy="90" r="76" class="f-ink2"/>';
    for (let i = 0; i < 8; i++) {
      const a = (i * 45 * Math.PI) / 180;
      const x = (120 + 58 * Math.sin(a)).toFixed(1);
      const y = (90 - 58 * Math.cos(a)).toFixed(1);
      s += i === 5
        ? `<circle cx="${x}" cy="${y}" r="11" class="f-rose"/>`
        : `<circle cx="${x}" cy="${y}" r="11" class="a-seat f-lav2" style="--d:${(i * 0.5).toFixed(1)}s"/>`;
    }
    s += '<circle cx="120" cy="90" r="15" class="f-violet"/>';
    s += '<g class="a-spin"><rect x="118.5" y="44" width="3" height="46" rx="1.5" class="f-sun"/><circle cx="120" cy="44" r="3.5" class="f-sun"/></g>';
    return s;
  }
};

function renderScene(el) {
  const make = SCENES[el.dataset.scene];
  if (!make) return;
  el.innerHTML = `<svg viewBox="0 0 240 180" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${make()}</svg>`;
}

document.querySelectorAll("[data-scene]").forEach(renderScene);

/* Project tiles animate while hovered on a mouse, or while on screen on touch. */
if (!reduceMotion) {
  const tiles = document.querySelectorAll(".project .scene-wrap");
  if (finePointer) {
    tiles.forEach(tile => {
      const card = tile.closest(".project");
      const on = () => tile.classList.add("is-playing");
      const off = () => tile.classList.remove("is-playing");
      card.addEventListener("mouseenter", on);
      card.addEventListener("mouseleave", off);
      card.addEventListener("focusin", on);
      card.addEventListener("focusout", off);
    });
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle("is-playing", e.isIntersecting));
    }, { threshold: 0.6 });
    tiles.forEach(tile => io.observe(tile));
  }
}

/* ---------- Home hero: the phone that cycles through projects ---------- */

const FEATURED = [
  { scene: "step-through", kind: "Learning app", name: "Step Through",
    text: "A coding course that runs offline on a phone. You write real code and watch it run one line at a time.",
    url: "https://casimbahadar.github.io/step-through/" },
  { scene: "cadence", kind: "Rhythm game", name: "Cadence",
    text: "Turns any song you give it, from a MIDI file or an MP3, into a four-lane rhythm game.",
    url: "https://casimbahadar.github.io/Cadence/" },
  { scene: "ludo", kind: "Online board game", name: "Ludo Mehfil",
    text: "Pakistani-style Ludo for phones, with online rooms so family can play from anywhere.",
    url: "https://casimbahadar.github.io/Ludo-Mehfil/" },
  { scene: "ai-learners", kind: "Beginner course", name: "AI Learner\u2019s Permit",
    text: "A free course on using AI assistants, with demos that show how they predict the next word.",
    url: "https://casimbahadar.github.io/ai-learners/" },
  { scene: "musical-forge", kind: "Music tools", name: "Musical Forge Studio",
    text: "Four browser tools for writing game themes, remixing audio, writing sheet music and arranging songs.",
    url: "https://casimbahadar.github.io/Musical-Forge-Studio/" }
];

const phone = document.querySelector("[data-phone]");
if (phone) {
  const screen = phone.querySelector(".phone-screen");
  const body = phone.querySelector(".ps-body");
  const meta = phone.querySelector(".ps-meta");
  const sceneEl = phone.querySelector(".ps-scene");
  const title = phone.querySelector(".ps-title");
  const text = phone.querySelector(".ps-text");
  const link = phone.querySelector(".ps-link");
  const progress = phone.querySelector(".ps-progress");
  const dots = document.querySelector("[data-phone-dots]");
  const DURATION = 6000;
  let index = 0;
  let timer = null;
  let paused = false;

  const buttons = FEATURED.map((p, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", `Show ${p.name}`);
    b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    b.addEventListener("click", () => { body.setAttribute("aria-live", "polite"); show(i); });
    dots.appendChild(b);
    return b;
  });

  function fill(p) {
    meta.textContent = p.kind;
    sceneEl.dataset.scene = p.scene;
    renderScene(sceneEl);
    title.textContent = p.name;
    text.textContent = p.text;
    link.href = p.url;
    link.textContent = `Open ${p.name}`;
  }

  function restartProgress() {
    progress.classList.remove("is-running");
    if (reduceMotion || paused) return;
    void progress.offsetWidth;
    progress.style.setProperty("--dur", `${DURATION}ms`);
    progress.classList.add("is-running");
  }

  function schedule() {
    clearTimeout(timer);
    if (reduceMotion || paused) return;
    timer = setTimeout(() => show((index + 1) % FEATURED.length), DURATION);
  }

  function show(i) {
    index = i;
    buttons.forEach((b, n) => b.setAttribute("aria-pressed", n === i ? "true" : "false"));
    if (reduceMotion) { fill(FEATURED[i]); return; }
    screen.classList.add("is-swapping");
    setTimeout(() => {
      fill(FEATURED[i]);
      screen.classList.remove("is-swapping");
    }, 200);
    restartProgress();
    schedule();
  }

  function setPaused(value) {
    paused = value;
    if (paused) { clearTimeout(timer); progress.classList.remove("is-running"); }
    else { restartProgress(); schedule(); }
  }

  fill(FEATURED[0]);
  if (!reduceMotion) {
    sceneEl.classList.add("is-playing");
    phone.addEventListener("mouseenter", () => setPaused(true));
    phone.addEventListener("mouseleave", () => setPaused(false));
    phone.addEventListener("focusin", () => setPaused(true));
    phone.addEventListener("focusout", () => setPaused(false));
    document.addEventListener("visibilitychange", () => setPaused(document.hidden));
    restartProgress();
    schedule();
  }
}

/* ---------- Email, LinkedIn, year ---------- */

document.querySelectorAll("[data-email]").forEach(a => { a.href = `mailto:${CONFIG.email}`; });
document.querySelectorAll("[data-email-text]").forEach(el => { el.textContent = CONFIG.email; });
document.querySelectorAll("[data-linkedin]").forEach(el => {
  if (!CONFIG.linkedin) { el.hidden = true; return; }
  const a = el.matches("a") ? el : el.querySelector("a");
  if (a) a.href = CONFIG.linkedin;
  el.hidden = false;
});
document.querySelectorAll("[data-year]").forEach(el => { el.textContent = new Date().getFullYear(); });

const copyBtn = document.querySelector("[data-copy-email]");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.email);
      copyBtn.textContent = "Copied";
    } catch {
      copyBtn.textContent = "Copy failed, select the address instead";
    }
    setTimeout(() => { copyBtn.textContent = "Copy address"; }, 2200);
  });
}

/* ---------- Contact form: opens the visitor's email app with the message filled in ---------- */

const form = document.querySelector("[data-contact-form]");
if (form) {
  const status = form.querySelector(".form-status");
  const rules = [
    { name: "name", message: "Enter your name." },
    { name: "message", message: "Describe what you need, even in a sentence or two." }
  ];

  form.addEventListener("submit", e => {
    e.preventDefault();
    let firstBad = null;

    rules.forEach(({ name, message }) => {
      const input = form.elements[name];
      const err = document.getElementById(`${name}-error`);
      const bad = !input.value.trim();
      input.setAttribute("aria-invalid", bad ? "true" : "false");
      err.textContent = bad ? message : "";
      err.hidden = !bad;
      if (bad && !firstBad) firstBad = input;
    });

    if (firstBad) {
      status.textContent = "";
      firstBad.focus();
      return;
    }

    const name = form.elements.name.value.trim();
    const topic = form.elements.topic.value;
    const org = form.elements.org.value.trim();
    const message = form.elements.message.value.trim();
    const subject = `${topic}: enquiry from ${name}`;
    const lines = [message, "", `Name: ${name}`];
    if (org) lines.push(`Business or organization: ${org}`);
    const href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;

    window.location.href = href;
    status.textContent = `Your email app should open with this message ready to send. If it doesn't, email ${CONFIG.email} directly.`;
  });
}
