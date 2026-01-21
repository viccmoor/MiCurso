import '@/global.css';
import { View, Pressable, Animated, Modal } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import React, { useRef, useState } from 'react';

import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

type FABProps = {
  onAddCourse: () => void;
  onShare: () => void;
};

export default function FloatingActionButton({
  onAddCourse,
  onShare,
}: FABProps) {
  const { theme } = useTheme();
  const fabColors = Colors[theme].fab;
  const tabBarHeight = useBottomTabBarHeight(); 

  const [open, setOpen] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (!open) {
      setOpen(true);
      Animated.spring(animationValue, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 80,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) setOpen(false);
      });
    }
  };

  const width = {
    addCourseButton: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 180],
    }),
    shareScheduleButton: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 205],
    }),
  };

  const optionsOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
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
    <React.Fragment>
      {!open && (
        <View
          className='absolute bottom-[20px] right-[25px] items-end'
        >
          <Pressable
            onPress={toggleMenu}
            className='bg-[color:var(--color-primary-default)] flex-1 justify-center items-center w-[60px] h-[60px] rounded-full'
          >
            <MaterialIcons
              name='add'
              size={24}
              color={fabColors.mainIconClosed}
            />
          </Pressable>
        </View>
      )}

      <Modal
        visible={open}
        animationType='fade'
        transparent
      >
        {open && (
          <Pressable
            className='absolute top-0 right-0 bottom-0 left-0 bg-black/50'
            onPress={toggleMenu}
          />
        )}

        <View
          className='absolute right-[25px] items-end'
          style={{
            bottom: 5 + tabBarHeight
          }}
        >
          <Animated.View
            style={{
              width: width.shareScheduleButton,
              opacity: optionsOpacity,
              marginBottom: 8,
            }}
          >
            <Pressable
              style={{
                backgroundColor: fabColors.optionsBg,
                height: 55,
                borderRadius: 30,
                paddingHorizontal: 16,
                gap: 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              pointerEvents={open ? 'auto' : 'none'}
              onPress={onShare}
            >
              <Ionicons
                name='share-social-outline'
                size={22}
                color={fabColors.optionsIcon}
              />
              <Animated.Text
                className='text-lg font-medium'
                style={{
                  color: fabColors.optionsText,
                  opacity: textOpacity,
                  transform: [{ translateX: textTranslateX }]
                }}
                numberOfLines={1}
              >
                Compartir horario
              </Animated.Text>
            </Pressable>
          </Animated.View>

          <Animated.View
            style={{
              width: width.addCourseButton,
              opacity: optionsOpacity,
              marginBottom: 8,
            }}
          >
            <Pressable
              pointerEvents={open ? 'auto' : 'none'}
              onPress={() => {
                toggleMenu();
                onAddCourse();
              }}
              style={{
                backgroundColor: fabColors.optionsBg,
                height: 55,
                borderRadius: 55,
                paddingHorizontal: 16,
                gap: 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons
                name='school-outline'
                size={22}
                color={fabColors.optionsIcon}
              />
              <Animated.Text
                className='text-lg font-medium'
                style={{
                  color: fabColors.optionsText,
                  opacity: textOpacity,
                  transform: [{ translateX: textTranslateX }]
                }}
                numberOfLines={1}
              >
                Agregar curso
              </Animated.Text>
            </Pressable>
          </Animated.View>

          <Pressable
            onPress={toggleMenu}
            className='bg-[color:var(--color-secondary-default)] flex-1 justify-center items-center w-[60px] h-[60px] rounded-full'
          >
            <MaterialIcons
              name='close'
              size={24}
              color={fabColors.mainIconOpen}
            />
          </Pressable>
        </View>
      </Modal>
    </React.Fragment>
  );
}