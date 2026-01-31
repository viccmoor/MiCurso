import '@/global.css';
import {
  View,
  Text
} from 'react-native';
import MapView, { Geojson } from 'react-native-maps';

import React from 'react';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { getNextClass } from '@/utils/schedule';
import { useTheme } from '@/providers/ThemeProviders';
import { useSchedule } from '@/providers/ScheduleProvider';
import { DAY_MAP, TYPE_COLORS } from '@/constants/schedule';
import { useClassNotifications } from '@/hooks/useClassNotifications';
import resolveMapTarget, { getRegionFromFeature } from '@/utils/geo';

export default function HomeScreen() {
  const { theme } = useTheme();
  const { calendars, currentPeriod } = useSchedule();

  const nextClass = getNextClass(calendars, currentPeriod);
  useClassNotifications(nextClass ?? undefined);

  const mapTarget = nextClass
    ? resolveMapTarget(nextClass.block.location, nextClass.block.campus)
    : undefined;

  const region = mapTarget
    ? getRegionFromFeature(mapTarget.geojson.features[0])
    : undefined;

  return (
    <View className='flex-1 bg-[color:var(--color-bg)]'>
      <View className='w-full items-start px-[20px] py-[10px]'>
        <Text className='text-[color:var(--text-calendar)] text-2xl font-medium'>
          Próxima clase
        </Text>
      </View>

      <View className='w-full items-center px-[20px] py-[10px]'>
        <View className='flex-row min-h-[80px] w-full items-center rounded-xl'>
          {nextClass ? (
            <React.Fragment>
              <View
                className='self-stretch items-center justify-center px-[20px] border-r-[3px]'
                style={{
                  borderRightColor: TYPE_COLORS[nextClass.block.type].border || TYPE_COLORS.DEFAULT.border
                }}
              >
                <Text className='text-[color:var(--text-calendar)] text-xl font-medium'>
                  {DAY_MAP[nextClass.dayIndex]}
                </Text>

                <Text className='text-[color:var(--text-calendar)] text-sm font-medium opacity-70'>
                  {nextClass.date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
              
              <View className='flex-1 items-start p-[10px]'>
                <Text className='text-[color:var(--text-calendar)] text-sm font-medium opacity-70'>
                  {nextClass.block.sigle}-{nextClass.block.section}
                </Text>

                <Text className='text-[color:var(--text-calendar)] text-xl font-medium'>
                  {nextClass.block.name}
                </Text>

                <Text className='text-[color:var(--text-calendar)] text-sm font-medium'>
                  Sala: {nextClass.block.location}
                </Text>
              </View>

              <Text
                className='rounded-full text-lg text-white px-[20px] py-[10px]'
                style={{
                  backgroundColor: TYPE_COLORS[nextClass.block.type]?.border || TYPE_COLORS.DEFAULT.border,
                }}
              >
                {nextClass.block.type}
              </Text>
            </React.Fragment>
          ) : (
            <View className='flex-1 flex-row bg-[color:var(--color-schedule-block)] items-center justify-center gap-[5px] p-[10px] rounded-2xl'>
              <MaterialIcons name='event-available' size={64} color='#8885' />
              <View>
                <Text className='text-[color:var(--text-calendar)] text-base font-medium opacity-[33%]'>
                  Sin clases por ahora
                </Text>
                <Text className='text-[color:var(--text-calendar)] text-sm opacity-[33%]'>
                  Revisa el horario completo si quieres
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      <View className='w-full flex-1 p-[20px]'>
          <View
            className='w-full h-full'
            style={{
              borderRadius: 50,
              overflow: 'hidden',
            }}
          >
            {mapTarget ? (
                <MapView
                  style={{
                    flex: 1,
                    zIndex: 50
                  }}
                  initialRegion={region}
                  userInterfaceStyle={theme}
                >
                  <Geojson
                    geojson={mapTarget.geojson as any}
                    strokeColor="#2563eb"
                    fillColor="#2563EB40"
                    strokeWidth={2}
                  />
                </MapView>
              )
              : (
                <View className='bg-[color:var(--color-schedule-block)] flex-1 items-center justify-center'>
                  <MaterialIcons 
                    name='location-off' 
                    size={128}
                    color='#8885'
                  />
                </View>
              )
            }
          </View>
        </View>
    </View>
  );
}
