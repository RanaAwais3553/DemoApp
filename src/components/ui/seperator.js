import { StyleSheet, View } from "react-native";
import React from "react";
import Text from "./text";

const Seperator = ({ label, color, size }) => {
  return (
    <View style={styles.contianer}>
      <View style={{ ...styles.line, backgroundColor: color }} />
      <View style={styles.textContainer}>
        <Text
          label={label}
          font="semibold"
          size={size}
          style={{ color: "#616161" }}
        />
      </View>
      <View style={{ ...styles.line, backgroundColor: color }} />
    </View>
  );
};

export default Seperator;

const styles = StyleSheet.create({
  contianer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  line: {
    flex: 1,
    width: "100%",
    height: 1,
  },
  textContainer: {
    marginHorizontal: 16,
  },
});
