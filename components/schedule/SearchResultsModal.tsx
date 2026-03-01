import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { useTheme } from "@/providers/ThemeProviders";
import { Colors } from "@/utils/native-theme";

import ConfirmationModal from "@/components/schedule/ConfirmationModal";

type Props = {
  visible: boolean;
  searchResults: any[];
  onAddCourse: (course: any) => void;
  onClose: () => void;
};

export default function SearchResultsModal({
  visible,
  searchResults,
  onAddCourse,
  onClose,
}: Props) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = Colors[theme].searchResultsModal;

  const [selectedCourse, setSelectedCourse] = useState();
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ConfirmationModal
        visible={confirmationVisible}
        course={selectedCourse}
        onClose={() => setConfirmationVisible(false)}
        onAddCourse={() => {
          setConfirmationVisible(false);
          onAddCourse(selectedCourse);
        }}
      />

      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        onPress={onClose}
      >
        <View className="w-[90%] h-[80%] bg-[color:var(--color-background)] rounded-2xl p-4">
          <Text className="text-xl font-bold text-center mb-4 text-[color:var(--color-text-primary)]">
            Se han encontrado {searchResults.length} cursos
          </Text>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {searchResults.map((course: any, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  setSelectedCourse(course);
                  setConfirmationVisible(true);
                }}
                className="bg-[color:var(--color-surface)] p-4 rounded-xl mb-3 shadow-sm active:opacity-70"
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-[color:var(--color-secondary)] font-bold text-sm">
                      {course.sigla}
                    </Text>

                    <Text
                      className="text-[color:var(--color-text-primary)] font-semibold text-lg"
                      numberOfLines={1}
                    >
                      {course.nombre}
                    </Text>

                    <Text className="text-[color:var(--color-text-secondary)] text-xs">
                      Sección: {course.seccion} | NRC: {course.nrc}
                    </Text>

                    <Text className="text-[color:var(--color-text-secondary)] text-sm italic mt-1">
                      {course.profesor.join(", ")}
                    </Text>
                  </View>

                  <MaterialIcons
                    name="add-circle"
                    size={24}
                    color={colors.addCircleIcon}
                  />
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Pressable
            onPress={onClose}
            className="mt-4 bg-[color:var(--color-secondary)] p-3 rounded-xl items-center"
          >
            <Text className="text-[color:var(--color-text-on-primary)] font-bold">
              Volver a buscar
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
