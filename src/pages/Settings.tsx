import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useProgress } from "@/hooks/useProgress";
import { supabase } from "@/integrations/supabase/client";
import { Settings as SettingsIcon, User, LogOut, Trash2, Mail, Key, Calendar, Zap, Trophy, Star, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useChat();
  const { xp, levelInfo, achievements, quizResults, loading: progressLoading } = useProgress();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleDeleteAccount = async () => {
    if (!confirm(language === "sv" ? "Är du säker? Detta kan inte ångras." : "Are you sure? This cannot be undone.")) return;
    setDeleting(true);
    try {
      await supabase.auth.signOut();
      toast.success(language === "sv" ? "Kontot har raderats" : "Account deleted");
      navigate("/auth");
    } catch {
      toast.error(language === "sv" ? "Kunde inte radera kontot" : "Failed to delete account");
    } finally {
      setDeleting(false);
    }
  };

  const labels = {
    sv: { title: "Inställningar", profile: "Profil", email: "E-post", userId: "Användar-ID", memberSince: "Medlem sedan", logout: "Logga ut", delete: "Radera konto", actions: "Åtgärder", progress: "Framsteg", level: "Nivå", xpLabel: "XP", toNext: "till nästa nivå", medals: "Medaljer", noMedals: "Inga medaljer ännu", quizHistory: "Quizhistorik", noHistory: "Inget quiz gjort ännu", score: "Poäng", earned: "Intjänat" },
    en: { title: "Settings", profile: "Profile", email: "Email", userId: "User ID", memberSince: "Member since", logout: "Log out", delete: "Delete account", actions: "Actions", progress: "Progress", level: "Level", xpLabel: "XP", toNext: "to next level", medals: "Medals", noMedals: "No medals yet", quizHistory: "Quiz History", noHistory: "No quizzes taken yet", score: "Score", earned: "Earned" },
    tr: { title: "Ayarlar", profile: "Profil", email: "E-posta", userId: "Kullanıcı ID", memberSince: "Üyelik tarihi", logout: "Çıkış yap", delete: "Hesabı sil", actions: "İşlemler", progress: "İlerleme", level: "Seviye", xpLabel: "XP", toNext: "sonraki seviyeye", medals: "Madalyalar", noMedals: "Henüz madalya yok", quizHistory: "Quiz Geçmişi", noHistory: "Henüz quiz yapılmadı", score: "Puan", earned: "Kazanıldı" },
  };
  const l = labels[language as keyof typeof labels] || labels.en;

  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString() : "—";

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto p-4 pb-8">
        <div className="max-w-xl mx-auto space-y-6 animate-fade-in">
          <h1 className="text-2xl font-serif text-primary flex items-center gap-2">
            <SettingsIcon className="w-6 h-6" /> {l.title}
          </h1>

          {/* Progress Dashboard */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-5 space-y-4">
            <h2 className="text-sm font-serif text-primary flex items-center gap-2">
              <Zap className="w-4 h-4" /> {l.progress}
            </h2>

            <div className="text-center py-2">
              <p className="text-3xl font-serif text-primary">{l.level} {levelInfo.level}</p>
              <p className="text-sm font-sans text-muted-foreground">{levelInfo.title}</p>
              <p className="text-lg font-sans text-foreground mt-1">{xp} {l.xpLabel}</p>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-sans text-muted-foreground mb-1">
                <span>{l.level} {levelInfo.level}</span>
                <span>{levelInfo.nextLevel ? `${levelInfo.xpToNext} ${l.xpLabel} ${l.toNext}` : "MAX"}</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div className="h-full gold-gradient transition-all duration-700 rounded-full" style={{ width: `${levelInfo.progress * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Medals */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-5 space-y-3">
            <h2 className="text-sm font-serif text-primary flex items-center gap-2">
              <Trophy className="w-4 h-4" /> {l.medals}
            </h2>
            {achievements.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((a, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-secondary/50 border border-border">
                    <span className="text-3xl">{a.medal_icon}</span>
                    <span className="text-xs font-sans text-foreground text-center">{a.medal_name}</span>
                    <span className="text-[9px] font-sans text-muted-foreground">
                      {new Date(a.earned_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-sans text-muted-foreground text-center py-4">{l.noMedals}</p>
            )}
          </div>

          {/* Quiz History */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-5 space-y-3">
            <h2 className="text-sm font-serif text-primary flex items-center gap-2">
              <Clock className="w-4 h-4" /> {l.quizHistory}
            </h2>
            {quizResults.length > 0 ? (
              <div className="space-y-2">
                {quizResults.slice(0, 10).map((r) => (
                  <div key={r.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-secondary/30 border border-border">
                    <div>
                      <span className="text-sm font-sans text-foreground">{r.score}/{r.total_questions}</span>
                      <span className="text-xs font-sans text-muted-foreground ml-2">{r.empire_id}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-sans text-primary">+{r.xp_earned} XP</span>
                      <p className="text-[9px] font-sans text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs font-sans text-muted-foreground text-center py-4">{l.noHistory}</p>
            )}
          </div>

          {/* Profile card */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-5 space-y-4">
            <h2 className="text-sm font-serif text-primary flex items-center gap-2">
              <User className="w-4 h-4" /> {l.profile}
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary/60 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">{l.email}</p>
                  <p className="font-sans text-foreground">{user?.email || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Key className="w-4 h-4 text-primary/60 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">{l.userId}</p>
                  <p className="font-sans text-foreground text-xs break-all">{user?.id || "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-primary/60 flex-shrink-0" />
                <div>
                  <p className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">{l.memberSince}</p>
                  <p className="font-sans text-foreground">{createdAt}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-5 space-y-3">
            <h2 className="text-sm font-serif text-primary flex items-center gap-2 mb-2">{l.actions}</h2>
            <button onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary hover:bg-muted text-foreground text-sm font-sans transition-colors">
              <LogOut className="w-4 h-4 text-primary" /> {l.logout}
            </button>
            <button onClick={handleDeleteAccount} disabled={deleting}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm font-sans transition-colors disabled:opacity-50">
              <Trash2 className="w-4 h-4" /> {l.delete}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}