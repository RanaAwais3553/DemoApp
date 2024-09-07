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
import MultiDateSelectionCalendar from "../../components/steps_components/MultiDateCalender";
  let dailyTargetedSteps = 810;
  const Monthly = () => {
    const [stepCount, setStepCount] = useState(0);
    const [stepType,setStepType] = useState(1);
    const [previousStepCount, setPreviousStepCount] = useState(0);
  
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
  <ScrollView showsVerticalScrollIndicator={false} style={{display:'flex',flexGrow:1}} contentContainerStyle={{display:'flex',flexGrow:1,justifyContent:'center',alignItems:'center'}}>
   
    <View style={{display:'flex',flex:1}}>
      <MultiDateSelectionCalendar/>
    </View>
      <View style={{display:'flex',flex:1}}>
    <BarChart
      data={{
        labels: ["Feb", "March", "Apr", "May", "June", "July","Aug"],
        datasets: [
          {
            data: [
              dailyTargetedSteps * 3.6,
              dailyTargetedSteps * 2,
              dailyTargetedSteps * 3,
              dailyTargetedSteps * 4.5,
              dailyTargetedSteps * 2,
              dailyTargetedSteps * 2.7,
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
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(104, 66, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(104, 66, 255, 1)`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "7",
          strokeWidth: "2",
          stroke: "rgba(104, 66, 255, 0.9)"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  </View>
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
  });
  
  export default Monthly;
  