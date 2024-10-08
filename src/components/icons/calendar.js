import { Svg, Path, G } from "react-native-svg";

const Calendar = ({ size = 24, color = "#212121", ...props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={"100%"}
      viewBox="0 0 20 22"
      fill="none"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.666 8.904H.843a.75.75 0 0 1 0-1.5h17.823a.75.75 0 0 1 0 1.5Zm-4.465 3.906a.754.754 0 0 1-.754-.75c0-.414.331-.75.745-.75h.01a.75.75 0 0 1 0 1.5Zm-4.437 0a.754.754 0 0 1-.754-.75c0-.414.33-.75.745-.75h.009a.75.75 0 0 1 0 1.5Zm-4.447 0a.755.755 0 0 1-.755-.75c0-.414.332-.75.746-.75h.009a.75.75 0 0 1 0 1.5Zm8.884 3.886a.754.754 0 0 1-.754-.75c0-.414.331-.75.745-.75h.01a.75.75 0 0 1 0 1.5Zm-4.437 0a.754.754 0 0 1-.754-.75c0-.414.33-.75.745-.75h.009a.75.75 0 0 1 0 1.5Zm-4.447 0a.755.755 0 0 1-.755-.75c0-.414.332-.75.746-.75h.009a.75.75 0 0 1 0 1.5Zm8.476-11.905a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v3.291a.75.75 0 0 1-.75.75Zm-8.078 0a.75.75 0 0 1-.75-.75V.75a.75.75 0 0 1 1.5 0v3.291a.75.75 0 0 1-.75.75Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.521 3.08C2.928 3.08 1.5 4.461 1.5 6.972v9.05C1.5 18.587 2.928 20 5.521 20h8.458C16.572 20 18 18.614 18 16.098V6.973c.004-1.235-.328-2.195-.987-2.855-.678-.68-1.723-1.039-3.025-1.039H5.521Zm8.458 18.42H5.521C2.116 21.5 0 19.401 0 16.022V6.973C0 3.645 2.116 1.58 5.521 1.58h8.467c1.709 0 3.122.512 4.087 1.48.937.94 1.43 2.293 1.425 3.916v9.123c0 3.332-2.116 5.402-5.521 5.402Z"
        fill={color}
      />
    </Svg>
  );
};

export default Calendar;
