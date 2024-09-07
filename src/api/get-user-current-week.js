import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const GetUserCurrentWeek = async (_id) => {
    const res = await Axios.get(`/users/current-week-number/${_id}`, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
    console.log(`GetUserCurrentWeek ${JSON.stringify(res.data)}`)
  return res.data;
};

export default GetUserCurrentWeek;
