import { ottomanEmpire } from "./ottoman";
import { romanEmpire } from "./roman";
import { islamicEmpire } from "./islamic";
import { mongolEmpire } from "./mongol";
import { egyptEmpire } from "./egypt";
import { britishEmpire } from "./britishEmpire";
import { japaneseEmpire } from "./japanese";
import { maliEmpire } from "./mali";
import { seljukEmpire } from "./seljuk";
import type { EmpireConfig } from "./types";

export type { EmpireConfig };
export { formatYear } from "./types";

export const empires: Record<string, EmpireConfig> = {
  ottoman: ottomanEmpire,
  roman: romanEmpire,
  islamic_caliphate: islamicEmpire,
  mongol_empire: mongolEmpire,
  ancient_egypt: egyptEmpire,
  british_empire: britishEmpire,
  japanese_empire: japaneseEmpire, 
  mali_empire: maliEmpire, 
  seljuk_empire: seljukEmpire, 


};

export const empireList: EmpireConfig[] = Object.values(empires);
