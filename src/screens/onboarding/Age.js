import { StyleSheet, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useLayoutEffect, useState } from "react";
import moment from "moment";
import { useAccUpdate } from "../../hooks";

import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import DateTimePicker from "@react-native-community/datetimepicker";

import { Button, Text } from "../../components/ui";
import { Pressable } from "react-native";

const DateFormat = (dateString) => {
  return moment(dateString).format("MMM DD YYYY");
};

const AndroidDatePicker = ({
  showPicker,
  date,
  maximumDate,
  setDate,
  setShowPicker,
  label,
}) => {
  console.log({ date });
  return (
    <>
      {showPicker && (
        <DateTimePicker
          mode={"date"}
          value={date}
          onChange={(e, val) => {
            setDate(val);
          }}
          maximumDate={maximumDate}
          dateFormat={"longdate"}
        />
      )}
      <View style={{ width: "100%", height: 85 }}>
        <Button
          label={{ text: label, size: "xl" }}
          onPress={() => setShowPicker(!showPicker)}
          style={{ flex: 1, borderRadius: 24 }}
        />
      </View>
    </>
  );
};

const Age = ({ navigation, route }) => {
  const iOS = Platform.OS === "ios";
  const _id = route.params._id;
  const maximumDate = new Date(moment());

  const [showPicker, setShowPicker] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(maximumDate);
  const [initialDate, setInitialDate] = useState(maximumDate);
  const { update, isUpdating } = useAccUpdate("WeightScreen");

  useEffect(() => {
    if (showPicker) {
      setShowPicker(false);
    }
  }, [date]);

  const handleSubmit = () => {
    if (_id) {
      update({ _id, age: date });
    } else {
      console.log("Missing id");
    }
  };

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      console.log({
        useraaa: typeof moment(data.age).toDate(),
        dd: typeof maximumDate,
      });
      setDate(moment(data.age).toDate() || maximumDate);
    },
  });

  useLayoutEffect(() => {
    GetUser.mutateAsync(_id);
  }, []);

  console.log(date);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            label={"How Old Are You?"}
            size="xl_4"
            font="semibold"
            style={{ textAlign: "center" }}
          />
          <Text
            label={
              "Age in years. This will help us to personalize an exercise program plan that suits you."
            }
            font="medium"
            style={{ textAlign: "center", lineHeight: 24 }}
          />
        </View>

        {showDate ? (
          <View style={styles.date_container}>
            {iOS ? (
              <DateTimePicker
                mode={"date"}
                value={date}
                display={iOS ? "spinner" : "default"}
                onChange={(e, val) => setDate(val)}
                maximumDate={maximumDate}
                dateFormat={"longdate"}
              />
            ) : (
              <AndroidDatePicker
                showPicker={showPicker}
                date={date}
                maximumDate={maximumDate}
                setDate={setDate}
                setShowPicker={setShowPicker}
                label={
                  DateFormat(maximumDate) === DateFormat(date)
                    ? "Select Date of Birth"
                    : DateFormat(date)
                }
              />
            )}
          </View>
        ) : (
          <View style={{ flex: 1, justifyContent: "center", width: "100%" }}>
            {DateFormat(maximumDate) === DateFormat(date) ? (
              <Pressable
                style={{
                  position: "relative",
                  // backgroundColor: "red",
                }}
                onPress={() => {
                  setShowDate(true);
                  setInitialDate(date);
                }}
              >
                <Text
                  label="Press to select your"
                  size="lg"
                  font="extrabold"
                  style={{
                    textAlign: "center",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    color: "#BDBDBD",
                  }}
                />
                <Text
                  label="Age"
                  font="bold"
                  style={{
                    textAlign: "center",
                    fontSize: 135,
                    lineHeight: 0,
                    color: "#6842FF",
                    padding: 0,
                  }}
                />
              </Pressable>
            ) : (
              <Pressable
                style={{
                  position: "relative",
                  // backgroundColor: "red",
                }}
                onPress={() => {
                  setShowDate(true);
                  setInitialDate(date);
                }}
              >
                <Text
                  label={"Press to change your age"}
                  size="lg"
                  font="extrabold"
                  style={{
                    textAlign: "center",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: 0,
                    color: "#BDBDBD",
                  }}
                />
                <Text
                  label={`${moment().diff(date, "years")}`}
                  font="bold"
                  style={{
                    textAlign: "center",
                    fontSize: 195,
                    lineHeight: 0,
                    color: "#6842FF",
                    padding: 0,
                  }}
                />
                <Text
                  label={"yrs old"}
                  size="xl_2"
                  font="extrabold"
                  style={{
                    textAlign: "center",
                    position: "absolute",
                    bottom: 6,
                    left: 0,
                    right: 0,
                    color: "#6842FF",
                  }}
                />
              </Pressable>
            )}
          </View>
        )}

        {showDate ? (
          <View
            style={{
              flexDirection: "row",
              columnGap: 12,
            }}
          >
            <Button
              label={{ text: "Cancel", size: "xl", color: "#6842FF" }}
              onPress={() => {
                setShowDate(false);
                setDate(initialDate);
              }}
              style={{ flex: 1, backgroundColor: "#F0ECFF" }}
            />

            <Button
              label={{ text: "Confirm", size: "xl" }}
              onPress={() => setShowDate(false)}
              style={{ flex: 1 }}
              disabled={
                DateFormat(maximumDate) === DateFormat(date) || isUpdating
              }
            />
          </View>
        ) : (
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
              disabled={
                DateFormat(maximumDate) === DateFormat(date) || isUpdating
              }
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Age;

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
  date_container: { flex: 1, width: "100%", justifyContent: "center" },
});
