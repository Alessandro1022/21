import { timelineEvents } from "@/data/timeline";
import { sultans } from "@/data/sultans";
import { quizQuestions, badges } from "@/data/quiz";
import { profiles } from "@/data/profiles";
import { ottomanFigures } from "@/data/figures";
import { territoryPeriods, tradeRoutesGeo } from "@/data/ottomanTerritories";
import type { EmpireConfig } from "./types";
import ottomanCrest from "@/assets/ottoman-crest.jpg";
import hagiaSofia from "@/assets/hagia-sofia.jpg";

export const ottomanEmpire: EmpireConfig = {
  id: "ottoman",
  name: { sv: "Osmanska riket", en: "Ottoman Empire", tr: "Osmanlı İmparatorluğu" },
  theme: "ottoman",
  appTitle: "Ottoman Intelligence",
  crestImage: ottomanCrest,
  backgroundImage: hagiaSofia,
  leaderTitle: { sv: "Sultan", en: "Sultan", tr: "Sultan" },
  dynastyTitle: { sv: "Osmansk Dynasti", en: "Ottoman Dynasty", tr: "Osmanlı Hanedanı" },
  timeline: timelineEvents,
  leaders: sultans,
  profiles,
  figures: ottomanFigures,
  quizQuestions,
  badges,
  territories: territoryPeriods,
  tradeRoutes: tradeRoutesGeo,
  mapCenter: [38, 32],
  mapZoom: 4,
  yearRange: [1299, 1923],
  yearDefault: 1590,
  chatSystemContext: "the Ottoman Empire (1299–1923). You are an expert on Ottoman history, administration, military, culture, and decline.",
  chatPlaceholders: {
    sv: "Ställ en fråga om Osmanska riket...",
    en: "Ask a question about the Ottoman Empire...",
    tr: "Osmanlı İmparatorluğu hakkında bir soru sorun...",
  },
  chatSuggestions: {
    sv: ["Vad var orsakerna till Osmanska rikets nedgång?", "Berätta om Süleyman den stores regeringstid", "Hur var millet-systemet uppbyggt?"],
    en: ["What caused the fall of the Ottoman Empire?", "Tell me about the reign of Suleiman the Magnificent", "How did the millet system work?"],
    tr: ["Osmanlı İmparatorluğu'nun çöküş nedenleri nelerdir?", "Kanuni Sultan Süleyman dönemi hakkında bilgi verin", "Millet sistemi nasıl işliyordu?"],
  },
  homeDescription: {
    sv: "Utforska Osmanska rikets historia (1299–1922) med AI-driven analys, interaktiv tidslinje, kartor och quiz.",
    en: "Explore the Ottoman Empire's history (1299–1922) with AI-driven analysis, interactive timeline, maps and quiz.",
    tr: "Osmanlı İmparatorluğu tarihini (1299–1922) AI destekli analiz ile keşfedin.",
  },
  mapTitle: { sv: "Osmanska rikets territorium", en: "Ottoman Empire Territory", tr: "Osmanlı İmparatorluğu Toprakları" },
};
