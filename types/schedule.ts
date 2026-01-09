export interface TypeColor {
  bg: string;
  border: string;
}

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