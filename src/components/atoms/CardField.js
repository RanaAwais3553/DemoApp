import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or use your preferred icon library
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hooks';

const CardField = ({
  card,
  onSearchHandle,
  calenderBookingHandle,
  startDate,
  endDate,
  handlePassengerInfo,
}) => {
  const {id, leftIcon, rightIcon, text} = card;
  const user = useAppSelector(state => state.user);
  const searchResult = useAppSelector(state => state.searchResult);
  const {rooms, adults, children} = user;
  console.log('user data inside card component is', {user});
  return (
    <TouchableOpacity
      onPress={
        id == '1'
          ? onSearchHandle
          : id == '2'
          ? calenderBookingHandle
          : handlePassengerInfo
      }
      style={styles.cardContainer}>
      <View style={{...styles.lefticonContainer}}>
        <Icon name={leftIcon} size={18} color="#fc8b32" />
      </View>
      <Text style={styles.cardText}>
        {endDate && startDate && id == 2
          ? startDate + ' - ' + endDate
          : id == 3
          ? `${rooms} Room -  ${adults} Adults - ${children} Children`
          : id == 1 && searchResult?.city
          ? searchResult?.city + ', ' + searchResult?.country
          : text}
      </Text>
      <View style={styles.iconContainer}>
        <Icon name={rightIcon} size={14} color="#555" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    height: 50,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 2, height: 0},
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    // marginHorizontal: 4,
  },
  lefticonContainer: {
    // marginLeft: 4,
    marginRight: 14,
  },
  cardText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default CardField;
