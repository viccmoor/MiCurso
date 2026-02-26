import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import ThemeSelectorModal from "@/components/settings/ThemeSelectorModal";
import { useTheme } from "@/providers/ThemeProviders";
import { Colors } from "@/utils/native-theme";

export default function Settings() {
  const { theme, themeMode } = useTheme();
  const colors = Colors[theme].settings;

  const [visible, setVisible] = useState(false);

  return (
    <View className="flex-1 bg-[color:var(--color-background)]">
      <ThemeSelectorModal visible={visible} onClose={() => setVisible(false)} />

      <View className="flex-1">
        <Text className="text-sm text-[color:var(--color-text-primary)] font-medium opacity-70 mb-2 px-[20px] mt-[10px]">
          Pantalla
        </Text>

        <Pressable
          className="flex-row w-full items-center active:bg-[#8885] gap-[15px] px-[20px] py-[10px]"
          onPress={() => setVisible(true)}
        >
          <MaterialCommunityIcons
            name="theme-light-dark"
            size={24}
            color={colors.themeIcon}
          />

          <View className="gap">
            <Text className="text-base text-[color:var(--color-text-primary)]">
              Tema
            </Text>

            <Text className="text-sm text-[color:var(--color-text-primary)] opacity-70">
              {
                {
                  auto: "Predeterminado del sistema",
                  light: "Claro",
                  dark: "Oscuro",
                }[themeMode]
              }
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
