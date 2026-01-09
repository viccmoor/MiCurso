import { fetch } from 'expo/fetch';

export async function searchCourses(form: any) {
  const params = new URLSearchParams({
    periodo: '2026-1',
    sigla: form.sigla,
    nrc: form.nrc,
    nombre: form.nombre,
    profesor: form.profesor,
  });

  const res = await fetch(
    `https://buscacursosapi.viccmoor.xyz/api/cursos/?${params}`
  );

  if (!res.ok) throw new Error('Error buscando cursos');

  return res.json();
};
