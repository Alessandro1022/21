import { ottomanEmpire } from "./ottoman";
import { romanEmpire } from "./roman";
import type { EmpireConfig } from "./types";

export type { EmpireConfig };
export { formatYear } from "./types";

export const empires: Record<string, EmpireConfig> = {
  ottoman: ottomanEmpire,
  roman: romanEmpire,
};

export const empireList: EmpireConfig[] = Object.values(empires);
