import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {
    Steps
  } from "../../components/icons";
  import StepsCharts from '../../components/steps_components/StepsCharts'
  import WaveChart from '../../components/steps_components/WaveCharts'
  import { startStepCounting, stopStepCounting, subscribeToStepCount, unsubscribeFromStepCount } from '../../module/StepCounterModule';
import InputStorageComponent from "./StoreDailyStepsGoal";
import StoreFootSteps from '../../api/footSteps'
 
  
  const Daily = () => {
  const [steps, setSteps] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [goalSteps,setGoalSteps] = useState(null)
  const [visibleModel , setVisibleModel] = useState(false)
  const [currentDay,setCurrDay] = useState('');
  const [localstorageSteps, setLocalStorageSteps] = useState(0)
  const STEP_STORAGE_KEY = '@user_steps';
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  
  useEffect(() => {
    loadStepsData();
  }, []);

  function getCurrentDate(){
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  const loadStepsData = async () => {
    try {
      const savedDate = await AsyncStorage.getItem('savedDate');
      if (savedDate === getCurrentDate()) {
        return;
      
      } else {
      
        handleStoreFootSteps();
        resetStepsForNewDate();
      }
    } catch (error) {
      console.error("Error loading steps data:", error);
    }
  };
const getUserId = async () => {
  const userData = await AsyncStorage.getItem("user");
  if (userData) {
    const parsedData = JSON.parse(userData);
    return parsedData;
  }
}

  const resetStepsForNewDate = async () => {
    let stps = 0;
    // setSteps(0);
    setCurrentDate(getCurrentDate());
    await AsyncStorage.setItem('savedDate', getCurrentDate());
    // await AsyncStorage.setItem(STEP_STORAGE_KEY, stps?.toString());
  };
  const handleStoreFootSteps = async () => {
try {
  const userData = await getUserId()
  const savedDate = await AsyncStorage.getItem('savedDate');
 const saveSteps = await AsyncStorage.getItem(STEP_STORAGE_KEY);
 const stepss = saveSteps + steps;
 const data = {
    "userId": userData?._id,
    "date": savedDate,
    "steps": stepss
 }
  const response = await StoreFootSteps(data);
  console.log("data before send to backend",data,response);
} catch (error) {
  
}
  }
  useEffect(() => {
    let subscription;
  
    const fetchLocalSteps = async () => {
      try {
        const savedSteps = await AsyncStorage.getItem(STEP_STORAGE_KEY);
        const parsedSteps = Number(savedSteps) || 0; // Ensure the value is a number
        setLocalStorageSteps(parsedSteps); // Store the parsed number into state
        console.log("steps from localstorage")
      } catch (error) {
        console.error('Error fetching steps from storage:', error);
      }
    };
  
    fetchLocalSteps(); // Fetch local steps at component mount
    const sub = subscribeToStepCount((event) => {
      if (event?.steps != null) {
        console.log("Steps from native iOS:", event?.steps);
        setSteps(event?.steps)
        }
    });
    
    setSubscription(sub); // Set the subscription reference
  
    return () => {
      unsubscribeFromStepCount(subscription); // Clean up subscription on unmount
    };
  }, []); // Ensure the hook runs only when the screen is focused
  
   useEffect(() => {
    ( async () => {
      const getDayName = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date();
        setCurrDay(days[today.getDay()])
        return days[today.getDay()];
      };
      const getGoalSteps = await AsyncStorage.getItem(getDayName());
      console.log("getGoalSteps getGoalSteps",getGoalSteps)
      if(!!getGoalSteps){
        setGoalSteps(getGoalSteps);
      }else{
        setVisibleModel(true);
        setLocalStorageSteps(0);
        setSteps(0);
        await AsyncStorage.setItem(STEP_STORAGE_KEY, '0');
      }
      })()
  },[visibleModel])
  useEffect(() => {
(async() => {
  if(Number(steps) != 0){ 
    const total = Number(localstorageSteps) + Number(steps);
  await AsyncStorage.setItem(STEP_STORAGE_KEY, total.toString());
  }  
})()
  },[steps])
    const startCounter = () => {
      startStepCounting();
    }; 
  
    const stopCounter = () => {
      stopStepCounting();
    };
    return (
      <>
      <SafeAreaView style={styles.container}>
        {visibleModel && <InputStorageComponent setVisibleModel = {setVisibleModel}/>}
  <ScrollView showsVerticalScrollIndicator={false} style={{display:'flex',flexGrow:1}} contentContainerStyle={{display:'flex',flexGrow:1}}>
    <View style={{display:'flex',marginVertical:32,alignItems:'center'}}>
      <TouchableOpacity onPress={() => setVisibleModel(true)} style={{height:180,width:180,borderRadius:100,borderWidth:14,borderColor:'rgba(104, 66, 255, 0.9)',justifyContent:'center',alignItems:'center',marginTop:8}}>
  <Steps color="rgba(104, 66, 255, 0.9)"/>
  <Text style={{textAlign:'center',fontWeight:'bold',fontSize:26,letterSpacing:2.5}}>{steps + localstorageSteps}</Text>
  <View style={{display:'flex',marginTop:8}}>
  <Text style={{textAlign:'center',fontWeight:'bold',fontSize:12,color:'#555'}}>{currentDay}</Text>
  <Text style={{textAlign:'center',fontWeight:'bold',fontSize:12,color:'#555'}}>GOAL: {goalSteps ? goalSteps : 0}</Text>
  </View>
      </TouchableOpacity>
     
  
    </View>
    <View style={{display:'flex'}}>
    <WaveChart currentDay = {currentDay}/>
    </View>
    <View style={styles.stepsCardcontainer}>
      <StepsCharts distance={((steps + localstorageSteps) * 0.05).toFixed(2)} unite={"KCAL"} heading = {"CALORIES"} additionalInfo={((steps + localstorageSteps) * 0.05).toFixed(2)} />
      <StepsCharts distance={(((steps + localstorageSteps) * 0.78)/1000).toFixed(2)} unite={"KM"} heading = {"DISTANCE"} additionalInfo={(((steps + localstorageSteps) * 0.78)/1000).toFixed(2)} />
      <StepsCharts distance={(((steps + localstorageSteps) * 0.78)/83.33).toFixed(2)} unite={"Minute"} heading = {"DURATION"} additionalInfo={(((steps + localstorageSteps) * 0.78)/83.33).toFixed(2)} />
    </View>  
  </ScrollView>
      </SafeAreaView>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    stepsCardcontainer :
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      paddingVertical:10,
    },
  });
  
  export default Daily;
  