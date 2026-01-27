import '@/global.css';
import {
  View,
  Alert,
} from 'react-native';
import { useState } from 'react';

import { defaultModules, DAY_INDEX } from '@/constants/schedule';
import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';
import { DayBlocks, ModuleIndex, Modules } from '@/types/schedule';

import FloatingActionButton from '@/components/schedule/FloatingActionButton';
import AddCourseModal from '@/components/schedule/AddCourseModal';
import ScheduleView from '@/components/schedule/ScheduleView';
import BlockModal from '@/components/schedule/BlockModal';
import SearchResultsModal from '@/components/schedule/SearchResultsModal';
import CourseInfoModal from '@/components/schedule/CourseInfoModal';

export default function Schedule() {
  const [modules, updateModules] = useState<Modules>(defaultModules);
  const [modalVisible, setModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [courseInfoModalVisible, setCourseInfoModalVisible] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedBlock, setSelectedBlock] = useState<{
    mod: { id: number, label: string, start: string, range: string };
    dayBlocks: DayBlocks;
    dayIndex: number;
  } | null>(null);

  const { theme } = useTheme();
  const appColors = Colors[theme].app;

  const addCourseToSchedule = (curso: any) => {
    Alert.alert(
      'Agregar Curso',
      `¿Quieres añadir ${curso.sigla}-${curso.seccion} a tu horario?`,
      [
      { text: 'Cancelar', style: 'cancel' },
      { 
        text: 'Sí, agregar', 
        onPress: () => {
          updateModules(prev => {
            const next = { ...prev };

            curso.horario.forEach((h: any) => {
              const dayIndex = DAY_INDEX[h.dia];
              const moduleId = h.modulo as ModuleIndex;

              if (dayIndex === undefined) return;

              const dayBlocks = next[moduleId as ModuleIndex][dayIndex];

              const exists = dayBlocks.some(
                b =>
                  b.sigle === curso.sigla &&
                  b.section === curso.seccion
              );

              if (!exists) {
                dayBlocks.push({
                  name: curso.nombre,
                  sigle: curso.sigla,
                  section: curso.seccion,
                  teacher: curso.profesor.join(', '),
                  location: h.sala,
                  campus: curso.campus,
                  type: h.tipo,
                  nrc: curso.nrc,
                  day: h.dia,
                  module: h.modulo,
                });
              }
            });

            return { ...next };
          });

          setResultsModalVisible(false);
          Alert.alert('Añadido', `${curso.sigla} se sumó a tu horario.`);
        }
      }
    ]
    )
  };

  return (
    <View className='flex-1' style={{ backgroundColor: appColors.layout }}>
      <ScheduleView
        modules={modules}
        onPressBlock={(mod, dayBlocks, dayIndex) => {
          setSelectedBlock({ mod, dayBlocks, dayIndex });
          setBlockModalVisible(true);
        }}
      />
      
      <BlockModal
        visible={blockModalVisible}
        mod={selectedBlock?.mod ?? null}
        dayBlocks={selectedBlock?.dayBlocks ?? null}
        dayIndex={selectedBlock?.dayIndex ?? null}
        onClose={() => setBlockModalVisible(false)}
        onPressCourse={(course) => {
          setSelectedCourse(course);
          setCourseInfoModalVisible(true);
        }}
      />

      <CourseInfoModal
        visible={courseInfoModalVisible}
        course={selectedCourse}
        onClose={() => setCourseInfoModalVisible(false)}
      />

      <AddCourseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onResults={(results: any) => {
          setSearchResults(results);
          setResultsModalVisible(true);
        }}
      />

      <FloatingActionButton
        onAddCourse={() => setModalVisible(true)}
        onShare={() => {}}
      />

      <SearchResultsModal
        visible={resultsModalVisible}
        searchResults={searchResults}
        onAddCourse={(curso: any) => addCourseToSchedule(curso)}
        onClose={() => setResultsModalVisible(false)}
      />
    </View>
  );
}
