import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;
import {EXPO_PUBLIC_API_URL} from '@env'
const Axios = axios.create({
  baseURL: API_BASE,
});

const Signup = async (params) => {
  console.log("API_BASE",API_BASE,process.env.EXPO_PUBLIC_API_URL,EXPO_PUBLIC_API_URL)
  const res = await Axios.post("/users/new", params);
  return res.data;
};

export default Signup;
