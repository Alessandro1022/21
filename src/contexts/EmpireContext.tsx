import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { empires, type EmpireConfig } from "@/data/empires";

// =============================================================================
// TYPES
// =============================================================================

interface EmpireContextValue {
  empireId: string | null;
  config: EmpireConfig | null;
  setEmpireId: (id: string) => void;
  lastChapter: number;
  setLastChapter: (chapter: number) => void;
}

// =============================================================================
// SAFE LOCALSTORAGE
// Never crash in private browsing, quota exceeded, Safari ITP, etc.
// =============================================================================

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage full or unavailable - fail silently
  }
}

// =============================================================================
// CONTEXT DEFAULT
// =============================================================================

const EmpireContext = createContext<EmpireContextValue>({
  empireId: null,
  config: null,
  setEmpireId: () => {},
  lastChapter: 0,
  setLastChapter: () => {},
});

// =============================================================================
// PROVIDER
// =============================================================================
export const islamicConfig: EmpireConfig = {
  id: "islamic",
  name: "Islamic Caliphate",

  // ✅ Bakgrundsbild
  backgroundImage: islamicBackground,

  // ✅ Logo
  logo: islamicLogo,

  // ... resten av din config
};
export function EmpireProvider({ children }: { children: ReactNode }) {

  // Initialize empireId from localStorage, validate against known empires
  const [empireId, setEmpireIdState] = useState<string | null>(() => {
    const saved = safeGet("selectedEmpire");
    if (saved && empires[saved]) return saved;
    return null;
  });

  // Initialize lastChapter from localStorage for the saved empire
  const [lastChapter, setLastChapterState] = useState<number>(() => {
    const saved = safeGet("selectedEmpire");
    if (!saved) return 0;
    const raw = safeGet("story_ch_" + saved);
    const parsed = parseInt(raw ?? "", 10);
    return isNaN(parsed) ? 0 : parsed;
  });

  // ---------------------------------------------------------------------------
  // setEmpireId
  // Validates the id, persists it, updates the DOM attribute, and restores
  // the last chapter position for this empire.
  // ---------------------------------------------------------------------------
  const setEmpireId = useCallback((id: string) => {
    if (!empires[id]) {
      console.warn("[EmpireContext] Unknown empire id: " + id);
      return;
    }
    safeSet("selectedEmpire", id);
    setEmpireIdState(id);
    document.documentElement.setAttribute("data-empire", id);

    // Restore last chapter for this empire
    const raw = safeGet("story_ch_" + id);
    const parsed = parseInt(raw ?? "", 10);
    setLastChapterState(isNaN(parsed) ? 0 : parsed);
  }, []);

  // ---------------------------------------------------------------------------
  // setLastChapter
  // Called by StoryMode on every chapter navigation.
  // Persists per-empire so the user resumes where they left off.
  // ---------------------------------------------------------------------------
  const setLastChapter = useCallback((chapter: number) => {
    if (!empireId) return;
    setLastChapterState(chapter);
    safeSet("story_ch_" + empireId, String(chapter));
  }, [empireId]);

  // Sync data-empire DOM attribute whenever empireId changes (e.g. on mount)
  useEffect(() => {
    if (empireId) {
      document.documentElement.setAttribute("data-empire", empireId);
    }
  }, [empireId]);

  // Derive config safely - null if empire doesn't exist in data
  const config: EmpireConfig | null = empireId
    ? (empires[empireId] ?? null)
    : null;

  return (
    <EmpireContext.Provider
      value={{ empireId, config, setEmpireId, lastChapter, setLastChapter }}
    >
      {children}
    </EmpireContext.Provider>
  );
}

// =============================================================================
// HOOK
// =============================================================================

export function useEmpire() {
  return useContext(EmpireContext);
}
