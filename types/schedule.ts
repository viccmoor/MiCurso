export type Block = {
  name: string;
  sigle: string;
  section: string;
  teacher: string;
  location: string;
  type: string;
  nrc: string;
};

export type DayBlocks = Block[];
export type Module = DayBlocks[];

export type ModuleIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Modules = Record<ModuleIndex, Module>;

export interface TypeColor {
  bg: string;
  border: string;
}