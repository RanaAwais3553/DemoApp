import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
const UserCard = ({ name, phone, gender, onDelete,userData,handleNavigation }) => {
    console.log("All Users Data is:##@#@",userData)
  return (
    <TouchableOpacity onPress={() => handleNavigation(userData)} style={styles.card}>
         <View style={styles.avatar_container}>
              <Image style={styles.avatar} source={require('../../../assets/image/avatar.png')} />
            </View>
     
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.detailText}>{phone}</Text>
        <Text style={styles.detailText}>{gender}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.3, // For iOS shadow
    shadowRadius: 2, // For iOS shadow
  },
  avatar: { width: 90, height: 90, borderRadius: 100 },
  avatar_container: {
    borderColor: "#6842FF",
    borderRadius: 100,
    padding: 2,
    borderWidth: 2,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight:5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#555',
  },
  userIcon: {
    marginLeft: 10,
  },
});

export default UserCard;
