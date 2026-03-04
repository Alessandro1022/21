import { useParams, Link } from "react-router-dom";
import { useEmpire } from "@/contexts/EmpireContext";
import { formatYear } from "@/data/empires";
import { AppLayout } from "@/components/AppLayout";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "@/components/ChatMessage";
import { Sparkles, ChevronLeft, Sword, BookOpen, Crown, Calendar } from "lucide-react";

export default function ProfileDetail() {
  const { id } = useParams<{ id: string }>();
  const { language, setLanguage, messages, isLoading, send } = useChat();
  const { config } = useEmpire();

  const profiles = config?.profiles || [];
  const leaders = config?.leaders || [];
  const profile = profiles.find((p) => p.id === id);

  // Find matching leader for stats
  const leader = leaders.find((l) => l.profileId === id);

  if (!profile) {
    return (
      <AppLayout language={language} setLanguage={setLanguage}>
        <div className="h-full flex items-center justify-center">
          <p className="text-muted-foreground font-sans">Profile not found</p>
        </div>
      </AppLayout>
    );
  }

  const handleDeepAnalysis = () => {
    const prompt = language === "sv"
      ? `Ge en fördjupad analys av ${profile.name}s ledarskap, reformer och historiska arv.`
      : language === "tr"
      ? `${profile.name}'ın liderliği, reformları ve tarihi mirası hakkında derinlemesine bir analiz yapın.`
      : `Provide an in-depth analysis of ${profile.name}'s leadership, reforms, and historical legacy.`;
    send(prompt);
  };

  const labels = {
    sv: { bio: "Biografi", reforms: "Reformer", campaigns: "Kampanjer", style: "Ledarstil", critical: "Kritiska perspektiv", aiBtn: "AI-djupanalys", back: "Alla profiler", stats: "Statistik", reign: "Regeringstid", reformCount: "Antal reformer", campaignCount: "Kampanjer", years: "år" },
    en: { bio: "Biography", reforms: "Reforms", campaigns: "Campaigns", style: "Leadership Style", critical: "Critical Perspectives", aiBtn: "AI Deep Analysis", back: "All Profiles", stats: "Statistics", reign: "Reign", reformCount: "Reforms", campaignCount: "Campaigns", years: "years" },
    tr: { bio: "Biyografi", reforms: "Reformlar", campaigns: "Seferler", style: "Liderlik Tarzı", critical: "Eleştirel Perspektifler", aiBtn: "AI Derinlemesine Analiz", back: "Tüm Profiller", stats: "İstatistikler", reign: "Hükümdarlık", reformCount: "Reform sayısı", campaignCount: "Seferler", years: "yıl" },
  };
  const l = labels[language as keyof typeof labels] || labels.en;

  const reignLength = leader ? leader.reignEnd - leader.reignStart : 0;
  const reformCount = (profile.reforms[language] || profile.reforms.en).length;
  const campaignCount = (profile.campaigns[language] || profile.campaigns.en).length;

  return (
    <AppLayout language={language} setLanguage={setLanguage}>
      <div className="h-full overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
          <Link to="/profiles" className="inline-flex items-center gap-1 text-xs font-sans text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="w-3 h-3" /> {l.back}
          </Link>

          {/* Imperial header */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl ottoman-border p-6 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute inset-0 gold-gradient opacity-[0.03]" />
            <div className="relative flex items-center gap-5">
              <div className="text-5xl w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center ottoman-glow">
                {profile.portrait}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-serif text-primary flex items-center gap-2">
                  <Crown className="w-5 h-5" /> {profile.name}
                </h1>
                <p className="text-sm font-sans text-muted-foreground">{profile.years}</p>
                <p className="text-sm font-sans text-primary/80">{profile.title[language] || profile.title.en}</p>
              </div>
            </div>

            {/* Mini reign timeline */}
            {leader && (
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2 mb-1.5">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] font-sans text-muted-foreground">{l.reign}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-sans text-muted-foreground">{formatYear(leader.reignStart, language)}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full gold-gradient rounded-full transition-all duration-1000" style={{ width: "100%" }} />
                  </div>
                  <span className="text-[10px] font-sans text-muted-foreground">{formatYear(leader.reignEnd, language)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Stats panel */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Calendar, label: l.reign, value: `${reignLength} ${l.years}` },
              { icon: BookOpen, label: l.reformCount, value: String(reformCount) },
              { icon: Sword, label: l.campaignCount, value: String(campaignCount) },
            ].map((stat, i) => (
              <div key={i} className="bg-card/60 backdrop-blur-sm rounded-xl ottoman-border p-4 text-center animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                <p className="text-xl font-serif text-foreground">{stat.value}</p>
                <p className="text-[10px] font-sans text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <section className="bg-card/60 backdrop-blur-sm rounded-2xl ottoman-border p-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h2 className="text-sm font-serif text-primary mb-2">{l.bio}</h2>
            <p className="text-sm font-sans text-foreground/85 leading-relaxed">{profile.bio[language] || profile.bio.en}</p>
          </section>

          <div className="grid sm:grid-cols-2 gap-4">
            <section className="bg-card/60 backdrop-blur-sm rounded-2xl ottoman-border p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h2 className="text-sm font-serif text-primary mb-2">{l.reforms}</h2>
              <ul className="space-y-1.5">
                {(profile.reforms[language] || profile.reforms.en).map((r, i) => (
                  <li key={i} className="text-xs font-sans text-foreground/80 flex items-start gap-2"><span className="text-primary mt-0.5">•</span>{r}</li>
                ))}
              </ul>
            </section>
            <section className="bg-card/60 backdrop-blur-sm rounded-2xl ottoman-border p-5 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h2 className="text-sm font-serif text-primary mb-2">{l.campaigns}</h2>
              <ul className="space-y-1.5">
                {(profile.campaigns[language] || profile.campaigns.en).map((c, i) => (
                  <li key={i} className="text-xs font-sans text-foreground/80 flex items-start gap-2"><span className="text-primary mt-0.5">⚔</span>{c}</li>
                ))}
              </ul>
            </section>
          </div>

          <section className="bg-card/60 backdrop-blur-sm rounded-2xl ottoman-border p-5 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <h2 className="text-sm font-serif text-primary mb-2">{l.style}</h2>
            <p className="text-sm font-sans text-foreground/85 leading-relaxed">{profile.leadershipStyle[language] || profile.leadershipStyle.en}</p>
          </section>

          <section className="bg-card/60 backdrop-blur-sm rounded-2xl ottoman-border p-5 animate-fade-in" style={{ animationDelay: "500ms" }}>
            <h2 className="text-sm font-serif text-primary mb-2">{l.critical}</h2>
            <p className="text-sm font-sans text-foreground/85 leading-relaxed">{profile.criticalPerspectives[language] || profile.criticalPerspectives.en}</p>
          </section>

          <button onClick={handleDeepAnalysis} disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl gold-gradient text-primary-foreground text-sm font-sans font-medium hover:opacity-90 transition-opacity disabled:opacity-50 ottoman-glow">
            <Sparkles className="w-4 h-4" /> {l.aiBtn}
          </button>

          {messages.length > 0 && (
            <div className="space-y-3 border-t border-border pt-4">
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg} isStreaming={isLoading && i === messages.length - 1} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
