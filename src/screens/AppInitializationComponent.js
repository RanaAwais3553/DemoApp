import React,{useEffect,useState} from 'react';
import { View,AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { startStepCounting, stopStepCounting, subscribeToStepCount, unsubscribeFromStepCount } from '../module/StepCounterModule';
const AppInitializationComponent = () => {
    const [appState, setAppState] = useState(AppState.currentState);
    // const isFocused = useIsFocused()
    const [steps, setSteps] = useState(10);
    const [subscription, setSubscription] = useState(null);
    const STEP_STORAGE_KEY = '@user_steps';
    
      // useEffect(() => {
      //   // Load saved steps when the app starts
      //   const sub = subscribeToStepCount((event) => {
      //       setSteps(event?.steps);
      //     });
      //     setSubscription(sub);
      //     console.log("in app initial state")
      //     let stpacc = steps;
      //   const handleAppStateChange = async (nextAppState) => {
      //     const storedSteps =  await AsyncStorage.getItem(STEP_STORAGE_KEY);
      //     const totalSteps = Number(storedSteps) + Number(stpacc);
      //     stpacc = 0;
      //     setSteps(0)
      //     console.log("app state in app initial component:@@!@!#@",totalSteps,storedSteps,steps)
      //    await AsyncStorage.setItem(STEP_STORAGE_KEY, totalSteps.toString());
      //     }
      
      // const subscribe =  AppState.addEventListener('change', handleAppStateChange);
      
      //   return () => { 
      //       subscribe.remove()
      //       unsubscribeFromStepCount(subscription);
      //   }
      // }, []);
  return (
    <View/>
  );
};

export default AppInitializationComponent;
