import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useAuth } from "../hooks";
import { useNavigation } from "@react-navigation/native";

import {
  Workout,
  HomeFilled,
  HomeOutline,
  SettingsFilled,
  SettingsOutline,
  ChartFilled,
  ChartOutline,
  Steps
} from "../components/icons";

import Logo from "../components/image/logo-black.png";
import Favicon from "../../assets/icon.png";

import { HomeScreen } from "../screens/home";
import { WorkoutsScreen } from "../screens/workouts";
import { StatsScreen } from "../screens/stats";
import { SettingsScreen } from "../screens/settings";
import { StepCounterScreen } from "../screens/StepCounter";
import MyTabs from './topTabBar'
import StatsTopTabBar from './statsTopTabBar'

const Nav = createBottomTabNavigator();

const NavigationScreens = () => {
  const navigation = useNavigation();
  const { user, isLoading, } = useAuth();
  const iOS = Platform.OS === "ios";
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!user.isLoading) {
      // console.log("Navigation:", user.data);
      if (!user.data) {
        console.log("redirecting to Auth Screen");
        navigation.navigate("AuthScreens", { screen: "LoginScreen" });
      } else {
        setIsInitialLoad(false);
      }
    }
  }, [user.isLoading, user.data]);

  return (
    <Nav.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: true,
        gestureEnabled: false,
        animation: "fade",
        headerShadowVisible: false,
        tabBarStyle: [styles.tabBarStyle, { height: iOS ? 95 : 65 }],
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let Icon;
          let color;
          let label;
          if (route.name === "HomeScreen") {
            Icon = focused ? HomeFilled : HomeOutline;
            color = focused ? "#6842FF" : "#A8A8A8";
            label = "Home";
          } else if (route.name === "WorkoutsScreen") {
            Icon = Workout;
            color = focused ? "#6842FF" : "#A8A8A8";
            label = "Workouts";
          } else if (route.name === "StepCounterScreen") {
            Icon = Steps;
            color = focused ? "#6842FF" : "#A8A8A8";
            label = "Step Counter";
          } else if (route.name === "StatsScreen") {
            Icon = focused ? ChartFilled : ChartOutline;
            color = focused ? "#6842FF" : "#A8A8A8";
            label = "Stats";
          } else if (route.name === "SettingsScreen") {
            Icon = focused ? SettingsFilled : SettingsOutline;
            color = focused ? "#6842FF" : "#A8A8A8";
            label = "Settings";
          }
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 0,
                borderTopColor: "transparent",
              }}
            >
              <Icon size={24} color={color} />
              <Text style={[styles.label, { color: color }]}>{label}</Text>
            </View>
          );
        },
      })}
    >
      <Nav.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => null,
          headerStyle: {
            height: iOS ? 65 : 89,
          },
          headerLeft: () => {
            return (
              <View style={styles.logoContainer}>
                <Image source={require('../components/image/logo-black.png')} style={styles.logo} resizeMode="cover" />
              </View>
            );
          },
        }}
      />
      {/* <Nav.Screen
        name="WorkoutsScreen"
        component={WorkoutsScreen}
        options={{
          headerTitle: () => null,
          headerLeft: () => {
            return (
              <View style={styles.faviconContainer}>
                <Image
                  source={Favicon}
                  style={styles.favicon}
                  resizeMode="cover"
                />
                <Text style={[styles.title]}>Workouts</Text>
              </View>
            );
          },
        }}
      /> */}
      <Nav.Screen
        name="StatsScreen"
        component={StatsTopTabBar}
        options={{
          headerTitle: () => null,
          headerLeft: () => {
            return (
              <View style={styles.faviconContainer}>
                <Image
                  source={require('../../assets/icon.png')}
                  style={styles.favicon}
                  resizeMode="cover"
                />
                <Text style={[styles.title]}>Stats</Text>
              </View>
            );
          },
        }}
      />
      <Nav.Screen
        name="StepCounterScreen"
        component={MyTabs}
        options={{
          headerTitle: () => null,
          headerLeft: () => {
            return (
              <View style={styles.faviconContainer}>
                <Image
                  source={require('../../assets/icon.png')}
                  style={styles.favicon}
                  resizeMode="cover"
                />
                <Text style={[styles.title]}>Step Counter</Text>
              </View>
            );
          },
        }}
      />
      <Nav.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerTitle: () => null,
          headerLeft: () => {
            return (
              <View style={styles.faviconContainer}>
                <Image
                  source={require('../../assets/icon.png')}
                  style={styles.favicon}
                  resizeMode="cover"
                />
                <Text style={[styles.title]}>Settings</Text>
              </View>
            );
          },
        }}
      />
    </Nav.Navigator>
  );
};

export default NavigationScreens;

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopWidth: 0,
    borderTopColor: "transparent",
    backgroundColor: "#ffffff",
    elevation: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },
  logoContainer: {
    flex: 1,
    marginLeft: 8,
  },
  logo: {
    width: 125,
    height: 55,
    marginTop: 6,
  },
  favicon: {
    width: 35,
    height: 35,
    borderRadius: 6,
  },
  faviconContainer: {
    flex: 1,
    marginLeft: 24,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
    marginLeft: 8,
  },
  btn: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
