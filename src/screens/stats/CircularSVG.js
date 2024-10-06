import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop, Text as SvgText,G } from 'react-native-svg';
import {
    Steps
  } from "../../components/icons";
const CircularSvgWithShadow = ({value,steps,currentDay}) => {
    console.log("values are ",value?.toFixed(2))
  return (
    <View style={styles.shadowContainer}>
      <Svg height="180" width="180" viewBox="0 0 100 100">
        {/* Background circle */}
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="#f2f2f2"    // Light blue border color
          strokeWidth="10"
          fill="white"        // Background color inside the circle
        />
        {/* Half filled part of the circle */}
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#grad)"  // Gradient or single fill color
          strokeWidth="10"
          strokeDasharray={`${value?.toFixed(2)}`}  // Half of circumference = 2 * π * r / 2
          strokeDashoffset="0" // Adjust to show half-circle
          fill="none"
        />
        
        {/* Gradient definition if you want to use it */}
        <Defs>
          <LinearGradient id="grad" x1="100%" y1="100%" x2="100%" y2="100%">
            <Stop offset="100%" stopColor="rgba(104, 66, 255, 0.9)" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="rgba(104, 66, 255, 0.9)" stopOpacity="0.5" />
          </LinearGradient>
        </Defs>
        
        <G transform="translate(42, 25) scale(0.3)">
        <Steps color="rgba(104, 66, 255, 0.9)" size={42}/>
        </G>
{/* Centered Text */}
<SvgText
          x="50" // Center horizontally (SVG uses percentages of the viewBox)
          y="50" // Center vertically
          textAnchor="middle"  // Align text to center
          fontSize="12"         // Adjust size as needed
          fill="black"         // Text color
          fontWeight="bold"
        >
          {steps} {/* The number inside the circle */}
        </SvgText>
       
        {/* Subtext below the number */}
        <SvgText
          x="50"
          y="63"
          textAnchor="middle"
          fontSize="7"
          fill="black"
        >
          {currentDay}
        </SvgText>

        <SvgText
          x="50"
          y="73"
          textAnchor="middle"
          fontSize="7"
          fill="black"
        >
          GOAL: 6666
        </SvgText>

      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 180,
    borderRadius: 110,
    shadowColor: 'rgba(104, 66, 255, 0.9)', // Shadow color
    shadowOffset: { width: 0, height: 0 },  // No offset for equal shadow around
    shadowOpacity: 1,                       // Full opacity for glow effect
    shadowRadius: 20,                       // Blur radius for glowing effect
    backgroundColor: '#fff',
  },
});

export default CircularSvgWithShadow;
