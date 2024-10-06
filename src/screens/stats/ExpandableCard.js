import { CloudCog } from 'lucide-react-native';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// ExpandableUserCard Component to show user name, image, and score
const ExpandableUserCard = ({ user }) => {
  console.log("user data is:#@#@#@",user)
  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRol2F2v-15-bJMfYDMWZO188rSu79Fwerjog&s' }} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text numberOfLines={1} style={styles.userName}>{user.username}</Text>
        <Text style={styles.userScore}>FootSteps: {user.totalSteps}</Text>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userScore: {
    fontSize: 16,
    color: '#555',
  },
});

export default ExpandableUserCard;
