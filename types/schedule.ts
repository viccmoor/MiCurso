export type Course = {
  sigla: string;
  nombre: string;
  seccion: string;
  nrc: string;
  profesor: string[];
  horario: any[];
};

export type CourseBlock = {
  nombre: string;
  sigla: string;
  sala: string;
  tipo: string;
  seccion: string;
};

export type ScheduleT = {
  [day: string]: {
    [moduleId: number]: CourseBlock[];
  };
};

export interface TypeColor {
  bg: string;
  border: string;
}