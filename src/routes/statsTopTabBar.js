import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from 'react-native';
import UserLeaderBoard from '../screens/stats/UserLeaderBoard';
import Stats from '../screens/stats/Stats';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();

function StatsTopTabBar() {
  return (
    <Tab.Navigator
      initialRouteName="Stats"
      screenOptions={({route, navigation}) => {
        const state = navigation.getState();
        const currentIndex = state.index;
        const isFocused = state.routes[currentIndex].name === route.name;
        console.log('curr route:#@#@', isFocused);
        return {
          tabBarActiveTintColor: '#6842FF',
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {backgroundColor: 'white'},
          tabBarIndicatorStyle: {
            backgroundColor: '#6842FF', // Bottom line color for active tab
          },
         tabBarInactiveTintColor:'#A8A8A8',
          // tabBarIndicatorStyle: {
          //   backgroundColor: '#fc8b32',
          // },
          tabBarItemStyle: () => ({
            backgroundColor: isFocused ? '#fc8b32' : '#ffffff',
          }),
          // tabBarItemStyle: ({focused}) => ({
          //   backgroundColor: focused ? '#fff' : '#ffffff', // Background color change on active
          // }),
        };
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: ({color}) => (
            <View
              style={{
                ...styles.tabContainer,
              }}>
              <Icon name="clock-o" color={color} size={18} />
              <Text style={[styles.tabLabel, {color}]}>Stats</Text>
            </View>
          ),
        }}
        name="Stats"
        component={Stats}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({color}) => (
            <View style={styles.tabContainer}>
              <MaterialIcon name="leaderboard" color={color} size={18} />
              <Text style={[styles.tabLabel, {color}]}>Leader Board</Text>
            </View>
          ),
        }}
        name="UserLeaderBoard"
        component={UserLeaderBoard}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default StatsTopTabBar;
