import '@/global.css';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import { useState } from 'react';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { defaultModules, DAY_INDEX } from '@/constants/schedule';
import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';
import { DayBlocks, ModuleIndex, Modules } from '@/types/schedule';

import FloatingActionButton from '@/components/schedule/FloatingActionButton';
import AddCourseModal from '@/components/schedule/AddCourseModal';
import ScheduleView from '@/components/schedule/ScheduleView';
import BlockModal from '@/components/schedule/BlockModal';

export default function Schedule() {
  const [modules, updateModules] = useState<Modules>(defaultModules);
  const [modalVisible, setModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<{
    mod: { id: number, label: string, range: string };
    dayBlocks: DayBlocks;
    dayIndex: number;
  } | null>(null);
  const [searchResults, setSearchResults] = useState([]);

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
                  location: curso.sala,
                  type: h.tipo,
                  nrc: curso.nrc,
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
        onClose={() => setBlockModalVisible(false)}
        mod={selectedBlock?.mod ?? null}
        dayBlocks={selectedBlock?.dayBlocks ?? null}
        dayIndex={selectedBlock?.dayIndex ?? null}
      />

      <AddCourseModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onResults={(results) => {
          setSearchResults(results);
          setResultsModalVisible(true);
        }}
      />

      <View className='absolute bottom-[20px] right-[25px] items-end'>
        <FloatingActionButton
          onAddCourse={() => setModalVisible(true)}
          onShare={() => {}}
        />

        <Modal
          visible={resultsModalVisible}
          animationType='slide'
          transparent={true}
        >
          <View className='flex-1 bg-black/50 justify-center items-center'>
            <View className='w-[95%] h-[80%] bg-[color:var(--color-bg)] rounded-2xl p-4'>
              <Text className='text-xl font-bold text-center mb-4 text-[#2D336B]'>
                Se han encontrado {searchResults.length} cursos
              </Text>

              <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
                {searchResults.map((curso: any, index) => (
                  <Pressable
                    key={index}
                    onPress={() => addCourseToSchedule(curso)}
                    className='bg-[#F8F9FA] p-4 rounded-xl mb-3 border-l-4 border-[#2D336B] shadow-sm active:opacity-70'
                  >
                    <View className='flex-row justify-between items-start'>
                      <View className='flex-1'>
                        <Text className='text-[#2D336B] font-bold text-sm'>{curso.sigla}</Text>
                        <Text className='text-gray-800 font-semibold text-lg' numberOfLines={1}>
                          {curso.nombre}
                        </Text>
                        <Text className='text-gray-500 text-xs'>Sección: {curso.seccion} | NRC: {curso.nrc}</Text>
                        <Text className='text-gray-600 text-sm italic mt-1'>{curso.profesor.join(', ')}</Text>
                      </View>
                      <MaterialIcons name='add-circle-outline' size={24} color='#2D336B' />
                    </View>
                  </Pressable>
                ))}
              </ScrollView>

              <Pressable
                onPress={() => setResultsModalVisible(false)}
                className='mt-4 bg-gray-200 p-3 rounded-xl items-center'
              >
                <Text className='text-gray-600 font-bold'>Volver a buscar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
