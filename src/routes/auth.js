import { useEffect } from "react";
import { TouchableOpacity, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthScreen, LoginScreen, SignupScreen, EmailScreen, ConfirmScreen, WebviewScreen } from "../screens/auth";

import { ArrowLeft } from "lucide-react-native";

const Auth = createNativeStackNavigator();

const AuthScreens = () => {
  const navigation = useNavigation();

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
    <Auth.Navigator
      screenOptions={({ navigation }) => ({
        gestureEnabled: false,
        gestureDirection: "horizontal",
        animation: "slide_from_right",
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false,
        headerLeft: () => {
          return (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginTop: 6 }}
            >
              <ArrowLeft color="#212121" size={28} />
            </TouchableOpacity>
          );
        },
      })}
      initialRouteName="LoginScreen"
    >
      {/* <Auth.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      /> */}
      <Auth.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          headerTitle: "",
          headerShadowVisible: false,
        }}
      />
      <Auth.Screen name="SignupScreen" component={SignupScreen} />
      <Auth.Screen name="EmailScreen" component={EmailScreen} />
      <Auth.Screen name="ConfirmScreen" component={ConfirmScreen} />
      <Auth.Screen name="WebviewScreen" component={WebviewScreen} />
    </Auth.Navigator>
  );
};

export default AuthScreens;
