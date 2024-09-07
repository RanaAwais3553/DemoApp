import React from 'react';
import { View, Text, StyleSheet,Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlagIcon from 'react-native-vector-icons/FontAwesome';
import DistanceIcon from 'react-native-vector-icons/MaterialIcons';

// const radius = 25;
const  radius  = 20
const borderWidth = 2;
const radiusMinusBorder = radius - borderWidth ;
// const radiusMinusBorder = radius - 4
const StepsCharts = ({ distance,unite, additionalInfo,heading }) => {

    function percentToDegrees(percent) {
        return `${percent * 3.6} deg`
      }

   const renderHalfCircle = () => {
       
    
        return (
          <View
            style={[
              styles.leftWrap,
              {
                width: radius,
                height: radius * 2,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.halfCircle,
                {
                  width: radius,
                  height: radius * 2,
                  borderRadius: radius,
                  backgroundColor:'#e0e0e0',
                  transform: [
                    { translateX: radius / 2 },
                    { rotate:'30deg' },
                    { translateX: -radius / 2 },
                  ],
                },
              ]}
            />
          </View>
        )
      }

   const  renderInnerCircle = (unite) => {
        // const radiusMinusBorder = radius - this.props.borderWidth
        return (
          <View
            style={[
              styles.innerCircle,
              {
                width: radiusMinusBorder * 2,
                height: radiusMinusBorder * 2,
                borderRadius: radiusMinusBorder,
                backgroundColor: '#ffffff',
                // ...this.props.containerStyle,
              },
            ]}
          >
           {unite == 'KM' ? <DistanceIcon name="location-on" size={20} color="#FF6347" /> : unite == 'KCAL' ? <Icon name="fire" size={20} color="#FF6347" /> : <DistanceIcon name="access-time" size={20} color="#FF6347" />}
          </View>
        )
      }
    

  return (
    <View style={styles.card}>
      <Text style={styles.distance}>{distance}
      <Text style = {{fontSize:8}}> {" "}{unite}
      </Text>
      </Text>
      <Text style={styles.distanceLabel}>{heading}</Text>
<View style={{marginVertical:12}}>
<View
        style={[
          styles.outerCircle,
          {
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor: 'rgba(104, 66, 255, 0.9)',
          },
        ]}
      >
        {renderHalfCircle()}
        {renderHalfCircle()}
        {renderInnerCircle(unite)}
      </View>
      </View>
      {/* <View style={styles.iconContainer}>
      
        <View style={styles.icon}>
        <Icon name="fire" size={30} color="#FF6347" />
        <View style={{position:'absolute',
        width: '100%',
     height: '50%',
     backgroundColor:'#121212',
    bottom: 0,}}/>
        </View>
      </View> */}
      <View style={{position:'absolute',bottom:10,right:5}}>
      <Text style={styles.additionalInfo}>
      <FlagIcon name="flag" size={10} color="#ff6347" />
        {" "}{additionalInfo}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    // padding: 20,
    paddingVertical:20,
    paddingHorizontal:8,
    borderRadius: 10,
    width: '30%', // Adjust this value based on spacing
    alignItems: 'center',
    elevation: 2, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  distance: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'left',
    alignSelf:'flex-start',
  },
  distanceLabel: {
    fontSize: 10,
    color: '#999',
    textAlign:'left',
    alignSelf:'flex-start',
   fontWeight:'bold',
  },
  iconContainer: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent:'center',
    alignItems:'center',
    // Placeholder for the icon
  },
  icon: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 25,
    borderWidth:4,
    borderColor:'#e0e0e0',
    alignSelf:'center',
    overflow: 'hidden',
    position:'relative'
  },
  additionalInfo: {
    color: '#ff6347',
    // backgroundColor:'#121212',
    textAlign:'right',
    fontSize:10,
    fontWeight:'bold'

  },





  outerCircle: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
  },
  innerCircle: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  leftWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  halfCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#f00',
  },
});

export default StepsCharts;
