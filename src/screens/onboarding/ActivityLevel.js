import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useState } from "react";
import { useAccUpdate } from "../../hooks";

import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { Button, Text } from "../../components/ui";

import { SignalHigh, SignalLow, SignalMedium } from "lucide-react-native";

const LevelType = [
  { name: "Kids (below 13)", icon: SignalLow, value: "Kids" },
  { name: "Beginner", icon: SignalMedium, value: "bg" },
  { name: "Advance", icon: SignalHigh, value: "adv" },
];

const levelMappings = {
  advance: "adv",
  beginner: "bg",
  kids: "Kids",
};

const ActivityLevel = ({ navigation, route }) => {
  const _id = route.params?._id;
  const [level, setLevel] = useState(null);
  const { update, isUpdating } = useAccUpdate("WeightTrainScreen");

  const handleSubmit = () => {
    if (_id) {
      update({ _id, level });
    } else {
      console.log("Missing id");
    }
  };

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      console.log({ useraaa: data?.level });
      setLevel(data?.level || null);
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
            label={"Physical Activity Level"}
            size="xl_4"
            font="semibold"
            style={{ textAlign: "center" }}
          />
          <Text
            label={
              "Choose your regular activity level. This will help us to personalize plans for you."
            }
            font="medium"
            style={{ textAlign: "center", lineHeight: 24 }}
          />
        </View>

        <View style={styles.btn_select}>
          {LevelType.map((item, i) => (
            <Button
              key={i}
              size="icon"
              onPress={() => {
                // const levelValue = levelMappings[item.name.toLowerCase()];
                setLevel(item.value);
              }}
              style={[
                styles.level_btn,
                {
                  backgroundColor: level === item.value ? "#6842FF" : "#BDBDBD",
                },
              ]}
            >
              <item.icon size={20} color="#ffffff" />
              <Text
                label={item.name}
                size="xl"
                font="semibold"
                style={{ color: "#ffffff" }}
              />
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
            disabled={!level || isUpdating}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ActivityLevel;

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
  level_btn: {
    width: "100%",
    height: 65,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
});
