import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const GetCurrentUserFootSteps = async (userId) => {
    console.log("get footsteps",API_BASE);
    //use query mutation error will already be handled
    const res = await Axios.get(`/users/footsteps/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`footsteps store response ${JSON.stringify(res)}`);
    return res.data;
  };
  export default GetCurrentUserFootSteps;