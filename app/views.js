// NusaData — page renderers. Each view returns { html, mount }:
// html is the page markup, mount(root) wires charts and controls after
// the markup is in the document. All figures come from data.js.
import * as D from "./data.js";
import { lineChart, barChart, groupedBars, donut, hbars } from "./charts.js";

const id = (n) => n.toLocaleString("id-ID");
const id1 = (n) => n.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const id2 = (n) => n.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function kpi(value, label, source) {
  return `<article class="kpi"><p class="kpi-value">${value}</p><p class="kpi-label">${label}</p><p class="kpi-source">${source}</p></article>`;
}

function srcLine(text) {
  return `<p class="src-line">Sumber: ${text}</p>`;
}

function chartBox(title, sub, chartId) {
  return `<section class="chart-card"><h3>${title}</h3><p class="chart-sub">${sub}</p><div class="chart" id="${chartId}"></div></section>`;
}

function putChart(root, chartId, node) {
  const slot = root.querySelector("#" + chartId);
  if (slot) slot.appendChild(node); // keep the slot div so later code can find it
}

// ---------- Beranda ----------
function overview() {
  const g = D.ECONOMY[2024];
  const html = `
  <section class="hero">
    <p class="eyebrow">Statistik nasional &middot; Indonesia</p>
    <h1>Indonesia dalam angka, <span>tanpa ribet.</span></h1>
    <p class="lede">Penduduk, ekonomi, kesehatan, pendidikan, dan daerah — angka resmi terbaru dengan sumber dan tahun yang jelas, di satu tempat.</p>
    <p class="hero-cta"><a class="btn" href="#/penduduk">Mulai dari penduduk &rarr;</a> <a class="btn ghost" href="#/ekonomi">Lihat ekonomi</a></p>
    <p class="hero-note">Data terakhir diperbarui ${D.META.updated}.</p>
  </section>
  <section class="kpi-grid">
    ${kpi("281,6 jt", "Penduduk (2024)", "BPS")}
    ${kpi("5,03%", "Pertumbuhan ekonomi (2024)", "BPS")}
    ${kpi("US$1,40 T", "PDB nominal (2024)", "Bank Dunia")}
    ${kpi("1,57%", "Inflasi (2024)", "BPS")}
    ${kpi("8,57%", "Kemiskinan (Sep 2024)", "BPS")}
    ${kpi("75,02", "Indeks Pembangunan Manusia (2024)", "BPS")}
  </section>
  <div class="chart-grid">
    ${chartBox("Penduduk terus tumbuh", "Juta jiwa, 2015–2024 — BPS", "c-pop")}
    ${chartBox("Ekonomi tumbuh di atas 5%", "Pertumbuhan PDB riil, % per tahun — BPS", "c-growth")}
  </div>
  <section class="two-col">
    <div>
      <h2>Rilis terbaru</h2>
      <ul class="releases">
        ${D.RELEASES.map((r) => `<li><span class="rel-date">${r.date}</span><span class="rel-title">${r.title}</span><span class="rel-src">${r.source}</span></li>`).join("")}
      </ul>
    </div>
    <div>
      <h2>Jelajahi datanya</h2>
      <div class="explore">
        <a href="#/penduduk"><strong>Penduduk</strong><span>281,6 juta jiwa, kelompok usia, 10 provinsi terbesar</span></a>
        <a href="#/ekonomi"><strong>Ekonomi</strong><span>PDB, inflasi, ekspor-impor 2020–2024</span></a>
        <a href="#/kesehatan"><strong>Kesehatan</strong><span>Harapan hidup 74,15 tahun, stunting 19,8%</span></a>
        <a href="#/pendidikan"><strong>Pendidikan</strong><span>IPM 75,02, harapan sekolah 13,21 tahun</span></a>
        <a href="#/daerah"><strong>Daerah</strong><span>Cari dan bandingkan 10 provinsi terbesar</span></a>
      </div>
    </div>
  </section>
  ${srcLine("BPS, Bank Dunia, Kementerian Kesehatan, Kementerian Perdagangan.")}
  `;
  return {
    html,
    mount(root) {
      putChart(root, "c-pop", lineChart(D.POPULATION_SERIES.map((p) => ({ x: p.year, y: p.value })), { unit: "", yDigits: 0 }));
      putChart(root, "c-growth", barChart([2020, 2021, 2022, 2023, 2024].map((y) => ({ label: y, value: D.ECONOMY[y].growth })), { unit: "%", yDigits: 2, highlightLast: true }));
    },
  };
}

// ---------- Penduduk ----------
function population() {
  const p = D.POPULATION;
  const top = [...D.PROVINCES].sort((a, b) => b.pop - a.pop);
  const html = `
  <header class="page-head"><p class="eyebrow">Penduduk</p><h1>281,6 juta jiwa — negara ke-4 terpadat di dunia</h1>
  <p class="lede">Indonesia tumbuh sekitar 1,0% per tahun. Hampir 7 dari 10 penduduk berada di usia produktif.</p></header>
  <section class="kpi-grid">
    ${kpi("281,6 jt", "Penduduk 2024", "BPS")}
    ${kpi("283,5 jt", "Estimasi PBB 2024", "UN WPP 2024")}
    ${kpi("30,5 thn", "Usia median", "UN WPP 2024")}
    ${kpi("58%", "Tinggal di kota", "Bank Dunia 2024")}
    ${kpi("148/km&sup2;", "Kepadatan penduduk", "Dihitung dari luas BPS")}
    ${kpi("17.508", "Pulau", "BIG / BPS")}
  </section>
  <div class="chart-grid">
    ${chartBox("Jumlah penduduk, 2015–2024", "Juta jiwa — BPS (2020: Sensus Penduduk)", "c-pop2")}
    ${chartBox("Siapa saja penduduknya?", "Kelompok usia, % dari total — BPS 2024", "c-age")}
  </div>
  ${chartBox("10 provinsi terpadat", "Juta jiwa, proyeksi pertengahan 2024 — BPS", "c-prov")}
  ${srcLine("BPS (proyeksi penduduk &amp; Sensus Penduduk 2020), UN World Population Prospects 2024, Bank Dunia.")}
  `;
  return {
    html,
    mount(root) {
      putChart(root, "c-pop2", lineChart(D.POPULATION_SERIES.map((x) => ({ x: x.year, y: x.value })), { yDigits: 0 }));
      putChart(root, "c-age", hbars(p.ageBands2024.map((b) => ({ label: b.band, value: b.share, color: "#0d4f4a" })), { unit: "%", digits: 1, barMax: 100 }));
      putChart(root, "c-prov", hbars(top.map((x) => ({ label: x.name, value: x.pop })), { unit: " jt", digits: 1, barMax: 50 }));
    },
  };
}

// ---------- Ekonomi ----------
let ecoYear = 2024;
function economy() {
  const years = D.YEARS;
  const e = D.ECONOMY[ecoYear];
  const html = `
  <header class="page-head"><p class="eyebrow">Ekonomi</p><h1>Ekonomi tumbuh 5,03% pada 2024</h1>
  <p class="lede">Pilih tahun untuk melihat angka tahun itu. PDB 2024 mencapai US$1.396,3 miliar — sekitar Rp22.139 triliun.</p></header>
  <div class="controls">
    <label for="eco-year">Tahun</label>
    <select id="eco-year">${years.map((y) => `<option value="${y}"${y === ecoYear ? " selected" : ""}>${y}</option>`).join("")}</select>
    <span class="control-note">Angka berubah mengikuti tahun yang dipilih.</span>
  </div>
  <section class="kpi-grid" id="eco-kpis">
    ${kpi("US$" + id2(e.gdpUsd / 1000) + " T", "PDB nominal (" + ecoYear + ")", "Bank Dunia")}
    ${kpi(id2(e.growth) + "%", "Pertumbuhan PDB riil", "BPS")}
    ${kpi(id2(e.inflation) + "%", "Inflasi (yoy)", "BPS")}
    ${kpi("US$" + id1(e.exports) + " miliar", "Ekspor", "BPS / Kemendag")}
    ${kpi("US$" + id1(e.imports) + " miliar", "Impor", "BPS / Kemendag")}
    ${kpi("US$" + id1(e.surplus) + " miliar", "Surplus perdagangan", "BPS / Kemendag")}
  </section>
  <div class="chart-grid">
    ${chartBox("Pertumbuhan PDB, 2020–2024", "% per tahun — BPS (2020: kontraksi pandemi)", "c-gdp")}
    ${chartBox("Ekspor vs impor, 2021–2024", "US$ miliar — BPS / Kemendag", "c-trade")}
  </div>
  <div class="chart-grid">
    ${chartBox("PDB menurut lapangan usaha", "Pangsa nilai tambah bruto, 2023 — Bank Dunia", "c-sector")}
    <section class="chart-card"><h3>Ke mana ekspor Indonesia pergi?</h3><p class="chart-sub">Pangsa tujuan ekspor, 2024 — India Exim Bank</p>
      <table class="mini-table"><thead><tr><th>Negara tujuan</th><th>Pangsa</th></tr></thead><tbody>
      ${D.EXPORT_DESTINATIONS.map((d) => `<tr><td>${d.country}</td><td>${id1(d.share)}%</td></tr>`).join("")}
      </tbody></table>
      <h3 class="sub-h">Barang ekspor terbesar</h3>
      <ul class="plain-list">${D.EXPORT_GOODS.map((g) => `<li>${g.good} — <strong>${id1(g.share)}%</strong></li>`).join("")}</ul>
    </section>
  </div>
  <section class="fact-strip">
    <p><strong>Industri pengolahan nonmigas</strong> menyumbang 17,2% PDB dan 74,25% nilai ekspor 2024 (BPS via Kemenperin). <strong>Realisasi investasi 2024</strong> Rp1.714,2 triliun, 42,1% di antaranya ke manufaktur (BKPM).</p>
  </section>
  ${srcLine("BPS, Bank Dunia, Kementerian Perdagangan / PDSI, Kemenperin, BKPM, India Exim Bank.")}
  `;
  return {
    html,
    mount(root) {
      const sel = root.querySelector("#eco-year");
      sel.addEventListener("change", () => {
        ecoYear = Number(sel.value);
        render();
      });
      putChart(root, "c-gdp", barChart(years.map((y) => ({ label: y, value: D.ECONOMY[y].growth })), { unit: "%", yDigits: 2, highlightLast: true }));
      putChart(root, "c-trade", groupedBars([2021, 2022, 2023, 2024].map((y) => ({ label: y, a: D.ECONOMY[y].exports, b: D.ECONOMY[y].imports })), { names: ["Ekspor", "Impor"], unit: "" }));
      const d = donut(D.SECTORS.map((s, i) => ({ ...s, value: s.share, color: ["#0d4f4a", "#e8a317", "#7a9b76"][i] })), { centerTop: "100%", centerBottom: "nilai tambah bruto" });
      putChart(root, "c-sector", d);
      const legend = document.createElement("ul");
      legend.className = "plain-list";
      legend.innerHTML = D.SECTORS.map((s, i) => `<li><span class="dot" style="background:${["#0d4f4a", "#e8a317", "#7a9b76"][i]}"></span>${s.name} — <strong>${id1(s.share)}%</strong></li>`).join("");
      root.querySelector("#c-sector").after(legend);
    },
  };
}

// ---------- Kesehatan ----------
function health() {
  const html = `
  <header class="page-head"><p class="eyebrow">Kesehatan &amp; kesejahteraan</p><h1>Harapan hidup 74,15 tahun — dan terus naik</h1>
  <p class="lede">Stunting turun di bawah 20% untuk pertama kalinya pada 2024. Kemiskinan 8,57% pada September 2024.</p></header>
  <section class="kpi-grid">
    ${kpi("74,15 thn", "Harapan hidup saat lahir (2024)", "BPS")}
    ${kpi("75,02", "IPM (2024)", "BPS")}
    ${kpi("19,8%", "Stunting balita (2024)", "Kemenkes / SSGI")}
    ${kpi("8,57%", "Kemiskinan (Sep 2024)", "BPS")}
    ${kpi("4,76%", "Pengangguran (Feb 2025)", "BPS / Sakernas")}
    ${kpi("Rp12,34 jt", "Pengeluaran riil per kapita/thn (2024)", "BPS")}
  </section>
  <div class="chart-grid">
    ${chartBox("IPM naik setiap tahun", "Indeks Pembangunan Manusia, 2020–2024 — BPS", "c-ipm")}
    ${chartBox("Stunting terus turun", "% balita stunting — Kemenkes / SSGI", "c-stunt")}
  </div>
  <div class="chart-grid">
    ${chartBox("Pengangguran turun dari puncak pandemi", "TPT Agustus, % angkatan kerja — BPS / Sakernas", "c-tpt")}
    <section class="chart-card"><h3>Kemiskinan: kota vs desa</h3><p class="chart-sub">% penduduk miskin — BPS</p>
      <table class="mini-table"><thead><tr><th>Periode</th><th>Nasional</th><th>Juta jiwa</th></tr></thead><tbody>
      ${D.POVERTY.map((r) => `<tr><td>${r.period}</td><td>${id2(r.value)}%</td><td>${id2(r.people)}</td></tr>`).join("")}
      </tbody></table>
      <p class="chart-sub">September 2024: perkotaan ${id2(D.POVERTY_DETAIL.urbanSep2024)}%, perdesaan ${id2(D.POVERTY_DETAIL.ruralSep2024)}%. Garis kemiskinan Rp${id(D.POVERTY_DETAIL.lineSep2024)} per orang per bulan.</p>
      <p class="chart-sub">Agustus 2024: 144,64 juta orang bekerja dari 215,37 juta penduduk usia kerja; 7,47 juta menganggur.</p>
    </section>
  </div>
  ${srcLine("BPS (IPM 2024, Sakernas, Susenas), Kementerian Kesehatan / SSGI 2024.")}
  `;
  return {
    html,
    mount(root) {
      putChart(root, "c-ipm", lineChart([2020, 2021, 2022, 2023, 2024].map((y) => ({ x: y, y: D.HDI[y].ipm })), { yDigits: 2 }));
      putChart(root, "c-stunt", barChart(D.STUNTING.map((s) => ({ label: s.year, value: s.value })), { unit: "%", yDigits: 1, highlightLast: true }));
      putChart(root, "c-tpt", barChart(D.UNEMPLOYMENT.map((u) => ({ label: u.year, value: u.value })), { unit: "%", yDigits: 2, highlightLast: true }));
    },
  };
}

// ---------- Pendidikan ----------
function education() {
  const html = `
  <header class="page-head"><p class="eyebrow">Pendidikan</p><h1>Rata-rata orang Indonesia bersekolah 8,85 tahun</h1>
  <p class="lede">Baru setara SMP — tapi harapan lama sekolah sudah 13,21 tahun. Kesenjangan antarprovinsi masih lebar.</p></header>
  <section class="kpi-grid">
    ${kpi("13,21 thn", "Harapan lama sekolah (2024)", "BPS")}
    ${kpi("8,85 thn", "Rata-rata lama sekolah (2024)", "BPS")}
    ${kpi("75,02", "IPM (2024)", "BPS")}
    ${kpi("15,70 thn", "HLS tertinggi: DIY (2024)", "BPS")}
    ${kpi("9,63 thn", "HLS terendah: Papua Tengah (2024)", "BPS")}
    ${kpi("221,6 jt", "Pengguna internet (2024)", "APJII")}
  </section>
  <div class="chart-grid">
    ${chartBox("Harapan sekolah menurut provinsi", "HLS, tahun — BPS 2024", "c-hls")}
    <section class="chart-card"><h3>Empat dimensi IPM 2024</h3><p class="chart-sub">BPS, rilis 15 November 2024</p>
      <table class="mini-table"><thead><tr><th>Dimensi</th><th>2024</th><th>2020</th></tr></thead><tbody>
      <tr><td>Umur harapan hidup</td><td>74,15 thn</td><td>73,37 thn</td></tr>
      <tr><td>Harapan lama sekolah</td><td>13,21 thn</td><td>12,98 thn</td></tr>
      <tr><td>Rata-rata lama sekolah</td><td>8,85 thn</td><td>8,48 thn</td></tr>
      <tr><td>Pengeluaran riil per kapita</td><td>Rp12,34 jt/thn</td><td>—</td></tr>
      </tbody></table>
      <p class="chart-sub">IPM provinsi 2024: Jawa Timur 75,35 (di atas nasional 75,02), NTT 69,14. BPS menyajikan IPM untuk 38 provinsi mulai 2024.</p>
    </section>
  </div>
  ${srcLine("BPS (IPM 2024), APJII Survei Penetrasi Internet 2024.")}
  `;
  return {
    html,
    mount(root) {
      putChart(root, "c-hls", hbars([
        { label: "DIY (tertinggi)", value: 15.7 },
        { label: "Nasional", value: 13.21 },
        { label: "Papua Tengah (terendah)", value: 9.63 },
      ], { unit: " thn", digits: 2, barMax: 16 }));
    },
  };
}

// ---------- Daerah ----------
const regionState = { q: "", region: "Semua", sortKey: "pop", sortDir: -1, selected: null };

function regionRows() {
  let rows = D.PROVINCES.map((p) => ({
    ...p,
    share: (p.pop / D.POPULATION.total2024) * 100,
    density: Math.round((p.pop * 1e6) / p.area),
  }));
  if (regionState.region !== "Semua") rows = rows.filter((r) => r.region === regionState.region);
  if (regionState.q) {
    const q = regionState.q.toLowerCase();
    rows = rows.filter((r) => r.name.toLowerCase().includes(q));
  }
  const k = regionState.sortKey;
  rows.sort((a, b) => {
    const av = a[k] ?? -1, bv = b[k] ?? -1;
    if (typeof av === "string") return regionState.sortDir * av.localeCompare(bv, "id");
    return regionState.sortDir * (av - bv);
  });
  return rows;
}

function regions() {
  const html = `
  <header class="page-head"><p class="eyebrow">Daerah</p><h1>Bandingkan 10 provinsi terbesar</h1>
  <p class="lede">Cari provinsi, saring menurut pulau, urutkan kolomnya, lalu klik barisnya untuk melihat detail. Populasi proyeksi pertengahan 2024 (BPS).</p></header>
  <div class="controls">
    <label for="reg-q">Cari provinsi</label>
    <input id="reg-q" type="search" placeholder="cth: Jawa Barat" value="${regionState.q}">
    <div class="chips" role="group" aria-label="Saring pulau">
      ${D.REGIONS.map((r) => `<button class="chip${r === regionState.region ? " active" : ""}" data-region="${r}">${r}</button>`).join("")}
    </div>
  </div>
  <div class="table-wrap"><table class="data-table" id="reg-table">
    <thead><tr>
      <th data-sort="name">Provinsi</th><th data-sort="region">Pulau</th>
      <th data-sort="pop">Penduduk (jt)</th><th data-sort="share">Pangsa</th>
      <th data-sort="density">Kepadatan (/km&sup2;)</th><th data-sort="area">Luas (km&sup2;)</th>
    </tr></thead>
    <tbody id="reg-body"></tbody>
  </table></div>
  <p class="table-hint">Klik judul kolom untuk mengurutkan. Klik baris untuk detail provinsi.</p>
  <div id="reg-detail"></div>
  ${srcLine("BPS (proyeksi penduduk 2024, IPM 2024); kepadatan dihitung dari luas wilayah BPS.")}
  `;
  function paintBody(root) {
    const rows = regionRows();
    const body = root.querySelector("#reg-body");
    body.innerHTML = rows.length
      ? rows.map((r) => `<tr data-name="${r.name}" class="${regionState.selected === r.name ? "selected" : ""}">
        <td>${r.name}</td><td>${r.region}</td><td>${id1(r.pop)}</td><td>${id1(r.share)}%</td>
        <td>${id(r.density)}</td><td>${id(r.area)}</td></tr>`).join("")
      : `<tr><td colspan="6">Tidak ada provinsi yang cocok. Coba kata kunci lain.</td></tr>`;
    body.querySelectorAll("tr[data-name]").forEach((tr) => {
      tr.addEventListener("click", () => {
        regionState.selected = tr.dataset.name;
        paintBody(root);
        paintDetail(root);
      });
    });
  }
  function paintDetail(root) {
    const box = root.querySelector("#reg-detail");
    const r = D.PROVINCES.find((p) => p.name === regionState.selected);
    if (!r) { box.innerHTML = ""; return; }
    const density = Math.round((r.pop * 1e6) / r.area);
    const share = (r.pop / D.POPULATION.total2024) * 100;
    box.innerHTML = `<section class="detail-card"><h3>${r.name}</h3>
      <p>Pulau ${r.region} &middot; ${id1(r.pop)} juta jiwa (${id1(share)}% penduduk Indonesia) &middot; luas ${id(r.area)} km&sup2; &middot; kepadatan ${id(density)} jiwa/km&sup2;${r.ipm ? ` &middot; IPM 2024 ${id2(r.ipm)}` : ""}.</p>
      <p class="chart-sub">Angka: BPS, proyeksi pertengahan 2024 (IPM 2024 bila tersedia).</p></section>`;
  }
  return {
    html,
    mount(root) {
      const q = root.querySelector("#reg-q");
      q.addEventListener("input", () => { regionState.q = q.value; paintBody(root); });
      root.querySelectorAll(".chip").forEach((c) => {
        c.addEventListener("click", () => {
          regionState.region = c.dataset.region;
          root.querySelectorAll(".chip").forEach((x) => x.classList.toggle("active", x === c));
          paintBody(root);
        });
      });
      root.querySelectorAll("th[data-sort]").forEach((th) => {
        th.addEventListener("click", () => {
          const k = th.dataset.sort;
          if (regionState.sortKey === k) regionState.sortDir *= -1;
          else { regionState.sortKey = k; regionState.sortDir = k === "name" || k === "region" ? 1 : -1; }
          paintBody(root);
        });
      });
      paintBody(root);
      paintDetail(root);
    },
  };
}

export const VIEWS = {
  "/": overview,
  "/penduduk": population,
  "/ekonomi": economy,
  "/kesehatan": health,
  "/pendidikan": education,
  "/daerah": regions,
};

export function render() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const view = VIEWS[hash] || VIEWS["/"];
  const main = document.querySelector("#view");
  const { html, mount } = view();
  main.innerHTML = html;
  mount(main);
  document.querySelectorAll(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + (hash === "/" ? "/" : hash));
  });
  window.scrollTo(0, 0);
}
