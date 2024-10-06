import React,{useRef} from 'react';
import { View, Text, StyleSheet,Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FlagIcon from 'react-native-vector-icons/FontAwesome';
import DistanceIcon from 'react-native-vector-icons/MaterialIcons';
import CircularProgress from 'react-native-circular-progress-indicator';
// const radius = 25;
const  radius  = 20
const borderWidth = 2;
const radiusMinusBorder = radius - borderWidth ;
// const radiusMinusBorder = radius - 4
const StepsCharts = ({ distance,unite, additionalInfo,heading,color,locationIcon,maxValue,value }) => {
  const progressRef = useRef(null);

  useFocusEffect(() => {
    progressRef.current.reAnimate();
  })
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
           {unite == 'KM' ? <DistanceIcon name="location-on" size={20} color={color} /> : unite == 'KCAL' ? <Icon name="fire" size={20} color={color} /> : <DistanceIcon name="access-time" size={20} color={color} />}
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
<CircularProgress
    ref={progressRef}
    showProgressValue = {false}
    imageProps={locationIcon}

  value={value}
  radius={30}
  duration={2000}
  maxValue={maxValue}
  inActiveStrokeOpacity={0.2}
  activeStrokeColor={color}
/>
{/* <View
        style={[
          styles.outerCircle,
          {
            width: radius * 2,
            height: radius * 2,
            borderRadius: radius,
            backgroundColor: color,
          },
        ]}
      >
        {renderHalfCircle()}
        {renderHalfCircle()}
        {renderInnerCircle(unite)}
      </View> */}

      </View>
      <View style={{position:'absolute',bottom:10,right:5}}>
      <Text style={{...styles.additionalInfo,color:color}}>
      <FlagIcon name="flag" size={10} color={color} />
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
