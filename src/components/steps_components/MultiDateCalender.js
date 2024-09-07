import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MultiDateSelectionCalendar = () => {
  const [selectedDates, setSelectedDates] = useState({});

  const onDayPress = (day) => {
    const newDates = { ...selectedDates };
    if (newDates[day.dateString]) {
      delete newDates[day.dateString];
    } else {
      newDates[day.dateString] = {
        selected: true,
        marked: true,
        selectedColor: '#3498db',
      };
    }
    setSelectedDates(newDates);
  };

  return (
    <View style={styles.container}>
      <Calendar
      style={{
        height:350,
        width:Dimensions.get('window').width,
      }}
        onDayPress={onDayPress}
        markedDates={selectedDates}
        markingType={'multi-dot'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MultiDateSelectionCalendar;
