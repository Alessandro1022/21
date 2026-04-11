import { ottomanEmpire } from "./ottoman";
import { romanEmpire } from "./roman";
import { islamicEmpire } from "./islamic";
import { mongol_empire } from "./mongol";
import type { EmpireConfig } from "./types";

export type { EmpireConfig };
export { formatYear } from "./types";

export const empires: Record<string, EmpireConfig> = {
  ottoman: ottomanEmpire,
  roman: romanEmpire,
  islamic_caliphate: islamicEmpire,
  mongol: mongol_empire,
};

export const empireList: EmpireConfig[] = Object.values(empires);
