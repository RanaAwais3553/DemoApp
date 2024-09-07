import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image, Dimensions } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome'; // Or any other icon library you prefer
import Avatar from "../../components/image/avatar.png";
const UserDetailScreen = ({navigation,route}) => {
    const {userData} = route?.params
    console.log("route.params.userData",userData)
  return (
    <View style={styles.container}>
        <View style={{height:Dimensions.get('window').height/3,width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Image style={styles.avatar} source={require('../../components/image/avatar.png')} />
      </View>
      <View style={{display:'flex',padding:22,backgroundColor:'#ffffff',elevation:3,width:'100%'}}>
      <Text style={styles.nameText}>Name: {userData?.name}</Text>
      <View style={{width:'100%',height:2,backgroundColor:'#f2f2f2',marginTop:12}}/>
      <Text style={styles.detailText}>Email: {userData?.email}</Text>
      <View style={{width:'100%',height:2,backgroundColor:'#f2f2f2',marginTop:12}}/>
      <Text style={styles.detailText}>Gender: {userData?.gender}</Text>
      <View style={{width:'100%',height:2,backgroundColor:'#f2f2f2',marginTop:12}}/>
      <Text style={styles.detailText}>Gym Type: {userData?.gymType}</Text>
      <View style={{width:'100%',height:2,backgroundColor:'#f2f2f2',marginTop:12}}/>
      <Text style={styles.detailText}>Subscription Expired: {userData?.isSubscriptionExpired}</Text>
      <View style={{width:'100%',height:2,backgroundColor:'#f2f2f2',marginTop:12}}/>
      <Text style={styles.detailText}>Level: {"Beginner"}</Text>
      <View style={{width:'100%',height:2,backgroundColor:'#f2f2f2',marginTop:12}}/>
      </View>
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
