import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const SubsriptionIntent = async (params) => {
  console.log(`SubscriptionIntent ${params}`);
  console.log(`Subscription send`);
  const res = await Axios.post("/payment/subscription-intent", params, {
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });

  return res.data;
};
export default SubsriptionIntent;
