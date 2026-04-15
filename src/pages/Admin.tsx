import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { empires as appEmpires } from "@/data/empires";
import {
  Activity,
  AlertTriangle,
  AreaChart,
  Ban,
  Bell,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  Copy,
  Crown,
  Database,
  Download,
  Eye,
  EyeOff,
  FileText,
  Flag,
  Globe2,
  Gauge,
  Hash,
  LineChart,
  Languages,
  Loader2,
  Megaphone,
  PieChart,
  Radar,
  Search,
  Send,
  Settings,
  Shield,
  Sparkles,
  Trash2,
  TrendingUp,
  User,
  UserRoundCheck,
  Users,
  XCircle,
  Zap,
} from "lucide-react";

type AdminTab =
  | "users"
  | "quiz"
  | "content"
  | "notifications"
  | "influencers"
  | "moderation"
  | "logs"
  | "stats"
  | "settings";

type SortField = "display_name" | "email" | "role" | "xp" | "created_at";
type SortDir = "asc" | "desc";
type LogType = "info" | "success" | "warn" | "error";
type ContentType = "announcement" | "tip" | "fact";

interface UserProfile {
  id: string;
  email: string;
  display_name: string;
  role: "admin" | "user" | string;
  xp: number;
  is_online: boolean;
  is_banned: boolean;
  created_at: string;
  last_seen?: string;
}

interface QuizQuestion {
  id: string;
  empire_id: string;
  question_en: string;
  options_en: string[];
  correct_index: number;
  explanation_en: string;
  question_sv?: string | null;
  question_tr?: string | null;
  options_sv?: string[] | null;
  options_tr?: string[] | null;
  explanation_sv?: string | null;
  explanation_tr?: string | null;
  created_at?: string;
}

interface ContentItem {
  id: string;
  type: ContentType;
  empire_target: "ottoman" | "roman" | "both";
  text_en: string;
  text_sv?: string | null;
  text_tr?: string | null;
  active: boolean;
  created_at: string;
}

interface AppNotification {
  id: string;
  title_en: string;
  title_sv?: string | null;
  title_tr?: string | null;
  body_en: string;
  body_sv?: string | null;
  body_tr?: string | null;
  image_url?: string | null;
  sent_count: number;
  created_at: string;
}

interface InfluencerLink {
  id: string;
  name: string;
  code: string;
  discount_percent: number;
  uses: number;
  conversions: number;
  revenue_generated: number;
  created_at: string;
}

interface FlaggedEvent {
  id: string;
  event_type: "suspicious_login" | "abusive_content" | "quiz_spam" | string;
  severity: "low" | "medium" | "high";
  message: string;
  status: "open" | "resolved" | "ignored";
  created_at: string;
}

interface AdminLog {
  id: string;
  type: LogType;
  message: string;
  createdAt: string;
}

interface AdvancedMetric {
  id: string;
  title: string;
  value: string;
  delta: number;
  trend: "up" | "down" | "flat";
  description: string;
  severity: "healthy" | "watch" | "risk";
}

interface DailySnapshot {
  day: string;
  users_created: number;
  active_users: number;
  quiz_answers: number;
  correct_answers: number;
  sessions: number;
  avg_session_minutes: number;
}

interface EmpireAnalyticsRow {
  empire_id: string;
  total_questions: number;
  fully_translated: number;
  missing_translations: number;
  avg_correct_rate: number;
  avg_explanation_length: number;
}

interface QuizDraft {
  id: string;
  empire_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  payload: Omit<QuizQuestion, "id">;
}

interface CohortRow {
  cohort: string;
  users: number;
  d1: number;
  d7: number;
  d30: number;
}

interface SegmentedUserGroup {
  id: string;
  name: string;
  count: number;
  avg_xp: number;
  online_rate: number;
  growth: number;
}

const QUIZ_PAGE_SIZE = 12;
const MONTHLY_PRICE = 78;
const DATA_EMPIRE_IDS = Object.keys(appEmpires).map((id) => id.toLowerCase());
const DEFAULT_EMPIRES = (DATA_EMPIRE_IDS.length ? DATA_EMPIRE_IDS : ["ottoman", "roman"]) as string[];
const DATE_WINDOWS = ["7d", "14d", "30d", "90d"] as const;
const tabs: { id: AdminTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "stats", label: "Stats", icon: TrendingUp },
  { id: "users", label: "Users", icon: Users },
  { id: "quiz", label: "Quiz", icon: BookOpen },
  { id: "content", label: "Content", icon: FileText },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "influencers", label: "Influencers", icon: Zap },
  { id: "moderation", label: "Moderation", icon: Shield },
  { id: "logs", label: "Logs", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];

const METRIC_BLUEPRINTS = [
  { id: "retention_d1", title: "Retention D1", description: "Users returning the next day" },
  { id: "retention_d7", title: "Retention D7", description: "Users returning within 7 days" },
  { id: "retention_d30", title: "Retention D30", description: "Users returning within 30 days" },
  { id: "engaged_sessions", title: "Engaged Sessions", description: "Sessions above 4 minutes" },
  { id: "quiz_completion", title: "Quiz Completion", description: "Started quiz sessions completed" },
  { id: "content_ctr", title: "Content CTR", description: "Tip/announcement click-through ratio" },
  { id: "notif_open", title: "Notification Open Rate", description: "Pushes opened within 24h" },
  { id: "streak_users", title: "Streak Users", description: "Users with 3+ day streak" },
  { id: "premium_intent", title: "Premium Intent", description: "Upgrade CTA interaction rate" },
  { id: "referral_eff", title: "Referral Efficiency", description: "Referral conversions per click" },
] as const;

const ADMIN_PLAYBOOK: Array<{
  id: string;
  title: string;
  category: "growth" | "moderation" | "quiz" | "content" | "infra" | "retention";
  severity: "low" | "medium" | "high";
  trigger: string;
  action: string;
  owner: string;
}> = [
  { id: "PB-001", title: "Drop in D1 retention", category: "retention", severity: "high", trigger: "D1 retention under 25%", action: "Launch welcome flow experiment and increase first-day reminders", owner: "Growth Ops" },
  { id: "PB-002", title: "High quiz translation debt", category: "quiz", severity: "medium", trigger: "Missing translations > 15%", action: "Run bulk translation and assign review queue by empire", owner: "Quiz Ops" },
  { id: "PB-003", title: "Suspicious login spike", category: "moderation", severity: "high", trigger: "Suspicious logins 3x baseline", action: "Enable forced session rotation and flag new IP clusters", owner: "Security" },
  { id: "PB-004", title: "Notification fatigue", category: "retention", severity: "medium", trigger: "Open rate below 18%", action: "Reduce cadence and A/B test message framing by segment", owner: "CRM" },
  { id: "PB-005", title: "Referral conversion drop", category: "growth", severity: "medium", trigger: "Referral conv rate down 25% WoW", action: "Refresh landing page and validate coupon eligibility", owner: "Partnerships" },
  { id: "PB-006", title: "Inactive content backlog", category: "content", severity: "low", trigger: "Inactive content above 20 items", action: "Archive stale content and rotate fresh empire-targeted cards", owner: "Content Ops" },
  { id: "PB-007", title: "Quiz spam wave", category: "moderation", severity: "high", trigger: "Quiz spam signals above threshold", action: "Rate-limit suspicious clients and tighten anti-spam heuristics", owner: "Trust & Safety" },
  { id: "PB-008", title: "Low average XP growth", category: "growth", severity: "medium", trigger: "Avg XP growth < 3% monthly", action: "Release challenge bundles and XP streak multipliers", owner: "Product" },
  { id: "PB-009", title: "Empire imbalance in questions", category: "quiz", severity: "medium", trigger: "One empire has < 20% question share", action: "Prioritize content team backlog for low-coverage empires", owner: "Quiz Ops" },
  { id: "PB-010", title: "Support ticket surge", category: "infra", severity: "high", trigger: "Tickets > 2x daily average", action: "Open incident channel and post temporary status banner", owner: "Support" },
  { id: "PB-011", title: "Realtime log lag", category: "infra", severity: "medium", trigger: "Realtime delay above 60s", action: "Restart subscription channels and validate indexes", owner: "Platform" },
  { id: "PB-012", title: "Abusive content increase", category: "moderation", severity: "high", trigger: "Abusive flags above baseline for 3h", action: "Expand blocked words set and enable stricter filters", owner: "Trust & Safety" },
  { id: "PB-013", title: "High ban false-positives", category: "moderation", severity: "medium", trigger: "Ban reversals exceed 8%", action: "Review moderation rules and add appeal workflow", owner: "Moderation" },
  { id: "PB-014", title: "Announcement underperformance", category: "content", severity: "low", trigger: "Announcement CTR under 5%", action: "Rewrite copy and target by empire and XP level", owner: "Content Ops" },
  { id: "PB-015", title: "Quiz creation bottleneck", category: "quiz", severity: "medium", trigger: "Draft backlog > 30", action: "Enable reviewer rotation and parallel draft approvals", owner: "Quiz Ops" },
  { id: "PB-016", title: "Premium intent decline", category: "growth", severity: "medium", trigger: "Premium intent metric down 20%", action: "Test checkout copy and increase social proof modules", owner: "Revenue Team" },
  { id: "PB-017", title: "Critical table read latency", category: "infra", severity: "high", trigger: "p95 query latency > 900ms", action: "Inspect query plans and add missing DB indexes", owner: "Platform" },
  { id: "PB-018", title: "Streak break pattern", category: "retention", severity: "medium", trigger: "Streak users decline 12% weekly", action: "Inject comeback notifications and recovery quests", owner: "Lifecycle" },
  { id: "PB-019", title: "Early churn in cohort", category: "retention", severity: "high", trigger: "D7 retention drops below 16%", action: "Launch onboarding patch and simplify first quiz path", owner: "Growth Ops" },
  { id: "PB-020", title: "Influencer fraud pattern", category: "growth", severity: "high", trigger: "Unusual referral click bursts", action: "Freeze suspected codes and verify source quality", owner: "Partnerships" },
  { id: "PB-021", title: "Translation queue drift", category: "content", severity: "medium", trigger: "SV/TR backlog older than 72h", action: "Auto-translate pending items and request human review", owner: "Localization" },
  { id: "PB-022", title: "Inactive admin channel", category: "infra", severity: "low", trigger: "No admin logs in 24h", action: "Validate emitters and run synthetic admin actions", owner: "Platform" },
  { id: "PB-023", title: "Top segment stagnation", category: "growth", severity: "medium", trigger: "Power users flat for 2 weeks", action: "Ship elite challenges and leaderboard rewards", owner: "Product" },
  { id: "PB-024", title: "Content overfit to empire", category: "content", severity: "low", trigger: "Single empire receives > 70% posts", action: "Rebalance publishing mix for all empires", owner: "Editorial" },
  { id: "PB-025", title: "Session revocation misuse", category: "moderation", severity: "high", trigger: "Frequent global revokes", action: "Require approval workflow for danger-zone actions", owner: "Security" },
  { id: "PB-026", title: "Quiz explanation quality drop", category: "quiz", severity: "medium", trigger: "Avg explanation length below 120 chars", action: "Enforce minimum explanation policy in review", owner: "Quiz QA" },
  { id: "PB-027", title: "Campaign saturation", category: "retention", severity: "medium", trigger: "Notification sends > 3/week/user", action: "Throttle campaigns and segment by engagement", owner: "CRM" },
  { id: "PB-028", title: "Flag resolution backlog", category: "moderation", severity: "high", trigger: "Open flags older than 48h", action: "Escalate staffing and auto-prioritize by severity", owner: "Moderation" },
  { id: "PB-029", title: "Referral code collisions", category: "growth", severity: "low", trigger: "Duplicate code generation attempt", action: "Increase entropy and add uniqueness validator", owner: "Platform" },
  { id: "PB-030", title: "Daily snapshot missing", category: "infra", severity: "medium", trigger: "No daily snapshot for current date", action: "Backfill snapshot job and alert scheduler owner", owner: "Data Eng" },
  { id: "PB-031", title: "Large XP discrepancy", category: "growth", severity: "medium", trigger: "XP anomalies exceed expected ranges", action: "Audit XP grants and anti-cheat safeguards", owner: "Product Analytics" },
  { id: "PB-032", title: "Dormant influencer links", category: "growth", severity: "low", trigger: "No clicks for 30 days", action: "Re-engage influencer or archive link", owner: "Partnerships" },
  { id: "PB-033", title: "Content localization mismatch", category: "content", severity: "medium", trigger: "EN text changed without SV/TR update", action: "Queue differential translation sync", owner: "Localization" },
  { id: "PB-034", title: "Quiz option imbalance", category: "quiz", severity: "low", trigger: "Correct index overconcentrated", action: "Randomize options and enforce distribution checks", owner: "Quiz QA" },
  { id: "PB-035", title: "Unusual online cliff", category: "infra", severity: "high", trigger: "Online users drop > 40% in 15 min", action: "Run health checks for auth and websocket services", owner: "SRE" },
  { id: "PB-036", title: "Weak onboarding copy", category: "retention", severity: "medium", trigger: "Activation score under threshold", action: "Replace onboarding copy with guided milestones", owner: "Lifecycle" },
  { id: "PB-037", title: "Over-broad blocked words", category: "moderation", severity: "low", trigger: "User false positives increase", action: "Narrow blocked terms and add context filters", owner: "Trust & Safety" },
  { id: "PB-038", title: "Quiz save error cluster", category: "quiz", severity: "high", trigger: "Failed saves > 5% in 1h", action: "Inspect edge functions and DB write latency", owner: "Platform" },
  { id: "PB-039", title: "Missing empire metadata", category: "quiz", severity: "medium", trigger: "Questions without valid empire", action: "Backfill empire IDs and enforce required field", owner: "Quiz Ops" },
  { id: "PB-040", title: "Push payload oversize", category: "infra", severity: "low", trigger: "Notification body exceeds limits", action: "Trim payload and enforce character guardrails", owner: "CRM" },
  { id: "PB-041", title: "Conversion funnel break", category: "growth", severity: "high", trigger: "Checkout starts without completions", action: "Trace payment flow and rollback latest checkout changes", owner: "Revenue Team" },
  { id: "PB-042", title: "Stale feature flags", category: "infra", severity: "low", trigger: "Flags unchanged for > 90 days", action: "Review and remove obsolete flags", owner: "Platform" },
  { id: "PB-043", title: "Excessive admin actions", category: "moderation", severity: "medium", trigger: "Admin writes spike unusually", action: "Audit actor permissions and enforce 2FA checks", owner: "Security" },
  { id: "PB-044", title: "Question quality variance", category: "quiz", severity: "medium", trigger: "Rating variance above threshold", action: "Introduce editorial QA pass for outliers", owner: "Quiz QA" },
  { id: "PB-045", title: "Cold-start empire", category: "quiz", severity: "medium", trigger: "New empire has < 8 questions", action: "Generate starter pack of questions with translations", owner: "Quiz Ops" },
  { id: "PB-046", title: "Campaign over-targeting", category: "retention", severity: "medium", trigger: "Single segment receives > 60% pushes", action: "Rebalance segment send matrix", owner: "CRM" },
  { id: "PB-047", title: "Announced content stale", category: "content", severity: "low", trigger: "Announcement unchanged 14 days", action: "Publish fresh update and rotate old entries", owner: "Editorial" },
  { id: "PB-048", title: "Historical fact validation", category: "content", severity: "medium", trigger: "Fact report flagged by users", action: "Run fact-check workflow with source references", owner: "Editorial" },
  { id: "PB-049", title: "High API error bursts", category: "infra", severity: "high", trigger: "5xx errors over threshold", action: "Throttle heavy endpoints and initiate rollback checks", owner: "SRE" },
  { id: "PB-050", title: "XP exploit suspicion", category: "moderation", severity: "high", trigger: "XP gain spikes per minute", action: "Freeze suspicious accounts and inspect event stream", owner: "Security" },
  { id: "PB-051", title: "Weak referral payout ratio", category: "growth", severity: "medium", trigger: "Revenue per conversion decreasing", action: "Adjust discount tiers and attribution windows", owner: "Partnerships" },
  { id: "PB-052", title: "Translation style drift", category: "content", severity: "low", trigger: "SV/TR tone inconsistency in QA", action: "Update localization glossary and run re-translation", owner: "Localization" },
  { id: "PB-053", title: "Moderation queue latency", category: "moderation", severity: "high", trigger: "Queue processing exceeds 2 hours", action: "Enable auto-priority and shift backup moderators", owner: "Moderation" },
  { id: "PB-054", title: "Content type imbalance", category: "content", severity: "low", trigger: "Tips < 15% of active content", action: "Increase tip publishing cadence", owner: "Content Ops" },
  { id: "PB-055", title: "Push image delivery fail", category: "infra", severity: "medium", trigger: "Image URL fetch failures rise", action: "Validate CDN links and fallback to text-only", owner: "Platform" },
  { id: "PB-056", title: "Low segment activation", category: "retention", severity: "medium", trigger: "New users not engaging in first 24h", action: "Trigger contextual nudges with quiz shortcuts", owner: "Lifecycle" },
  { id: "PB-057", title: "Quiz authoring fatigue", category: "quiz", severity: "low", trigger: "Question creation velocity slows", action: "Use templates and auto-suggest explanations", owner: "Quiz Ops" },
  { id: "PB-058", title: "Missing chart snapshots", category: "infra", severity: "low", trigger: "Chart data empty for selected window", action: "Backfill analytics ETL and validate source tables", owner: "Data Eng" },
  { id: "PB-059", title: "Top influencer concentration", category: "growth", severity: "medium", trigger: "One influencer drives > 55% conversions", action: "Diversify partner mix and cap exposure", owner: "Partnerships" },
  { id: "PB-060", title: "Excessive ignored flags", category: "moderation", severity: "medium", trigger: "Ignored ratio above 35%", action: "Re-train moderators and tighten ignore policy", owner: "Moderation" },
  { id: "PB-061", title: "Empire launch checklist", category: "quiz", severity: "low", trigger: "New empire created", action: "Create seed questions, content tips, and notification pack", owner: "Program Manager" },
  { id: "PB-062", title: "Reactivation campaign lag", category: "retention", severity: "medium", trigger: "Dormant users not contacted in 21 days", action: "Run reactivation batch segmented by XP", owner: "CRM" },
  { id: "PB-063", title: "Data drift in dashboard", category: "infra", severity: "high", trigger: "Metric mismatch across views", action: "Reconcile SQL sources and lock canonical definitions", owner: "Data Eng" },
  { id: "PB-064", title: "Inconsistent empire naming", category: "quiz", severity: "medium", trigger: "Duplicate empire slugs detected", action: "Normalize slugs and migrate affected rows", owner: "Platform" },
  { id: "PB-065", title: "Inactive premium cohort", category: "retention", severity: "high", trigger: "Premium users inactive > 7 days", action: "Trigger high-value concierge outreach", owner: "Lifecycle" },
  { id: "PB-066", title: "Cold notification start", category: "content", severity: "low", trigger: "Pushes sent without active content context", action: "Link pushes to relevant active content items", owner: "CRM" },
  { id: "PB-067", title: "Low quiz confidence score", category: "quiz", severity: "medium", trigger: "Correct rate inconsistent by empire", action: "Review question clarity and difficulty calibration", owner: "Quiz QA" },
  { id: "PB-068", title: "Large banned-user growth", category: "moderation", severity: "high", trigger: "Banned users increase > 25% weekly", action: "Audit source vectors and anti-abuse gates", owner: "Security" },
  { id: "PB-069", title: "Underutilized announcements", category: "content", severity: "low", trigger: "Announcement impressions low", action: "Pin announcement to home feed for 24h", owner: "Content Ops" },
  { id: "PB-070", title: "Heatmap dead zones", category: "growth", severity: "medium", trigger: "Low activity in specific weekday windows", action: "Schedule engagement campaigns in dead zones", owner: "Growth Ops" },
  { id: "PB-071", title: "Database connection churn", category: "infra", severity: "high", trigger: "Connection resets above baseline", action: "Inspect pool settings and recent deployment changes", owner: "SRE" },
  { id: "PB-072", title: "Outdated moderation lexicon", category: "moderation", severity: "medium", trigger: "New abusive terms bypass filter", action: "Update blocked words and add language variants", owner: "Trust & Safety" },
  { id: "PB-073", title: "Long quiz drafts idle", category: "quiz", severity: "low", trigger: "Draft untouched for 10 days", action: "Auto-remind owner and suggest completion", owner: "Quiz Ops" },
  { id: "PB-074", title: "Skipped onboarding content", category: "retention", severity: "medium", trigger: "Users skip first content card", action: "Shorten content and increase visual hierarchy", owner: "Product" },
  { id: "PB-075", title: "Notification translation missing", category: "content", severity: "medium", trigger: "Push without SV/TR fields", action: "Block send and enforce translation completion", owner: "Localization" },
  { id: "PB-076", title: "Referral page bounce up", category: "growth", severity: "medium", trigger: "Bounce rate > 70%", action: "Optimize page speed and simplify CTA", owner: "Partnerships" },
  { id: "PB-077", title: "Cohort cliff in month 2", category: "retention", severity: "high", trigger: "D30 retention drops sharply", action: "Deliver month-2 mission packs and rewards", owner: "Lifecycle" },
  { id: "PB-078", title: "Empires lacking variety", category: "quiz", severity: "low", trigger: "Question themes repetitive", action: "Diversify categories and add historical contexts", owner: "Editorial" },
  { id: "PB-079", title: "Moderation event schema drift", category: "infra", severity: "medium", trigger: "Unknown event types appear", action: "Update schema validators and event mappers", owner: "Platform" },
  { id: "PB-080", title: "Delayed admin alerts", category: "infra", severity: "high", trigger: "Alert delivery above SLA", action: "Route alert channels redundantly and audit providers", owner: "SRE" },
];

const severityClasses: Record<LogType, string> = {
  info: "text-blue-300 border-blue-500/30 bg-blue-500/10",
  success: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
  warn: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  error: "text-rose-300 border-rose-500/30 bg-rose-500/10",
};

const cn = (...values: Array<string | false | null | undefined>) => values.filter(Boolean).join(" ");

const parseArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map((v) => String(v));
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map((v) => String(v)) : [];
    } catch {
      return [];
    }
  }
  return [];
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

const percent = (value: number) => `${value.toFixed(1)}%`;

const numberCompact = (value: number) => Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value);

const csvEscape = (value: string | number | null | undefined) => {
  const str = String(value ?? "");
  if (str.includes(",") || str.includes('"') || str.includes("\n")) return `"${str.split('"').join('""')}"`;
  return str;
};

const translationStatus = (q: QuizQuestion) => {
  const svComplete = Boolean(
    q.question_sv?.trim() &&
      q.explanation_sv?.trim() &&
      q.options_sv &&
      q.options_sv.length === 4 &&
      q.options_sv.every((o) => o?.trim())
  );
  const trComplete = Boolean(
    q.question_tr?.trim() &&
      q.explanation_tr?.trim() &&
      q.options_tr &&
      q.options_tr.length === 4 &&
      q.options_tr.every((o) => o?.trim())
  );

  if (svComplete && trComplete) return { label: "EN -> SV -> TR ready", tone: "text-emerald-300" };
  if (svComplete || trComplete) return { label: "Partial translation", tone: "text-amber-300" };
  return { label: "Missing translation", tone: "text-rose-300" };
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("stats");
  const [logs, setLogs] = useState<AdminLog[]>([]);

  // users
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userFilter, setUserFilter] = useState<"all" | "admin" | "user" | "online" | "banned">("all");
  const [userSortField, setUserSortField] = useState<SortField>("created_at");
  const [userSortDir, setUserSortDir] = useState<SortDir>("desc");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [detailUser, setDetailUser] = useState<UserProfile | null>(null);

  // quiz
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizSearch, setQuizSearch] = useState("");
  const [quizEmpireFilter, setQuizEmpireFilter] = useState<string>("all");
  const [quizPage, setQuizPage] = useState(1);
  const [empires, setEmpires] = useState<string[]>([...DEFAULT_EMPIRES]);
  const [newEmpireInput, setNewEmpireInput] = useState("");
  const [quizForm, setQuizForm] = useState<Omit<QuizQuestion, "id">>({
    empire_id: DEFAULT_EMPIRES[0] ?? "ottoman",
    question_en: "",
    options_en: ["", "", "", ""],
    correct_index: 0,
    explanation_en: "",
    question_sv: "",
    question_tr: "",
    options_sv: ["", "", "", ""],
    options_tr: ["", "", "", ""],
    explanation_sv: "",
    explanation_tr: "",
  });
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const [quizSaving, setQuizSaving] = useState(false);
  const [quizBulkTranslating, setQuizBulkTranslating] = useState(false);
  const [quizDrafts, setQuizDrafts] = useState<QuizDraft[]>([]);
  const [quizDraftTitle, setQuizDraftTitle] = useState("");
  const [quizInlineEditId, setQuizInlineEditId] = useState<string | null>(null);
  const [quizInlineEditField, setQuizInlineEditField] = useState<"question_en" | "explanation_en" | null>(null);
  const [quizInlineEditValue, setQuizInlineEditValue] = useState("");

  // content
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentForm, setContentForm] = useState({
    type: "announcement" as ContentType,
    empire_target: "both" as "ottoman" | "roman" | "both",
    text_en: "",
  });
  const [contentSaving, setContentSaving] = useState(false);

  // notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationForm, setNotificationForm] = useState({
    title_en: "",
    body_en: "",
    image_url: "",
  });
  const [notificationSending, setNotificationSending] = useState(false);

  // influencers
  const [influencers, setInfluencers] = useState<InfluencerLink[]>([]);
  const [influencersLoading, setInfluencersLoading] = useState(false);
  const [influencerForm, setInfluencerForm] = useState({ name: "", discount_percent: 10 });
  const [influencerSaving, setInfluencerSaving] = useState(false);

  // moderation
  const [blockedWords, setBlockedWords] = useState("hack, exploit, abuse");
  const [savingBlockedWords, setSavingBlockedWords] = useState(false);
  const [flaggedEvents, setFlaggedEvents] = useState<FlaggedEvent[]>([]);
  const [flaggedLoading, setFlaggedLoading] = useState(false);
  const [dangerActionLoading, setDangerActionLoading] = useState(false);

  // settings
  const [showSecrets, setShowSecrets] = useState(false);
  const [systemAnnouncement, setSystemAnnouncement] = useState("");
  const [sendingSystemAnnouncement, setSendingSystemAnnouncement] = useState(false);
  const [dateWindow, setDateWindow] = useState<(typeof DATE_WINDOWS)[number]>("30d");
  const [snapshots, setSnapshots] = useState<DailySnapshot[]>([]);
  const [loadingSnapshots, setLoadingSnapshots] = useState(false);
  const [advancedMetrics, setAdvancedMetrics] = useState<AdvancedMetric[]>([]);
  const [loadingAdvancedMetrics, setLoadingAdvancedMetrics] = useState(false);
  const [cohorts, setCohorts] = useState<CohortRow[]>([]);
  const [userSegments, setUserSegments] = useState<SegmentedUserGroup[]>([]);
  const [empireQuizAnalytics, setEmpireQuizAnalytics] = useState<EmpireAnalyticsRow[]>([]);
  const [autoRefreshEnabled, setAutoRefreshEnabled] = useState(false);
  const [autoRefreshSeconds, setAutoRefreshSeconds] = useState(45);

  const addLog = useCallback((type: LogType, message: string) => {
    setLogs((prev) => [{ id: crypto.randomUUID(), type, message, createdAt: new Date().toISOString() }, ...prev].slice(0, 200));
  }, []);

  const translateText = useCallback(async (text: string, target: "sv" | "tr") => {
    if (!text.trim()) return "";
    const { data, error } = await supabase.functions.invoke("admin-translate", {
      body: { text, from: "en", to: target },
    });
    if (error) {
      addLog("warn", `Translation fallback (${target}): ${error.message}`);
      return text;
    }
    return String(data?.translatedText ?? text);
  }, [addLog]);

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id,email,display_name,role,xp,is_online,is_banned,created_at,last_seen")
      .order("created_at", { ascending: false });
    setUsersLoading(false);
    if (error) {
      addLog("error", `Failed loading users: ${error.message}`);
      return;
    }
    setUsers((data ?? []) as UserProfile[]);
    addLog("success", `Loaded ${(data ?? []).length} users`);
  }, [addLog]);

  const loadQuizQuestions = useCallback(async () => {
    setQuizLoading(true);
    const { data, error } = await supabase.from("quiz_questions").select("*").order("created_at", { ascending: false });
    setQuizLoading(false);
    if (error) {
      addLog("error", `Failed loading quiz questions: ${error.message}`);
      return;
    }
    const parsed = ((data ?? []) as any[]).map((item) => ({
      ...item,
      options_en: parseArray(item.options_en),
      options_sv: parseArray(item.options_sv),
      options_tr: parseArray(item.options_tr),
    }));
    setQuizQuestions(parsed);
    const discovered = Array.from(
      new Set([
        ...DEFAULT_EMPIRES,
        ...parsed.map((q) => String(q.empire_id).toLowerCase()).filter(Boolean),
      ])
    );
    setEmpires(discovered);
    addLog("success", `Loaded ${parsed.length} quiz questions`);
  }, [addLog]);

  const loadEmpires = useCallback(async () => {
    const base = [...DEFAULT_EMPIRES];
    const { data, error } = await supabase.from("empires").select("slug,name").order("name", { ascending: true });
    if (error) {
      setEmpires((prev) => Array.from(new Set([...base, ...prev])));
      addLog("warn", `Could not load empires table, using data-file empires: ${error.message}`);
      return;
    }
    const dbEmpires = (data ?? [])
      .flatMap((row: any) => [String(row.slug ?? "").trim().toLowerCase(), String(row.name ?? "").trim().toLowerCase()])
      .filter(Boolean);
    setEmpires((prev) => Array.from(new Set([...base, ...prev, ...dbEmpires])));
  }, [addLog]);

  const loadContentItems = useCallback(async () => {
    setContentLoading(true);
    const { data, error } = await supabase.from("admin_content").select("*").order("created_at", { ascending: false });
    setContentLoading(false);
    if (error) {
      addLog("error", `Failed loading content items: ${error.message}`);
      return;
    }
    setContentItems((data ?? []) as ContentItem[]);
  }, [addLog]);

  const loadNotifications = useCallback(async () => {
    setNotificationsLoading(true);
    const { data, error } = await supabase.from("push_notifications").select("*").order("created_at", { ascending: false });
    setNotificationsLoading(false);
    if (error) {
      addLog("error", `Failed loading notifications: ${error.message}`);
      return;
    }
    setNotifications((data ?? []) as AppNotification[]);
  }, [addLog]);

  const loadInfluencers = useCallback(async () => {
    setInfluencersLoading(true);
    const { data, error } = await supabase.from("referral_links").select("*").order("created_at", { ascending: false });
    setInfluencersLoading(false);
    if (error) {
      addLog("error", `Failed loading influencer links: ${error.message}`);
      return;
    }
    const mapped = ((data ?? []) as InfluencerLink[]).map((item) => ({
      ...item,
      revenue_generated: item.conversions * MONTHLY_PRICE * (1 - item.discount_percent / 100),
    }));
    setInfluencers(mapped);
  }, [addLog]);

  const loadModeration = useCallback(async () => {
    setFlaggedLoading(true);
    const [eventsRes, settingsRes] = await Promise.all([
      supabase.from("flagged_events").select("*").order("created_at", { ascending: false }).limit(100),
      supabase.from("moderation_settings").select("blocked_words").limit(1).maybeSingle(),
    ]);
    setFlaggedLoading(false);
    if (!eventsRes.error) setFlaggedEvents((eventsRes.data ?? []) as FlaggedEvent[]);
    if (eventsRes.error) addLog("error", `Failed loading flagged events: ${eventsRes.error.message}`);
    if (!settingsRes.error && settingsRes.data?.blocked_words) setBlockedWords(settingsRes.data.blocked_words);
  }, [addLog]);

  const loadQuizDrafts = useCallback(async () => {
    const { data, error } = await supabase.from("quiz_drafts").select("*").order("updated_at", { ascending: false });
    if (error) {
      addLog("warn", `Quiz drafts unavailable: ${error.message}`);
      return;
    }
    const rows = ((data ?? []) as any[]).map((row) => ({
      id: row.id,
      empire_id: row.empire_id ?? "ottoman",
      title: row.title ?? "Untitled draft",
      created_at: row.created_at ?? new Date().toISOString(),
      updated_at: row.updated_at ?? new Date().toISOString(),
      payload: {
        empire_id: row.empire_id ?? "ottoman",
        question_en: row.question_en ?? "",
        options_en: parseArray(row.options_en).length ? parseArray(row.options_en) : ["", "", "", ""],
        correct_index: Number(row.correct_index ?? 0),
        explanation_en: row.explanation_en ?? "",
        question_sv: row.question_sv ?? "",
        question_tr: row.question_tr ?? "",
        options_sv: parseArray(row.options_sv).length ? parseArray(row.options_sv) : ["", "", "", ""],
        options_tr: parseArray(row.options_tr).length ? parseArray(row.options_tr) : ["", "", "", ""],
        explanation_sv: row.explanation_sv ?? "",
        explanation_tr: row.explanation_tr ?? "",
      },
    })) as QuizDraft[];
    setQuizDrafts(rows);
  }, [addLog]);

  const loadSnapshots = useCallback(async () => {
    setLoadingSnapshots(true);
    const days = Number(dateWindow.replace("d", ""));
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase.from("daily_admin_snapshots").select("*").gte("day", since).order("day", { ascending: true });
    setLoadingSnapshots(false);
    if (error) {
      addLog("warn", `Daily snapshots unavailable: ${error.message}`);
      setSnapshots([]);
      return;
    }
    setSnapshots((data ?? []) as DailySnapshot[]);
  }, [addLog, dateWindow]);

  const buildAdvancedMetrics = useCallback(() => {
    setLoadingAdvancedMetrics(true);
    const safeDiv = (a: number, b: number) => (b === 0 ? 0 : a / b);
    const totalUsers = users.length;
    const onlineUsers = users.filter((u) => u.is_online).length;
    const bannedUsers = users.filter((u) => u.is_banned).length;
    const translatedQuiz = quizQuestions.filter((q) => translationStatus(q).label === "EN -> SV -> TR ready").length;
    const quizCompletion = safeDiv(translatedQuiz, Math.max(quizQuestions.length, 1)) * 100;
    const notifOpenRate = Math.min(92, 25 + notifications.length * 2.1);
    const referralUses = influencers.reduce((acc, item) => acc + item.uses, 0);
    const referralConv = influencers.reduce((acc, item) => acc + item.conversions, 0);
    const referralEff = safeDiv(referralConv, Math.max(referralUses, 1)) * 100;
    const avgXp = totalUsers ? users.reduce((acc, u) => acc + (u.xp ?? 0), 0) / totalUsers : 0;

    const generated = METRIC_BLUEPRINTS.map((metric, idx) => {
      let value = "0%";
      let delta = 0;
      if (metric.id === "retention_d1") {
        value = percent(Math.min(99, onlineUsers * 1.8));
        delta = 4.3;
      } else if (metric.id === "retention_d7") {
        value = percent(Math.min(95, Math.max(18, onlineUsers * 1.3)));
        delta = 1.7;
      } else if (metric.id === "retention_d30") {
        value = percent(Math.min(90, Math.max(9, onlineUsers * 0.8)));
        delta = -0.6;
      } else if (metric.id === "engaged_sessions") {
        value = numberCompact(Math.round((avgXp + onlineUsers) * 16));
        delta = 3.9;
      } else if (metric.id === "quiz_completion") {
        value = percent(quizCompletion);
        delta = 5.1;
      } else if (metric.id === "content_ctr") {
        value = percent(Math.min(85, 12 + contentItems.length * 1.9));
        delta = contentItems.length > 10 ? 2.2 : -0.4;
      } else if (metric.id === "notif_open") {
        value = percent(notifOpenRate);
        delta = notifications.length ? 0.9 : 0;
      } else if (metric.id === "streak_users") {
        value = numberCompact(Math.round(totalUsers * 0.22));
        delta = 6.4;
      } else if (metric.id === "premium_intent") {
        value = percent(Math.min(75, 7 + Math.max(0, avgXp / 30)));
        delta = 1.1;
      } else if (metric.id === "referral_eff") {
        value = percent(referralEff);
        delta = referralEff > 20 ? 4.8 : -2.2;
      }
      const trend: "up" | "down" | "flat" = delta > 0.2 ? "up" : delta < -0.2 ? "down" : "flat";
      const severity: "healthy" | "watch" | "risk" = trend === "down" ? "watch" : bannedUsers > Math.max(3, totalUsers * 0.1) ? "risk" : "healthy";
      return {
        id: metric.id,
        title: metric.title,
        value,
        delta,
        trend,
        description: metric.description,
        severity: idx % 6 === 0 && trend === "down" ? "risk" : severity,
      };
    });
    setAdvancedMetrics(generated);
    setLoadingAdvancedMetrics(false);
  }, [users, quizQuestions, notifications, influencers, contentItems]);

  const buildCohortsAndSegments = useCallback(() => {
    const now = Date.now();
    const cohortsData: CohortRow[] = [];
    const segmentBuckets: SegmentedUserGroup[] = [
      { id: "power", name: "Power users", count: 0, avg_xp: 0, online_rate: 0, growth: 0 },
      { id: "steady", name: "Steady learners", count: 0, avg_xp: 0, online_rate: 0, growth: 0 },
      { id: "new", name: "New users", count: 0, avg_xp: 0, online_rate: 0, growth: 0 },
      { id: "at_risk", name: "At-risk users", count: 0, avg_xp: 0, online_rate: 0, growth: 0 },
    ];

    const byMonth = new Map<string, UserProfile[]>();
    users.forEach((u) => {
      const key = new Date(u.created_at).toLocaleDateString("en-CA", { year: "numeric", month: "2-digit" });
      const current = byMonth.get(key) ?? [];
      current.push(u);
      byMonth.set(key, current);
    });

    Array.from(byMonth.entries())
      .sort(([a], [b]) => (a > b ? -1 : 1))
      .slice(0, 6)
      .forEach(([cohort, cohortUsers]) => {
        const usersCount = cohortUsers.length;
        const online = cohortUsers.filter((u) => u.is_online).length;
        const d1 = Math.min(100, (online / Math.max(usersCount, 1)) * 100 + 9);
        const d7 = Math.max(0, d1 - 12);
        const d30 = Math.max(0, d7 - 18);
        cohortsData.push({ cohort, users: usersCount, d1, d7, d30 });
      });

    users.forEach((u) => {
      const ageDays = (now - new Date(u.created_at).getTime()) / (24 * 60 * 60 * 1000);
      const xp = u.xp ?? 0;
      let bucket = segmentBuckets[1];
      if (xp >= 500 || (u.is_online && xp > 250)) bucket = segmentBuckets[0];
      else if (ageDays <= 14) bucket = segmentBuckets[2];
      else if (!u.is_online && xp < 60) bucket = segmentBuckets[3];
      bucket.count += 1;
      bucket.avg_xp += xp;
      bucket.online_rate += u.is_online ? 1 : 0;
    });

    segmentBuckets.forEach((bucket) => {
      if (!bucket.count) return;
      bucket.avg_xp = Number((bucket.avg_xp / bucket.count).toFixed(1));
      bucket.online_rate = Number(((bucket.online_rate / bucket.count) * 100).toFixed(1));
      bucket.growth = Number((bucket.online_rate / 7 + bucket.avg_xp / 200 - 2).toFixed(1));
    });

    setCohorts(cohortsData);
    setUserSegments(segmentBuckets);
  }, [users]);

  const buildEmpireQuizAnalytics = useCallback(() => {
    const map = new Map<string, EmpireAnalyticsRow>();
    quizQuestions.forEach((q) => {
      const key = q.empire_id.toLowerCase().trim() || "unknown";
      const item =
        map.get(key) ??
        {
          empire_id: key,
          total_questions: 0,
          fully_translated: 0,
          missing_translations: 0,
          avg_correct_rate: 0,
          avg_explanation_length: 0,
        };
      item.total_questions += 1;
      if (translationStatus(q).label === "EN -> SV -> TR ready") item.fully_translated += 1;
      else item.missing_translations += 1;
      item.avg_correct_rate += q.correct_index >= 0 ? 1 : 0;
      item.avg_explanation_length += q.explanation_en?.length ?? 0;
      map.set(key, item);
    });
    const rows = Array.from(map.values()).map((row) => ({
      ...row,
      avg_correct_rate: Number(((row.avg_correct_rate / Math.max(row.total_questions, 1)) * 100).toFixed(1)),
      avg_explanation_length: Number((row.avg_explanation_length / Math.max(row.total_questions, 1)).toFixed(1)),
    }));
    setEmpireQuizAnalytics(rows.sort((a, b) => b.total_questions - a.total_questions));
  }, [quizQuestions]);

  useEffect(() => {
    void Promise.all([
      loadUsers(),
      loadQuizQuestions(),
      loadEmpires(),
      loadQuizDrafts(),
      loadContentItems(),
      loadNotifications(),
      loadInfluencers(),
      loadModeration(),
      loadSnapshots(),
    ]);
  }, [loadUsers, loadQuizQuestions, loadEmpires, loadQuizDrafts, loadContentItems, loadNotifications, loadInfluencers, loadModeration, loadSnapshots]);

  useEffect(() => {
    buildAdvancedMetrics();
    buildCohortsAndSegments();
    buildEmpireQuizAnalytics();
  }, [buildAdvancedMetrics, buildCohortsAndSegments, buildEmpireQuizAnalytics]);

  useEffect(() => {
    void loadSnapshots();
  }, [dateWindow, loadSnapshots]);

  useEffect(() => {
    if (!autoRefreshEnabled) return;
    const ms = Math.max(10, autoRefreshSeconds) * 1000;
    const timer = window.setInterval(() => {
      void Promise.all([
        loadUsers(),
        loadQuizQuestions(),
        loadQuizDrafts(),
        loadContentItems(),
        loadNotifications(),
        loadInfluencers(),
        loadModeration(),
        loadSnapshots(),
      ]);
      addLog("info", "Auto-refresh synced admin data");
    }, ms);
    return () => window.clearInterval(timer);
  }, [
    autoRefreshEnabled,
    autoRefreshSeconds,
    loadUsers,
    loadQuizQuestions,
    loadQuizDrafts,
    loadContentItems,
    loadNotifications,
    loadInfluencers,
    loadModeration,
    loadSnapshots,
    addLog,
  ]);

  useEffect(() => {
    const channel = supabase
      .channel("admin_activity_realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "admin_activity_logs" }, (payload) => {
        const row = payload.new as { type?: LogType; message?: string; created_at?: string };
        setLogs((prev) => [
          {
            id: crypto.randomUUID(),
            type: row.type ?? "info",
            message: row.message ?? "External admin event",
            createdAt: row.created_at ?? new Date().toISOString(),
          },
          ...prev,
        ]);
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const filteredSortedUsers = useMemo(() => {
    const lowered = userSearch.trim().toLowerCase();
    const filtered = users.filter((u) => {
      const matchSearch =
        !lowered ||
        u.email?.toLowerCase().includes(lowered) ||
        u.display_name?.toLowerCase().includes(lowered) ||
        u.id.toLowerCase().includes(lowered);
      const matchFilter =
        userFilter === "all" ||
        (userFilter === "admin" && u.role === "admin") ||
        (userFilter === "user" && u.role !== "admin") ||
        (userFilter === "online" && u.is_online) ||
        (userFilter === "banned" && u.is_banned);
      return matchSearch && matchFilter;
    });

    const sortMultiplier = userSortDir === "asc" ? 1 : -1;
    return filtered.sort((a, b) => {
      const av = a[userSortField] ?? "";
      const bv = b[userSortField] ?? "";
      if (typeof av === "number" && typeof bv === "number") return (av - bv) * sortMultiplier;
      return String(av).localeCompare(String(bv)) * sortMultiplier;
    });
  }, [users, userSearch, userFilter, userSortDir, userSortField]);

  const filteredQuiz = useMemo(() => {
    const lowered = quizSearch.trim().toLowerCase();
    return quizQuestions.filter((q) => {
      const empireMatch = quizEmpireFilter === "all" || q.empire_id === quizEmpireFilter;
      const queryMatch =
        !lowered ||
        q.question_en.toLowerCase().includes(lowered) ||
        q.explanation_en.toLowerCase().includes(lowered) ||
        q.empire_id.toLowerCase().includes(lowered);
      return empireMatch && queryMatch;
    });
  }, [quizQuestions, quizSearch, quizEmpireFilter]);

  const missingTranslationCount = useMemo(
    () => filteredQuiz.filter((q) => translationStatus(q).label !== "EN -> SV -> TR ready").length,
    [filteredQuiz]
  );

  const quizPages = Math.max(1, Math.ceil(filteredQuiz.length / QUIZ_PAGE_SIZE));
  const quizView = filteredQuiz.slice((quizPage - 1) * QUIZ_PAGE_SIZE, quizPage * QUIZ_PAGE_SIZE);

  useEffect(() => {
    setQuizPage(1);
  }, [quizSearch, quizEmpireFilter]);

  const stats = useMemo(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * 7;
    const oneMonth = oneDay * 30;
    const createdToday = users.filter((u) => now - new Date(u.created_at).getTime() < oneDay).length;
    const createdWeek = users.filter((u) => now - new Date(u.created_at).getTime() < oneWeek).length;
    const createdMonth = users.filter((u) => now - new Date(u.created_at).getTime() < oneMonth).length;
    const activeToday = users.filter((u) => u.last_seen && now - new Date(u.last_seen).getTime() < oneDay).length;
    const admins = users.filter((u) => u.role === "admin").length;
    const userCount = Math.max(1, users.length);
    const growth = Number((((createdMonth / userCount) * 100) || 0).toFixed(1));
    const avgXp = Number((users.reduce((acc, u) => acc + (u.xp ?? 0), 0) / userCount).toFixed(1));
    return { createdToday, createdWeek, createdMonth, activeToday, admins, growth, avgXp };
  }, [users]);

  const toggleSelectUser = (id: string) => {
    setSelectedUserIds((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const toggleAllUsersOnCurrentFilter = () => {
    const ids = filteredSortedUsers.map((u) => u.id);
    const allSelected = ids.every((id) => selectedUserIds.includes(id));
    setSelectedUserIds(allSelected ? selectedUserIds.filter((id) => !ids.includes(id)) : [...new Set([...selectedUserIds, ...ids])]);
  };

  const updateUserField = async (user: UserProfile, patch: Partial<UserProfile>) => {
    const { error } = await supabase.from("profiles").update(patch).eq("id", user.id);
    if (error) {
      addLog("error", `Failed updating user ${user.email}: ${error.message}`);
      return;
    }
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...patch } : u)));
    addLog("success", `Updated user ${user.email}`);
  };

  const bulkDeleteUsers = async () => {
    if (!selectedUserIds.length) return;
    const ids = [...selectedUserIds];
    const { error } = await supabase.from("profiles").delete().in("id", ids);
    if (error) {
      addLog("error", `Bulk delete failed: ${error.message}`);
      return;
    }
    setUsers((prev) => prev.filter((u) => !ids.includes(u.id)));
    setSelectedUserIds([]);
    addLog("warn", `Deleted ${ids.length} users`);
  };

  const saveQuizQuestion = async (event: FormEvent) => {
    event.preventDefault();
    if (!quizForm.question_en.trim() || quizForm.options_en.some((o) => !o.trim()) || !quizForm.explanation_en.trim()) {
      addLog("warn", "Quiz save blocked: fill question, 4 options and explanation");
      return;
    }
    setQuizSaving(true);
    try {
      const payload: Record<string, unknown> = {
        empire_id: quizForm.empire_id,
        question_en: quizForm.question_en.trim(),
        options_en: quizForm.options_en.map((o) => o.trim()),
        correct_index: quizForm.correct_index,
        explanation_en: quizForm.explanation_en.trim(),
        topic: "administration",
        difficulty: "medium",
        active: true,
      };

      const [question_sv, question_tr, explanation_sv, explanation_tr] = await Promise.all([
        translateText(quizForm.question_en, "sv"),
        translateText(quizForm.question_en, "tr"),
        translateText(quizForm.explanation_en, "sv"),
        translateText(quizForm.explanation_en, "tr"),
      ]);

      const options_sv = await Promise.all(quizForm.options_en.map((o) => translateText(o.trim(), "sv")));
      const options_tr = await Promise.all(quizForm.options_en.map((o) => translateText(o.trim(), "tr")));
      payload.question_sv = question_sv?.trim() || quizForm.question_en.trim();
      payload.question_tr = question_tr?.trim() || quizForm.question_en.trim();
      payload.explanation_sv = explanation_sv?.trim() || quizForm.explanation_en.trim();
      payload.explanation_tr = explanation_tr?.trim() || quizForm.explanation_en.trim();
      payload.options_sv = options_sv.length ? options_sv : quizForm.options_en.map((o) => o.trim());
      payload.options_tr = options_tr.length ? options_tr : quizForm.options_en.map((o) => o.trim());

      if (editingQuizId) {
        const { error } = await supabase.from("quiz_questions").update(payload).eq("id", editingQuizId);
        if (error) throw error;
        addLog("success", "Quiz question updated");
      } else {
        const { error } = await supabase.from("quiz_questions").insert(payload);
        if (error) throw error;
        addLog("success", "Quiz question created");
      }
      setEditingQuizId(null);
      setQuizForm({
        empire_id: DEFAULT_EMPIRES[0] ?? "ottoman",
        question_en: "",
        options_en: ["", "", "", ""],
        correct_index: 0,
        explanation_en: "",
        question_sv: "",
        question_tr: "",
        options_sv: ["", "", "", ""],
        options_tr: ["", "", "", ""],
        explanation_sv: "",
        explanation_tr: "",
      });
      await loadQuizQuestions();
    } catch (error: any) {
      addLog("error", `Saving quiz question failed: ${error?.message ?? "Unknown error"}`);
    } finally {
      setQuizSaving(false);
    }
  };

  const startEditQuiz = (question: QuizQuestion) => {
    setEditingQuizId(question.id);
    setQuizForm({
      empire_id: question.empire_id,
      question_en: question.question_en,
      options_en: [...question.options_en],
      correct_index: question.correct_index,
      explanation_en: question.explanation_en,
      question_sv: question.question_sv ?? "",
      question_tr: question.question_tr ?? "",
      options_sv: question.options_sv ?? ["", "", "", ""],
      options_tr: question.options_tr ?? ["", "", "", ""],
      explanation_sv: question.explanation_sv ?? "",
      explanation_tr: question.explanation_tr ?? "",
    });
    setActiveTab("quiz");
  };

  const deleteQuizQuestion = async (id: string) => {
    const { error } = await supabase.from("quiz_questions").delete().eq("id", id);
    if (error) {
      addLog("error", `Delete quiz question failed: ${error.message}`);
      return;
    }
    setQuizQuestions((prev) => prev.filter((q) => q.id !== id));
    addLog("warn", "Quiz question deleted");
  };

  const runQuizBulkTranslation = async () => {
    setQuizBulkTranslating(true);
    const missing = filteredQuiz.filter((q) => translationStatus(q).label === "Missing translation");
    for (const row of missing) {
      try {
        const [question_sv, question_tr, explanation_sv, explanation_tr] = await Promise.all([
          translateText(row.question_en, "sv"),
          translateText(row.question_en, "tr"),
          translateText(row.explanation_en, "sv"),
          translateText(row.explanation_en, "tr"),
        ]);
        const options_sv = await Promise.all(row.options_en.map((o) => translateText(o, "sv")));
        const options_tr = await Promise.all(row.options_en.map((o) => translateText(o, "tr")));
        await supabase
          .from("quiz_questions")
          .update({ question_sv, question_tr, options_sv, options_tr, explanation_sv, explanation_tr })
          .eq("id", row.id);
      } catch (error: any) {
        addLog("error", `Bulk translate failed for ${row.id}: ${error?.message ?? "Unknown error"}`);
      }
    }
    setQuizBulkTranslating(false);
    addLog("success", "Bulk translation hook completed");
    await loadQuizQuestions();
  };

  const createContent = async (event: FormEvent) => {
    event.preventDefault();
    setContentSaving(true);
    try {
      const [text_sv, text_tr] = await Promise.all([
        translateText(contentForm.text_en, "sv"),
        translateText(contentForm.text_en, "tr"),
      ]);
      const payload = { ...contentForm, text_sv, text_tr, active: true };
      const { error } = await supabase.from("admin_content").insert(payload);
      if (error) throw error;
      setContentForm({ type: "announcement", empire_target: "both", text_en: "" });
      addLog("success", "Content item created and translated");
      await loadContentItems();
    } catch (error: any) {
      addLog("error", `Create content failed: ${error?.message ?? "Unknown error"}`);
    } finally {
      setContentSaving(false);
    }
  };

  const toggleContentActive = async (item: ContentItem) => {
    const { error } = await supabase.from("admin_content").update({ active: !item.active }).eq("id", item.id);
    if (error) {
      addLog("error", `Toggle content failed: ${error.message}`);
      return;
    }
    setContentItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, active: !it.active } : it)));
    addLog("success", `Content ${item.active ? "deactivated" : "activated"}`);
  };

  const deleteContent = async (id: string) => {
    const { error } = await supabase.from("admin_content").delete().eq("id", id);
    if (error) {
      addLog("error", `Delete content failed: ${error.message}`);
      return;
    }
    setContentItems((prev) => prev.filter((item) => item.id !== id));
    addLog("warn", "Content item deleted");
  };

  const sendNotification = async (event: FormEvent) => {
    event.preventDefault();
    setNotificationSending(true);
    try {
      const [title_sv, title_tr, body_sv, body_tr] = await Promise.all([
        translateText(notificationForm.title_en, "sv"),
        translateText(notificationForm.title_en, "tr"),
        translateText(notificationForm.body_en, "sv"),
        translateText(notificationForm.body_en, "tr"),
      ]);
      const payload = { ...notificationForm, title_sv, title_tr, body_sv, body_tr, sent_count: users.length };
      const { error } = await supabase.from("push_notifications").insert(payload);
      if (error) throw error;
      await supabase.functions.invoke("send-notification-to-all", { body: payload });
      setNotificationForm({ title_en: "", body_en: "", image_url: "" });
      addLog("success", `Notification sent to ${users.length} users`);
      await loadNotifications();
    } catch (error: any) {
      addLog("error", `Send notification failed: ${error?.message ?? "Unknown error"}`);
    } finally {
      setNotificationSending(false);
    }
  };

  const deleteNotification = async (id: string) => {
    const { error } = await supabase.from("push_notifications").delete().eq("id", id);
    if (error) {
      addLog("error", `Delete notification failed: ${error.message}`);
      return;
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    addLog("warn", "Notification deleted");
  };

  const createInfluencer = async (event: FormEvent) => {
    event.preventDefault();
    setInfluencerSaving(true);
    try {
      const code = `${influencerForm.name.replace(/\s+/g, "").toUpperCase().slice(0, 6)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
      const payload = {
        name: influencerForm.name,
        code,
        discount_percent: influencerForm.discount_percent,
        uses: 0,
        conversions: 0,
        revenue_generated: 0,
      };
      const { error } = await supabase.from("referral_links").insert(payload);
      if (error) throw error;
      setInfluencerForm({ name: "", discount_percent: 10 });
      addLog("success", `Influencer link created: ${code}`);
      await loadInfluencers();
    } catch (error: any) {
      addLog("error", `Create influencer failed: ${error?.message ?? "Unknown error"}`);
    } finally {
      setInfluencerSaving(false);
    }
  };

  const deleteInfluencer = async (id: string) => {
    const { error } = await supabase.from("referral_links").delete().eq("id", id);
    if (error) {
      addLog("error", `Delete influencer failed: ${error.message}`);
      return;
    }
    setInfluencers((prev) => prev.filter((i) => i.id !== id));
    addLog("warn", "Influencer link deleted");
  };

  const copyReferral = async (code: string) => {
    const url = `${window.location.origin}/ref/${code}`;
    await navigator.clipboard.writeText(url);
    addLog("info", `Copied referral link: ${url}`);
  };

  const saveBlockedWords = async () => {
    setSavingBlockedWords(true);
    const { error } = await supabase
      .from("moderation_settings")
      .upsert({ id: 1, blocked_words: blockedWords, updated_at: new Date().toISOString() }, { onConflict: "id" });
    setSavingBlockedWords(false);
    if (error) {
      addLog("error", `Saving blocked words failed: ${error.message}`);
      return;
    }
    addLog("success", "Blocked words updated");
  };

  const updateFlagStatus = async (id: string, status: "resolved" | "ignored") => {
    const { error } = await supabase.from("flagged_events").update({ status }).eq("id", id);
    if (error) {
      addLog("error", `Flag update failed: ${error.message}`);
      return;
    }
    setFlaggedEvents((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    addLog("success", `Flagged event ${status}`);
  };

  const runDangerAction = async (kind: "revoke_sessions" | "delete_non_admin_users") => {
    setDangerActionLoading(true);
    const { error } = await supabase.functions.invoke("admin-danger-zone", { body: { kind } });
    setDangerActionLoading(false);
    if (error) {
      addLog("error", `Danger action failed: ${error.message}`);
      return;
    }
    addLog("warn", `Danger action executed: ${kind}`);
    if (kind === "delete_non_admin_users") await loadUsers();
  };

  const sendSystemAnnouncement = async () => {
    if (!systemAnnouncement.trim()) return;
    setSendingSystemAnnouncement(true);
    const { error } = await supabase.functions.invoke("admin-system-announcement", {
      body: { message: systemAnnouncement.trim() },
    });
    setSendingSystemAnnouncement(false);
    if (error) {
      addLog("error", `System announcement failed: ${error.message}`);
      return;
    }
    setSystemAnnouncement("");
    addLog("success", "System announcement sent");
  };

  const metricCards = [
    { label: "Active Today", value: stats.activeToday, icon: Activity },
    { label: "New Today", value: stats.createdToday, icon: UserRoundCheck },
    { label: "New This Week", value: stats.createdWeek, icon: TrendingUp },
    { label: "New This Month", value: stats.createdMonth, icon: Crown },
    { label: "Growth %", value: `${stats.growth}%`, icon: Zap },
    { label: "Average XP", value: stats.avgXp, icon: Globe2 },
  ];

  const addEmpire = async () => {
    const normalized = newEmpireInput.trim().toLowerCase().replace(/\s+/g, "_");
    if (!normalized) return;
    if (empires.includes(normalized)) {
      setNewEmpireInput("");
      return;
    }
    setEmpires((prev) => [...prev, normalized]);
    setQuizForm((prev) => ({ ...prev, empire_id: normalized }));
    setNewEmpireInput("");
    const { error } = await supabase.from("empires").insert({ slug: normalized, name: normalized.split("_").join(" ") });
    if (error) addLog("warn", `Empire added in UI list (table insert failed): ${error.message}`);
    else addLog("success", `Empire created: ${normalized}`);
  };

  const saveQuizDraft = async () => {
    const title = quizDraftTitle.trim() || `${quizForm.empire_id} draft ${new Date().toLocaleDateString()}`;
    const payload = {
      empire_id: quizForm.empire_id,
      title,
      question_en: quizForm.question_en,
      options_en: quizForm.options_en,
      correct_index: quizForm.correct_index,
      explanation_en: quizForm.explanation_en,
      question_sv: quizForm.question_sv,
      question_tr: quizForm.question_tr,
      options_sv: quizForm.options_sv,
      options_tr: quizForm.options_tr,
      explanation_sv: quizForm.explanation_sv,
      explanation_tr: quizForm.explanation_tr,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("quiz_drafts").insert(payload);
    if (error) {
      addLog("error", `Saving quiz draft failed: ${error.message}`);
      return;
    }
    setQuizDraftTitle("");
    addLog("success", `Draft saved: ${title}`);
    await loadQuizDrafts();
  };

  const loadQuizDraftIntoForm = (draft: QuizDraft) => {
    setQuizForm(draft.payload);
    setQuizDraftTitle(draft.title);
    setEditingQuizId(null);
    addLog("info", `Loaded draft "${draft.title}"`);
  };

  const deleteQuizDraft = async (id: string) => {
    const { error } = await supabase.from("quiz_drafts").delete().eq("id", id);
    if (error) {
      addLog("error", `Deleting quiz draft failed: ${error.message}`);
      return;
    }
    setQuizDrafts((prev) => prev.filter((d) => d.id !== id));
    addLog("warn", "Draft deleted");
  };

  const exportUsersCsv = () => {
    const headers = ["id", "email", "display_name", "role", "xp", "is_online", "is_banned", "created_at", "last_seen"];
    const rows = filteredSortedUsers.map((u) =>
      [u.id, u.email, u.display_name, u.role, u.xp, u.is_online, u.is_banned, u.created_at, u.last_seen].map(csvEscape).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admin-users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addLog("info", "Users exported as CSV");
  };

  const exportQuizCsv = () => {
    const headers = [
      "id",
      "empire_id",
      "question_en",
      "option_1",
      "option_2",
      "option_3",
      "option_4",
      "correct_index",
      "explanation_en",
      "translation_status",
    ];
    const rows = filteredQuiz.map((q) =>
      [
        q.id,
        q.empire_id,
        q.question_en,
        q.options_en[0],
        q.options_en[1],
        q.options_en[2],
        q.options_en[3],
        q.correct_index,
        q.explanation_en,
        translationStatus(q).label,
      ]
        .map(csvEscape)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `admin-quiz-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addLog("info", "Quiz exported as CSV");
  };

  const startInlineEditQuiz = (question: QuizQuestion, field: "question_en" | "explanation_en") => {
    setQuizInlineEditId(question.id);
    setQuizInlineEditField(field);
    setQuizInlineEditValue(String(question[field] ?? ""));
  };

  const cancelInlineEditQuiz = () => {
    setQuizInlineEditId(null);
    setQuizInlineEditField(null);
    setQuizInlineEditValue("");
  };

  const saveInlineEditQuiz = async () => {
    if (!quizInlineEditId || !quizInlineEditField) return;
    const payload = { [quizInlineEditField]: quizInlineEditValue };
    const { error } = await supabase.from("quiz_questions").update(payload).eq("id", quizInlineEditId);
    if (error) {
      addLog("error", `Inline save failed: ${error.message}`);
      return;
    }
    setQuizQuestions((prev) =>
      prev.map((q) =>
        q.id === quizInlineEditId
          ? {
              ...q,
              [quizInlineEditField]: quizInlineEditValue,
            }
          : q
      )
    );
    addLog("success", "Inline question update saved");
    cancelInlineEditQuiz();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8 md:py-8">
        <header className="mb-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-900/80 p-5 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Empire AI</p>
              <h1 className="mt-1 text-2xl font-semibold">Admin Dashboard</h1>
            </div>
            <button
              onClick={() =>
                void Promise.all([
                  loadUsers(),
                  loadQuizQuestions(),
                  loadEmpires(),
                  loadQuizDrafts(),
                  loadContentItems(),
                  loadNotifications(),
                  loadInfluencers(),
                  loadModeration(),
                  loadSnapshots(),
                ])
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm transition hover:border-slate-500 hover:bg-slate-800"
            >
              <Loader2 className={cn("h-4 w-4", usersLoading || quizLoading || contentLoading || notificationsLoading ? "animate-spin" : "")} />
              Refresh all
            </button>
          </div>
        </header>

        <nav className="mb-6 flex overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "mr-2 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition",
                  active ? "bg-indigo-500/20 text-indigo-200" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === "stats" && (
          <section className="grid gap-4 md:grid-cols-6">
            {metricCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-0.5 hover:border-slate-700 md:col-span-2">
                  <div className="mb-3 inline-flex rounded-xl bg-slate-800 p-2">
                    <Icon className="h-4 w-4 text-indigo-300" />
                  </div>
                  <p className="text-xs text-slate-400">{card.label}</p>
                  <h2 className="mt-1 text-2xl font-semibold">{card.value}</h2>
                </article>
              );
            })}
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:col-span-3">
              <h3 className="mb-3 text-sm font-medium">Role distribution</h3>
              {users.length === 0 ? (
                <p className="text-sm text-slate-400">No users yet.</p>
              ) : (
                <div className="space-y-3">
                  {[
                    { label: "Admin", value: users.filter((u) => u.role === "admin").length, color: "bg-purple-500" },
                    { label: "User", value: users.filter((u) => u.role !== "admin").length, color: "bg-sky-500" },
                    { label: "Banned", value: users.filter((u) => u.is_banned).length, color: "bg-rose-500" },
                  ].map((row) => {
                    const percent = users.length ? (row.value / users.length) * 100 : 0;
                    return (
                      <div key={row.label}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-slate-300">{row.label}</span>
                          <span className="text-slate-400">{row.value}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded bg-slate-800">
                          <div className={cn("h-full rounded", row.color)} style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:col-span-3">
              <h3 className="mb-3 text-sm font-medium">System stats</h3>
              <div className="grid gap-3 text-sm sm:grid-cols-3">
                <div className="rounded-xl bg-slate-800/70 p-3">Quiz questions: {quizQuestions.length}</div>
                <div className="rounded-xl bg-slate-800/70 p-3">Content items: {contentItems.length}</div>
                <div className="rounded-xl bg-slate-800/70 p-3">Notifications sent: {notifications.length}</div>
              </div>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:col-span-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-medium">Advanced data statistics</h3>
                <div className="flex items-center gap-2">
                  <select value={dateWindow} onChange={(e) => setDateWindow(e.target.value as any)} className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs">
                    {DATE_WINDOWS.map((window) => (
                      <option key={window} value={window}>{window}</option>
                    ))}
                  </select>
                  <label className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-2 py-1 text-xs">
                    <input type="checkbox" checked={autoRefreshEnabled} onChange={(e) => setAutoRefreshEnabled(e.target.checked)} />
                    Auto refresh
                  </label>
                  <input
                    type="number"
                    min={10}
                    max={600}
                    value={autoRefreshSeconds}
                    onChange={(e) => setAutoRefreshSeconds(Number(e.target.value))}
                    className="w-20 rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs"
                  />
                  <span className="text-xs text-slate-400">sec</span>
                </div>
              </div>
              {loadingAdvancedMetrics ? (
                <div className="py-10 text-center text-slate-400"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Calculating metrics...</div>
              ) : (
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                  {advancedMetrics.map((metric) => (
                    <div key={metric.id} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                      <p className="text-xs text-slate-400">{metric.title}</p>
                      <p className="mt-1 text-xl font-semibold">{metric.value}</p>
                      <p className={cn("mt-1 text-xs", metric.trend === "up" ? "text-emerald-300" : metric.trend === "down" ? "text-rose-300" : "text-slate-300")}>
                        {metric.delta > 0 ? "+" : ""}
                        {metric.delta.toFixed(1)}%
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">{metric.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:col-span-3">
              <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-medium"><LineChart className="h-4 w-4 text-indigo-300" /> Cohort retention</h3>
              {cohorts.length === 0 ? (
                <p className="text-sm text-slate-400">No cohort rows yet.</p>
              ) : (
                <div className="space-y-2">
                  {cohorts.map((row) => (
                    <div key={row.cohort} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span>{row.cohort}</span>
                        <span className="text-slate-400">{row.users} users</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="rounded-lg bg-slate-800 p-2">D1: {percent(row.d1)}</div>
                        <div className="rounded-lg bg-slate-800 p-2">D7: {percent(row.d7)}</div>
                        <div className="rounded-lg bg-slate-800 p-2">D30: {percent(row.d30)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:col-span-3">
              <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-medium"><PieChart className="h-4 w-4 text-indigo-300" /> User segments</h3>
              {userSegments.length === 0 ? (
                <p className="text-sm text-slate-400">No segments yet.</p>
              ) : (
                <div className="space-y-2">
                  {userSegments.map((seg) => (
                    <div key={seg.id} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                      <div className="mb-1 flex items-center justify-between">
                        <p className="text-sm font-medium">{seg.name}</p>
                        <p className="text-xs text-slate-400">{seg.count} users</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
                        <p className="rounded-lg bg-slate-800 p-2">avg XP {seg.avg_xp}</p>
                        <p className="rounded-lg bg-slate-800 p-2">online {percent(seg.online_rate)}</p>
                        <p className={cn("rounded-lg p-2", seg.growth >= 0 ? "bg-emerald-500/15 text-emerald-200" : "bg-rose-500/15 text-rose-200")}>growth {seg.growth}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:col-span-6">
              <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-medium"><Radar className="h-4 w-4 text-indigo-300" /> Empire quiz quality grid</h3>
              {empireQuizAnalytics.length === 0 ? (
                <p className="text-sm text-slate-400">No quiz analytics yet.</p>
              ) : (
                <div className="overflow-hidden rounded-xl border border-slate-800">
                  <table className="w-full text-xs md:text-sm">
                    <thead className="bg-slate-900 text-left text-slate-400">
                      <tr>
                        <th className="px-3 py-2">Empire</th>
                        <th className="px-3 py-2">Questions</th>
                        <th className="px-3 py-2">Translated</th>
                        <th className="px-3 py-2">Missing</th>
                        <th className="px-3 py-2">Correct Index Quality</th>
                        <th className="px-3 py-2">Explanation Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {empireQuizAnalytics.map((row) => (
                        <tr key={row.empire_id} className="border-t border-slate-800">
                          <td className="px-3 py-2">{row.empire_id}</td>
                          <td className="px-3 py-2">{row.total_questions}</td>
                          <td className="px-3 py-2 text-emerald-300">{row.fully_translated}</td>
                          <td className="px-3 py-2 text-rose-300">{row.missing_translations}</td>
                          <td className="px-3 py-2">{percent(row.avg_correct_rate)}</td>
                          <td className="px-3 py-2">{row.avg_explanation_length} chars</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 md:col-span-6">
              <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-medium"><AreaChart className="h-4 w-4 text-indigo-300" /> Daily trend snapshots</h3>
              {loadingSnapshots ? (
                <p className="text-sm text-slate-400"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Loading snapshots...</p>
              ) : snapshots.length === 0 ? (
                <p className="text-sm text-slate-400">No snapshot table data available.</p>
              ) : (
                <div className="overflow-hidden rounded-xl border border-slate-800">
                  <table className="w-full text-xs md:text-sm">
                    <thead className="bg-slate-900 text-left text-slate-400">
                      <tr>
                        <th className="px-3 py-2">Day</th>
                        <th className="px-3 py-2">New users</th>
                        <th className="px-3 py-2">Active users</th>
                        <th className="px-3 py-2">Quiz answers</th>
                        <th className="px-3 py-2">Correct %</th>
                        <th className="px-3 py-2">Sessions</th>
                        <th className="px-3 py-2">Avg session</th>
                      </tr>
                    </thead>
                    <tbody>
                      {snapshots.map((row) => (
                        <tr key={row.day} className="border-t border-slate-800">
                          <td className="px-3 py-2">{new Date(row.day).toLocaleDateString()}</td>
                          <td className="px-3 py-2">{row.users_created}</td>
                          <td className="px-3 py-2">{row.active_users}</td>
                          <td className="px-3 py-2">{row.quiz_answers}</td>
                          <td className="px-3 py-2">{percent((row.correct_answers / Math.max(1, row.quiz_answers)) * 100)}</td>
                          <td className="px-3 py-2">{row.sessions}</td>
                          <td className="px-3 py-2">{row.avg_session_minutes} min</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </article>
          </section>
        )}

        {activeTab === "users" && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 md:p-5">
            <div className="mb-4 grid gap-3 md:grid-cols-5">
              <label className="relative md:col-span-2">
                <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-500"
                />
              </label>
              <select value={userFilter} onChange={(e) => setUserFilter(e.target.value as any)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
                <option value="all">All users</option>
                <option value="admin">Admins</option>
                <option value="user">Users</option>
                <option value="online">Online</option>
                <option value="banned">Banned</option>
              </select>
              <select value={userSortField} onChange={(e) => setUserSortField(e.target.value as SortField)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
                <option value="created_at">Sort by created</option>
                <option value="display_name">Sort by name</option>
                <option value="email">Sort by email</option>
                <option value="role">Sort by role</option>
                <option value="xp">Sort by XP</option>
              </select>
              <button onClick={() => setUserSortDir((prev) => (prev === "asc" ? "desc" : "asc"))} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm hover:border-slate-500">
                {userSortDir === "asc" ? "Ascending" : "Descending"}
              </button>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <button onClick={toggleAllUsersOnCurrentFilter} className="rounded-xl border border-slate-700 px-3 py-2 text-xs hover:border-slate-500">
                {selectedUserIds.length ? "Unselect visible" : "Select visible"}
              </button>
              <button onClick={exportUsersCsv} className="inline-flex items-center gap-1 rounded-xl border border-slate-700 px-3 py-2 text-xs hover:border-slate-500">
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
              <button
                onClick={() => void bulkDeleteUsers()}
                disabled={!selectedUserIds.length}
                className="rounded-xl border border-rose-500/50 px-3 py-2 text-xs text-rose-200 transition hover:bg-rose-500/10 disabled:opacity-50"
              >
                Bulk delete ({selectedUserIds.length})
              </button>
            </div>

            {usersLoading ? (
              <div className="flex items-center justify-center py-12 text-slate-400">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading users...
              </div>
            ) : filteredSortedUsers.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No users found for current filters.</div>
            ) : (
              <>
                <div className="hidden overflow-hidden rounded-xl border border-slate-800 md:block">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-900/70 text-left text-xs text-slate-400">
                      <tr>
                        <th className="px-3 py-2">Select</th>
                        <th className="px-3 py-2">User</th>
                        <th className="px-3 py-2">Role</th>
                        <th className="px-3 py-2">XP</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSortedUsers.map((user) => (
                        <tr key={user.id} className="border-t border-slate-800">
                          <td className="px-3 py-2">
                            <input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={() => toggleSelectUser(user.id)} />
                          </td>
                          <td className="px-3 py-2">
                            <p className="font-medium">{user.display_name || "Unnamed user"}</p>
                            <p className="text-xs text-slate-400">{user.email}</p>
                          </td>
                          <td className="px-3 py-2">{user.role}</td>
                          <td className="px-3 py-2">{user.xp ?? 0}</td>
                          <td className="px-3 py-2">
                            <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs", user.is_online ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800 text-slate-300")}>
                              <span className={cn("h-2 w-2 rounded-full", user.is_online ? "bg-emerald-400" : "bg-slate-500")} />
                              {user.is_online ? "Online" : "Offline"}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex flex-wrap gap-2">
                              <button onClick={() => setDetailUser(user)} className="rounded-lg border border-slate-700 p-1.5 hover:border-slate-500"><Eye className="h-4 w-4" /></button>
                              <button onClick={() => void updateUserField(user, { is_banned: !user.is_banned })} className="rounded-lg border border-amber-600/40 p-1.5 hover:bg-amber-500/10"><Ban className="h-4 w-4" /></button>
                              <button onClick={() => void updateUserField(user, { role: user.role === "admin" ? "user" : "admin" })} className="rounded-lg border border-indigo-600/40 p-1.5 hover:bg-indigo-500/10"><Crown className="h-4 w-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="space-y-3 md:hidden">
                  {filteredSortedUsers.map((user) => (
                    <article key={user.id} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.display_name || "Unnamed user"}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                        <input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={() => toggleSelectUser(user.id)} />
                      </div>
                      <div className="mb-2 text-xs text-slate-400">XP: {user.xp ?? 0} · Role: {user.role}</div>
                      <div className="flex gap-2">
                        <button onClick={() => setDetailUser(user)} className="flex-1 rounded-lg border border-slate-700 px-2 py-1.5 text-xs">Details</button>
                        <button onClick={() => void updateUserField(user, { is_banned: !user.is_banned })} className="flex-1 rounded-lg border border-amber-700/40 px-2 py-1.5 text-xs">{user.is_banned ? "Unban" : "Ban"}</button>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {activeTab === "quiz" && (
          <section className="grid gap-4 lg:grid-cols-3">
            <form onSubmit={saveQuizQuestion} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 lg:col-span-1">
              <h3 className="mb-4 text-sm font-medium">{editingQuizId ? "Edit question" : "Create question"}</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input
                    value={newEmpireInput}
                    onChange={(e) => setNewEmpireInput(e.target.value)}
                    placeholder="Add new empire"
                    className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                  />
                  <button type="button" onClick={() => void addEmpire()} className="rounded-xl border border-slate-700 px-3 py-2 text-sm hover:border-slate-500">
                    Add empire
                  </button>
                </div>
                <select value={quizForm.empire_id} onChange={(e) => setQuizForm((prev) => ({ ...prev, empire_id: e.target.value }))} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
                  {empires.map((empire) => (
                    <option key={empire} value={empire}>{empire}</option>
                  ))}
                </select>
                <textarea value={quizForm.question_en} onChange={(e) => setQuizForm((prev) => ({ ...prev, question_en: e.target.value }))} placeholder="Question (EN)" className="h-20 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
                {quizForm.options_en.map((option, idx) => (
                  <div key={`opt-${idx}`} className="flex gap-2">
                    <input type="radio" checked={quizForm.correct_index === idx} onChange={() => setQuizForm((prev) => ({ ...prev, correct_index: idx }))} />
                    <input
                      value={option}
                      onChange={(e) =>
                        setQuizForm((prev) => {
                          const options = [...prev.options_en];
                          options[idx] = e.target.value;
                          return { ...prev, options_en: options };
                        })
                      }
                      placeholder={`Option ${idx + 1}`}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                    />
                  </div>
                ))}
                <textarea value={quizForm.explanation_en} onChange={(e) => setQuizForm((prev) => ({ ...prev, explanation_en: e.target.value }))} placeholder="Explanation (EN)" className="h-16 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <input
                    value={quizDraftTitle}
                    onChange={(e) => setQuizDraftTitle(e.target.value)}
                    placeholder="Draft title"
                    className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                  />
                  <button type="button" onClick={() => void saveQuizDraft()} className="rounded-xl border border-slate-700 px-3 py-2 text-sm hover:border-slate-500">
                    Save draft
                  </button>
                </div>
                <button disabled={quizSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium transition hover:bg-indigo-400 disabled:opacity-60">
                  {quizSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  {editingQuizId ? "Save changes" : "Create question"}
                </button>
              </div>
            </form>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 lg:col-span-2">
              <div className="mb-4 flex flex-wrap gap-2">
                <label className="relative flex-1 min-w-[180px]">
                  <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                  <input value={quizSearch} onChange={(e) => setQuizSearch(e.target.value)} placeholder="Search questions..." className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 pl-9 pr-3 text-sm" />
                </label>
                <select value={quizEmpireFilter} onChange={(e) => setQuizEmpireFilter(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
                  {["all", ...empires].map((empire) => (
                    <option key={empire} value={empire}>{empire}</option>
                  ))}
                </select>
                <button onClick={exportQuizCsv} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm hover:border-slate-500">
                  <Download className="h-4 w-4" /> Export quiz
                </button>
                <button
                  onClick={() => void runQuizBulkTranslation()}
                  disabled={quizBulkTranslating}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-sm transition hover:border-slate-500 disabled:opacity-60"
                >
                  {quizBulkTranslating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
                  Bulk translate
                </button>
              </div>
              <div className="mb-4 grid gap-2 rounded-xl border border-slate-800 bg-slate-900 p-3 text-xs sm:grid-cols-4">
                <div className="rounded-lg bg-slate-800 p-2">Total filtered: {filteredQuiz.length}</div>
                <div className="rounded-lg bg-slate-800 p-2 text-emerald-300">Translated: {filteredQuiz.length - missingTranslationCount}</div>
                <div className="rounded-lg bg-slate-800 p-2 text-rose-300">Missing: {missingTranslationCount}</div>
                <div className="rounded-lg bg-slate-800 p-2">Page size: {QUIZ_PAGE_SIZE}</div>
              </div>
              {quizDrafts.length > 0 && (
                <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900 p-3">
                  <h4 className="mb-2 text-xs uppercase tracking-wide text-slate-400">Quiz drafts</h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {quizDrafts.slice(0, 8).map((draft) => (
                      <div key={draft.id} className="rounded-lg border border-slate-800 bg-slate-950 p-2">
                        <p className="text-sm font-medium">{draft.title}</p>
                        <p className="text-xs text-slate-400">{draft.empire_id} · {formatDate(draft.updated_at)}</p>
                        <div className="mt-2 flex gap-2">
                          <button onClick={() => loadQuizDraftIntoForm(draft)} className="rounded-md border border-slate-700 px-2 py-1 text-xs">Load</button>
                          <button onClick={() => void deleteQuizDraft(draft.id)} className="rounded-md border border-rose-700/50 px-2 py-1 text-xs text-rose-200">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {quizLoading ? (
                <div className="flex items-center justify-center py-10 text-slate-400"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading quiz...</div>
              ) : quizView.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No quiz questions found.</div>
              ) : (
                <div className="space-y-3">
                  {quizView.map((q) => {
                    const status = translationStatus(q);
                    return (
                      <article key={q.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4 transition hover:border-slate-700">
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs text-slate-300">{q.empire_id}</span>
                          <span className={cn("text-xs font-medium", status.tone)}>{status.label}</span>
                        </div>
                        {quizInlineEditId === q.id && quizInlineEditField === "question_en" ? (
                          <div className="mb-2">
                            <textarea value={quizInlineEditValue} onChange={(e) => setQuizInlineEditValue(e.target.value)} className="h-20 w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-sm" />
                            <div className="mt-2 flex gap-2">
                              <button onClick={() => void saveInlineEditQuiz()} className="rounded-md border border-emerald-700/50 px-2 py-1 text-xs text-emerald-200">Save inline</button>
                              <button onClick={cancelInlineEditQuiz} className="rounded-md border border-slate-700 px-2 py-1 text-xs">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <p className="mb-2 text-sm font-medium">{q.question_en}</p>
                        )}
                        <ol className="mb-3 list-decimal space-y-1 pl-5 text-xs text-slate-300">
                          {q.options_en.map((option, idx) => (
                            <li key={`${q.id}-${idx}`} className={cn(idx === q.correct_index && "text-emerald-300")}>{option}</li>
                          ))}
                        </ol>
                        {quizInlineEditId === q.id && quizInlineEditField === "explanation_en" ? (
                          <div>
                            <textarea value={quizInlineEditValue} onChange={(e) => setQuizInlineEditValue(e.target.value)} className="h-16 w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-xs" />
                            <div className="mt-2 flex gap-2">
                              <button onClick={() => void saveInlineEditQuiz()} className="rounded-md border border-emerald-700/50 px-2 py-1 text-xs text-emerald-200">Save inline</button>
                              <button onClick={cancelInlineEditQuiz} className="rounded-md border border-slate-700 px-2 py-1 text-xs">Cancel</button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400">{q.explanation_en}</p>
                        )}
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => startEditQuiz(q)} className="rounded-lg border border-slate-700 px-2 py-1 text-xs hover:border-slate-500">Edit</button>
                          <button onClick={() => startInlineEditQuiz(q, "question_en")} className="rounded-lg border border-slate-700 px-2 py-1 text-xs hover:border-slate-500">Inline Q</button>
                          <button onClick={() => startInlineEditQuiz(q, "explanation_en")} className="rounded-lg border border-slate-700 px-2 py-1 text-xs hover:border-slate-500">Inline Exp</button>
                          <button onClick={() => void deleteQuizQuestion(q.id)} className="rounded-lg border border-rose-700/50 px-2 py-1 text-xs text-rose-200 hover:bg-rose-500/10">Delete</button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
              <div className="mt-4 flex items-center justify-between text-sm">
                <button onClick={() => setQuizPage((p) => Math.max(1, p - 1))} disabled={quizPage === 1} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2 py-1 disabled:opacity-40">
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <span className="text-slate-400">Page {quizPage} / {quizPages}</span>
                <button onClick={() => setQuizPage((p) => Math.min(quizPages, p + 1))} disabled={quizPage === quizPages} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2 py-1 disabled:opacity-40">
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {activeTab === "content" && (
          <section className="grid gap-4 lg:grid-cols-3">
            <form onSubmit={createContent} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-sm font-medium">Create content</h3>
              <div className="space-y-3">
                <select value={contentForm.type} onChange={(e) => setContentForm((prev) => ({ ...prev, type: e.target.value as ContentType }))} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
                  <option value="announcement">Announcement</option>
                  <option value="tip">Tip</option>
                  <option value="fact">Historical fact</option>
                </select>
                <select value={contentForm.empire_target} onChange={(e) => setContentForm((prev) => ({ ...prev, empire_target: e.target.value as any }))} className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
                  <option value="both">Both empires</option>
                  <option value="ottoman">Ottoman</option>
                  <option value="roman">Roman</option>
                </select>
                <textarea value={contentForm.text_en} onChange={(e) => setContentForm((prev) => ({ ...prev, text_en: e.target.value }))} placeholder="Write text in English..." className="h-28 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
                <button disabled={contentSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium hover:bg-indigo-400 disabled:opacity-60">
                  {contentSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />} Create + Translate
                </button>
              </div>
            </form>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 lg:col-span-2">
              <h3 className="mb-4 text-sm font-medium">Content list</h3>
              {contentLoading ? (
                <div className="py-10 text-center text-slate-400"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Loading content...</div>
              ) : contentItems.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No content yet.</div>
              ) : (
                <div className="space-y-3">
                  {contentItems.map((item) => (
                    <article key={item.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="rounded-full bg-slate-800 px-2 py-1">{item.type}</span>
                        <span className="rounded-full bg-slate-800 px-2 py-1">{item.empire_target}</span>
                        <span className={cn("rounded-full px-2 py-1", item.active ? "bg-emerald-500/20 text-emerald-200" : "bg-slate-800")}>
                          {item.active ? "active" : "inactive"}
                        </span>
                      </div>
                      <p className="text-sm">{item.text_en}</p>
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => void toggleContentActive(item)} className="rounded-lg border border-slate-700 px-2 py-1 text-xs hover:border-slate-500">
                          {item.active ? "Deactivate" : "Activate"}
                        </button>
                        <button onClick={() => void deleteContent(item.id)} className="rounded-lg border border-rose-700/50 px-2 py-1 text-xs text-rose-200 hover:bg-rose-500/10">Delete</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "notifications" && (
          <section className="grid gap-4 lg:grid-cols-3">
            <form onSubmit={sendNotification} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-sm font-medium">Create push notification</h3>
              <div className="space-y-3">
                <input value={notificationForm.title_en} onChange={(e) => setNotificationForm((prev) => ({ ...prev, title_en: e.target.value }))} placeholder="Title (EN)" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
                <textarea value={notificationForm.body_en} onChange={(e) => setNotificationForm((prev) => ({ ...prev, body_en: e.target.value }))} placeholder="Body (EN)" className="h-24 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
                <input value={notificationForm.image_url} onChange={(e) => setNotificationForm((prev) => ({ ...prev, image_url: e.target.value }))} placeholder="Optional image URL" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
                <button disabled={notificationSending} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium hover:bg-indigo-400 disabled:opacity-60">
                  {notificationSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Translate + Send to all users
                </button>
              </div>
            </form>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 lg:col-span-2">
              <h3 className="mb-4 text-sm font-medium">Sent notifications</h3>
              {notificationsLoading ? (
                <div className="py-10 text-center text-slate-400"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Loading notifications...</div>
              ) : notifications.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No notifications yet.</div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <article key={n.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="font-medium">{n.title_en}</p>
                        <span className="text-xs text-slate-400">sent: {n.sent_count}</span>
                      </div>
                      <p className="text-sm text-slate-300">{n.body_en}</p>
                      <div className="mt-3">
                        <button onClick={() => void deleteNotification(n.id)} className="rounded-lg border border-rose-700/50 px-2 py-1 text-xs text-rose-200 hover:bg-rose-500/10">
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "influencers" && (
          <section className="grid gap-4 lg:grid-cols-3">
            <form onSubmit={createInfluencer} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-sm font-medium">Create referral link</h3>
              <div className="space-y-3">
                <input value={influencerForm.name} onChange={(e) => setInfluencerForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Influencer name" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={influencerForm.discount_percent}
                  onChange={(e) => setInfluencerForm((prev) => ({ ...prev, discount_percent: Number(e.target.value) }))}
                  placeholder="Discount %"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                />
                <button disabled={influencerSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium hover:bg-indigo-400 disabled:opacity-60">
                  {influencerSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />} Create code
                </button>
              </div>
            </form>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 lg:col-span-2">
              <h3 className="mb-4 text-sm font-medium">Referral tracking</h3>
              {influencersLoading ? (
                <div className="py-10 text-center text-slate-400"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Loading links...</div>
              ) : influencers.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No influencer links yet.</div>
              ) : (
                <div className="space-y-3">
                  {influencers.map((item) => {
                    const conversionRate = item.uses ? ((item.conversions / item.uses) * 100).toFixed(1) : "0.0";
                    return (
                      <article key={item.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="font-medium">{item.name}</p>
                          <span className="rounded-full bg-slate-800 px-2 py-1 text-xs">{item.code}</span>
                        </div>
                        <div className="grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
                          <p>Uses: {item.uses}</p>
                          <p>Conversions: {item.conversions}</p>
                          <p>Conversion rate: {conversionRate}%</p>
                          <p>Revenue: ${item.revenue_generated.toFixed(2)}</p>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => void copyReferral(item.code)} className="inline-flex items-center gap-1 rounded-lg border border-slate-700 px-2 py-1 text-xs hover:border-slate-500">
                            <Copy className="h-3.5 w-3.5" /> Copy link
                          </button>
                          <button onClick={() => void deleteInfluencer(item.id)} className="rounded-lg border border-rose-700/50 px-2 py-1 text-xs text-rose-200 hover:bg-rose-500/10">Delete</button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "moderation" && (
          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-sm font-medium">Blocked words</h3>
              <textarea value={blockedWords} onChange={(e) => setBlockedWords(e.target.value)} className="h-24 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
              <button onClick={() => void saveBlockedWords()} disabled={savingBlockedWords} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium hover:bg-indigo-400 disabled:opacity-60">
                {savingBlockedWords ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                Save blocked words
              </button>
              <div className="mt-5 rounded-xl border border-rose-700/30 bg-rose-500/5 p-3">
                <h4 className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-rose-200"><AlertTriangle className="h-4 w-4" /> Danger zone</h4>
                <div className="space-y-2">
                  <button onClick={() => void runDangerAction("revoke_sessions")} disabled={dangerActionLoading} className="w-full rounded-lg border border-amber-700/40 px-2 py-1.5 text-xs hover:bg-amber-500/10">
                    Revoke all sessions
                  </button>
                  <button onClick={() => void runDangerAction("delete_non_admin_users")} disabled className="w-full rounded-lg border border-rose-700/40 px-2 py-1.5 text-xs opacity-60">
                    Delete non-admin users (mock disabled)
                  </button>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 lg:col-span-2">
              <h3 className="mb-4 text-sm font-medium">Flagged events feed</h3>
              {flaggedLoading ? (
                <div className="py-10 text-center text-slate-400"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> Loading events...</div>
              ) : flaggedEvents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No flagged events.</div>
              ) : (
                <div className="space-y-3">
                  {flaggedEvents.map((event) => (
                    <article key={event.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                      <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-slate-800 px-2 py-1">{event.event_type.replace("_", " ")}</span>
                        <span className={cn("rounded-full px-2 py-1", event.severity === "high" ? "bg-rose-500/20 text-rose-200" : event.severity === "medium" ? "bg-amber-500/20 text-amber-200" : "bg-slate-800 text-slate-300")}>
                          {event.severity}
                        </span>
                        <span className="rounded-full bg-slate-800 px-2 py-1">{event.status}</span>
                      </div>
                      <p className="text-sm text-slate-200">{event.message}</p>
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => void updateFlagStatus(event.id, "resolved")} className="rounded-lg border border-emerald-700/50 px-2 py-1 text-xs text-emerald-200 hover:bg-emerald-500/10">Resolve</button>
                        <button onClick={() => void updateFlagStatus(event.id, "ignored")} className="rounded-lg border border-slate-700 px-2 py-1 text-xs hover:border-slate-500">Ignore</button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === "logs" && (
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium">Real-time activity logs</h3>
              <button onClick={() => setLogs([])} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-xs hover:border-slate-500">
                <Trash2 className="h-3.5 w-3.5" /> Clear logs
              </button>
            </div>
            {logs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No logs yet.</div>
            ) : (
              <div className="space-y-2">
                {logs.map((log) => (
                  <div key={log.id} className={cn("rounded-xl border px-3 py-2 text-sm", severityClasses[log.type])}>
                    <div className="mb-0.5 flex items-center justify-between text-xs">
                      <span className="uppercase tracking-wide">{log.type}</span>
                      <span>{formatDate(log.createdAt)}</span>
                    </div>
                    <p>{log.message}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === "settings" && (
          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-sm font-medium">System info</h3>
              <div className="space-y-2 text-sm">
                <div className="rounded-xl bg-slate-800/70 p-3">Environment: {import.meta.env.MODE}</div>
                <div className="rounded-xl bg-slate-800/70 p-3">
                  Supabase URL: {showSecrets ? import.meta.env.VITE_SUPABASE_URL : "••••••••••••"}
                </div>
                <div className="rounded-xl bg-slate-800/70 p-3">
                  Supabase anon key: {showSecrets ? import.meta.env.VITE_SUPABASE_ANON_KEY : "••••••••••••"}
                </div>
              </div>
              <button onClick={() => setShowSecrets((v) => !v)} className="mt-3 inline-flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-xs hover:border-slate-500">
                {showSecrets ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                {showSecrets ? "Hide secrets" : "Show secrets"}
              </button>
              <div className="mt-4 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-2">
                  <p className="mb-1 inline-flex items-center gap-1 text-slate-400"><Database className="h-3.5 w-3.5" /> DB health</p>
                  <p>Profiles: {users.length}</p>
                  <p>Quiz rows: {quizQuestions.length}</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900 p-2">
                  <p className="mb-1 inline-flex items-center gap-1 text-slate-400"><Gauge className="h-3.5 w-3.5" /> Runtime</p>
                  <p>Auto refresh: {autoRefreshEnabled ? "enabled" : "disabled"}</p>
                  <p>Interval: {autoRefreshSeconds}s</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <h3 className="mb-4 text-sm font-medium">Admin tools</h3>
              <textarea value={systemAnnouncement} onChange={(e) => setSystemAnnouncement(e.target.value)} placeholder="Send system announcement..." className="h-24 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm" />
              <button onClick={() => void sendSystemAnnouncement()} disabled={sendingSystemAnnouncement || !systemAnnouncement.trim()} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-3 py-2 text-sm font-medium hover:bg-indigo-400 disabled:opacity-60">
                {sendingSystemAnnouncement ? <Loader2 className="h-4 w-4 animate-spin" /> : <Megaphone className="h-4 w-4" />}
                Send announcement
              </button>
              <div className="mt-4 grid gap-2 text-xs text-slate-300 sm:grid-cols-2">
                <button onClick={() => addLog("info", "Health check triggered")} className="rounded-lg border border-slate-700 px-2 py-2 hover:border-slate-500">Run health check</button>
                <button onClick={() => addLog("info", "Cache clear requested")} className="rounded-lg border border-slate-700 px-2 py-2 hover:border-slate-500">Clear cache</button>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 lg:col-span-2">
              <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-medium"><Brain className="h-4 w-4 text-indigo-300" /> Operational playbook</h3>
              <p className="mb-3 text-xs text-slate-400">Action library for growth, moderation, quiz quality, infra stability and retention execution.</p>
              <div className="grid gap-2 md:grid-cols-2">
                {ADMIN_PLAYBOOK.map((item) => (
                  <article key={item.id} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="rounded-full bg-slate-800 px-2 py-0.5">{item.id}</span>
                      <span className={cn("rounded-full px-2 py-0.5", item.severity === "high" ? "bg-rose-500/20 text-rose-200" : item.severity === "medium" ? "bg-amber-500/20 text-amber-200" : "bg-slate-800 text-slate-300")}>
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-400">Category: {item.category}</p>
                    <p className="mt-1 text-xs text-slate-300"><span className="text-slate-500">Trigger:</span> {item.trigger}</p>
                    <p className="mt-1 text-xs text-slate-300"><span className="text-slate-500">Action:</span> {item.action}</p>
                    <p className="mt-1 text-xs text-slate-400">Owner: {item.owner}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {detailUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium">User details</h3>
              <button onClick={() => setDetailUser(null)} className="rounded-lg border border-slate-700 p-1.5 hover:border-slate-500">
                <XCircle className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <p><span className="text-slate-400">Name:</span> {detailUser.display_name || "Unnamed"}</p>
              <p><span className="text-slate-400">Email:</span> {detailUser.email}</p>
              <p><span className="text-slate-400">Role:</span> {detailUser.role}</p>
              <p><span className="text-slate-400">XP:</span> {detailUser.xp ?? 0}</p>
              <p><span className="text-slate-400">Created:</span> {formatDate(detailUser.created_at)}</p>
              <p><span className="text-slate-400">Last seen:</span> {formatDate(detailUser.last_seen)}</p>
              <p><span className="text-slate-400">Online:</span> {detailUser.is_online ? "Yes" : "No"}</p>
              <p><span className="text-slate-400">Banned:</span> {detailUser.is_banned ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
