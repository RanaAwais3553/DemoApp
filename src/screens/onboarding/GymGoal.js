import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useAccUpdate } from "../../hooks";

import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { Button, Text } from "../../components/ui";
import { Check } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GoalType = [
  { name: "Build Strength", value: "buildStrength", selected: false },
  { name: "Size", value: "size", selected: false },
  { name: "Get Ripped", value: "getRipped", selected: false },
  { name: "Overall Fitness", value: "overallFitness", selected: false },
];

const Checkbox = ({ isChecked }) => {
  return (
    <View
      style={[
        styles.checkbox,
        {
          backgroundColor: isChecked ? "#6842FF" : "transparent",
          borderColor: isChecked ? "#6842FF" : "#BDBDBD",
        },
      ]}
    >
      {isChecked && (
        <View style={styles.checkmark}>
          <Check color="white" size={14} strokeWidth={4} />
        </View>
      )}
    </View>
  );
};

const GymGoal = ({ navigation, route }) => {
  const _id = route.params._id;
  const [goals, setGoals] = useState([]);
  const { update, isUpdating } = useAccUpdate("GymPlaceScreen");

  const handleGoal = (value) => {
    if (!goals.includes(value)) {
      console.log({ value });
      setGoals((prev) => [...prev, value]);
    } else {
      setGoals((prev) => prev.filter((goal) => goal !== value));
    }
  };

  const handleSubmit = () => {
    if (_id) {
      update({ _id, gymGoal: goals });
    } else {
      console.log("Missing id");
    }
  };

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      console.log({ useraaa: data?.gymGoal });
      const exist_goals = data?.gymGoal || [];
      console.log({ useraaa: data?.gymGoal, ff: [...goals] });
      setGoals(() => [...exist_goals]);
      // setGoals(...exist_goals);
    },
  });

  useLayoutEffect(() => {
    GetUser.mutateAsync(_id);
  }, []);

  console.log({ goals, dd: goals.includes("overallFitnessCardio") });
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            label={"What is your current Gym Goal?"}
            size="xl_4"
            font="semibold"
            style={{ textAlign: "center" }}
          />
          <Text
            label={"You can choose more than one gym goal."}
            font="medium"
            style={{ textAlign: "center", lineHeight: 24 }}
          />
        </View>

        <View style={styles.btn_select}>
          {GoalType.map((item, i) => (
            <Button
              key={i}
              onPress={() => handleGoal(item.value)}
              variant="outline"
              style={[
                styles.goal_btn,
                {
                  borderColor: goals.includes(item.value)
                    ? "#6842FF"
                    : "#BDBDBD",
                },
              ]}
            >
              <Text
                label={item.name}
                size="xl"
                font="semibold"
                style={{
                  color: goals.includes(item.value) ? "#6842FF" : "#BDBDBD",
                }}
              />
              <Checkbox isChecked={goals.includes(item.value)} />
            </Button>
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
            disabled={goals.length === 0 || isUpdating}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GymGoal;

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
  goal_btn: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#6842FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  checkmark: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
    right: 4,
  },
});
