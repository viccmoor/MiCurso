import "@/global.css";
import { useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { defaultModules } from "@/constants/schedule";
import { useSchedule } from "@/providers/ScheduleProvider";
import { ModuleIndex, SelectedBlock } from "@/types/schedule";
import {
    addCourseToModules,
    deleteCourseByNRC,
    deleteSingleBlock,
} from "@/utils/schedule";

import AddCourseModal from "@/components/schedule/AddCourseModal";
import BlockModal from "@/components/schedule/BlockModal";
import FloatingActionButton from "@/components/schedule/FloatingActionButton";
import RemoveScheduleModal from "@/components/schedule/RemoveScheduleModal";
import ScheduleSelector from "@/components/schedule/ScheduleSelector";
import ScheduleView from "@/components/schedule/ScheduleView";
import SearchResultsModal from "@/components/schedule/SearchResultsModal";

export default function Schedule() {
  const { calendars, setCalendars, currentPeriod, setCurrentPeriod } =
    useSchedule();
  const modules = calendars[currentPeriod].modules || defaultModules;

  const [modalVisible, setModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [removeScheduleVisible, setRemoveScheduleVisible] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState<SelectedBlock | null>(
    null,
  );

  const insets = useSafeAreaInsets();

  const addCourseToSchedule = (course: any) => {
    setCalendars((prev) => {
      const updatedModules = addCourseToModules(
        prev[currentPeriod].modules,
        course,
      );

      return {
        ...prev,
        [currentPeriod]: {
          ...prev[currentPeriod],
          modules: updatedModules,
        },
      };
    });

    setResultsModalVisible(false);
  };

  return (
    <View
      className="flex-1 bg-[color:var(--color-background)]"
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <ScheduleSelector
        data={{ calendars: calendars, currentPeriod: currentPeriod }}
        onSetPeriod={(period) => setCurrentPeriod(period)}
      />

      <ScheduleView
        modules={modules}
        onPressBlock={(selectedBlock) => {
          setSelectedBlock(selectedBlock);
          setBlockModalVisible(true);
        }}
      />

      {selectedBlock && (
        <BlockModal
          visible={blockModalVisible}
          selectedBlock={selectedBlock}
          modules={modules}
          onClose={() => setBlockModalVisible(false)}
          onDeleteCourse={(nrc) => {
            setCalendars((prev) => ({
              ...prev,
              [currentPeriod]: {
                ...prev[currentPeriod],
                modules: deleteCourseByNRC(prev[currentPeriod].modules, nrc),
              },
            }));
          }}
          onDeleteBlock={(block) => {
            if (!selectedBlock) return;

            setCalendars((prev) => ({
              ...prev,
              [currentPeriod]: {
                ...prev[currentPeriod],
                modules: deleteSingleBlock(
                  prev[currentPeriod].modules,
                  selectedBlock.mod.id as ModuleIndex,
                  selectedBlock.dayIndex,
                  block,
                ),
              },
            }));
          }}
        />
      )}

      <AddCourseModal
        visible={modalVisible}
        currentPeriod={currentPeriod}
        onClose={() => setModalVisible(false)}
        onResults={(results: any) => {
          setSearchResults(results);
          setResultsModalVisible(true);
        }}
      />

      <FloatingActionButton
        onAddCourse={() => setModalVisible(true)}
        onRemoveSchedule={() => setRemoveScheduleVisible(true)}
      />

      <RemoveScheduleModal
        visible={removeScheduleVisible}
        onClose={() => setRemoveScheduleVisible(false)}
        onRemoveSchedule={() => {
          setCalendars((prev) => {
            return {
              ...prev,
              [currentPeriod]: {
                ...prev[currentPeriod],
                modules: defaultModules,
              },
            };
          });
        }}
      />

      <SearchResultsModal
        visible={resultsModalVisible}
        searchResults={searchResults}
        onAddCourse={(curso: any) => addCourseToSchedule(curso)}
        onClose={() => {
          setResultsModalVisible(false);
          setModalVisible(true);
        }}
      />
    </View>
  );
}
