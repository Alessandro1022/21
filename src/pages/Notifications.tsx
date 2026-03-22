import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { Bell, RefreshCw, Loader2 } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  title_sv?: string;
  title_tr?: string;
  body: string;
  body_sv?: string;
  body_tr?: string;
  image_url?: string;
  created_at: string;
}

export default function Notifications() {
  const { language, setLanguage } = useChat();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("empireAI_readNotifs");
      return new Set(stored ? JSON.parse(stored) : []);
    } catch { return new Set(); }
  });

  const labels = {
    sv: { title: "Notiser", empty: "Inga notiser än", emptyDesc: "Nyheter och meddelanden från Empire AI visas här.", markAll: "Markera alla lästa" },
    en: { title: "Notifications", empty: "No notifications yet", emptyDesc: "News and messages from Empire AI will appear here.", markAll: "Mark all read" },
    tr: { title: "Bildirimler", empty: "Henüz bildirim yok", emptyDesc: "Empire AI'dan haberler ve mesajlar burada görünecek.", markAll: "Tümünü okundu işaretle" },
  };
  const l = labels[language as keyof typeof labels] || labels.en;

  const getTitle = (n: Notification) => {
    if (language === "sv" && n.title_sv) return n.title_sv;
    if (language === "tr" && n.title_tr) return n.title_tr;
    return n.title;
  };

  const getBody = (n: Notification) => {
    if (language === "sv" && n.body_sv) return n.body_sv;
    if (language === "tr" && n.body_tr) return n.body_tr;
    return n.body;
  };

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });
    setNotifications((data || []) as Notification[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const markRead = (id: string) => {
    const next = new Set(readIds).add(id);
    setReadIds(next);
    try { localStorage.setItem("empireAI_readNotifs", JSON.stringify([...next])); } catch {}
  };

  const markAllRead = () => {
    const next = new Set(notifications.map(n => n.id));
    setReadIds(next);
    try { localStorage.setItem("empireAI_readNotifs", JSON.stringify([...next])); } catch {}
  };

  const unreadCount = notifications.filter(n => !readIds.has(n.id)).length;

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto p-4 pb-8">
        <div className="max-w-2xl mx-auto animate-fade-in">

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-serif text-primary flex items-center gap-2">
                <Bell className="w-6 h-6" /> {l.title}
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-sans font-medium">
                    {unreadCount}
                  </span>
                )}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-sans text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-xl border border-border hover:bg-secondary"
                >
                  {l.markAll}
                </button>
              )}
              <button
                onClick={load}
                className="p-2 rounded-xl border border-border hover:bg-secondary transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Lista */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">{l.empty}</p>
              <p className="text-xs mt-1">{l.emptyDesc}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map(n => {
                const isRead = readIds.has(n.id);
                return (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`bg-card border rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                      isRead ? "border-border opacity-70" : "border-primary/30 shadow-sm"
                    }`}
                  >
                    {/* Bild */}
                    {n.image_url && (
                      <img
                        src={n.image_url}
                        alt=""
                        className="w-full h-40 object-cover"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    )}

                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        {/* Ikon / oläst-indikator */}
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isRead ? "bg-secondary" : "bg-primary/15"
                        }`}>
                          <Bell className={`w-4 h-4 ${isRead ? "text-muted-foreground" : "text-primary"}`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm font-medium leading-snug ${isRead ? "text-foreground/70" : "text-foreground"}`}>
                              {getTitle(n)}
                            </p>
                            {!isRead && (
                              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            {getBody(n)}
                          </p>
                          <p className="text-[10px] text-muted-foreground/60 mt-2">
                            {new Date(n.created_at).toLocaleDateString(
                              language === "sv" ? "sv-SE" : language === "tr" ? "tr-TR" : "en-GB",
                              { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </AppLayout>
  );
}
