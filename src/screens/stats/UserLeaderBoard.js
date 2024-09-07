import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ExpandableUserCard from './ExpandableCard'; // Import the ExpandableUserCard component

const UserLeaderBoard = () => {
  const users = [
    { id: '1', name: 'Alice', score: 85, image: 'https://example.com/alice.jpg' },
    { id: '2', name: 'Bob', score: 90, image: 'https://example.com/bob.jpg' },
    { id: '3', name: 'Charlie', score: 75, image: 'https://example.com/charlie.jpg' },
    { id: '4', name: 'Alice', score: 185, image: 'https://example.com/alice.jpg' },
    { id: '5', name: 'Bob', score: 190, image: 'https://example.com/bob.jpg' },
    { id: '6', name: 'Charlie', score: 175, image: 'https://example.com/charlie.jpg' },
    // Add more user data as needed
  ];
  
  // Sort users by score in ascending order
  const sortedUsers = users.sort((a, b) => a.score - b.score);

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
