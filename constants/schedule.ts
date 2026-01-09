import { TypeColor } from '@/types/schedule';

export const MODULES = [
  { id: 1, label: 'Mod 1', range: '8:20 - 9:30' },
  { id: 2, label: 'Mod 2', range: '9:40 - 10:50' },
  { id: 3, label: 'Mod 3', range: '11:00 - 12:10' },
  { id: 4, label: 'Mod 4', range: '12:20 - 13:30' },
  { id: 5, label: 'Mod 5', range: '13:30 - 14:50' },
  { id: 6, label: 'Mod 6', range: '14:50 - 16:00' },
  { id: 7, label: 'Mod 7', range: '16:10 - 17:20' },
  { id: 8, label: 'Mod 8', range: '17:30 - 18:40' },
  { id: 9, label: 'Mod 9', range: '18:50 - 20:00' },
  { id: 10, label: 'Mod 10', range: '20:10 - 21:20' },
];

export const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

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