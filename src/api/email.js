import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const Email = async (params) => {
  console.log('password');
  const res = await Axios.post("/users/forgot_password", params);
  return res.data;
};

export default Email;
