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
import { useClassNotifications } from '@/hooks/useClassNotifications';
import resolveMapTarget, { getRegionFromFeature } from '@/utils/geo';

import NextClassCard from '@/components/home/NextClassCard';

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
    zoomLevel: mapTarget?.zoom === 'campus' ? 14 : 16,
  } : {};

  return (
    <View className='flex-1 bg-[color:var(--color-bg)]'>
      {nextClass && mapTarget && (
        <React.Fragment>
          <View className='px-[20px] mt-[5px]'>
            <NextClassCard nextClass={nextClass}/>
          </View>

          <View className='flex-1 px-[20px] py-[10px]'>
            <View
              className='flex-1 bg-[color:var(--color-bg)] shadow-xl'
              style={{ borderRadius: 50 }}
            >
              <View className='w-full flex-1 p-[5px]'>
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
