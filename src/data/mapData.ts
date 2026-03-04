export interface Territory {
  id: string;
  name: Record<string, string>;
  yearAcquired: number;
  yearLost?: number;
  strategicValue: Record<string, string>;
  path: string; // SVG path
  center: { x: number; y: number };
}

export interface TradeRoute {
  id: string;
  name: Record<string, string>;
  yearActive: number;
  path: string;
}

export interface Campaign {
  id: string;
  name: Record<string, string>;
  year: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
}

// Simplified SVG territories for Ottoman Empire map (viewBox 0 0 800 500)
export const territories: Territory[] = [
  {
    id: "anatolia",
    name: { sv: "Anatolien", en: "Anatolia", tr: "Anadolu" },
    yearAcquired: 1299,
    path: "M420,220 L480,200 L540,210 L580,230 L600,250 L590,280 L550,290 L500,300 L450,290 L410,270 L400,240 Z",
    center: { x: 500, y: 250 },
    strategicValue: { sv: "Osmanska rikets kärnland och ursprungsregion", en: "Ottoman heartland and origin region", tr: "Osmanlı kalbi ve köken bölgesi" },
  },
  {
    id: "balkans",
    name: { sv: "Balkan", en: "Balkans", tr: "Balkanlar" },
    yearAcquired: 1389,
    yearLost: 1913,
    path: "M340,160 L380,140 L420,150 L430,180 L420,220 L400,240 L370,230 L350,210 L330,190 Z",
    center: { x: 380, y: 190 },
    strategicValue: { sv: "Strategisk kontroll av Europa och handelsvägar", en: "Strategic control of Europe and trade routes", tr: "Avrupa ve ticaret yollarının stratejik kontrolü" },
  },
  {
    id: "constantinople",
    name: { sv: "Konstantinopel", en: "Constantinople", tr: "İstanbul" },
    yearAcquired: 1453,
    path: "M415,200 L425,195 L435,200 L435,215 L425,220 L415,215 Z",
    center: { x: 425, y: 208 },
    strategicValue: { sv: "Huvudstad — kontroll av Bosporen och interkontinentalt nav", en: "Capital — control of the Bosporus and intercontinental hub", tr: "Başkent — Boğaz kontrolü ve kıtalararası merkez" },
  },
  {
    id: "egypt",
    name: { sv: "Egypten", en: "Egypt", tr: "Mısır" },
    yearAcquired: 1517,
    yearLost: 1882,
    path: "M400,340 L430,320 L460,330 L470,370 L450,400 L420,410 L390,390 L380,360 Z",
    center: { x: 430, y: 365 },
    strategicValue: { sv: "Kontroll av Suezregionen, spannmålsproduktion och handel", en: "Control of Suez region, grain production and trade", tr: "Süveyş bölgesi, tahıl üretimi ve ticaret kontrolü" },
  },
  {
    id: "levant",
    name: { sv: "Levanten", en: "Levant", tr: "Şam" },
    yearAcquired: 1516,
    yearLost: 1918,
    path: "M460,280 L480,270 L490,290 L485,320 L470,330 L455,310 Z",
    center: { x: 473, y: 300 },
    strategicValue: { sv: "Heliga platserna och handelsvägar till öst", en: "Holy sites and trade routes to the east", tr: "Kutsal mekanlar ve doğuya ticaret yolları" },
  },
  {
    id: "mesopotamia",
    name: { sv: "Mesopotamien", en: "Mesopotamia", tr: "Irak" },
    yearAcquired: 1534,
    yearLost: 1918,
    path: "M520,270 L560,260 L580,280 L570,320 L540,340 L510,320 L500,290 Z",
    center: { x: 540, y: 300 },
    strategicValue: { sv: "Kontroll av Tigris-Eufrat och handelsvägar till Persien", en: "Control of Tigris-Euphrates and trade routes to Persia", tr: "Dicle-Fırat kontrolü ve İran'a ticaret yolları" },
  },
  {
    id: "northafrica",
    name: { sv: "Nordafrika", en: "North Africa", tr: "Kuzey Afrika" },
    yearAcquired: 1551,
    yearLost: 1912,
    path: "M200,280 L280,260 L350,270 L380,290 L380,320 L340,340 L280,330 L220,310 Z",
    center: { x: 300, y: 300 },
    strategicValue: { sv: "Kontroll av Medelhavet och korsarflottan", en: "Mediterranean control and corsair fleet", tr: "Akdeniz kontrolü ve korsan donanması" },
  },
  {
    id: "hungary",
    name: { sv: "Ungern", en: "Hungary", tr: "Macaristan" },
    yearAcquired: 1526,
    yearLost: 1699,
    path: "M340,120 L380,110 L400,130 L390,155 L370,160 L345,155 L330,140 Z",
    center: { x: 365, y: 138 },
    strategicValue: { sv: "Frontlinje mot Habsburg och kontroll av Donau", en: "Front line against Habsburgs and Danube control", tr: "Habsburg'a karşı cephe hattı ve Tuna kontrolü" },
  },
  {
    id: "crimea",
    name: { sv: "Krim", en: "Crimea", tr: "Kırım" },
    yearAcquired: 1475,
    yearLost: 1783,
    path: "M460,150 L490,140 L510,155 L500,175 L475,180 L455,168 Z",
    center: { x: 480, y: 160 },
    strategicValue: { sv: "Kontroll av Svarta havet och allierat khanate", en: "Black Sea control and allied khanate", tr: "Karadeniz kontrolü ve müttefik hanlık" },
  },
  {
    id: "hejaz",
    name: { sv: "Hejaz", en: "Hejaz", tr: "Hicaz" },
    yearAcquired: 1517,
    yearLost: 1916,
    path: "M450,340 L470,330 L480,360 L470,400 L450,420 L435,400 L440,360 Z",
    center: { x: 458, y: 375 },
    strategicValue: { sv: "Mecka och Medina — religiös legitimitet", en: "Mecca and Medina — religious legitimacy", tr: "Mekke ve Medine — dini meşruiyet" },
  },
];

export const tradeRoutes: TradeRoute[] = [
  {
    id: "silk-road",
    name: { sv: "Sidenvägen", en: "Silk Road", tr: "İpek Yolu" },
    yearActive: 1453,
    path: "M425,210 L500,250 L540,260 L600,240 L680,220",
  },
  {
    id: "spice-route",
    name: { sv: "Kryddvägen", en: "Spice Route", tr: "Baharat Yolu" },
    yearActive: 1517,
    path: "M430,365 L460,330 L475,300 L500,260 L425,210",
  },
  {
    id: "mediterranean",
    name: { sv: "Medelhavshandeln", en: "Mediterranean Trade", tr: "Akdeniz Ticareti" },
    yearActive: 1453,
    path: "M150,260 L250,270 L350,275 L425,210",
  },
];

export const campaigns: Campaign[] = [
  {
    id: "vienna-1683",
    name: { sv: "Wien 1683", en: "Vienna 1683", tr: "Viyana 1683" },
    year: 1683,
    from: { x: 425, y: 210 },
    to: { x: 310, y: 120 },
  },
  {
    id: "egypt-1517",
    name: { sv: "Egypten 1517", en: "Egypt 1517", tr: "Mısır 1517" },
    year: 1517,
    from: { x: 473, y: 300 },
    to: { x: 430, y: 365 },
  },
  {
    id: "mohacs-1526",
    name: { sv: "Mohács 1526", en: "Mohács 1526", tr: "Mohaç 1526" },
    year: 1526,
    from: { x: 425, y: 210 },
    to: { x: 365, y: 138 },
  },
];
