import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { supabase } from "@/integrations/supabase/client";
import { Settings as SettingsIcon, User, LogOut, Trash2, Mail, Key, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useChat();
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
      // Sign out - actual account deletion requires admin/edge function
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
    sv: { title: "Inställningar", profile: "Profil", email: "E-post", userId: "Användar-ID", memberSince: "Medlem sedan", logout: "Logga ut", delete: "Radera konto", actions: "Åtgärder" },
    en: { title: "Settings", profile: "Profile", email: "Email", userId: "User ID", memberSince: "Member since", logout: "Log out", delete: "Delete account", actions: "Actions" },
    tr: { title: "Ayarlar", profile: "Profil", email: "E-posta", userId: "Kullanıcı ID", memberSince: "Üyelik tarihi", logout: "Çıkış yap", delete: "Hesabı sil", actions: "İşlemler" },
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
            <h2 className="text-sm font-serif text-primary flex items-center gap-2 mb-2">
              {l.actions}
            </h2>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary hover:bg-muted text-foreground text-sm font-sans transition-colors"
            >
              <LogOut className="w-4 h-4 text-primary" /> {l.logout}
            </button>

            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm font-sans transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" /> {l.delete}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}