export type Block = {
  name: string;
  sigle: string;
  section: string;
  teacher: string;
  location: string;
  campus: string;
  type: string;
  nrc: string;
  day: string;
  module: number;
};

export type DayBlocks = Block[];
export type Module = DayBlocks[];

export type ModuleIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Modules = Record<ModuleIndex, Module>;

export interface TypeColor {
  light: string;
  dark: string;
  card: string;
}

export type CourseForm = {
  period: string;
  name: string;
  sigle: string;
  nrc: string;
  teacher: string;
  campus: string;
  format: string;
  category: string;
  generalFormationArea: string;
  academicUnit: string;
  admissionPeriod: string;
  school: string;
  programLevel: string;
}

export type DataOption = {
  label: string;
  value: string;
};

export type OptionSelectorData = {
  options: DataOption[];
  name: string;
  field: string;
  selectedValue: string;
};

export type Calendar = {
  name: string;
  modules: Modules;
};

export type Calendars = Record<string, Calendar>;

export type ScheduleModalData = {
  calendars: Calendars;
  currentPeriod: string;
};

export type ModuleInfo = {
  id: ModuleIndex;
  label: string;
  start: string;
  range: string;
};

export type SelectedBlock = {
  mod: ModuleInfo;
  dayIndex: number;
};

export type AlertInfo = {
  title: string;
  description: string;
};

export type NextClass = {
  block: Block;
  date: Date;
  dayIndex: number;
}