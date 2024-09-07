import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import Text from "./text";

const buttonStyles = {
  variant: {
    default: {
      backgroundColor: "#6842FF",
      borderRadius: 100,
      elevation: 1,
    },
    outline: {
      backgroundColor: "transparent",
      borderRadius: 24,
      borderColor: "#EEEEEE",
      borderWidth: 1,
    },
    gray: {
      backgroundColor: "#F5F5F5",
      borderRadius: 100,
      elevation: 1,
    },
    icon: {
      backgroundColor: "transparent",
      borderRadius: 100,
      elevation: 1,
    },
  },
  size: {
    default: {
      height: 58,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    sm: {
      height: 40,
      borderRadius: 4,
      paddingHorizontal: 24,
    },
    lg: {
      height: 70,
      borderRadius: 6,
      paddingHorizontal: 32,
    },
    icon: {
      height: 60,
      width: 60,
    },
  },
};

const pressedVariantStyles = {
  default: "#8668FF",
  outline: "#F5F5F5",
  gray: "#FAFAFA",
  icon: "#EEEEEE",
};

const disabledVariantStyles = {
  default: "#6B5BAB",
  outline: "transparent",
};

const Button = ({
  label,
  children,
  style,
  variant,
  size,
  onPress,
  ...props
}) => {
  return (
    <Pressable
      onPress={onPress}
      {...props}
      style={({ pressed }) => [
        styles.button,
        buttonStyles.variant[variant || "default"],
        buttonStyles.size[size || "default"],
        {
          backgroundColor: pressed
            ? pressedVariantStyles[variant || "default"]
            : props.disabled
            ? disabledVariantStyles[variant || "default"]
            : buttonStyles.variant[variant || "default"].backgroundColor,
        },
        style,
      ]}
    >
      {children ? (
        <>{children}</>
      ) : (
        <Text
          label={label.text}
          size={label.size ? label.size : size}
          font={label.font ? label.font : "bold"}
          style={[
            { color: label.color ? label.color : "#ffffff" },
            label.style,
          ]}
        />
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
