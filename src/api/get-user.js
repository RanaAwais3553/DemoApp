import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

const GetUser = async (_id) => {
  console.log("user id before submitting and getting user from GetUser",_id)
  const res = await Axios.get("/users/self", {
    params: { _id }, // Pass the object as the "params" property
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });
  return res.data;
};

export default GetUser;
