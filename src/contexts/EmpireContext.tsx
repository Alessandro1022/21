import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { empires, type EmpireConfig } from "@/data/empires";

interface EmpireContextValue {
  empireId: string | null;
  config: EmpireConfig | null;
  setEmpireId: (id: string) => void;
}

const EmpireContext = createContext<EmpireContextValue>({
  empireId: null,
  config: null,
  setEmpireId: () => {},
});

export function EmpireProvider({ children }: { children: ReactNode }) {
  const [empireId, setEmpireIdState] = useState<string | null>(() => {
    return localStorage.getItem("selectedEmpire");
  });

  const setEmpireId = (id: string) => {
    localStorage.setItem("selectedEmpire", id);
    setEmpireIdState(id);
    document.documentElement.setAttribute("data-empire", id);
  };

  useEffect(() => {
    if (empireId) {
      document.documentElement.setAttribute("data-empire", empireId);
    }
  }, [empireId]);

  const config = empireId ? empires[empireId] || null : null;

  return (
    <EmpireContext.Provider value={{ empireId, config, setEmpireId }}>
      {children}
    </EmpireContext.Provider>
  );
}

export function useEmpire() {
  return useContext(EmpireContext);
}
