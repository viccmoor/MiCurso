import {
  Block,
  Module,
  ModuleIndex,
  Modules,
  TypeColor
} from '@/types/schedule';

export const emptyBlock: Block = {
  name: '',
  sigle: '',
  section: '',
  teacher: '',
  location: '',
  type: '',
  nrc: '',
};

export const createEmptyModule = (days = 6): Module =>
  Array.from({ length: days }, () => []);

export const moduleIndexes: ModuleIndex[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
];

export const defaultModules: Modules = Object.fromEntries(
  moduleIndexes.map(i => [i, createEmptyModule()])
) as Modules;

export const MODULES = [
  { id: 1, label: 'Mod 1', range: '8:20' },
  { id: 2, label: 'Mod 2', range: '9:40' },
  { id: 3, label: 'Mod 3', range: '11:00' },
  { id: 4, label: 'Mod 4', range: '12:20' },
  { id: 5, label: 'Mod 5', range: '13:30' },
  { id: 6, label: 'Mod 6', range: '14:50' },
  { id: 7, label: 'Mod 7', range: '16:10' },
  { id: 8, label: 'Mod 8', range: '17:30' },
  { id: 9, label: 'Mod 9', range: '18:50' },
  { id: 10, label: 'Mod 10', range: '20:10' },
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