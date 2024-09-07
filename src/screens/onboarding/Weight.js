import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useLayoutEffect } from "react";
import { useAccUpdate } from "../../hooks";

import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { Button, InputField, Text } from "../../components/ui";

const Weight = ({ navigation, route }) => {
  const _id = route.params._id;
  const [weight, setWeight] = useState(null);
  const [weightUnit, setWeightUnit] = useState("kg");
  const { update, isUpdating } = useAccUpdate("HeightScreen");

  const handleInputChange = (value) => {
    if (value) {
      setWeight(value);
    } else {
      setWeight(null);
    }
  };

  const handleSubmit = () => {
    if (_id) {
      update({ _id, weight: weight + weightUnit });
    } else {
      console.log("Missing id");
    }
  };

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      console.log({
        data: data?.weight,
        weight: data?.weight?.replace(/kg|lbs/g, ""),
        unit: data?.weight?.replace(/\d+/g, ""),
      });
      setWeight(data?.weight?.replace(/kg|lbs/g, "") || null);
      setWeightUnit(data?.weight?.replace(/(\d+)(kg|lbs)/, "") || "kg");
    },
  });

  useLayoutEffect(() => {
    GetUser.mutateAsync(_id);
  }, []);

  console.log({ weight, _id });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <View style={styles.contents}>
          <View style={{ alignItems: "center", gap: 6 }}>
            <Text
              label={"What is Your Weight?"}
              size="xl_4"
              font="semibold"
              style={{ textAlign: "center" }}
            />
            <Text
              label={
                "Weight in kg/lbs. Don't worry, you can always change it later."
              }
              font="medium"
              style={{ textAlign: "center", lineHeight: 24 }}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                columnGap: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <InputField
                  placeholder="76.0"
                  keyboardType="numeric"
                  style={styles.input}
                  value={weight}
                  onChangeText={handleInputChange}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  columnGap: 6,
                }}
              >
                <Button
                  onPress={() => setWeightUnit("kg")}
                  label={{
                    text: "kg",
                    size: "xl",
                    color: weightUnit === "kg" ? "#ffffff" : "#6842FF",
                  }}
                  style={[
                    styles.unit_btn,
                    {
                      backgroundColor:
                        weightUnit === "kg" ? "#6842FF" : "#F0ECFF",
                    },
                  ]}
                />
                <Button
                  onPress={() => setWeightUnit("lbs")}
                  label={{
                    text: "lbs",
                    size: "xl",
                    color: weightUnit === "lbs" ? "#ffffff" : "#6842FF",
                  }}
                  style={[
                    styles.unit_btn,
                    {
                      backgroundColor:
                        weightUnit === "lbs" ? "#6842FF" : "#F0ECFF",
                    },
                  ]}
                />
              </View>
            </View>
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
              disabled={!weight || isUpdating}
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Weight;

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
  input: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Montserrat_500Medium",
  },
  unit_btn: { borderRadius: 12, width: 60 },
});
