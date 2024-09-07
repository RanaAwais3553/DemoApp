import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const Confirm = async (params) => {
  const res = await Axios.post("/users/reset_password", params);
  return res.data;
};

export default Confirm;
