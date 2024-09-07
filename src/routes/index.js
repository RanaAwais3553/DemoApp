import { useEffect } from "react";
import { BackHandler } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "../screens/entry";
import AuthScreens from "./auth";
import NavigationScreens from "./navigation";
import OnboardingScreens from "./onboarding";
import AdminDashboardScreens from './admindashboard'
import MainScreens from "./main";

const Page = createNativeStackNavigator();

const Routes = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      // return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Page.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        animation: "fade",
      }}
    >
      <Page.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Page.Screen name="AuthScreens" component={AuthScreens} />
      <Page.Screen name="OnboardingScreens" component={OnboardingScreens} />
      <Page.Screen name="AdminDashboardScreens" component={AdminDashboardScreens} />
      <Page.Screen name="NavigationScreens" component={NavigationScreens} />
      <Page.Screen name="AppScreens" component={MainScreens} />
    </Page.Navigator>
  );
};

export default Routes;
