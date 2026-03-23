import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEmpire } from "@/contexts/EmpireContext";
import {
  MessageSquare,
  Clock,
  Map,
  Brain,
  Users,
  Shield,
  LogOut,
  Globe,
  Crown,
  BookOpen,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { FlagSelector } from "@/components/FlagSelector";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const crestImage = config?.crestImage;
  const bgImage = config?.backgroundImage;
  const appTitle = config?.appTitle || "Empire AI";

  return (
    <div
      className="flex flex-col h-screen w-full overflow-x-hidden relative"
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-background/90 z-0" />

      {/* HEADER */}
      <header className="relative z-20 border-b border-border bg-background/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-2 sm:px-4 py-2 overflow-hidden">

          {/* LEFT (logo + title) */}
          <Link to="/" className="flex items-center gap-2 min-w-0">
            {crestImage && (
              <img
                src={crestImage}
                alt="crest"
                className="w-7 h-7 rounded-md object-cover flex-shrink-0"
              />
            )}
            <span className="text-xs sm:text-sm md:text-base font-serif text-primary truncate max-w-[140px] sm:max-w-[220px]">
              {appTitle}
            </span>
          </Link>

          {/* DESKTOP NAV */}
          {!hideNav && (
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {NAV_ITEMS.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition ${
                      active
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="w-3.5 h-3.5" />
                    {item.label[language as keyof typeof item.label] || item.label.en}
                  </Link>
                );
              })}

              <Link
                to="/settings"
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                  location.pathname === "/settings"
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                {language === "sv" ? "Inställningar" : language === "tr" ? "Ayarlar" : "Settings"}
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </Link>
              )}
            </nav>
          )}

          {/* RIGHT (controls) */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={() => navigate("/select-empire")}
              className="p-2 rounded-md hover:bg-muted"
            >
              <Globe className="w-4 h-4 text-muted-foreground" />
            </button>

            <FlagSelector language={language} setLanguage={setLanguage} />

            {user && (
              <button
                onClick={signOut}
                className="p-2 rounded-md hover:bg-muted hidden md:block"
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden pb-[70px] md:pb-0">
        {children}
      </main>

      {/* MOBILE NAV */}
      {!hideNav && <MobileBottomNav language={language} />}
    </div>
  );
}
