import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useFocusEffect } from '@react-navigation/native';

const AnimatedBar = ({ index, data }) => {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  // Function to scale steps to height
  function scaleValue(value) {
    if(data?.steps > 0){ 
    return (value * 209) / data?.steps; // Adjust this scaling function based on your data
    }else{
     return 15
    }
  }

  // Handle focus and unfocus
  useFocusEffect(
    React.useCallback(() => {
      // On focus, animate to the actual value
      Animated.timing(animatedHeight, {
        toValue: scaleValue(data?.steps),
        duration: 1000,
        useNativeDriver: false,
      }).start();

      // On unfocus, reset the animation to 0
      return () => {
        Animated.timing(animatedHeight, {
          toValue: 0, // Reset the height to 0
          duration: 1000, // Reset duration
          useNativeDriver: false,
        }).start();
      };
    }, [data?.steps]) // Re-run effect when data?.steps changes
  );

  return (
    <View
      key={index}
      style={{
        height: 220,
        width: 30,
        backgroundColor: 'rgba(104, 66, 255, 0.4)',
        borderRadius: 22,
        // For Android
        elevation: 10, // Increase elevation for a stronger shadow effect on Android
        // For iOS
        shadowColor: 'rgba(104, 66, 255, 0.5)', // Color of the shadow
        shadowOffset: { width: 4, height: 6 }, // Shadow offset to give depth
        shadowOpacity: 0.9, // Increase opacity for a more prominent shadow
        shadowRadius: 12, // Larger blur radius for a soft 3D effect
        // backgroundColor: 'white', // Optional: add a background color if needed
    
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          backgroundColor: '#6842FF',
          bottom: 0,
          height: animatedHeight, // Animated height
          width: 24,
          alignSelf:'center',
          borderRadius: 22,
        }}
      >
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            left: 0,
            right: 0,
            position: 'absolute',
            top: -22,
          }}
        >
          <Text style={{ textAlign: 'center',fontSize:9 }}>{data?.steps}</Text>
        </View>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <Icon name="walking" size={16} color="red" />
        </View>
      </Animated.View>
    </View>
  );
};

export default AnimatedBar;
