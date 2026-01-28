import { fetch } from 'expo/fetch';
import { CourseForm } from '@/types/schedule';

export async function searchCourses(courseForm: CourseForm) {
  console.log(courseForm)
  const params = new URLSearchParams({
    periodo: courseForm.period,
    sigla: courseForm.sigle,
    nrc: courseForm.nrc,
    nombre: courseForm.name,
    profesor: courseForm.teacher,
  });

  const res = await fetch(
    `https://buscacursosapi.viccmoor.xyz/api/cursos/?${params}`
  );

  if (!res.ok) throw new Error('Error buscando cursos');

  return res.json();
};
