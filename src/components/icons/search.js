import { Svg, Path, G, Circle } from "react-native-svg";

const Search = ({ size = 24, color = "#212121", ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      <G id="Iconly/Light/Search">
        <G id="Search">
          <Circle
            id="Ellipse_739"
            cx="11.7666"
            cy="11.7666"
            r="8.98856"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            id="Line_181"
            d="M18.0183 18.4852L21.5423 22.0001"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </G>
      </G>
    </Svg>
  );
};

export default Search;
