import React,{useState} from 'react';
import { View,Alert, Text, TouchableOpacity, StyleSheet,Image, Dimensions, TextInput, ActivityIndicator } from 'react-native';
import UserUpdate from '../../api/user-update'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from '@tanstack/react-query';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const UserDetailScreen = ({navigation,route}) => {
  const queryClient = useQueryClient();
    const {userData} = route?.params
    const [isEditable, setIsEditable] = useState(true);
    const [name,setName] = useState(userData?.name ?? "")
    const [surname,setSurName] = useState(userData?.surname)
    const [email,setEmail] = useState(userData?.email)
    const [gender,setGender] = useState(userData?.gender)
    const [isLoading,setIsLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(null);

    // Function to launch the camera
    const handleLaunchCamera = () => {
      const options = {
        mediaType: 'photo',
        cameraType: 'back',
      };
  
      launchCamera(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
        } else if (response.error) {
          console.log('Camera Error: ', response.error);
        } else {
          if(response?.errorCode == "camera_unavailable"){
            alert("Camera unavailable!")
          }else{
            const source = response?.assets[0];
            setProfileImage(source);
          }
        }
      });
    };
  
    // Function to pick an image from the gallery
    const handleLaunchImageLibrary = () => {
      const options = {
        mediaType: 'photo',
      };
  
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('Image Library Error: ', response.error);
        } else {
          const source = response?.assets[0];
          setProfileImage(source);
        }
      });
    };
  console.log("profile image is:##@#@",profileImage)
    // Function to update user image
    const handleUpdateImage = async () => {
      if (!profileImage) {
        alert('Please select an image first.');
        return;
      }
  
      const formData = new FormData();
      formData.append('_id', user._id); // Add user ID
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: profileImage.type,
        name: profileImage.fileName,
      });
  
      try {
        const response = await axios.put('http://your-backend-url/api/update', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('User image updated:', response.data);
      } catch (error) {
        console.error('Error updating user image:', error);
      }
    };
  
    console.log("route.params.userData",userData);
    const handleUpdateProfile = async() => {
      setIsLoading(true)
      const data = {
        _id:userData?._id,
        name:name,
        surname:surname,
        email:email,
        gender:gender,
      }
      const formData = new FormData();
      formData.append('_id', userData?._id); // Add user ID
      formData.append('name', name); // Add user ID
      formData.append('surname', surname); // Add user ID
      formData.append('email', email); // Add user ID
      formData.append('gender', gender); // Add user ID
     if(profileImage?.uri){ 
      formData.append('profileImage', {
        uri: profileImage.uri,
        type: profileImage.type,
        name: profileImage.fileName,
      });
    }
      console.log("params before update user api call:#@#2",formData)
     const userResponse = await UserUpdate(formData)
    //  const userResponseData = JSON.parse(userResponse?.data)
     console.log("data userResponseData is:",userResponse?._id)
     if(userResponse?._id){
      queryClient?.clear();
      const jsonValue = JSON.stringify(userResponse);
      await AsyncStorage.setItem("user", jsonValue);
      setIsLoading(false)
      navigation.goBack();
     }else{
      setIsLoading(false)
      Alert.alert("Something went wrong check your internet connection and try again!")
     }
     setIsLoading(false)
    }
  const headerContainer = () => {
    return(
      <View style={{display:'flex',flexDirection:'row',width:'100%',paddingHorizontal:20,paddingVertical:16, backgroundColor:'#fff', justifyContent:'space-between',}}>
<TouchableOpacity style={{display:'flex'}} onPress={() => navigation.goBack()}>
<Text style={{fontSize:16,color:"#121212"}}>Cancel</Text>
</TouchableOpacity>
<TouchableOpacity style={{display:'flex'}} onPress={() => setIsEditable(true)}>
  <Text style={{fontSize:16,color:"#121212",fontWeight:'bold'}}>Edit Profile</Text>
</TouchableOpacity>
<TouchableOpacity style={{display:'flex'}} onPress={handleUpdateProfile}>
  <Text style={{fontSize:16,color:"#121212"}}>Done</Text>
</TouchableOpacity>
      </View>
    )
  }
  const profileImageJsx = () => {
    return(
<View style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',paddingVertical:16,}}>
  <View style={{display:'flex'}}>
      {profileImage?.uri ? <Image style={styles.avatar} source={{uri: profileImage?.uri }} />
      : <Image style={styles.avatar} source={require('../../../assets/image/avatar.png')} />
      }
      </View>
      <TouchableOpacity onPress={handleLaunchImageLibrary} style={{display:'flex',paddingTop:14}}>
<Text style={{color:'#3873d9',fontWeight:'bold'}}>Change Profile Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLaunchCamera} style={{display:'flex',paddingTop:14}}>
<Text style={{color:'#3873d9',fontWeight:'bold'}}>Launch Camera</Text>
      </TouchableOpacity>
      </View>
    )
  }
  const profileData = () => {
    return(
      <View style={{display:'flex',borderTopWidth:1,borderColor:'#e0e0e0', padding:22,backgroundColor:'#ffffff',elevation:3,width:'100%'}}>
    <View style={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center'}}>
      <View style={{display:'flex',width:'30%',paddingBottom:12}}>
      <Text style={styles.nameText}>Name</Text>
      </View>
      <View style={{display:'flex',width:'70%'}}>
        <TextInput editable={isEditable} onChangeText={setName} value={name} style={{borderBottomWidth:1,borderBottomColor:'#e0e0e0',fontSize:16, paddingBottom:12,color:isEditable ? "#121212" : "#a3a2a2"}}/>
      </View>
      </View>

      <View style={{display:'flex',flexDirection:'row',paddingVertical:12, width:'100%',alignItems:'center'}}>
      <View style={{display:'flex',width:'30%',paddingBottom:12}}>
      <Text style={styles.nameText}>Username</Text>
      </View>
      <View style={{display:'flex',width:'70%'}}>
        <TextInput editable={isEditable} onChangeText={setSurName} value={surname} style={{borderBottomWidth:1,borderBottomColor:'#e0e0e0',fontSize:16, paddingBottom:12,color:isEditable ? "#121212" : "#a3a2a2"}}/>
      </View>
      </View>


      {/* <View style={{display:'flex',flexDirection:'row', width:'100%',alignItems:'center'}}>
      <View style={{display:'flex',width:'30%',paddingBottom:12,flexDirection:'row',alignItems:'center'}}>
      <Text style={{...styles.nameText,fontSize:24}}>Date of</Text>
      <View>
        <Text style={{...styles.nameText,fontSize:24}}>{" "}birth</Text>
      </View>
      </View>
      <View style={{display:'flex',width:'70%'}}>
        <TextInput editable={isEditable} style={{borderBottomWidth:1,borderBottomColor:'#e0e0e0',fontSize:16, paddingBottom:12,color:isEditable ? "#121212" : "#a3a2a2"}}/>
      </View>
      </View> */}
        <View style={{display:'flex',flexDirection:'row',paddingVertical:12, width:'100%',alignItems:'center'}}>
      <View style={{display:'flex',width:'30%',paddingBottom:12}}>
      <Text style={styles.nameText}>Date of</Text>
      </View>
      <View style={{display:'flex',width:'70%'}}>
        <TextInput placeholder='birth' placeholderTextColor={"#a3a2a2"} editable={false} style={{borderBottomWidth:1,borderBottomColor:'#e0e0e0',fontSize:16, paddingBottom:12,color:"#a3a2a2"}}/>
      </View>
      </View>


      <View style={{display:'flex',flexDirection:'row',paddingVertical:12, width:'100%',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#e0e0e0'}}>
      <View style={{display:'flex',width:'30%'}}>
      <Text style={{...styles.nameText,marginBottom:0}}>Bio</Text>
      </View>
      <View style={{display:'flex',width:'70%'}}>
        <TextInput editable={isEditable} style={{fontSize:16}} placeholder='Bio' placeholderTextColor={"#b8b6b6"}/>
      </View>
      </View>


      <View style={{display:'flex',flexDirection:'row',paddingVertical:12, width:'100%',alignItems:'center'}}>
      <View style={{display:'flex',width:'30%'}}>
      <Text style={{...styles.nameText,marginBottom:0}}>Gender</Text>
      </View>
      <View style={{display:'flex',width:'70%'}}>
        <TextInput editable={isEditable} onChangeText={setGender} value={gender} style={{borderBottomWidth:1,borderBottomColor:'#e0e0e0',fontSize:16, paddingVertical:12,fontSize:16,color:isEditable ? "#121212" : "#a3a2a2"}} placeholder='Not Specified' placeholderTextColor={"#121212"} />
      </View>
      </View>


      <View style={{display:'flex',flexDirection:'row',paddingVertical:12, width:'100%',alignItems:'center'}}>
      <View style={{display:'flex',width:'30%',paddingBottom:12}}>
      <Text style={styles.nameText}>Email</Text>
      </View>
      <View style={{display:'flex',width:'70%'}}>
        <TextInput editable={isEditable} onChangeText={setEmail} value={email} placeholder='example@gmail.com' placeholderTextColor={"#121212"} style={{borderBottomWidth:1,borderBottomColor:'#e0e0e0',fontSize:16, paddingBottom:12,color:isEditable ? "#121212" : "#a3a2a2"}}/>
      </View>
      </View>
      </View>
    )
  }
    return (
    <View style={styles.container}>
      {headerContainer()}
        {profileImageJsx()}
        {profileData()}
        {isLoading &&
        <View style={{height:Dimensions.get("screen").height,width:'100%',left:0,right:0,top:0,bottom:0}}>
          <ActivityIndicator size={"large"} color={"#7e9ff2"}/>
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        // marginTop:22,
    },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.3, // For iOS shadow
    shadowRadius: 2, // For iOS shadow
  },
  avatar: { width: 150, height: 150, borderRadius: 100 },
  avatar_container: {
    borderColor: "#6842FF",
    borderRadius: 100,
    padding: 2,
    borderWidth: 2,
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 20,
    marginRight:5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
letterSpacing:0.5,

  },
  detailText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    letterSpacing:0.5,
    marginVertical:5
  },
  userIcon: {
    marginLeft: 10,
  },
});

export default UserDetailScreen;
