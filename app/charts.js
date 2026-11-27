// NusaData — small SVG chart builders. No libraries: every chart is drawn
// from the data with plain arithmetic, so the whole site stays offline.

const NS = "http://www.w3.org/2000/svg";

function el(tag, attrs = {}, text = null) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (text !== null) node.textContent = text;
  return node;
}

function fmt(n, digits = 1) {
  return n.toLocaleString("id-ID", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function niceMax(values) {
  const m = Math.max(...values);
  const p = Math.pow(10, Math.floor(Math.log10(m)));
  const d = m / p;
  const step = d <= 1 ? 1 : d <= 2 ? 2 : d <= 5 ? 5 : 10;
  return step * p;
}

// Line chart with dots + value labels. points: [{x (label), y}]
export function lineChart(points, { width = 640, height = 260, color = "#0d4f4a", unit = "", yDigits = 0 } = {}) {
  const svg = el("svg", {
    viewBox: `0 0 ${width} ${height}`, role: "img",
    "aria-label": "Grafik garis",
  });
  const padL = 44, padR = 14, padT = 22, padB = 30;
  const max = niceMax(points.map((p) => p.y));
  const xs = (i) => padL + (i * (width - padL - padR)) / Math.max(1, points.length - 1);
  const ys = (v) => padT + (1 - v / max) * (height - padT - padB);
  // gridlines + y labels (0, half, max)
  for (const f of [0, 0.5, 1]) {
    const y = ys(max * f);
    svg.appendChild(el("line", { x1: padL, x2: width - padR, y1: y, y2: y, stroke: "#e3ddd0", "stroke-width": 1 }));
    svg.appendChild(el("text", { x: padL - 6, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "#6b6558" }, fmt(max * f, yDigits) + unit));
  }
  const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${xs(i).toFixed(1)},${ys(p.y).toFixed(1)}`).join(" ");
  svg.appendChild(el("path", { d, fill: "none", stroke: color, "stroke-width": 2.5, "stroke-linejoin": "round", "stroke-linecap": "round" }));
  points.forEach((p, i) => {
    svg.appendChild(el("circle", { cx: xs(i), cy: ys(p.y), r: 3.5, fill: "#faf6ef", stroke: color, "stroke-width": 2 }));
    svg.appendChild(el("text", { x: xs(i), y: ys(p.y) - 8, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#1c2420" }, fmt(p.y, yDigits)));
    svg.appendChild(el("text", { x: xs(i), y: height - 8, "text-anchor": "middle", "font-size": 11, fill: "#6b6558" }, String(p.x)));
  });
  return svg;
}

// Vertical bar chart. bars: [{label, value}]
export function barChart(bars, { width = 640, height = 260, color = "#0d4f4a", alt = "#e8a317", unit = "", yDigits = 0, highlightLast = false } = {}) {
  const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": "Grafik batang" });
  const padL = 44, padR = 10, padT = 22, padB = 30;
  const max = niceMax(bars.map((b) => Math.abs(b.value)));
  const min = Math.min(0, ...bars.map((b) => b.value));
  const span = max - min;
  const ys = (v) => padT + (1 - (v - min) / span) * (height - padT - padB);
  const zeroY = ys(0);
  const slot = (width - padL - padR) / bars.length;
  const bw = Math.min(46, slot * 0.62);
  for (const f of [0, 0.5, 1]) {
    const v = min + span * f;
    const y = ys(v);
    svg.appendChild(el("line", { x1: padL, x2: width - padR, y1: y, y2: y, stroke: "#e3ddd0", "stroke-width": 1 }));
    svg.appendChild(el("text", { x: padL - 6, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "#6b6558" }, fmt(v, yDigits) + unit));
  }
  if (min < 0) svg.appendChild(el("line", { x1: padL, x2: width - padR, y1: zeroY, y2: zeroY, stroke: "#9a937f", "stroke-width": 1 }));
  bars.forEach((b, i) => {
    const x = padL + i * slot + (slot - bw) / 2;
    const y = b.value >= 0 ? ys(b.value) : zeroY;
    const h = Math.max(1, Math.abs(ys(b.value) - zeroY));
    const fill = highlightLast && i === bars.length - 1 ? alt : b.value < 0 ? "#b4552d" : color;
    svg.appendChild(el("rect", { x: x.toFixed(1), y: y.toFixed(1), width: bw.toFixed(1), height: h.toFixed(1), rx: 3, fill }));
    if (b.value < 0) {
      // Negative bars hang below zero: put the label inside the bar in
      // white so it never collides with the x-axis labels underneath.
      svg.appendChild(el("text", { x: x + bw / 2, y: y + h - 6, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#ffffff" }, fmt(b.value, yDigits)));
    } else {
      svg.appendChild(el("text", { x: x + bw / 2, y: y - 6, "text-anchor": "middle", "font-size": 11, "font-weight": 700, fill: "#1c2420" }, fmt(b.value, yDigits)));
    }
    svg.appendChild(el("text", { x: x + bw / 2, y: height - 8, "text-anchor": "middle", "font-size": 11, fill: "#6b6558" }, String(b.label)));
  });
  return svg;
}

// Grouped bars, two series. groups: [{label, a, b}], legend labels via names.
export function groupedBars(groups, { width = 640, height = 260, names = ["A", "B"], colors = ["#0d4f4a", "#e8a317"], unit = "" } = {}) {
  const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": "Grafik batang berkelompok" });
  const padL = 44, padR = 10, padT = 26, padB = 30;
  const max = niceMax(groups.flatMap((g) => [g.a, g.b]));
  const ys = (v) => padT + (1 - v / max) * (height - padT - padB);
  const slot = (width - padL - padR) / groups.length;
  const bw = Math.min(30, slot * 0.28);
  for (const f of [0, 0.5, 1]) {
    const y = ys(max * f);
    svg.appendChild(el("line", { x1: padL, x2: width - padR, y1: y, y2: y, stroke: "#e3ddd0", "stroke-width": 1 }));
    svg.appendChild(el("text", { x: padL - 6, y: y + 4, "text-anchor": "end", "font-size": 11, fill: "#6b6558" }, fmt(max * f, 0) + unit));
  }
  groups.forEach((g, i) => {
    const cx = padL + i * slot + slot / 2;
    const pairs = [[g.a, colors[0]], [g.b, colors[1]]];
    pairs.forEach(([v, fill], j) => {
      const x = cx - bw - 2 + j * (bw + 4);
      svg.appendChild(el("rect", { x: x.toFixed(1), y: ys(v).toFixed(1), width: bw, height: Math.max(1, height - padB - ys(v)).toFixed(1), rx: 2, fill }));
    });
    svg.appendChild(el("text", { x: cx, y: height - 8, "text-anchor": "middle", "font-size": 11, fill: "#6b6558" }, String(g.label)));
  });
  // legend
  names.forEach((n, i) => {
    const x = padL + i * 110;
    svg.appendChild(el("rect", { x, y: 6, width: 10, height: 10, rx: 2, fill: colors[i] }));
    svg.appendChild(el("text", { x: x + 15, y: 15, "font-size": 11, fill: "#1c2420" }, n));
  });
  return svg;
}

// Donut chart with a centre label. slices: [{name, value, color}]
export function donut(slices, { size = 220, centerTop = "", centerBottom = "" } = {}) {
  const svg = el("svg", { viewBox: `0 0 ${size} ${size}`, role: "img", "aria-label": "Grafik donat", width: size, height: size });
  const total = slices.reduce((s, x) => s + x.value, 0);
  const cx = size / 2, cy = size / 2, r = size / 2 - 14, thick = 34;
  let a0 = -Math.PI / 2;
  slices.forEach((s) => {
    const a1 = a0 + (s.value / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    svg.appendChild(el("path", {
      d: `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)}`,
      fill: "none", stroke: s.color, "stroke-width": thick,
    }));
    a0 = a1;
  });
  if (centerTop) svg.appendChild(el("text", { x: cx, y: cy - 4, "text-anchor": "middle", "font-size": 22, "font-weight": 800, fill: "#1c2420" }, centerTop));
  if (centerBottom) svg.appendChild(el("text", { x: cx, y: cy + 16, "text-anchor": "middle", "font-size": 11, fill: "#6b6558" }, centerBottom));
  return svg;
}

// Horizontal bars with labels + values. rows: [{label, value, max}]
export function hbars(rows, { width = 640, unit = "", digits = 1, color = "#0d4f4a", barMax = null } = {}) {
  const rowH = 34;
  const height = rows.length * rowH + 8;
  const svg = el("svg", { viewBox: `0 0 ${width} ${height}`, role: "img", "aria-label": "Grafik batang horizontal" });
  const max = barMax ?? Math.max(...rows.map((r) => r.value));
  const labelW = 150, valueW = 64;
  rows.forEach((r, i) => {
    const y = 8 + i * rowH;
    svg.appendChild(el("text", { x: 0, y: y + 15, "font-size": 12, fill: "#1c2420" }, r.label));
    const bx = labelW, bw = width - labelW - valueW;
    svg.appendChild(el("rect", { x: bx, y: y + 4, width: bw, height: 14, rx: 7, fill: "#ece7db" }));
    svg.appendChild(el("rect", { x: bx, y: y + 4, width: Math.max(2, (bw * r.value) / max), height: 14, rx: 7, fill: r.color || color }));
    svg.appendChild(el("text", { x: width - valueW + 8, y: y + 15, "font-size": 12, "font-weight": 700, fill: "#1c2420" }, fmt(r.value, digits) + unit));
  });
  return svg;
}
