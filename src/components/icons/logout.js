import { Svg, Path, G } from "react-native-svg";

const Logout = ({ size = 24, color = "#212121", ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={"100%"}
      viewBox="0 0 26 24"
      fill="none"
      {...props}
    >
      <Path
        d="M24.423 12.141H10.375m10.633-3.403 3.416 3.402-3.416 3.402m-2.922-8.641c-.385-4.176-1.948-5.693-8.166-5.693-8.285 0-8.285 2.695-8.285 10.792 0 8.096 0 10.791 8.285 10.791 6.218 0 7.781-1.516 8.166-5.693"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Logout;
