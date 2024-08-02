import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const CurrencyCard = () => {
  return (
    <View style={styles.currencyCard}>
      <View style={styles.leftSection}>
        <Icon name="money" size={24} color="#000" />
        <Text style={styles.text}>Currency</Text>
      </View>
      <View style={styles.rightSection}>
        <View style={styles.currencyBox}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Flag_of_Saudi_Arabia.svg/1200px-Flag_of_Saudi_Arabia.svg.png',
            }}
            style={styles.flagIcon}
          />
          <Text style={styles.currencyText}>SAR</Text>
          <Icon name="chevron-down" size={14} color="#000" />
        </View>
      </View>
    </View>
  );
};

export default CurrencyCard;

const styles = StyleSheet.create({
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
  currencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderRadius: 8,
    borderBottomWidth: 0.5,
    borderColor: '#f2f2f2',
  },
  currencyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#fc8b32',
    gap: 5,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  flagIcon: {
    width: 20,
    height: 15,
    marginRight: 8,
  },
  currencyText: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});
