import { DAY_INDEX } from '@/constants/schedule';
import { Block, Modules, ModuleIndex } from '@/types/schedule';

export function addCourseToModules(modules: Modules, course: any) {
	const newModules = JSON.parse(JSON.stringify(modules));

	course.horario.forEach((h: any) => {
		const dayIndex = DAY_INDEX[h.dia];
		const moduleId = h.modulo as ModuleIndex;
		if (dayIndex === undefined) return;

		const dayBlocks = newModules[moduleId][dayIndex];
		const exists = dayBlocks.some((b: Block) =>
			b.sigle === course.sigla &&
			b.section === course.seccion
		);

		if (!exists) {
			dayBlocks.push({
				name: course.nombre,
				sigle: course.sigla,
				section: course.seccion,
				teacher: course.profesor.join(', '),
				location: h.sala,
				campus: course.campus,
				type: h.tipo,
				nrc: course.nrc,
				day: h.dia,
				module: h.modulo,
			});
		}
	});

	return newModules;
}

export function deleteCourseByNRC(modules: Modules, nrc: string) {
	const newModules = JSON.parse(JSON.stringify(modules));

	Object.keys(newModules).forEach((moduleKey) => {
    const moduleIndex = Number(moduleKey) as keyof Modules;

    newModules[moduleIndex].forEach((dayBlocks: Block[]) => {
      for (let i = dayBlocks.length - 1; i >= 0; i--) {
        if (dayBlocks[i].nrc === nrc) {
          dayBlocks.splice(i, 1);
        }
      }
    });
  });

  return newModules;
}

export function deleteSingleBlock(
  modules: Modules,
  module: ModuleIndex,
  dayIndex: number,
  block: Block
): Modules {
  const newModules = JSON.parse(JSON.stringify(modules));

  newModules[module][dayIndex] = newModules[module][dayIndex].filter(
    (b: Block) =>
      !(
        b.nrc === block.nrc &&
        b.type === block.type &&
        b.day === block.day &&
        b.module === block.module
      )
  );

  return newModules;
}