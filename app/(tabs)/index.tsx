import '@/global.css';
import {
  View,
  Text,
  Pressable,
} from 'react-native';

import {
	MapView,
	Camera,
	ShapeSource,
	FillLayer,
	LineLayer,
} from '@maplibre/maplibre-react-native';

import React from 'react';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { Colors } from '@/utils/native-theme';
import { getNextClass } from '@/utils/schedule';
import { useTheme } from '@/providers/ThemeProviders';
import { useSchedule } from '@/providers/ScheduleProvider';
import { DAY_MAP, TYPE_COLORS } from '@/constants/schedule';
import { useClassNotifications } from '@/hooks/useClassNotifications';
import resolveMapTarget, { getRegionFromFeature } from '@/utils/geo';

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme].home;

  const { calendars, currentPeriod } = useSchedule();

  const nextClass = getNextClass(calendars, currentPeriod);
  useClassNotifications(nextClass ?? undefined);

  const mapTarget = nextClass
    ? resolveMapTarget(nextClass.block.location, nextClass.block.campus)
    : undefined;

  const region = mapTarget
    ? getRegionFromFeature(mapTarget.geojson.features[0])
    : undefined;

  const cameraProps = region ? {
    centerCoordinate: [region.longitude, region.latitude],
    zoomLevel: 16,
  } : {};

  return (
    <View className='flex-1 bg-[color:var(--color-bg)]'>
      {nextClass && mapTarget && (
        <React.Fragment>
          <View className='flex-row w-full items-start px-[20px] gap-[5px]'>
            <Text className='bg-[color:var(--next-class-bg)] text-[color:var(--next-class-text)] text-xs font-bold p-[5px] rounded-md'>
              Próxima clase
            </Text>

            <Text className='bg-[color:var(--next-class-bg)] text-[color:var(--next-class-text)] text-xs font-bold p-[5px] rounded-md'>
              {currentPeriod}
            </Text>
          </View>

          <View className='w-full items-center px-[20px] py-[10px]'>
            <View className='flex-row min-h-[80px] w-full items-center rounded-xl'>
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
            </View>
          </View>

          <View className='w-full flex-1 px-[20px] pb-[20px]'>
              <View
                className='w-full h-full'
                style={{
                  borderRadius: 50,
                  overflow: 'hidden',
                }}
              >
                <MapView
                  style={{
                    flex: 1,
                    zIndex: 50
                  }}
                  mapStyle='https://tiles.openfreemap.org/styles/liberty'
                  logoEnabled={false}
                  attributionEnabled={false}
                  compassEnabled={false}
                >
                  <Camera
                    {...cameraProps}
                    animationDuration={1000}
                  />

                  <ShapeSource
                    id='targetSource'
                    shape={mapTarget.geojson as any}
                  >
                    <FillLayer
                      id='targetFill'
                      style={{
                        fillColor: '#2563EB',
                        fillOpacity: 0.25,
                      }}
                    />

                    <LineLayer
                      id='targetOutline'
                      style={{
                        lineColor: '#2563eb',
                        lineWidth: 2,
                      }}
                    />
                  </ShapeSource>
                </MapView>
              </View>
          </View>
        </React.Fragment>
      )}

      {!nextClass && (
        <View className='flex-1 items-center justify-center'>
          <MaterialCommunityIcons
            className='bg-[color:var(--color-bg)] p-[20px] rounded-full border-[5px] border-secondary'
            name='calendar-check'
            size={128}
            color={colors.calendarIcon}
          />

          <Text className='text-[color:var(--text-calendar)] text-2xl font-bold mt-[20px]'>
            Aún no tienes clases
          </Text>

          <Text className='max-w-[240px] text-[color:var(--text-calendar)] text-base text-center font-base opacity-70 mt-[10px]'>
            Agrega tus cursos del período {currentPeriod} y verás tu próxima clase.
          </Text>

          <View className='w-full max-w-[216px] h-px bg-[#8885] px-[20px] mt-[20px]'/>

          <Pressable
            className='w-full max-w-[256px] items-center bg-[color:var(--color-secondary)] p-[15px] rounded-xl mt-[20px]'
          >
            <Text className='text-[color:var(--color-cta-text)] text-lg font-medium'>
              Agregar cursos
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
