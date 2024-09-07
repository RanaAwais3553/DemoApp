import * as RN from "react-native";

const fontFormat = {
  xl_6: {
    fontSize: 48,
    lineHeight: 52,
  },
  xl_5: {
    fontSize: 36,
    lineHeight: 40,
  },
  xl_4: {
    fontSize: 30,
    lineHeight: 36,
  },
  xl_3A: {
    fontSize: 28,
    lineHeight: 34,
  },
  xl_3: {
    fontSize: 24,
    lineHeight: 32,
  },
  xl_2: {
    fontSize: 20,
    lineHeight: 28,
  },
  xl: {
    fontSize: 18,
    lineHeight: 28,
  },
  lg: {
    fontSize: 16,
    lineHeight: 24,
  },
  base: {
    fontSize: 14,
    lineHeight: 20,
  },
  sm: {
    fontSize: 12,
    lineHeight: 16,
  },
  xs: {
    fontSize: 10,
    lineHeight: 14,
  },
};

const fontFamilies = {
  thin: "Montserrat_100Thin",
  extralight: "Montserrat_200ExtraLight",
  light: "Montserrat_300Light",
  regular: "Montserrat_400Regular",
  medium: "Montserrat_500Medium",
  semibold: "Montserrat_600SemiBold",
  bold: "Montserrat_700Bold",
  extrabold: "Montserrat_800ExtraBold",
  black: "Montserrat_900Black",
};

const Text = ({ style, size, font, label, ...props }) => {
  const fontSize = fontFormat[size] || fontFormat["base"];
  const fontFamily = fontFamilies[font] || "Montserrat_400Regular";

  const styles = {
    ...fontSize,
    fontFamily: fontFamily,
  };

  return (
    <RN.Text style={[styles, style]} {...props}>
      {label}
    </RN.Text>
  );
};

export default Text;
