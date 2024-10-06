import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const ReminderModal = ({ isVisible, onCancel, onConfirm }) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
    >
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer]}>
            <View style={{ width: windowWidth * 0.75,padding: 12,marginBottom:22, }}>
          <Text style={styles.heading}>Reminder:</Text>
          <Text style={styles.paragraph}>
            Agreed to participate in Leader Board challenge and share my steps to the board
          </Text>
          </View>
          <View style={{...styles.buttonRow,width: windowWidth * 0.75}}>
            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={{...styles.buttonText,color:'#b0aeb0'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onConfirm}>
              <Text style={{...styles.buttonText,color:'#f07575'}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
       
      </View>
     
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonRow: {
    position:'absolute',
    bottom:0,
    padding:0,
    margin:0,
    height:42,
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default ReminderModal;
