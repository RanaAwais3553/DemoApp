import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text, StyleSheet} from 'react-native';
import Home from '../screens/home/Home';
import Dummy from '../screens/demo/Dummy';
import Demo1 from '../screens/demo/Demo1';
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
          tabBarActiveTintColor: '#fc8b32',
          tabBarLabelStyle: {fontSize: 12},
          tabBarStyle: {backgroundColor: 'white'},
          tabBarIndicatorStyle: {
            backgroundColor: '#fc8b32', // Bottom line color for active tab
          },
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
          swipeEnabled: false,
          tabBarLabel: ({color}) => (
            <View
              style={{
                ...styles.tabContainer,
              }}>
              <Icon name="home" color={color} size={18} />
              <Text style={[styles.tabLabel, {color}]}>Home</Text>
            </View>
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          swipeEnabled: false,
          tabBarLabel: ({color}) => (
            <View style={styles.tabContainer}>
              <Icon name="cog" color={color} size={18} />
              <Text style={[styles.tabLabel, {color}]}>Hotel</Text>
            </View>
          ),
        }}
        name="Dummy"
        component={Dummy}
      />
      <Tab.Screen
        options={{
          swipeEnabled: false,
          tabBarLabel: ({color}) => (
            <View style={styles.tabContainer}>
              <Icon name="star" color={color} size={18} />
              <Text style={[styles.tabLabel, {color}]}>Demo1</Text>
            </View>
          ),
        }}
        name="Demo1"
        component={Demo1}
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
