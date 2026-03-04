export type FigureCategory =
  // Ottoman
  | "Sultan" | "Valide Sultan" | "Şehzade" | "Grand Vizier" | "Military Commander"
  | "Reformer" | "Scholar" | "Architect" | "Influential Woman" | "Diplomat"
  // Roman
  | "Emperor" | "Empress" | "General" | "Senator" | "Philosopher"
  | "Military Strategist" | "Religious Influencer" | "Political Rival" | "Cultural Figure";

export type Gender = "male" | "female";

export interface HistoricalFigure {
  id: string;
  name: string;
  title: Record<string, string>;
  category: FigureCategory;
  gender: Gender;
  period: string;               // e.g. "1432–1481"
  portrait: string;             // emoji placeholder
  overview: Record<string, string>;
  achievements: Record<string, string[]>;
  politicalImpact: Record<string, string>;
  militaryImpact: Record<string, string>;
  culturalImpact: Record<string, string>;
  leadershipStyle: Record<string, string>;
  controversies: Record<string, string>;
  significanceScore: number;    // 1–10
}
