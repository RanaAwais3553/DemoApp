import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

const Facebook = ({ size = 24, ...props }) => {
  return (
    <Svg width={size} height="100%" viewBox="0 0 25 24" fill="none" {...props}>
      <G clipPath="url(#a)">
        <Path
          d="M12.5 0C5.872 0 .5 5.372.5 12s5.372 12 12 12 12-5.372 12-12-5.372-12-12-12Z"
          fill="url(#b)"
        />
        <Path
          d="M14.229 16.858h3.256l.512-3.308h-3.768v-1.81c0-1.374.449-2.592 1.734-2.592h2.066V6.262c-.363-.05-1.13-.156-2.581-.156-3.029 0-4.805 1.6-4.805 5.243v2.201H7.53v3.308h3.113v9.093c.616.092 1.241.155 1.882.155.58 0 1.146-.053 1.704-.128v-9.12Z"
          fill="#fff"
        />
      </G>
      <Defs>
        <LinearGradient
          id="b"
          x1={4.096}
          y1={3.596}
          x2={22.469}
          y2={21.969}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#2AA4F4" />
          <Stop offset={1} stopColor="#007AD9" />
        </LinearGradient>
        <ClipPath id="a">
          <Path fill="#fff" d="M.5 0h24v24H.5z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Facebook;
