import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomButton from './CustomButton';
import AgePicker from './AgePicker';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hooks';
import {UpdateUserForm} from '../../redux/slices/user';
import CurrencyCard from './CurrencyCard';
import ChildrenList from './ChildrenList';
import Counter from './Counter';

const PassengerInfoCard = ({navigation}) => {
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [childrenLocalState, setChildren] = useState(0);
  const user = useAppSelector(state => state.user);
  const {age} = user;
  const dispatch = useAppDispatch();
  const [openAgePicker, setOpenAgePicker] = useState(false);
  const [childAge, setChildAge] = useState(age);

  useEffect(() => {
    const data = {
      rooms,
      adults,
      children: childrenLocalState,
      age: childAge,
    };
    dispatch(UpdateUserForm(data));
  }, [childrenLocalState, rooms, adults, childAge]);
  const removeAgeValue = indexVal => {
    const newArr = [...age?.filter((data, indx) => indx !== indexVal)];
    setChildAge(newArr);
    setChildren(childrenLocalState - 1);
  };
  console.log('form data is:#@#@', rooms, adults, childrenLocalState);
  return (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.headerText}>Select Rooms and Guest Count</Text>
      <View style={styles.cardContainer}>
        <Counter
          icon="bed"
          label="Rooms"
          setState={setRooms}
          counterprop={rooms}
        />
        <Counter
          icon="users"
          label="Adults"
          setState={setAdults}
          counterprop={adults}
        />
        <Counter
          icon="child"
          label="Children"
          subLabel=" 17 years or less"
          setState={setChildren}
          setOpenAgePicker={setOpenAgePicker}
          counterprop={childrenLocalState}
          setChildAge={setChildAge}
          removeAgeValue={removeAgeValue}
        />
        {childAge?.map((data, index) => (
          <ChildrenList
            data={data}
            index={index}
            removeAgeValue={removeAgeValue}
          />
        ))}
        <CurrencyCard />
        <View style={{marginVertical: 14}}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
            {rooms} Room - {adults} Adults - {childrenLocalState} Children
          </Text>
        </View>
        <View style={{paddingBottom: 14}}>
          <CustomButton
            title={'CONTINUE'}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      {
        <AgePicker
          setOpenAgePicker={setOpenAgePicker}
          openAgePicker={openAgePicker}
          setChildAge={setChildAge}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    // flex: 1,
    display: 'flex',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 12,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardContainer: {
    marginTop: 12,
    flex: 1,
  },
});

export default PassengerInfoCard;
