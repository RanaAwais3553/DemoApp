import { Svg, Path } from "react-native-svg";

const Message = ({ size = 24, color = "#212121", ...props }) => {
  return (
    <Svg width={size} height="100%" viewBox="0 0 18 15" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.116 0a4.214 4.214 0 0 1 4.218 4.208v6.584A4.215 4.215 0 0 1 13.116 15H4.884a4.214 4.214 0 0 1-4.217-4.208V4.208A4.209 4.209 0 0 1 4.884 0h8.232Zm1.326 5.45.067-.067a.644.644 0 0 0-.01-.833.7.7 0 0 0-.44-.217.633.633 0 0 0-.468.167l-3.757 3c-.484.4-1.176.4-1.667 0l-3.75-3a.634.634 0 0 0-.833.058.637.637 0 0 0-.06.834l.11.108 3.791 2.958a2.62 2.62 0 0 0 3.258 0l3.759-3.008Z"
        fill={color}
      />
    </Svg>
  );
};

export default Message;
