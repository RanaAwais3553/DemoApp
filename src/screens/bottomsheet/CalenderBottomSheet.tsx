import React from 'react';
import {SafeAreaView} from 'react-native';
import BottomSheetCalendar from '../../components/molecules/BottomSheetCalender'; // Adjust the import path as needed

const CalenderBottomSheet = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomSheetCalendar />
    </SafeAreaView>
  );
};

export default CalenderBottomSheet;
