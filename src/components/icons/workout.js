import { Svg, Path, G } from "react-native-svg";

const Workout = ({ size = 24, color = "#212121", ...props }) => {
  return (
    <Svg
      viewBox="0 0 32 32"
      xmlSpace="preserve"
      width={size}
      height={size}
      fill={color}
      {...props}
    >
      <G strokeWidth={0} />
      <G strokeLinecap="round" strokeLinejoin="round" />
      <G>
        <Path d="M7 25c-1.7 0-3-1.3-3-3V10c0-1.7 1.3-3 3-3s3 1.3 3 3v12c0 1.7-1.3 3-3 3zm18 0c-1.7 0-3-1.3-3-3V10c0-1.7 1.3-3 3-3s3 1.3 3 3v12c0 1.7-1.3 3-3 3z" />
        <Path d="M23 17H9c-.6 0-1-.4-1-1s.4-1 1-1h14c.6 0 1 .4 1 1s-.4 1-1 1zM2 10.2c-1.2.4-2 1.5-2 2.8v6c0 1.3.8 2.4 2 2.8V10.2zm28 0v11.6c1.2-.4 2-1.5 2-2.8v-6c0-1.3-.8-2.4-2-2.8z" />
      </G>
    </Svg>
  );
};

export default Workout;
