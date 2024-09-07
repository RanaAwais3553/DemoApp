import axios from "axios";
const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const CancelYooMoneySubscription = async (params) => {
  console.log(`YooMoneySubscriptionIntent ${params}`);
  const res = await Axios.post("/yoomoney/cancel-subscription", params, {
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });

  return res.data;
};
export default CancelYooMoneySubscription;
