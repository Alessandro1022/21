import type { TimelineEvent } from "@/data/timeline";
import type { Sultan } from "@/data/sultans";
import type { QuizQuestion, Badge } from "@/data/quiz";
import type { HistoricalProfile } from "@/data/profiles";
import type { HistoricalFigure } from "@/data/figures/types";
import type { TerritoryPeriod, TradeRouteGeo } from "@/data/ottomanTerritories";

export type { TimelineEvent, Sultan, QuizQuestion, Badge, HistoricalProfile, HistoricalFigure, TerritoryPeriod, TradeRouteGeo };

export interface EmpireConfig {
  id: string;
  name: Record<string, string>;
  theme: string;
  crestImage: string;
  backgroundImage: string;
  leaderTitle: Record<string, string>;
  dynastyTitle: Record<string, string>;
  timeline: TimelineEvent[];
  leaders: Sultan[];
  profiles: HistoricalProfile[];
  figures: HistoricalFigure[];
  quizQuestions: QuizQuestion[];
  badges: Badge[];
  territories: TerritoryPeriod[];
  tradeRoutes: TradeRouteGeo[];
  mapCenter: [number, number];
  mapZoom: number;
  yearRange: [number, number];
  yearDefault: number;
  chatSystemContext: string;
  chatPlaceholders: Record<string, string>;
  chatSuggestions: Record<string, string[]>;
  homeDescription: Record<string, string>;
  mapTitle: Record<string, string>;
  appTitle: string;
}

export function formatYear(year: number, lang?: string): string {
  if (year < 0) {
    const suffix = lang === "sv" ? "f.Kr." : lang === "tr" ? "MÖ" : "BC";
    return `${Math.abs(year)} ${suffix}`;
  }
  if (year < 500) {
    const suffix = lang === "sv" ? "e.Kr." : lang === "tr" ? "MS" : "AD";
    return `${year} ${suffix}`;
  }
  return `${year}`;
}
