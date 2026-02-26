import "@/global.css";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { DAYS, MODULES, TYPE_COLORS } from "@/constants/schedule";
import { useTheme } from "@/providers/ThemeProviders";
import { ModuleIndex, Modules, SelectedBlock } from "@/types/schedule";

type Props = {
  modules: Modules;
  onPressBlock: (block: SelectedBlock) => void;
};

export default function Schedule({ modules, onPressBlock }: Props) {
  const { theme } = useTheme();

  return (
    <View className="flex-1 w-full">
      <View className="flex-col w-full h-full">
        <View className="flex-row w-full px-[10px]">
          <View className="flex-1 items-center p-[10px]">
            <Text className="text-sm font-medium text-[color:var(--color-text-primary)]">
              MOD
            </Text>
          </View>

          {DAYS.map((day) => (
            <View key={day} className="flex-1 items-center p-[10px]">
              <Text className="text-sm font-medium text-[color:var(--color-text-primary)]">
                {day}
              </Text>
            </View>
          ))}
        </View>

        {MODULES.map((mod) => {
          return (
            <React.Fragment key={mod.id}>
              <View
                key={mod.id}
                className="flex-1 flex-row w-full px-[10px] border-t border-[color:var(--color-surface)]"
              >
                <View className="flex-1 h-full justify-center items-center border-r border-[color:var(--color-surface)]">
                  <Text className="text-sm font-medium text-[color:var(--color-text-primary)]">
                    {mod.label}
                  </Text>
                  <Text className="text-sm text-[#999]">{mod.start}</Text>
                </View>

                {modules[mod.id as ModuleIndex].map((dayBlocks, dayIndex) => {
                  return (
                    <Pressable
                      key={dayIndex}
                      onPress={() => onPressBlock({ mod, dayIndex })}
                      className="flex-1 gap-[1px] items-center h-full rounded-sm border border-transparent active:border-[#AAAA] overflow-hidden"
                    >
                      {dayBlocks.map((block, blockIndex) => {
                        const colors =
                          TYPE_COLORS[block.type] || TYPE_COLORS.DEFAULT;

                        return (
                          <View
                            key={blockIndex}
                            className="rounded-sm w-[95%] p-[3px] max-h-[32px]"
                            style={{
                              backgroundColor: colors[theme],
                            }}
                          >
                            <Text
                              className="text-[color:var(--color-text-primary)] text-xs leading-none text-start"
                              ellipsizeMode="clip"
                              numberOfLines={2}
                            >
                              {block.name}
                            </Text>
                          </View>
                        );
                      })}

                      {dayBlocks.length > 2 && (
                        <Text className="bg-[color:var(--color-surface)] text-xs text-[color:var(--color-text-primary)] right-1 bottom-1 absolute p-[1px] rounded-md">
                          +{dayBlocks.length - 2}
                        </Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>

              {mod.id === 4 && (
                <View className="flex-1 w-full justify-center px-[10px] bg-[color:var(--color-surface)] border-t border-[color:var(--color-surface)]">
                  <Text className="text-2xl text-center font-medium text-[color:var(--color-text-primary)]">
                    Almuerzo
                  </Text>
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}
