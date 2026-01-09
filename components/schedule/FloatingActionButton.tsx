import '@/global.css';
import { View, Pressable, Animated } from 'react-native';
import { useRef, useState } from 'react';

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

  const [open, setOpen] = useState(false);
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

  const width = {
    addCourseButton: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 180],
    }),
    shareScheduleButton: animationValue.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 200],
    }),
  };

  const optionsOpacity = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const fabBorderRadius = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 30],
  });

  const fabColor = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [fabColors.mainBgClosed, fabColors.mainBgOpen],
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
    <View className='absolute bottom-0 items-end'>
      <Animated.View
        style={{
          width: width.shareScheduleButton,
          opacity: optionsOpacity,
          marginBottom: 5,
        }}
      >
        <Pressable
          style={{
            backgroundColor: fabColors.optionsBg,
            height: 55,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          pointerEvents={open ? 'auto' : 'none'}
          onPress={onShare}
        >
          <View className='flex-row items-center gap-2'>
            <Ionicons
              name='share-social-outline'
              size={24}
              color={fabColors.optionsIcon}
            />
            <Animated.Text
              style={{
                color: fabColors.optionsText,
                fontSize: 16,
                fontWeight: 500,
                opacity: textOpacity,
                transform: [{ translateX: textTranslateX }]
              }}
            >
              Compartir horario
            </Animated.Text>
          </View>
        </Pressable>
      </Animated.View>

      <Animated.View
        style={{
          width: width.addCourseButton,
          opacity: optionsOpacity,
          marginBottom: 5,
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >
          <View className='flex-row items-center gap-2'>
            <Ionicons
              name='school-outline'
              size={24}
              color={fabColors.optionsIcon}
            />
            <Animated.Text
              style={{
                color: fabColors.optionsText,
                fontSize: 16,
                fontWeight: 500,
                opacity: textOpacity,
                transform: [{ translateX: textTranslateX }]
              }}
            >
              Agregar curso
            </Animated.Text>
          </View>
        </Pressable>
      </Animated.View>

      <Animated.View
        style={{
          backgroundColor: fabColor,
          borderRadius: fabBorderRadius,
          width: 60,
          height: 60,
        }}
      >
        <Pressable
          onPress={toggleMenu}
          className='flex-1 justify-center items-center'
        >
          <MaterialIcons
            name={open ? 'close' : 'add'}
            size={24}
            color={open ? fabColors.mainIconOpen : fabColors.mainIconClosed}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}