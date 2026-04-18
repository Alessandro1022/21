import { useNavigate } from "react-router-dom";
import { useEmpire } from "@/contexts/EmpireContext";
import { empireList } from "@/data/empires";
import { Globe, Crown, Lock, Sparkles } from "lucide-react";
import { usePremium } from "@/hooks/usePremium";

export default function EmpireSelect() {
  const { setEmpireId } = useEmpire();
  const { canAccess } = usePremium();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    if (!canAccess(id)) {
      navigate("/pricing");
      return;
    }

    setEmpireId(id);
    navigate("/");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">

      {/* 🌌 background glow */}
      <div className="absolute w-[600px] h-[600px] bg-yellow-500/10 blur-[140px] rounded-full top-[-150px] left-[-150px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full bottom-[-150px] right-[-150px]" />

      <div className="w-full max-w-5xl mx-auto px-4 space-y-10 z-10">

        {/* HEADER */}
        <div className="text-center">
          <Globe className="w-14 h-14 text-yellow-400 mx-auto mb-4 animate-pulse" />

          <h1 className="text-4xl font-serif text-white tracking-wide">
            Choose Your Empire
          </h1>

          <p className="text-zinc-400 text-sm mt-2">
            Step into history. Unlock civilizations.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          {empireList.map((empire) => {
            const locked = !canAccess(empire.id);

            return (
              <button
                key={empire.id}
                onClick={() => handleSelect(empire.id)}
                className={`
                  relative group rounded-3xl p-6 text-center overflow-hidden
                  transition-all duration-300
                  border backdrop-blur-xl
                  ${locked
                    ? "border-zinc-800 bg-zinc-900/40 opacity-70"
                    : "border-yellow-500/20 bg-zinc-900/70 hover:scale-[1.03] hover:border-yellow-400/50"
                  }
                `}
              >

                {/* hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-yellow-500/10 to-transparent" />

                {/* LOCK STATE */}
                {locked && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-zinc-400">
                    <Lock className="w-4 h-4" />
                  </div>
                )}

                {/* IMAGE */}
                <div className="relative flex justify-center mb-4">
                  <img
                    src={empire.crestImage}
                    alt={empire.name.en}
                    className={`w-24 h-24 rounded-full object-cover transition duration-300
                      ${locked ? "grayscale blur-[1px]" : "group-hover:scale-110"}
                    `}
                  />

                  {!locked && (
                    <div className="absolute inset-0 rounded-full border border-yellow-400/30 blur-sm opacity-0 group-hover:opacity-100 transition" />
                  )}
                </div>

                {/* TITLE */}
                <h2 className="text-xl font-serif text-white flex items-center justify-center gap-2">
                  {empire.name.en}
                  {!locked && <Crown className="w-4 h-4 text-yellow-400" />}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-xs text-zinc-400 mt-2">
                  {empire.homeDescription.en}
                </p>

                {/* LOCK CTA */}
                {locked && (
                  <div className="mt-4 inline-flex items-center gap-2 text-xs text-yellow-400/80">
                    <Sparkles className="w-3.5 h-3.5" />
                    Unlock with Premium
                  </div>
                )}

              </button>
            );
          })}

        </div>
      </div>
    </div>
  );
}
