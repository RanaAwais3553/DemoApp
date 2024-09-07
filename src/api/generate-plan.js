import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

//move this to seperate api file
// const getWeeklyPlan = async (params) => {
//   try {
//     const requestData = { email: params }; // Create a JSON object with the "email" key
//     const res = await Axios.get("/users/workoutplan/weekly", {
//       params: requestData, // Pass the object as the "params" property
//       headers: {
//         'Content-Type': 'application/json', // Set the content type to JSON
//       },
//     });

//     return res.data;
//   } catch (error) {
//     // Handle any errors here
//     console.error('Unable to pull weekly plan:', error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

const GeneratePlan = async (params) => {
  const res = await Axios.put("/exercise/plan", params, {
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });

  return res.data;
};

// export {
//   GeneratePlan,
//   getWeeklyPlan
// }
export default GeneratePlan;
