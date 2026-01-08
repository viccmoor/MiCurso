import '../../global.css';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Animated,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { fetch } from 'expo/fetch';
import { useState, useRef } from 'react';

const MODULES = [
  { id: 1, label: 'Mod 1', range: '8:20 - 9:30' },
  { id: 2, label: 'Mod 2', range: '9:40 - 10:50' },
  { id: 3, label: 'Mod 3', range: '11:00 - 12:10' },
  { id: 4, label: 'Mod 4', range: '12:20 - 13:30' },
  { id: 5, label: 'Mod 5', range: '13:30 - 14:50' },
  { id: 6, label: 'Mod 6', range: '14:50 - 16:00' },
  { id: 7, label: 'Mod 7', range: '16:10 - 17:20' },
  { id: 8, label: 'Mod 8', range: '17:30 - 18:40' },
  { id: 9, label: 'Mod 9', range: '18:50 - 20:00' },
  { id: 10, label: 'Mod 10', range: '20:10 - 21:20' },
];

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

interface TipoColor {
  bg: string;
  border: string;
}

const TIPO_COLORS: { [key: string]: TipoColor } = {
  'CLAS': { bg: '#FDE2BA', border: '#F79708'},
  'AYU':  { bg: '#D0E7D0', border: '#55AA55'},
  'LAB':  { bg: '#b3d4f5', border: '#4696E7'},
  'TER':  { bg: '#ffccff', border: '#FF5CFF'},
  'TAL':  { bg: '#c7c2f8', border: '#7A6DEE'},
  'PRA':  { bg: '#cccc99', border: '#AAAA55'},
  'TES':  { bg: '#b2efef', border: '#78E3E3'},
  'OTR':  { bg: '#ff9999', border: '#FF2E2E'},
  'DEFAULT': { bg: '#E8F5E9', border: '#2E7D32'},
};

type CourseBlock = {
  nombre: string;
  sigla: string;
  sala: string;
  tipo: string;
  seccion: string;
};

type ScheduleT = {
  [day: string]: {
    [moduleId: number]: CourseBlock[];
  };
};

export default function Schedule() {
  const [schedule, setSchedule] = useState<ScheduleT>({});
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [courseForm, setCourseForm] = useState({
    sigla: '',
    nrc: '',
    nombre: '',
    profesor: ''
  });

  const handleInputChange = (name: string, value: string) => {
    setCourseForm({ ...courseForm, [name]: value });
  };

  const resetForm = () => {
    setCourseForm({ sigla: '', nrc: '', nombre: '', profesor: '' });
    setModalVisible(false);
  };

  const handleSearch = async () => {
    const hasInput = Object.values(courseForm).some(value => value.trim() !== '');
    
    if (!hasInput) {
      Alert.alert('Atención', 'Debes completar al menos un campo para realizar la búsqueda.');
      return;
    }

    setLoading(true);

    try {
      const params = new URLSearchParams({
        periodo: '2026-1',
        sigla: courseForm.sigla,
        nrc: courseForm.nrc,
        nombre: courseForm.nombre,
        profesor: courseForm.profesor,
      });

      const res = await fetch(`https://buscacursosapi.viccmoor.xyz/api/cursos/?${params}`);
      if (!res.ok) {
        throw new Error('El servidor respondió con un error.')
      }

      const data = await res.json();
      if (data?.meta?.cursos_encontrados > 0) {
        setSearchResults(data?.data?.curso);
        setModalVisible(false);
        setResultsModalVisible(true);
        resetForm()
      } else {
        Alert.alert('Sin resultados', 'No se encontraron cursos con esos criterios.');
        setSearchResults([]);
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Atención', 'No pudimos buscar el curso. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

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

  const animationValue = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    setOpen(!open);

    Animated.spring(animationValue, {
      toValue,
      friction: 6,
      tension: 40,
      useNativeDriver: false,
    }).start();
  };

  const widthCourse = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 190],
  });

  const widthExport = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 210],
  });

  const animatedOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const animatedBorderRadius = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 30],
  });

  const animatedColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#A9B5DF', '#2D336B'],
  });

  const textOpacity = animationValue.interpolate({
    inputRange: [0.4, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const textTranslateX = animationValue.interpolate({
    inputRange: [0.4, 1],
    outputRange: [-10, 0],
    extrapolate: 'clamp',
  });

  return (
    <View className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-row'>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View className='flex-row h-[50px] border-b border-[#EEE]'>
                <View className='w-[100px]' />
                {DAYS.map(day => (
                  <View
                    key={day}
                    className='w-[110px] items-center justify-center'
                  >
                    <Text className='font-bold text-[#2C3E50]'>
                      {day}
                    </Text>
                  </View>
                ))}
              </View>

              {MODULES.map(mod => (
                <View
                  key={mod.id}
                  className='flex-row min-h-[95px] border-b border-[#F9F9F9]'
                >
                  <View
                    key={mod.id}
                    className='w-[100px] min-h-[95px] justify-center items-center border-b border-[#EEE] bg-[#F8F9FA]'
                  >
                    <Text className='text-base font-bold text-[#333]'>
                      {mod.label}
                    </Text>
                    <Text className='text-xs text-[#999]'>
                      {mod.range}
                    </Text>
                  </View>

                  {mod.id === 5 ? (
                    <View
                      className='flex-1 justify-center items-center bg-[#FFF3CD]'
                      style={{ width: DAYS.length * 110 }}
                    >
                      <Text className='text-xl font-semibold text-[#856404]'>
                        Horario de Almuerzo
                      </Text>
                    </View>
                  ) : (
                    DAYS.map(day => (
                      <View
                        key={`${day}-${mod.id}`}
                        className='w-[110px] p-[4px] border-l border-[#EEE]'
                      >
                        {schedule[day]?.[mod.id] ? (
                          <View className='flex-1 gap-[4px]'>
                            {schedule[day][mod.id].map((curso, idx) => {
                              const colors = TIPO_COLORS[curso.tipo] || TIPO_COLORS.DEFAULT;

                              return (
                                <View
                                  key={idx}
                                  style={{
                                    backgroundColor: colors.bg,
                                    borderLeftColor: colors.border,
                                    borderLeftWidth: 4
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
                          <View className='flex-1 bg-[#FAFAFA] rounded-sm' />
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
        <Animated.View style={{ width: widthExport, opacity: animatedOpacity, marginBottom: 5 }}>
          <Pressable
            pointerEvents={open ? 'auto' : 'none'}
            style={{
              backgroundColor: '#A9B5DF',
              height: 55,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: open ? 8 : 0,
              overflow: 'hidden' }}
            onPress={() => {}}
          >
            <View className='flex-row gap-2 items-center justify-center'>
              <Ionicons 
                  name='share-social-outline' 
                  size={28}
                  color='#2D336B'
              />
              <Animated.View
                style={{
                  opacity: textOpacity,
                  transform: [{ translateX: textTranslateX }],
                  marginLeft: 8,
                }}
              >
                <Text className="text-[#2D336B] font-semibold text-lg">
                  Compartir horario
                </Text>
              </Animated.View>
            </View>
          </Pressable>
        </Animated.View>

        <Animated.View style={{ width: widthCourse, opacity: animatedOpacity, marginBottom: 5 }}>
          <Pressable
            pointerEvents={open ? 'auto' : 'none'}
            style={{
              backgroundColor: '#A9B5DF',
              height: 55,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: open ? 8 : 0,
              overflow: 'hidden' }}
            onPress={() => {
              setModalVisible(true);
              toggleMenu();
            }}
          >
            <View className='flex-row gap-2 items-center justify-center'>
              <Ionicons 
                  name='school-outline' 
                  size={28}
                  color='#2D336B'
              />
              <Animated.View
                style={{
                  opacity: textOpacity,
                  transform: [{ translateX: textTranslateX }],
                  marginLeft: 8,
                }}
              >
                <Text className="text-[#2D336B] font-semibold text-lg">
                  Agregar curso
                </Text>
              </Animated.View>
            </View>
          </Pressable>
        </Animated.View>

        {/* El FAB solo funciona utilizando style más no TailwindCSS. */}
        <Animated.View
          style={{
            backgroundColor: animatedColor,
            width: 60,
            height: 60,
            borderRadius: animatedBorderRadius,
            elevation: 8,
            overflow: 'hidden',
          }}
        >
          <Pressable
            onPress={toggleMenu}
            style={({ pressed }) => ({
              width: 60,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Animated.View 
              style={{
                width: 60,
                height: 60,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <MaterialIcons 
                name={open ? 'close' : 'add'} 
                size={24}
                color={open ? '#A9B5DF' : '#2D336B'}
                
              />
            </Animated.View>
          </Pressable>
        </Animated.View>

        <Modal
          visible={modalVisible}
          animationType='fade'
          transparent={true}
        >
          <View className='flex-1 bg-black/50 justify-center items-center'>
              <View className='width-9/10 bg-white rounded-2xl p-[20px]'>
                <Text className='font-bold text-lg text-center'>
                  Agregar curso
                </Text>

                <View className='gap-2 p-[10px]'>
                  <TextInput
                    className='bg-[#FAFAFA] rounded-lg p-[5px]'
                    placeholder='Nombre (ej: Cálculo I)'
                    value={courseForm.nombre}
                    onChangeText={(val) => handleInputChange('nombre', val)}
                  />

                  <TextInput
                    className='bg-[#FAFAFA] rounded-lg p-[5px]'
                    placeholder='Sigla (ej: MAT1610)'
                    value={courseForm.sigla}
                    onChangeText={(val) => handleInputChange('sigla', val)}
                  />

                  <TextInput
                    className='bg-[#FAFAFA] rounded-lg p-[5px]'
                    placeholder='NRC (ej: 12345)'
                    value={courseForm.nrc}
                    onChangeText={(val) => handleInputChange('nrc', val)}
                    keyboardType='numeric'
                  />

                  <TextInput
                    className='bg-[#FAFAFA] rounded-lg p-[5px]'
                    placeholder='Profesor (ej: Nombre Apellido)'
                    value={courseForm.profesor}
                    onChangeText={(val) => handleInputChange('profesor', val)}
                  />

                  <View className='pt-[15px] flex-row gap-4'>
                    <Pressable
                      onPress={() => resetForm()}
                      style={{
                        backgroundColor: '#B51C26',
                        width: 110,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden' }}
                    >
                      <View className='flex-row gap-2 items-center justify-center'>
                        <MaterialIcons 
                            name='close' 
                            size={20}
                            color='#EDF5EA'
                        />
                        <Text className='text-[#EDF5EA] font-semibold text-base'>
                          Cancelar
                        </Text>
                      </View>
                    </Pressable>
                    <Pressable
                      onPress={() => handleSearch()}
                      disabled={loading}
                      style={{
                        backgroundColor: loading ? '#27911C' : '#26B51C',
                        width: 100,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden' }}
                    >
                      {loading ? (
                        <ActivityIndicator color='#FFF' />
                      ) : (
                        <View className='flex-row gap-2 items-center justify-center'>
                          <Ionicons 
                              name='search' 
                              size={20}
                              color='#EDF5EA'
                          />
                          <Text className='text-[#EDF5EA] font-semibold text-base'>
                            Buscar
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  </View>
                </View>

              </View>
          </View>
        </Modal>

        <Modal
          visible={resultsModalVisible}
          animationType='slide'
          transparent={true}
        >
          <View className='flex-1 bg-black/50 justify-center items-center'>
            <View className='w-[95%] h-[80%] bg-white rounded-2xl p-4'>
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
