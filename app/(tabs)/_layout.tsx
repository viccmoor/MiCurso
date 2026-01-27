import { Tabs } from 'expo-router';
import { Image } from 'react-native';

import React from 'react';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

export default function TabLayout() {
  const { theme } = useTheme();
  const appColors = Colors[theme].app;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: appColors.layout,
          borderTopColor: appColors.layout,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: appColors.layout,
        },
        headerTitle: () => (
          <Image
            source={
              theme === 'light'
                ? require('../../assets/images/head-icon-light.png')
                : require('../../assets/images/head-icon-dark.png')
            }
            style={{
              width: 150,
              aspectRatio: 0.25,
            }}
            resizeMode="contain"
          />
        ),
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              color={appColors.tabs}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='schedule'
        options={{
          title: 'Horario',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'calendar-month' : 'calendar-month-outline'}
              color={appColors.tabs}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='about'
        options={{
          title: 'Acerca de',
          headerShown: false,
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name={focused ? 'info' : 'info-outline'}
              color={appColors.tabs}
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
