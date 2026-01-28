import {
  Block,
  Calendars,
  CourseForm,
  Module,
  ModuleIndex,
  Modules,
  OptionSelectorData,
  TypeColor
} from '@/types/schedule';

export const emptyBlock: Block = {
  name: '',
  sigle: '',
  section: '',
  teacher: '',
  location: '',
  campus: '',
  type: '',
  nrc: '',
  day: '',
  module: 0,
};

export const createEmptyModule = (days = 6): Module =>
  Array.from({ length: days }, () => []);

export const moduleIndexes: ModuleIndex[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
];

export const defaultModules: Modules = Object.fromEntries(
  moduleIndexes.map(i => [i, createEmptyModule()])
) as Modules;

export const MODULES = [
  { id: 1, label: 'Mod 1', start: '8:20', range: '8:20 - 9:30' },
  { id: 2, label: 'Mod 2', start: '9:40', range: '9:40 - 10:50' },
  { id: 3, label: 'Mod 3', start: '11:00', range: '11:00 - 12:10' },
  { id: 4, label: 'Mod 4', start: '12:20', range: '12:20 - 13:30' },
  { id: 5, label: 'Mod 5', start: '14:50', range: '14:50 - 16:00' },
  { id: 6, label: 'Mod 6', start: '16:10', range: '16:10 - 17:20' },
  { id: 7, label: 'Mod 7', start: '17:30', range: '17:30 - 18:40' },
  { id: 8, label: 'Mod 8', start: '18:50', range: '18:50 - 20:00' },
  { id: 9, label: 'Mod 9', start: '20:10', range: '20:10 - 21:20' },
];

export const DAYS = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

export const DAY_INDEX: Record<string, number> = {
  L: 0,
  M: 1,
  W: 2,
  J: 3,
  V: 4,
  S: 5,
};

export const DAY_MAP: Record<number, string> = {
  0: 'Lunes',
  1: 'Martes',
  2: 'Miércoles',
  3: 'Jueves',
  4: 'Viernes',
  5: 'Sábado',
};

export const TYPE_COLORS: { [key: string]: TypeColor } = {
  'CLAS': { bg: '#FDE2BA', border: '#F79708'},
  'AYU':  { bg: '#D0E7D0', border: '#55AA55'},
  'LAB':  { bg: '#b3d4f5', border: '#4696E7'},
  'TER':  { bg: '#ffccff', border: '#FF5CFF'},
  'TAL':  { bg: '#c7c2f8', border: '#7A6DEE'},
  'PRA':  { bg: '#cccc99', border: '#AAAA55'},
  'TES':  { bg: '#b2efef', border: '#78E3E3'},
  'OTR':  { bg: '#ff9999', border: '#FF2E2E'},
  'DEFAULT': { bg: '#E8F5E9', border: '#2E7D32'},
};

export const EMPTY_COURSE_FORM: CourseForm = {
  period: '',
  name: '',
  sigle: '',
  nrc: '',
  teacher: '',
  campus: 'TODOS',
  format: 'TODOS',
  category: 'TODOS',
  generalFormationArea: 'TODOS',
  academicUnit: 'TODOS',
  admissionPeriod: 'TODOS',
  school: 'TODOS',
  programLevel: 'TODOS',
};

export const EMPTY_OPTION_SELECTOR_DATA: OptionSelectorData = {
  options: [],
  name: '',
  field: '',
  selectedValue: '',
};

export const DEFAULT_CALENDARS: Calendars = {
  '2026-1': {
    name: 'Primer semestre 2026',
    modules: defaultModules,
  },
  '2026-2': {
    name: 'Segundo semestre 2026',
    modules: defaultModules,
  },
};