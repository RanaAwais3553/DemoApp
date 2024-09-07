import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import * as api from "../api";
import { useState } from "react";

const useAccUpdate = (next) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const UserUpdate = useMutation({
    mutationFn: api.UserUpdate,
    onSuccess: async (data) => {
      setIsLoading(false);
      navigation.navigate(next, { _id: data?._id });
    },
    onError: (error) => {
      setIsLoading(false);
      console.log({ error });
    },
  });

  return {
    update: (field) => {
      setIsLoading(true);
      UserUpdate.mutateAsync(field);
    },
    isUpdating: isLoading,
  };
};

export default useAccUpdate;
