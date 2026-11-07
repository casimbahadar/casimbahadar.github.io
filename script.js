"use strict";

/* Edit these before you publish.
   email: the address the contact form and email links use.
   linkedin: your full profile URL. Leave it empty to hide the LinkedIn links. */
const CONFIG = {
  email: "casimbahadar@yahoo.ca",
  linkedin: "https://www.linkedin.com/in/casim-bahadar"
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



  "sticker-yard"() {
    let s = '<rect width="240" height="180" class="f-mist"/>';
    s += '<circle cx="200" cy="34" r="16" class="f-sun"/>';
    s += '<path d="M0 120 C60 108 180 108 240 120 V180 H0Z" class="f-mint"/>';
    for (let x = 12; x < 240; x += 24) s += `<rect x="${x}" y="98" width="8" height="30" rx="3" class="f-paper"/>`;
    s += '<rect x="0" y="106" width="240" height="5" class="f-paper"/>';
    const stickers = [
      [46, 150, "star", "f-sun"], [96, 140, "heart", "f-rose"], [146, 154, "flower", "f-lav2"],
      [194, 142, "star", "f-violet"], [70, 62, "flower", "f-rose"], [130, 54, "heart", "f-lav2"]
    ];
    stickers.forEach(([x, y, kind, cls], i) => {
      let shape;
      if (kind === "star") {
        let pts = [];
        for (let k = 0; k < 10; k++) { const r = k % 2 ? 7 : 16; const a = -Math.PI / 2 + k * Math.PI / 5; pts.push(`${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`); }
        shape = `<polygon points="${pts.join(" ")}" class="${cls}"/>`;
      } else if (kind === "heart") {
        shape = `<path d="M${x} ${y + 12} C${x - 20} ${y - 2} ${x - 10} ${y - 16} ${x} ${y - 6} C${x + 10} ${y - 16} ${x + 20} ${y - 2} ${x} ${y + 12}Z" class="${cls}"/>`;
      } else {
        shape = [0, 72, 144, 216, 288].map(a => { const r = a * Math.PI / 180; return `<circle cx="${(x + 8 * Math.cos(r)).toFixed(1)}" cy="${(y + 8 * Math.sin(r)).toFixed(1)}" r="7" class="${cls}"/>`; }).join("") + `<circle cx="${x}" cy="${y}" r="5" class="f-sun"/>`;
      }
      s += `<g class="a-pop" style="--d:${(i * 0.45).toFixed(2)}s"><circle cx="${x}" cy="${y}" r="21" class="f-paper"/>${shape}</g>`;
    });
    return s;
  },
  "baat-cheet"() {
    let s = '<rect width="240" height="180" class="f-mist"/>';
    s += '<g class="a-pop" style="--d:0s"><rect x="16" y="18" width="150" height="40" rx="12" class="f-paper s-line"/><path d="M34 58 l-6 12 l18 -12z" class="f-paper"/><text x="30" y="43" class="svg-text">Aap kaise hain?</text></g>';
    s += '<g class="a-pop" style="--d:0.8s"><rect x="78" y="74" width="146" height="40" rx="12" class="f-violet"/><path d="M204 114 l8 12 l-18 -12z" class="f-violet"/><text x="94" y="99" class="svg-text" style="fill:#fff">Main theek hoon</text></g>';
    s += '<line x1="30" y1="150" x2="210" y2="150" class="s-grid"/>';
    [["1", 30], ["3", 75], ["7", 120], ["21", 165], ["60", 210]].forEach(([d, x], i) => {
      s += `<g class="a-pop" style="--d:${(1.4 + i * 0.3).toFixed(2)}s"><circle cx="${x}" cy="150" r="9" class="${i < 3 ? "f-lav2" : "f-paper s-line"}"/><text x="${x}" y="174" text-anchor="middle" class="svg-muted">${d}</text></g>`;
    });
    return s;
  },
  "clip-and-play"() {
    let s = '<rect width="240" height="180" class="f-mist"/>';
    s += '<rect x="72" y="18" width="100" height="72" rx="6" class="f-lav"/>';
    const hs = [10, 18, 26, 14, 30, 22, 36, 28, 18, 40, 32, 24, 44, 36, 26, 38, 20, 30, 16, 26, 34, 22, 14, 20, 12];
    hs.forEach((h, i) => {
      const x = 16 + i * 8.6; const inClip = x > 72 && x < 172;
      s += `<rect x="${x.toFixed(1)}" y="${54 - h / 2}" width="4.5" height="${h}" rx="2" class="${inClip ? "f-violet" : "f-lav2"}"/>`;
    });
    s += '<rect x="70" y="14" width="4" height="80" rx="2" class="f-ink"/><rect x="170" y="14" width="4" height="80" rx="2" class="f-ink"/>';
    s += '<rect x="74" y="16" width="2.5" height="76" class="a-clip f-sun"/>';
    s += '<rect x="24" y="110" width="150" height="10" rx="5" class="f-line"/>';
    s += '<rect x="24" y="130" width="192" height="14" rx="7" class="f-violet"/><rect x="24" y="130" width="110" height="14" rx="7" class="a-grow f-sun" style="--d:0.3s"/>';
    s += '<rect x="24" y="156" width="126" height="10" rx="5" class="f-line"/>';
    return s;
  },

  "grand-calendar"() {
    let s = '<rect width="240" height="180" class="f-mist"/><rect x="16" y="14" width="208" height="152" rx="12" class="f-paper"/>';
    s += '<rect x="16" y="14" width="208" height="28" rx="12" class="f-violet"/><rect x="16" y="30" width="208" height="12" class="f-violet"/>';
    s += '<text x="30" y="33" class="svg-text" style="fill:#fff">This weekend</text>';
    const cw = 27, ch = 22, ox = 26, oy = 50;
    for (let r = 0; r < 5; r++) for (let c = 0; c < 7; c++) {
      s += `<rect x="${ox + c * cw}" y="${oy + r * ch}" width="${cw - 4}" height="${ch - 4}" rx="4" class="f-mist"/>`;
    }
    [[1, 1, "f-mint", 0.2], [3, 1, "f-sun", 0.6], [5, 2, "f-rose", 1.0], [2, 3, "f-lav2", 1.4], [6, 3, "f-mint", 1.8], [4, 4, "f-sun", 2.2]].forEach(([c, r, cls, d]) => {
      s += `<rect x="${ox + c * cw + 3}" y="${oy + r * ch + 5}" width="${cw - 10}" height="8" rx="4" class="a-pop ${cls}" style="--d:${d}s"/>`;
    });
    s += '<g class="a-pop" style="--d:2.6s"><rect x="164" y="20" width="48" height="16" rx="8" class="f-sun"/><text x="188" y="32" text-anchor="middle" class="svg-muted" style="fill:#221B35">New</text></g>';
    return s;
  },

  "website-check"() {
    let s = '<rect width="240" height="180" class="f-mist"/>';
    const scores = [[48, "f-mint", 92], [102, "f-sun", 71], [156, "f-mint", 95], [210, "f-rose", 48]];
    scores.forEach(([cx, cls, v], i) => {
      const r = 19, c = 2 * Math.PI * r;
      s += `<circle cx="${cx - 18}" cy="52" r="${r}" fill="none" stroke-width="7" class="s-ring"/>`;
      s += `<circle cx="${cx - 18}" cy="52" r="${r}" fill="none" stroke-width="7" stroke-linecap="round" class="a-draw-ring ring-${cls.slice(2)}" style="--len:${c.toFixed(1)};--val:${(c * (1 - v / 100)).toFixed(1)};--d:${(i * 0.3).toFixed(1)}s" transform="rotate(-90 ${cx - 18} 52)"/>`;
      s += `<text x="${cx - 18}" y="57" text-anchor="middle" class="svg-text">${v}</text>`;
    });
    [[102, 120], [124, 96], [146, 140]].forEach(([y, w], i) => {
      s += `<g class="a-pop" style="--d:${(1.4 + i * 0.35).toFixed(2)}s"><circle cx="34" cy="${y + 5}" r="6" class="${i === 0 ? "f-rose" : "f-sun"}"/><rect x="48" y="${y}" width="${w}" height="10" rx="5" class="f-paper"/></g>`;
    });
    return s;
  },

  "data-cleanup"() {
    let s = '<rect width="240" height="180" class="f-mist"/><rect x="24" y="20" width="192" height="140" rx="6" class="f-paper s-line"/>';
    s += '<rect x="24" y="20" width="192" height="18" rx="6" class="f-lav"/><rect x="24" y="30" width="192" height="8" class="f-lav"/>';
    const cw = 38.4, fixed = { "1,2": 0.2, "2,0": 0.6, "3,3": 1.0, "5,1": 1.4 }, flagged = { "2,4": 0.8, "4,2": 1.2 };
    for (let c = 0; c < 5; c++) s += `<rect x="${(24 + c * cw + 7).toFixed(1)}" y="26" width="22" height="6" rx="3" class="f-paper"/>`;
    for (let r = 0; r < 6; r++) {
      const y = 38 + r * 20;
      if (r) s += `<rect x="24" y="${y}" width="192" height="1" class="f-line"/>`;
      for (let c = 0; c < 5; c++) {
        const x = 24 + c * cw, key = r + "," + c;
        if (fixed[key] !== undefined) s += `<rect x="${(x + 4).toFixed(1)}" y="${y + 4}" width="${(cw - 8).toFixed(1)}" height="12" rx="3" class="a-pop f-violet" style="--d:${fixed[key]}s"/>`;
        else if (flagged[key] !== undefined) s += `<rect x="${(x + 4).toFixed(1)}" y="${y + 4}" width="${(cw - 8).toFixed(1)}" height="12" rx="3" class="a-pop f-rose" style="--d:${flagged[key]}s"/>`;
        else s += `<rect x="${(x + 7).toFixed(1)}" y="${y + 7}" width="${(14 + ((r * 7 + c * 5) % 12)).toFixed(0)}" height="6" rx="3" class="f-line"/>`;
      }
    }
    for (let c = 1; c < 5; c++) s += `<rect x="${(24 + c * cw).toFixed(1)}" y="38" width="1" height="120" class="f-line"/>`;
    s += '<rect x="24" y="20" width="2.5" height="140" class="a-sweep f-violet"/>';
    return s;
  },

  "reconcile"() {
    let s = '<rect width="240" height="180" class="f-mist"/>';
    s += '<text x="18" y="22" class="svg-muted">Invoices</text><text x="222" y="22" text-anchor="end" class="svg-muted">Bank</text>';
    const rows = [34, 62, 90, 118, 146];
    const links = [[0, 1], [1, 0], [2, 2], [3, 4]];
    links.forEach(([a, b], i) => {
      s += `<path d="M96 ${rows[a] + 10} C120 ${rows[a] + 10} 120 ${rows[b] + 10} 144 ${rows[b] + 10}" pathLength="1" class="a-draw s-route" style="animation-delay:${(i * 0.3).toFixed(1)}s"/>`;
    });
    rows.forEach((y, i) => {
      s += i === 4
        ? `<rect x="18" y="${y}" width="78" height="20" rx="6" class="chip-q"/>`
        : `<rect x="18" y="${y}" width="78" height="20" rx="6" class="chip"/>`;
      s += `<rect x="26" y="${y + 7}" width="${30 + (i * 9) % 20}" height="6" rx="3" class="f-line"/>`;
      s += i === 3
        ? `<rect x="144" y="${y}" width="78" height="20" rx="6" class="a-pop f-rose-soft s-line" style="--d:1.3s"/>`
        : `<rect x="144" y="${y}" width="78" height="20" rx="6" class="chip"/>`;
      s += `<rect x="152" y="${y + 7}" width="${24 + (i * 13) % 26}" height="6" rx="3" class="f-line"/>`;
    });
    [[96, 44], [96, 72], [96, 100], [96, 128]].forEach(([x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="3.5" class="a-pop f-violet" style="--d:${(0.2 + i * 0.3).toFixed(1)}s"/>`; });
    return s;
  },

  "job-intake"() {
    let s = '<rect width="240" height="180" class="f-mist"/><rect x="16" y="18" width="86" height="144" rx="8" class="f-paper s-line"/>';
    [34, 58, 82, 106].forEach((y, i) => {
      s += `<rect x="26" y="${y - 8}" width="${26 + (i * 11) % 18}" height="5" rx="2.5" class="f-lav2"/>`;
      s += `<rect x="26" y="${y}" width="66" height="12" rx="4" class="f-mist s-line"/>`;
    });
    s += '<rect x="26" y="130" width="66" height="18" rx="9" class="f-violet"/>';
    const outs = [38, 90, 140];
    outs.forEach((y, i) => { s += `<path d="M102 90 C122 90 120 ${y} 138 ${y}" pathLength="1" class="a-draw s-route" style="animation-delay:${(i * 0.3).toFixed(1)}s"/>`; });
    s += '<g class="a-pop" style="--d:0.4s"><rect x="140" y="16" width="84" height="46" rx="6" class="f-paper s-line"/><rect x="140" y="16" width="84" height="12" rx="6" class="f-lav"/><rect x="140" y="22" width="84" height="6" class="f-lav"/>';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) s += `<rect x="${148 + c * 12}" y="${33 + r * 9}" width="8" height="6" rx="1.5" class="${r === 1 && c === 3 ? "f-violet" : "f-line"}"/>`;
    s += '</g><g class="a-pop" style="--d:0.8s"><path d="M150 70 H216 A8 8 0 0 1 224 78 V100 A8 8 0 0 1 216 108 H160 L150 116 V108 A8 8 0 0 1 142 100 V78 A8 8 0 0 1 150 70Z" class="f-paper s-line"/>';
    s += '<rect x="152" y="80" width="60" height="5" rx="2.5" class="f-lav2"/><rect x="152" y="90" width="48" height="5" rx="2.5" class="f-lav2"/></g>';
    s += '<g class="a-pop" style="--d:1.2s"><rect x="140" y="124" width="84" height="38" rx="6" class="f-paper s-line"/>';
    for (let c = 0; c < 4; c++) { s += `<rect x="${144 + c * 20}" y="130" width="16" height="10" rx="2" class="f-line"/><rect x="${144 + c * 20}" y="146" width="16" height="10" rx="2" class="f-lav2"/>`; }
    s += '</g>';
    return s;
  },

  "time-audit"() {
    let s = '<rect width="240" height="180" class="f-mist"/><rect x="16" y="16" width="208" height="148" rx="8" class="f-paper s-line"/>';
    s += '<text x="30" y="38" class="svg-muted">Hours a year</text>';
    const hours = [60, 27, 26, 25, 17.6];
    hours.forEach((h, i) => {
      const y = 52 + i * 22;
      s += `<circle cx="36" cy="${y + 6}" r="8" class="f-lav"/><text x="36" y="${y + 10}" text-anchor="middle" class="svg-text">${i + 1}</text>`;
      s += `<rect x="52" y="${y}" width="${(104 * h / 60).toFixed(1)}" height="12" rx="6" class="a-grow ${i === 0 ? "f-violet" : "f-lav2"}" style="--d:${(i * 0.2).toFixed(1)}s"/>`;
      s += `<text x="212" y="${y + 10}" text-anchor="end" class="svg-muted">${h.toFixed(1)}</text>`;
    });
    return s;
  },

  "email-intake"() {
    let s = '<rect width="240" height="180" class="f-mist"/>';
    s += '<text x="14" y="19" class="svg-muted">Email</text><text x="226" y="19" text-anchor="end" class="svg-muted">Ticket</text>';
    s += '<rect x="14" y="28" width="100" height="138" rx="8" class="f-paper s-line"/><rect x="140" y="28" width="86" height="138" rx="8" class="f-paper s-line"/>';
    const marks = { 1: 0, 4: 1, 6: 2 }, rows = [44, 78, 112];
    for (let i = 0; i < 9; i++) {
      const y = 38 + i * 14;
      if (marks[i] !== undefined) s += `<rect x="20" y="${y - 2}" width="${70 + (i * 7) % 18}" height="10" rx="3" class="f-lav"/>`;
      else s += `<rect x="22" y="${y}" width="${40 + (i * 13) % 44}" height="6" rx="3" class="f-line"/>`;
    }
    Object.entries(marks).forEach(([line, k]) => {
      const y1 = 38 + Number(line) * 14 + 3, y2 = rows[k] + 9;
      s += `<path d="M110 ${y1} C126 ${y1} 126 ${y2} 146 ${y2}" pathLength="1" class="a-draw s-route" style="animation-delay:${(k * 0.3).toFixed(1)}s"/>`;
    });
    rows.forEach((y, k) => {
      s += `<g class="a-pop" style="--d:${(0.4 + k * 0.3).toFixed(1)}s"><circle cx="157" cy="${y + 9}" r="9" class="f-lav"/><text x="157" y="${y + 14}" text-anchor="middle" class="svg-text">${k + 1}</text>`;
      s += `<rect x="172" y="${y + 5}" width="${44 - k * 8}" height="8" rx="4" class="f-lav2"/></g>`;
    });
    s += '<rect x="148" y="142" width="70" height="14" rx="4" class="a-pop f-rose-soft s-line" style="--d:1.4s"/>';
    return s;
  },

  "quote-builder"() {
    let s = '<rect width="240" height="180" class="f-mist"/><rect x="40" y="14" width="160" height="152" rx="8" class="f-paper s-line"/>';
    s += '<text x="54" y="37" class="svg-text">Quote</text><rect x="160" y="26" width="26" height="12" rx="3" class="f-lav"/>';
    [62, 48, 70, 54].forEach((w, i) => {
      const y = 52 + i * 16;
      s += `<g class="a-pop" style="--d:${(0.2 + i * 0.25).toFixed(2)}s"><rect x="54" y="${y}" width="${w}" height="6" rx="3" class="f-line"/><rect x="158" y="${y}" width="28" height="6" rx="3" class="f-lav2"/></g>`;
    });
    s += '<path d="M54 120 H186" class="s-line"/>';
    s += '<g class="a-pop" style="--d:1.3s"><text x="54" y="142" class="svg-text">Total</text><text x="186" y="142" text-anchor="end" class="svg-text">$631.33</text></g>';
    s += '<rect x="54" y="150" width="132" height="6" rx="3" class="a-grow f-violet" style="--d:1.6s"/>';
    return s;
  },

  "overdue-invoices"() {
    let s = '<rect width="240" height="180" class="f-mist"/><rect x="16" y="16" width="208" height="148" rx="8" class="f-paper s-line"/>';
    s += '<text x="30" y="38" class="svg-muted">Days late</text>';
    const bands = [["Not due", 6590, "f-lav2"], ["30", 1620.8, "f-lav"], ["60", 3570.25, "f-violet"], ["90", 5905.5, "f-rose"], ["90+", 2150, "f-rose"]];
    bands.forEach(([label, v, cls], i) => {
      const y = 50 + i * 22;
      s += `<text x="30" y="${y + 11}" class="svg-muted">${label}</text>`;
      s += `<rect x="106" y="${y}" width="${(78 * v / 6590).toFixed(1)}" height="12" rx="6" class="a-grow ${cls}" style="--d:${(i * 0.2).toFixed(1)}s"/>`;
      if (i > 0) s += `<g class="a-pop" style="--d:${(1 + i * 0.25).toFixed(2)}s"><rect x="192" y="${y - 1}" width="20" height="14" rx="2" class="f-paper s-line"/><path d="M193 ${y} L202 ${y + 7} L211 ${y}" fill="none" class="s-line"/></g>`;
    });
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
  { scene: "email-intake", kind: "Business demo", name: "Email to job ticket",
    text: "Paste a customer email and an AI model drafts a job ticket, with code checking every field against the email.",
    url: "https://casimbahadar.github.io/email-intake/" },
  { scene: "grand-calendar", kind: "Events app", name: "Grand Calendar",
    text: "One free list of Waterloo Region events and programs, gathered from public sources, with filters for families and kids.",
    url: "https://casimbahadar.github.io/grand-calendar/" },
  { scene: "sticker-yard", kind: "Kids learning app", name: "Sticker Yard",
    text: "Reading and math quests from the Ontario curriculum, with stickers to earn and worksheets parents can print.",
    url: "https://casimbahadar.github.io/sticker-yard/" },
  { scene: "website-check", kind: "Free tool", name: "Website check",
    text: "Enter any web address and get a plain-language report on how the site works on a phone and what to fix first.",
    url: "https://casimbahadar.github.io/website-check/" },
  { scene: "clip-and-play", kind: "Music app", name: "Clip & Play",
    text: "A music player that cuts songs out of long recordings and shows lyrics you add, karaoke style.",
    url: "https://clip-and-play.casimbahadar.workers.dev" }
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
