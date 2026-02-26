import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { DAY_MAP, TYPE_COLORS } from "@/constants/schedule";
import { useTheme } from "@/providers/ThemeProviders";
import { Block, ModuleIndex, Modules, SelectedBlock } from "@/types/schedule";

import CourseInfoModal from "@/components/schedule/CourseInfoModal";

type Props = {
  visible: boolean;
  selectedBlock: SelectedBlock;
  modules: Modules;
  onClose: () => void;
  onDeleteCourse: (nrc: string) => void;
  onDeleteBlock: (course: Block) => void;
};

export default function BlockModal({
  visible,
  selectedBlock,
  modules,
  onClose,
  onDeleteCourse,
  onDeleteBlock,
}: Props) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const [courseInfoVisible, setCourseInfoVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Block | null>(null);
  const dayBlocks =
    modules[selectedBlock.mod.id as ModuleIndex][selectedBlock.dayIndex];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      transparent
    >
      {selectedCourse && (
        <CourseInfoModal
          visible={courseInfoVisible}
          course={selectedCourse}
          onClose={() => setCourseInfoVisible(false)}
          onDeleteCourse={(nrc) => {
            onDeleteCourse(nrc);
          }}
          onDeleteBlock={(block) => {
            onDeleteBlock(block);
          }}
        />
      )}

      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        onPress={onClose}
      >
        <View className="w-[70%] h-[50%] bg-[color:var(--color-background)] rounded-3xl p-[10px]">
          <View className="flex-row items-center p-[10px] gap-x-2">
            <Text className="text-xl font-bold text-[color:var(--color-text-primary)]">
              {selectedBlock.mod.label.toUpperCase()}
            </Text>

            <Text className="font-bold text-[color:var(--color-text-primary)]">
              {DAY_MAP[selectedBlock.dayIndex ?? 0].toLowerCase()}
            </Text>
          </View>
          <ScrollView
            className="bg-[color:var(--color-surface)] rounded-3xl pt-[12px] px-[12px]"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              flexGrow: 1,
            }}
          >
            {dayBlocks.length > 0 ? (
              dayBlocks.map((block, blockIndex) => {
                const colors = TYPE_COLORS[block.type] || TYPE_COLORS.DEFAULT;

                return (
                  <View
                    key={blockIndex}
                    className="flex-row w-full justify-center items-center gap-3"
                  >
                    <View
                      className="w-[60px] border-r-[3px]"
                      style={{
                        borderRightColor: colors[theme],
                      }}
                    >
                      <Text className="text-medium text-center font-bold text-[color:var(--color-text-primary)]">
                        {block.type}
                      </Text>
                    </View>
                    <Pressable
                      className="flex-1 items-center py-[10px] px-[5px] rounded-xl"
                      style={{
                        backgroundColor: colors[theme],
                      }}
                      onPress={() => {
                        setSelectedCourse(block);
                        setCourseInfoVisible(true);
                      }}
                    >
                      <Text
                        className="text-[color:var(--color-text-primary)] text-medium"
                        numberOfLines={1}
                      >
                        {block.name}
                      </Text>

                      <Text
                        className="text-[color:var(--color-text-primary)] text-sm"
                        numberOfLines={1}
                      >
                        {block.sigle}-{block.section}
                      </Text>
                    </Pressable>
                  </View>
                );
              })
            ) : (
              <View className="flex-1 justify-center items-center">
                <MaterialIcons name="event-note" size={128} color="#8885" />
                <Text className="font-bold text-[#8885] text-center">
                  No hay clases programadas
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}
