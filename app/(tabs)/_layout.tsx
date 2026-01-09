import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';

import { useTheme } from '@/providers/ThemeProviders';
import { Colors } from '@/utils/native-theme';

export default function TabLayout() {
  const { theme } = useTheme();
  const appColors = Colors[theme].app;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: appColors.layout,
          borderTopColor: appColors.layout,
        }
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
