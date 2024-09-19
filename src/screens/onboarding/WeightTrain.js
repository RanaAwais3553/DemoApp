import { StyleSheet, View } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useAccUpdate } from "../../hooks";

import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { Button, Text } from "../../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";

const RegularityType = [
  { name: "I Currently Train", value: "currently" },
  { name: "Months Ago", value: "months" },
  { name: "Years Ago", value: "years" },
];

const WeightTrain = ({ navigation, route }) => {
  const _id = route.params?._id;
  const level =  route.params?.level;
  const [regularity, setRegularity] = useState(null);
  const { update, isUpdating } = useAccUpdate("GymGoalScreen");

  const handleSubmit = () => {
    if (_id) {
      update({ _id, workoutRegularity: regularity });
    } else {
      console.log("Missing id");
    }
  };

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      console.log({ useraaa: data?.workoutRegularity });
      setRegularity(data?.workoutRegularity || null);
    },
  });

  useLayoutEffect(() => {
    GetUser.mutateAsync(_id);
  }, []);

  console.log("waight train inside level",level, regularity, _id );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            label={"Physical Weight Training"}
            size="xl_4"
            font="semibold"
            style={{ textAlign: "center" }}
          />
          <Text
            label={"When was the last time you weight trained regularly?"}
            font="medium"
            style={{ textAlign: "center", lineHeight: 24 }}
          />
        </View>

        <View style={styles.btn_select}>
          {RegularityType.map((item, i) => (
            <Button
              key={i}
              label={{ text: item.name, size: "xl", color: "#ffffff" }}
              onPress={() => setRegularity(item.value)}
              style={[
                styles.regularity_btn,
                {
                  backgroundColor:
                    regularity === item.value ? "#6842FF" : "#BDBDBD",
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
            disabled={!regularity || isUpdating}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WeightTrain;

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
  regularity_btn: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
});
