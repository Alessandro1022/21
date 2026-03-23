import { useState } from “react”;
import { Link, Navigate } from “react-router-dom”;
import { useAuth } from “@/hooks/useAuth”;
import { useEmpire } from “@/contexts/EmpireContext”;
import { MessageSquare, LogIn, Shield, Clock, Map, Brain, Users, Crown, BookOpen, Sparkles, Globe, ChevronRight, Zap } from “lucide-react”;
import { FlagSelector } from “@/components/FlagSelector”;

const MODULES = [
{ path: “/chat”, icon: MessageSquare, label: { sv: “AI-chatt”, en: “AI Chat”, tr: “AI Sohbet” }, desc: { sv: “Intelligenta samtal”, en: “Intelligent conversations”, tr: “Akıllı sohbetler” } },
{ path: “/timeline”, icon: Clock, label: { sv: “Tidslinje”, en: “Timeline”, tr: “Zaman Çizelgesi” }, desc: { sv: “Interaktiv historik”, en: “Interactive history”, tr: “İnteraktif tarih” } },
{ path: “/map”, icon: Map, label: { sv: “Karta”, en: “Map”, tr: “Harita” }, desc: { sv: “Territoriell expansion”, en: “Territorial expansion”, tr: “Toprak genişlemesi” } },
{ path: “/quiz”, icon: Brain, label: { sv: “Quiz”, en: “Quiz”, tr: “Quiz” }, desc: { sv: “Testa din kunskap”, en: “Test your knowledge”, tr: “Bilginizi test edin” } },
{ path: “/profiles”, icon: Users, label: { sv: “Profiler”, en: “Profiles”, tr: “Profiller” }, desc: { sv: “Historiska ledare”, en: “Historical leaders”, tr: “Tarihi liderler” } },
{ path: “/lineage”, icon: Crown, label: { sv: “Stamtavla”, en: “Lineage”, tr: “Soy Ağacı” }, desc: { sv: “Dynastisk linje”, en: “Dynastic line”, tr: “Hanedan çizgisi” } },
{ path: “/story”, icon: BookOpen, label: { sv: “Berättelse”, en: “Story”, tr: “Hikaye” }, desc: { sv: “Guidad resa”, en: “Guided journey”, tr: “Rehberli yolculuk” } },
];

const FEATURES = [
{ icon: Sparkles, title: { sv: “AI-driven analys”, en: “AI-Powered Analysis”, tr: “AI Destekli Analiz” }, desc: { sv: “Djupgående historisk analys med streaming AI”, en: “Deep historical analysis with streaming AI”, tr: “Streaming AI ile derinlemesine tarihsel analiz” } },
{ icon: Globe, title: { sv: “Multi-imperium”, en: “Multi-Empire”, tr: “Çoklu İmparatorluk” }, desc: { sv: “Utforska flera civilisationer”, en: “Explore multiple civilizations”, tr: “Birden fazla uygarlığı keşfedin” } },
{ icon: Zap, title: { sv: “Interaktivt lärande”, en: “Interactive Learning”, tr: “İnteraktif Öğrenme” }, desc: { sv: “Quiz, kartor och tidslinje”, en: “Quiz, maps, and timeline”, tr: “Quiz, haritalar ve zaman çizelgesi” } },
];

export default function Home() {
const { user, isAdmin, signOut } = useAuth();
const { config, empireId } = useEmpire();
const [language, setLanguage] = useState(“sv”);

if (user && !empireId) return <Navigate to="/select-empire" replace />;

const crestImage = config?.crestImage;
const bgImage = config?.backgroundImage;
const appTitle = config?.appTitle || “Empire Intelligence”;
const desc = config?.homeDescription?.[language] || config?.homeDescription?.en || “Explore history with AI-driven analysis.”;

const logoutLabel = language === “sv” ? “Logga ut” : language === “tr” ? “Çıkış yap” : “Log out”;
const loginLabel = language === “sv” ? “Logga in” : language === “tr” ? “Giriş yap” : “Log in”;
const heroTitle = language === “sv” ? “Historisk intelligens. Driven av AI.” : language === “tr” ? “Tarihsel Zekâ. AI Destekli.” : “Historical Intelligence. Powered by AI.”;
const startLabel = language === “sv” ? “Börja utforska” : language === “tr” ? “Keşfetmeye başlayın” : “Start Exploring”;
const chooseLabel = language === “sv” ? “Välj ditt imperium” : language === “tr” ? “İmparatorluğunuzu seçin” : “Choose Your Empire”;
const featuresLabel = language === “sv” ? “Plattformens funktioner” : language === “tr” ? “Platform Özellikleri” : “Platform Features”;
const modulesLabel = language === “sv” ? “Tillgängliga moduler” : language === “tr” ? “Mevcut Modüller” : “Available Modules”;

return (
<div className=“min-h-screen flex flex-col relative” style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: “cover”, backgroundPosition: “center” } : undefined}>

```
  {/* FIX 1: Mörkare overlay för tydligare text */}
  <div className="absolute inset-0 bg-background/92" />

  {/* FIX 2: Header får safe-area-inset-top så innehållet hamnar under statusbaren */}
  <header
    className="relative z-10 flex items-center justify-between px-6"
    style={{
      paddingTop: "calc(env(safe-area-inset-top) + 16px)",
      paddingBottom: "16px",
    }}
  >
    <div className="flex items-center gap-3">
      {crestImage && <img src={crestImage} alt="Empire crest" className="w-8 h-8 rounded-lg object-cover" />}
    </div>
    <div className="flex items-center gap-3">
      <FlagSelector language={language} setLanguage={setLanguage} />
      {user ? (
        <>
          {isAdmin && (
            <Link to="/admin" className="px-3 py-1.5 rounded-lg bg-accent/20 text-accent font-sans text-xs sm:text-sm flex items-center gap-1 hover:bg-accent/30 transition-colors">
              <Shield className="w-4 h-4" /> Admin
            </Link>
          )}
          <span className="text-muted-foreground text-xs sm:text-sm font-sans hidden sm:block">{user.email}</span>
          <button onClick={signOut} className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground font-sans text-xs sm:text-sm hover:bg-muted transition-colors">
            {logoutLabel}
          </button>
        </>
      ) : (
        <Link to="/auth" className="px-3 py-1.5 rounded-lg gold-gradient text-primary-foreground font-sans text-xs sm:text-sm flex items-center gap-1">
          <LogIn className="w-4 h-4" /> {loginLabel}
        </Link>
      )}
    </div>
  </header>

  <main className="relative z-10 flex-1 flex flex-col items-center px-6 overflow-y-auto">
    {/* Hero section */}
    <div className="flex flex-col items-center text-center pt-10 pb-6 max-w-2xl animate-fade-in">
      {crestImage && (
        <div className="relative w-20 h-20 mb-5 rounded-full overflow-hidden ottoman-glow">
          <img src={crestImage} alt="Empire crest" className="w-full h-full object-cover" />
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary mb-2 leading-tight">{heroTitle}</h2>
      <p className="text-muted-foreground font-sans max-w-lg mb-6 text-xs sm:text-sm leading-relaxed">{desc}</p>

      {user ? (
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/chat" className="px-6 py-2.5 rounded-xl gold-gradient text-primary-foreground font-sans text-sm sm:text-base font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity ottoman-glow">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" /> {startLabel} <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </Link>
          <Link to="/select-empire" className="px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-sans text-sm sm:text-base flex items-center gap-1.5 hover:bg-muted transition-colors ottoman-border">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" /> {chooseLabel}
          </Link>
        </div>
      ) : (
        <Link to="/auth" className="px-6 py-3 rounded-xl gold-gradient text-primary-foreground font-sans text-sm sm:text-base font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity ottoman-glow">
          <LogIn className="w-4 h-4 sm:w-5 sm:h-5" /> {startLabel}
        </Link>
      )}
    </div>

    {/* Features */}
    <div className="max-w-4xl w-full pb-6">
      <h3 className="text-center text-[9px] sm:text-xs font-sans text-muted-foreground uppercase tracking-widest mb-3">{featuresLabel}</h3>
      <div className="grid sm:grid-cols-3 gap-3 mb-8">
        {FEATURES.map((f, i) => (
          <div key={i} className="bg-card/60 backdrop-blur-sm rounded-2xl ottoman-border p-4 text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <f.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary mx-auto mb-2" />
            <h4 className="text-xs sm:text-sm font-serif text-foreground mb-1">{f.title[language as keyof typeof f.title] || f.title.en}</h4>
            <p className="text-[9px] sm:text-xs font-sans text-muted-foreground">{f.desc[language as keyof typeof f.desc] || f.desc.en}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Modules grid */}
    {user && (
      <div className="max-w-4xl w-full pb-10">
        <h3 className="text-center text-[9px] sm:text-xs font-sans text-muted-foreground uppercase tracking-widest mb-3">{modulesLabel}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {MODULES.map((m, i) => (
            <Link
              key={m.path}
              to={m.path}
              className="bg-card/70 backdrop-blur-sm rounded-xl ottoman-border p-4 flex flex-col items-center text-center hover:bg-muted/50 transition-all duration-300 group animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <m.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary mb-1.5 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-serif text-foreground mb-0.5">{m.label[language as keyof typeof m.label] || m.label.en}</span>
              <span className="text-[9px] sm:text-xs font-sans text-muted-foreground">{m.desc[language as keyof typeof m.desc] || m.desc.en}</span>
            </Link>
          ))}
        </div>
      </div>
    )}
  </main>

  <footer className="relative z-10 text-center py-3 text-muted-foreground text-[9px] sm:text-xs font-sans">
    {language === "sv" ? "AI-driven historisk analys" : language === "tr" ? "AI destekli tarihsel analiz" : "AI-driven historical analysis"}
  </footer>
</div>
```

);
}