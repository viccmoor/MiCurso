import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
	Camera,
	FillLayer,
	LineLayer,
	MapView,
	ShapeSource,
  PointAnnotation,
  UserLocation,
} from "@maplibre/maplibre-react-native";

import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { DAY_INDEX, DAY_MAP, MODULES, TYPE_COLORS } from "@/constants/schedule";
import { useTheme } from "@/providers/ThemeProviders";
import { Block } from "@/types/schedule";
import resolveMapTarget, { getRegionFromFeature } from "@/utils/geo";
import { Colors } from "@/utils/native-theme";

import CourseDeleteModal from "@/components/schedule/CourseDeleteModal";

type Props = {
  visible: boolean;
  course: Block;
  onClose: () => void;
  onDeleteCourse: (nrc: string) => void;
  onDeleteBlock: (block: Block) => void;
};

export default function CourseInfoModal({
  visible,
  course,
  onClose,
  onDeleteCourse,
  onDeleteBlock,
}: Props) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = Colors[theme].courseInfoModal;

  const mapTarget = resolveMapTarget(course?.location, course?.campus);
  const region = mapTarget
    ? getRegionFromFeature(mapTarget.geojson.features[0])
    : undefined;
  const cameraProps = region
    ? {
        centerCoordinate: [region.longitude, region.latitude],
        zoomLevel: mapTarget?.zoom === "campus" ? 14 : 16,
      }
    : {};

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent
    >
      <View
        className="flex-1 bg-[color:var(--color-background)]"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <CourseDeleteModal
          visible={deleteModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          onDelete={(deleteCourse) => {
            if (deleteCourse) {
              onDeleteCourse(course.nrc);
            } else {
              onDeleteBlock(course);
            }
            onClose();
          }}
        />

        <View className="flex-1 flex-col w-full items-start">
          <Pressable
            pointerEvents="auto"
            onPress={onClose}
            className="absolute top-[15px] left-[15px] bg-[color:var(--color-background)] w-[40px] h-[40px] justify-center items-center"
          >
            <Entypo
              name="chevron-thin-left"
              size={24}
              color={colors.backIcon}
            />
          </Pressable>

          <Pressable
            pointerEvents="auto"
            onPress={() => setDeleteModalVisible(true)}
            className="absolute top-[15px] right-[15px] bg-[color:var(--color-background)] w-[40px] h-[40px] justify-center items-center"
          >
            <Ionicons
              name="trash-outline"
              size={24}
              color={colors.deleteIcon}
            />
          </Pressable>

          <View className="flex-col w-full items-start justify-center mt-[50px]">
            <View className="flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--color-outline-secondary)]">
              <Text
                className="rounded-full text-lg text-white px-[15px]"
                style={{
                  backgroundColor:
                    TYPE_COLORS[course?.type].card || TYPE_COLORS.DEFAULT.card,
                }}
              >
                {course?.type}
              </Text>

              <Text className="text-2xl text-[color:var(--color-text-primary)]">
                {course?.name}
              </Text>
            </View>

            <View className="flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--color-outline-secondary)]">
              <MaterialIcons
                name="info-outline"
                size={20}
                color={colors.infoIcon}
              />

              <Text className="text-lg text-[color:var(--color-text-primary)]">
                {course?.sigle}-{course?.section} | NRC: {course?.nrc}
              </Text>
            </View>

            <View className="flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--color-outline-secondary)]">
              <MaterialIcons name="domain" size={20} color={colors.infoIcon} />

              <Text className="text-lg text-[color:var(--color-text-primary)]">
                Campus {course?.campus}
              </Text>
            </View>

            <View className="flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--color-outline-secondary)]">
              <Ionicons
                name="today-outline"
                size={20}
                color={colors.infoIcon}
              />

              <Text className="text-lg text-[color:var(--color-text-primary)]">
                Módulo {course?.module} - {DAY_MAP[DAY_INDEX[course?.day]]}
              </Text>
            </View>

            <View className="flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--color-outline-secondary)]">
              <MaterialCommunityIcons
                name="clock-outline"
                size={20}
                color={colors.infoIcon}
              />

              <Text className="text-lg text-[color:var(--color-text-primary)]">
                {MODULES[course?.module]?.range}
              </Text>
            </View>

            <View className="flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--color-outline-secondary)]">
              <Ionicons name="grid-outline" size={20} color={colors.infoIcon} />

              <Text className="text-lg text-[color:var(--color-text-primary)]">
                Sección {course?.section}
              </Text>
            </View>

            <View className="flex-row w-full gap-[10px] items-center px-[24px] py-[15px] border-b border-[color:var(--color-outline-secondary)]">
              <Ionicons
                name="location-outline"
                size={20}
                color={colors.infoIcon}
              />

              <Text className="text-lg text-[color:var(--color-text-primary)]">
                Sala: {course?.location}
              </Text>
            </View>

            <View className="w-full h-2/5 p-[20px]">
              <View
                className="w-full h-full"
                style={{
                  borderRadius: 50,
                  overflow: "hidden",
                }}
              >
                {mapTarget ? (
                  <MapView
                    style={{
                      flex: 1,
                      zIndex: 50,
                    }}
                    mapStyle="https://tiles.openfreemap.org/styles/liberty"
                    logoEnabled={false}
                    attributionEnabled={false}
                    compassEnabled={false}
                  >
                    <UserLocation
                      visible={true}
                      showsUserHeadingIndicator={true}
                    />

                    <Camera {...cameraProps} animationDuration={1000} />

                    <ShapeSource
                      id="targetSource"
                      shape={mapTarget.geojson as any}
                    >
                      <FillLayer
                        id="targetFill"
                        style={{
                          fillColor: "#2563EB",
                          fillOpacity: 0.25,
                        }}
                      />

                      <LineLayer
                        id="targetOutline"
                        style={{
                          lineColor: "#2563eb",
                          lineWidth: 2,
                        }}
                      />
                    </ShapeSource>

                    {region && mapTarget?.zoom !== "campus" && (
                      <PointAnnotation
                        id="locationPin"
                        coordinate={[region.longitude, region.latitude]}
                      >
                        <View className="items-center justify-center">
                          <MaterialIcons
                            name="location-pin"
                            size={36}
                            color="#2563EB"
                          />
                        </View>
                      </PointAnnotation>
                    )}
                  </MapView>
                ) : (
                  <View className="bg-[color:var(--color-surface)] flex-1 items-center justify-center">
                    <MaterialIcons
                      name="location-off"
                      size={128}
                      color="#8885"
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
