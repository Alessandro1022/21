import type { LatLngExpression } from "leaflet";

export interface TerritoryPeriod {
  yearStart: number;
  yearEnd: number;
  label: Record<string, string>;
  polygon: LatLngExpression[][];
  color: string;
}

// ===========================================
// SHARED BORDER VERTICES
// Adjacent provinces share exact coordinates
// to eliminate gaps between territories
// ===========================================

// Key shared points (used by multiple provinces)
const ISTANBUL: LatLngExpression = [41.0, 29.0];
const SINOP: LatLngExpression = [42.0, 35.0];
const TRABZON: LatLngExpression = [41.0, 39.5];
const SIVAS: LatLngExpression = [39.7, 37.0];
const ADANA: LatLngExpression = [37.0, 35.5];
const ANTAKYA: LatLngExpression = [36.2, 36.2];
const ANTALYA: LatLngExpression = [36.8, 30.5];
const IZMIR: LatLngExpression = [38.4, 27.0];
const CANAKKALE: LatLngExpression = [40.2, 26.4];
const EDIRNE: LatLngExpression = [41.7, 26.6];
const SOFIA: LatLngExpression = [42.7, 23.3];
const BELGRADE: LatLngExpression = [44.8, 20.5];
const BUDAPEST: LatLngExpression = [47.5, 19.0];
const SKOPJE: LatLngExpression = [42.0, 21.4];
const THESSALONIKI: LatLngExpression = [40.6, 22.9];
const ATHENS: LatLngExpression = [38.0, 23.7];
const PLOVDIV: LatLngExpression = [42.1, 24.7];
const VARNA: LatLngExpression = [43.2, 27.9];
const BUCHAREST_S: LatLngExpression = [43.8, 25.9]; // south of Bucharest
const ALEPPO: LatLngExpression = [36.2, 37.2];
const DAMASCUS: LatLngExpression = [33.5, 36.3];
const JERUSALEM: LatLngExpression = [31.8, 35.2];
const AQABA: LatLngExpression = [29.5, 35.0];
const CAIRO: LatLngExpression = [30.0, 31.2];
const SUEZ: LatLngExpression = [30.0, 32.5];
const SINAI_S: LatLngExpression = [28.0, 33.8];
const ASWAN: LatLngExpression = [24.0, 32.9];
const BAGHDAD: LatLngExpression = [33.3, 44.4];
const MOSUL: LatLngExpression = [36.3, 43.1];
const BASRA: LatLngExpression = [30.5, 47.8];
const TRIPOLI_LY: LatLngExpression = [32.9, 13.2];
const TUNIS: LatLngExpression = [36.8, 10.2];
const ALGIERS: LatLngExpression = [36.8, 3.1];
const BENGHAZI: LatLngExpression = [32.1, 20.1];
const MECCA: LatLngExpression = [21.4, 39.8];
const MEDINA: LatLngExpression = [24.5, 39.6];
const SEVASTOPOL: LatLngExpression = [44.6, 33.5];
const KERCH: LatLngExpression = [45.3, 36.6];
const SIMFEROPOL: LatLngExpression = [44.9, 34.1];
const SARAJEVO: LatLngExpression = [43.8, 18.4];
const NISH: LatLngExpression = [43.3, 21.9];
const BURSA: LatLngExpression = [40.2, 29.0];

// Anatolia – the heartland, shares borders with Thrace, Black Sea Coast, Levant
export const territoryPeriods: TerritoryPeriod[] = [
  {
    yearStart: 1299,
    yearEnd: 1923,
    label: { sv: "Anatolien (kärna)", en: "Anatolia (core)", tr: "Anadolu (çekirdek)" },
    color: "#b8860b",
    polygon: [[
      CANAKKALE, ISTANBUL, [41.2, 31.0], SINOP, [41.8, 37.0], TRABZON,
      SIVAS, [38.0, 38.0], ADANA, ANTAKYA,
      [36.2, 34.0], ANTALYA, [37.5, 28.0], IZMIR, [39.5, 26.5],
    ]],
  },
  // Thrace & Marmara – shares border with Anatolia at Istanbul-Canakkale, with Bulgaria at Edirne
  {
    yearStart: 1354,
    yearEnd: 1913,
    label: { sv: "Thrakien & Marmara", en: "Thrace & Marmara", tr: "Trakya & Marmara" },
    color: "#cd853f",
    polygon: [[
      CANAKKALE, [39.5, 26.5], IZMIR, // western coast shared
      [39.8, 25.5], [40.5, 24.0], THESSALONIKI,
      PLOVDIV, EDIRNE, ISTANBUL,
    ]],
  },
  // Bulgaria – shares border with Thrace at Plovdiv-Edirne, with Serbia at Nish
  {
    yearStart: 1393,
    yearEnd: 1878,
    label: { sv: "Bulgarien", en: "Bulgaria", tr: "Bulgaristan" },
    color: "#cd853f",
    polygon: [[
      PLOVDIV, THESSALONIKI, [40.5, 24.0],
      SOFIA, NISH, BUCHAREST_S, VARNA, [42.5, 27.0], EDIRNE,
    ]],
  },
  // Serbia & Bosnia – shares border with Bulgaria at Nish, with Hungary at Belgrade
  {
    yearStart: 1389,
    yearEnd: 1878,
    label: { sv: "Serbien & Bosnien", en: "Serbia & Bosnia", tr: "Sırbistan & Bosna" },
    color: "#daa520",
    polygon: [[
      SARAJEVO, [44.0, 16.5], [45.5, 17.0], [45.8, 18.5],
      BELGRADE, [44.5, 22.0], NISH, SOFIA, SKOPJE, [42.5, 19.0],
    ]],
  },
  // Greece – shares border with Thrace/Bulgaria
  {
    yearStart: 1460,
    yearEnd: 1830,
    label: { sv: "Grekland", en: "Greece", tr: "Yunanistan" },
    color: "#8b6914",
    polygon: [[
      THESSALONIKI, [40.5, 24.0], [39.8, 25.5],
      [39.0, 25.0], ATHENS, [37.0, 22.5], [36.4, 22.8],
      [37.8, 21.0], [38.5, 20.5], SKOPJE,
    ]],
  },
  // Hungary – shares border with Serbia at Belgrade
  {
    yearStart: 1526,
    yearEnd: 1699,
    label: { sv: "Ungern", en: "Hungary", tr: "Macaristan" },
    color: "#cd853f",
    polygon: [[
      [45.8, 18.5], BUDAPEST, [48.0, 20.0], [47.5, 22.0],
      [46.0, 21.0], [44.5, 22.0], BELGRADE,
    ]],
  },
  // Constantinople – small zone within Thrace/Anatolia overlap
  {
    yearStart: 1453,
    yearEnd: 1923,
    label: { sv: "Konstantinopel", en: "Constantinople", tr: "İstanbul" },
    color: "#ffd700",
    polygon: [[
      [41.2, 28.7], [41.2, 29.3], [40.9, 29.3], [40.9, 28.7],
    ]],
  },
  // Black Sea Coast – shares border with Anatolia at Sinop-Trabzon
  {
    yearStart: 1461,
    yearEnd: 1923,
    label: { sv: "Svarta havskusten", en: "Black Sea Coast", tr: "Karadeniz Kıyısı" },
    color: "#b8860b",
    polygon: [[
      SINOP, [41.2, 31.0], ISTANBUL, EDIRNE, VARNA,
      [43.5, 28.5], [43.8, 31.0], [43.0, 34.0],
      [42.3, 36.0], [41.8, 37.0],
    ]],
  },
  // Crimea – separate peninsula
  {
    yearStart: 1475,
    yearEnd: 1783,
    label: { sv: "Krim", en: "Crimea", tr: "Kırım" },
    color: "#8b6914",
    polygon: [[
      [46.2, 33.0], [46.0, 34.0], SEVASTOPOL, SIMFEROPOL, KERCH,
      [45.0, 36.0], [44.4, 34.0], [45.0, 32.8],
    ]],
  },
  // Levant – shares border with Anatolia at Antakya, with Egypt at Sinai, with Mesopotamia, with Hejaz at Aqaba
  {
    yearStart: 1516,
    yearEnd: 1918,
    label: { sv: "Levanten", en: "Levant", tr: "Şam" },
    color: "#cd853f",
    polygon: [[
      ANTAKYA, ALEPPO, [36.5, 38.0], [35.8, 40.0],
      [34.5, 40.5], [33.0, 38.0], DAMASCUS,
      JERUSALEM, AQABA, SINAI_S, SUEZ, CAIRO,
      [31.5, 34.0], [32.5, 34.5], [34.0, 35.0], ADANA, [36.2, 34.0],
    ]],
  },
  // Mesopotamia – shares border with Levant at Aleppo-east, with Anatolia
  {
    yearStart: 1534,
    yearEnd: 1918,
    label: { sv: "Mesopotamien", en: "Mesopotamia", tr: "Irak" },
    color: "#daa520",
    polygon: [[
      SIVAS, [38.0, 38.0], ANTAKYA, ALEPPO, [36.5, 38.0],
      [35.8, 40.0], MOSUL, BAGHDAD,
      [32.0, 46.0], BASRA, [30.0, 48.5],
      [30.5, 44.0], [33.0, 42.0], [34.5, 40.5],
    ]],
  },
  // Egypt – shares border with Levant at Cairo-Suez-Sinai
  {
    yearStart: 1517,
    yearEnd: 1882,
    label: { sv: "Egypten", en: "Egypt", tr: "Mısır" },
    color: "#b8860b",
    polygon: [[
      CAIRO, SUEZ, SINAI_S,
      [27.0, 34.5], [25.0, 35.0], ASWAN, [22.0, 36.5],
      [22.0, 31.0], [24.5, 29.0], [27.0, 26.0], [29.5, 25.0],
      [31.5, 25.0], [31.2, 29.0],
    ]],
  },
  // North Africa – shares border with Egypt at western edge
  {
    yearStart: 1551,
    yearEnd: 1912,
    label: { sv: "Nordafrika", en: "North Africa", tr: "Kuzey Afrika" },
    color: "#8b6914",
    polygon: [[
      ALGIERS, [35.0, 1.5], [33.5, 3.0],
      [32.0, 5.0], [31.0, 8.0], [30.5, 10.0],
      [31.0, 13.0], TRIPOLI_LY, BENGHAZI,
      [31.0, 22.0], [31.5, 25.0], [29.5, 25.0],
      [27.0, 26.0], [24.5, 29.0], [22.0, 31.0],
      [22.0, 25.0], [25.0, 20.0], [28.0, 15.0],
      [30.0, 12.0], [30.5, 10.0],
      [33.0, 5.0], [35.5, 2.0], TUNIS, [37.0, 10.0],
    ]],
  },
  // Hejaz – shares border with Levant at Aqaba, with Egypt via Red Sea coast
  {
    yearStart: 1517,
    yearEnd: 1916,
    label: { sv: "Hejaz", en: "Hejaz", tr: "Hicaz" },
    color: "#daa520",
    polygon: [[
      AQABA, SINAI_S, [27.0, 34.5],
      [25.0, 35.0], [24.0, 37.0], MECCA,
      [19.0, 41.5], [18.0, 42.5], [19.5, 44.0],
      [22.0, 42.0], MEDINA, [26.0, 38.5],
      [28.0, 37.0], [29.5, 35.5],
    ]],
  },
];

export interface TradeRouteGeo {
  id: string;
  name: Record<string, string>;
  yearActive: number;
  path: LatLngExpression[];
}

export const tradeRoutesGeo: TradeRouteGeo[] = [
  {
    id: "silk-road",
    name: { sv: "Sidenvägen", en: "Silk Road", tr: "İpek Yolu" },
    yearActive: 1453,
    path: [[41.0, 29.0], [39.9, 32.9], [38.5, 36.0], [37.0, 40.0], [35.0, 44.0]],
  },
  {
    id: "spice-route",
    name: { sv: "Kryddvägen", en: "Spice Route", tr: "Baharat Yolu" },
    yearActive: 1517,
    path: [[30.0, 32.5], [33.5, 35.0], [36.0, 36.0], [38.5, 34.0], [41.0, 29.0]],
  },
  {
    id: "mediterranean-trade",
    name: { sv: "Medelhavshandeln", en: "Mediterranean Trade", tr: "Akdeniz Ticareti" },
    yearActive: 1453,
    path: [[36.0, 10.0], [35.0, 15.0], [34.0, 24.0], [35.5, 28.0], [41.0, 29.0]],
  },
];
