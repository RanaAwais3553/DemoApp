import { StyleSheet, View, Alert } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from "react";

import { Button, Text } from "../../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks";
import * as api from "../../api";
import { LineChart } from 'react-native-chart-kit';


const InsightsChart = ({ workoutData }) => {
  const [tappedData, setTappedData] = useState(null);


  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    decimalPlaces: 0, // Number of decimal places for Y-axis labels
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Specify your desired color here,
    propsForDots: {
      r: '6', // Radius of the dots on the chart
    },
    yAxisLabel: '', // Set the label for the Y-axis
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue color
  };

  const handleDataPointClick = (data) => {
    /*console.log(`chart data ${data}`)
    setTappedData(data);
    Alert.alert(
      'Tapped Data Point',
      `Value: ${data.value}`,
    );*/
    Alert('data point')
  };
  return (
    <View>
      <LineChart
        data={{
          labels: ['Weeks', 'Duration', 'Rate'],
          datasets: [
            {
              data: [
                workoutData.completedWeeks,
                workoutData.durationInDays,
                workoutData.completionRate,
              ],
            },
          ],
        }}
        width={300}
        height={160}
        yAxisSuffix=""
        chartConfig={chartConfig}
        style={{ marginVertical: 8 }}
        onDataPointClick={handleDataPointClick}
      />
    </View>
  );
};

const Stats = ({ navigation, route }) => {
  const { user } = useAuth();
  const [workoutData, setWorkoutData] = useState({
    completedWeeks: 0,
    durationInDays: 0,
    completionRate: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      console.log(`stat ${user.data._id}::${JSON.stringify(user.data.registeredDate)}`)
      // Run your code here when the component is focused
      api.WorkoutHistory(user.data._id)
        .then(response => {
          console.log(`workout history ${JSON.stringify(response)}`);
          const data = {
            completedWeeks: response.completedWeeks,
            durationInDays: response.durationInDays,
            completionRate: response.completionRate,
          };
      
          setWorkoutData(data);
        })
        .catch((error) => {
          alert(`Error fetching workout history data ${error}`);
        });
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
    <Text label={`Weekly Completion Rate`} style={styles.headerStyle} /> 
    <Text label={`Completed Weeks: ${workoutData.completedWeeks}`} style={styles.blueText} />
    <Text label={`Number of Duration ${workoutData.durationInDays}`} style={styles.blueText} />
    {workoutData.completionRate !== null ? (
        <Text label={`Completion Rate: ${workoutData.completionRate.toFixed(2)}%`} style={styles.blueText} />
    ) : (
        <Text label={`Completion Rate: Data not available`} style={styles.blueText} />
    )}
    <View>
      <InsightsChart workoutData={workoutData}  />
    </View> 
    </SafeAreaView>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    pointerEvents: 'none'
  },
  headerStyle: {
    fontSize: 20, // Adjust the font size as needed
    fontWeight: 'bold', // Use 'bold' for bold text
  },
  blueText: {
    color: 'blue', // Set the color to blue
  },
});
