import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useState } from "react";

import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { Button, Text } from "../../components/ui";

import { Female, Male } from "../../components/icons";
import { useAccUpdate } from "../../hooks";

const GenderType = [
  { name: "Male", icon: Male },
  { name: "Female", icon: Female },
];

const Gender = ({ navigation, route }) => {
  const _id = route.params._id;
  const [gender, setGender] = useState(null);
  const { update, isUpdating } = useAccUpdate("AgeScreen");

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      console.log({ useraaa: data?.gender });
      setGender(data?.gender || null);
    },
  });

  useLayoutEffect(() => {
    GetUser.mutateAsync(_id);
  }, []);

  const handleSubmit = () => {
    if (_id) {
      update({ _id, gender });
    } else {
      console.log("Missing id");
    }
  };

  console.log({ gender });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            label={"Tell Us About Yourself"}
            size="xl_4"
            font="semibold"
            style={{ textAlign: "center" }}
          />
          <Text
            label={
              "To give you a better experience and results we need to know your gender."
            }
            font="medium"
            style={{ textAlign: "center", lineHeight: 24 }}
          />
        </View>

        <View style={styles.gender_select}>
          {GenderType.map((item, i) => (
            <Button
              key={i}
              size="icon"
              onPress={() => setGender(item.name.toLowerCase())}
              style={[
                styles.gender_btn,
                {
                  backgroundColor:
                    gender?.toLowerCase() === item.name.toLowerCase()
                      ? "#6842FF"
                      : "#BDBDBD",
                },
              ]}
            >
              <item.icon size={34} color="#ffffff" />
              <Text
                label={item.name}
                size="xl_4"
                font="semibold"
                style={{ color: "#ffffff" }}
              />
            </Button>
          ))}
        </View>

        <Button
          label={{ text: "Continue", size: "xl" }}
          onPress={handleSubmit}
          style={{ width: "100%" }}
          disabled={gender === null || isUpdating}
        />
      </View>
    </SafeAreaView>
  );
};

export default Gender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contents: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  gender_select: { width: "100%", alignItems: "center", gap: 20 },
  gender_btn: {
    width: "100%",
    height: 125,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 4,
    borderRadius: 24,
  },
});
