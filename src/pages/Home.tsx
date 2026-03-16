import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEmpire } from "@/contexts/EmpireContext";
import { MessageSquare, LogIn, Shield, Clock, Map, Brain, Users, Crown, BookOpen, Sparkles, Globe, ChevronRight, Zap } from "lucide-react";
import { FlagSelector } from "@/components/FlagSelector";

const MODULES = [
  { path: "/chat", icon: MessageSquare, label: { sv: "AI-chatt", en: "AI Chat", tr: "AI Sohbet" }, desc: { sv: "Intelligenta samtal", en: "Intelligent conversations", tr: "Akıllı sohbetler" } },
  { path: "/timeline", icon: Clock, label: { sv: "Tidslinje", en: "Timeline", tr: "Zaman Çizelgesi" }, desc: { sv: "Interaktiv historik", en: "Interactive history", tr: "İnteraktif tarih" } },
  { path: "/map", icon: Map, label: { sv: "Karta", en: "Map", tr: "Harita" }, desc: { sv: "Territoriell expansion", en: "Territorial expansion", tr: "Toprak genişlemesi" } },
  { path: "/quiz", icon: Brain, label: { sv: "Quiz", en: "Quiz", tr: "Quiz" }, desc: { sv: "Testa din kunskap", en: "Test your knowledge", tr: "Bilginizi test edin" } },
  { path: "/profiles", icon: Users, label: { sv: "Profiler", en: "Profiles", tr: "Profiller" }, desc: { sv: "Historiska ledare", en: "Historical leaders", tr: "Tarihi liderler" } },
  { path: "/lineage", icon: Crown, label: { sv: "Stamtavla", en: "Lineage", tr: "Soy Ağacı" }, desc: { sv: "Dynastisk linje", en: "Dynastic line", tr: "Hanedan çizgisi" } },
  { path: "/story", icon: BookOpen, label: { sv: "Berättelse", en: "Story", tr: "Hikaye" }, desc: { sv: "Guidad resa", en: "Guided journey", tr: "Rehberli yolculuk" } },
];

const FEATURES = [
  { icon: Sparkles, title: { sv: "AI-driven analys", en: "AI-Powered Analysis", tr: "AI Destekli Analiz" }, desc: { sv: "Djupgående historisk analys med streaming AI", en: "Deep historical analysis with streaming AI", tr: "Streaming AI ile derinlemesine tarihsel analiz" } },
  { icon: Globe, title: { sv: "Multi-imperium", en: "Multi-Empire", tr: "Çoklu İmparatorluk" }, desc: { sv: "Utforska flera civilisationer", en: "Explore multiple civilizations", tr: "Birden fazla uygarlığı keşfedin" } },
  { icon: Zap, title: { sv: "Interaktivt lärande", en: "Interactive Learning", tr: "İnteraktif Öğrenme" }, desc: { sv: "Quiz, kartor och tidslinje", en: "Quiz, maps, and timeline", tr: "Quiz, haritalar ve zaman çizelgesi" } },
];

export default function Home() {
  const { user, isAdmin, signOut } = useAuth();
  const { config, empireId } = useEmpire();
  const [language, setLanguage] = useState("sv");

  if (user && !empireId) return <Navigate to="/select-empire" replace />;

  const crestImage = config?.crestImage;
  const bgImage = config?.backgroundImage;
  const appTitle = config?.appTitle || "Empire Intelligence";
  const descText = config?.homeDescription?.[language] || config?.homeDescription?.en || "Explore history with AI-driven analysis.";

  const logoutLabel = language === "sv" ? "Logga ut" : language === "tr" ? "Çıkış yap" : "Log out";
  const loginLabel = language === "sv" ? "Logga in" : language === "tr" ? "Giriş yap" : "Log in";
  const heroTitle = language === "sv" ? "Historisk intelligens. Driven av AI." : language === "tr" ? "Tarihsel Zekâ. AI Destekli." : "Historical Intelligence. Powered by AI.";
  const startLabel = language === "sv" ? "Börja utforska" : language === "tr" ? "Keşfetmeye başlayın" : "Start Exploring";
  const chooseLabel = language === "sv" ? "Välj ditt imperium" : language === "tr" ? "İmparatorluğunuzu seçin" : "Choose Your Empire";
  const featuresLabel = language === "sv" ? "Plattformens funktioner" : language === "tr" ? "Platform Özellikleri" : "Platform Features";
  const modulesLabel = language === "sv" ? "Tillgängliga moduler" : language === "tr" ? "Mevcut Modüller" : "Available Modules";

  return (
    <div className="min-h-screen flex flex-col relative w-full h-full">
      {/* Background image */}
      {bgImage && (
        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/85" />

      <header className="relative z-10 flex items-center justify-between px-6 py-4 w-full">
        <div className="flex items-center gap-3">
          {crestImage && <img src={crestImage} alt="Empire crest" className="w-10 h-10 rounded-lg object-cover" />}
          <h1 className="text-xl font-serif text-primary">{appTitle}</h1>
        </div>
        <div className="flex items-center gap-3">
          <FlagSelector language={language} setLanguage={setLanguage} />
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-lg bg-accent/20 text-accent font-sans text-sm flex items-center gap-2 hover:bg-accent/30 transition-colors"
                >
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
              <span className="text-muted-foreground text-sm font-sans hidden sm:block">{user.email}</span>
              <button
                onClick={signOut}
                className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-sans text-sm hover:bg-muted transition-colors"
              >
                {logoutLabel}
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 rounded-lg gold-gradient text-primary-foreground font-sans text-sm flex items-center gap-2"
            >
              <LogIn className="w-4 h-4" /> {loginLabel}
            </Link>
          )}
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center px-6 overflow-y-auto w-full">
        {/* Hero section */}
        <div className="flex flex-col items-center text-center pt-12 pb-8 max-w-2xl animate-fade-in">
          {crestImage && (
            <div className="relative w-24 h-24 mb-6 rounded-full overflow-hidden ottoman-glow">
              <img src={crestImage} alt="Empire crest" className="w-full h-full object-cover" />
            </div>
          )}
          <h2 className="text-3xl sm:text-5xl font-serif text-primary mb-3 leading-tight">{heroTitle}</h2>
          <p className="text-muted-foreground font-sans max-w-lg mb-8 text-sm leading-relaxed">{descText}</p>

          {user ? (
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/chat"
                className="px-8 py-3 rounded-xl gold-gradient text-primary-foreground font-sans text-base font-medium flex items-center gap-2 hover:opacity-90 transition-opacity ottoman-glow"
              >
                <MessageSquare className="w-5 h-5" /> {startLabel} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/select-empire"
                className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-sans text-base flex items-center gap-2 hover:bg-muted transition-colors ottoman-border"
              >
                <Globe className="w-5 h-5" /> {chooseLabel}
              </Link>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-8 py-4 rounded-xl gold-gradient text-primary-foreground font-sans text-lg font-medium flex items-center gap-3 hover:opacity-90 transition-opacity ottoman-glow"
            >
              <LogIn className="w-5 h-5" /> {startLabel}
            </Link>
          )}
        </div>

        {/* Features */}
        <div className="max-w-4xl w-full pb-8">
          <h3 className="text-center text-xs font-sans text-muted-foreground uppercase tracking-widest mb-4">{featuresLabel}</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-card/60 backdrop-blur-sm rounded-2xl ottoman-border p-6 text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <f.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="text-sm font-serif text-foreground mb-1">{f.title[language as keyof typeof f.title] || f.title.en}</h4>
                <p className="text-xs font-sans text-muted-foreground">{f.desc[language as keyof typeof f.desc] || f.desc.en}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modules */}
        {user && (
          <div className="max-w-4xl w-full pb-12">
            <h3 className="text-center text-xs font-sans text-muted-foreground uppercase tracking-widest mb-4">{modulesLabel}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {MODULES.map((m, i) => (
                <Link
                  key={m.path}
                  to={m.path}
                  className="bg-card/70 backdrop-blur-sm rounded-xl ottoman-border p-5 flex flex-col items-center text-center hover:bg-muted/50 transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <m.icon className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-serif text-foreground mb-0.5">{m.label[language as keyof typeof m.label] || m.label.en}</span>
                  <span className="text-[10px] font-sans text-muted-foreground">{m.desc[language as keyof typeof m.desc] || m.desc.en}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="relative z-10 text-center py-4 text-muted-foreground text-xs font-sans">
        {language === "sv" ? "AI-driven historisk analys" : language === "tr" ? "AI destekli tarihsel analiz" : "AI-driven historical analysis"}
      </footer>
    </div>
  );
}
