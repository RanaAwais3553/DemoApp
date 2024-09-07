import { useEffect } from "react";
import { BackHandler, Platform, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { HomeScreen, WorkoutScreen, WorkoutVideoScreen } from "../screens/home";
import { ArrowLeft } from "lucide-react-native";
import Subscriptions from "../screens/settings/Subscriptions";

const Main = createNativeStackNavigator();

const MainScreens = () => {
  const navigation = useNavigation();
  const iOS = Platform.OS === "ios";

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
    <Main.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: "",
        gestureEnabled: false,
        animation: "fade",
        animationDuration: 500,
      }}
      // initialRouteName="WorkoutScreen"
    >
      <Main.Screen
        name="WorkoutScreen"
        component={WorkoutScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTransparent: true,
          headerTintColor: "#fff",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => navigation?.goBack()}
                style={{
                  marginLeft: iOS ? -14 : -8,
                  marginTop: 4,
                }}
              >
                <ArrowLeft color="#ffffff" size={28} />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Main.Screen
        name="WorkoutVideoScreen"
        component={WorkoutVideoScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
      <Main.Screen
        name="SubscriptionScreen"
        component={Subscriptions}
        options={{
          headerShown: true,
          headerTitle: "",
          headerShadowVisible: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
    </Main.Navigator>
  );
};

export default MainScreens;
