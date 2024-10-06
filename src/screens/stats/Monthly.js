import {
    StyleSheet,
    View,
    SafeAreaView,
    Dimensions,
    ScrollView,
    Text
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {
    BarChart,
  } from "react-native-chart-kit";
import MultiDateSelectionCalendar from "../../components/steps_components/MultiDateCalender";
import GetUserSteps from '../../api/getSteps'
import { useIsFocused } from '@react-navigation/native';
  let dailyTargetedSteps = 810;
  const Monthly = () => {
    const [stepsDate, setStepsDate] = useState(null);
    const isFocused = useIsFocused();
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
  const dateNumbers = responseData?.reduce((acc, item) => {
    const dateKey = item.date.split('T')[0]; // Get the date part (YYYY-MM-DD)
    acc[dateKey] = item.steps; // Assign steps to the date key
    return acc;
  }, {});
  console.log("user steps in monthly calander",responseData,dateNumbers)
  setStepsDate(dateNumbers);
}
  }

}
if(isFocused){
  getUserSteps()
}
  },[isFocused])
  
    return (
      <>
      <SafeAreaView style={styles.container}>
 {!!stepsDate ? <ScrollView showsVerticalScrollIndicator={false} style={{display:'flex',flexGrow:1}} contentContainerStyle={{display:'flex',flexGrow:1,justifyContent:'center',alignItems:'center'}}>
   
    <View style={{display:'flex',flex:1}}>
      <MultiDateSelectionCalendar stepsDate = {stepsDate}/>
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
  </ScrollView> :
  <View style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:16}}>
  <Text style={{color:'#121212',fontSize:16}}>It appears to be a new account with no records yet. If this is older than one day, please close and reopen the app.</Text>
  </View>
  }
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
  });
  
  export default Monthly;
  