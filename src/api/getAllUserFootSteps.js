import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const GetAllUserFootSteps = async (params) => {
    const currentDate = new Date();

// Extract the year and month
const year = currentDate.getFullYear(); // Gets the full year (e.g., 2024)
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Gets the month (0-11), so add 1 and pad with leading zero

// Format the date as "YYYY-MM"
const formattedDate = `${year}-${month}`;
    console.log("get footsteps",API_BASE);
    //use query mutation error will already be handled
    const res = await Axios.get(`/users/footsteps/monthly/${formattedDate}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`footsteps store response ${JSON.stringify(res)}`);
    return res.data;
  };
  export default GetAllUserFootSteps;