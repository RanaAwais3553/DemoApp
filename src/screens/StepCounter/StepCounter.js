import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect } from "react";
// import { Pedometer } from 'expo-sensors';
// import {
//   isStepCountingSupported,
//   parseStepData,
//   startStepCounterUpdate,
//   stopStepCounterUpdate,
// } from 'react-native-step-counter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
// import Favicon from "../../assets/icon.png";
import {
  Workout,
  HomeFilled,
  HomeOutline,
  SettingsFilled,
  SettingsOutline,
  ChartFilled,
  ChartOutline,
  Steps
} from "../../components/icons";
import StepsCharts from '../../components/steps_components/StepsCharts'
// import { startStepCounting, stopStepCounting, subscribeToStepCount, unsubscribeFromStepCount } from '../../module/StepCounterModule';
let dailyTargetedSteps = 810;
const StepCounter = () => {
  const [stepCount, setStepCount] = useState(0);
  const [stepType,setStepType] = useState(1);
  const [previousStepCount, setPreviousStepCount] = useState(0);

  const [steps, setSteps] = useState(0);
  const [subscription, setSubscription] = useState(null);


//   useEffect(() => {
//     startStepCounting();
//     const sub = subscribeToStepCount((event) => {
//       setSteps(event.steps);
//     });

//     setSubscription(sub);

//     return () => {
//       unsubscribeFromStepCount(subscription);
//     };
//   }, []);
// console.log("steps from native iOS",steps)
//   const startCounter = () => {
//     startStepCounting();
//   };

//   const stopCounter = () => {
//     stopStepCounting();
//   };
//   const [supported, setSupported] = useState(false);
// const [granted, setGranted] = useState(false);
// const [steps, setSteps] = useState(0);

// async function askPermission() {
//   isStepCountingSupported().then((result) => {
//     console.debug('🚀 - isStepCountingSupported', result);
//     setGranted(result.granted === true);
//     setSupported(result.supported === true);
//   });
// }

// async function startStepCounter() {
//   startStepCounterUpdate(new Date(), (data) => {
//     console.debug(parseStepData(data));
//     setSteps(data.steps);
//   });
// }
  // useEffect(() => {
  //   const getStoredSteps = async () => {
  //     try {
  //       const savedSteps = await AsyncStorage.getItem('stepCount');
  //       const savedDate = await AsyncStorage.getItem('stepDate');
  //       const currentDate = getCurrentDateString();
  //       console.log(currentDate);
  //       console.log(savedDate);
  //       if (savedDate !== currentDate) {
  //         // It's a new day, reset the step count
  //         setStepCount(0);
  //         storeSteps(0, currentDate);
  //       } else if (savedSteps !== null) {
  //         setStepCount(parseInt(savedSteps, 10));
  //       }
  //     } catch (error) {
  //       console.error("Failed to load steps from storage", error);
  //     }
  //   };

  //   getStoredSteps();

  //   let lastKnownStepCount = 0;

  //   const subscribe = Pedometer.watchStepCount(result => {
  //     if (lastKnownStepCount === 0) {
  //       lastKnownStepCount = result.steps;
  //     } else {
  //       const stepsSinceLastCheck = result.steps - lastKnownStepCount;
  //       if (stepsSinceLastCheck > 0) {
  //         setStepCount(prevStepCount => {
  //           const newStepCount = prevStepCount + stepsSinceLastCheck;
  //           storeSteps(newStepCount, getCurrentDateString());
  //           return newStepCount;
  //         });
  //       }
  //       lastKnownStepCount = result.steps;
  //     }
  //   });

  //   return () => {
  //     subscribe.remove();
  //   };
  // }, []);

  const getCurrentDateString = () => {
    const currentDate = new Date();
    // Manually format the date as YYYY-MM-DD based on local time
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const storeSteps = async (steps, date) => {
    try {
      await AsyncStorage.setItem('stepCount', steps.toString());
      await AsyncStorage.setItem('stepDate', date);
    } catch (error) {
      console.error("Failed to save steps to storage", error);
    }
  };

  return (
    <>
    <SafeAreaView style={styles.container}>
<ScrollView style={{display:'flex',flexGrow:1}} contentContainerStyle={{display:'flex',flexGrow:1}}>
<View style={{display:'flex',marginVertical:32,alignItems:'center'}}>
  <View style={{backgroundColor:'#f2f2f2',flexDirection:'row',paddingVertical:15}}>
    <TouchableOpacity onPress={() => setStepType(1)} style={{marginLeft:15,marginRight:12,borderBottomWidth: stepType == 1 ? 3 : 0,borderColor:'#f78520'}}>
<Text style={{color:stepType == 1 ? '#555' : '#919090',fontWeight:'bold',fontSize:18,marginBottom:5}}>Daily</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setStepType(7)} style={{marginRight:12,borderBottomWidth: stepType == 7 ? 3 : 0,borderColor:'#f78520'}}>
<Text style={{color:stepType == 7 ? '#555' : '#919090',fontWeight:'bold',fontSize:18,marginBottom:5}}>Weekly</Text>
</TouchableOpacity>
<TouchableOpacity onPress={() => setStepType(30)} style={{marginRight:15,borderBottomWidth: stepType == 30 ? 3 : 0,borderColor:'#f78520'}}>
<Text style={{color:stepType == 30 ? '#555' : '#919090',fontWeight:'bold',fontSize:18,marginBottom:5}}>Monthly</Text>
</TouchableOpacity>
  </View>
  </View>
  <View style={{display:'flex',marginVertical:32,alignItems:'center'}}>
    <View style={{height:180,width:180,borderRadius:100,borderWidth:14,borderColor:'#f78520',justifyContent:'center',alignItems:'center',marginTop:8}}>
<Steps/>
<Text style={{textAlign:'center',fontWeight:'bold',fontSize:26,letterSpacing:2.5}}>{stepCount}</Text>
<View style={{display:'flex',marginTop:8}}>
<Text style={{textAlign:'center',fontWeight:'bold',fontSize:12,color:'#555'}}>Today</Text>
<Text style={{textAlign:'center',fontWeight:'bold',fontSize:12,color:'#555'}}>GOAL: {dailyTargetedSteps * stepType}</Text>
</View>
    </View>
   

  </View>
  
  <View style={styles.stepsCardcontainer}>
      <Card distance="6.89" additionalInfo="1.2 KM" />
      <Card distance="5.23" additionalInfo="0.8 KM" />
      <Card distance="7.45" additionalInfo="1.5 KM" />
    </View>

    {/* <View> */}
  {/* <Text>Bezier Line Chart</Text> */}
  {/* <LineChart
    data={{
      labels: ["M", "Tue", "Wed", "Thur", "Fri", "Sat","Sun"],
      datasets: [
        {
          data: [
            dailyTargetedSteps * 1,
            dailyTargetedSteps * 2,
            dailyTargetedSteps * 3,
            dailyTargetedSteps * 1,
            dailyTargetedSteps * 2,
            dailyTargetedSteps * 1,
            dailyTargetedSteps * 4,
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={320}
    yAxisLabel=""
    yAxisSuffix=""
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "7",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  /> */}
{/* </View> */}
</ScrollView>
    </SafeAreaView>
    {/* // <SafeAreaView style={styles.container}>
    //   <Text size="xl_3" font="bold">
    //     <Text style={{ fontWeight: 700, fontSize: 36 }}>{stepCount}</Text>
    //     <Text style={{ fontWeight: 700, color: '#A8A8A8' }}> Steps</Text>
    //   </Text>
    // </SafeAreaView> */}
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
      padding: 10,
    },
  
});

export default StepCounter;
