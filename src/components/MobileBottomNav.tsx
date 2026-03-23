import { Link, useLocation } from "react-router-dom";
import { Home, MessageSquare, Clock, Map, Brain, Users, Crown, BookOpen, Settings, MoreHorizontal, Shield, Bell, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const MAIN_TABS = [
  { path: "/", icon: Home, label: { sv: "Hem", en: "Home", tr: "Ana" } },
  { path: "/chat", icon: MessageSquare, label: { sv: "Chatt", en: "Chat", tr: "Sohbet" } },
  { path: "/timeline", icon: Clock, label: { sv: "Tidslinje", en: "Timeline", tr: "Çizelge" } },
  { path: "/notifications", icon: Bell, label: { sv: "Notiser", en: "Alerts", tr: "Bildirim" } },
  { path: "/more", icon: MoreHorizontal, label: { sv: "Mer", en: "More", tr: "Daha" } },
];

const MORE_ITEMS = [
  { path: "/map", icon: Map, label: { sv: "Karta", en: "Map", tr: "Harita" } },
  { path: "/quiz", icon: Brain, label: { sv: "Quiz", en: "Quiz", tr: "Quiz" } },
  { path: "/leaderboard", icon: Trophy, label: { sv: "Topplista", en: "Leaderboard", tr: "Liderlik" } },
  { path: "/profiles", icon: Users, label: { sv: "Profiler", en: "Profiles", tr: "Profiller" } },
  { path: "/lineage", icon: Crown, label: { sv: "Stamtavla", en: "Lineage", tr: "Soy Agaci" } },
  { path: "/story", icon: BookOpen, label: { sv: "Berattelse", en: "Story", tr: "Hikaye" } },
  { path: "/settings", icon: Settings, label: { sv: "Installningar", en: "Settings", tr: "Ayarlar" } },
];

const ADMIN_ITEM = { path: "/admin", icon: Shield, label: { sv: "Admin", en: "Admin", tr: "Admin" } };

interface Props {
  language: string;
}

export function MobileBottomNav({ language }: Props) {
  const location = useLocation();
  const [moreOpen, setMoreOpen] = useState(false);
  const { isAdmin } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadUnread = async () => {
      try {
        const { data } = await supabase
          .from("notifications")
          .select("id")
          .order("created_at", { ascending: false });
        if (!data) return;
        const readIds: string[] = JSON.parse(localStorage.getItem("empireAI_readNotifs") || "[]");
        const unread = data.filter((n: any) => !readIds.includes(n.id)).length;
        setUnreadCount(unread);
      } catch {}
    };
    loadUnread();
    const interval = setInterval(loadUnread, 30000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  const allMoreItems = isAdmin ? [...MORE_ITEMS, ADMIN_ITEM] : MORE_ITEMS;
  const isMoreActive = allMoreItems.some((item) => location.pathname === item.path);

  return (
    <>
      {moreOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="absolute bottom-[68px] left-4 right-4 bg-background/98 backdrop-blur-xl rounded-2xl border border-border p-4 animate-fade-in shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-4 gap-2">
              {allMoreItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all ${
                      active
                        ? "bg-primary/20 text-primary"
                        : "text-foreground hover:text-foreground hover:bg-muted/70"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-[10px] font-sans font-medium">
                      {item.label[language as keyof typeof item.label] || item.label.en}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-card/95 backdrop-blur-xl border-t border-border safe-area-bottom">
        <div className="flex items-center justify-around px-2 pt-1.5 pb-1">
          {MAIN_TABS.map((tab) => {
            if (tab.path === "/more") {
              return (
                <button
                  key="more"
                  onClick={() => setMoreOpen(!moreOpen)}
                  className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all min-w-[56px] ${
                    isMoreActive || moreOpen ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-[10px] font-sans font-medium">
                    {tab.label[language as keyof typeof tab.label] || tab.label.en}
                  </span>
                </button>
              );
            }

            if (tab.path === "/notifications") {
              const active = location.pathname === tab.path;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  onClick={() => setMoreOpen(false)}
                  className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all min-w-[56px] relative ${
                    active ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <div className={`p-1 rounded-full transition-all relative ${active ? "bg-primary/15" : ""}`}>
                    <tab.icon className="w-5 h-5" />
                    {unreadCount > 0 && !active && (
                      <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-primary text-primary-foreground text-[9px] font-sans font-bold flex items-center justify-center leading-none">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-sans font-medium">
                    {tab.label[language as keyof typeof tab.label] || tab.label.en}
                  </span>
                </Link>
              );
            }

            const active = location.pathname === tab.path;
            return (
              <Link
                key={tab.path}
                to={tab.path}
                onClick={() => setMoreOpen(false)}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-all min-w-[56px] ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div className={`p-1 rounded-full transition-all ${active ? "bg-primary/15" : ""}`}>
                  <tab.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-sans font-medium">
                  {tab.label[language as keyof typeof tab.label] || tab.label.en}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
