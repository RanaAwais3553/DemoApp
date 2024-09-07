import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const Test = async () => {
  const res = await Axios.get("/test");
  return res.data;
};

export default Test;
