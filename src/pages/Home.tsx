export default function Home() {
  const { user, isAdmin, signOut } = useAuth();
  const { config, empireId } = useEmpire();
  const [language, setLanguage] = useState("sv");

  if (user && !empireId) return <Navigate to="/select-empire" replace />;

  const crestImage = config?.crestImage;
  const bgImage = config?.backgroundImage;
  const appTitle = config?.appTitle || "Empire Intelligence";
  const desc = config?.homeDescription?.[language] || config?.homeDescription?.en || "Explore history with AI-driven analysis.";

  const logoutLabel = language === "sv" ? "Logga ut" : language === "tr" ? "Çıkış yap" : "Log out";
  const loginLabel = language === "sv" ? "Logga in" : language === "tr" ? "Giriş yap" : "Log in";
  const heroTitle = language === "sv" ? "Historisk intelligens. Driven av AI." : language === "tr" ? "Tarihsel Zekâ. AI Destekli." : "Historical Intelligence. Powered by AI.";
  const startLabel = language === "sv" ? "Börja utforska" : language === "tr" ? "Keşfetmeye başlayın" : "Start Exploring";
  const chooseLabel = language === "sv" ? "Välj ditt imperium" : language === "tr" ? "İmparatorluğunuzu seçin" : "Choose Your Empire";
  const featuresLabel = language === "sv" ? "Plattformens funktioner" : language === "tr" ? "Platform Özellikleri" : "Platform Features";
  const modulesLabel = language === "sv" ? "Tillgängliga moduler" : language === "tr" ? "Mevcut Modüller" : "Available Modules";

  return (
    <div
      className="relative flex flex-col min-h-screen w-full"
      style={
        bgImage
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "contain", // hela bilden syns, inte beskuren
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-background/85" />

      {/* Header */}
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
                <Link to="/admin" className="px-4 py-2 rounded-lg bg-accent/20 text-accent font-sans text-sm flex items-center gap-2 hover:bg-accent/30 transition-colors">
                  <Shield className="w-4 h-4" /> Admin
                </Link>
              )}
              <span className="text-muted-foreground text-sm font-sans hidden sm:block">{user.email}</span>
              <button onClick={signOut} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-sans text-sm hover:bg-muted transition-colors">
                {logoutLabel}
              </button>
            </>
          ) : (
            <Link to="/auth" className="px-4 py-2 rounded-lg gold-gradient text-primary-foreground font-sans text-sm flex items-center gap-2">
              <LogIn className="w-4 h-4" /> {loginLabel}
            </Link>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-6 py-12 overflow-y-auto w-full max-w-screen-xl mx-auto">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-12">
          {crestImage && (
            <div className="relative w-24 h-24 mb-6 rounded-full overflow-hidden ottoman-glow">
              <img src={crestImage} alt="Empire crest" className="w-full h-full object-cover" />
            </div>
          )}
          <h2 className="text-3xl sm:text-5xl font-serif text-primary mb-3 leading-tight">{heroTitle}</h2>
          <p className="text-muted-foreground font-sans max-w-lg mb-8 text-sm leading-relaxed">{desc}</p>

          {user ? (
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/chat" className="px-8 py-3 rounded-xl gold-gradient text-primary-foreground font-sans text-base font-medium flex items-center gap-2 hover:opacity-90 transition-opacity ottoman-glow">
                <MessageSquare className="w-5 h-5" /> {startLabel} <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/select-empire" className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-sans text-base flex items-center gap-2 hover:bg-muted transition-colors ottoman-border">
                <Globe className="w-5 h-5" /> {chooseLabel}
              </Link>
            </div>
          ) : (
            <Link to="/auth" className="px-8 py-4 rounded-xl gold-gradient text-primary-foreground font-sans text-lg font-medium flex items-center gap-3 hover:opacity-90 transition-opacity ottoman-glow">
              <LogIn className="w-5 h-5" /> {startLabel}
            </Link>
          )}
        </div>

        {/* Features */}
        <div className="w-full max-w-4xl mb-12 grid sm:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="bg-card/60 backdrop-blur-sm rounded-2xl ottoman-border p-6 text-center animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <f.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="text-sm font-serif text-foreground mb-1">{f.title[language as keyof typeof f.title] || f.title.en}</h4>
              <p className="text-xs font-sans text-muted-foreground">{f.desc[language as keyof typeof f.desc] || f.desc.en}</p>
            </div>
          ))}
        </div>

        {/* Modules */}
        {user && (
          <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
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
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-muted-foreground text-xs font-sans">
        {language === "sv" ? "AI-driven historisk analys" : language === "tr" ? "AI destekli tarihsel analiz" : "AI-driven historical analysis"}
      </footer>
    </div>
  );
}
