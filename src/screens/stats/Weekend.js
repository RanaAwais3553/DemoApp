import {
  SafeAreaView,
  ScrollView,
    StyleSheet,
    Text,
    View,
  } from "react-native";
  import React, { useState, useEffect } from "react";
  // import { Pedometer } from 'expo-sensors';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Icon from 'react-native-vector-icons/FontAwesome5'
  import StarIcon from 'react-native-vector-icons/MaterialIcons';

  const Weekend = () => {
    const [stepCount, setStepCount] = useState(0);
    const data = [
        {
          name: "Seoul",
          population: 21500000,
          color: "rgba(131, 167, 234, 1)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Toronto",
          population: 2800000,
          color: "#F00",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Beijing",
          population: 527612,
          color: "red",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "New York",
          population: 8538000,
          color: "#ffffff",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        },
        {
          name: "Moscow",
          population: 11920000,
          color: "rgb(0, 0, 255)",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        }
      ];


    // useEffect(() => {
    //   const getStoredSteps = async () => {
    //     try {
    //       const savedSteps = await AsyncStorage.getItem('stepCount');
    //       const savedDate = await AsyncStorage.getItem('stepDate');
    //       const currentDate = getCurrentDateString();
    //       console.log(currentDate);
    //       console.log(savedDate);
    //       if (savedDate !== currentDate) {
    //         // It's a new day, reset the step count
    //         setStepCount(0);
    //         storeSteps(0, currentDate);
    //       } else if (savedSteps !== null) {
    //         setStepCount(parseInt(savedSteps, 10));
    //       }
    //     } catch (error) {
    //       console.error("Failed to load steps from storage", error);
    //     }
    //   };
  
    //   getStoredSteps();
  
    //   let lastKnownStepCount = 0;
  
    //   const subscribe = Pedometer.watchStepCount(result => {
    //     if (lastKnownStepCount === 0) {
    //       lastKnownStepCount = result.steps;
    //     } else {
    //       const stepsSinceLastCheck = result.steps - lastKnownStepCount;
    //       if (stepsSinceLastCheck > 0) {
    //         setStepCount(prevStepCount => {
    //           const newStepCount = prevStepCount + stepsSinceLastCheck;
    //           storeSteps(newStepCount, getCurrentDateString());
    //           return newStepCount;
    //         });
    //       }
    //       lastKnownStepCount = result.steps;
    //     }
    //   });
  
    //   return () => {
    //     subscribe.remove();
    //   };
    // }, []);
  
    const getCurrentDateString = () => {
      const currentDate = new Date();
      // Manually format the date as YYYY-MM-DD based on local time
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    const storeSteps = async (steps, date) => {
      try {
        await AsyncStorage.setItem('stepCount', steps.toString());
        await AsyncStorage.setItem('stepDate', date);
      } catch (error) {
        console.error("Failed to save steps to storage", error);
      }
    };
  const barData = [
    {
        id:'1',
        height:120,
    },
    {
        id:'2',
        height:180,
    },
    {
        id:'3',
        height:150,
    },
    {
        id:'4',
        height:80,
    },
    {
        id:'5',
        height:200,
    },
    {
        id:'6',
        height:170,
    },
    {
        id:'7',
        height:140,
    },

  ]
    return (
     <SafeAreaView  style={styles.container}>
<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{display:'flex',flexGrow:1}}>
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:22,backgroundColor:'#fff',marginTop:22}}>
<Text style={{color:'rgba(104, 66, 255, 0.9)',fontWeight:'bold'}}>M</Text>
<Text style={{color:'rgba(104, 66, 255, 0.9)',fontWeight:'bold'}}>T</Text>
<Text style={{color:'rgba(104, 66, 255, 0.9)',fontWeight:'bold'}}>W</Text>
<Text style={{color:'rgba(104, 66, 255, 0.9)',fontWeight:'bold'}}>T</Text>
<Text style={{color:'rgba(104, 66, 255, 0.9)',fontWeight:'bold'}}>F</Text>
<Text style={{color:'rgba(104, 66, 255, 0.9)',fontWeight:'bold'}}>S</Text>
<Text style={{color:'rgba(104, 66, 255, 0.9)',fontWeight:'bold'}}>S</Text>

</View>
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between', paddingHorizontal:14,marginTop:18}}>
{barData.map((data) =>  <View key={data.id} style={{height:220,width:30,backgroundColor:'rgba(104, 66, 255,0.4)',borderRadius:22,}}>
    <View style={{position:'absolute',backgroundColor:'#6842FF',bottom:0,height:data.height,width:30,borderRadius:22}}>
    <View style={{display:'flex',alignItems:'center',left:0,right:0, position:'absolute',top:-22}}>
<Text style={{textAlign:'center'}}>{data.height}</Text>   
    </View>
    <View style={{display:'flex',alignItems:'center'}}>
    <Icon name="walking" size={16} color="red" />
    </View>
    </View>
    
</View>)}

</View>
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginHorizontal:30,marginTop:40}}>
<View style={{display:'flex',alignItems:'center'}}>
<View style={{height:20,width:20,borderRadius:10,borderWidth:1,borderColor:'red',justifyContent:'center',alignItems:'center'}}>
<StarIcon name="star" size={10} color="red" />
</View>
<View>
  <Text>470 Kcal</Text>
</View>
</View>


<View style={{display:'flex',alignItems:'center'}}>
<View style={{height:20,width:20,borderRadius:10,borderWidth:1,borderColor:'red',justifyContent:'center',alignItems:'center'}}>
<StarIcon name="star" size={10} color="red" />
</View>
<View>
  <Text>5.3 mi</Text>
</View>
</View>



<View style={{display:'flex',alignItems:'center'}}>
<View style={{height:20,width:20,borderRadius:10,borderWidth:1,borderColor:'red',justifyContent:'center',alignItems:'center'}}>
<StarIcon name="star" size={10} color="red" />
</View>
<View>
  <Text>1:35 h</Text>
</View>
</View>
</View>



<View style={{display:'flex',flexDirection:'row',paddingHorizontal:15,justifyContent:'space-between',marginTop:40}}>
  <View style={{height:200,width:1.5,backgroundColor:'#e0e0e0',borderRadius:125}}>
    <View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>1</Text>
    </View>
    </View>
  <View  style={{height:200,width:3.5,backgroundColor:'#e0e0e0',borderRadius:125}}>
<View style={{height:195,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>

  </View>
  <View  style={{height:200,width:3.5,backgroundColor:'#e0e0e0',borderRadius:125}}>
  <View style={{height:195,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>
<View  style={{height:200,width:3.5,backgroundColor:'#e0e0e0',borderRadius:125}}>
<View style={{height:195,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>
<View style={{height:200,width:1.5,backgroundColor:'#e0e0e0',borderRadius:125}}>
<View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>3</Text>
    </View>
  </View>

{/* // */}

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:170,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:160,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:150,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View style={{height:200,width:1.5,backgroundColor:'#e0e0e0',borderRadius:125}}>
<View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>6</Text>
    </View>
  </View>


{/* // */}

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:140,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:130,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:120,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View style={{height:200,width:1.5,backgroundColor:'#e0e0e0',borderRadius:125}}>
<View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>12</Text>
    </View>
  </View>

{/* // */}

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:110,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:100,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:90,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View style={{height:200,width:1.5,backgroundColor:'#e0e0e0',borderRadius:125}}>
<View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>9</Text>
    </View>
  </View>


{/* // */}


<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:80,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:70,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:60,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View style={{height:200,width:1.5,backgroundColor:'#e0e0e0'}}>
<View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>6</Text>
    </View>
  </View>

{/* // */}


<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:110,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:100,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:90,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View style={{height:200,width:1.5,backgroundColor:'#e0e0e0'}}>
<View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>3</Text>
    </View>
  </View>

{/* // */}

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:100,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>


<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:110,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:120,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View style={{height:200,width:1.5,backgroundColor:'#e0e0e0'}}>
<View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>0</Text>
    </View>
  </View>

{/* // */}


<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:120,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:140,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:150,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View style={{height:200,width:1.5,backgroundColor:'#e0e0e0'}}>
<View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>9</Text>
    </View>
  </View>

{/* // */}

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:180,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:170,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View  style={{height:200,width:3.5,backgroundColor:'rgba(104, 66, 255,0.9)',borderRadius:125}}>
<View style={{height:190,width:3.5,backgroundColor:'#fff',position:'absolute',borderRadius:125}}/>
</View>

<View style={{height:200,width:1.5,backgroundColor:'#e0e0e0'}}>
<View style={{position:'absolute',top:-20,width:20,left:0,right:0}}>
    <Text style={{fontSize:14,color:'#121212',textAlign:'left'}}>12</Text>
    </View>
  </View>

{/* // */}



</View>
</ScrollView>
     </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
        display:'flex',
      flex: 1,
    //   justifyContent: "flex-end",
    //   alignItems: 'center',
      backgroundColor: '#ffffff',
    },
  });
  
  export default Weekend;
  