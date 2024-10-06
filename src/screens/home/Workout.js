import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Text } from "../../components/ui";
import { Play } from "../../components/icons";



const Header = ({ title, subtitle }) => {
  console.log("header begginner and advance is:#@#@",title,subtitle)
  return (
    <View style={styles.header.imgContainer}>
      <ImageBackground source={require('../../../assets/image/dive.jpg')} style={styles.header.image}>
        <View style={styles.header.textContianer}>
          <View style={{ gap: 4 }}>
            <Text
              label={title}
              size="xl_4"
              font="bold"
              style={{ textAlign: "center", color: "#fff" }}
            />
            <Text
              label={subtitle}
              size="xl_2"
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
          style={styles.header.mask}
        />
      </ImageBackground>
    </View>
  );
};

const Card = ({ title, category, equipment, img, onPress, sets, distanceTime, weeklyReps ,overdue  }) => {
  

  /*const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };*/
  const capitalizeFirstLetter = (string) => {
    if (typeof string === 'string' && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    } else {
      // Handle cases where the input is not a valid string
      return string;
    }
  };

  // Function to check if a string contains only numbers
  function isNumeric(str) {
    return /^\d+$/.test(str);
  }

  let exerciseTimePeriod;
  
  if (distanceTime) {
    // Check if the distanceTime contains both numbers and non-numeric characters
    if (/\d/.test(distanceTime) && !isNumeric(distanceTime)) {
        exerciseTimePeriod = `Perform exercise for ${distanceTime} seconds 4 sets`;
    } else if (isNumeric(distanceTime)) {
        exerciseTimePeriod = `Perform exercise for ${distanceTime} seconds 4 sets`;
    } 
  } else {
        exerciseTimePeriod = weeklyReps;
  }


  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card.imgContainer}
      onPress={onPress}
      disabled={overdue}
    >
      <ImageBackground
        source={img}
        style={styles.card.image}
        imageStyle={styles.card.imageStyle}
      >
        <View style={styles.card.textContianer}>
          <View style={styles.card.play_btn}>
            <Play color="#e0e0e0" size={60} />
          </View>
          <View style={{ paddingHorizontal: 12, gap: 6 }}>
            <Text
              label={`${capitalizeFirstLetter(category)}`}
              font="medium"
              style={{ color: "#fff" }}
            />
            <Text
              label={title}
              font="semibold"
              size="xl"
              style={{ color: "#fff", width: "100%", lineHeight: 20 }}
            />
            {equipment !== "none" && (
              <Text label={equipment} font="medium" style={{ color: "#fff" }} />
            )}
            <View>
              <Text
                label={`${exerciseTimePeriod} ${sets} sets`}
                font="medium"
                style={{ color: "#fff", lineHeight: 20 }}
              />
              {/* {!distanceTime &&(
              <Text
                label={`${sets} sets`}
                font="medium"
                style={{ color: "#fff", lineHeight: 20, marginLeft: 10 }}
              />
              )} */}
            </View>
          </View>
        </View>
        <LinearGradient
          colors={[
            "rgba(75, 75, 75, 0)",
            "rgba(68, 68, 68, 0.114356) 17.19%",
            "rgba(64, 64, 64, 0.4) 27.08%",
            "rgba(58, 58, 58, 0.5) 41.67%",
            "rgba(54, 54, 54, 0.6) 52.6%",
            "rgba(47, 47, 47, 0.7) 66.15%",
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

const Level = {
  bg: "Beginner",
  adv: "Advanced",
  Kids: "Kids",
};

const Workout = ({ navigation, route }) => {
  const [exerciseImages, setExerciseImages] = useState([]);
  const exercises = route.params?.exercises;
  const day = route.params?.day;
  const weeklyReps = route.params?.weeklyReps;
  console.log({ exercises, day, weeklyReps });
  const levelCounts = {};
console.log("exercise list and total number for each day:#@#@#",exercises)
  useEffect(() => {
    // Import all images from the exercise directory dynamically
    const importAll = (r) => r.keys().map(r);
    const images = importAll(require.context('../../../assets/image/excercise', false, /\.(png|jpg)$/));
    // const imagesArray = [
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/001.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/002.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/003.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/004.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/005.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/006.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/007.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3854.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3856.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3858.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3862.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3866.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3867.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3871.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/IMG_3874.jpg",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/janis_photo_legs.png",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/luis_push_dd.png",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/luis_push.png",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/Photo_Cardio_ee.png",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_core_a.PNG",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_legs_ii.png",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_pull_b.PNG",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_push_b.PNG",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/Photo_Push_bb.png",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_push_f.PNG",
    //   "https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/excercise/photo_push_g.png"
    // ]
    // Shuffle the images randomly
    const shuffledImages = shuffleArray(images);
    // Set the shuffled images in state
    setExerciseImages(shuffledImages);
  }, []);

  //shuffle images for random display
  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  exercises?.forEach((level) => {
    if (!levelCounts[level.level]) {
      levelCounts[level.level] = 0;
    }

    levelCounts[level.level]++;
  });

  const exercisesLevel = Object.keys(levelCounts).reduce((prev, curr) => {
    return levelCounts[curr] > levelCounts[prev] ? curr : prev;
  });

  console.log({ exercisesLevel, lv: Level[exercisesLevel] });

  const handleWorkoutCard = (link,exercise) => {
    console.log("exercise object to see videw url",exercise);
    navigation.navigate("AppScreens", {
      screen: "WorkoutVideoScreen",
      params: {
        link,
      },
    });
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff" }}
      edges={["right", "left", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        decelerationRate="normal"
      >
        <Header
          title={`Day ${day} Workouts`}
          subtitle={Level[exercisesLevel]}
        />
        <View style={{ flex: 1, gap: 14, padding: 24, paddingTop: 18 }}>
          <Text label="Workout Activity" size="xl" font="bold" />
          {exercises?.map((exercise, index) => (
            <Card
              key={index}
              title={exercise.name}
              category={exercise.category}
              equipment={exercise.equipment}
              img={exerciseImages[index % exerciseImages.length]}
              sets={exercise.sets}
              distanceTime={exercise.distanceTime}
              weeklyReps={weeklyReps}
              onPress={() => handleWorkoutCard(exercise.videoUrl,exercise)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 0,
  },
  header: {
    imgContainer: {
      height: 250,
    },
    image: {
      flex: 1,
      resizeMode: "cover",
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
    },
  },
  card: {
    play_btn: {
      position: "absolute",
      top: "35%",
      left: "45%",
      opacity: 0.5,
    },
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
    },
    textContianer: {
      position: "relative",
      flex: 1,
      justifyContent: "flex-end",
      padding: 12,
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
});
