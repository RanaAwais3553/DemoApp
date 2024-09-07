import { Svg, Path, G } from "react-native-svg";

const About = ({ size = 24, color = "#212121", ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M22.792 12c0 8.093-2.699 10.791-10.792 10.791S1.21 20.093 1.21 11.999C1.209 3.906 3.907 1.208 12 1.208s10.792 2.698 10.792 10.791Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 16.544V12m.005-4.083h-.01"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default About;
