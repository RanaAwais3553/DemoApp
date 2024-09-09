import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ExpandableUserCard from './ExpandableCard'; // Import the ExpandableUserCard component

const UserLeaderBoard = () => {
  const users = [
    { id: '1', name: 'Alice', score: 85, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRol2F2v-15-bJMfYDMWZO188rSu79Fwerjog&s' },
    { id: '2', name: 'Bob', score: 90, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRATf0qZGsfEfE_WfiKdX9dFhDJ4FAkE4MaQBISxAtwShdRHySVXvbwZqWDOx6RApwldfo&usqp=CAU' },
    { id: '3', name: 'Charlie', score: 75, image: 'https://images.squarespace-cdn.com/content/v1/552ecb0fe4b0a60b2b2b2754/1559008326676-6E31G3INE7OF7LJGX15J/61205172_10213536875847544_5549639603801030656_n.jpg' },
    { id: '4', name: 'Alice', score: 185, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIoyV2bL40ct6f70SV7PjNPo5gKXXnxiF5THJeInJxuIier7CytdXdkm5n7NYve0dODhw&usqp=CAU' },
    { id: '5', name: 'Bob', score: 190, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmi7GY9uulw5E40MMhoXR_b1qZLona3q3Ob5jzbcgfssOKYv7FEcS3SbI0d2Yq5sFE9bI&usqp=CAU' },
    { id: '6', name: 'Charlie', score: 175, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxgFQlVJBpYP0nRIPs4LXLXr1bD4Dh78z8zeMgozATvpJTIPzQr4pOW00ziT85Zllip7s&usqp=CAU' },
    // Add more user data as needed
  ];
  
  // Sort users by score in ascending order
  const sortedUsers = users.sort((a, b) => b.score - a.score);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedUsers}
        keyExtractor={(item) => item.id} 
        renderItem={({ item }) => <ExpandableUserCard user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default UserLeaderBoard;
