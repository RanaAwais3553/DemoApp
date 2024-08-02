import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChildrenList = ({data, index, removeAgeValue}) => {
  return (
    <View style={styles.card} key={index}>
      <View style={styles.leftSection}>
        <Text style={styles.text}>Child 1</Text>
      </View>
      <View
        style={{
          ...styles.rightSection,
          flex: 0.5,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{...styles.buttonDecrementText, fontSize: 16}}>
            {data}
          </Text>
        </View>
        <TouchableOpacity onPress={() => removeAgeValue(index)}>
          <Icon name={'times'} size={18} color="#fc8b32" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChildrenList;

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
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonDecrementText: {
    color: '#949392',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
