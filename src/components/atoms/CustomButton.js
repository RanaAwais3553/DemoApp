import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 12,
    backgroundColor: '#fc8b32', // Customize your button color
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5, // Optional: Add border radius for rounded corners
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
