import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Counter = ({
  icon,
  label,
  subLabel,
  setState,
  setOpenAgePicker,
  counterprop,
  setChildAge,
  removeAgeValue,
}) => {
  const [counter, setCounter] = useState(counterprop);
  useEffect(() => {
    setCounter(counterprop);
  }, [counterprop]);
  const increaseCounter = () => {
    setOpenAgePicker && setOpenAgePicker(true);
    setCounter(counter + 1);
    setState(counter + 1);
  };
  const decreaseCounter = () => {
    setOpenAgePicker && setOpenAgePicker(false);
    counter > 1 && setCounter(counter - 1);
    setChildAge && setChildAge(counterprop - 1);
    removeAgeValue && removeAgeValue(counterprop - 1);
    setState(counter - 1);
  };

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <Icon name={icon} size={24} color="#000" />
        <Text style={styles.text}>
          {label}
          {subLabel && <Text style={styles.subLabel}>{subLabel}</Text>}
        </Text>
      </View>
      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.buttonDecrement}
          disabled={counter === 0}
          onPress={decreaseCounter}>
          <Text style={styles.buttonDecrementText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.counterText}>{counter}</Text>
        <TouchableOpacity
          style={styles.buttonIncrement}
          disabled={
            icon == 'child'
              ? counter === 4
              : icon == 'users'
              ? counter === 30
              : icon == 'bed'
              ? counter == 30
              : false
          }
          onPress={increaseCounter}>
          <Text style={styles.buttonIncrementText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Counter;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderRadius: 8,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#f2f2f2',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 12,
    color: '#949392',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIncrement: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#fc8b32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDecrement: {
    width: 32,
    height: 32,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#fc8b32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIncrementText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDecrementText: {
    color: '#949392',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#949392',
  },
});
