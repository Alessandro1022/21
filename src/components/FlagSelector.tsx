interface FlagSelectorProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const FLAGS = [
  { value: "sv", emoji: "🇸🇪", label: "Svenska" },
  { value: "en", emoji: "🇬🇧", label: "English" },
  { value: "tr", emoji: "🇹🇷", label: "Türkçe" },
];

export function FlagSelector({ language, setLanguage }: FlagSelectorProps) {
  return (
    <div className="flex gap-1">
      {FLAGS.map((flag) => (
        <button
          key={flag.value}
          onClick={() => setLanguage(flag.value)}
          title={flag.label}
          className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all ${
            language === flag.value
              ? "bg-primary/20 ring-2 ring-primary scale-110"
              : "hover:bg-muted opacity-60 hover:opacity-100"
          }`}
        >
          {flag.emoji}
        </button>
      ))}
    </div>
  );
}
