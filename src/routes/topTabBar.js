import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from 'react-native';
import Daily from '../screens/stats/Daily';
import Weekend from '../screens/stats/Weekend';
import Monthly from '../screens/stats/Monthly';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
              <Text style={[styles.tabLabel, {color}]}>Daily</Text>
            </View>
          ),
        }}
        name="Daily"
        component={Daily}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({color}) => (
            <View style={styles.tabContainer}>
              <Icon name="calendar" color={color} size={18} />
              <Text style={[styles.tabLabel, {color}]}>Weekend</Text>
            </View>
          ),
        }}
        name="Weekend"
        component={Weekend}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({color}) => (
            <View style={styles.tabContainer}>
              <Icon name="list-ul" color={color} size={18} />
              <Text style={[styles.tabLabel, {color}]}>Monthly</Text>
            </View>
          ),
        }}
        name="Monthly"
        component={Monthly}
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

export default MyTabs;
