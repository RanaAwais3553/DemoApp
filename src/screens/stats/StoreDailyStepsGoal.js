import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet,Alert, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
const InputStorageComponent = ({setVisibleModel,steps}) => {
  const [input, setInput] = useState(0);
  const [isModalVisible, setModalVisible] = useState(true);

  // Function to store data into local storage
  const storeData = async (value) => {
    const getTodayDate = () => {
      const today = new Date();
      return today.toLocaleDateString('en-CA');
    };
    try {
      console.log("getTodayDate() inside storeDailyStepsGoal",getTodayDate())
      await AsyncStorage.setItem('goalSteps', value);
      await AsyncStorage.setItem('stepData', value);
      await AsyncStorage.setItem('lastUpdatedDate', getTodayDate());
      console.log('Data stored successfully');
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  // Function to handle saving input
  const handleSave = () => {
    console.log("data is:#@#@#",Number(input) + 20 > steps)
    if(Number(input)  > (steps + 20)){
      storeData(input);
      setVisibleModel(false);
      setModalVisible(false); // Close modal after saving
    }else{ 
      Alert.alert("Goal Steps must be greater than current steps:",`${steps + 20}`)
    }
  };

  return (
    <View style={styles.container}> 
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
          <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row',width: 300,alignItems:'center'}}>
          <TouchableOpacity style={{padding:5}} onPress={() => {
            setVisibleModel(false);
            setModalVisible(false); 
          }}>
          <Icon name="times" size={20} color="#000" />
          </TouchableOpacity>
          <View>
            <Text>Steps Daily Goal</Text>
            </View>
            <View></View>
            </View>
            <View style={{paddingTop:20}}>
            <TextInput
              style={styles.input}
              placeholder="Type here..."
              value={input}
              onChangeText={setInput}
              keyboardType='number-pad'
              maxLength={5}
            />
            </View>
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
    // padding: 20,
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
