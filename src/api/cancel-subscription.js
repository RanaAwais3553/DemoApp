import axios from "axios";
const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const CancelSubscription = async (params) => {
  console.log(`SubscriptionIntent ${params}`);
  const res = await Axios.post("/payment/cancel-subscription", params, {
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });

  return res.data;
};
export default CancelSubscription;
