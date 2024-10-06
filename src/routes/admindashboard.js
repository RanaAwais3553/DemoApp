import { useEffect } from "react";
import { TouchableOpacity, BackHandler,Image,View, Platform,StyleSheet,Text } from "react-native";
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
         <AdminDashboard.Screen name="UserDetailScreen" component={UserDetailScreen}  
          options={{
            headerTitle: () => null,
            headerStyle: {
              height: Platform.OS == 'ios' ? 65 : 89,
            },
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
     
    </AdminDashboard.Navigator>
  );
};

export default AdminDashboardScreens;
const styles = StyleSheet.create({
  faviconContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  favicon: {
    width: 35,
    height: 35,
    borderRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
    marginLeft: 8,
  },
})