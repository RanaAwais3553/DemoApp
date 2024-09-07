import { useEffect } from "react";
import { TouchableOpacity, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
    Dashboard
} from "../screens/dashboard";
import UserDetailScreen from "../screens/dashboard/UserDetailScreen";

const AdminDashboard = createNativeStackNavigator();

const AdminDashboardScreens = () => {
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
    <AdminDashboard.Navigator
      screenOptions={{
        headerTitle: "",
        // gestureEnabled: false,
        // agestureDirection: "horizontal",
        // animation: "slide_from_right",
      }}
    >
      <AdminDashboard.Screen name="Dashboard" component={Dashboard}  options={{
          headerTitle: "Admin Dashboard",
          headerStyle: {
            // height: 65,
          },
          headerLeft: () => null,
        }} />
         <AdminDashboard.Screen name="UserDetailScreen" component={UserDetailScreen}  options={{
          headerTitle: "User Detail",
          headerStyle: {
            // height: 65,
          },
          // headerLeft: () => null,
        }} />
     
    </AdminDashboard.Navigator>
  );
};

export default AdminDashboardScreens;
