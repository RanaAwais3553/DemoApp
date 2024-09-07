import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const Subscribe = async (params) => {
  console.log(`Subscribe ${params}`)
  const res = await Axios.post("/payment/subscribe", params, {
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });

  return res.data;
};
export default Subscribe;
