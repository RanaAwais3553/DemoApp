import {
  Svg,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const SignupSuccess = ({ width = 186, height = 180, ...props }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 186 180"
      fill="none"
      {...props}
    >
      <Circle cx={95.5} cy={90.5} r={70.5} fill="url(#a)" />
      <Circle cx={178.467} cy={27.5} r={7.5} fill="#A48EFF" />
      <Circle cx={20.033} cy={10} r={10} fill="#A48EFF" />
      <Circle cx={10.033} cy={133} r={5} fill="#A48EFF" />
      <Circle cx={165.533} cy={160.5} r={2.5} fill="#A48EFF" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M84.855 65.917h21.314c8.333 0 13.914 5.851 13.914 14.554v20.087c0 8.675-5.581 14.526-13.914 14.526H84.855c-8.334 0-13.939-5.851-13.939-14.526V80.471c0-8.703 5.605-14.554 13.939-14.554Zm9.243 31.934 11.677-11.677c.836-.836.836-2.188 0-3.049a2.166 2.166 0 0 0-3.048 0L92.574 93.279l-4.302-4.302a2.166 2.166 0 0 0-3.049 0c-.835.836-.835 2.188 0 3.049l5.851 5.826a2.1 2.1 0 0 0 1.5.615c.565 0 1.106-.197 1.524-.615Z"
        fill="#fff"
      />
      <Circle cx={106.533} cy={4.5} r={2.5} fill="#A48EFF" />
      <Circle cx={62.533} cy={176.5} r={3.5} fill="#A48EFF" />
      <Circle cx={122.033} cy={171} r={1} fill="#A48EFF" />
      <Circle cx={170.533} cy={110.5} r={2.5} fill="#A48EFF" />
      <Circle cx={1.033} cy={75} r={1} fill="#A48EFF" />
      <Defs>
        <LinearGradient
          id="a"
          x1={166}
          y1={161}
          x2={-1.777}
          y2={112.355}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#6842FF" />
          <Stop offset={1} stopColor="#896BFF" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SignupSuccess;
