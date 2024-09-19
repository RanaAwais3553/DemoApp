import React, { useState } from 'react';
import { View, StyleSheet, Dimensions,Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'
const MultiDateSelectionCalendar = ({stepsDate}) => {
  const [selectedDates, setSelectedDates] = useState({});
  const dateNumbers = {
    '2024-09-12': 5,
    '2024-09-13': 10,
    '2024-09-14': 2,
    // Add more dates as necessary
  };
  const onDayPress = (day) => {
    const newDates = { ...selectedDates };
    if (newDates[day.dateString]) {
      delete newDates[day.dateString];
    } else {
      newDates[day.dateString] = {
        customStyles: {
          container: {
            backgroundColor: '#3498db', // Background color for selected dates
          },
          text: {
            color: 'red',
            fontWeight: 'bold',
          },
        },
      };
    }
    setSelectedDates(newDates);
  };
  const markedDates = {
    ...Object.keys(dateNumbers).reduce((acc, date) => {
      acc[date] = {
        customStyles: {
          container: {
            backgroundColor: 'red', // Background color for dates in dateNumbers
          },
          text: {
            color: 'white',
            fontWeight: 'bold',
          },
        },
      };
      return acc;
    }, {}),
    ...selectedDates,
  };
  console.log("stepsDate stepsDate",stepsDate)
  const renderDayComponent = ({ date, state }) => {
    return (
      <View style={styles.dayContainer}>
        <Text style={{ textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black' }}>
          {date.day}
        </Text>
        {stepsDate && <Text style={styles.numberText}>
        {stepsDate[date?.dateString] !== undefined && stepsDate[date?.dateString] !== null ? stepsDate[date?.dateString] : ''}
        </Text>}
      </View>
    );
  };
  const date = stepsDate ? Object.keys(stepsDate)[0] : moment().format("YYYY-MM-DD");
  return (
    <View style={styles.container}>
      <Calendar
      style={{
        height:350,
        width:Dimensions.get('window').width,
      }}
        // onDayPress={onDayPress}
        // markedDates={selectedDates}
        // markedDates={
        //   {
        //     "2024-09-12": {
        //       "customStyles": {
        //         "container": {
        //           "backgroundColor": "#ff6347"  // Custom background color for this date
        //         },
        //         "text": {
        //           "color": "white",  // Text color for this date
        //           "fontWeight": "bold"  // Custom text style for this date
        //         }
        //       }
        //     },
        //     "2024-09-13": {
        //       "customStyles": {
        //         "container": {
        //           "backgroundColor": "#ff6347"  // Custom background color for this date
        //         },
        //         "text": {
        //           "color": "white",
        //           "fontWeight": "bold"
        //         }
        //       }
        //     },
        //     "2024-09-14": {
        //       "customStyles": {
        //         "container": {
        //           "backgroundColor": "#ff6347"  // Custom background color for this date
        //         },
        //         "text": {
        //           "color": "white",
        //           "fontWeight": "bold"
        //         }
        //       }
        //     }
        //   }  
        // }
        markingType={'custom'}
        dayComponent={renderDayComponent}
        minDate={date} // Current date as minimum selectable date
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
  dayContainer: {
    alignItems: 'center',
  },
  numberText: {
    fontSize: 10,
    color: 'rgba(104, 66, 255, 1)',
    fontWeight:'bold',
  },
});

export default MultiDateSelectionCalendar;
