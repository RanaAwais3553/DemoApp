import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {StatusBar,View,Text,AppState} from 'react-native';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { startStepCounting } from './src/module/StepCounterModule';
import AppInitializationComponent from './src/screens/AppInitializationComponent'

import Routes from "./src/routes";

const STRIPE_PUBLIC_KEY = process.env.EXPO_PUBLIC_STRIPE_PUBLIC_KEY;

export default function App() {

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
},[])

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar animated backgroundColor="#fff" style="dark" />
      <AppInitializationComponent/>
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
