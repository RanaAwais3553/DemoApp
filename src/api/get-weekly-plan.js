import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const GetWeeklyPlan = async (email) => {
  console.log(email);
  const res = await Axios.get("/users/workoutplan/weekly", {
    params: { email: email }, // Pass the object as the "params" property
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });

  return res.data;
};

export default GetWeeklyPlan;
