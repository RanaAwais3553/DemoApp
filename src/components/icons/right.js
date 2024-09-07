import { Svg, Path } from "react-native-svg";

const Right = ({ size = 24, color = "#212121", ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      xmlSpace="preserve"
      {...props}
    >
      <Path
        d="M14 43.7V8.3c0-1 1.3-1.7 2.2-.9l21.2 17.3c.8.6.8 1.9 0 2.5L16.2 44.7c-.9.7-2.2.1-2.2-1z"
        fill={color}
      />
    </Svg>
  );
};

export default Right;
