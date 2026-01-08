import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#2D336B',
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Inicio',
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
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
              size={28}
            />
          ),
        }}
      />
    </Tabs>
  );
}
