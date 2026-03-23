import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEmpire } from "@/contexts/EmpireContext";
import { MessageSquare, Clock, Map, Brain, Users, Shield, LogOut, Globe, Crown, BookOpen, Settings } from "lucide-react";
import { MobileBottomNav } from "@/components/MobileBottomNav";

interface AppLayoutProps {
  children: React.ReactNode;
  language: string;
  setLanguage: (lang: string) => void;
  hideNav?: boolean;
}

const NAV_ITEMS = [
  { path: "/chat", icon: MessageSquare, label: { sv: "Chatt", en: "Chat", tr: "Sohbet" } },
  { path: "/timeline", icon: Clock, label: { sv: "Tidslinje", en: "Timeline", tr: "Zaman Çizelgesi" } },
  { path: "/map", icon: Map, label: { sv: "Karta", en: "Map", tr: "Harita" } },
  { path: "/quiz", icon: Brain, label: { sv: "Quiz", en: "Quiz", tr: "Quiz" } },
  { path: "/profiles", icon: Users, label: { sv: "Profiler", en: "Profiles", tr: "Profiller" } },
  { path: "/lineage", icon: Crown, label: { sv: "Stamtavla", en: "Lineage", tr: "Soy Ağacı" } },
  { path: "/story", icon: BookOpen, label: { sv: "Berättelse", en: "Story", tr: "Hikaye" } },
];

export function AppLayout({ children, language, setLanguage, hideNav }: AppLayoutProps) {
  const { user, isAdmin, signOut } = useAuth();
  const { config } = useEmpire();
  const location = useLocation();
  const navigate = useNavigate();
  

  const crestImage = config?.crestImage;
  const bgImage = config?.backgroundImage;
  const appTitle = config?.appTitle || "Empire AI";

  return (
    <div className="flex flex-col h-screen relative" style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}>
      <div className="absolute inset-0 bg-background/88 z-0" />

      {/* Header — safe-area-top för PWA/notch */}
      <header className="relative z-20 flex-shrink-0 border-b border-border px-3 bg-background/60 backdrop-blur-md" style={{ paddingTop: "max(env(safe-area-inset-top), 8px)", paddingBottom: "8px" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              {crestImage && <img src={crestImage} alt="Empire crest" className="w-7 h-7 rounded-lg object-cover" />}
              <span className="text-sm font-serif text-primary hidden sm:block">{appTitle}</span>
            </Link>
          </div>

          {!hideNav && (
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans transition-colors ${
                      active ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label[language as keyof typeof item.label] || item.label.en}
                  </Link>
                );
              })}
              <Link
                to="/settings"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans transition-colors ${
                  location.pathname === "/settings" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                {language === "sv" ? "Inställningar" : language === "tr" ? "Ayarlar" : "Settings"}
              </Link>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans text-muted-foreground hover:text-foreground hover:bg-muted">
                  <Shield className="w-3.5 h-3.5" /> Admin
                </Link>
              )}
            </nav>
          )}

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => navigate("/select-empire")}
              className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              title="Change Empire"
            >
              <Globe className="w-4 h-4 text-muted-foreground" />
            </button>
            {/* Kompakt flaggselektor på mobil */}
            <div className="flex gap-0.5">
              {[
                { value: "sv", emoji: "🇸🇪" },
                { value: "en", emoji: "🇬🇧" },
                { value: "tr", emoji: "🇹🇷" },
              ].map((flag) => (
                <button
                  key={flag.value}
                  onClick={() => setLanguage(flag.value)}
                  className={`w-7 h-7 md:w-9 md:h-9 rounded-lg text-sm md:text-lg flex items-center justify-center transition-all ${
                    language === flag.value
                      ? "bg-primary/20 ring-2 ring-primary scale-110"
                      : "hover:bg-muted opacity-60 hover:opacity-100"
                  }`}
                >
                  {flag.emoji}
                </button>
              ))}
            </div>
            {user && (
              <button onClick={signOut} className="p-1.5 rounded-lg hover:bg-muted transition-colors hidden md:block" title="Logga ut">
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 overflow-hidden pb-[calc(68px+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </main>

      {!hideNav && <MobileBottomNav language={language} />}
    </div>
  );
}

