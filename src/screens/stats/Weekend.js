import {
  SafeAreaView,
  ScrollView,
    StyleSheet,
    Text,
    View,
    Animated
  } from "react-native";
  import React, { useState, useEffect } from "react";
  // import { Pedometer } from 'expo-sensors';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Icon from 'react-native-vector-icons/FontAwesome5'
  import StarIcon from 'react-native-vector-icons/MaterialIcons';
  import GetUserSteps from '../../api/getSteps'
  import AnimatedBar from './AnimatedBar'
  import { useIsFocused } from '@react-navigation/native';
  const Weekend = () => {
    const isFocused = useIsFocused();
  const [stepsDays, setStepsDays] = useState(null);
  useEffect(() => {
    const getUserId = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData;
      }
    }
const getUserSteps = async () => {
  const userData = await getUserId();
  if(userData?._id){ 
  const responseData = await GetUserSteps(userData?._id);
  console.log("user steps in monthly calander",responseData)
  if(responseData && responseData?.length > 0){ 
    const last7Days = [
      { day: 'Monday', steps: 0 },
      { day: 'Tuesday', steps: 0 },
      { day: 'Wednesday', steps: 0 },
      { day: 'Thursday', steps: 0 },
      { day: 'Friday', steps: 0 },
      { day: 'Saturday', steps: 0 },
      { day: 'Sunday', steps: 0 }
    ];

    // Iterate through the data array
    responseData.forEach(item => {
      const date = new Date(item.date); // Convert the date string to a Date object
      const dayOfWeekIndex = date.getUTCDay(); // Get the numeric index for the day (0 is Sunday, 1 is Monday, etc.)
      
      // Adjust Sunday to index 6, and map other days to the array
      const dayIndex = dayOfWeekIndex === 0 ? 6 : dayOfWeekIndex - 1;
    
      // Update the steps in the last7Days array
      last7Days[dayIndex].steps = item.steps;
    });
    
    // Print the result
  console.log("last7Days last7Days",last7Days);
  setStepsDays(last7Days);
}
  }
}
if(isFocused){
  getUserSteps()
}

  },[isFocused])
 
  function scaleValue(value) {
    return (4500 * 209) / 9000;
  }
  console.log("value if steps is 9000",scaleValue(300))

    return (
     <SafeAreaView  style={styles.container}>
{stepsDays && stepsDays?.length > 0 ? <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{display:'flex',flexGrow:1}}>
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
{stepsDays?.map((data,index) => <AnimatedBar key={index} data={data}/> )}
{/* <View key={index} style={{height:220,width:30,backgroundColor:'rgba(104, 66, 255,0.4)',borderRadius:22,}}>
    <View style={{position:'absolute',backgroundColor:'#6842FF',bottom:0,height:scaleValue(data?.steps),width:30,borderRadius:22}}>
    <View style={{display:'flex',alignItems:'center',left:0,right:0, position:'absolute',top:-22}}>
<Text style={{textAlign:'center'}}>{data?.steps}</Text>   
    </View>
    <View style={{display:'flex',alignItems:'center'}}>
    <Icon name="walking" size={16} color="red" />
    </View>
    </View>
    
</View> */}

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
:
<View style={{display:'flex',flex:1,justifyContent:'center',alignItems:'center',paddingHorizontal:16}}>
  <Text style={{color:'#121212',fontSize:16}}>It appears to be a new account with no records yet. If this is not the case, please close and reopen the app.</Text>
  </View>}
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
  