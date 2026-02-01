import { fetch } from 'expo/fetch';
import { CourseForm } from '@/types/schedule';

export async function searchCourses(courseForm: CourseForm) {
  const params = new URLSearchParams({
    periodo: courseForm.period,
    sigla: courseForm.sigle,
    nrc: courseForm.nrc,
    nombre: courseForm.name,
    profesor: courseForm.teacher,
    campus: courseForm.campus,
    formato: courseForm.format,
    categoria: courseForm.category,
    area_fg: courseForm.generalFormationArea,
    unidad_academica: courseForm.academicUnit,
    periodo_admision: courseForm.admissionPeriod,
    escuela: courseForm.school,
    nivel: courseForm.programLevel,
    proxy_url: 'https://buscacursos.vicmoor07.workers.dev/',
  });

  const res = await fetch(
    `https://buscacursosapi.viccmoor.xyz/api/cursos/?${params}`
  );

  if (!res.ok) throw new Error('Error buscando cursos');
  return res.json();
};
