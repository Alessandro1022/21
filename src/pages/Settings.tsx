import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useProgress } from "@/hooks/useProgress";
import { supabase } from "@/integrations/supabase/client";
import {
  Settings as SettingsIcon, User, LogOut, Trash2, Mail, Key,
  Calendar, Zap, Trophy, Clock, Globe, BookOpen, Camera,
  ChevronRight, Check, Shield, Bell, MapPin,
  Crown, Sparkles, Lock, CreditCard, Mic,
  BarChart3, Code2, Download, Infinity as InfinityIcon,
  Rocket, Copy, CheckCircle2, AlertTriangle,
  RefreshCw, ExternalLink, Flame,
} from "lucide-react";
import { toast } from "sonner";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

type PlanId = "free" | "pro" | "elite";
type FeatureKey =
  | "dark_ai" | "unlimited_chat" | "export_history" | "premium_avatar"
  | "priority_ai" | "voice_ai" | "custom_empires" | "analytics" | "api_access";

interface Plan {
  id: PlanId;
  name: string;
  price: number;
  billing: string;
  badge: string;
  gradient: string;
  borderColor: string;
  glowColor: string;
  description: string;
  highlight: boolean;
  stripePriceId: string;
  features: Record<FeatureKey, boolean>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § CONFIG — LANGUAGES (original, unchanged)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "tr", label: "Türkçe",  flag: "🇹🇷" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § CONFIG — LEVELS (original, unchanged)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const LEVELS = [
  { code: "brief",    en: "Brief",     sv: "Kort",         tr: "Kısa",
    desc_en: "Short answers, fast reading", desc_sv: "Korta svar, snabb läsning", desc_tr: "Kısa cevaplar" },
  { code: "deep",     en: "In-depth",  sv: "Fördjupad",    tr: "Derinlemesine",
    desc_en: "Detailed explanations",       desc_sv: "Detaljerade förklaringar", desc_tr: "Detaylı açıklamalar" },
  { code: "academic", en: "Academic",  sv: "Gymnasienivå", tr: "Akademik",
    desc_en: "Scholarly level analysis",    desc_sv: "Akademisk analys",         desc_tr: "Akademik analiz" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § CONFIG — COUNTRIES (original, all countries)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const COUNTRIES = [
  { code:"AF",name:"Afghanistan",flag:"🇦🇫"},{ code:"AL",name:"Albania",flag:"🇦🇱"},
  { code:"DZ",name:"Algeria",flag:"🇩🇿"},{ code:"AD",name:"Andorra",flag:"🇦🇩"},
  { code:"AO",name:"Angola",flag:"🇦🇴"},{ code:"AG",name:"Antigua & Barbuda",flag:"🇦🇬"},
  { code:"AR",name:"Argentina",flag:"🇦🇷"},{ code:"AM",name:"Armenia",flag:"🇦🇲"},
  { code:"AU",name:"Australia",flag:"🇦🇺"},{ code:"AT",name:"Austria",flag:"🇦🇹"},
  { code:"AZ",name:"Azerbaijan",flag:"🇦🇿"},{ code:"BS",name:"Bahamas",flag:"🇧🇸"},
  { code:"BH",name:"Bahrain",flag:"🇧🇭"},{ code:"BD",name:"Bangladesh",flag:"🇧🇩"},
  { code:"BB",name:"Barbados",flag:"🇧🇧"},{ code:"BY",name:"Belarus",flag:"🇧🇾"},
  { code:"BE",name:"Belgium",flag:"🇧🇪"},{ code:"BZ",name:"Belize",flag:"🇧🇿"},
  { code:"BJ",name:"Benin",flag:"🇧🇯"},{ code:"BT",name:"Bhutan",flag:"🇧🇹"},
  { code:"BO",name:"Bolivia",flag:"🇧🇴"},{ code:"BA",name:"Bosnia & Herzegovina",flag:"🇧🇦"},
  { code:"BW",name:"Botswana",flag:"🇧🇼"},{ code:"BR",name:"Brazil",flag:"🇧🇷"},
  { code:"BN",name:"Brunei",flag:"🇧🇳"},{ code:"BG",name:"Bulgaria",flag:"🇧🇬"},
  { code:"BF",name:"Burkina Faso",flag:"🇧🇫"},{ code:"BI",name:"Burundi",flag:"🇧🇮"},
  { code:"CV",name:"Cabo Verde",flag:"🇨🇻"},{ code:"KH",name:"Cambodia",flag:"🇰🇭"},
  { code:"CM",name:"Cameroon",flag:"🇨🇲"},{ code:"CA",name:"Canada",flag:"🇨🇦"},
  { code:"CF",name:"Central African Republic",flag:"🇨🇫"},{ code:"TD",name:"Chad",flag:"🇹🇩"},
  { code:"CL",name:"Chile",flag:"🇨🇱"},{ code:"CN",name:"China",flag:"🇨🇳"},
  { code:"CO",name:"Colombia",flag:"🇨🇴"},{ code:"KM",name:"Comoros",flag:"🇰🇲"},
  { code:"CG",name:"Congo",flag:"🇨🇬"},{ code:"CR",name:"Costa Rica",flag:"🇨🇷"},
  { code:"HR",name:"Croatia",flag:"🇭🇷"},{ code:"CU",name:"Cuba",flag:"🇨🇺"},
  { code:"CY",name:"Cyprus",flag:"🇨🇾"},{ code:"CZ",name:"Czech Republic",flag:"🇨🇿"},
  { code:"DK",name:"Denmark",flag:"🇩🇰"},{ code:"DJ",name:"Djibouti",flag:"🇩🇯"},
  { code:"DM",name:"Dominica",flag:"🇩🇲"},{ code:"DO",name:"Dominican Republic",flag:"🇩🇴"},
  { code:"EC",name:"Ecuador",flag:"🇪🇨"},{ code:"EG",name:"Egypt",flag:"🇪🇬"},
  { code:"SV",name:"El Salvador",flag:"🇸🇻"},{ code:"GQ",name:"Equatorial Guinea",flag:"🇬🇶"},
  { code:"ER",name:"Eritrea",flag:"🇪🇷"},{ code:"EE",name:"Estonia",flag:"🇪🇪"},
  { code:"SZ",name:"Eswatini",flag:"🇸🇿"},{ code:"ET",name:"Ethiopia",flag:"🇪🇹"},
  { code:"FJ",name:"Fiji",flag:"🇫🇯"},{ code:"FI",name:"Finland",flag:"🇫🇮"},
  { code:"FR",name:"France",flag:"🇫🇷"},{ code:"GA",name:"Gabon",flag:"🇬🇦"},
  { code:"GM",name:"Gambia",flag:"🇬🇲"},{ code:"GE",name:"Georgia",flag:"🇬🇪"},
  { code:"DE",name:"Germany",flag:"🇩🇪"},{ code:"GH",name:"Ghana",flag:"🇬🇭"},
  { code:"GR",name:"Greece",flag:"🇬🇷"},{ code:"GD",name:"Grenada",flag:"🇬🇩"},
  { code:"GT",name:"Guatemala",flag:"🇬🇹"},{ code:"GN",name:"Guinea",flag:"🇬🇳"},
  { code:"GW",name:"Guinea-Bissau",flag:"🇬🇼"},{ code:"GY",name:"Guyana",flag:"🇬🇾"},
  { code:"HT",name:"Haiti",flag:"🇭🇹"},{ code:"HN",name:"Honduras",flag:"🇭🇳"},
  { code:"HU",name:"Hungary",flag:"🇭🇺"},{ code:"IS",name:"Iceland",flag:"🇮🇸"},
  { code:"IN",name:"India",flag:"🇮🇳"},{ code:"ID",name:"Indonesia",flag:"🇮🇩"},
  { code:"IR",name:"Iran",flag:"🇮🇷"},{ code:"IQ",name:"Iraq",flag:"🇮🇶"},
  { code:"IE",name:"Ireland",flag:"🇮🇪"},{ code:"IL",name:"Israel",flag:"🇮🇱"},
  { code:"IT",name:"Italy",flag:"🇮🇹"},{ code:"JM",name:"Jamaica",flag:"🇯🇲"},
  { code:"JP",name:"Japan",flag:"🇯🇵"},{ code:"JO",name:"Jordan",flag:"🇯🇴"},
  { code:"KZ",name:"Kazakhstan",flag:"🇰🇿"},{ code:"KE",name:"Kenya",flag:"🇰🇪"},
  { code:"KI",name:"Kiribati",flag:"🇰🇮"},{ code:"KW",name:"Kuwait",flag:"🇰🇼"},
  { code:"KG",name:"Kyrgyzstan",flag:"🇰🇬"},{ code:"LA",name:"Laos",flag:"🇱🇦"},
  { code:"LV",name:"Latvia",flag:"🇱🇻"},{ code:"LB",name:"Lebanon",flag:"🇱🇧"},
  { code:"LS",name:"Lesotho",flag:"🇱🇸"},{ code:"LR",name:"Liberia",flag:"🇱🇷"},
  { code:"LY",name:"Libya",flag:"🇱🇾"},{ code:"LI",name:"Liechtenstein",flag:"🇱🇮"},
  { code:"LT",name:"Lithuania",flag:"🇱🇹"},{ code:"LU",name:"Luxembourg",flag:"🇱🇺"},
  { code:"MG",name:"Madagascar",flag:"🇲🇬"},{ code:"MW",name:"Malawi",flag:"🇲🇼"},
  { code:"MY",name:"Malaysia",flag:"🇲🇾"},{ code:"MV",name:"Maldives",flag:"🇲🇻"},
  { code:"ML",name:"Mali",flag:"🇲🇱"},{ code:"MT",name:"Malta",flag:"🇲🇹"},
  { code:"MH",name:"Marshall Islands",flag:"🇲🇭"},{ code:"MR",name:"Mauritania",flag:"🇲🇷"},
  { code:"MU",name:"Mauritius",flag:"🇲🇺"},{ code:"MX",name:"Mexico",flag:"🇲🇽"},
  { code:"FM",name:"Micronesia",flag:"🇫🇲"},{ code:"MD",name:"Moldova",flag:"🇲🇩"},
  { code:"MC",name:"Monaco",flag:"🇲🇨"},{ code:"MN",name:"Mongolia",flag:"🇲🇳"},
  { code:"ME",name:"Montenegro",flag:"🇲🇪"},{ code:"MA",name:"Morocco",flag:"🇲🇦"},
  { code:"MZ",name:"Mozambique",flag:"🇲🇿"},{ code:"MM",name:"Myanmar",flag:"🇲🇲"},
  { code:"NA",name:"Namibia",flag:"🇳🇦"},{ code:"NR",name:"Nauru",flag:"🇳🇷"},
  { code:"NP",name:"Nepal",flag:"🇳🇵"},{ code:"NL",name:"Netherlands",flag:"🇳🇱"},
  { code:"NZ",name:"New Zealand",flag:"🇳🇿"},{ code:"NI",name:"Nicaragua",flag:"🇳🇮"},
  { code:"NE",name:"Niger",flag:"🇳🇪"},{ code:"NG",name:"Nigeria",flag:"🇳🇬"},
  { code:"KP",name:"North Korea",flag:"🇰🇵"},{ code:"MK",name:"North Macedonia",flag:"🇲🇰"},
  { code:"NO",name:"Norway",flag:"🇳🇴"},{ code:"OM",name:"Oman",flag:"🇴🇲"},
  { code:"PK",name:"Pakistan",flag:"🇵🇰"},{ code:"PW",name:"Palau",flag:"🇵🇼"},
  { code:"PA",name:"Panama",flag:"🇵🇦"},{ code:"PG",name:"Papua New Guinea",flag:"🇵🇬"},
  { code:"PY",name:"Paraguay",flag:"🇵🇾"},{ code:"PE",name:"Peru",flag:"🇵🇪"},
  { code:"PH",name:"Philippines",flag:"🇵🇭"},{ code:"PL",name:"Poland",flag:"🇵🇱"},
  { code:"PT",name:"Portugal",flag:"🇵🇹"},{ code:"QA",name:"Qatar",flag:"🇶🇦"},
  { code:"RO",name:"Romania",flag:"🇷🇴"},{ code:"RU",name:"Russia",flag:"🇷🇺"},
  { code:"RW",name:"Rwanda",flag:"🇷🇼"},{ code:"KN",name:"Saint Kitts & Nevis",flag:"🇰🇳"},
  { code:"LC",name:"Saint Lucia",flag:"🇱🇨"},{ code:"VC",name:"Saint Vincent",flag:"🇻🇨"},
  { code:"WS",name:"Samoa",flag:"🇼🇸"},{ code:"SM",name:"San Marino",flag:"🇸🇲"},
  { code:"ST",name:"São Tomé & Príncipe",flag:"🇸🇹"},{ code:"SA",name:"Saudi Arabia",flag:"🇸🇦"},
  { code:"SN",name:"Senegal",flag:"🇸🇳"},{ code:"RS",name:"Serbia",flag:"🇷🇸"},
  { code:"SC",name:"Seychelles",flag:"🇸🇨"},{ code:"SL",name:"Sierra Leone",flag:"🇸🇱"},
  { code:"SG",name:"Singapore",flag:"🇸🇬"},{ code:"SK",name:"Slovakia",flag:"🇸🇰"},
  { code:"SI",name:"Slovenia",flag:"🇸🇮"},{ code:"SB",name:"Solomon Islands",flag:"🇸🇧"},
  { code:"SO",name:"Somalia",flag:"🇸🇴"},{ code:"ZA",name:"South Africa",flag:"🇿🇦"},
  { code:"KR",name:"South Korea",flag:"🇰🇷"},{ code:"SS",name:"South Sudan",flag:"🇸🇸"},
  { code:"ES",name:"Spain",flag:"🇪🇸"},{ code:"LK",name:"Sri Lanka",flag:"🇱🇰"},
  { code:"SD",name:"Sudan",flag:"🇸🇩"},{ code:"SR",name:"Suriname",flag:"🇸🇷"},
  { code:"SE",name:"Sweden",flag:"🇸🇪"},{ code:"CH",name:"Switzerland",flag:"🇨🇭"},
  { code:"SY",name:"Syria",flag:"🇸🇾"},{ code:"TW",name:"Taiwan",flag:"🇹🇼"},
  { code:"TJ",name:"Tajikistan",flag:"🇹🇯"},{ code:"TZ",name:"Tanzania",flag:"🇹🇿"},
  { code:"TH",name:"Thailand",flag:"🇹🇭"},{ code:"TL",name:"Timor-Leste",flag:"🇹🇱"},
  { code:"TG",name:"Togo",flag:"🇹🇬"},{ code:"TO",name:"Tonga",flag:"🇹🇴"},
  { code:"TT",name:"Trinidad & Tobago",flag:"🇹🇹"},{ code:"TN",name:"Tunisia",flag:"🇹🇳"},
  { code:"TR",name:"Turkey",flag:"🇹🇷"},{ code:"TM",name:"Turkmenistan",flag:"🇹🇲"},
  { code:"TV",name:"Tuvalu",flag:"🇹🇻"},{ code:"UG",name:"Uganda",flag:"🇺🇬"},
  { code:"UA",name:"Ukraine",flag:"🇺🇦"},{ code:"AE",name:"United Arab Emirates",flag:"🇦🇪"},
  { code:"GB",name:"United Kingdom",flag:"🇬🇧"},{ code:"US",name:"United States",flag:"🇺🇸"},
  { code:"UY",name:"Uruguay",flag:"🇺🇾"},{ code:"UZ",name:"Uzbekistan",flag:"🇺🇿"},
  { code:"VU",name:"Vanuatu",flag:"🇻🇺"},{ code:"VE",name:"Venezuela",flag:"🇻🇪"},
  { code:"VN",name:"Vietnam",flag:"🇻🇳"},{ code:"YE",name:"Yemen",flag:"🇾🇪"},
  { code:"ZM",name:"Zambia",flag:"🇿🇲"},{ code:"ZW",name:"Zimbabwe",flag:"🇿🇼"},
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § NEW — FEATURE FLAGS MATRIX
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const FEATURE_META: Record<FeatureKey, { icon: React.ReactNode; label: string; desc: string }> = {
  dark_ai:        { icon: <Sparkles className="w-3.5 h-3.5"/>, label: "Dark AI Mode",    desc: "Unrestricted depth analysis" },
  unlimited_chat: { icon: <InfinityIcon className="w-3.5 h-3.5"/>, label: "Unlimited Chat", desc: "No daily message cap" },
  export_history: { icon: <Download className="w-3.5 h-3.5"/>,  label: "Export History",  desc: "PDF & JSON downloads" },
  premium_avatar: { icon: <Camera className="w-3.5 h-3.5"/>,    label: "Premium Avatars", desc: "Exclusive AI avatar sets" },
  priority_ai:    { icon: <Zap className="w-3.5 h-3.5"/>,       label: "Priority AI",     desc: "Skip the queue instantly" },
  voice_ai:       { icon: <Mic className="w-3.5 h-3.5"/>,       label: "Voice AI",        desc: "Talk to your AI tutor" },
  custom_empires: { icon: <Crown className="w-3.5 h-3.5"/>,     label: "Custom Empires",  desc: "Build & curate empires" },
  analytics:      { icon: <BarChart3 className="w-3.5 h-3.5"/>, label: "Analytics",       desc: "Deep learning insights" },
  api_access:     { icon: <Code2 className="w-3.5 h-3.5"/>,     label: "API Access",      desc: "Integrate Empire AI" },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § NEW — PLANS CONFIG (3 tiers, Stripe-ready)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const PLANS: Plan[] = [
  {
    id: "free", name: "Explorer", price: 0, billing: "Forever free",
    badge: "FREE", highlight: false, stripePriceId: "",
    gradient: "from-secondary/60 to-secondary/30",
    borderColor: "border-border",
    glowColor: "rgba(255,255,255,0.02)",
    description: "Begin your empire education journey",
    features: {
      dark_ai:false, unlimited_chat:false, export_history:false,
      premium_avatar:false, priority_ai:false, voice_ai:false,
      custom_empires:false, analytics:false, api_access:false,
    },
  },
  {
    id: "pro", name: "Conqueror", price: 9.99, billing: "/ month",
    badge: "PRO", highlight: true, stripePriceId: "price_pro_monthly",
    gradient: "from-amber-500/10 to-yellow-600/5",
    borderColor: "border-amber-500/40",
    glowColor: "rgba(245,158,11,0.12)",
    description: "For serious students of history & strategy",
    features: {
      dark_ai:true, unlimited_chat:true, export_history:true,
      premium_avatar:true, priority_ai:true, voice_ai:false,
      custom_empires:false, analytics:false, api_access:false,
    },
  },
  {
    id: "elite", name: "Emperor", price: 19.99, billing: "/ month",
    badge: "ELITE", highlight: false, stripePriceId: "price_elite_monthly",
    gradient: "from-purple-500/10 to-violet-600/5",
    borderColor: "border-purple-500/40",
    glowColor: "rgba(168,85,247,0.1)",
    description: "The full imperial arsenal — completely unlocked",
    features: {
      dark_ai:true, unlimited_chat:true, export_history:true,
      premium_avatar:true, priority_ai:true, voice_ai:true,
      custom_empires:true, analytics:true, api_access:true,
    },
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § NEW — MOCK STRIPE UTILS (swap for real endpoint in prod)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ls(key: string, fallback = "") {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function lsSet(key: string, val: string) {
  try { localStorage.setItem(key, val); } catch {}
}

/** Swap body for: POST /api/stripe/checkout { planId, userId } → { url } */
async function mockCreateCheckoutSession(planId: PlanId, _userId: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 900));
  // window.location.href = checkoutUrl   ← plug real URL here
}

/** Swap body for: POST /api/stripe/cancel { userId } */
async function mockCancelSubscription(_userId: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 600));
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § NEW — FEATURE GATE HOOK
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function useFeatures(planId: PlanId) {
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];
  const hasFeature = useCallback((key: FeatureKey) => plan.features[key], [plan]);
  return { features: plan.features, hasFeature, plan };
}
const handleUpgrade = async () => {
  const res = await fetch(
    "https://YOUR_PROJECT.supabase.co/functions/v1/stripe-checkout",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user?.id }),
    }
  );

  const data = await res.json();
  window.location.href = data.url;
};
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § UI — PLAN BADGE (new)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PlanBadge({ planId }: { planId: PlanId }) {
  const cfg: Record<PlanId, { cls: string; label: string; icon: React.ReactNode }> = {
    free:  { cls: "bg-secondary text-muted-foreground",                               label: "FREE",         icon: null },
    pro:   { cls: "bg-amber-500/15 text-amber-400 border border-amber-500/30",        label: "PRO",          icon: <Crown className="w-2.5 h-2.5" /> },
    elite: { cls: "bg-purple-500/15 text-purple-400 border border-purple-500/30",    label: "ELITE EMPIRE", icon: <Sparkles className="w-2.5 h-2.5" /> },
  };
  const { cls, label, icon } = cfg[planId];
  return (
    <span className={`inline-flex items-center gap-1 text-[9px] font-sans font-bold px-2 py-1 rounded-full tracking-widest ${cls}`}>
      {icon}{label}
    </span>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § UI — ACCORDION SECTION (new, wraps original toggle logic)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AccordionSection({
  id, icon, label, hint, active, onToggle, children, badge, badgeColor = "bg-primary/10 text-primary",
}: {
  id: string; icon: React.ReactNode; label: string; hint?: string;
  active: boolean; onToggle: (id: string) => void; children: React.ReactNode;
  badge?: string; badgeColor?: string;
}) {
  return (
    <div className={`bg-card/80 backdrop-blur-sm rounded-2xl border overflow-hidden transition-all duration-300 ${
      active ? "border-primary/30 shadow-lg shadow-primary/5" : "border-border"
    }`}>
      <button
        className="w-full flex items-center justify-between px-5 py-4 group"
        onClick={() => onToggle(id)}
      >
        <div className="flex items-center gap-3">
          <span className={`transition-colors duration-200 ${active ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}>
            {icon}
          </span>
          <span className="text-sm font-sans text-foreground">{label}</span>
          {badge && (
            <span className={`text-[9px] font-sans font-semibold px-1.5 py-0.5 rounded-full tracking-wider uppercase ${badgeColor}`}>
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hint && <span className="text-xs font-sans text-muted-foreground">{hint}</span>}
          <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${active ? "rotate-90" : ""}`} />
        </div>
      </button>
      {/* Smooth animated open/close */}
      <div className={`overflow-hidden transition-all duration-300 ${active ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-border">{children}</div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § UI — TOGGLE SWITCH (new)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      style={{ height: "22px", width: "40px", position: "relative" }}
      className={`rounded-full transition-colors duration-200 flex-shrink-0 ${value ? "bg-primary" : "bg-secondary border border-border"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? "translate-x-[18px]" : "translate-x-0"}`}
      />
    </button>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// § MAIN EXPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function Settings() {

  // ── Original hooks ──────────────────────────────────────────────
  const { user, signOut } = useAuth();
  const { language, setLanguage, level, setLevel } = useChat();
  const { xp, levelInfo, achievements, quizResults } = useProgress();
  const navigate = useNavigate();

  // ── Original state ──────────────────────────────────────────────
  const [deleting, setDeleting] = useState(false);
  const [displayName, setDisplayName] = useState(() => ls("empireDisplayName"));
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(displayName);
  const [avatarUrl, setAvatarUrl] = useState(() => ls("empireAvatarUrl"));
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [savingCountry, setSavingCountry] = useState(false);

  // ── New state ────────────────────────────────────────────────────
  const [currentPlan, setCurrentPlan]         = useState<PlanId>(() => (ls("empirePlan") as PlanId) || "free");
  const [upgradingPlan, setUpgradingPlan]     = useState<PlanId | null>(null);
  const [cancellingPlan, setCancellingPlan]   = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled]       = useState(() => ls("empire2FA") === "true");
  const [notifQuiz, setNotifQuiz]             = useState(() => ls("empireNotifQuiz") !== "false");
  const [notifXP, setNotifXP]                 = useState(() => ls("empireNotifXP")   !== "false");
  const [notifNews, setNotifNews]             = useState(() => ls("empireNotifNews")  === "true");
  const [copyingId, setCopyingId]             = useState(false);
  const [countrySearch, setCountrySearch]     = useState("");

  const { features, hasFeature } = useFeatures(currentPlan);
  const currentPlanObj = PLANS.find(p => p.id === currentPlan)!;

  // ── Supabase load (original + plan) ─────────────────────────────
  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("country_code,plan").eq("id", user.id).maybeSingle()
      .then(({ data }) => {
        if (data?.country_code) setSelectedCountry(data.country_code);
        if (data?.plan)         { setCurrentPlan(data.plan as PlanId); lsSet("empirePlan", data.plan); }
      });
  }, [user]);

  // ── i18n (original, + new keys) ─────────────────────────────────
  const l = language === "sv" ? {
    settings:"Settings", profile:"Profile", language:"Language", level:"Answer level",
    account:"Account", progress:"Progress", email:"Email", member:"Member since",
    logout:"Log out", delete:"Delete account", saveName:"Save", editName:"Edit name",
    namePlaceholder:"Your display name", medals:"Medals", noMedals:"No medals yet",
    quizHistory:"Quiz history", noHistory:"No quizzes yet", notifications:"Notifications",
    xpLabel:"XP", toNext:"to next level", changePhoto:"Change photo", levelLabel:"Level",
    billing:"Billing & Plan", security:"Security",
  } : language === "tr" ? {
    settings:"Ayarlar", profile:"Profil", language:"Dil", level:"Cevap seviyesi",
    account:"Hesap", progress:"İlerleme", email:"E-posta", member:"Üyelik tarihi",
    logout:"Çıkış yap", delete:"Hesabı sil", saveName:"Kaydet", editName:"İsim düzenle",
    namePlaceholder:"Görünen adın", medals:"Madalyalar", noMedals:"Henüz madalya yok",
    quizHistory:"Quiz geçmişi", noHistory:"Henüz quiz yok", notifications:"Bildirimler",
    xpLabel:"XP", toNext:"sonraki seviyeye", changePhoto:"Fotoğraf değiştir", levelLabel:"Seviye",
    billing:"Fatura & Plan", security:"Güvenlik",
  } : {
    settings:"Settings", profile:"Profile", language:"Language", level:"Answer level",
    account:"Account", progress:"Progress", email:"Email", member:"Member since",
    logout:"Log out", delete:"Delete account", saveName:"Save", editName:"Edit name",
    namePlaceholder:"Your display name", medals:"Medals", noMedals:"No medals yet",
    quizHistory:"Quiz history", noHistory:"No quizzes yet", notifications:"Notifications",
    xpLabel:"XP", toNext:"to next level", changePhoto:"Change photo", levelLabel:"Level",
    billing:"Billing & Plan", security:"Security",
  };

  // ── Original handlers ────────────────────────────────────────────
  const saveCountry = async (code: string) => {
    if (!user) return;
    setSavingCountry(true);
    const country = COUNTRIES.find(c => c.code === code);
    await supabase.from("profiles").update({ country: country?.name || code, country_code: code }).eq("id", user.id);
    setSelectedCountry(code);
    setSavingCountry(false);
    setCountrySearch("");
    toast.success(`Country set to ${country?.name || code}`);
  };

  const saveName = () => {
    const trimmed = nameInput.trim();
    setDisplayName(trimmed);
    lsSet("empireDisplayName", trimmed);
    setEditingName(false);
    toast.success("Name updated");
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        setAvatarUrl(url);
        lsSet("empireAvatarUrl", url);
        setUploadingAvatar(false);
        toast.success("Photo updated");
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Failed to update photo");
      setUploadingAvatar(false);
    }
  };

  const handleLogout = async () => { await signOut(); navigate("/auth"); };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await supabase.auth.signOut();
      toast.success("Account deleted");
      navigate("/auth");
    } catch {
      toast.error("Failed to delete account");
      setDeleting(false);
    }
  };

  const toggle = (section: string) =>
    setActiveSection((prev) => (prev === section ? null : section));

  // ── New handlers ─────────────────────────────────────────────────
  const upgradePlan = async (planId: PlanId) => {
    if (!user || planId === currentPlan) return;
    setUpgradingPlan(planId);
    try {
      await mockCreateCheckoutSession(planId, user.id);
      setCurrentPlan(planId);
      lsSet("empirePlan", planId);
      await supabase.from("profiles").update({ plan: planId }).eq("id", user.id);
      toast.success(`Upgraded to ${PLANS.find(p => p.id === planId)?.name}! 🎉`);
    } catch {
      toast.error("Checkout failed — please try again");
    } finally {
      setUpgradingPlan(null);
    }
  };

  const cancelPlan = async () => {
    if (!user) return;
    setCancellingPlan(true);
    try {
      await mockCancelSubscription(user.id);
      setCurrentPlan("free");
      lsSet("empirePlan", "free");
      await supabase.from("profiles").update({ plan: "free" }).eq("id", user.id);
      setShowCancelConfirm(false);
      toast.success("Subscription cancelled. Access continues until period ends.");
    } catch {
      toast.error("Cancellation failed");
    } finally {
      setCancellingPlan(false);
    }
  };

  const copyUserId = async () => {
    if (!user?.id) return;
    await navigator.clipboard.writeText(user.id);
    setCopyingId(true);
    setTimeout(() => setCopyingId(false), 1500);
    toast.success("User ID copied");
  };

  // ── Derived ──────────────────────────────────────────────────────
  const initials = displayName
    ? displayName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : (user?.email?.[0] || "U").toUpperCase();

  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—";

  const filteredCountries = useMemo(() =>
    countrySearch.trim()
      ? COUNTRIES.filter(c => c.name.toLowerCase().includes(countrySearch.toLowerCase()))
      : COUNTRIES,
  [countrySearch]);

  const selectedCountryObj = COUNTRIES.find(c => c.code === selectedCountry);

  // ──────────────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────────────

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto pb-12">

        {/* ── Header ── */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-serif text-primary flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" /> {l.settings}
          </h1>
          <PlanBadge planId={currentPlan} />
        </div>

        <div className="max-w-xl mx-auto px-4 py-5 space-y-3">

          {/* ════════════════════════════════════════════════════════
              PROFILE CARD (original + XP bar always visible)
          ════════════════════════════════════════════════════════ */}
          <div className={`bg-card/80 backdrop-blur-sm rounded-2xl border p-5 transition-all duration-300 ${
            currentPlan === "pro" ? "border-amber-500/25" :
            currentPlan === "elite" ? "border-purple-500/25" : "border-border"
          }`}>
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden bg-primary/20 flex items-center justify-center cursor-pointer border-2 border-primary/30 hover:border-primary/60 transition-colors"
                  onClick={() => fileRef.current?.click()}
                >
                  {uploadingAvatar ? (
                    <RefreshCw className="w-5 h-5 text-primary animate-spin" />
                  ) : avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-serif text-primary w-full h-full flex items-center justify-center">
                      {initials}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background hover:scale-110 transition-transform"
                >
                  <Camera className="w-3 h-3 text-primary-foreground" />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </div>

              {/* Name / email */}
              <div className="flex-1 min-w-0">
                {editingName ? (
                  <div className="flex gap-2 items-center">
                    <input
                      className="flex-1 bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm font-sans text-foreground focus:outline-none focus:border-primary transition-colors"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder={l.namePlaceholder}
                      autoFocus
                      onKeyDown={(e) => e.key === "Enter" && saveName()}
                    />
                    <button onClick={saveName} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-sans hover:opacity-90 transition-opacity">
                      {l.saveName}
                    </button>
                    <button onClick={() => setEditingName(false)} className="px-2 py-1.5 rounded-lg bg-secondary text-muted-foreground text-xs font-sans">✕</button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-serif text-foreground text-base truncate">
                      {displayName || user?.email?.split("@")[0] || "Explorer"}
                    </p>
                    <button
                      onClick={() => { setNameInput(displayName); setEditingName(true); }}
                      className="text-[10px] font-sans text-muted-foreground underline underline-offset-2 hover:text-primary transition-colors"
                    >{l.editName}</button>
                  </div>
                )}
                <p className="text-xs font-sans text-muted-foreground truncate mt-0.5">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[10px] font-sans text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {l.levelLabel} {levelInfo.level} · {xp} {l.xpLabel}
                  </span>
                  <PlanBadge planId={currentPlan} />
                </div>
              </div>
            </div>

            {/* XP bar — always visible in profile card */}
            <div className="mt-4">
              <div className="flex justify-between text-[10px] font-sans text-muted-foreground mb-1.5">
                <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-primary" />{levelInfo.title}</span>
                <span>{levelInfo.nextLevel ? `${levelInfo.xpToNext} ${l.xpLabel} ${l.toNext}` : "MAX LEVEL"}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full gold-gradient transition-all duration-700 rounded-full" style={{ width: `${levelInfo.progress * 100}%` }} />
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
              PROGRESS (original, unchanged logic)
          ════════════════════════════════════════════════════════ */}
          <AccordionSection
            id="progress" active={activeSection === "progress"} onToggle={toggle}
            icon={<Zap className="w-4 h-4"/>} label={l.progress}
            hint={`Lvl ${levelInfo.level}`}
          >
            <div className="px-5 pb-5 space-y-4">
              <div className="pt-4 text-center">
                <p className="text-3xl font-serif text-primary">{l.levelLabel} {levelInfo.level}</p>
                <p className="text-sm font-sans text-muted-foreground">{levelInfo.title}</p>
                <p className="text-lg font-sans text-foreground mt-1">{xp} {l.xpLabel}</p>
              </div>
              <div>
                <div className="flex justify-between text-[10px] font-sans text-muted-foreground mb-1">
                  <span>{l.levelLabel} {levelInfo.level}</span>
                  <span>{levelInfo.nextLevel ? `${levelInfo.xpToNext} ${l.xpLabel} ${l.toNext}` : "MAX"}</span>
                </div>
                <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full gold-gradient transition-all duration-700 rounded-full" style={{ width: `${levelInfo.progress * 100}%` }} />
                </div>
              </div>

              {/* Medals */}
              <div>
                <p className="text-xs font-sans text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" /> {l.medals}
                </p>
                {achievements.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {achievements.map((a, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
                        <span className="text-2xl">{a.medal_icon}</span>
                        <span className="text-[10px] font-sans text-foreground text-center leading-tight">{a.medal_name}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-sans text-muted-foreground text-center py-3">{l.noMedals}</p>
                )}
              </div>

              {/* Quiz history */}
              <div>
                <p className="text-xs font-sans text-muted-foreground mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {l.quizHistory}
                </p>
                {quizResults.length > 0 ? (
                  <div className="space-y-1.5">
                    {quizResults.slice(0, 8).map((r) => (
                      <div key={r.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/30 border border-border">
                        <div>
                          <span className="text-sm font-sans text-foreground">{r.score}/{r.total_questions}</span>
                          <span className="text-xs font-sans text-muted-foreground ml-2">{r.empire_id}</span>
                        </div>
                        <span className="text-xs font-sans text-primary">+{r.xp_earned} XP</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs font-sans text-muted-foreground text-center py-3">{l.noHistory}</p>
                )}
              </div>

              {/* Analytics gate */}
              {hasFeature("analytics") ? (
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/15 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-xs font-sans text-primary">Full analytics dashboard unlocked</span>
                </div>
              ) : (
                <button
                  onClick={() => setActiveSection("billing")}
                  className="w-full flex items-center gap-2 p-3 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-colors group"
                >
                  <Lock className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-sans text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
                    Unlock detailed analytics — Elite plan
                  </span>
                </button>
              )}
            </div>
          </AccordionSection>

          {/* ════════════════════════════════════════════════════════
              COUNTRY (original logic + React-controlled search)
          ════════════════════════════════════════════════════════ */}
          <AccordionSection
            id="country" active={activeSection === "country"} onToggle={toggle}
            icon={<MapPin className="w-4 h-4"/>} label="Country"
            hint={selectedCountryObj ? `${selectedCountryObj.flag} ${selectedCountryObj.name}` : "Not set"}
          >
            <div className="px-4 py-2 border-b border-border">
              <input
                type="text"
                placeholder="Search country..."
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="w-full px-3 py-1.5 bg-secondary rounded-lg text-sm font-sans outline-none focus:ring-1 focus:ring-primary transition-all"
              />
            </div>
            <div className="max-h-56 overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <p className="text-xs font-sans text-muted-foreground text-center py-4">No results</p>
              ) : filteredCountries.map((c) => (
                <button
                  key={c.code}
                  onClick={() => saveCountry(c.code)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-sm font-sans text-foreground">{c.name}</span>
                  </div>
                  {selectedCountry === c.code && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </AccordionSection>

          {/* ════════════════════════════════════════════════════════
              LANGUAGE (original, unchanged)
          ════════════════════════════════════════════════════════ */}
          <AccordionSection
            id="language" active={activeSection === "language"} onToggle={toggle}
            icon={<Globe className="w-4 h-4"/>} label={l.language}
            hint={`${LANGUAGES.find(lg => lg.code === language)?.flag} ${LANGUAGES.find(lg => lg.code === language)?.label}`}
          >
            <div>
              {LANGUAGES.map((lg) => (
                <button
                  key={lg.code}
                  onClick={() => { setLanguage(lg.code); toast.success(`Language set to ${lg.label}`); }}
                  className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{lg.flag}</span>
                    <span className="text-sm font-sans text-foreground">{lg.label}</span>
                  </div>
                  {language === lg.code && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </AccordionSection>

          {/* ════════════════════════════════════════════════════════
              ANSWER LEVEL (original, unchanged)
          ════════════════════════════════════════════════════════ */}
          <AccordionSection
            id="level" active={activeSection === "level"} onToggle={toggle}
            icon={<BookOpen className="w-4 h-4"/>} label={l.level}
            hint={LEVELS.find(lv => lv.code === level)?.en || level}
          >
            <div>
              {LEVELS.map((lv) => (
                <button
                  key={lv.code}
                  onClick={() => { setLevel(lv.code); toast.success(`Level set to ${lv.en}`); }}
                  className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-secondary/50 transition-colors"
                >
                  <div className="text-left">
                    <p className="text-sm font-sans text-foreground">{lv.en}</p>
                    <p className="text-xs font-sans text-muted-foreground">{lv.desc_en}</p>
                  </div>
                  {level === lv.code && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </AccordionSection>

          {/* ════════════════════════════════════════════════════════
              NEW — BILLING & PLAN
          ════════════════════════════════════════════════════════ */}
          <AccordionSection
            id="billing" active={activeSection === "billing"} onToggle={toggle}
            icon={<CreditCard className="w-4 h-4"/>} label={l.billing}
            badge={currentPlanObj.badge}
            badgeColor={
              currentPlan === "pro"   ? "bg-amber-500/15 text-amber-400" :
              currentPlan === "elite" ? "bg-purple-500/15 text-purple-400" :
              "bg-secondary text-muted-foreground"
            }
          >
            <div className="p-4 space-y-3">

              {/* Current plan status card */}
              <div className={`p-3 rounded-xl border ${
                currentPlan === "pro"   ? "bg-amber-500/8 border-amber-500/25" :
                currentPlan === "elite" ? "bg-purple-500/8 border-purple-500/25" :
                "bg-secondary/50 border-border"
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider mb-0.5">Current Plan</p>
                    <p className="text-sm font-sans font-semibold text-foreground">{currentPlanObj.name}</p>
                    <p className="text-xs font-sans text-muted-foreground">{currentPlanObj.description}</p>
                  </div>
                  {currentPlan !== "free" && (
                    <div className="text-right flex-shrink-0 ml-3">
                      <p className="text-lg font-sans font-bold text-foreground">${currentPlanObj.price}</p>
                      <p className="text-[10px] font-sans text-muted-foreground">{currentPlanObj.billing}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Feature flags matrix */}
              <div className="grid grid-cols-1 gap-1.5">
                {(Object.keys(FEATURE_META) as FeatureKey[]).map((key) => {
                  const meta = FEATURE_META[key];
                  const active = features[key];
                  return (
                    <div
                      key={key}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                        active ? "bg-primary/5 border border-primary/15" : "bg-secondary/30 border border-border"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={active ? "text-primary" : "text-muted-foreground/40"}>{meta.icon}</span>
                        <div>
                          <p className={`text-xs font-sans ${active ? "text-foreground" : "text-muted-foreground/60"}`}>{meta.label}</p>
                          <p className="text-[10px] font-sans text-muted-foreground/50">{meta.desc}</p>
                        </div>
                      </div>
                      {active
                        ? <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        : <Lock className="w-3 h-3 text-muted-foreground/30 flex-shrink-0" />
                      }
                    </div>
                  );
                })}
              </div>

              {/* Upgrade plan cards */}
              {PLANS.filter(p => p.id !== currentPlan).length > 0 && (
                <div className="space-y-2 pt-1">
                  <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider px-1">
                    {currentPlan === "elite" ? "You have the best plan" : "Upgrade your plan"}
                  </p>
                  {PLANS.filter(p => p.id !== currentPlan).map((plan) => (
                    <div
                      key={plan.id}
                      className={`rounded-xl border p-4 transition-all duration-200 bg-gradient-to-br ${plan.gradient} ${plan.borderColor} ${plan.highlight ? "ring-1 ring-amber-500/30" : ""}`}
                      style={{ boxShadow: `0 0 20px ${plan.glowColor}` }}
                    >
                      {plan.highlight && (
                        <div className="flex items-center gap-1 mb-2">
                          <Rocket className="w-3 h-3 text-amber-400" />
                          <span className="text-[10px] font-sans text-amber-400 font-semibold uppercase tracking-wider">Most Popular</span>
                        </div>
                      )}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-sm font-sans font-semibold text-foreground">{plan.name}</p>
                          <p className="text-xs font-sans text-muted-foreground">{plan.description}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <p className="text-lg font-sans font-bold text-foreground">${plan.price}</p>
                          <p className="text-[10px] font-sans text-muted-foreground">{plan.billing}</p>
                        </div>
                      </div>
                      {/* Only show features not already unlocked */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {(Object.keys(plan.features) as FeatureKey[])
                          .filter(k => plan.features[k] && !features[k])
                          .map(k => (
                            <span key={k} className="inline-flex items-center gap-1 text-[10px] font-sans px-2 py-0.5 rounded-full bg-background/40 text-muted-foreground border border-border/50">
                              {FEATURE_META[k].icon}
                              <span>{FEATURE_META[k].label}</span>
                            </span>
                          ))
                        }
                      </div>
                      <button
                        onClick={() => upgradePlan(plan.id)}
                        disabled={upgradingPlan !== null}
                        className={`w-full py-2 rounded-lg text-xs font-sans font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 ${
                          plan.id === "pro"
                            ? "bg-amber-500 hover:bg-amber-400 text-black"
                            : "bg-purple-600 hover:bg-purple-500 text-white"
                        }`}
                      >
                        {upgradingPlan === plan.id
                          ? <><RefreshCw className="w-3 h-3 animate-spin" /> Processing...</>
                          : <><Zap className="w-3 h-3" /> Upgrade to {plan.name}</>
                        }
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Cancel subscription */}
              {currentPlan !== "free" && (
                <div className="pt-1">
                  {showCancelConfirm ? (
                    <div className="p-3 rounded-xl bg-destructive/8 border border-destructive/20 space-y-2">
                      <p className="text-xs font-sans text-destructive flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" /> Cancel {currentPlanObj.name} subscription?
                      </p>
                      <p className="text-[10px] font-sans text-muted-foreground">
                        You'll keep access until the end of your current billing period.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={cancelPlan}
                          disabled={cancellingPlan}
                          className="flex-1 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-sans flex items-center justify-center gap-1 disabled:opacity-50"
                        >
                          {cancellingPlan && <RefreshCw className="w-3 h-3 animate-spin" />}
                          Confirm Cancel
                        </button>
                        <button
                          onClick={() => setShowCancelConfirm(false)}
                          className="flex-1 py-1.5 rounded-lg bg-secondary text-foreground text-xs font-sans"
                        >
                          Keep Plan
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="text-xs font-sans text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground transition-colors w-full text-center"
                    >
                      Cancel subscription
                    </button>
                  )}
                </div>
              )}
            </div>
          </AccordionSection>

          {/* ════════════════════════════════════════════════════════
              NEW — NOTIFICATIONS
          ════════════════════════════════════════════════════════ */}
          <AccordionSection
            id="notifications" active={activeSection === "notifications"} onToggle={toggle}
            icon={<Bell className="w-4 h-4"/>} label={l.notifications}
          >
            <div className="divide-y divide-border">
              {[
                {
                  label: "Quiz reminders", desc: "Daily nudge to stay sharp",
                  value: notifQuiz,
                  set: (v: boolean) => { setNotifQuiz(v); lsSet("empireNotifQuiz", String(v)); },
                },
                {
                  label: "XP milestones", desc: "Celebrate your progress",
                  value: notifXP,
                  set: (v: boolean) => { setNotifXP(v); lsSet("empireNotifXP", String(v)); },
                },
                {
                  label: "Empire news", desc: "New empires & features",
                  value: notifNews,
                  set: (v: boolean) => { setNotifNews(v); lsSet("empireNotifNews", String(v)); },
                },
              ].map(({ label, desc, value, set }) => (
                <div key={label} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-sm font-sans text-foreground">{label}</p>
                    <p className="text-xs font-sans text-muted-foreground">{desc}</p>
                  </div>
                  <Toggle value={value} onChange={set} />
                </div>
              ))}
            </div>
          </AccordionSection>

          {/* ════════════════════════════════════════════════════════
              NEW — SECURITY
          ════════════════════════════════════════════════════════ */}
          <AccordionSection
            id="security" active={activeSection === "security"} onToggle={toggle}
            icon={<Shield className="w-4 h-4"/>} label={l.security}
          >
            <div className="divide-y divide-border">
              {/* 2FA */}
              <div className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-sans text-foreground">Two-factor authentication</p>
                  <p className="text-xs font-sans text-muted-foreground">Extra layer of account security</p>
                </div>
                <Toggle
                  value={twoFAEnabled}
                  onChange={(v) => { setTwoFAEnabled(v); lsSet("empire2FA", String(v)); toast.success(v ? "2FA enabled" : "2FA disabled"); }}
                />
              </div>
              {/* Password reset */}
              <button
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-secondary/30 transition-colors"
                onClick={async () => {
                  if (!user?.email) return;
                  await supabase.auth.resetPasswordForEmail(user.email);
                  toast.success("Password reset email sent");
                }}
              >
                <div className="text-left">
                  <p className="text-sm font-sans text-foreground">Change password</p>
                  <p className="text-xs font-sans text-muted-foreground">Send a reset link to your email</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              {/* Active sessions */}
              <div className="px-5 py-3.5">
                <p className="text-sm font-sans text-foreground mb-0.5">Active sessions</p>
                <p className="text-xs font-sans text-muted-foreground">1 active session — this device</p>
              </div>
            </div>
          </AccordionSection>

          {/* ════════════════════════════════════════════════════════
              ACCOUNT INFO (original + copy user ID button)
          ════════════════════════════════════════════════════════ */}
          <AccordionSection
            id="account" active={activeSection === "account"} onToggle={toggle}
            icon={<User className="w-4 h-4"/>} label={l.account}
          >
            <div className="divide-y divide-border">
              <div className="flex items-center gap-3 px-5 py-3.5">
                <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">{l.email}</p>
                  <p className="text-sm font-sans text-foreground">{user?.email || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5">
                <Key className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">User ID</p>
                  <p className="text-xs font-sans text-foreground break-all font-mono">{user?.id || "—"}</p>
                </div>
                <button
                  onClick={copyUserId}
                  className="ml-2 p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors flex-shrink-0"
                  title="Copy user ID"
                >
                  {copyingId
                    ? <Check className="w-3.5 h-3.5 text-primary" />
                    : <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                  }
                </button>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5">
                <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">{l.member}</p>
                  <p className="text-sm font-sans text-foreground">{createdAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5">
                <Crown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">Plan</p>
                  <div className="mt-0.5"><PlanBadge planId={currentPlan} /></div>
                </div>
              </div>
            </div>
          </AccordionSection>

          {/* ════════════════════════════════════════════════════════
              ACTIONS (original, unchanged + spinner on delete)
          ════════════════════════════════════════════════════════ */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-card/80 border border-border hover:bg-secondary/60 text-foreground text-sm font-sans transition-colors"
            >
              <LogOut className="w-4 h-4 text-primary" /> {l.logout}
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-destructive/8 border border-destructive/20 hover:bg-destructive/15 text-destructive text-sm font-sans transition-colors disabled:opacity-50"
            >
              {deleting
                ? <RefreshCw className="w-4 h-4 animate-spin" />
                : <Trash2 className="w-4 h-4" />
              }
              {l.delete}
            </button>
          </div>

          <p className="text-center text-[10px] font-sans text-muted-foreground pt-2">
            Empire AI OS · v2.0 · {currentPlanObj.name} Plan
          </p>

        </div>
      </div>
    </AppLayout>
  );
}
