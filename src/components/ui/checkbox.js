import { View, TouchableOpacity, StyleSheet } from "react-native";

import { Check } from "lucide-react-native";
import Text from "./text";

const Checkbox = ({ label, isChecked, onToggle, color = "#212121" }) => {
  const handleToggle = () => {
    onToggle(!isChecked);
  };

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={handleToggle}>
        <View
          style={[
            styles.checkbox,
            {
              backgroundColor: isChecked ? "#6842FF" : "transparent",
            },
          ]}
        >
          {isChecked && (
            <View style={styles.checkmark}>
              <Check color="white" size={14} strokeWidth={4} />
            </View>
          )}
        </View>
      </TouchableOpacity>
      {label ? (
        <Text label={label} font="semibold" style={{ color: color }} />
      ) : null}
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#6842FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    position: "relative",
  },
  checkmark: {
    position: "absolute",
    top: 3,
    bottom: 3,
    left: 3,
    right: 3,
  },
});
