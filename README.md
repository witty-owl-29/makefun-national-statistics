[![Make.fun competition](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/witty-owl-29/makefun-national-statistics/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/witty-owl-29/makefun-national-statistics/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# NusaData — Statistik Indonesia

An original national statistics site for **Indonesia**, built for make.fun's
[Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
bounty. Every figure is real and carries its source and year: BPS, Bank
Dunia, Kementerian Kesehatan / SSGI, Kementerian Perdagangan, Kemenperin,
BKPM, India Exim Bank, APJII, and the UN.

## What it covers

- **Beranda** — hero, six headline indicators, population and GDP-growth
  charts, latest releases, and a guide to every section.
- **Penduduk** — 281,6 juta jiwa (BPS 2024), population 2015–2024, age
  bands, and the 10 largest provinces.
- **Ekonomi** — a working year selector (2020–2024) that updates GDP,
  growth, inflation, exports, imports, and the trade surplus; growth and
  trade charts, a sector donut, export destinations and top goods.
- **Kesehatan** — IPM, stunting, unemployment, and poverty (urban/rural).
- **Pendidikan** — harapan lama sekolah, rata-rata lama sekolah, IPM
  dimensions, and the gap between the highest and lowest provinces.
- **Daerah** — a searchable, sortable table of the 10 largest provinces
  with region filters; click a row for a detail card.

## How it is built

- Vanilla JavaScript + one CSS file, no framework, no build step, no
  network request: every script, stylesheet, font (system fonts), and
  image lives under `app/` (the favicon is a `data:` URI).
- Charts are hand-drawn SVG in `app/charts.js` — no chart library.
- Hash-routed single page: `index.html` (shell), `main.js` (router),
  `views.js` (sections), `charts.js` (SVG charts), `data.js` (figures),
  `style.css` (design). One file, one job each.
- `main.ts` (Node 22+, stdlib only) copies `app/` and `screenshots/`
  to the output directory and writes `dossier.json` with `buildDossier`
  from `vendor/makefun-frontend.ts` (the kit's copy, unchanged).

## Run it locally

```sh
node serve.ts        # http://127.0.0.1:8123/
```

## Build the entry

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

Screenshots in `screenshots/` were taken in a real Chromium browser from
the running site: the overview (cover), population, economy, and the
province table at phone size (390×844).
