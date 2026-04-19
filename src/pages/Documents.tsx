import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import {
  BookOpen, Send, FolderOpen, Crown, Clock, CheckCircle,
  XCircle, Search, Filter, ChevronDown, Plus, X, Scroll,
  Feather, Library, Eye, Trash2, AlertCircle, Sparkles,
  Globe, FileText, Calendar, User, Shield, ChevronRight,
  ArrowLeft,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type DocStatus = "pending" | "approved" | "rejected";
type TabId = "explore" | "submit" | "mine" | "admin";

interface Document {
  id: string;
  title: string;
  content: string;
  empire_id: string;
  status: DocStatus;
  user_id: string;
  author_name?: string;
  created_at: string;
  reviewed_at?: string;
  rejection_reason?: string;
}

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────

const ALL_EMPIRES = [
  { id: "ottoman",           label: "Ottoman Empire",       flag: "🕌", color: "#C8A96E" },
  { id: "roman",             label: "Roman Empire",         flag: "🏛️", color: "#D4AF37" },
  { id: "islamic_caliphate", label: "Islamic Caliphate",    flag: "☪️", color: "#1D9E75" },
  { id: "mongol_empire",     label: "Mongol Empire",        flag: "⚔️", color: "#D85A30" },
  { id: "ancient_egypt",     label: "Ancient Egypt",        flag: "𓂀", color: "#E8A030" },
  { id: "british_empire",    label: "British Empire",       flag: "👑", color: "#378ADD" },
  { id: "japanese_empire",   label: "Japanese Empire",      flag: "⛩️", color: "#D4537E" },
  { id: "mali_empire",       label: "Mali Empire",          flag: "🌍", color: "#639922" },
  { id: "seljuk_empire",     label: "Seljuk Empire",        flag: "🗡️", color: "#BA7517" },
];

const empireInfo = (id: string) => ALL_EMPIRES.find(e => e.id === id) || { id, label: id, flag: "🏛️", color: "#D4AF37" };

const STATUS_CONFIG: Record<DocStatus, { label: string; color: string; bg: string; icon: any }> = {
  pending:  { label: "Pending Review",  color: "#E8A030", bg: "rgba(232,160,48,0.12)",  icon: Clock },
  approved: { label: "Approved",        color: "#1D9E75", bg: "rgba(29,158,117,0.12)", icon: CheckCircle },
  rejected: { label: "Rejected",        color: "#D85A30", bg: "rgba(216,90,48,0.12)",  icon: XCircle },
};

const L = {
  sv: {
    title: "Historiskt Arkiv", subtitle: "Dokumenterat av Gemenskapen",
    explore: "Utforska", submit: "Bidra", mine: "Mina Dokument", admin: "Admin",
    search: "Sök dokument...", filterEmpire: "Filtrera efter imperium",
    allEmpires: "Alla Imperier", noApproved: "Inga godkända dokument ännu.",
    noApprovedSub: "Var den första att bidra med historisk kunskap!",
    submitTitle: "Bidra med ett Dokument", submitSub: "Dela din historiska kunskap med gemenskapen",
    docTitle: "Dokumentets titel", docTitlePlaceholder: "Ex: Osmanska rikets handelssystem...",
    docContent: "Innehåll", docContentPlaceholder: "Skriv ditt historiska dokument här...",
    empire: "Imperium", submitBtn: "Skicka in Dokument",
    submitSuccess: "Ditt dokument är inskickat och väntar på granskning.",
    myDocs: "Mina Inskickade Dokument", noMyDocs: "Du har inte skickat in några dokument än.",
    pendingAdmin: "Väntar på Granskning", noAdminDocs: "Inga dokument väntar på granskning.",
    approve: "Godkänn", reject: "Neka", readMore: "Läs mer", collapse: "Minimera",
    writtenBy: "Skrivet av", submittedOn: "Inskickat",
    chars: "tecken", minChars: "Minst 100 tecken krävs",
    titleRequired: "Titel krävs", empireRequired: "Välj ett imperium",
  },
  en: {
    title: "Historical Archive", subtitle: "Documented by the Community",
    explore: "Explore", submit: "Contribute", mine: "My Documents", admin: "Admin",
    search: "Search documents...", filterEmpire: "Filter by empire",
    allEmpires: "All Empires", noApproved: "No approved documents yet.",
    noApprovedSub: "Be the first to contribute historical knowledge!",
    submitTitle: "Contribute a Document", submitSub: "Share your historical knowledge with the community",
    docTitle: "Document Title", docTitlePlaceholder: "E.g. The Ottoman trade system...",
    docContent: "Content", docContentPlaceholder: "Write your historical document here...",
    empire: "Empire", submitBtn: "Submit Document",
    submitSuccess: "Your document has been submitted and is awaiting review.",
    myDocs: "My Submitted Documents", noMyDocs: "You haven't submitted any documents yet.",
    pendingAdmin: "Awaiting Review", noAdminDocs: "No documents awaiting review.",
    approve: "Approve", reject: "Reject", readMore: "Read more", collapse: "Collapse",
    writtenBy: "Written by", submittedOn: "Submitted",
    chars: "characters", minChars: "Minimum 100 characters required",
    titleRequired: "Title required", empireRequired: "Select an empire",
  },
  tr: {
    title: "Tarihsel Arşiv", subtitle: "Topluluk Tarafından Belgelenmiş",
    explore: "Keşfet", submit: "Katkıda Bulun", mine: "Belgelerim", admin: "Admin",
    search: "Belge ara...", filterEmpire: "İmparatorluğa göre filtrele",
    allEmpires: "Tüm İmparatorluklar", noApproved: "Henüz onaylı belge yok.",
    noApprovedSub: "Tarihsel bilgi katkısında ilk sen ol!",
    submitTitle: "Belge Katkısı", submitSub: "Tarihsel bilginizi toplulukla paylaşın",
    docTitle: "Belge Başlığı", docTitlePlaceholder: "Örn: Osmanlı ticaret sistemi...",
    docContent: "İçerik", docContentPlaceholder: "Tarihsel belgenizi buraya yazın...",
    empire: "İmparatorluk", submitBtn: "Belgeyi Gönder",
    submitSuccess: "Belgeniz gönderildi ve inceleme bekliyor.",
    myDocs: "Gönderilen Belgelerim", noMyDocs: "Henüz belge göndermediniz.",
    pendingAdmin: "İnceleme Bekliyor", noAdminDocs: "İnceleme bekleyen belge yok.",
    approve: "Onayla", reject: "Reddet", readMore: "Devamını oku", collapse: "Daralt",
    writtenBy: "Yazan", submittedOn: "Gönderildi",
    chars: "karakter", minChars: "En az 100 karakter gerekli",
    titleRequired: "Başlık gerekli", empireRequired: "Bir imparatorluk seçin",
  },
};

// ─────────────────────────────────────────────────────────────
// MOCK DATA (replace with Supabase queries when table is ready)
// ─────────────────────────────────────────────────────────────

const MOCK_APPROVED: Document[] = [
  {
    id: "1", title: "The Ottoman Devshirme System and Its Legacy",
    content: "The devshirme system, often called 'blood tax', was a practice of the Ottoman Empire in which boys from Christian families were taken to be trained as Ottoman soldiers and administrators. This complex institution shaped the empire for centuries, creating some of its greatest leaders including Suleiman the Magnificent's Grand Vizier Ibrahim Pasha. The system was both a mechanism of control and an unexpected ladder of social mobility, transforming rural Christian boys into the empire's elite Janissary corps and bureaucratic class.\n\nThe long-term consequences of this system reverberate through Balkan history, Ottoman administrative culture, and questions of identity and belonging that scholars continue to debate today.",
    empire_id: "ottoman", status: "approved", user_id: "u1",
    author_name: "A. Kowalski", created_at: "2025-03-15T10:30:00Z",
  },
  {
    id: "2", title: "Roman Engineering: The Aqueduct as Political Symbol",
    content: "Roman aqueducts were more than feats of engineering — they were declarations of imperial power made tangible in stone and water. When Rome brought fresh water to a conquered city, it was simultaneously demonstrating technological superiority and asserting permanent dominion. The 11 aqueducts serving Rome at the height of the empire delivered approximately 1.2 million cubic meters of water per day, transforming public bathing, sanitation, and urban life.\n\nRecent archaeological studies have revealed sophisticated maintenance networks and repair protocols that kept these systems operational for centuries. The Aqua Virgo, built by Agrippa in 19 BCE, still feeds the Trevi Fountain today — a continuity of function spanning two millennia.",
    empire_id: "roman", status: "approved", user_id: "u2",
    author_name: "M. Bernhardt", created_at: "2025-02-28T14:20:00Z",
  },
  {
    id: "3", title: "The House of Wisdom: Translating the Ancient World",
    content: "The Bayt al-Hikmah in ninth-century Baghdad was not merely a library but a vast translation project that saved classical knowledge from oblivion. Under Caliph al-Ma'mun, scholars translated Greek, Persian, Indian, and Syriac texts into Arabic, creating a synthesis of world knowledge unprecedented in history. The mathematician Al-Khwarizmi worked here, developing the algebra that still bears Arabic's imprint in its very name. Physicians like Hunayn ibn Ishaq translated Galen and produced original medical treatises. This accumulated knowledge would later flow back to Europe through Toledo and Palermo, seeding the European Renaissance.",
    empire_id: "islamic_caliphate", status: "approved", user_id: "u3",
    author_name: "F. Al-Rashid", created_at: "2025-04-01T09:15:00Z",
  },
];

// ─────────────────────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: DocStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}33` }}>
      <Icon className="w-3 h-3"/>
      {cfg.label}
    </span>
  );
}

function EmpireBadge({ id }: { id: string }) {
  const e = empireInfo(id);
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
      style={{ color: e.color, background: `${e.color}18`, border: `1px solid ${e.color}33` }}>
      {e.flag} {e.label}
    </span>
  );
}

function EmptyState({ icon: Icon, title, sub }: { icon: any; title: string; sub?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-5">
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)",
          border: "1px solid rgba(212,175,55,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon className="w-7 h-7" style={{ color: "rgba(212,175,55,0.5)" }}/>
        </div>
        <div style={{
          position: "absolute", inset: -8, borderRadius: "50%",
          border: "1px dashed rgba(212,175,55,0.12)",
          animation: "spin 20s linear infinite",
        }}/>
      </div>
      <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.1rem", color: "rgba(237,224,196,0.6)", marginBottom: 6 }}>
        {title}
      </p>
      {sub && <p style={{ fontSize: "0.78rem", color: "rgba(237,224,196,0.3)", maxWidth: 300, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DOCUMENT CARD
// ─────────────────────────────────────────────────────────────

function DocumentCard({
  doc, lang, showStatus = false, actions, expanded, onToggle,
}: {
  doc: Document; lang: string; showStatus?: boolean;
  actions?: React.ReactNode; expanded?: boolean; onToggle?: () => void;
}) {
  const t = L[lang as keyof typeof L] || L.en;
  const e = empireInfo(doc.empire_id);
  const preview = doc.content.slice(0, 220);
  const hasMore = doc.content.length > 220;
  const dateStr = new Date(doc.created_at).toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });

  return (
    <div className="doc-card group" style={{
      background: "linear-gradient(145deg, rgba(15,10,5,0.9), rgba(20,14,8,0.85))",
      border: "1px solid rgba(212,175,55,0.18)",
      borderRadius: 20,
      overflow: "hidden",
      transition: "all 0.35s ease",
      position: "relative",
    }}>
      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${e.color}88, transparent)` }}/>

      {/* Illuminated corner ornament */}
      <div style={{
        position: "absolute", top: 10, right: 12,
        fontSize: "1.4rem", opacity: 0.12,
        fontFamily: "serif",
        pointerEvents: "none",
      }}>
        {e.flag}
      </div>

      <div style={{ padding: "20px 22px" }}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 style={{
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "1.05rem",
            fontWeight: 600,
            color: "#EDE0C4",
            lineHeight: 1.3,
            flex: 1,
          }}>
            {doc.title}
          </h3>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <EmpireBadge id={doc.empire_id}/>
          {showStatus && <StatusBadge status={doc.status}/>}
        </div>

        {/* Content preview */}
        <p style={{
          fontSize: "0.82rem",
          color: "rgba(237,224,196,0.55)",
          lineHeight: 1.75,
          letterSpacing: "0.01em",
          fontFamily: "'Raleway', sans-serif",
        }}>
          {expanded ? doc.content : preview}
          {!expanded && hasMore && "..."}
        </p>

        {/* Toggle expand */}
        {hasMore && (
          <button onClick={onToggle}
            className="flex items-center gap-1 mt-2 text-xs transition-opacity hover:opacity-100"
            style={{ color: "rgba(212,175,55,0.6)", fontFamily: "'Cinzel', serif", letterSpacing: "0.08em" }}>
            {expanded ? <><ChevronDown className="w-3 h-3 rotate-180"/> {t.collapse}</> : <><ChevronRight className="w-3 h-3"/> {t.readMore}</>}
          </button>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-between mt-4 pt-3"
          style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}>
          <div className="flex items-center gap-3">
            {doc.author_name && (
              <span className="flex items-center gap-1.5" style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.35)" }}>
                <User className="w-3 h-3"/>
                {doc.author_name}
              </span>
            )}
            <span className="flex items-center gap-1.5" style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.3)" }}>
              <Calendar className="w-3 h-3"/>
              {dateStr}
            </span>
          </div>
          {actions}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────

export default function Documents() {
  const { language, setLanguage } = useChat();
  const { user, isAdmin } = useAuth();
  const lang = (language as keyof typeof L) in L ? (language as keyof typeof L) : "en";
  const t = L[lang];

  // Tabs
  const [activeTab, setActiveTab] = useState<TabId>("explore");

  // Explore state
  const [approved, setApproved] = useState<Document[]>(MOCK_APPROVED);
  const [filterEmpire, setFilterEmpire] = useState("all");
  const [searchQ, setSearchQ] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Submit state
  const [form, setForm] = useState({ title: "", content: "", empire_id: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // My docs state
  const [myDocs, setMyDocs] = useState<Document[]>([]);
  const [loadingMy, setLoadingMy] = useState(false);

  // Admin state
  const [pendingDocs, setPendingDocs] = useState<Document[]>([]);
  const [loadingPending, setLoadingPending] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Loading
  const [loadingApproved, setLoadingApproved] = useState(false);

  // ── LOAD APPROVED ──────────────────────────────────────
  const loadApproved = useCallback(async () => {
    setLoadingApproved(true);
    try {
      const { data } = await supabase
        .from("documents")
        .select("*, profiles(display_name)")
        .eq("status", "approved")
        .order("created_at", { ascending: false });
      if (data) {
        setApproved(data.map((d: any) => ({ ...d, author_name: d.profiles?.display_name })));
      }
    } catch {
      // fallback to mock
      setApproved(MOCK_APPROVED);
    }
    setLoadingApproved(false);
  }, []);

  // ── LOAD MY DOCS ───────────────────────────────────────
  const loadMyDocs = useCallback(async () => {
    if (!user) return;
    setLoadingMy(true);
    try {
      const { data } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setMyDocs((data || []) as Document[]);
    } catch { setMyDocs([]); }
    setLoadingMy(false);
  }, [user]);

  // ── LOAD PENDING (admin) ───────────────────────────────
  const loadPending = useCallback(async () => {
    if (!isAdmin) return;
    setLoadingPending(true);
    try {
      const { data } = await supabase
        .from("documents")
        .select("*, profiles(display_name)")
        .eq("status", "pending")
        .order("created_at", { ascending: false });
      if (data) {
        setPendingDocs(data.map((d: any) => ({ ...d, author_name: d.profiles?.display_name })));
      }
    } catch { setPendingDocs([]); }
    setLoadingPending(false);
  }, [isAdmin]);

  useEffect(() => { loadApproved(); }, [loadApproved]);
  useEffect(() => { if (activeTab === "mine") loadMyDocs(); }, [activeTab, loadMyDocs]);
  useEffect(() => { if (activeTab === "admin") loadPending(); }, [activeTab, loadPending]);

  // ── SUBMIT ─────────────────────────────────────────────
  const handleSubmit = async () => {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = t.titleRequired;
    if (form.content.trim().length < 100) errors.content = t.minChars;
    if (!form.empire_id) errors.empire_id = t.empireRequired;
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    setSubmitting(true);
    try {
      const { data: profile } = await supabase.from("profiles").select("display_name").eq("id", user?.id).single();
      await supabase.from("documents").insert({
        title: form.title.trim(),
        content: form.content.trim(),
        empire_id: form.empire_id,
        user_id: user?.id,
        author_name: profile?.display_name || user?.email?.split("@")[0] || "Anonymous",
        status: "pending",
      });
      setSubmitSuccess(true);
      setForm({ title: "", content: "", empire_id: "" });
      setFormErrors({});
      setTimeout(() => setSubmitSuccess(false), 6000);
    } catch { /* handle error */ }
    setSubmitting(false);
  };

  // ── ADMIN ACTIONS ──────────────────────────────────────
  const reviewDoc = async (id: string, action: "approve" | "reject") => {
    setProcessingId(id);
    const status: DocStatus = action === "approve" ? "approved" : "rejected";
    await supabase.from("documents").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id);
    setPendingDocs(prev => prev.filter(d => d.id !== id));
    if (status === "approved") loadApproved();
    setProcessingId(null);
  };

  // ── FILTERED DOCS ──────────────────────────────────────
  const filteredApproved = approved.filter(d => {
    const matchEmpire = filterEmpire === "all" || d.empire_id === filterEmpire;
    const matchSearch = !searchQ || d.title.toLowerCase().includes(searchQ.toLowerCase()) ||
      d.content.toLowerCase().includes(searchQ.toLowerCase());
    return matchEmpire && matchSearch;
  });

  // ── TABS CONFIG ────────────────────────────────────────
  const TABS: { id: TabId; label: string; icon: any; badge?: number; adminOnly?: boolean }[] = [
    { id: "explore", label: t.explore, icon: Library },
    { id: "submit",  label: t.submit,  icon: Feather },
    { id: "mine",    label: t.mine,    icon: FolderOpen, badge: myDocs.length },
    ...(isAdmin ? [{ id: "admin" as TabId, label: t.admin, icon: Crown, badge: pendingDocs.length, adminOnly: true }] : []),
  ];

  // ─────────────────────────────────────────────────────────
  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Cinzel:wght@400;500;600&family=Raleway:wght@300;400;500&display=swap');

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes shimmer { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.1)} 50%{box-shadow:0 0 40px rgba(212,175,55,0.25)} }

        .doc-card:hover {
          border-color: rgba(212,175,55,0.35) !important;
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.08);
        }
        .doc-card { animation: fadeSlideUp 0.5s ease both; }

        .submit-input {
          background: rgba(15,10,5,0.6);
          border: 1px solid rgba(212,175,55,0.2);
          border-radius: 14px;
          color: #EDE0C4;
          font-family: 'Raleway', sans-serif;
          font-size: 0.875rem;
          width: 100%;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
        }
        .submit-input:focus {
          border-color: rgba(212,175,55,0.5);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.08);
        }
        .submit-input::placeholder { color: rgba(237,224,196,0.25); }

        .empire-pill {
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 0.72rem;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }
        .empire-pill:hover { transform: translateY(-1px); }

        .tab-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 18px; border-radius: 12px;
          font-family: 'Cinzel', serif; font-size: 0.72rem;
          letter-spacing: 0.1em; transition: all 0.2s;
          white-space: nowrap; position: relative;
          border: 1px solid transparent;
        }
        .tab-btn.active {
          background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(184,144,30,0.1));
          border-color: rgba(212,175,55,0.35);
          color: #D4AF37;
        }
        .tab-btn:not(.active) { color: rgba(237,224,196,0.45); }
        .tab-btn:not(.active):hover { color: rgba(237,224,196,0.75); background: rgba(212,175,55,0.06); }

        .gold-btn {
          background: linear-gradient(135deg, #C9A227, #D4AF37, #E8CC55, #B8901E);
          color: #08050F; font-weight: 600;
          border: none; border-radius: 14px;
          box-shadow: 0 4px 20px rgba(212,175,55,0.3);
          transition: all 0.2s; cursor: pointer;
          font-family: 'Cinzel', serif; letter-spacing: 0.1em;
          position: relative; overflow: hidden;
        }
        .gold-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(212,175,55,0.45); }
        .gold-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

        .approve-btn {
          background: rgba(29,158,117,0.12); border: 1px solid rgba(29,158,117,0.3);
          color: #1D9E75; border-radius: 10px; padding: 6px 14px;
          font-size: 0.75rem; cursor: pointer; transition: all 0.2s;
          font-family: 'Cinzel', serif; letter-spacing: 0.08em;
          display: flex; align-items: center; gap: 5px;
        }
        .approve-btn:hover { background: rgba(29,158,117,0.22); transform: translateY(-1px); }

        .reject-btn {
          background: rgba(216,90,48,0.1); border: 1px solid rgba(216,90,48,0.25);
          color: #D85A30; border-radius: 10px; padding: 6px 14px;
          font-size: 0.75rem; cursor: pointer; transition: all 0.2s;
          font-family: 'Cinzel', serif; letter-spacing: 0.08em;
          display: flex; align-items: center; gap: 5px;
        }
        .reject-btn:hover { background: rgba(216,90,48,0.2); transform: translateY(-1px); }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.25); border-radius: 2px; }
      `}</style>

      <div style={{ minHeight: "100vh", color: "#EDE0C4", fontFamily: "'Raleway', sans-serif" }}>

        {/* ── HERO HEADER ───────────────────────────────── */}
        <div style={{
          position: "relative", overflow: "hidden",
          padding: "40px 24px 0",
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.1), transparent 70%)",
        }}>
          {/* Decorative scrollwork */}
          <div style={{
            position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
            width: 200, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
          }}/>

          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", paddingBottom: 28 }}>
            {/* Icon */}
            <div style={{
              width: 56, height: 56, borderRadius: "50%", margin: "0 auto 16px",
              background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "glowPulse 4s ease-in-out infinite",
            }}>
              <Scroll className="w-6 h-6" style={{ color: "#D4AF37" }}/>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "clamp(1.8rem,5vw,3rem)",
              fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.01em",
              background: "linear-gradient(135deg, #F0D060, #D4AF37, #B8901E, #E8CC55)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              marginBottom: 8,
            }}>
              {t.title}
            </h1>
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: "0.62rem",
              letterSpacing: "0.35em", color: "rgba(212,175,55,0.45)",
              textTransform: "uppercase", marginBottom: 4,
            }}>
              ✦ {t.subtitle} ✦
            </p>
            <p style={{ fontSize: "0.8rem", color: "rgba(237,224,196,0.4)", marginTop: 8, lineHeight: 1.6 }}>
              {lang === "sv"
                ? "En levande samling av historisk kunskap, skapad av vår gemenskap av historiker och entusiaster."
                : lang === "tr"
                ? "Tarihçiler ve meraklılardan oluşan topluluğumuz tarafından oluşturulan canlı bir tarihsel bilgi koleksiyonu."
                : "A living collection of historical knowledge, created by our community of historians and enthusiasts."}
            </p>

            {/* Stats bar */}
            <div className="flex items-center justify-center gap-6 mt-5 flex-wrap">
              {[
                { label: lang === "sv" ? "Godkända" : lang === "tr" ? "Onaylı" : "Approved", value: approved.length },
                { label: lang === "sv" ? "Imperier" : lang === "tr" ? "İmparatorluk" : "Empires", value: ALL_EMPIRES.length },
                { label: lang === "sv" ? "Bidragsgivare" : lang === "tr" ? "Katkıda Bulunan" : "Contributors", value: new Set(approved.map(d => d.user_id)).size },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.5rem", color: "#D4AF37" }}>{value}</div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(237,224,196,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)" }}/>
        </div>

        {/* ── TABS ──────────────────────────────────────── */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 16px 0" }}>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {TABS.map(({ id, label, icon: Icon, badge, adminOnly }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`tab-btn ${activeTab === id ? "active" : ""}`}
                style={adminOnly ? {
                  background: activeTab === id ? "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(147,51,234,0.1))" : undefined,
                  borderColor: activeTab === id ? "rgba(168,85,247,0.4)" : undefined,
                  color: activeTab === id ? "#a855f7" : undefined,
                } : {}}>
                <Icon className="w-3.5 h-3.5"/>
                {label}
                {badge !== undefined && badge > 0 && (
                  <span style={{
                    background: adminOnly ? "rgba(168,85,247,0.3)" : "rgba(212,175,55,0.25)",
                    color: adminOnly ? "#c084fc" : "#D4AF37",
                    borderRadius: 10, padding: "1px 7px",
                    fontSize: "0.6rem", fontFamily: "monospace",
                  }}>{badge}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── CONTENT ───────────────────────────────────── */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px 60px" }}>

          {/* ════════════════════════════════════════════
              EXPLORE TAB
          ════════════════════════════════════════════ */}
          {activeTab === "explore" && (
            <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>
              {/* Search & filter */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div style={{ position: "relative", flex: 1 }}>
                  <Search style={{
                    position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                    width: 16, height: 16, color: "rgba(212,175,55,0.4)",
                  }}/>
                  <input value={searchQ} onChange={e => setSearchQ(e.target.value)}
                    placeholder={t.search}
                    className="submit-input"
                    style={{ padding: "10px 14px 10px 38px" }}/>
                </div>
                <div style={{ position: "relative" }}>
                  <select value={filterEmpire} onChange={e => setFilterEmpire(e.target.value)}
                    className="submit-input"
                    style={{ padding: "10px 36px 10px 14px", appearance: "none", cursor: "pointer", minWidth: 180 }}>
                    <option value="all">{t.allEmpires}</option>
                    {ALL_EMPIRES.map(e => (
                      <option key={e.id} value={e.id}>{e.flag} {e.label}</option>
                    ))}
                  </select>
                  <ChevronDown style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    width: 14, height: 14, color: "rgba(212,175,55,0.4)", pointerEvents: "none",
                  }}/>
                </div>
              </div>

              {/* Empire pills */}
              <div className="flex gap-2 flex-wrap mb-6">
                <button
                  onClick={() => setFilterEmpire("all")}
                  className="empire-pill"
                  style={{
                    background: filterEmpire === "all" ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)",
                    borderColor: filterEmpire === "all" ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.08)",
                    color: filterEmpire === "all" ? "#D4AF37" : "rgba(237,224,196,0.4)",
                  }}>
                  <Globe className="w-3 h-3"/> {t.allEmpires}
                </button>
                {ALL_EMPIRES.map(e => (
                  <button key={e.id} onClick={() => setFilterEmpire(e.id)}
                    className="empire-pill"
                    style={{
                      background: filterEmpire === e.id ? `${e.color}18` : "rgba(255,255,255,0.04)",
                      borderColor: filterEmpire === e.id ? `${e.color}55` : "rgba(255,255,255,0.08)",
                      color: filterEmpire === e.id ? e.color : "rgba(237,224,196,0.4)",
                    }}>
                    {e.flag} {e.label.split(" ")[0]}
                    {allQuizCount(e.id) > 0 && <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>({approved.filter(d => d.empire_id === e.id).length})</span>}
                  </button>
                ))}
              </div>

              {/* Documents grid */}
              {loadingApproved ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} style={{ background: "rgba(15,10,5,0.6)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 20, padding: 22, animation: "shimmer 1.5s ease infinite" }}>
                      <div style={{ height: 16, background: "rgba(212,175,55,0.08)", borderRadius: 8, width: "60%", marginBottom: 12 }}/>
                      <div style={{ height: 10, background: "rgba(212,175,55,0.05)", borderRadius: 6, marginBottom: 8 }}/>
                      <div style={{ height: 10, background: "rgba(212,175,55,0.05)", borderRadius: 6, width: "80%" }}/>
                    </div>
                  ))}
                </div>
              ) : filteredApproved.length === 0 ? (
                <EmptyState icon={Library} title={t.noApproved} sub={t.noApprovedSub}/>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredApproved.map((doc, i) => (
                    <div key={doc.id} style={{ animationDelay: `${i * 60}ms` }}>
                      <DocumentCard
                        doc={doc} lang={lang}
                        expanded={expandedId === doc.id}
                        onToggle={() => setExpandedId(expandedId === doc.id ? null : doc.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════
              SUBMIT TAB
          ════════════════════════════════════════════ */}
          {activeTab === "submit" && (
            <div style={{ animation: "fadeSlideUp 0.4s ease both", maxWidth: 620, margin: "0 auto" }}>
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%", margin: "0 auto 14px",
                  background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Feather className="w-5 h-5" style={{ color: "#D4AF37" }}/>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.6rem", color: "#EDE0C4", marginBottom: 6 }}>
                  {t.submitTitle}
                </h2>
                <p style={{ fontSize: "0.8rem", color: "rgba(237,224,196,0.4)", lineHeight: 1.6 }}>
                  {t.submitSub}
                </p>
              </div>

              {!user ? (
                <div style={{
                  textAlign: "center", padding: "48px 24px",
                  background: "rgba(15,10,5,0.6)", border: "1px solid rgba(212,175,55,0.15)", borderRadius: 20,
                }}>
                  <AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: "rgba(212,175,55,0.4)" }}/>
                  <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.1rem", color: "rgba(237,224,196,0.7)", marginBottom: 6 }}>
                    {lang === "sv" ? "Logga in för att bidra" : lang === "tr" ? "Katkıda bulunmak için giriş yapın" : "Sign in to contribute"}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(237,224,196,0.35)" }}>
                    {lang === "sv" ? "Skapa ett konto eller logga in för att skicka in ditt historiska dokument." : lang === "tr" ? "Tarihsel belgenizi göndermek için hesap oluşturun veya giriş yapın." : "Create an account or sign in to submit your historical document."}
                  </p>
                </div>
              ) : submitSuccess ? (
                <div style={{
                  textAlign: "center", padding: "48px 24px",
                  background: "rgba(29,158,117,0.08)", border: "1px solid rgba(29,158,117,0.3)", borderRadius: 20,
                  animation: "fadeSlideUp 0.4s ease",
                }}>
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#1D9E75" }}/>
                  <p style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.2rem", color: "#1D9E75", marginBottom: 8 }}>
                    {lang === "sv" ? "Dokument inskickat!" : lang === "tr" ? "Belge gönderildi!" : "Document submitted!"}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "rgba(237,224,196,0.5)", lineHeight: 1.6 }}>{t.submitSuccess}</p>
                </div>
              ) : (
                <div style={{
                  background: "linear-gradient(145deg, rgba(15,10,5,0.9), rgba(20,14,8,0.85))",
                  border: "1px solid rgba(212,175,55,0.2)", borderRadius: 24, padding: 28,
                }}>
                  <div style={{ height: 2, background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)", marginBottom: 24, borderRadius: 1 }}/>

                  {/* Title */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "rgba(212,175,55,0.7)", marginBottom: 8, fontFamily: "'Cinzel', serif", letterSpacing: "0.15em" }}>
                      {t.docTitle.toUpperCase()}
                    </label>
                    <input
                      value={form.title}
                      onChange={e => { setForm(p => ({ ...p, title: e.target.value })); setFormErrors(p => ({ ...p, title: "" })); }}
                      placeholder={t.docTitlePlaceholder}
                      className="submit-input"
                      style={{ padding: "11px 14px" }}/>
                    {formErrors.title && (
                      <p style={{ fontSize: "0.72rem", color: "#D85A30", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <AlertCircle style={{ width: 12, height: 12 }}/> {formErrors.title}
                      </p>
                    )}
                  </div>

                  {/* Empire */}
                  <div style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "rgba(212,175,55,0.7)", marginBottom: 8, fontFamily: "'Cinzel', serif", letterSpacing: "0.15em" }}>
                      {t.empire.toUpperCase()}
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={form.empire_id}
                        onChange={e => { setForm(p => ({ ...p, empire_id: e.target.value })); setFormErrors(p => ({ ...p, empire_id: "" })); }}
                        className="submit-input"
                        style={{ padding: "11px 36px 11px 14px", appearance: "none", cursor: "pointer" }}>
                        <option value="">— {lang === "sv" ? "Välj ett imperium" : lang === "tr" ? "Bir imparatorluk seçin" : "Select an empire"} —</option>
                        {ALL_EMPIRES.map(e => (
                          <option key={e.id} value={e.id}>{e.flag} {e.label}</option>
                        ))}
                      </select>
                      <ChevronDown style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, color: "rgba(212,175,55,0.4)", pointerEvents: "none" }}/>
                    </div>
                    {formErrors.empire_id && (
                      <p style={{ fontSize: "0.72rem", color: "#D85A30", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                        <AlertCircle style={{ width: 12, height: 12 }}/> {formErrors.empire_id}
                      </p>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ display: "block", fontSize: "0.72rem", color: "rgba(212,175,55,0.7)", marginBottom: 8, fontFamily: "'Cinzel', serif", letterSpacing: "0.15em" }}>
                      {t.docContent.toUpperCase()}
                    </label>
                    <textarea
                      value={form.content}
                      onChange={e => { setForm(p => ({ ...p, content: e.target.value })); setFormErrors(p => ({ ...p, content: "" })); }}
                      placeholder={t.docContentPlaceholder}
                      className="submit-input"
                      style={{ padding: "11px 14px", minHeight: 200, resize: "vertical", lineHeight: 1.7 }}/>
                    <div className="flex items-center justify-between mt-1.5">
                      {formErrors.content ? (
                        <p style={{ fontSize: "0.72rem", color: "#D85A30", display: "flex", alignItems: "center", gap: 4 }}>
                          <AlertCircle style={{ width: 12, height: 12 }}/> {formErrors.content}
                        </p>
                      ) : <div/>}
                      <span style={{
                        fontSize: "0.68rem",
                        color: form.content.length < 100 ? "rgba(216,90,48,0.7)" : "rgba(29,158,117,0.7)",
                      }}>
                        {form.content.length} {t.chars}
                      </span>
                    </div>
                  </div>

                  {/* Guidelines */}
                  <div style={{
                    padding: "12px 14px", borderRadius: 12, marginBottom: 20,
                    background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.12)",
                  }}>
                    <p style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.45)", lineHeight: 1.65 }}>
                      <span style={{ color: "#D4AF37" }}>
                        {lang === "sv" ? "Riktlinjer:" : lang === "tr" ? "Kurallar:" : "Guidelines:"}
                      </span>{" "}
                      {lang === "sv"
                        ? "Bidra med originalt, faktabaserat historiskt innehåll. Inga kopior från Wikipedia. Dokument granskas av moderatorer innan publicering."
                        : lang === "tr"
                        ? "Özgün, gerçeğe dayalı tarihsel içerik katkısında bulunun. Wikipedia kopyaları kabul edilmez. Belgeler yayınlanmadan önce moderatörler tarafından incelenir."
                        : "Contribute original, factual historical content. No Wikipedia copies. Documents are reviewed by moderators before publication."}
                    </p>
                  </div>

                  {/* Submit button */}
                  <button onClick={handleSubmit} disabled={submitting}
                    className="gold-btn"
                    style={{ width: "100%", padding: "13px 20px", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    {submitting
                      ? <><div style={{ width: 16, height: 16, border: "2px solid rgba(0,0,0,0.3)", borderTopColor: "#08050F", borderRadius: "50%", animation: "spin 0.7s linear infinite" }}/> {lang === "sv" ? "Skickar..." : lang === "tr" ? "Gönderiliyor..." : "Submitting..."}</>
                      : <><Send className="w-4 h-4"/> {t.submitBtn}</>}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════
              MY DOCUMENTS TAB
          ════════════════════════════════════════════ */}
          {activeTab === "mine" && (
            <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>
              <div className="flex items-center justify-between mb-5">
                <h2 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.4rem", color: "#EDE0C4" }}>
                  {t.myDocs}
                </h2>
                <button onClick={() => setActiveTab("submit")}
                  className="flex items-center gap-2"
                  style={{
                    background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)",
                    color: "#D4AF37", borderRadius: 10, padding: "7px 14px",
                    fontSize: "0.72rem", cursor: "pointer",
                    fontFamily: "'Cinzel', serif", letterSpacing: "0.08em",
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "all 0.2s",
                  }}>
                  <Plus className="w-3.5 h-3.5"/> {lang === "sv" ? "Nytt Dokument" : lang === "tr" ? "Yeni Belge" : "New Document"}
                </button>
              </div>

              {!user ? (
                <EmptyState icon={FolderOpen} title={lang === "sv" ? "Logga in för att se dina dokument" : lang === "tr" ? "Belgelerinizi görmek için giriş yapın" : "Sign in to see your documents"}/>
              ) : loadingMy ? (
                <div className="space-y-3">
                  {[1,2,3].map(i => (
                    <div key={i} style={{ background: "rgba(15,10,5,0.6)", border: "1px solid rgba(212,175,55,0.1)", borderRadius: 16, padding: 18, animation: "shimmer 1.5s ease infinite" }}>
                      <div style={{ height: 14, background: "rgba(212,175,55,0.07)", borderRadius: 6, width: "50%", marginBottom: 10 }}/>
                      <div style={{ height: 10, background: "rgba(212,175,55,0.04)", borderRadius: 5 }}/>
                    </div>
                  ))}
                </div>
              ) : myDocs.length === 0 ? (
                <EmptyState icon={FolderOpen} title={t.noMyDocs}
                  sub={lang === "sv" ? "Klicka på 'Nytt Dokument' för att börja bidra." : lang === "tr" ? "Katkıda bulunmaya başlamak için 'Yeni Belge'ye tıklayın." : "Click 'New Document' to start contributing."}/>
              ) : (
                <div className="space-y-3">
                  {myDocs.map((doc, i) => (
                    <div key={doc.id} style={{ animationDelay: `${i * 50}ms`, animation: "fadeSlideUp 0.4s ease both" }}>
                      <DocumentCard doc={doc} lang={lang} showStatus
                        expanded={expandedId === doc.id}
                        onToggle={() => setExpandedId(expandedId === doc.id ? null : doc.id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ════════════════════════════════════════════
              ADMIN TAB
          ════════════════════════════════════════════ */}
          {activeTab === "admin" && isAdmin && (
            <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>
              {/* Admin header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 20,
                padding: "14px 18px", borderRadius: 16,
                background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(147,51,234,0.06))",
                border: "1px solid rgba(168,85,247,0.25)",
              }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Crown className="w-4 h-4" style={{ color: "#a855f7" }}/>
                </div>
                <div>
                  <p style={{ fontFamily: "'Cinzel', serif", fontSize: "0.75rem", color: "#a855f7", letterSpacing: "0.12em" }}>
                    ADMIN — {t.pendingAdmin.toUpperCase()}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "rgba(237,224,196,0.4)", marginTop: 2 }}>
                    {pendingDocs.length} {lang === "sv" ? "dokument väntar på granskning" : lang === "tr" ? "belge inceleme bekliyor" : "documents awaiting review"}
                  </p>
                </div>
              </div>

              {loadingPending ? (
                <div className="space-y-3">
                  {[1,2].map(i => (
                    <div key={i} style={{ background: "rgba(15,10,5,0.6)", border: "1px solid rgba(168,85,247,0.1)", borderRadius: 16, padding: 18, animation: "shimmer 1.5s ease infinite" }}>
                      <div style={{ height: 14, background: "rgba(168,85,247,0.07)", borderRadius: 6, width: "50%", marginBottom: 10 }}/>
                      <div style={{ height: 10, background: "rgba(168,85,247,0.04)", borderRadius: 5 }}/>
                    </div>
                  ))}
                </div>
              ) : pendingDocs.length === 0 ? (
                <EmptyState icon={Shield}
                  title={t.noAdminDocs}
                  sub={lang === "sv" ? "Alla dokument är granskade. Bra jobbat!" : lang === "tr" ? "Tüm belgeler incelendi. Harika iş!" : "All documents have been reviewed. Great work!"}/>
              ) : (
                <div className="space-y-4">
                  {pendingDocs.map((doc, i) => {
                    const e = empireInfo(doc.empire_id);
                    const isProcessing = processingId === doc.id;
                    return (
                      <div key={doc.id} style={{
                        animationDelay: `${i * 60}ms`, animation: "fadeSlideUp 0.4s ease both",
                        background: "linear-gradient(145deg, rgba(15,10,5,0.9), rgba(20,14,8,0.85))",
                        border: "1px solid rgba(168,85,247,0.2)", borderRadius: 20, overflow: "hidden",
                        opacity: isProcessing ? 0.6 : 1, transition: "opacity 0.3s",
                      }}>
                        <div style={{ height: 2, background: `linear-gradient(90deg, transparent, ${e.color}66, transparent)` }}/>
                        <div style={{ padding: "18px 20px" }}>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1rem", color: "#EDE0C4", marginBottom: 8, lineHeight: 1.3 }}>
                                {doc.title}
                              </h3>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <EmpireBadge id={doc.empire_id}/>
                                {doc.author_name && (
                                  <span style={{ fontSize: "0.7rem", color: "rgba(237,224,196,0.35)", display: "flex", alignItems: "center", gap: 4 }}>
                                    <User style={{ width: 11, height: 11 }}/> {doc.author_name}
                                  </span>
                                )}
                                <span style={{ fontSize: "0.7rem", color: "rgba(237,224,196,0.3)", display: "flex", alignItems: "center", gap: 4 }}>
                                  <Calendar style={{ width: 11, height: 11 }}/> {new Date(doc.created_at).toLocaleDateString("en-GB")}
                                </span>
                              </div>
                              <p style={{ fontSize: "0.81rem", color: "rgba(237,224,196,0.5)", lineHeight: 1.7, letterSpacing: "0.01em" }}>
                                {doc.content.slice(0, 300)}{doc.content.length > 300 && "..."}
                              </p>
                            </div>
                          </div>

                          {/* Review buttons */}
                          <div style={{ borderTop: "1px solid rgba(212,175,55,0.1)", paddingTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                            <button
                              onClick={() => reviewDoc(doc.id, "approve")}
                              disabled={isProcessing}
                              className="approve-btn">
                              {isProcessing
                                ? <div style={{ width: 12, height: 12, border: "2px solid rgba(29,158,117,0.3)", borderTopColor: "#1D9E75", borderRadius: "50%", animation: "spin 0.7s linear infinite" }}/>
                                : <CheckCircle className="w-3.5 h-3.5"/>}
                              {t.approve}
                            </button>
                            <button
                              onClick={() => reviewDoc(doc.id, "reject")}
                              disabled={isProcessing}
                              className="reject-btn">
                              <XCircle className="w-3.5 h-3.5"/>
                              {t.reject}
                            </button>
                            <div style={{ flex: 1 }}/>
                            <span style={{
                              fontSize: "0.68rem", color: "rgba(168,85,247,0.6)",
                              display: "flex", alignItems: "center", gap: 4,
                              background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)",
                              borderRadius: 8, padding: "4px 10px",
                            }}>
                              <Clock style={{ width: 11, height: 11 }}/> {lang === "sv" ? "Väntar" : lang === "tr" ? "Bekliyor" : "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </AppLayout>
  );
}

// Helper (avoids import of allQuizCount)
function allQuizCount(empireId: string) { return 0; }
