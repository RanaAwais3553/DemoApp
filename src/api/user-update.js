import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});


const UserUpdate = async (params) => {
  console.log("user updated data:#@#@#@",params)
  const res = await Axios.put("/users/update", params);
  console.log("user updated data after API call:#@#@#@",res)
  return res.data;
};

const UserUpdateWorkoutWeek = async (params) => {
  const res = await Axios.put("/users/update", params);
  return res.data;
};


export default UserUpdate;
