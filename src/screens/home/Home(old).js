//admin@gmail.com admin email

import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
} from "react-native";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from "../../hooks";
import * as api from "../../api";

import { wait } from "../../helpers";

import { Button, Text } from "../../components/ui";
import moment from "moment";

import { SignupSuccess, ArrowRight } from "../../components/icons";


const Banner = ({ week, day, excercise }) => {
  const currentDate = moment().format("dddd, MMMM DD, YYYY");
  //<Text label={`Workout Week ${week+1}`} font="bold" style={{ textAlign:"center",color: "#fff" }} />
  return (
    <View style={styles.banner.imgContainer}>
      <ImageBackground
        source={{uri:'https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/Photo_Cardio_ee.png'}}
        style={styles.banner.image}
        imageStyle={styles.banner.imageStyle}
      >
        <View style={styles.banner.textContianer}>
          <View>
            <Text
              label={currentDate}
              size="xl_3"
              font="bold"
              style={{ textAlign: "center", color: "#fff" }}
            />
          </View>
        </View>
        <View>
          <Text label={week} font="bold" style={{ color: "#fff" }} />
        </View>
        <LinearGradient
          colors={[
            "rgba(75, 75, 75, 0)",
            "rgba(68, 68, 68, 0.114356) 17.19%",
            "rgba(64, 64, 64, 0.3) 27.08%",
            "rgba(58, 58, 58, 0.4) 41.67%",
            "rgba(54, 54, 54, 0.5) 52.6%",
            "rgba(47, 47, 47, 0.6) 66.15%",
            "rgba(40, 40, 40, 0.8) 80.21%",
            "rgba(32, 32, 32, 0.9) 100%",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.banner.mask}
        />
      </ImageBackground>
    </View>
  );
};

const Card = ({ user, day, exercises, image, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card.imgContainer}
      onPress={onPress}
    >
      <ImageBackground
        source={{uri:'https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/photo_legs_ii.png'}}
        style={styles.card.image}
        imageStyle={styles.card.imageStyle}
      >
        <View style={styles.card.textContianer}>
          <Text
            label={`Day ${day + 1}`}
            size="xl_5"
            font="bold"
            style={{ textAlign: "center", color: "#fff" }}
          />

          {exercises ? (
            <Text
              label={exercises.map((exercise) => exercise.name).join(" • ")}
              font="bold"
              size="sm"
              style={{ textAlign: "center", color: "#fff", paddingTop: 4 }}
            />
          ) : null}
        </View>
        <LinearGradient
          colors={[
            "rgba(75, 75, 75, 0)",
            "rgba(68, 68, 68, 0.114356) 17.19%",
            "rgba(64, 64, 64, 0.3) 27.08%",
            "rgba(58, 58, 58, 0.4) 41.67%",
            "rgba(54, 54, 54, 0.5) 52.6%",
            "rgba(47, 47, 47, 0.6) 66.15%",
            "rgba(40, 40, 40, 0.8) 80.21%",
            "rgba(32, 32, 32, 0.9) 100%",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.card.mask}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

// const Home = ({ navigation, route }) => {
//   const iOS = Platform.OS === "ios";
//   const { user } = useAuth();
//   const [workoutDays, setWorkoutDays] = useState([]);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [workoutweek, setWorkoutWeek] = useState(0);
//   const [isModalShown, setIsModalShown] = useState(false);

//   //console.log(`user level ${user.data.level}`)
//   const [showAlert, setShowAlert] = useState(true);

//   useEffect(() => {
//     user?.data?.workoutPlans?.length > 0 &&
//       Alert.alert(
//         `Please do your warm up set before starting your main workout sets.`
//       );
//     /*
//       if user level is advance: Weeks 1 and 2 their reps should be 12 reps. weeks 3 and 4 10 reps and week 5 on 8 reps
//       if beginer weeks 1 and 15 reps, weeks 3 and 4 12 reps, weeks 5 on 10 reps
//       for Kids level, it's all 20 reps
//     */
//     /*if(user.data.level === 'adv' && workoutweek <= 2) {
//       alert(`Your number of repetition goal is 12`)
//     }
//     if(user.data.level === 'adv' && workoutweek > 2 && workoutweek == 4) {
//       alert(`Your number of repetition goal is 10`)
//     }*/

//     setShowAlert(false);
//   }, []);

//   const handleToggleCompletion = () => {
//     // Show a confirmation dialog to the user
//     Alert.alert(
//       "Confirm Completion",
//       "Honesty is the best policy. Did you complete this week?",
//       [
//         {
//           text: "No",
//           style: "cancel", // User can cancel the action
//         },
//         {
//           text: "Yes",
//           onPress: () => {
//             // User tapped "Yes," so proceed with the completion
//             //const incompleteWorkoutPlans = user.data.workoutPlans.find((plan) => plan.complete === false);
//             // Create a sorted copy of workoutPlans based on the 'index' property
//             const sortedWorkoutPlans = [...user.data.workoutPlans].sort(
//               (a, b) => a.index - b.index
//             );

//             // Find the first incomplete workout
//             console.log(
//               `user ${JSON.stringify(user.data.workoutPlans[1].complete)}`
//             );
//             const incompleteWorkoutPlans = sortedWorkoutPlans.find(
//               (plan) => plan.complete === false
//             );
//             console.log(
//               `before ${JSON.stringify(incompleteWorkoutPlans.complete)}`
//             );
//             if (incompleteWorkoutPlans) {
//               const incompleteWorkoutPlanId = incompleteWorkoutPlans._id;
//               console.log(
//                 `Going to complete Workout Week ${incompleteWorkoutPlanId}`
//               );
//               incompleteWorkoutPlans.complete = true;
//               incompleteWorkoutPlans.comleted_date = new Date();
//               console.log(
//                 `after ${JSON.stringify(incompleteWorkoutPlans.complete)}`
//               );

//               // Find the index of the updated plan in the 'user.data.workoutPlans' array
//               const index = user.data.workoutPlans.findIndex((plan) => {
//                 console.log(`plan._id ${plan._id}::${incompleteWorkoutPlanId}`);
//                 return plan._id === incompleteWorkoutPlanId;
//               });
//               console.log(`index ${index}`);
//               // Update the plan in the 'user.data.workoutPlans' array
//               if (index !== -1) {
//                 console.log(
//                   `Updating From ${JSON.stringify(
//                     user.data.workoutPlans[index]._id
//                   )}::${JSON.stringify(user.data.workoutPlans[index].complete)}`
//                 );
//                 user.data.workoutPlans[index] = incompleteWorkoutPlans;
//                 setWorkoutWeek(index++);
//                 console.log(
//                   `Updating To ${workoutweek}::${JSON.stringify(
//                     user.data.workoutPlans[index]._id
//                   )}::${JSON.stringify(user.data.workoutPlans[index].complete)}`
//                 );
//                 //users/update
//                 api.UserUpdate(user.data._id, index).then((response, index) => {
//                   console.log(`udpatededUser ${JSON.stringify(response._id)}`);
//                   setWorkoutWeek(index++);
//                   GetWeeklyPlan.mutateAsync(user?.data?.email);
//                 });
//               } else {
//                 console.log("Plan not found in user data.");
//               }
//             }
//           },
//         },
//       ],
//       { cancelable: false } // Prevent dismissal by tapping outside the dialog
//     );
//   };

//   const CompleteWorkoutWeek = useMutation({
//     mutationFn: api.CompleteWorkoutWeek,
//     onSuccess: async (data) => {
//       console.log(`complete workout week ${data}`);
//       //need to refresh screen
//     },
//   });

//   const GetWeeklyPlan = useMutation({
//     mutationFn: api.GetWeeklyPlan,
//     onSuccess: async (data) => {
//       console.log({ data });
//       setWorkoutDays(data?.days);
//     },
//   });

//   const handleOnboarding = () => {
//     navigation.navigate("OnboardingScreens", {
//       screen: "GenderScreen",
//       params: { _id: user?.data?._id },
//     });
//     wait(500).then(() => setIsModalShown(false));
//   };

//   useFocusEffect(
//     useCallback(() => {
//       if (user?.data?.email && user?.data?.workoutPlans?.length > 0) {
//         GetWeeklyPlan.mutateAsync(user?.data?.email);
//       }

//       if (!user?.data?.workoutPlans?.length > 0) {
//         setIsModalShown(true);
//       }
//     }, [])
//   );

//   useEffect(() => {
//     user?.data?.workoutPlans?.length > 0 &&
//       Alert.alert(
//         `Please do your warm up set before starting your main workout sets.`
//       );
//   }, []);

//   //console.log({ workout_plan: workoutDays });
//   const handleWorkoutCard = (exercises, day) => {
//     //console.log("clicked");
//     navigation.navigate("AppScreens", {
//       screen: "WorkoutScreen",
//       params: { exercises, day },
//     });
//   };

//   console.log({ user: user.data.workoutPlans });

//   return (
//     <SafeAreaView
//       style={{
//         flexGrow: 1,
//         backgroundColor: "#ffffff",
//         marginBottom: iOS ? -90 : 0,
//       }}
//     >
//       <View>
//         <ScrollView
//           contentContainerStyle={[
//             styles.container,
//             { paddingBottom: iOS ? 90 : 24 },
//           ]}
//           keyboardShouldPersistTaps="handled"
//           decelerationRate="normal"
//           showsVerticalScrollIndicator={false}
//         >
//           <View style={{ flex: 1, gap: 12 }}>
//             <Text
//               label={`Welcome, ${user?.data?.name}`}
//               size="xl_3"
//               font="bold"
//             />
//             <View style={{ flex: 1, gap: 24 }}>
//               <Banner week={workoutweek} day={1} exercise={"Push Exercise"} />
//               <View style={{ flex: 1, gap: 14 }}>
//                 <Text label="Daily Workout" size="lg" font="bold" />
//                 {workoutDays.map((day, index) => (
//                   <Card
//                     key={index}
//                     user={user}
//                     day={index}
//                     image={ExcerciseImage_1}
//                     exercises={day.exercises}
//                     onPress={() => handleWorkoutCard(day.exercises, index + 1)}
//                   />
//                 ))}
//               </View>
//             </View>
//           </View>
//         </ScrollView>

//         <Modal animationType="fade" visible={isModalShown} transparent={true}>
//           <View style={styles.modal_container}>
//             <View style={styles.modal}>
//               <View
//                 style={{
//                   flex: 1,
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   width: "100%",
//                 }}
//               >
//                 <View
//                   style={{
//                     flex: 1,
//                     alignItems: "center",
//                     paddingVertical: 24,
//                     gap: 24,
//                   }}
//                 >
//                   <SignupSuccess size={34} color="#ffffff" />
//                   <Text
//                     label="Congratulations"
//                     size="xl_4"
//                     font="bold"
//                     style={{ color: "#6842FF" }}
//                   />
//                   <Text
//                     label="Your account was registered, please proceed to onboarding to generate your workout plan!"
//                     font="medium"
//                     style={{
//                       textAlign: "center",
//                     }}
//                   />
//                 </View>

//                 <Button
//                   onPress={handleOnboarding}
//                   style={{ marginTop: 10, width: "100%" }}
//                 >
//                   <Text
//                     label="Onboarding"
//                     size="xl"
//                     font="bold"
//                     style={{
//                       color: "#ffffff",
//                       textTransform: "uppercase",
//                       paddingRight: 6,
//                     }}
//                   />
//                   <ArrowRight color="#fff" size={28} />
//                 </Button>
//               </View>
//             </View>
//           </View>
//         </Modal>
//       </View>
//     </SafeAreaView>
//   );
// };

const HomePage = ({ navigation, route }) => {
  const iOS = Platform.OS === "ios";
  const { user } = useAuth();
  const [workoutDays, setWorkoutDays] = useState([]);
  const [workoutweek, setWorkoutWeek] = useState(0);
  const [isModalShown, setIsModalShown] = useState(false);

  const GetWeeklyPlan = useMutation({
    mutationFn: api.GetWeeklyPlan,
    onSuccess: async (data) => {
      console.log({ data });
      setWorkoutDays(data?.days);
    },
  });

  const handleOnboarding = () => {
    navigation.navigate("OnboardingScreens", {
      screen: "GenderScreen",
      params: { _id: user?.data?._id },
    });
    wait(500).then(() => setIsModalShown(false));
  };

  useFocusEffect(
    useCallback(() => {
      if (user?.data?.email && user?.data?.workoutPlans?.length > 0) {
        GetWeeklyPlan.mutateAsync(user?.data?.email);
      }

      if (!user?.data?.workoutPlans?.length > 0) {
        setIsModalShown(true);
      }
    }, [])
  );

  //console.log({ workout_plan: workoutDays });
  const handleWorkoutCard = (exercises, day) => {
    //console.log("clicked");
    navigation.navigate("AppScreens", {
      screen: "WorkoutScreen",
      params: { exercises, day },
    });
  };

  console.log({ user: user.data.workoutPlans });

  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        backgroundColor: "#ffffff",
        marginBottom: iOS ? -90 : 0,
      }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: iOS ? 90 : 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        decelerationRate="normal"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, gap: 12 }}>
          <Text
            label={`Welcome, ${user?.data?.name}`}
            size="xl_3"
            font="bold"
          />
          <View style={{ flex: 1, gap: 24 }}>
            <Banner week={workoutweek} day={1} exercise={"Push Exercise"} />
            <View style={{ flex: 1, gap: 14 }}>
              <Text label="Daily Workout" size="lg" font="bold" />
              {workoutDays.map((day, index) => (
                <Card
                  key={index}
                  user={user}
                  day={index}
                  image={null}
                  exercises={day.exercises}
                  onPress={() => handleWorkoutCard(day.exercises, index + 1)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal animationType="fade" visible={isModalShown} transparent={true}>
        <View style={styles.modal_container}>
          <View style={styles.modal}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 24,
                  gap: 24,
                }}
              >
                <SignupSuccess size={34} color="#ffffff" />
                <Text
                  label="Congratulations"
                  size="xl_4"
                  font="bold"
                  style={{ color: "#6842FF" }}
                />
                <Text
                  label="Your account was registered, please proceed to onboarding to generate your workout plan!"
                  font="medium"
                  style={{
                    textAlign: "center",
                  }}
                />
              </View>

              <Button
                onPress={handleOnboarding}
                style={{ marginTop: 10, width: "100%" }}
              >
                <Text
                  label="Onboarding"
                  size="xl"
                  font="bold"
                  style={{
                    color: "#ffffff",
                    textTransform: "uppercase",
                    paddingRight: 6,
                  }}
                />
                <ArrowRight color="#fff" size={28} />
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};


export default HomePage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 6,
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
  card: {
    imgContainer: {
      height: 140,
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
      padding: 24,
      paddingBottom: 16,
      zIndex: 25,
      gap: 4,
    },
    mask: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      height: 140,
      borderRadius: 24,
    },
  },
  vector: {
    height: "75%",
    width: "75%",
    alignSelf: "center",
    padding: 12,
  },
  modal: {
    position: "absolute",
    zIndex: 25,
    flex: 1,
    top: "20%",
    bottom: "20%",
    left: 4,
    right: 4,
    height: 480,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    position: "relative",
  },
});
