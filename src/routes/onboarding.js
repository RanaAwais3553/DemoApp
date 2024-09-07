import { useEffect } from "react";
import { TouchableOpacity, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  ActivityLevelScreen,
  AgeScreen,
  GenderScreen,
  GymGoalScreen,
  HeightScreen,
  WeightScreen,
  WeightTrainScreen,
  GymPlaceScreen,
  ProgramScreen,
  PlanScreen,
  PaymentScreen,
} from "../screens/onboarding";

const Onboarding = createNativeStackNavigator();

const OnboardingScreens = () => {
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

  return (
    <Onboarding.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: "",
        gestureEnabled: false,
        agestureDirection: "horizontal",
        animation: "slide_from_right",
      }}
    >
      <Onboarding.Screen name="GenderScreen" component={GenderScreen} />
      <Onboarding.Screen name="AgeScreen" component={AgeScreen} />
      <Onboarding.Screen name="WeightScreen" component={WeightScreen} />
      <Onboarding.Screen name="HeightScreen" component={HeightScreen} />
      <Onboarding.Screen
        name="ActivityLevelScreen"
        component={ActivityLevelScreen}
      />
      <Onboarding.Screen
        name="WeightTrainScreen"
        component={WeightTrainScreen}
      />
      <Onboarding.Screen name="GymGoalScreen" component={GymGoalScreen} />
      <Onboarding.Screen name="GymPlaceScreen" component={GymPlaceScreen} />
      <Onboarding.Screen name="ProgramScreen" component={ProgramScreen} />
      <Onboarding.Screen name="PlanScreen" component={PlanScreen} />
      <Onboarding.Screen name="PaymentScreen" component={PaymentScreen} />
    </Onboarding.Navigator>
  );
};

export default OnboardingScreens;
