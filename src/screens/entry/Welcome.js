import {
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFocusEffect } from "@react-navigation/native";
import { wait } from "../../helpers";
import { useAuth } from "../../hooks";

const Welcome = ({ navigation }) => {
  const { user, isLoading, error } = useAuth();
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [isLoadingg, setIsLoadingg] = useState(true);

  const rotate = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  };

  useEffect(() => {
    rotate();
    wait(2000).then(() => setIsLoadingg(false));
  }, []);

  const rotateAnimStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  const handleScreenTouch = () => {
    navigation.navigate("AuthScreens");
  };

  useFocusEffect(
    useCallback(() => {
      const nextScreen = setTimeout(() => {
        if (!isLoading && user?.data) {
          console.log("User data found, navigating to NavigationScreens:",user?.data);
          if(user?.data?.email == 'admin@gmail.com'){ 
            navigation.navigate("AdminDashboardScreens");
            }else{
              navigation.navigate("NavigationScreens");
            }
          // navigation.navigate("NavigationScreens");
        } else {
          console.log("No user data found, navigating to AuthScreens");
          navigation.navigate("AuthScreens");
        }
      }, 3000);

      return () => clearTimeout(nextScreen);
    }, [isLoading, user])
  );

  if (error) {
    console.error("Error loading user data:", error);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
      <StatusBar hidden={true} animated />
      <TouchableHighlight
        activeOpacity={0.85}
        style={styles.container}
        onPress={handleScreenTouch}
      >
        <ImageBackground style={styles.image} source={require('../../../assets/image/welcome.jpg')}>
          {isLoadingg && (
            <Animated.Image
              source={require('../../../assets/image/spinner.png')}
              style={[rotateAnimStyle, styles.spinner]}
            />
          )}
        </ImageBackground>
      </TouchableHighlight>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    height: 60,
    width: 60,
    position: "absolute",
    bottom: 185,
  },
});
