import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const Payment = async (params) => {
  const res = await Axios.post("/payment/intents", params, {
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });

  return res.data;
};
export default Payment;
