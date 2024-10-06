import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

/*const Login = async (params) => {
  console.log(`LoginAPI ${JSON.stringify(params)}`)
  //const res = await Axios.post("/users/login", params);
  return "login"//res.data;
};*/

const Login = async (params) => {
  console.log("API base url is:#@#@",API_BASE);
  //use query mutation error will already be handled
  const res = await Axios.post("/users/login", params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(`login result ${JSON.stringify(res)}`);
  return res.data;
};

export default Login;
