import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const StoreFootSteps = async (params) => {
    console.log("store footsteps",API_BASE);
    //use query mutation error will already be handled
    const res = await Axios.post("/users/footsteps", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`footsteps store response ${JSON.stringify(res)}`);
    return res.data;
  };
  export default StoreFootSteps;