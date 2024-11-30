import React, {useEffect, useState} from 'react';
import { FlatList, SafeAreaView, StyleSheet,View,Alert, Text,Switch,Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import ExpandableUserCard from './ExpandableCard'; // Import the ExpandableUserCard component
import LinearGradient from 'react-native-linear-gradient';
import ReminderModal from './ReminderModal'
import GetAllUserFootSteps from '../../api/getAllUserFootSteps'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../hooks";
import UserUpdate from '../../api/user-update' 
import { useQueryClient } from '@tanstack/react-query';
const UserLeaderBoard = () => {
  const [isShownModel , setIsShownModel] = useState(false)
  const queryClient = useQueryClient();
  const [sortedList , setSortedList] = useState(null);
  const [isLoading , setIsLoading] = useState(true)
  const [storageUser,setStorageUser] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [imageProfile , setProfileImage] = useState(null)
  const { user, setUser } = useAuth();
  const [currUserSteps , setCurrUserSteps] = useState(0)
  const isFocused = useIsFocused();
useEffect(() => {
if(isFocused){ 
getAllUserSteps()
}
},[isFocused])


const getAllUserSteps = async() => {
  setIsLoading(true);
  setSortedList(null)
const response = await GetAllUserFootSteps()
if(response?.users?.length > 0){
  const currUserSteps = response?.users?.find((data) => data?.userId == user?.data?._id);
  setCurrUserSteps(currUserSteps)
const filteredData = response?.users.filter((data) => {
  if(data?.totalSteps < 200 && !!!data?.isToShowSteps){
    return true
  }else if(data?.totalSteps > 200 && data?.isToShowSteps){
    return true
  }else {
    return false
  }
})
if(filteredData?.length > 0){ 
  const sortedUsers = filteredData?.sort((a, b) => b?.totalSteps - a?.totalSteps);
  setSortedList(sortedUsers)
}
  setIsLoading(false)
}else{
  setIsLoading(false)
}
setIsLoading(false)
}

useEffect(() => {
  const getLocalUser = async() => {
    const localUser = await AsyncStorage.getItem("user");
    const userParse = JSON.parse(localUser)
    setIsEnabled(userParse?.isToShowSteps)
    setStorageUser(userParse)
    if(userParse?.avatar){
      const fullPath = userParse?.avatar
const index = fullPath?.indexOf('/uploads/');
const extractedPath = fullPath?.substring(index + 1);
setProfileImage(`http://54.253.2.145:3000/${extractedPath}`)
      }
  }
  if(isFocused){
    getLocalUser() 
  }
},[isFocused])
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    if(isEnabled){ 
    handleUpdateProfile(false)
    }
    else {
      setIsShownModel(true)
    }
  };
  const handleTopFive = () => {
    if(sortedList?.length > 5){
      const firstFiveElements = sortedList.slice(0, 5);
      setSortedList(firstFiveElements)
    }else{
      setSortedList(sortedList)
    }
  }
  const handleTopTen = () => {
    if(sortedList?.length > 10){
      const firstTenElements = sortedList.slice(0, 10);
      setSortedList(firstTenElements)
    }else{
      setSortedList(sortedList)
    }
  }
  const handleTopFifty = () => {
    if(sortedList?.length > 50){
      const firstFiftyElements = sortedList.slice(0, 50);
      setSortedList(firstFiftyElements)
    }else{
      setSortedList(sortedList)
    }
  }
  const handleUpdateProfile = async(value) => {
    setIsLoading(true)
    const formData = new FormData();
    formData.append('_id', storageUser?._id);
    formData.append('isToShowSteps', value); // Add user ID
   const userResponse = await UserUpdate(formData)
   if(userResponse?._id){
    queryClient?.clear();
    const jsonValue = JSON.stringify(userResponse);
    setIsEnabled(userResponse?.isToShowSteps)
    await AsyncStorage.setItem("user", jsonValue);
    setStorageUser(userResponse)
    setIsLoading(false)
   }else{
    setIsLoading(false)
    Alert.alert("Something went wrong check your internet connection and try again!")
   }
   setIsLoading(false)
  }
  return (
    <SafeAreaView style={styles.container}>
    {isLoading ? 
    <View style={{display:'flex',flex:1}}>
<ActivityIndicator size={"large"} color={"blue"}/>
    </View>
    : sortedList && sortedList?.length > 0 ?
    <>
       <TouchableOpacity onPress={handleTopFive} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LinearGradient
        colors={['#FFD700', '#FFA500', '#FFC200']} // Golden gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '50%',
          height: 62,
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 8,
          borderRadius: 12,
          elevation: 10, // Stronger shadow for Android
          shadowColor: 'rgba(0, 0, 0, 0.4)', // Adjust shadow for iOS
          shadowOffset: { width: 4, height: 6 }, // Shadow offset
          shadowOpacity: 0.7, // Shadow opacity
          shadowRadius: 12, // Shadow blur radius
          marginVertical: 16,
        }}
      >
        <Text style={{ textAlign: 'center', color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>
          Top 5
        </Text>
      </LinearGradient>
    </TouchableOpacity>
      <FlatList
        data={sortedList}
        keyExtractor={(item) => item.userId} 
        renderItem={({ item }) => <ExpandableUserCard user={item} />}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     <TouchableOpacity onPress={handleTopTen} disabled={sortedList.length < 10} style={{display:'flex',width:'100%',alignItems:'center'}}>
      <LinearGradient
        colors={['#C0C0C0', '#D3D3D3', '#E0E0E0']} // Silver gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientStyle}
      >
        <Text style={styles.textBlack}>Top 10</Text>
      </LinearGradient>
      </TouchableOpacity>
      {/* Gray Gradient Button */}
      <TouchableOpacity onPress={handleTopFifty} disabled={sortedList.length < 50} style={{display:'flex',width:'100%',alignItems:'center'}}>
      <LinearGradient
        colors={['#808080', '#A9A9A9', '#C0C0C0']} // Gray gradient colors
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientStyle}
      >
        <Text style={styles.textWhite}>Top 50</Text>
      </LinearGradient>
      </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
      {imageProfile ? <Image source={{ uri: imageProfile }} style={styles.userImage} /> : <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxgFQlVJBpYP0nRIPs4LXLXr1bD4Dh78z8zeMgozATvpJTIPzQr4pOW00ziT85Zllip7s&usqp=CAU' }} style={styles.userImage} />}
      <View style={styles.userInfo}>
        <View style={{
          display:'flex',
          width:'50%',
          justifyContent:'center',
          alignItems:'center',
           borderRadius:8,
           borderWidth:1,
           borderColor:'#d7d9db',
           backgroundColor:'#ededed',
           paddingHorizontal:8,
           paddingVertical:4
        }}>
        <Text style={styles.userName}>MY STEPS</Text>
        </View>
        <Text style={styles.userScore}>FootSteps: {currUserSteps?.totalSteps ? currUserSteps?.totalSteps : 0}</Text>
      </View>
      {/* Add the Switch here */}
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
    <ReminderModal isVisible={isShownModel} onCancel={() => {
      setIsEnabled(false)
      setIsShownModel(false)
      // handleUpdateProfile()
    }} onConfirm={() => {
      setIsEnabled(true)
      setIsShownModel(false)
      handleUpdateProfile(true) 
      }}/>
    </>
    : <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Text style={{color:'#121212',fontWeight:'bold'}}>
        There is no record to show
        </Text>
        </View>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
  },

  gradientStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 8,
    borderRadius: 12,
    elevation: 10, // Stronger shadow for Android
    shadowColor: 'rgba(0, 0, 0, 0.4)', // Adjust shadow for iOS
    shadowOffset: { width: 4, height: 6 }, // Shadow offset
    shadowOpacity: 0.7, // Shadow opacity
    shadowRadius: 12, // Shadow blur radius
    marginVertical: 16,
  },
  textWhite: {
    textAlign: 'center',
    color: '#FFFFFF', // White text for better contrast on golden/gray gradient
    fontSize: 18,
    fontWeight: 'bold',
  },
  textBlack: {
    textAlign: 'center',
    color: '#000000', // Black text for silver gradient
    fontSize: 18,
    fontWeight: 'bold',
  },

  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
    display:'flex',
    justifyContent:'space-between',
    gap:8,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    },
  userScore: {
    fontSize: 16,
    color: '#555',
  },
});

export default UserLeaderBoard;
