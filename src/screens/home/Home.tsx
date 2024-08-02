import React, {useState} from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'react-native-elements';
import CardField from '../../components/atoms/CardField';
import CustomButton from '../../components/atoms/CustomButton';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hooks';
import moment from 'moment';
function Home({navigation}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // const searchResult = useAppSelector(state => state.searchResult);

  const cardArray = [
    {
      id: '1',
      leftIcon: 'plane',
      rightIcon: 'chevron-down',
      text: 'Where are you going',
    },
    {
      id: '2',
      leftIcon: 'calendar',
      rightIcon: 'chevron-down',
      text: 'Select your date',
    },
    {
      id: '3',
      leftIcon: 'user',
      rightIcon: 'chevron-down',
      text: '1 Room -  2 Adults - 0 Children',
    },
  ];
  // console.log('searchResult are', searchResult);
  const onSearchHandle = () => {
    // SearchScreen
    navigation.navigate('SearchScreen');
  };
  const callBackDatePicker = (startDate: string, endDate: string) => {
    setStartDate(moment(startDate).format('D MMMM YYYY'));
    setEndDate(moment(endDate).format('D MMMM YYYY'));
    console.log('start and end date are:#@#@#', startDate, endDate);
  };
  const calenderBookingHandle = () => {
    navigation.navigate('BottomSheetCalendar', {
      callBack: callBackDatePicker,
    });
  };
  const handlePassengerInfo = () => {
    navigation.navigate('BottomSheetPassengerInfoForm');
  };
  return (
    <SafeAreaView style={{display: 'flex', flex: 1}} edges={['top']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'#fc8b32'}
        hidden={false}
        translucent
      />
      <View style={{marginTop: 22}}>
        {cardArray.map(card => (
          <CardField
            card={card}
            onSearchHandle={onSearchHandle}
            startDate={startDate}
            endDate={endDate}
            calenderBookingHandle={calenderBookingHandle}
            handlePassengerInfo={handlePassengerInfo}
          />
        ))}
        <CustomButton title={'Search'} onPress={() => console.log('press')} />
      </View>
    </SafeAreaView>
  );
}

export default Home;
