import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {CalendarList, Calendar} from 'react-native-calendars';
import BSheet from '../atoms/BottomSheetV2';
import moment from 'moment';
const screenHeight = Dimensions.get('window').height;
let timeout: number = 500;
const BottomSheetCalendar = ({navigation, route}) => {
  const {callBack} = route?.params;
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [hideBottomSheet, setHideBottomSheet] = useState(true);
  const today = moment().format('YYYY-MM-DD');
  const maxDate = moment().add(1, 'year').format('YYYY-MM-DD');
  useEffect(() => {
    if (startDay && endDay) {
      callBack(startDay, endDay);
      setTimeout(() => {
        setHideBottomSheet(false);
        navigation.goBack();
      }, timeout);
    }
    return () => clearTimeout(timeout);
  }, [endDay, startDay]);
  const renderContent = () => (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.sheetHeader}>Select your date</Text>
      <CalendarList
        style={{
          marginTop: 40,
        }}
        minDate={today}
        maxDate={maxDate}
        onDayPress={day => {
          if (startDay && !endDay) {
            const date = {};
            for (
              const d = moment(startDay);
              d.isSameOrBefore(day.dateString);
              d.add(1, 'days')
            ) {
              date[d.format('YYYY-MM-DD')] = {
                marked: true,
                color: '#fc8b32',
                textColor: 'white',
              };

              if (d.format('YYYY-MM-DD') === startDay)
                date[d.format('YYYY-MM-DD')].startingDay = true;
              if (d.format('YYYY-MM-DD') === day.dateString)
                date[d.format('YYYY-MM-DD')].endingDay = true;
            }

            setMarkedDates(date);
            setEndDay(day.dateString);
          } else {
            setStartDay(day.dateString);
            setEndDay(null);
            setMarkedDates({
              [day.dateString]: {
                marked: true,
                color: '#fc8b32',
                textColor: 'white',
                startingDay: true,
                endingDay: true,
              },
            });
          }
        }}
        monthFormat={'MMM yyyy'}
        hideDayNames={false}
        markingType={'period'}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: '#646464',
          selectedDayTextColor: 'white',
          monthTextColor: '#121212',
          dayTextColor: 'black',
          todayTextColor: '#fc8b32',
          textMonthFontSize: 18,
          textDayHeaderFontSize: 12,
          arrowColor: '#e6e6e6',
          dotColor: '#fc8b32',
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <BSheet
        withDismissOverlay={true}
        isOpen={hideBottomSheet}
        onOverlayPress={() => console.log('first')}
        innerRef={bottomSheetRef}>
        {renderContent()}
      </BSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: screenHeight * 0.8,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
    height: screenHeight * 0.89,
  },
  sheetHeader: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    // marginBottom: 16,
  },
  calendar: {
    marginBottom: 10,
  },
});

export default BottomSheetCalendar;
