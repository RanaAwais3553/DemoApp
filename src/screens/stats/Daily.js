import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
  } from "react-native";
  import React, { useState, useEffect,useRef } from "react";
  import { useFocusEffect } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Steps
  } from "../../components/icons";
  import StepsCharts from '../../components/steps_components/StepsCharts'
  import WaveChart from '../../components/steps_components/WaveCharts'
  import { startStepCounting, stopStepCounting, subscribeToStepCount, unsubscribeFromStepCount } from '../../module/StepCounterModule';
import InputStorageComponent from "./StoreDailyStepsGoal";
import StoreFootSteps from '../../api/footSteps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlagIcon from 'react-native-vector-icons/FontAwesome';
import DistanceIcon from 'react-native-vector-icons/MaterialIcons';
import CircularProgress from 'react-native-circular-progress-indicator';
import GetUserSteps from '../../api/getSteps';
import { useIsFocused } from '@react-navigation/native';
import CircleWithText from './CircularSVG'
  const Daily = () => {
    const progressRef = useRef(null);
    const isFocused = useIsFocused();
  const [steps, setSteps] = useState(0);
  const [subscription, setSubscription] = useState(null);
  const [goalSteps,setGoalSteps] = useState(0)
  const [visibleModel , setVisibleModel] = useState(false)
  const [currentDay,setCurrDay] = useState('');
  const [localstorageSteps, setLocalStorageSteps] = useState(0)
  const STEP_STORAGE_KEY = '@user_steps';
  const [isShowGraph, setToShowGraph] = useState(false);
  const [isLoading,setIsLoading] = useState(true)
  const [stepsDays, setStepsDays] = useState(null);
  
  useEffect(() => {
    if(isFocused){ 
    loadStepsData();
    }
  }, [isFocused]);

  function getCurrentDate(){
    const today = new Date();
    return today.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD
  };

  const loadStepsData = async () => {
    try {
      const savedDate = await AsyncStorage.getItem('savedDate');
      if (savedDate === getCurrentDate()) {
        // setIsLoading(false)
        return;
      
      } else {
      
        handleStoreFootSteps();
        resetStepsForNewDate();
      }
      // setIsLoading(false)
    } catch (error) {
      // setIsLoading(false)
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
    // setCurrentDate(getCurrentDate());
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
    "date": getCurrentDate(),
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
    const getGoalSteps = async () => {
      setIsLoading(true);
      const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString('en-CA');
      };
      const todayDate = getTodayDate();
      const getGoalSteps = await AsyncStorage.getItem('goalSteps');
      const getDailySteps = await AsyncStorage.getItem('lastUpdatedDate');
      console.log("getGoalSteps getGoalSteps",typeof getGoalSteps)
          // Check if the stored date matches today's date
          console.log("getDailySteps !== todayDate",getDailySteps , todayDate)
          if (getDailySteps !== todayDate) {
           await handleStoreFootSteps()
            // New day - reset step count
            setLocalStorageSteps(0);
            setSteps(0);
            await AsyncStorage.setItem(STEP_STORAGE_KEY, '0');
            await AsyncStorage.setItem('lastUpdatedDate', todayDate); // Update the date in storage
          }
    
          // Retrieve goal steps if it exists
          if (getGoalSteps) {
            setGoalSteps(JSON.parse(getGoalSteps));
          } else {
            setVisibleModel(true);
          }
      setIsLoading(false)
      }
      if(isFocused){ 
      getGoalSteps()
      }
  },[visibleModel,isFocused])
  useEffect(() => {
(async() => {
  if(Number(steps) != 0){ 
    const savedSteps = await AsyncStorage.getItem(STEP_STORAGE_KEY);
        const parsedSteps = Number(savedSteps) || 0;
    const total = parsedSteps + Number(steps);
  await AsyncStorage.setItem(STEP_STORAGE_KEY, total.toString());
  console.log("steps are save:#@#@",total)
  }  
})()
  },[steps])
  
  useFocusEffect(() => {
    !isLoading && progressRef?.current && progressRef?.current.reAnimate();
  })

    useEffect(() => {
      const getUserId = async () => {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedData = JSON.parse(userData);
          return parsedData;
        }
      }
  const getUserSteps = async () => {
    const userData = await getUserId();
    if(userData?._id){ 
    const responseData = await GetUserSteps(userData?._id);
    if(responseData && responseData?.length > 0){ 
      const last7Days = [
        { day: 'Monday', steps: 0 },
        { day: 'Tuesday', steps: 0 },
        { day: 'Wednesday', steps: 0 },
        { day: 'Thursday', steps: 0 },
        { day: 'Friday', steps: 0 },
        { day: 'Saturday', steps: 0 },
        { day: 'Sunday', steps: 0 }
      ];
  
      // Iterate through the data array
      responseData.forEach(item => {
        const date = new Date(item.date); // Convert the date string to a Date object
        const dayOfWeekIndex = date.getUTCDay(); // Get the numeric index for the day (0 is Sunday, 1 is Monday, etc.)
        
        // Adjust Sunday to index 6, and map other days to the array
        const dayIndex = dayOfWeekIndex === 0 ? 6 : dayOfWeekIndex - 1;
      
        // Update the steps in the last7Days array
        last7Days[dayIndex].steps = item.steps;
      });
      
      // Print the result
    
    const result = last7Days?.some(day => day.steps > 0);
    setToShowGraph(result);
    console.log("last7Days last7Days",last7Days,result);
    setStepsDays(last7Days);
  }
    }
  
  }
  if(isFocused){ 
  getUserSteps()
  }
    },[isFocused])

const handleValueSteps = () => {
  if(!!steps || !!localstorageSteps){ 
  if((steps + localstorageSteps) > goalSteps){
return goalSteps
  }else{
    return (steps + localstorageSteps)
  }
}else{
  return 0
}
}
const IsSecondCircleVisible = () => {
  if(!!steps || !!localstorageSteps){ 
  if((steps + localstorageSteps) > goalSteps){
return true
  }else{
    return false
  }
}else{
  return false
}
}
console.log("handleValueSteps",handleValueSteps(),steps + localstorageSteps,IsSecondCircleVisible())
    return (
      <>
      {!isLoading ? 
      <SafeAreaView style={styles.container}>
        {visibleModel && <InputStorageComponent steps={steps + localstorageSteps} setVisibleModel = {setVisibleModel}/>}
  <ScrollView showsVerticalScrollIndicator={false} style={{display:'flex',flexGrow:1}} contentContainerStyle={{display:'flex',flexGrow:1}}>
    <View style={{display:'flex',alignItems:'center',marginVertical:32}}>
    {/* <CircularSvgWithShadow value = {scaleValue(steps + localstorageSteps)} steps = {steps + localstorageSteps} currentDay ={currentDay}/> */}
   {!isLoading && 
   <TouchableOpacity
   style={{
    width: 200,
    height: 200,
    borderRadius: 100,
    // For Android
    elevation: 10, // Increase elevation for a stronger shadow effect on Android
    // For iOS
    shadowColor: 'rgba(104, 66, 255, 1)', // Color of the shadow
    shadowOffset: { width: 4, height: 6 }, // Shadow offset to give depth
    shadowOpacity: 0.9, // Increase opacity for a more prominent shadow
    shadowRadius: 12, // Larger blur radius for a soft 3D effect
    backgroundColor: 'white', // Optional: add a background color if needed
  }}
   onPress={() => setVisibleModel(true)}>
   {/* {(!!goalSteps && goalSteps > 0 ) && (goalSteps > (steps + localstorageSteps)) ? */}
   {/* <View style={{display:'flex',alignSelf:'center'}}> 
    <CircularProgress
    ref={progressRef} 
  value={handleValueSteps()}
  radius={100}
  duration={2000}
  progressValueColor={'#3873d9'}
  maxValue={goalSteps} 
  title={`${currentDay}`}
  inActiveStrokeOpacity={0.3}
  activeStrokeColor="#3873d9"
  // activeStrokeSecondaryColor={"red"}
  inActiveStrokeColor="rgba(56, 115, 217, 1)"
  inActiveStrokeWidth={32}
  activeStrokeWidth={22}
  // activeStrokeWidth={}
  progressValueStyle={{
    color:'#3873d9',
    fontSize:20,
  }}
  imageProps={<Steps/>}
  titleFontSize={10}
  titleColor={'#3873d9'}
  titleStyle={{fontWeight: 'bold'}}
  subtitle={` Goal:${goalSteps}`}
  subtitleColor="#3873d9"
  subtitleFontSize={10}
  subtitleStyle={{fontWeight:'bold'}}
/> 
<View style={{position:'absolute',left:-20,right:-20,top:-20,bottom:0}}>
<CircleWithText steps={steps + localstorageSteps} goalSteps={goalSteps} currentDay ={currentDay} progressRef={progressRef}/>
</View>
 </View> */}

<View style={{ alignSelf: 'center', position: 'relative' }}> 
  {/* Outer Circular Progress */}
  <CircularProgress
    ref={progressRef} 
    value={handleValueSteps()}
    radius={100}
    duration={2000}
    progressValueColor={IsSecondCircleVisible() ? "transparent" : '#3873d9'}
    maxValue={goalSteps} 
    title={`${IsSecondCircleVisible() ? '' : currentDay}`}
    inActiveStrokeOpacity={0.3}
    activeStrokeColor={"#3873d9"}
    inActiveStrokeColor="rgba(56, 115, 217, 1)"
    inActiveStrokeWidth={32}
    activeStrokeWidth={22}
    progressValueStyle={{
      color:  '#3873d9',
      fontSize: 20,
    }}
    imageProps={IsSecondCircleVisible() ? null : <Steps/>}
    titleFontSize={10}
    titleColor={'#3873d9'}
    titleStyle={{ fontWeight: 'bold' }}
    subtitle={IsSecondCircleVisible() ? '' : ` Goal: ${goalSteps}`}
    subtitleColor="#3873d9"
    subtitleFontSize={10}
    subtitleStyle={{ fontWeight: 'bold' }}
  /> 

  {/* Inner CircleWithText, positioned absolutely on top */}
  {IsSecondCircleVisible() && <View style={{
    position: 'absolute',
    top: 0, // Align perfectly on top
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center', // Centers the content within the absolute position
    alignItems: 'center',
  }}>
    <CircleWithText
      steps={steps + localstorageSteps}
      goalSteps={goalSteps}
      currentDay={currentDay}
      progressRef={progressRef}
    />
  </View>}
</View>

  {/* : */}
{/* <CircleWithText steps={steps + localstorageSteps} goalSteps={goalSteps}/>} */}
</TouchableOpacity>
}
    </View>
    <View style={{display:'flex'}}>
  <WaveChart currentDay = {currentDay} stepsDays = {stepsDays} isShowGraph = {isShowGraph}/>
    </View>
    {!isLoading && <View style={styles.stepsCardcontainer}>
      <StepsCharts value={handleValueSteps()} maxValue={goalSteps} locationIcon = {<Icon name="fire" size={20} color={'#d13917'} /> } color={'#d13917'} distance={((steps + localstorageSteps) * 0.05).toFixed(2)} unite={"KCAL"} heading = {"CALORIES"} additionalInfo={((steps + localstorageSteps) * 0.05).toFixed(2)} />
      <StepsCharts value={handleValueSteps()} maxValue={goalSteps} locationIcon = {<DistanceIcon name="location-on" size={20} color={'#25f52c'} />} color={'#25f52c'} distance={(((steps + localstorageSteps) * 0.78)/1000).toFixed(2)} unite={"KM"} heading = {"DISTANCE"} additionalInfo={(((steps + localstorageSteps) * 0.78)/1000).toFixed(2)} />
      <StepsCharts value={handleValueSteps()} maxValue={goalSteps} locationIcon = {<DistanceIcon name="access-time" size={20} color={'#e9f02e'}/>} color={'#e9f02e'} distance={(((steps + localstorageSteps) * 0.78)/83.33).toFixed(2)} unite={"Minute"} heading = {"DURATION"} additionalInfo={(((steps + localstorageSteps) * 0.78)/83.33).toFixed(2)} />
    </View>}  
  </ScrollView>
      </SafeAreaView>
: <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
  <ActivityIndicator size={"large"} color={"blue"}/>
</View>  
}
 
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
  