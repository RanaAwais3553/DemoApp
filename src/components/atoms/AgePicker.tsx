import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hooks';

const AgePicker = ({setOpenAgePicker, openAgePicker, setChildAge}) => {
  const [selectedAge, setSelectedAge] = useState('1 years old');
  const [isPickerVisible, setIsPickerVisible] = useState(openAgePicker);
  const user = useAppSelector(state => state.user);
  const {rooms, adults, children, age} = user;
  console.log('rooms, adults, children, age', rooms, adults, children, age);
  const ageOptions = [
    'Less than 1 year old',
    '1 years old',
    '2 years old',
    '3 years old',
    '4 years old',
    '5 years old',
    '6 years old',
    '7 years old',
    '8 years old',
    '9 years old',
    '10 years old',
    '11 years old',
    '12 years old',
    '13 years old',
    '14 years old',
    '15 years old',
    '16 years old',
    '17 years old',
  ];

  const togglePicker = () => {
    setIsPickerVisible(!isPickerVisible);
    setOpenAgePicker(false);
  };

  const onValueChange = value => {
    setChildAge([...age, value]);
    setSelectedAge(value);
    togglePicker(); // Close picker after selection
  };

  return (
    <View style={styles.container}>
      <Modal
        visible={!!openAgePicker}
        animationType="slide"
        transparent={true}
        onRequestClose={togglePicker}>
        <TouchableOpacity style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <View style={{paddingVertical: 16}}>
              <Text
                style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>
                Select Age
              </Text>
            </View>
            <Picker
              selectedValue={selectedAge}
              onValueChange={value => onValueChange(value)}>
              {ageOptions.map((age, index) => (
                <Picker.Item key={index} label={age} value={age} />
              ))}
            </Picker>
            {/* <Button title="Close" onPress={togglePicker} /> */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
});

export default AgePicker;
