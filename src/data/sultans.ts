export interface Sultan {
  id: string;
  name: string;
  reignStart: number;
  reignEnd: number;
  parentId: string | null; // for tree structure
  generation: number; // tree depth
  title: Record<string, string>;
  profileId?: string; // links to profiles data if available
}

export const sultans: Sultan[] = [
  { id: "osman-i", name: "Osman I", reignStart: 1299, reignEnd: 1326, parentId: null, generation: 1, title: { sv: "Grundaren", en: "The Founder", tr: "Kurucu" } },
  { id: "orhan", name: "Orhan", reignStart: 1326, reignEnd: 1362, parentId: "osman-i", generation: 2, title: { sv: "Organisatören", en: "The Organizer", tr: "Teşkilatçı" } },
  { id: "murad-i", name: "Murad I", reignStart: 1362, reignEnd: 1389, parentId: "orhan", generation: 3, title: { sv: "Balkanerövraren", en: "Conqueror of the Balkans", tr: "Balkan Fatihi" } },
  { id: "bayezid-i", name: "Bayezid I", reignStart: 1389, reignEnd: 1402, parentId: "murad-i", generation: 4, title: { sv: "Åskblixten", en: "The Thunderbolt", tr: "Yıldırım" } },
  { id: "mehmed-i", name: "Mehmed I", reignStart: 1413, reignEnd: 1421, parentId: "bayezid-i", generation: 5, title: { sv: "Återförenaren", en: "The Restorer", tr: "Çelebi" } },
  { id: "murad-ii", name: "Murad II", reignStart: 1421, reignEnd: 1451, parentId: "mehmed-i", generation: 6, title: { sv: "Krigaren", en: "The Warrior", tr: "Savaşçı" } },
  { id: "mehmed-ii", name: "Mehmed II", reignStart: 1444, reignEnd: 1481, parentId: "murad-ii", generation: 7, title: { sv: "Erövraren", en: "The Conqueror", tr: "Fatih" }, profileId: "mehmed-ii" },
  { id: "bayezid-ii", name: "Bayezid II", reignStart: 1481, reignEnd: 1512, parentId: "mehmed-ii", generation: 8, title: { sv: "Den rättrådige", en: "The Just", tr: "Adli" } },
  { id: "selim-i", name: "Selim I", reignStart: 1512, reignEnd: 1520, parentId: "bayezid-ii", generation: 9, title: { sv: "Den grymme", en: "The Resolute", tr: "Yavuz" } },
  { id: "suleiman-i", name: "Süleyman I", reignStart: 1520, reignEnd: 1566, parentId: "selim-i", generation: 10, title: { sv: "Den magnifike", en: "The Magnificent", tr: "Kanuni" }, profileId: "suleiman" },
  { id: "selim-ii", name: "Selim II", reignStart: 1566, reignEnd: 1574, parentId: "suleiman-i", generation: 11, title: { sv: "Den blonde", en: "The Blond", tr: "Sarı" } },
  { id: "murad-iii", name: "Murad III", reignStart: 1574, reignEnd: 1595, parentId: "selim-ii", generation: 12, title: { sv: "Diktaren", en: "The Poet", tr: "Şair" } },
  { id: "mehmed-iii", name: "Mehmed III", reignStart: 1595, reignEnd: 1603, parentId: "murad-iii", generation: 13, title: { sv: "Rättvisan", en: "The Just", tr: "Adli" } },
  { id: "ahmed-i", name: "Ahmed I", reignStart: 1603, reignEnd: 1617, parentId: "mehmed-iii", generation: 14, title: { sv: "Moskébyggaren", en: "Builder of the Blue Mosque", tr: "Cami Yapıcı" } },
  { id: "mustafa-i", name: "Mustafa I", reignStart: 1617, reignEnd: 1618, parentId: "mehmed-iii", generation: 14, title: { sv: "Den galne", en: "The Mad", tr: "Deli" } },
  { id: "osman-ii", name: "Osman II", reignStart: 1618, reignEnd: 1622, parentId: "ahmed-i", generation: 15, title: { sv: "Den unge", en: "The Young", tr: "Genç" } },
  { id: "murad-iv", name: "Murad IV", reignStart: 1623, reignEnd: 1640, parentId: "ahmed-i", generation: 15, title: { sv: "Erövraren av Bagdad", en: "Conqueror of Baghdad", tr: "Bağdat Fatihi" } },
  { id: "ibrahim", name: "İbrahim", reignStart: 1640, reignEnd: 1648, parentId: "ahmed-i", generation: 15, title: { sv: "Den galne", en: "The Mad", tr: "Deli" } },
  { id: "mehmed-iv", name: "Mehmed IV", reignStart: 1648, reignEnd: 1687, parentId: "ibrahim", generation: 16, title: { sv: "Jägaren", en: "The Hunter", tr: "Avcı" } },
  { id: "suleiman-ii", name: "Süleyman II", reignStart: 1687, reignEnd: 1691, parentId: "ibrahim", generation: 16, title: { sv: "Den fromme", en: "The Pious", tr: "Gazi" } },
  { id: "ahmed-ii", name: "Ahmed II", reignStart: 1691, reignEnd: 1695, parentId: "ibrahim", generation: 16, title: { sv: "Khani", en: "Khan", tr: "Han" } },
  { id: "mustafa-ii", name: "Mustafa II", reignStart: 1695, reignEnd: 1703, parentId: "mehmed-iv", generation: 17, title: { sv: "Gazi", en: "The Veteran", tr: "Gazi" } },
  { id: "ahmed-iii", name: "Ahmed III", reignStart: 1703, reignEnd: 1730, parentId: "mehmed-iv", generation: 17, title: { sv: "Tulpansultanen", en: "The Tulip Sultan", tr: "Lale Devri Sultanı" } },
  { id: "mahmud-i", name: "Mahmud I", reignStart: 1730, reignEnd: 1754, parentId: "mustafa-ii", generation: 18, title: { sv: "Den hinkande", en: "The Hunchback", tr: "Kambur" } },
  { id: "osman-iii", name: "Osman III", reignStart: 1754, reignEnd: 1757, parentId: "mustafa-ii", generation: 18, title: { sv: "Den fromme", en: "The Pious", tr: "Sofu" } },
  { id: "mustafa-iii", name: "Mustafa III", reignStart: 1757, reignEnd: 1774, parentId: "ahmed-iii", generation: 18, title: { sv: "Reformatorn", en: "The Reformer", tr: "Reformcu" } },
  { id: "abdulhamid-i", name: "Abdülhamid I", reignStart: 1774, reignEnd: 1789, parentId: "ahmed-iii", generation: 18, title: { sv: "Den sorgliga", en: "The Melancholy", tr: "Hüzünlü" } },
  { id: "selim-iii", name: "Selim III", reignStart: 1789, reignEnd: 1807, parentId: "mustafa-iii", generation: 19, title: { sv: "Reformatorn", en: "The Reformer", tr: "Reformcu" } },
  { id: "mustafa-iv", name: "Mustafa IV", reignStart: 1807, reignEnd: 1808, parentId: "abdulhamid-i", generation: 19, title: { sv: "Den korte", en: "The Brief", tr: "Kısa" } },
  { id: "mahmud-ii", name: "Mahmud II", reignStart: 1808, reignEnd: 1839, parentId: "abdulhamid-i", generation: 19, title: { sv: "Reformatorn", en: "The Reformer", tr: "Reformcu" } },
  { id: "abdulmecid-i", name: "Abdülmecid I", reignStart: 1839, reignEnd: 1861, parentId: "mahmud-ii", generation: 20, title: { sv: "Tanzimat-sultanen", en: "The Tanzimat Sultan", tr: "Tanzimat Sultanı" } },
  { id: "abdulaziz", name: "Abdülaziz", reignStart: 1861, reignEnd: 1876, parentId: "mahmud-ii", generation: 20, title: { sv: "Modernisten", en: "The Modernist", tr: "Modernist" } },
  { id: "murad-v", name: "Murad V", reignStart: 1876, reignEnd: 1876, parentId: "abdulmecid-i", generation: 21, title: { sv: "Den avsatte", en: "The Deposed", tr: "Hal Edilen" } },
  { id: "abdulhamid-ii", name: "Abdülhamid II", reignStart: 1876, reignEnd: 1909, parentId: "abdulmecid-i", generation: 21, title: { sv: "Den siste envåldshärskaren", en: "The Last Autocrat", tr: "Ulu Hakan" }, profileId: "abdulhamid-ii" },
  { id: "mehmed-v", name: "Mehmed V", reignStart: 1909, reignEnd: 1918, parentId: "abdulmecid-i", generation: 21, title: { sv: "Den maktlöse", en: "The Powerless", tr: "Reşad" } },
  { id: "mehmed-vi", name: "Mehmed VI", reignStart: 1918, reignEnd: 1922, parentId: "abdulmecid-i", generation: 21, title: { sv: "Den siste sultanen", en: "The Last Sultan", tr: "Son Sultan" } },
];
