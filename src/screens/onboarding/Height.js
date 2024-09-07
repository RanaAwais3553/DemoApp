import { StyleSheet, View } from "react-native";
import { useState, useLayoutEffect, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import * as api from "../../api";

import { Button, SwipePicker, Text } from "../../components/ui";

import { Right } from "../../components/icons";
import { useAccUpdate } from "../../hooks";
import { SafeAreaView } from "react-native-safe-area-context";

const generateUnitArray = (start, end, unit) => {
  const cmArray = [];

  for (let i = start; i <= end; i++) {
    cmArray.push({
      value: i,
      label: `${i} ${unit}`,
    });
  }

  return cmArray;
};

const units = {
  ft: generateUnitArray(1, 8, "ft"),
  in: generateUnitArray(0, 11, "in"),
  cm: generateUnitArray(30, 270, "cm"),
};

const INPicker = ({ setIn, ftValue, inValue }) => {
  let foot = units["ft"][5].label.replace(/\s/g, "");
  let inches = units["in"][0].label.replace(/\s/g, "");

  const handleHeight = (value) => {
    console.log({ value });
    if (value.split(" ")[1] === "ft") {
      foot = value.replace(/ft|\s/g, "");
      setIn((prev) => ({ ...prev, ft: foot }));
    } else if (value.split(" ")[1] === "in") {
      inches = value.replace(/in|\s/g, "");
      setIn((prev) => ({ ...prev, in: inches }));
    }
  };

  return (
    <>
      <View style={{ width: "45%", position: "relative" }}>
        <SwipePicker
          items={units["ft"]}
          onChange={({ item }) => handleHeight(item.label)}
          initialSelectedIndex={ftValue - 1 || 5}
          height={180}
          width="100%"
        />
        <View style={{ position: "absolute", top: "43%", bottom: "43%" }}>
          <Right size={24} color="#6842FF" />
        </View>
      </View>
      <View style={{ width: "45%", position: "relative" }}>
        <SwipePicker
          items={units["in"]}
          onChange={({ item }) => handleHeight(item.label)}
          initialSelectedIndex={inValue || 0}
          height={180}
          width="100%"
        />
        <View style={{ position: "absolute", top: "43%", bottom: "43%" }}>
          <Right size={24} color="#6842FF" />
        </View>
      </View>
    </>
  );
};

const CMPicker = ({ setCm, value }) => {
  return (
    <View style={{ width: "45%", position: "relative" }}>
      <SwipePicker
        items={units["cm"]}
        onChange={({ item }) => setCm({ cm: item.label.replace(/cm|\s/g, "") })}
        initialSelectedIndex={value - 30 || 150}
        height={180}
        width="100%"
      />
      <View
        style={{ position: "absolute", top: "43%", bottom: "43%", left: -18 }}
      >
        <Right size={24} color="#6842FF" />
      </View>
    </View>
  );
};

const Weight = ({ navigation, route }) => {
  const _id = route.params._id;
  const [height, setHeight] = useState({});
  const [savedHeight, setSavedHeight] = useState({});
  const [heightUnit, setHeightUnit] = useState("cm");
  const { update, isUpdating } = useAccUpdate("ActivityLevelScreen");

  const handelUnitChange = (unit) => {
    if (unit === "cm") {
      setHeightUnit("cm");
      setHeight({ cm: units["cm"][150].label.replace(/cm|\s/g, "") });
    } else if (unit === "in") {
      setHeightUnit("in");
      setHeight({
        ft: units["ft"][5].label.replace(/ft|\s/g, ""),
        in: units["in"][0].label.replace(/in|\s/g, ""),
      });
    }
  };

  const handleSubmit = () => {
    if (_id) {
      update({ _id, height: JSON.stringify(height) });
    } else {
      console.log("Missing id");
    }
  };

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      const parsed_data = JSON.parse(data.height || null) || {};
      const units = Object.keys(parsed_data);

      setHeight(parsed_data || height);

      if (units.includes("in")) {
        setHeightUnit("in");
      } else if (units.includes("cm")) {
        setHeightUnit("cm");
      } else {
        setHeightUnit("cm");
      }
    },
  });

  useLayoutEffect(() => {
    GetUser.mutateAsync(_id);
  }, []);

  console.log({ height, _id, heightUnit, savedHeight });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            label={"What is Your Height?"}
            size="xl_4"
            font="semibold"
            style={{ textAlign: "center" }}
          />
          <Text
            label={
              "Height in inch/cm. Don't worry, you can always change it later."
            }
            font="medium"
            style={{ textAlign: "center", lineHeight: 24 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: 12,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "75%",
              gap: 12,
            }}
          >
            {heightUnit === "cm" && (
              <CMPicker setCm={(item) => setHeight(item)} value={height.cm} />
            )}
            {heightUnit === "in" && (
              <INPicker
                inchValue={height}
                setIn={(item) => setHeight(item)}
                ftValue={height.ft}
                inValue={height.in}
              />
            )}
          </View>
          <View
            style={{
              gap: 12,
            }}
          >
            <Button
              onPress={() => handelUnitChange("cm")}
              label={{
                text: "cm",
                size: "xl",
                color: heightUnit === "cm" ? "#ffffff" : "#6842FF",
              }}
              style={[
                styles.unit_btn,
                {
                  backgroundColor: heightUnit === "cm" ? "#6842FF" : "#F0ECFF",
                },
              ]}
            />
            <Button
              onPress={() => handelUnitChange("in")}
              label={{
                text: "in",
                size: "xl",
                color: heightUnit === "in" ? "#ffffff" : "#6842FF",
              }}
              style={[
                styles.unit_btn,
                {
                  backgroundColor: heightUnit === "in" ? "#6842FF" : "#F0ECFF",
                },
              ]}
            />
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
            disabled={isUpdating}
          />
        </View>
      </View>
    </SafeAreaView>
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
  unit_btn: { borderRadius: 12, width: 65 },
});
