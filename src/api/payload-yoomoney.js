import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const PayloadYoomoney = async (params) => {
  console.log('yoomoney-pay');
  const res = await Axios.post("/yoomoney/create-payload-with-token", params);
  return res.data;
};

export default PayloadYoomoney;
