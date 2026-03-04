import { useNavigate } from "react-router-dom";
import { useEmpire } from "@/contexts/EmpireContext";
import { empireList } from "@/data/empires";
import { Globe } from "lucide-react";

export default function EmpireSelect() {
  const { setEmpireId } = useEmpire();
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    setEmpireId(id);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-2xl w-full mx-4 space-y-8">
        <div className="text-center">
          <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-serif text-primary">Choose Your Empire</h1>
          <p className="text-muted-foreground text-sm mt-2 font-sans">Select a civilization to explore</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {empireList.map((empire) => (
            <button
              key={empire.id}
              onClick={() => handleSelect(empire.id)}
              className="bg-card/80 backdrop-blur-sm rounded-2xl ottoman-border p-8 flex flex-col items-center text-center hover:bg-muted/50 transition-all duration-300 group hover:scale-[1.02]"
            >
              <img
                src={empire.crestImage}
                alt={empire.name.en}
                className="w-24 h-24 rounded-full object-cover mb-4 group-hover:scale-110 transition-transform duration-300 ottoman-glow"
              />
              <h2 className="text-xl font-serif text-primary mb-2">{empire.name.en}</h2>
              <p className="text-xs text-muted-foreground font-sans">{empire.homeDescription.en}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
