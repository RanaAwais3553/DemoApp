import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { Button, Text } from "../../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks";
import * as api from "../../api";


const Banner = () => {
  return (
    <View style={styles.banner.imgContainer}>
      <ImageBackground
        source={require('../../../assets/image/logo-black.png')}
        style={styles.banner.image}
        imageStyle={styles.banner.imageStyle}
      />
      </View>
  )
}

const Workouts = ({ navigation, route }) => {

  const { user } = useAuth();
  const [workoutweek, setWorkoutWeek] = useState(0)

const handleToggleCompletion = () => {
    // Show a confirmation dialog to the user
    console.log(`workouts.js ${user.data._id}`)
    Alert.alert(
      'Confirm Completion',
      'Honesty is the best policy. Did you complete this week?',
      [
        {
          text: 'No',
          style: 'cancel', // User can cancel the action
        },
        {
          text: 'Yes',
          onPress: () => {
            console.log(`1`)
            // User tapped "Yes," so proceed with the completion
            //const incompleteWorkoutPlans = user.data.workoutPlans.find((plan) => plan.complete === false);
            // Create a sorted copy of workoutPlans based on the 'index' property
            const sortedWorkoutPlans = [...user.data.workoutPlans].sort((a, b) => a.index - b.index);
            
            // Find the first incomplete workout 
            console.log(`user ${JSON.stringify(user.data.workoutPlans[1].complete)}`)
            const incompleteWorkoutPlans = sortedWorkoutPlans.find((plan) => plan.complete === false);
            console.log(`before ${JSON.stringify(incompleteWorkoutPlans.complete)}`)
            if (incompleteWorkoutPlans) {
              const incompleteWorkoutPlanId = incompleteWorkoutPlans._id;
              console.log(`Going to complete Workout Week ${incompleteWorkoutPlanId}`)
              incompleteWorkoutPlans.complete = true;
              incompleteWorkoutPlans.comleted_date = new Date()
              console.log(`after ${JSON.stringify(incompleteWorkoutPlans.complete)}`)
            
              // Find the index of the updated plan in the 'user.data.workoutPlans' array
              const index = user.data.workoutPlans.findIndex((plan) => { 
                console.log(`plan._id ${plan._id}::${incompleteWorkoutPlanId}`)
                return plan._id === incompleteWorkoutPlanId
              });
              console.log(`index ${index}`)
              // Update the plan in the 'user.data.workoutPlans' array
              if (index !== -1) {
                console.log(`Updating From ${JSON.stringify(user.data.workoutPlans[index]._id)}::${JSON.stringify(user.data.workoutPlans[index].complete)}`)
                user.data.workoutPlans[index] = incompleteWorkoutPlans;
                console.log(`Updating To ${JSON.stringify(user.data.workoutPlans[index]._id)}::${JSON.stringify(user.data.workoutPlans[index].complete)}`)
                //users/update
                api.CompleteWorkoutWeek(user.data._id,user.data.workoutPlans[index]._id,index)
                .then((response,index) => {
                  console.log(`udpatededUser ${JSON.stringify(response._id)}`)
                  setWorkoutWeek(++index)
                  //GetWeeklyPlan.mutateAsync(user?.data?.email);
                }).catch((error) => {
                  alert(`Unable to complete your workout week.  Please contact support`)
                })
              } else {
                console.log('Plan not found in user data.');
              }
            }
          },
        },
      ],
      { cancelable: false } // Prevent dismissal by tapping outside the dialog
    );
  };

  const handleResetWeeklyWorkouts = () => {
    Alert.alert(
      'Confirm Completion',
      'Honesty is the best policy. Did you complete this week?',
      [
        {
          text: 'No',
          style: 'cancel', // User can cancel the action
        },
        {
          text: 'Yes',
          onPress: () => {
            console.log(`resetting`)
            api.ResetWorkoutWeek(user.data._id)
            .then((response) => {
              // Success
              alert("Current workout weeks resetted");
            })
            .catch((error) => {
              // Error
              alert("Unable to reset workout weeks: " + error.message);
            });
          },
        },
      ],
      { cancelable: false } // Prevent dismissal by tapping outside the dialog
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Button
        title={`Complete Current Week - This button marks the current week as complete`}
        onPress={handleToggleCompletion}
        style={styles.buttonStyle}
      >
        <Image source={require('../../../assets/favicon.png')} style={styles.iconStyle} />
        <Text
          label="Tap to Complete The Week"
          size="sm"
          font="bold"
          style={styles.buttonTextStyle}
        />
      </Button>

      <Button
        title={`Reset Weekly Workouts - This resets all current eight weeks of workout from the beginning.`}
        onPress={handleResetWeeklyWorkouts}
        style={styles.buttonStyle} // You might have a different function for resetting workouts
      >
        <Image source={require('../../../assets/favicon.png')} style={styles.iconStyle} />
        <Text
          label="Tap to Reset Weekly Workouts"
          size="sm"
          font="bold"
          style={styles.buttonTextStyle}
        />
      </Button>


    </SafeAreaView>
  );
};

export default Workouts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    width: 30, // Set your desired width
    height: 30, // Set your desired height
    marginRight: 8,
  },
  buttonTextStyle: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 4,
  },
  buttonStyle: {
    marginVertical: 10, // Adjust this value to control the vertical spacing between buttons
  },
  banner: {
    imgContainer: {
      height: 300,
      borderRadius: 24,
    },
    image: {
      flex: 1,
      resizeMode: "cover",
    },
    imageStyle: {
      borderRadius: 24,
    },
    textContianer: {
      position: "relative",
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      padding: 24,
      zIndex: 25,
      gap: 16,
    },
    mask: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      height: 164,
      borderRadius: 24,
    },
  },
});

