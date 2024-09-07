import { StyleSheet, View,ScrollView,AvtivityIndicator, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useState,useEffect } from "react";

import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { Button, Text } from "../../components/ui";

import { Female, Male } from "../../components/icons";
import { useAccUpdate } from "../../hooks";
import UserCard from './userCard';
const Dashboard = ({ navigation, route }) => {
    const [allUsers, setAllUsers] = useState([]);
    const handleDelete = () => {
        // Handle delete action
      };
      const { mutate, data, error, isLoading } = useMutation({
        mutationFn: api.GetAllUsers,
        onSuccess: async (data) => {
         
          setAllUsers(data?.days);
        },
      });
      console.log("user data are", data );
      useEffect(() => {
        mutate();
      }, [mutate]);
      const handleNavigation = (clickedUser) => {
        navigation.navigate("UserDetailScreen",{
          userData:clickedUser
        })
      }
  return (
      <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
       { isLoading && <ActivityIndicator size={"large"}/>}
        {data && data.map((user) =>  <UserCard
          name={user?.name}
          phone={user?.email}
          gender={user?.gender} 
          onDelete={handleDelete}
          userData = {user}
          handleNavigation = {handleNavigation}
        />)}
        {/* Add more UserCard components as needed */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contents: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
});
