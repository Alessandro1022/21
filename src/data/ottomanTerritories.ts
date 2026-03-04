import type { LatLngExpression } from "leaflet";

export interface TerritoryPeriod {
  yearStart: number;
  yearEnd: number;
  label: Record<string, string>;
  polygon: LatLngExpression[][];
  color: string;
}

// Simplified polygon boundaries for Ottoman territory at different periods
export const territoryPeriods: TerritoryPeriod[] = [
  {
    yearStart: 1299,
    yearEnd: 1923,
    label: { sv: "Anatolien (kärna)", en: "Anatolia (core)", tr: "Anadolu (çekirdek)" },
    color: "#b8860b",
    polygon: [[
      [40.5, 29.5], [41.0, 30.5], [41.5, 33.0], [40.8, 36.0], [39.5, 38.0],
      [38.0, 36.5], [37.0, 35.5], [36.5, 33.0], [37.0, 30.5], [37.5, 29.0],
      [38.5, 27.5], [39.5, 27.0], [40.0, 28.5],
    ]],
  },
  {
    yearStart: 1354,
    yearEnd: 1913,
    label: { sv: "Thrakien & Balkan", en: "Thrace & Balkans", tr: "Trakya & Balkanlar" },
    color: "#cd853f",
    polygon: [[
      [41.0, 26.0], [42.0, 23.0], [43.0, 22.5], [44.5, 22.0], [45.0, 21.5],
      [44.0, 24.0], [43.5, 25.5], [42.5, 27.0], [41.5, 28.5], [41.0, 28.0],
    ]],
  },
  {
    yearStart: 1389,
    yearEnd: 1878,
    label: { sv: "Serbien & Bosnien", en: "Serbia & Bosnia", tr: "Sırbistan & Bosna" },
    color: "#daa520",
    polygon: [[
      [43.0, 17.5], [44.5, 18.5], [45.5, 19.5], [45.0, 21.5], [44.0, 22.0],
      [43.0, 22.5], [42.0, 21.0], [42.5, 19.0],
    ]],
  },
  {
    yearStart: 1453,
    yearEnd: 1923,
    label: { sv: "Konstantinopel", en: "Constantinople", tr: "İstanbul" },
    color: "#ffd700",
    polygon: [[
      [41.2, 28.8], [41.15, 29.2], [40.95, 29.15], [40.95, 28.85],
    ]],
  },
  {
    yearStart: 1475,
    yearEnd: 1783,
    label: { sv: "Krim", en: "Crimea", tr: "Kırım" },
    color: "#8b6914",
    polygon: [[
      [45.5, 33.0], [45.8, 34.5], [45.3, 36.5], [44.5, 34.5], [44.8, 33.5],
    ]],
  },
  {
    yearStart: 1517,
    yearEnd: 1882,
    label: { sv: "Egypten", en: "Egypt", tr: "Mısır" },
    color: "#b8860b",
    polygon: [[
      [31.5, 25.0], [31.2, 30.0], [30.0, 32.5], [28.0, 33.5], [25.0, 35.0],
      [22.0, 36.5], [22.0, 31.0], [24.5, 29.0], [27.0, 26.0], [29.5, 25.0],
    ]],
  },
  {
    yearStart: 1516,
    yearEnd: 1918,
    label: { sv: "Levanten", en: "Levant", tr: "Şam" },
    color: "#cd853f",
    polygon: [[
      [37.0, 35.5], [36.5, 37.0], [35.0, 36.5], [33.0, 35.5], [31.5, 34.5],
      [31.5, 33.0], [32.5, 34.0], [34.0, 35.0],
    ]],
  },
  {
    yearStart: 1534,
    yearEnd: 1918,
    label: { sv: "Mesopotamien", en: "Mesopotamia", tr: "Irak" },
    color: "#daa520",
    polygon: [[
      [37.5, 40.0], [37.0, 42.0], [36.0, 44.0], [34.0, 45.5], [31.0, 47.5],
      [30.0, 47.0], [31.0, 44.0], [33.0, 42.0], [35.0, 39.0], [36.5, 38.0],
    ]],
  },
  {
    yearStart: 1551,
    yearEnd: 1912,
    label: { sv: "Nordafrika", en: "North Africa", tr: "Kuzey Afrika" },
    color: "#8b6914",
    polygon: [[
      [37.0, 10.0], [36.5, 8.5], [35.0, 4.0], [34.5, 2.5], [33.5, 3.0],
      [32.5, 8.0], [31.0, 12.0], [31.5, 20.0], [31.5, 25.0], [33.0, 23.0],
      [35.0, 15.0], [36.0, 11.5],
    ]],
  },
  {
    yearStart: 1526,
    yearEnd: 1699,
    label: { sv: "Ungern", en: "Hungary", tr: "Macaristan" },
    color: "#cd853f",
    polygon: [[
      [47.5, 17.0], [48.0, 19.0], [47.5, 21.0], [46.5, 20.5], [45.5, 19.5],
      [45.5, 17.5], [46.0, 16.5],
    ]],
  },
  {
    yearStart: 1461,
    yearEnd: 1923,
    label: { sv: "Svarta havskusten", en: "Black Sea Coast", tr: "Karadeniz Kıyısı" },
    color: "#b8860b",
    polygon: [[
      [41.5, 33.0], [42.0, 35.0], [41.5, 37.0], [41.0, 40.0], [40.5, 41.0],
      [40.0, 40.0], [39.5, 38.0], [40.0, 36.0], [40.8, 34.0],
    ]],
  },
  {
    yearStart: 1517,
    yearEnd: 1916,
    label: { sv: "Hejaz", en: "Hejaz", tr: "Hicaz" },
    color: "#daa520",
    polygon: [[
      [28.0, 35.0], [26.0, 37.0], [23.0, 39.0], [20.0, 40.5], [18.0, 42.0],
      [19.0, 43.0], [22.0, 41.0], [25.0, 39.5], [27.5, 37.0], [29.0, 36.0],
    ]],
  },
  {
    yearStart: 1393,
    yearEnd: 1878,
    label: { sv: "Bulgarien", en: "Bulgaria", tr: "Bulgaristan" },
    color: "#cd853f",
    polygon: [[
      [42.0, 23.0], [43.5, 22.5], [44.0, 24.0], [43.5, 27.0], [42.5, 28.0],
      [41.5, 27.0], [41.5, 25.0],
    ]],
  },
  {
    yearStart: 1460,
    yearEnd: 1830,
    label: { sv: "Grekland", en: "Greece", tr: "Yunanistan" },
    color: "#8b6914",
    polygon: [[
      [41.0, 21.0], [40.5, 23.5], [39.0, 23.0], [38.0, 24.0], [37.0, 22.5],
      [36.5, 23.0], [37.5, 21.0], [38.5, 20.5], [39.5, 20.0],
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
