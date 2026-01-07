import '../../global.css';
import {
  Text,
  View,
  ScrollView,
  Pressable,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
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

type ScheduleT = {
  [day: string]: {
    [moduleId: number]: string;
  };
};

export default function Schedule() {
  const [schedule] = useState<ScheduleT>({});
  const [open, setOpen] = useState(false);

  const animationValue = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    setOpen(!open);

    Animated.spring(animationValue, {
      toValue,
      friction: 5,
      tension: 40,
      useNativeDriver: false,
    }).start();
  };

  const animatedWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 160],
  });

  const animatedOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <Text className='text-2xl font-bold text-center mb-[15px]'>
        Horario por Módulos
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='flex-row'>
          <View>
            <View className='h-[50px] w-[100px]' />
            {MODULES.map(mod => (
              <View
                key={mod.id}
                className='w-[100px] h-[85px] justify-center items-center border-b border-[#EEE] bg-[#F8F9FA]'
              >
                <Text className='text-base font-bold text-[#333]'>
                  {mod.label}
                </Text>
                <Text className='text-xs text-[#999]'>
                  {mod.range}
                </Text>
              </View>
            ))}
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              <View className='flex-row h-[50px] border-b border-[#EEE]'>
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
                  className='flex-row h-[85px] border-b border-[#F9F9F9]'
                >
                  {mod.id === 5 ? (
                    <View
                      className='h-full justify-center items-center bg-[#FFF3CD]'
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
                          <View className='flex-1 bg-[#E8F5E9] rounded-lg p-[8px] border-l-4 border-l-[#4CAF50]'>
                            <Text className='text-xs font-bold text-[#2E7D32]'>
                              {schedule[day][mod.id]}
                            </Text>
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
        <Animated.View style={{ width: animatedWidth, opacity: animatedOpacity, marginBottom: 20 }}>
          <Pressable
            style={{
              backgroundColor: '#172094',
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 8,
              overflow: 'hidden' }}
            onPress={() => {}}
          >

          </Pressable>
        </Animated.View>

        <Animated.View style={{ width: animatedWidth, opacity: animatedOpacity, marginBottom: 40 }}>
          <Pressable
            style={{
              backgroundColor: '#172094',
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 8,
              overflow: 'hidden' }}
            onPress={() => {}}
          >
            
          </Pressable>
        </Animated.View>

        {/* El FAB solo funciona utilizando style más no TailwindCSS. */}
        <Pressable
          style={{
            bottom: 25,
            backgroundColor: '#172094',
            width: 60, height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 8 }}
          onPress={toggleMenu}
        >
          <MaterialIcons name='add' size={32} color='#FFF' />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
