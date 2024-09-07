import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {StatusBar,View,Text} from 'react-native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { startStepCounting } from './src/module/StepCounterModule';
// import {
//   useFonts,
//   Montserrat_100Thin,
//   Montserrat_200ExtraLight,
//   Montserrat_300Light,
//   Montserrat_400Regular,
//   Montserrat_500Medium,
//   Montserrat_600SemiBold,
//   Montserrat_700Bold,
//   Montserrat_800ExtraBold,
//   Montserrat_900Black,
// } from "@expo-google-fonts/montserrat";

import Routes from "./src/routes";
import { SettingsScreen } from "./src/screens/settings";

const STRIPE_PUBLIC_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY;

export default function App() {
  const [appReady, setAppReady] = useState(true);
  // const [fontsLoaded, fontError] = useFonts({
  //   Montserrat_100Thin,
  //   Montserrat_200ExtraLight,
  //   Montserrat_300Light,
  //   Montserrat_400Regular,
  //   Montserrat_500Medium,
  //   Montserrat_600SemiBold,
  //   Montserrat_700Bold,
  //   Montserrat_800ExtraBold,
  //   Montserrat_900Black,
  // });

  // Set staleTime to 1 day (24 hours)
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 24 * 2, // 2 days
        cacheTime: Infinity, // Keep data in cache indefinitely
      },
    },
  });
useEffect(() => {
  startStepCounting();
  // setAppReady(true)
},[])
  // useEffect(() => {
  //   async function prepare() {
  //     try {
  //       await new Promise((resolve) => setTimeout(resolve, 2500));

  //       if (!fontsLoaded && !fontError) {
  //         console.log("fonts not loaded");
  //         setAppReady(false);
  //       } else {
  //         console.log("fonts loaded");
  //         setAppReady(true);
  //       }
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       setAppReady(true);
  //     }
  //   }

  //   prepare();
  // }, [fontsLoaded]);

  // console.log({ STRIPE_PUBLIC_KEY });

  // if (!appReady) {
  //   return null;
  // }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar animated backgroundColor="#fff" style="dark" />
      {/* <View style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'#fff',fontSize:24,fontWeight:'bold'}}>App</Text>
      </View> */}
      <QueryClientProvider client={queryClient}>
        <StripeProvider
          publishableKey={STRIPE_PUBLIC_KEY}
          merchantIdentifier="merchant.com.virlanchainworks.fitspace"
        >
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </StripeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
