import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Alert,
  Modal,
  Image,
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
import { SignupSuccess } from "../../components/icons";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ArrowRight, CloudCog } from "lucide-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Banner = ({ week, day, excercise }) => {
  const currentDate = moment().format("dddd, MMMM DD, YYYY");
  const [currentWeek, setCurrentWeek] = useState();
  // console.log(`Banner week ${currentWeek}`);

  useEffect(() => {
    setCurrentWeek(week);
  }, [week]);

  //<Text label={`Workout Week ${week+1}`} font="bold" style={{ textAlign:"center",color: "#fff" }} />
  return (
    <View style={styles.banner.imgContainer}>
      <ImageBackground
        source={{uri:'https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/beach_header_image.png'}}
        style={styles.banner.image}
        imageStyle={styles.banner.imageStyle}
      >
        <View style={styles.banner.textContianer}>
          <View>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Workout Week {currentWeek}
            </Text>
          </View>
          <View>
            <Text
              label={currentDate}
              size="xl_3"
              font="bold"
              style={{ textAlign: "center", color: "#fff" }}
            />
          </View>
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
    <>
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card.imgContainer}
      onPress={onPress}
    >
      {/* <View style={{position:'absolute',height:220,width:220,zIndex:999, backgroundColor:'red',left:0,right:0,bottom:0,top:0}}>

<Image source={require('./../../../assets/doneMark.jpeg')} style={{height:40,width:40,resizeMode:'contain'}}/>
      </View> */}
      <ImageBackground
        source={{uri:image}}
        style={styles.card.image}
        imageStyle={day + 1 == 1 ?  styles.card.imageStyle : styles.card.imageStyleNotCompleted}
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
    <View>
    {OverlayText(day)}
    </View>
    </>
  );
};
const OverlayText = (day) => {

  // const [setToggleState,toggleState] = useState({day1:false,day2:true,day3:false})
  const [dayArray , setDaysArray] = useState([])
  console.log("days are:#@#@#",dayArray.includes(day+1))
  return (
    <TouchableOpacity onPress={() => {  
      if(dayArray?.includes(day + 1)){ 
        let newArr = dayArray.filter(item => item !== (day + 1));
      setDaysArray(newArr)
      }else{
        setDaysArray([...dayArray,(day+1)])
      }
      
      }} style={dayArray?.includes(day+1) ? styles.overlay.overlayContainer : styles.overlay.overlayContainerNotSelected}>
      <Text
              label={`Day ${day + 1} ${dayArray?.includes(day+1) ? 'Completed' : 'Pending'}`}
              font="bold"
              size="sm"
              style={{ textAlign: "center",marginRight:12, color: dayArray?.includes(day+1) ? "#fff" : "rgba(104, 66, 255, 0.9)", }}
            />
           {dayArray?.includes(day+1) &&  <Icon name="check-circle" size={18} color="#fff" />}
    </TouchableOpacity>
  );

}
const Home = ({ navigation, route }) => {
  const iOS = Platform.OS === "ios";
  const { user, setUser } = useAuth();
  // console.log("User Data Home Page:", user);
  const [userInfo, setUserInfo] = useState(user.data);
  const [workoutDays, setWorkoutDays] = useState([]);
  const [workoutweek, setWorkoutWeek] = useState(0);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isOverdue, setOverdue] = useState(false);
  const [exerciseImages, setExerciseImages] = useState([]);
  const [weeklyReps, setWeeklyReps] = useState();
const [setToggleState,toggleState] = useState({day1:false,day2:true,day3:false})

  useEffect(() => {
    // Import all images from the exercise directory dynamically
    const imagesArray = [
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/001.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/002.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/003.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/004.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/005.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/006.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/007.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3854.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3856.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3858.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3862.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3866.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3867.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3871.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3874.jpg",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/janis_photo_legs.png",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/luis_push_dd.png",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/luis_push.png",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/Photo_Cardio_ee.png",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_core_a.PNG",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_legs_ii.png",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_pull_b.PNG",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_push_b.PNG",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/Photo_Push_bb.png",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_push_f.PNG",
      "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_push_g.png"
    ]
    // const importAll = (r) => r.keys().map(r);
    // const images = importAll(
    //   require.context("../../components/image/excercise", false, /\.(png|jpg)$/)
    // );

    // Shuffle the images randomly
    const shuffledImages = shuffleArray(imagesArray);
    // Set the shuffled images in state
    setExerciseImages(shuffledImages);
    
  }, []);
  //shuffle images for random display
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  console.log({ paymentActive: user?.data?.paymentActive });
  

  const GetWeeklyPlan = useMutation({
    mutationFn: api.GetWeeklyPlan,
    onSuccess: async (data) => {
      console.log({ data });
      setWorkoutDays(data?.days);
    },
  });

  const GetUser = useMutation(
    {
      mutationFn: api.GetUser,
      onMutate: (variables) => console.log({ variables }),
      onSuccess: async (data) => {
        console.log({ data });
        if (data?.email && data?.workoutPlans?.length > 0) {
          console.log("fetching plan");
          GetWeeklyPlan.mutateAsync(data?.email);
        }
        setUserInfo(data);
        setUser(data);
      },
    },
    []
  );

  const CheckSubscription = useMutation({
    mutationFn: api.CheckSubscription,
    onSuccess: async (data) => {
      console.log({ subs: data });
    },
  });

  const GetUserCurrentWeek = useMutation(
    {
      mutationFn: api.GetUserCurrentWeek,
      onMutate: (variables) => console.log({ variables }),
      onSuccess: async (data) => {
        // console.log(`current week ${JSON.stringify(data.weekNumber)}`);
        if (data && data.weekNumber !== undefined) {
          setWorkoutWeek(data.weekNumber); // This sets the week number to your state
        } else {
          console.log("Week number not found in response");
          // Handle the case where weekNumber is not in the response
        }
      },
    },
    []
  );

  const handleOnboarding = () => {
    navigation.navigate("OnboardingScreens", {
      screen: "GenderScreen",
      params: { _id: userInfo?._id },
    });
    wait(500).then(() => setIsModalShown(false));
  };

  useFocusEffect(
    useCallback(() => {
      GetUserCurrentWeek.mutateAsync(userInfo?._id);
    }, [workoutweek])
  );

  useFocusEffect(
    useCallback(() => {
      GetUser.mutateAsync(userInfo?._id);
      //console.log({ user: userInfo?.workoutPlans?.length });
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      CheckSubscription.mutateAsync({ _id: userInfo?._id });
    }, [])
  );

  //console.log({ workout_plan: workoutDays });
  const handleWorkoutCard = (exercises, day, weeklyReps ,overdue) => {
    const isPaymentActive = userInfo?.paymentActive || false;
    // console.log(`isPaymentActive ${isPaymentActive}`);

    if (!isPaymentActive) {
      // Show an alert if overdue is true
      Alert.alert(
        "Account Subscription is not Active",
        "Your account is still not subscribe yet. Please go to the Settings tab and pay your subscription or click Ok",
        [
          {
            text: "Skip",
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: "Ok",
            onPress: () => navigation.navigate("SettingsScreen"),
          },
        ],
        { cancelable: false }
      );
    } else {
      // Navigate to the WorkoutScreen if not overdue
      navigation.navigate("AppScreens", {
        screen: "WorkoutScreen",
        params: { exercises, day, weeklyReps },
      });
    }
  };

  useEffect(() => {
    const checkUserLevel = async () => {
    if (userInfo?.workoutPlans?.length > 0) {
      let reminderMessage = "";

      if (userInfo.level === "bg") {
        // For beginners
        if (workoutweek <= 1 && workoutweek <= 2) {
          reminderMessage = "15 reps";
          setWeeklyReps("15 reps");
        } else if (workoutweek >= 3 && workoutweek <= 4) {
          reminderMessage =
            "12 reps (with an increase in weight from previous weeks)";
            setWeeklyReps("12 reps (with an increase in weight from previous weeks)");
        } else if (workoutweek >= 5) {
          reminderMessage =
            "10 reps (with an increase in weight from previous weeks)";
            setWeeklyReps("10 reps (with an increase in weight from previous weeks)");
        }
      } else if (userInfo.level === "adv") {
        // For advanced users
        if (workoutweek <= 1 && workoutweek <= 2) {
          reminderMessage = "12 reps";
          setWeeklyReps("12 reps");
        } else if (workoutweek >= 3 && workoutweek <= 4) {
          reminderMessage = "10 reps";
          setWeeklyReps("10 reps");
        } else if (workoutweek >= 5) {
          reminderMessage = "8 reps";
          setWeeklyReps("8 reps");
        }
      } else if (userInfo.level === "Kids") {
        // For kids users
        if (workoutweek <= 1 && workoutweek <= 2) {
          reminderMessage = "20 reps";
          setWeeklyReps("20 reps");
        } else if (workoutweek >= 3 && workoutweek <= 4) {
          reminderMessage = "20 reps";
          setWeeklyReps("20 reps");
        } else if (workoutweek >= 5) {
          reminderMessage = "20 reps";
          setWeeklyReps("20 reps");
        }
      }

      const today = new Date().toDateString();
      // console.log(today);
      const lastShownDate = await AsyncStorage.getItem('lastShownDate');

      if (lastShownDate !== today && reminderMessage) {
        Alert.alert(
          "Workout Reminder",
          "Please do your warm up set before starting your main workout sets."
        );
        await AsyncStorage.setItem('lastShownDate', today);
      }
    } else if (!userInfo?.workoutPlans?.length > 0) {
      console.log(`Home workoutPlans none everything completed`);
      setIsModalShown(true);
    }
  };

  checkUserLevel();
  }, [userInfo, workoutweek]); // Add workoutweek as a dependency

  //console.log({ user: userInfo?.workoutPlans[0].complete });

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
              {workoutDays.length === 0 ? (
                <View style={styles.emptyMessageContainer}>
                  <Text style={styles.emptyMessageText}>
                    All workouts completed! Go to the workouts tab to reset your
                    workout plan.
                  </Text>
                  {/* Optionally, you can add a button or a link to navigate the user directly to the reset function */}
                </View>
              ) : (
                workoutDays.map((day, index) => (
                  <Card
                    key={`${index}-${day.exercises}`}
                    user={user}
                    day={index}
                    image={exerciseImages[index % exerciseImages.length]}
                    exercises={day.exercises}
                    onPress={() => handleWorkoutCard(day.exercises, index + 1, weeklyReps )}
                    disabled={true}
                  />
                ))
              )}
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
                  label="Welcome!"
                  size="xl_4"
                  font="bold"
                  style={{ color: "#6842FF" }}
                />
                <Text
                  label="Please complete or continue your onboarding to generate your workout plan!"
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
                <ArrowRight color="white" size={28} />
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

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
      backgroundColor:'#0000000'
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
      height: 180,
      borderRadius: 24,
      
    },
    image: {
      flex: 1,
      resizeMode: "cover",
    },
    imageStyle: {
      borderRadius: 24,
      // borderWidth:4,
      // borderColor:'green'
    },
    imageStyleNotCompleted:{
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
      height: 180,
      borderRadius: 24,
    },
  },
  overlay:{
    overlayContainer: {
      flex:1,
      height: 20,
      borderRadius: 24,
      backgroundColor: 'rgba(104, 66, 255, 0.9)', // Green background with 50% opacity
      // padding: 20,
      // borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
      // margin: 10,
    },
    overlayContainerNotSelected:{
      flex:1,
      height: 20,
      borderRadius: 24,
      borderWidth:1,
      borderColor:'rgba(104, 66, 255, 0.9)',
      backgroundColor: '#ffffff', // Green background with 50% opacity
      // padding: 20,
      // borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      // margin: 10,
    },
    overlayContainerText: {
      textAlign:'center',
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
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
