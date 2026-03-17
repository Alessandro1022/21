import type { LatLngExpression } from "leaflet";

export interface TerritoryPeriod {
  yearStart: number;
  yearEnd: number;
  label: Record<string, string>;
  polygon: LatLngExpression[][];
  color: string;
}

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
const BUCHAREST_S: LatLngExpression = [43.8, 25.9];
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

export const territoryPeriods: TerritoryPeriod[] = [
  {
    yearStart: 1299,
    yearEnd: 1923,
    label: { sv: "Anatolien (kärna)", en: "Anatolia (core)", tr: "Anadolu (çekirdek)" },
    color: "#b8860b",
    polygon: [[
      CANAKKALE, [39.8, 26.8], IZMIR, [37.8, 27.2],
      [37.0, 27.5], [36.5, 28.5], ANTALYA, [36.0, 31.0],
      [36.2, 32.5], [36.5, 33.5], ADANA, [36.5, 35.2],
      ANTAKYA, [37.0, 36.8], [38.0, 37.5], SIVAS,
      [40.0, 38.0], [40.5, 39.0], TRABZON, [41.2, 38.5],
      [41.5, 37.0], [41.8, 36.0], SINOP, [41.8, 33.0],
      [41.5, 31.5], [41.2, 31.0], ISTANBUL, [40.8, 28.8],
      BURSA, [39.8, 29.5], [39.2, 30.0], [38.5, 30.2],
      [38.0, 29.5], [37.5, 29.0],
    ]],
  },
  {
    yearStart: 1354,
    yearEnd: 1913,
    label: { sv: "Thrakien & Marmara", en: "Thrace & Marmara", tr: "Trakya & Marmara" },
    color: "#cd853f",
    polygon: [[
      CANAKKALE, [40.0, 26.8], [40.5, 26.5], EDIRNE,
      [41.8, 26.8], [42.2, 27.2], VARNA, [43.0, 27.5],
      BUCHAREST_S, [43.5, 25.0], [43.2, 24.0], PLOVDIV,
      [42.5, 23.8], SOFIA, [42.0, 23.5], THESSALONIKI,
      [40.5, 23.5], [40.0, 24.0], [39.8, 25.5], [39.5, 26.0],
    ]],
  },
  {
    yearStart: 1393,
    yearEnd: 1878,
    label: { sv: "Bulgarien", en: "Bulgaria", tr: "Bulgaristan" },
    color: "#cd853f",
    polygon: [[
      SOFIA, [42.5, 23.8], PLOVDIV, [43.2, 24.0],
      [43.5, 25.0], BUCHAREST_S, [44.0, 26.5], [44.0, 27.5],
      VARNA, [43.0, 27.5], [42.2, 27.2], [41.8, 26.8],
      EDIRNE, PLOVDIV, [42.3, 24.0], [42.5, 23.0],
      NISH, [43.0, 22.5], [43.2, 22.0], [42.8, 21.5], SKOPJE,
      [41.5, 22.0], [41.8, 22.8], [42.2, 23.0],
    ]],
  },
  {
    yearStart: 1389,
    yearEnd: 1878,
    label: { sv: "Serbien & Bosnien", en: "Serbia & Bosnia", tr: "Sırbistan & Bosna" },
    color: "#daa520",
    polygon: [[
      SARAJEVO, [43.5, 17.0], [44.0, 16.5], [44.5, 16.8],
      [45.2, 17.5], [45.5, 18.0], [45.8, 18.5],
      BELGRADE, [45.0, 21.0], [44.5, 22.0], NISH,
      [43.2, 22.0], [43.0, 22.5], SKOPJE, [42.5, 20.5],
      [42.2, 19.5], [42.5, 19.0], [43.0, 18.5],
    ]],
  },
  {
    yearStart: 1460,
    yearEnd: 1830,
    label: { sv: "Grekland", en: "Greece", tr: "Yunanistan" },
    color: "#8b6914",
    polygon: [[
      THESSALONIKI, [40.5, 23.5], [40.0, 24.0], [39.8, 25.5],
      [39.5, 26.0], [39.0, 26.0], [38.5, 26.5],
      [38.0, 26.0], [37.5, 26.5], [37.0, 25.5],
      [36.5, 25.8], [36.5, 24.5], ATHENS, [37.0, 22.5],
      [37.5, 21.5], [38.0, 21.0], [38.5, 20.5],
      [39.5, 20.0], [40.0, 20.5], [40.5, 21.0],
      [41.0, 21.5], SKOPJE, [41.5, 22.0], [41.8, 22.8],
      [42.0, 22.5], [41.5, 22.5],
    ]],
  },
  {
    yearStart: 1526,
    yearEnd: 1699,
    label: { sv: "Ungern", en: "Hungary", tr: "Macaristan" },
    color: "#cd853f",
    polygon: [[
      [45.8, 18.5], [46.0, 18.0], [46.5, 17.5],
      [47.0, 17.8], [47.5, 18.0], BUDAPEST,
      [48.0, 19.5], [48.5, 20.5], [48.0, 21.5],
      [47.5, 22.0], [47.0, 22.0], [46.5, 22.0],
      [46.0, 21.5], [45.5, 21.0], [45.0, 21.0], BELGRADE,
      [45.5, 18.0],
    ]],
  },
  {
    yearStart: 1453,
    yearEnd: 1923,
    label: { sv: "Konstantinopel", en: "Constantinople", tr: "İstanbul" },
    color: "#ffd700",
    polygon: [[
      [41.3, 28.5], [41.3, 29.5], [40.8, 29.5], [40.8, 28.5],
    ]],
  },
  {
    yearStart: 1461,
    yearEnd: 1923,
    label: { sv: "Svarta havskusten", en: "Black Sea Coast", tr: "Karadeniz Kıyısı" },
    color: "#b8860b",
    polygon: [[
      ISTANBUL, [41.3, 30.0], [41.5, 31.0], SINOP,
      [41.8, 33.0], [41.5, 34.5], [41.5, 36.0],
      [41.8, 37.0], TRABZON, [40.8, 40.0],
      [40.5, 39.5], [40.0, 38.5], SIVAS,
      [41.5, 37.0], [41.8, 36.0], [42.0, 35.0],
      [42.3, 34.0], [42.5, 32.0], [42.3, 30.5],
      [42.0, 29.5], [41.8, 28.8], EDIRNE, VARNA,
      [43.5, 28.5], [43.8, 31.0],
    ]],
  },
  {
    yearStart: 1475,
    yearEnd: 1783,
    label: { sv: "Krim", en: "Crimea", tr: "Kırım" },
    color: "#8b6914",
    polygon: [[
      [46.0, 32.8], [46.2, 33.5], [46.0, 34.5],
      SEVASTOPOL, [44.5, 33.8], SIMFEROPOL,
      [45.0, 35.0], [45.5, 35.8], KERCH,
      [45.5, 36.0], [45.0, 36.5], [44.5, 36.0],
      [44.2, 35.0], [44.5, 34.0], [45.0, 33.5],
      [45.5, 33.0], [46.0, 33.0],
    ]],
  },
  {
    yearStart: 1516,
    yearEnd: 1918,
    label: { sv: "Levanten", en: "Levant", tr: "Şam" },
    color: "#cd853f",
    polygon: [[
      ANTAKYA, [36.5, 36.5], ALEPPO, [36.8, 38.0],
      [36.5, 39.0], [35.8, 40.0], [35.0, 40.5],
      [34.5, 40.5], [34.0, 39.5], [33.5, 38.5],
      [33.8, 37.5], DAMASCUS, [33.0, 35.8],
      [32.5, 35.5], JERUSALEM, [31.5, 35.5],
      [31.0, 35.5], [30.5, 35.2], AQABA,
      [29.0, 35.5], SINAI_S, [29.5, 33.0],
      SUEZ, [30.5, 32.8], CAIRO, [31.0, 32.0],
      [31.5, 32.5], [32.0, 33.0], [32.5, 33.5],
      [33.0, 34.5], [33.5, 35.0], [34.0, 35.5],
      [35.0, 35.8], [35.5, 36.0], [36.0, 36.2],
    ]],
  },
  {
    yearStart: 1534,
    yearEnd: 1918,
    label: { sv: "Mesopotamien", en: "Mesopotamia", tr: "Irak" },
    color: "#daa520",
    polygon: [[
      SIVAS, [38.5, 38.5], [38.0, 39.5], TRABZON,
      [40.0, 40.5], [39.5, 41.5], [38.5, 42.0],
      MOSUL, [36.0, 43.5], [35.5, 44.0], [35.0, 44.5],
      BAGHDAD, [32.5, 45.0], [32.0, 46.0],
      [31.5, 47.0], BASRA, [30.0, 48.5],
      [30.5, 47.5], [31.0, 46.0], [31.5, 45.0],
      [32.0, 44.0], [32.5, 43.0], [33.0, 42.0],
      [33.5, 41.0], [34.0, 40.5], [34.5, 40.5],
      [35.8, 40.0], [36.5, 39.0], ALEPPO,
      [36.8, 38.0], [37.5, 38.0], [38.0, 38.0],
    ]],
  },
  {
    yearStart: 1517,
    yearEnd: 1882,
    label: { sv: "Egypten", en: "Egypt", tr: "Mısır" },
    color: "#b8860b",
    polygon: [[
      SUEZ, [30.5, 33.0], [31.0, 33.5], [31.5, 33.0],
      [31.8, 32.5], [31.5, 32.0], [31.2, 31.8],
      CAIRO, [30.5, 31.0], [30.0, 30.5], [29.5, 30.8],
      [29.0, 30.5], [28.5, 30.0], [28.0, 29.5],
      [27.5, 28.5], [27.0, 27.5], [26.5, 27.0],
      [26.0, 26.0], [25.5, 25.5], [25.0, 25.2],
      [24.5, 25.0], [24.0, 25.5], [23.5, 25.5],
      [23.0, 25.5], [22.5, 25.0], [22.0, 25.0],
      [22.0, 28.0], [22.0, 31.0], [22.5, 32.0],
      [23.0, 32.5], ASWAN, [25.0, 33.5],
      [26.0, 34.0], [27.0, 34.5], SINAI_S,
      [28.5, 33.5], [29.0, 33.5], [29.5, 33.0],
      [30.0, 32.8],
    ]],
  },
  {
    yearStart: 1551,
    yearEnd: 1912,
    label: { sv: "Nordafrika", en: "North Africa", tr: "Kuzey Afrika" },
    color: "#8b6914",
    polygon: [[
      ALGIERS, [36.5, 2.0], [36.0, 1.5], [35.5, 1.0],
      [35.0, 0.5], [34.5, 0.5], [34.0, 0.8],
      [33.5, 1.5], [33.0, 2.5], [32.5, 3.5],
      [32.0, 4.5], [31.5, 5.5], [31.0, 7.0],
      [30.5, 8.5], [30.0, 9.5], [30.5, 10.0],
      [31.0, 11.0], [31.5, 12.0], TRIPOLI_LY,
      [32.5, 14.0], [32.0, 15.5], [31.5, 17.0],
      [31.0, 18.5], [31.0, 20.0], [31.0, 22.0],
      BENGHAZI, [31.5, 22.0], [31.5, 25.0],
      [29.5, 25.0], [27.0, 26.0], [25.0, 26.0],
      [23.0, 25.5], [22.0, 25.0], [22.0, 20.0],
      [23.0, 17.5], [24.5, 15.0], [26.0, 13.0],
      [28.0, 11.5], [29.5, 10.5], [30.5, 10.0],
      [30.0, 9.5], [29.5, 8.5], [30.0, 8.0],
      [31.0, 8.0], [32.0, 7.5], [33.0, 8.0],
      [34.0, 9.0], [35.0, 9.5], [36.0, 9.8],
      TUNIS, [37.0, 10.5], [37.5, 9.5],
    ]],
  },
  {
    yearStart: 1517,
    yearEnd: 1916,
    label: { sv: "Hejaz", en: "Hejaz", tr: "Hicaz" },
    color: "#daa520",
    polygon: [[
      AQABA, [29.0, 35.5], [28.5, 36.0],
      [28.0, 37.0], [27.5, 37.8], [27.0, 38.5],
      [26.5, 39.0], [26.0, 39.5], [25.5, 40.0],
      [25.0, 40.0], MEDINA, [24.0, 40.5],
      [23.0, 40.8], [22.5, 40.5], MECCA,
      [21.0, 40.5], [20.5, 41.0], [20.0, 41.5],
      [19.5, 42.0], [19.0, 42.5], [18.5, 43.0],
      [19.0, 43.5], [19.5, 44.0], [20.0, 44.5],
      [21.0, 43.5], [22.0, 43.0], [22.5, 42.5],
      [23.0, 42.0], [24.0, 41.5], [25.0, 40.5],
      [26.0, 40.0], [27.0, 39.0], [28.0, 37.5],
      [29.0, 36.5], [29.5, 35.5],
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
    path: [
      [41.0, 29.0], [40.5, 31.0], [40.0, 33.0],
      [39.5, 35.5], [38.5, 37.0], [37.5, 39.5],
      [37.0, 41.0], [36.0, 43.0], [35.0, 44.4],
    ],
  },
  {
    id: "spice-route",
    name: { sv: "Kryddvägen", en: "Spice Route", tr: "Baharat Yolu" },
    yearActive: 1517,
    path: [
      [30.0, 32.5], [30.5, 33.5], [31.5, 34.5],
      [32.5, 35.0], [33.5, 35.5], [35.0, 36.0],
      [36.5, 36.5], [38.0, 35.5], [39.5, 34.0],
      [41.0, 29.0],
    ],
  },
  {
    id: "mediterranean-trade",
    name: { sv: "Medelhavshandeln", en: "Mediterranean Trade", tr: "Akdeniz Ticareti" },
    yearActive: 1453,
    path: [
      [36.8, 10.2], [35.5, 12.0], [34.5, 15.0],
      [34.0, 18.0], [34.0, 21.0], [34.5, 24.0],
      [35.5, 27.0], [37.0, 28.5], [39.0, 29.0],
      [41.0, 29.0],
    ],
  },
];
