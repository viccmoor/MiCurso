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
import { ScheduleModalData } from "@/types/schedule";
import { Colors } from "@/utils/native-theme";

type Props = {
  visible: boolean;
  data: ScheduleModalData;
  onClose: () => void;
  onSetPeriod: (period: string) => void;
};

export default function ScheduleModal({
  visible,
  data,
  onClose,
  onSetPeriod,
}: Props) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = Colors[theme].schedule;

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        onPress={onClose}
      >
        <View className="bg-[color:var(--color-background)] w-[80%] h-[70%] rounded-2xl">
          <Text className="text-[color:var(--color-text-primary)] text-xl font-medium p-[20px]">
            Seleccionar período
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            {Object.keys(data.calendars).map((period) => (
              <Pressable
                key={period}
                className="active:bg-[#8885] px-[20px]"
                onPress={() => {
                  onSetPeriod(period);
                  onClose();
                }}
              >
                <View className="flex-row w-full items-center gap-[10px]">
                  {period === data.currentPeriod ? (
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
                    {data.calendars[period].name}
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
