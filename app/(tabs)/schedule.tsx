import '@/global.css';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/utils/native-theme';
import { useTheme } from '@/providers/ThemeProviders';
import { Calendars, SelectedBlock } from '@/types/schedule';
import { addCourseToModules } from '@/utils/schedule';
import { defaultModules, DEFAULT_CALENDARS } from '@/constants/schedule';

import FloatingActionButton from '@/components/schedule/FloatingActionButton';
import AddCourseModal from '@/components/schedule/AddCourseModal';
import ScheduleView from '@/components/schedule/ScheduleView';
import BlockModal from '@/components/schedule/BlockModal';
import SearchResultsModal from '@/components/schedule/SearchResultsModal';
import CourseInfoModal from '@/components/schedule/CourseInfoModal';
import ScheduleSelector from '@/components/schedule/ScheduleSelector';

export default function Schedule() {
  const [calendars, setAllCalendars] = useState<Calendars>(DEFAULT_CALENDARS);
  const [currentPeriod, setCurrentPeriod] = useState('2026-1');
  const modules = calendars[currentPeriod].modules || defaultModules;

  const [modalVisible, setModalVisible] = useState(false);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [courseInfoModalVisible, setCourseInfoModalVisible] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedBlock, setSelectedBlock] = useState<SelectedBlock | null>(null);

  const { theme } = useTheme();
  const appColors = Colors[theme].app;

  const addCourseToSchedule = (course: any) => {
    setAllCalendars(prev => {
      const updatedModules = addCourseToModules(prev[currentPeriod].modules, course);

      return {
        ...prev,
        [currentPeriod]: {
          ...prev[currentPeriod],
          modules: updatedModules
        }
      };
    });

    setResultsModalVisible(false);
  };

  return (
    <SafeAreaView className='flex-1' style={{ backgroundColor: appColors.layout }}>
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
      
      <BlockModal
        visible={blockModalVisible}
        selectedBlock={selectedBlock}
        onClose={() => setBlockModalVisible(false)}
        onPressCourse={(course) => {
          setSelectedCourse(course);
          setCourseInfoModalVisible(true);
        }}
      />

      <CourseInfoModal
        visible={courseInfoModalVisible}
        course={selectedCourse}
        onClose={() => setCourseInfoModalVisible(false)}
        onDeleteCourse={(nrc) => {

        }}
        onDeleteBlock={(course) => {

        }}
      />

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
        onShare={() => {}}
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
    </SafeAreaView>
  );
}
