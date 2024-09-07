import axios from "axios";

const API_BASE = process.env.EXPO_PUBLIC_API_URL;

const Axios = axios.create({
  baseURL: API_BASE,
});

/*const CompleteWorkoutWeek = async (params) => {
  console.log(`set complete ${JSON.stringify(params)}`);
  const requestData = {
    _id: JSON.stringify(params),
    complete: true,
  };

  console.log(`requestData ${requestData._id}`)
  const res = await Axios.post("/workoutplan/complete", requestData, {
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  });

  return res.data;
};*/

const WorkoutHistory = async (id) => {
    console.log(`workout history for user ${id}`);
  
    const requestData = {
      _id: id
    };
  
    console.log(`${JSON.stringify(requestData)}`)
    const res = await Axios.get("users/insights/workout-history", {
        params: { userid: id },
        headers: {
          "Content-Type": "application/json",
        },
      });
      
  
      console.log(`res.data ${res.data}`);
      return res.data;
    
      //console.error("Error completing workout week:", error);
      //throw error; // Re-throw the error for handling at a higher level if needed
    
  };
  

export default WorkoutHistory;
