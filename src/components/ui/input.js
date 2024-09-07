import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import Text from "./text";

const Input = ({
  style,
  icons,
  placeholder,
  type,
  onFieldFocus,
  onFieldBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState();

  const handleFocus = () => {
    setIsFocused(true);
    onFieldFocus ? onFieldFocus() : null;
  };

  const handleBlur = () => {
    setIsFocused(false);
    onFieldBlur ? onFieldBlur() : null;
  };

  const iconSize = {
    sm: 14,
    base: 20,
    lg: 32,
    xl: 48,
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isFocused ? "rgba(104, 66, 255, 0.08)" : "#F5F5F5",
            borderColor: isFocused
              ? "#6842FF"
              : props.error
              ? "#F44336"
              : "transparent",
          },
        ]}
      >
        {icons && icons.left && icons.left.icon && (
          <View style={[styles.icon, { left: 20 }]}>
            <icons.left.icon
              color={isFocused ? "#6842FF" : icons.left?.color || "#9E9E9E"}
              size={iconSize[icons.left?.size] || icons.left?.size}
            />
          </View>
        )}

        {icons && icons.right && icons.right.icon && (
          <View style={[styles.icon, { right: 20 }]}>
            {icons.right.onPress ? (
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={icons.right.onPress}
              >
                <icons.right.icon
                  color={
                    isFocused ? "#6842FF" : icons.right?.color || "#9E9E9E"
                  }
                  size={iconSize[icons.right?.size] || icons.right?.size}
                />
              </TouchableOpacity>
            ) : (
              <icons.right.icon
                color={isFocused ? "#6842FF" : icons.right?.color || "#9E9E9E"}
                size={iconSize[icons.right?.size] || icons.right?.size}
              />
            )}
          </View>
        )}

        <TextInput
          style={[
            styles.input,
            {
              marginLeft: icons?.left ? 44 : 20,
              marginRight: icons?.right ? 58 : 20,
            },
            style,
          ]}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={props.showPassword}
          {...props}
          placeholderTextColor={"gray"}
        />
      </View>
      {props.error ? (
        <Text
          label={props.error}
          size="sm"
          font="semibold"
          style={{ color: "#F44336", paddingTop: 2, paddingLeft: 8 }}
        />
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
  },
  input: {
    borderColor: "transparent",
    height: 50,
    paddingHorizontal: 12,
  },
  icon: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: "center",
  },
});
