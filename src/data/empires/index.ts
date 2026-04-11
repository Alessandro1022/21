import { ottomanEmpire } from "./ottoman";
import { romanEmpire } from "./roman";
import { islamicEmpire } from "./islamic";
import type { EmpireConfig } from "./types";

export type { EmpireConfig };
export { formatYear } from "./types";

export const empires: Record<string, EmpireConfig> = {
  ottoman: ottomanEmpire,
  roman: romanEmpire,
  islamic_caliphate: islamicEmpire,
};

export const empireList: EmpireConfig[] = Object.values(empires);
