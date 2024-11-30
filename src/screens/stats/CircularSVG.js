import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, Text as SvgText,G } from 'react-native-svg';
import {
    Steps
  } from "../../components/icons";
  import CircularProgress from 'react-native-circular-progress-indicator';
  const CircleWithText = ({steps,goalSteps,currentDay,progressRef}) => {
    const radius = 110; // Radius of the circle
    const center = 110; // Center of the circle
  
    return (
      <View style={styles.container}>
        {/* <View style={styles.circleContainer}>
          <Svg height="250" width="250">
      
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="rgba(56, 115, 217, 1)"
              strokeWidth="20" // inActiveStrokeWidth
              fill="none"
            />
  
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#3873d9"
              strokeWidth="12" // activeStrokeWidth
              fill="none"
            />
          </Svg>
  
         
          <View style={styles.textContainer}>
            <Steps/>
            <Text style={styles.text}>{steps}</Text>
            <Text style={{color:'#3873d9'}}>Goal steps was:</Text>
            <Text style={{color:'#3873d9'}}>{goalSteps}</Text>
          </View>
        </View> */}

<CircularProgress
    ref={progressRef} 
  value={steps}
  radius={120}
  duration={2000}
  progressValueColor={'#3873d9'}
  maxValue={200000} 
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
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    circleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      // Shadow for iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      // Shadow for Android
      elevation: 24,
    },
    textContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#3873d9',
    },
  });
  
  export default CircleWithText;
