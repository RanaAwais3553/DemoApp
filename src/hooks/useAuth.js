import { useQuery, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        console.log("Retrieved user data from AsyncStorage:", userData);
        if (userData) {
          const parsedData = JSON.parse(userData);
          return parsedData;
        }
        return null;
      } catch (err) {
        console.error("Failed to retrieve user data from AsyncStorage", err);
        return null;
      }
    },
    staleTime: 1000 * 60 * 60 * 24 * 2, // 2 days
    cacheTime: Infinity, // Keep data in cache indefinitely
    initialData: () => {
      const initialUserData = queryClient.getQueryData(["user"]);
      console.log("Initial query client user data:", initialUserData);
      return initialUserData;
    },
  });

  const setUser = async (value) => {
    console.log("invali:", value);
    try {
      if (!!!value || Object.keys(value)?.length === 0) {
        // console.error("Attempted to save empty or invalid user data:", value);
        console.log("Attempted to save empty or invalid user data");
        return;
      }
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
      // console.log("User data saved to AsyncStorage:", jsonValue);
      console.log("User data saved to AsyncStorage");
      queryClient.setQueryData(["user"], value);
    } catch (err) {
      console.error("Failed to save user data to AsyncStorage", err);
    }
  };

  return {
    user: { data, isLoading, error },
    setUser,
  };
};

export default useAuth;
