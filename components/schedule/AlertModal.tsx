import { Modal, Pressable, Text, View } from "react-native";

import { AlertInfo } from "@/types/schedule";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  visible: boolean;
  alertInfo: AlertInfo;
  onClose: () => void;
};

export default function AlertModal({ visible, alertInfo, onClose }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        onPress={onClose}
      >
        <View className="bg-[color:var(--color-background)] w-[85%] rounded-2xl p-[20px] min-h-[160px]">
          <View className="flex-1 justify-between">
            <View className="gap-[10px]">
              <Text className="text-[color:var(--color-text-primary)] text-xl font-medium">
                {alertInfo.title}
              </Text>

              <Text className="text-[color:var(--color-text-primary)] text-base font-medium">
                {alertInfo.description}
              </Text>
            </View>

            <View className="items-end">
              <Pressable
                className="bg-[color:var(--color-secondary)] px-[15px] py-[8px] rounded-xl"
                onPress={onClose}
              >
                <Text className="text-[color:var(--color-text-on-primary)] font-medium">
                  Ok
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
