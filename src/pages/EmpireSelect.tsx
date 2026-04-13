import { useNavigate } from "react-router-dom";
import { useEmpire } from "@/contexts/EmpireContext";
import { empireList } from "@/data/empires";
import { Globe, Crown, Lock } from "lucide-react";

export default function EmpireSelect() {
  const { setEmpireId } = useEmpire();
  const navigate = useNavigate();

  const handleSelect = (id: string, locked?: boolean) => {
    if (locked) return; // future premium lock
    setEmpireId(id);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black relative overflow-hidden">

      {/* 🔥 Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="max-w-4xl w-full mx-4 space-y-10 z-10">

        {/* HEADER */}
        <div className="text-center">
          <Globe className="w-14 h-14 text-primary mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-serif text-white tracking-wide">
            Choose Your Empire
          </h1>
          <p className="text-zinc-400 text-sm mt-2">
            Explore history like never before
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {empireList.map((empire) => {
            const isLocked = empire.isPremium && empire.id !== "ottoman" && empire.id !== "roman";

            return (
              <button
                key={empire.id}
                onClick={() => handleSelect(empire.id, isLocked)}
                className={`relative rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 group overflow-hidden
                  ${isLocked ? "opacity-60 cursor-not-allowed" : "hover:scale-[1.04] hover:-translate-y-1"}
                  bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 hover:border-primary/50`}
              >

                {/* LOCK ICON */}
                {isLocked && (
                  <Lock className="absolute top-3 right-3 w-4 h-4 text-zinc-400" />
                )}

                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={empire.crestImage}
                    alt={empire.name.en}
                    className="w-24 h-24 rounded-full object-cover mb-4 transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* glow ring */}
                  <div className="absolute inset-0 rounded-full border border-primary/30 blur-sm opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* NAME */}
                <h2 className="text-xl font-serif text-white mb-1 flex items-center gap-2">
                  {empire.name.en}
                  {!isLocked && <Crown className="w-4 h-4 text-yellow-400" />}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-xs text-zinc-400">
                  {empire.homeDescription.en}
                </p>

                {/* HOVER GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
