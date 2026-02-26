import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useTheme } from "@/providers/ThemeProviders";
import { OptionSelectorData } from "@/types/schedule";
import { Colors } from "@/utils/native-theme";

type Props = {
  visible: boolean;
  data: OptionSelectorData;
  onClose: () => void;
  onSelectOption: (field: string, value: string) => void;
};

export default function OptionSelectorModal({
  visible,
  data,
  onClose,
  onSelectOption,
}: Props) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = Colors[theme].optionSelectorModal;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        onPress={onClose}
      >
        <View className="w-[95%] h-[90%] bg-[color:var(--color-background)] rounded-3xl">
          <Text className="text-[color:var(--color-text-primary)] text-2xl font-medium p-[20px]">
            Seleccionar {data.name}
          </Text>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            {data.options.map((option) => (
              <Pressable
                key={option.value}
                className="active:bg-[#8885] px-[20px]"
                onPress={() => {
                  onSelectOption(data.field, option.value);
                  onClose();
                }}
              >
                <View className="flex-row w-full items-center gap-[10px]">
                  {option.value === data.selectedValue ? (
                    <MaterialIcons
                      name="check-circle"
                      size={24}
                      color={colors.checkboxCircle}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank-circle-outline"
                      size={24}
                      color={colors.checkboxCircle}
                    />
                  )}

                  <Text
                    className="flex-1 text-[color:var(--color-text-primary)] text-xl font-normal border-[#8885] py-[15px]"
                    style={{
                      borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                  >
                    {option.label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Pressable className="w-full items-center" onPress={onClose}>
            <Text className="text-[color:var(--color-text-primary)] text-xl font-medium p-[15px]">
              Cancelar
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
