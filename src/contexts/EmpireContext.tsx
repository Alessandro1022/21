import {
createContext,
useContext,
useState,
useEffect,
useCallback,
type ReactNode,
} from “react”;
import { empires, type EmpireConfig } from “@/data/empires”;

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface EmpireContextValue {
empireId: string | null;
config: EmpireConfig | null;
setEmpireId: (id: string) => void;

// Story mode: last visited chapter per empire
lastChapter: number;
setLastChapter: (chapter: number) => void;
}

// ─────────────────────────────────────────────
// Safe localStorage helpers
// Never crash if storage is unavailable (private browsing, quota exceeded, etc.)
// ─────────────────────────────────────────────
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
// storage full or unavailable — fail silently
}
}

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────
const EmpireContext = createContext<EmpireContextValue>({
empireId: null,
config: null,
setEmpireId: () => {},
lastChapter: 0,
setLastChapter: () => {},
});

// ─────────────────────────────────────────────
// Provider
// ─────────────────────────────────────────────
export function EmpireProvider({ children }: { children: ReactNode }) {
const [empireId, setEmpireIdState] = useState<string | null>(() => {
const saved = safeGet(“selectedEmpire”);
// Validate that the saved empire actually exists in our data
if (saved && empires[saved]) return saved;
return null;
});

// Last chapter is stored per empire: “story_chapter_<empireId>”
const [lastChapter, setLastChapterState] = useState<number>(() => {
const saved = safeGet(“selectedEmpire”);
if (!saved) return 0;
const raw = safeGet(`story_chapter_${saved}`);
const parsed = parseInt(raw ?? “”, 10);
return isNaN(parsed) ? 0 : parsed;
});

// ── Set empire ──────────────────────────────
const setEmpireId = useCallback((id: string) => {
// Guard: only accept known empire ids
if (!empires[id]) {
console.warn(`[EmpireContext] Unknown empire id: "${id}"`);
return;
}
safeSet(“selectedEmpire”, id);
setEmpireIdState(id);
document.documentElement.setAttribute(“data-empire”, id);

```
// Restore last chapter for this empire
const raw = safeGet(`story_chapter_${id}`);
const parsed = parseInt(raw ?? "", 10);
setLastChapterState(isNaN(parsed) ? 0 : parsed);
```

}, []);

// ── Set last chapter ────────────────────────
// Called by StoryMode whenever the user navigates to a new chapter
const setLastChapter = useCallback(
(chapter: number) => {
if (!empireId) return;
setLastChapterState(chapter);
safeSet(`story_chapter_${empireId}`, String(chapter));
},
[empireId]
);

// ── Sync data-empire attribute on mount ────
useEffect(() => {
if (empireId) {
document.documentElement.setAttribute(“data-empire”, empireId);
}
}, [empireId]);

// ── Derive config safely ────────────────────
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

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────
export function useEmpire() {
return useContext(EmpireContext);
}