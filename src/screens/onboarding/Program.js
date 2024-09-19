import { StyleSheet, View } from "react-native";
import React, { useState, useLayoutEffect } from "react";
import { useAccUpdate } from "../../hooks";

import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { Button, Text } from "../../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";


const Program = ({ navigation, route }) => {
  const _id = route.params._id;
  const level =  route.params?.level;
  const [frequency, setFrequency] = useState(null);
  const { update, isUpdating } = useAccUpdate("PlanScreen");

  const handleSubmit = () => {
    if (_id) {
      update({ _id, frequency });
    } else {
      console.log("Missing id");
    }
  };

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      console.log({ useraaa: data?.frequency });
      setFrequency(data?.frequency || null);
    },
  });

  useLayoutEffect(() => {
    GetUser.mutateAsync(_id);
  }, []);
  const FrequencyType = level == 'bg' ? [
    { name: "Three Days a Week", value: 3 },
  ] : level == 'adv' ? [
    { name: "Four Days a Week", value: 4 },
    { name: "Three Days a Week", value: 3 },
  ] : [
    { name: "Two Days a Week", value: 2 },
  ];
  
console.log("level inside program:#@#@",level)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            label={"How often will you commit to program?"}
            size="xl_4"
            font="semibold"
            style={{ textAlign: "center" }}
          />
          <Text
            label={
              "Select how frequently you can commit to your workout program."
            }
            font="medium"
            style={{ textAlign: "center", lineHeight: 24 }}
          />
        </View>

        <View style={styles.btn_select}>
          {FrequencyType.map((item, i) => (
            <Button
              key={i}
              label={{ text: item.name, size: "xl", color: "#ffffff" }}
              onPress={() => setFrequency(item.value)}
              style={[
                styles.place_btn,
                {
                  backgroundColor:
                    frequency === item.value ? "#6842FF" : "#BDBDBD",
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
            disabled={!frequency || isUpdating}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Program;

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
