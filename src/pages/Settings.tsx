import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useProgress } from "@/hooks/useProgress";
import { supabase } from "@/integrations/supabase/client";
import {
  Settings as SettingsIcon, User, LogOut, Trash2, Mail, Key,
  Calendar, Zap, Trophy, Clock, Globe, BookOpen, Camera,
  ChevronRight, Check, Shield, Bell, Palette, MapPin,
} from "lucide-react";
import { toast } from "sonner";
 
const LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "sv", label: "Svenska", flag: "🇸🇪" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
];
 
const LEVELS = [
  { code: "brief", en: "Brief", sv: "Kort", tr: "Kısa", desc_en: "Short answers, fast reading", desc_sv: "Korta svar, snabb läsning", desc_tr: "Kısa cevaplar" },
  { code: "deep", en: "In-depth", sv: "Fördjupad", tr: "Derinlemesine", desc_en: "Detailed explanations", desc_sv: "Detaljerade förklaringar", desc_tr: "Detaylı açıklamalar" },
  { code: "academic", en: "Academic", sv: "Gymnasienivå", tr: "Akademik", desc_en: "Scholarly level analysis", desc_sv: "Akademisk analys", desc_tr: "Akademik analiz" },
];
 
const COUNTRIES = [
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "SO", name: "Somalia", flag: "🇸🇴" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹" },
  { code: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
];
  const { user, signOut } = useAuth();
  const { language, setLanguage, level, setLevel } = useChat();
  const { xp, levelInfo, achievements, quizResults } = useProgress();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);
  const [displayName, setDisplayName] = useState(() => {
    try { return localStorage.getItem("empireDisplayName") || ""; } catch { return ""; }
  });
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(displayName);
  const [avatarUrl, setAvatarUrl] = useState(() => {
    try { return localStorage.getItem("empireAvatarUrl") || ""; } catch { return ""; }
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [savingCountry, setSavingCountry] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("country_code").eq("id", user.id).maybeSingle()
      .then(({ data }) => { if (data?.country_code) setSelectedCountry(data.country_code); });
  }, [user]);

  const saveCountry = async (code: string) => {
    if (!user) return;
    setSavingCountry(true);
    const country = COUNTRIES.find(c => c.code === code);
    await supabase.from("profiles").update({
      country: country?.name || code,
      country_code: code,
    }).eq("id", user.id);
    setSelectedCountry(code);
    setSavingCountry(false);
    toast.success(`Country set to ${country?.name || code}`);
  };
 
  const l = language === "sv" ? {
    settings: "Settings", profile: "Profile", language: "Language", level: "Answer level",
    appearance: "Appearance", account: "Account", progress: "Progress",
    email: "Email", member: "Member since", logout: "Log out", delete: "Delete account",
    saveName: "Save", editName: "Edit name", namePlaceholder: "Your display name",
    medals: "Medals", noMedals: "No medals yet", quizHistory: "Quiz history",
    noHistory: "No quizzes yet", notifications: "Notifications", privacy: "Privacy",
    xpLabel: "XP", toNext: "to next level", changePhoto: "Change photo",
    levelLabel: "Level",
  } : language === "tr" ? {
    settings: "Ayarlar", profile: "Profil", language: "Dil", level: "Cevap seviyesi",
    appearance: "Görünüm", account: "Hesap", progress: "İlerleme",
    email: "E-posta", member: "Üyelik tarihi", logout: "Çıkış yap", delete: "Hesabı sil",
    saveName: "Kaydet", editName: "İsim düzenle", namePlaceholder: "Görünen adın",
    medals: "Madalyalar", noMedals: "Henüz madalya yok", quizHistory: "Quiz geçmişi",
    noHistory: "Henüz quiz yok", notifications: "Bildirimler", privacy: "Gizlilik",
    xpLabel: "XP", toNext: "sonraki seviyeye", changePhoto: "Fotoğraf değiştir",
    levelLabel: "Seviye",
  } : {
    settings: "Settings", profile: "Profile", language: "Language", level: "Answer level",
    appearance: "Appearance", account: "Account", progress: "Progress",
    email: "Email", member: "Member since", logout: "Log out", delete: "Delete account",
    saveName: "Save", editName: "Edit name", namePlaceholder: "Your display name",
    medals: "Medals", noMedals: "No medals yet", quizHistory: "Quiz history",
    noHistory: "No quizzes yet", notifications: "Notifications", privacy: "Privacy",
    xpLabel: "XP", toNext: "to next level", changePhoto: "Change photo",
    levelLabel: "Level",
  };
 
  const saveName = () => {
    const trimmed = nameInput.trim();
    setDisplayName(trimmed);
    try { localStorage.setItem("empireDisplayName", trimmed); } catch {}
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
        try { localStorage.setItem("empireAvatarUrl", url); } catch {}
        setUploadingAvatar(false);
        toast.success("Photo updated");
      };
      reader.readAsDataURL(file);
    } catch {
      toast.error("Failed to update photo");
      setUploadingAvatar(false);
    }
  };
 
  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };
 
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
 
  const initials = displayName
    ? displayName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : (user?.email?.[0] || "U").toUpperCase();
 
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—";
 
  const toggle = (section: string) =>
    setActiveSection((prev) => (prev === section ? null : section));
 
  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto pb-12">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-4 py-3">
          <h1 className="text-lg font-serif text-primary flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" /> {l.settings}
          </h1>
        </div>
 
        <div className="max-w-xl mx-auto px-4 py-5 space-y-4">
 
          {/* Profile card */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden bg-primary/20 flex items-center justify-content cursor-pointer border-2 border-primary/30"
                  onClick={() => fileRef.current?.click()}
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-serif text-primary w-full h-full flex items-center justify-center">
                      {initials}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-2 border-background"
                >
                  <Camera className="w-3 h-3 text-primary-foreground" />
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
 
              <div className="flex-1 min-w-0">
                {editingName ? (
                  <div className="flex gap-2 items-center">
                    <input
                      className="flex-1 bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm font-sans text-foreground focus:outline-none focus:border-primary"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder={l.namePlaceholder}
                      autoFocus
                      onKeyDown={(e) => e.key === "Enter" && saveName()}
                    />
                    <button
                      onClick={saveName}
                      className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-sans"
                    >
                      {l.saveName}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="font-serif text-foreground text-base truncate">
                      {displayName || user?.email?.split("@")[0] || "Explorer"}
                    </p>
                    <button
                      onClick={() => { setNameInput(displayName); setEditingName(true); }}
                      className="text-[10px] font-sans text-muted-foreground underline underline-offset-2"
                    >
                      {l.editName}
                    </button>
                  </div>
                )}
                <p className="text-xs font-sans text-muted-foreground truncate mt-0.5">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-sans text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {l.levelLabel} {levelInfo.level} · {xp} {l.xpLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
 
          {/* Progress */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4"
              onClick={() => toggle("progress")}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-sans text-foreground">{l.progress}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeSection === "progress" ? "rotate-90" : ""}`} />
            </button>
            {activeSection === "progress" && (
              <div className="px-5 pb-5 space-y-4 border-t border-border">
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
                        <div key={i} className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-secondary/50 border border-border">
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
              </div>
            )}
          </div>
 
          {/* Country */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4"
              onClick={() => toggle("country")}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-sans text-foreground">Country</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans text-muted-foreground">
                  {selectedCountry
                    ? `${COUNTRIES.find(c => c.code === selectedCountry)?.flag} ${COUNTRIES.find(c => c.code === selectedCountry)?.name}`
                    : "Not set"}
                </span>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeSection === "country" ? "rotate-90" : ""}`} />
              </div>
            </button>
            {activeSection === "country" && (
              <div className="border-t border-border max-h-64 overflow-y-auto">
                {COUNTRIES.map((c) => (
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
            )}
          </div>

          {/* Language */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4"
              onClick={() => toggle("language")}
            >
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-primary" />
                <span className="text-sm font-sans text-foreground">{l.language}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans text-muted-foreground">
                  {LANGUAGES.find((lg) => lg.code === language)?.flag}{" "}
                  {LANGUAGES.find((lg) => lg.code === language)?.label}
                </span>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeSection === "language" ? "rotate-90" : ""}`} />
              </div>
            </button>
            {activeSection === "language" && (
              <div className="border-t border-border">
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
            )}
          </div>
 
          {/* Answer level */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4"
              onClick={() => toggle("level")}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-sans text-foreground">{l.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-sans text-muted-foreground capitalize">
                  {LEVELS.find((lv) => lv.code === level)?.[`en` as const] || level}
                </span>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeSection === "level" ? "rotate-90" : ""}`} />
              </div>
            </button>
            {activeSection === "level" && (
              <div className="border-t border-border">
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
            )}
          </div>
 
          {/* Account info */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4"
              onClick={() => toggle("account")}
            >
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-sans text-foreground">{l.account}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${activeSection === "account" ? "rotate-90" : ""}`} />
            </button>
            {activeSection === "account" && (
              <div className="border-t border-border divide-y divide-border">
                <div className="flex items-center gap-3 px-5 py-3.5">
                  <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">{l.email}</p>
                    <p className="text-sm font-sans text-foreground">{user?.email || "—"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3.5">
                  <Key className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">User ID</p>
                    <p className="text-xs font-sans text-foreground break-all">{user?.id || "—"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3.5">
                  <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">{l.member}</p>
                    <p className="text-sm font-sans text-foreground">{createdAt}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
 
          {/* Actions */}
          <div className="space-y-2">
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
              <Trash2 className="w-4 h-4" /> {l.delete}
            </button>
          </div>
 
          <p className="text-center text-[10px] font-sans text-muted-foreground pt-2">
            Empire AI · v1.0
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
