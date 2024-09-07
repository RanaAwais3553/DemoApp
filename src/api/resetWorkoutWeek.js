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

const ResetWorkoutWeek = async (id) => {
    console.log(`set reset ${id}`);
  
    const requestData = {
      _id: id,
      complete: false,
    };
    try {
      console.log(`server side call`)
      const res = await Axios.post("users/workoutplan/reset", requestData, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
  
      console.log(`res.data ${res.data}`);
      return res.data;
    }
    catch(error) {
      console.error("Error resetting workout week:", error);
      throw error; // Re-throw the error for handling at a higher level if needed
    }
      
    
      //console.error("Error completing workout week:", error);
      //throw error; // Re-throw the error for handling at a higher level if needed
    
  };
  

export default ResetWorkoutWeek;
