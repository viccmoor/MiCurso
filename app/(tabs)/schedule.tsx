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

import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';
import { MODULES, DAYS, TYPE_COLORS } from '@/constants/schedule';
import { Course, CourseBlock, ScheduleT } from '@/types/schedule';

import FloatingActionButton from '@/components/schedule/FloatingActionButton';
import AddCourseModal from '@/components/schedule/AddCourseModal';

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleT>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState<Course[]>([]);

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
          const dayMap: { [key: string]: string } = {
            'L': 'Lun',
            'M': 'Mar',
            'W': 'Mié',
            'J': 'Jue',
            'V': 'Vie',
            'S': 'Sab',
          };

          setSchedule(prev => {
            const nextSchedule = { ...prev };

            curso.horario.forEach((block: any) => {
              const day = dayMap[block.dia];
              const modId = block.modulo;

              if (day) {
                if (!nextSchedule[day]) nextSchedule[day] = {};
                
                const existingBlocks = nextSchedule[day][modId] || [];
                const exists = existingBlocks.some(b => 
                  b.sigla === curso.sigla && b.seccion === curso.seccion
                );
                
                if (!exists) {
                  const newBlock: CourseBlock = {
                    nombre: curso.nombre,
                    sigla: curso.sigla,
                    sala: curso.sala,
                    tipo: block.tipo,
                    seccion: curso.seccion,
                  };
                  nextSchedule[day][modId] = [...existingBlocks, newBlock];
                }
              }
            });

            return nextSchedule;
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-row'>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View className='flex-row h-[50px]'>
                <View className='w-[100px]' />
                {DAYS.map(day => (
                  <View
                    key={day}
                    className='w-[110px] items-center justify-center'
                  >
                    <Text className='font-bold text-[color:var(--color-days-text)]'>
                      {day}
                    </Text>
                  </View>
                ))}
              </View>

              {MODULES.map(mod => (
                <View
                  key={mod.id}
                  className='flex-row min-h-[95px]'
                >
                  <View
                    key={mod.id}
                    className='w-[100px] min-h-[95px] justify-center items-center --color-bg'
                  >
                    <Text className='text-base font-bold text-[color:var(--color-modules-text)]'>
                      {mod.label}
                    </Text>
                    <Text className='text-xs text-[#999]'>
                      {mod.range}
                    </Text>
                  </View>

                  {mod.id === 5 ? (
                    <View
                      className="p-[4px]"
                      style={{ width: DAYS.length * 110 }}
                    >
                      <View className="flex-1 justify-center items-center bg-[#FFF3CD] rounded-lg">
                        <Text className='text-xl font-semibold text-[#856404]'>
                          Horario de Almuerzo
                        </Text>
                      </View>
                    </View>
                  ) : (
                    DAYS.map(day => (
                      <View
                        key={`${day}-${mod.id}`}
                        className='w-[110px] p-[4px]'
                      >
                        {schedule[day]?.[mod.id] ? (
                          <View className='flex-1 gap-[4px]'>
                            {schedule[day][mod.id].map((curso, idx) => {
                              const colors = TYPE_COLORS[curso.tipo] || TYPE_COLORS.DEFAULT;

                              return (
                                <View
                                  key={idx}
                                  style={{
                                    backgroundColor: colors.bg,
                                    borderLeftColor: colors.border,
                                    borderLeftWidth: 5
                                  }}
                                  className='flex-1 rounded-md p-1 justify-center'
                                >
                                  <Text
                                    style={{ color: colors.border }}
                                    className='text-sm font-bold text-center'
                                  >
                                    {`${curso.nombre}\n${curso.sigla}-${curso.seccion}`}
                                  </Text>
                                  <Text
                                    style={{ color: colors.border }}
                                    className='text-xs font-bold text-center'
                                  >
                                    {curso.tipo}
                                  </Text>
                                </View>
                              );
                          })}
                          </View>
                        ) : (
                          <View className='flex-1 bg-[color:var(--color-schedule-block)] rounded-lg' />
                        )}
                      </View>
                    ))
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      
      <View className='absolute bottom-[20px] right-[25px] items-end'>
        <FloatingActionButton
          onAddCourse={() => setModalVisible(true)}
          onShare={() => {}}
        />

        <AddCourseModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onResults={(results) => {
            setSearchResults(results);
            setResultsModalVisible(true);
          }}
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
