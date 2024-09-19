import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const GetUserSteps = async (userId) => {
    // 66db57e96649bdc5a1c9b5f8
  const res = await Axios.get(`/users/footsteps/${userId}`);
  return res.data;
};

export default GetUserSteps;
