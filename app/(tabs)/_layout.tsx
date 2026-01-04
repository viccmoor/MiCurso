import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <MaterialIcons name='home' size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='schedule'
        options={{
          title: 'Horario',
          tabBarIcon: ({ color }) => <MaterialIcons name='calendar-month' size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name='about'
        options={{
          title: 'Acerca de',
          tabBarIcon: ({ color }) => <MaterialIcons name='info' size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
