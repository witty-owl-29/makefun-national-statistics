// NusaData — all figures are real, each with its source and year.
// Sources: BPS (Badan Pusat Statistik), Bank Dunia (World Bank),
// Kementerian Kesehatan / SSGI, Kemenperin, India Exim Bank, APJII.
// Values are rounded for display; exact values live in the notes.

export const META = {
  country: "Indonesia",
  tagline: "Data Indonesia, dibaca dalam hitungan detik.",
  updated: "27 November 2026",
  note: "Situs independen — bukan situs resmi BPS. Angka-angka di bawah bersumber dari publikasi resmi yang tercantum di setiap kartu.",
};

export const YEARS = [2020, 2021, 2022, 2023, 2024];

// Population, millions, mid-year (BPS; 2020 = Sensus Penduduk 2020)
export const POPULATION_SERIES = [
  { year: 2015, value: 255.6 },
  { year: 2016, value: 258.5 },
  { year: 2017, value: 261.4 },
  { year: 2018, value: 264.2 },
  { year: 2019, value: 267.0 },
  { year: 2020, value: 270.2 },
  { year: 2021, value: 273.9 },
  { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 },
  { year: 2024, value: 281.6 },
];

export const POPULATION = {
  total2024: 281.6, // juta jiwa, BPS 2024
  total2023: 278.7,
  un2024: 283.5, // juta jiwa, UN World Population Prospects 2024
  worldRank: 4,
  growthPerYear: 1.0, // persen per tahun, BPS 2024
  medianAge: 30.5, // tahun, UN WPP 2024
  urbanShare: 58, // persen, Bank Dunia 2024
  density: 148, // jiwa per km2, dihitung dari luas 1.904.569 km2 (BIG/BPS)
  areaKm2: 1904569,
  islands: 17508,
  provinces: 38,
  ageBands2024: [
    { band: "0–14 tahun", share: 24.0, millions: 67.6 },
    { band: "15–64 tahun", share: 68.9, millions: 194.0 },
    { band: "65+ tahun", share: 7.1, millions: 20.0 },
  ], // BPS 2024, dibulatkan
};

// Provinces, mid-2024 projection, millions (BPS, dibulatkan ke 0,1 jt).
// Density computed from BPS province areas.
export const PROVINCES = [
  { name: "Jawa Barat", region: "Jawa", pop: 49.3, area: 35378, ipm: null },
  { name: "Jawa Timur", region: "Jawa", pop: 41.9, area: 47803, ipm: 75.35 },
  { name: "Jawa Tengah", region: "Jawa", pop: 37.9, area: 32801, ipm: null },
  { name: "Sumatera Utara", region: "Sumatera", pop: 15.6, area: 72981, ipm: null },
  { name: "Banten", region: "Jawa", pop: 12.4, area: 9663, ipm: null },
  { name: "DKI Jakarta", region: "Jawa", pop: 10.7, area: 664, ipm: null },
  { name: "Sulawesi Selatan", region: "Sulawesi", pop: 9.6, area: 46717, ipm: null },
  { name: "Lampung", region: "Sumatera", pop: 9.4, area: 34624, ipm: null },
  { name: "Sumatera Selatan", region: "Sumatera", pop: 8.9, area: 91592, ipm: null },
  { name: "Riau", region: "Sumatera", pop: 6.9, area: 87024, ipm: null },
];

export const REGIONS = ["Semua", "Jawa", "Sumatera", "Sulawesi"];

// Economy by year (BPS; GDP nominal Bank Dunia)
export const ECONOMY = {
  2020: { gdpUsd: 1058.7, growth: -2.07, inflation: 1.68, exports: 163.19, imports: 141.57, surplus: 21.62 },
  2021: { gdpUsd: 1186.1, growth: 3.70, inflation: 1.87, exports: 231.61, imports: 196.27, surplus: 35.34 },
  2022: { gdpUsd: 1319.1, growth: 5.31, inflation: 5.51, exports: 291.9, imports: 237.44, surplus: 54.46 },
  2023: { gdpUsd: 1371.2, growth: 5.05, inflation: 2.61, exports: 258.82, imports: 221.93, surplus: 36.89 },
  2024: { gdpUsd: 1396.3, growth: 5.03, inflation: 1.57, exports: 264.7, imports: 233.66, surplus: 31.04 },
};
// GDP 2024 in rupiah: Rp22.139 triliun (BPS); per kapita US$4.942 (Bank Dunia)
export const ECONOMY_2024 = {
  gdpRupiah: 22139, // triliun rupiah, BPS 2024
  gdpPerCapitaUsd: 4942, // Bank Dunia 2024
  nonOilManufacturingShare: 17.2, // persen PDB, BPS via Kemenperin 2024
  manufacturingExportShare: 74.25, // persen total ekspor, 2024
  investmentTotal: 1714.2, // triliun rupiah realisasi investasi 2024, BKPM
  investmentManufacturing: 721.3, // triliun rupiah, 2024
};

// Sector shares of gross value added, 2023 (Bank Dunia)
export const SECTORS = [
  { name: "Jasa", share: 44.8 },
  { name: "Industri", share: 42.1 },
  { name: "Pertanian", share: 13.1 },
];

// Top export destinations, share of total exports 2024 (India Exim Bank)
export const EXPORT_DESTINATIONS = [
  { country: "Tiongkok", share: 23.6 },
  { country: "Amerika Serikat", share: 10.0 },
  { country: "Jepang", share: 7.8 },
  { country: "India", share: 7.7 },
  { country: "Singapura", share: 4.6 },
];

// Top export goods, share of total exports 2024 (India Exim Bank)
export const EXPORT_GOODS = [
  { good: "Bahan bakar mineral", share: 21.0 },
  { good: "Lemak & minyak nabati", share: 10.1 },
  { good: "Besi & baja", share: 9.7 },
  { good: "Mesin & peralatan listrik", share: 5.7 },
  { good: "Kendaraan bermotor", share: 4.2 },
];

// Human development (BPS, IPM release 15 Nov 2024)
export const HDI = {
  2020: { ipm: 72.81, uhh: 73.37, hls: 12.98, rls: 8.48 },
  2021: { ipm: 73.29 },
  2022: { ipm: 73.77 },
  2023: { ipm: 74.39 },
  2024: { ipm: 75.02, uhh: 74.15, hls: 13.21, rls: 8.85, spending: 12.34 },
};
// IPM series 2020–2024 verified (BPS); 2024 components verified.
// spending = pengeluaran riil per kapita per tahun (disesuaikan), Rp juta, 2024

// Health (Kemenkes / SSGI)
export const STUNTING = [
  { year: 2018, value: 30.8 },
  { year: 2022, value: 21.6 },
  { year: 2023, value: 21.5 },
  { year: 2024, value: 19.8 },
];

// Poverty (BPS)
export const POVERTY = [
  { period: "Mar 2024", value: 9.03, people: 25.22 },
  { period: "Sep 2024", value: 8.57, people: 24.06 },
  { period: "Mar 2025", value: 8.47, people: 23.85 },
];
// people = juta jiwa; Sep 2024: kota 6,66%, desa 11,34%; garis kemiskinan Rp595.242/orang/bulan
export const POVERTY_DETAIL = {
  urbanSep2024: 6.66,
  ruralSep2024: 11.34,
  lineSep2024: 595242, // Rp per orang per bulan
};

// Unemployment, open unemployment rate TPT, August series (BPS Sakernas)
export const UNEMPLOYMENT = [
  { year: 2015, value: 6.18 },
  { year: 2019, value: 5.23 },
  { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 },
  { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 },
  { year: 2024, value: 4.91 },
];
// Latest: Feb 2025 TPT 4,76% (BPS) — terendah sejak krisis 1998.
export const LABOUR_2024 = {
  workingAge: 215.37, // juta orang, Agu 2024
  employed: 144.64, // juta orang, Agu 2024
  unemployed: 7.47, // juta orang, Agu 2024
  tptFeb2025: 4.76,
};

// Digital (APJII 2024)
export const DIGITAL = {
  internetUsers: 221.6, // juta orang, APJII 2024
  internetPenetration: 79.5, // persen, APJII 2024
};

// Latest releases, as a visitor would check them
export const RELEASES = [
  { date: "15 Nov 2024", title: "IPM 2024 mencapai 75,02 — naik 0,63 poin dari 2023", source: "BPS" },
  { date: "12 Nov 2025", title: "Stunting 2024 turun ke 19,8% — pertama kali di bawah 20%", source: "Kemenkes / SSGI" },
  { date: "25 Jul 2025", title: "Kemiskinan Maret 2025: 8,47% (23,85 juta jiwa)", source: "BPS" },
  { date: "Mei 2025", title: "Pengangguran Februari 2025: 4,76% — terendah sejak 1998", source: "BPS / Sakernas" },
  { date: "Jan 2025", title: "Ekspor 2024: US$264,70 miliar; surplus US$31,04 miliar", source: "BPS / Kemendag" },
];

export const SOURCES = [
  "BPS — Badan Pusat Statistik (bps.go.id)",
  "Bank Dunia — World Development Indicators",
  "Kementerian Kesehatan — SSGI & Profil Kesehatan Indonesia",
  "Kementerian Perdagangan / PDSI — data BPS",
  "India Exim Bank — Indonesia Country Brief 2025",
  "APJII — Survei Penetrasi Internet 2024",
  "PBB — World Population Prospects 2024",
];
