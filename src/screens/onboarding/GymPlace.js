import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useAccUpdate } from "../../hooks";

import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { Button, Text } from "../../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";

const PlaceType = [
  { name: "Home Gym", value: "homeGym" },
  { name: "Commercial Gym", value: "commercialGym" },
  { name: "Small Gym", value: "smallGym" },
  { name: "Crossfit Style Gym", value: "crossfitGym" },
];

const GymPlace = ({ navigation, route }) => {
  const _id = route.params._id;
  const [place, setPlace] = useState(null);
  const { update, isUpdating } = useAccUpdate("ProgramScreen");

  const handleSubmit = () => {
    if (_id) {
      update({ _id, gymType: place });
    } else {
      console.log("Missing id");
    }
  };

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      console.log({ useraaa: data?.gymType });
      setPlace(data?.gymType || null);
    },
  });

  useLayoutEffect(() => {
    GetUser.mutateAsync(_id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            label={"Where do you currently workout?"}
            size="xl_4"
            font="semibold"
            style={{ textAlign: "center" }}
          />
          <Text
            label={
              "Select your current workout place to help us personalize your fitness plan."
            }
            font="medium"
            style={{ textAlign: "center", lineHeight: 24 }}
          />
        </View>

        <View style={styles.btn_select}>
          {PlaceType.map((item, i) => (
            <Button
              key={i}
              label={{ text: item.name, size: "xl", color: "#ffffff" }}
              onPress={() => setPlace(item.value)}
              style={[
                styles.place_btn,
                {
                  backgroundColor: place === item.value ? "#6842FF" : "#BDBDBD",
                },
              ]}
            />
          ))}
        </View>

        <View
          style={{
            flexDirection: "row",
            columnGap: 12,
          }}
        >
          <Button
            label={{ text: "Back", size: "xl", color: "#6842FF" }}
            onPress={() => navigation.goBack()}
            style={{ flex: 1, backgroundColor: "#F0ECFF" }}
          />

          <Button
            label={{ text: "Continue", size: "xl" }}
            onPress={handleSubmit}
            style={{ flex: 1 }}
            disabled={!place || isUpdating}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GymPlace;

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
  btn_select: { width: "100%", alignItems: "center", gap: 20 },
  place_btn: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
    borderRadius: 12,
  },
});
