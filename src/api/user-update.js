import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});


const UserUpdate = async (params) => {
  const formData = new FormData();
  let finalParam;
  if (params instanceof FormData) {
    finalParam = params;
    console.log("This is a FormData object");
  } else {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        formData.append(key, params[key]);
      }
    }
    finalParam = formData
  }
// Append each key-value pair from the object to the FormData

  console.log("user updated data isx:#@#@#@",finalParam,API_BASE)
  const res = await Axios.put("/users/update", finalParam,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log("user updated data after API call:#@#@#@",res)
  return res.data;
};


export default UserUpdate;
