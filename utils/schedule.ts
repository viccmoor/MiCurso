import { DAY_INDEX, MODULES } from '@/constants/schedule';
import { Block, Calendars, Modules, ModuleIndex, NextClass } from '@/types/schedule';

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

export function isValidParam(value: string) {
	const v = value.trim();
	return v !== '' && v !== 'TODOS';
}

export function getNextClass(calendars: Calendars, currentPeriod: string) {
	const calendar = calendars[currentPeriod];
  if (!calendar) return null;

  const now = new Date();
  const today = new Date();

  const todayIndex = (today.getDay() + 6) % 7;
  const futureClasses: NextClass[] = [];

  Object.entries(calendar.modules).forEach(([moduleKey, module]) => {
    const moduleIndex = Number(moduleKey) as ModuleIndex;
    const moduleInfo = MODULES.find(m => m.id === moduleIndex);
    if (!moduleInfo) return;

    const [hour, minute] = moduleInfo.start.split(':').map(Number);

    module.forEach((dayBlocks, dayIndex) => {
      dayBlocks.forEach(block => {
        const classDate = new Date();
        classDate.setHours(hour, minute, 0, 0);

        let diffDays = dayIndex - todayIndex;
        if (diffDays < 0) diffDays += 7;

        classDate.setDate(today.getDate() + diffDays);

        if (classDate > now) {
          futureClasses.push({
            block,
            date: classDate,
            dayIndex,
          });
        }
      });
    });
  });

  futureClasses.sort((a, b) => a.date.getTime() - b.date.getTime());

  return futureClasses[0] ?? null;
};