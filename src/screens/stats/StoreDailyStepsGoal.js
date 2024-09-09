import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputStorageComponent = ({setVisibleModel}) => {
  const [input, setInput] = useState('');
  const [isModalVisible, setModalVisible] = useState(true);

  // Function to store data into local storage
  const storeData = async (value) => {
    const getDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        return days[today.getDay()];
      };
    try {
      await AsyncStorage.setItem(getDayName(), value);
      console.log('Data stored successfully');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  // Function to handle saving input
  const handleSave = () => {
    storeData(input);
    setVisibleModel(false);
    setModalVisible(false); // Close modal after saving
  };

  return (
    <View style={styles.container}> 
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text>Steps Daily Goal:</Text>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={input}
              onChangeText={setInput}
              keyboardType='number-pad'
            />
            <Button title="Save" onPress={handleSave} disabled={!!!input} />
          </View>
        </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // To give a dark background effect
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 20,
    padding: 8,
  },
});

export default InputStorageComponent;
