import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
  Alert,
  Image,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../../hooks";

import {
  Button,
  Checkbox,
  InputField,
  Seperator,
  Text,
} from "../../components/ui";

import {
  Apple,
  Eye,
  Eyeoff,
  Facebook,
  Google,
  Lock,
  Message,
} from "../../components/icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {EXPO_PUBLIC_API_URL} from '@env'

const SSO_btn = [
  { name: "Facebook", icon: Facebook },
  { name: "Google", icon: Google },
  { name: "Apple", icon: Apple },
];

const Login = ({ navigation }) => {
  const iOSPlatform = Platform.OS === "ios";
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const { setUser } = useAuth();

  const UserLogin = useMutation({ mutationFn: api.UserLogin });
  const { data, error, isSuccess, isError, mutateAsync } = UserLogin;
console.log("error loggin API",error)
  const handleSignup = () => {
    navigation.navigate("SignupScreen");
  };

  const handleForgot = () => {
    navigation.navigate("EmailScreen");
  };

  const handleWebView = () => {
    navigation.navigate("WebviewScreen");
  };

  const handleSSO = (type) => {
    console.log({ sso: type });
  };
console.log("in login.js file env data is:$##@#@",EXPO_PUBLIC_API_URL,process.env.EXPO_PUBLIC_API_URL)
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const caseSensitiveEmail = values.email.toLowerCase();
        const newValues = { email: caseSensitiveEmail, password: values.password }
        mutateAsync(newValues);
        setIsLoading(true);
        setIsPasswordShown(false);
        console.log({ values });
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      setUser(data?.user?.data);
      console.log(`LoginData ${JSON.stringify(data?.user?.data?.email)}`);
      const timer = setTimeout(() => {
        if(data?.user?.data?.email == 'admin@gmail.com'){ 
        navigation.navigate("AdminDashboardScreens");
        }else{
          navigation.navigate("NavigationScreens");
        }
      }, 3000); // Delay of 3 seconds (3000 milliseconds)
  
      return () => clearTimeout(timer); // Clear timeout if component unmounts
    } else if (isError) {
      console.log({ ff: error.response?.data });

      if (error.response?.data?.message === "Wrong credentials") {
        Alert.alert("Invalid Credentials", "Wrong email or password!", [
          {
            text: "OK",
            onPress: () => formik.setStatus("Wrong email or password"),
          },
        ]);
      }
    }

    setIsLoading(false);
  }, [isSuccess, isError, data, error]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardShown(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardShown(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#ffffff", flex: 1 }}
      // edges={["right", "left", "bottom"]}
    >
      <StatusBar hidden={false} />
      <KeyboardAwareScrollView style={{marginTop:58}} bounces={false}  showsVerticalScrollIndicator={false}>
        <View style={[styles.box]}>
          <View
            style={[
              styles.logo_container,
              
            ]}
          >
            <Image style={styles.logo} source={{uri:'https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/logo-black.png'}} />
          </View>
          <Text label="Login to your Account" size="xl_6" font="bold" />

          <InputField
            icons={{
              left: { icon: Message, size: 20, color: "#9E9E9E" },
            }}
            placeholder="email"
            value={formik.values.email}
            onChangeText={formik.handleChange("email")}
            onFieldBlur={() => formik.setFieldTouched("email", true)}
            onFieldFocus={() => formik.setFieldTouched("email", false)}
            error={
              Boolean(formik.errors.email) && formik.touched.email
                ? formik.errors.email
                : formik.status === "Wrong email or password"
                ? formik.status
                : null
            }
          />
          <InputField
            icons={{
              left: { icon: Lock, size: 20, color: "#9E9E9E" },
              right: {
                icon: isPasswordShown ? Eye : Eyeoff,
                size: 26,
                onPress: () => setIsPasswordShown(!isPasswordShown),
              },
            }}
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange("password")}
            onFieldBlur={() => formik.setFieldTouched("password", true)}
            onFieldFocus={() => formik.setFieldTouched("password", false)}
            showPassword={!isPasswordShown}
            error={
              Boolean(formik.errors.password) && formik.touched.password
                ? formik.errors.password
                : formik.status === "Wrong email or password"
                ? formik.status
                : null
            }
          />

          {/* <View style={{ paddingHorizontal: 4 }}>
              <Checkbox
                label="Remember me"
                isChecked={isChecked}
                onToggle={handleToggle}
                color="#616161"
              />
            </View> */}

          <Button
            label={{
              text: "Login",
              size: "xl",
              style: { textTransform: "uppercase" },
            }}
            onPress={formik.handleSubmit}
            disabled={isLoading}
          />

          {false && (
            <Seperator label="or continue with" size="lg" color="#E0E0E0" />
          )}
          {false && (
            <View style={styles.sso_container}>
              {SSO_btn.map((sso, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  onPress={() => handleSSO(sso.name)}
                  style={styles.sso_btn}
                >
                  <sso.icon size={29} />
                </Button>
              ))}
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
      <View >
        <View style={{ flexDirection: 'row', justifyContent: "center" }}>
          <Text
          label={"Don't have an account? "}
          size="sm"
          font="semibold"
          style={{ color: "#9E9E9E" }}
          />
          <TouchableOpacity activeOpacity={0.45} onPress={handleSignup}>
            <Text
            label="Sign up"
            size="sm"
            font="bold"
            style={{ color: "#6842FF" }}
            />
          </TouchableOpacity>
        </View>
      
        <View style={{ flexDirection: 'row', justifyContent: "center", marginTop: 4, marginBottom: 10 }}>
          <Text
          label={"Forgot Password? "}
          size="sm"
          font="semibold"
          style={{ color: "#9E9E9E" }}
          />

          <TouchableOpacity activeOpacity={0.45} onPress={handleForgot}>
            <Text
            label="Reset Password"
            size="sm"
            font="bold"
            style={{ color: "#6842FF" }}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity activeOpacity={0.45} onPress={handleWebView}>
            <Text
            label="Webview"
            size="sm"
            font="bold"
            style={{ color: "#6842FF" }}
            />
          </TouchableOpacity> */}
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "red",
    height: "100%",
    gap: 24,
  },
  box: {
    gap: 24,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignContent: "center",
  },
  logo_container: {
    width: "100%",
    height: 100,
  },
  logo: {
    height: "75%",
    width: "75%",
    alignSelf: "center",
    flex: 1,
  },
  sso_container: {
    flexDirection: "row",
    justifyContent: "center",
    columnGap: 20,
  },
  sso_btn: { width: 88, borderRadius: 16 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 24,
  },
  iconStyle: {
    width: 30, // Set your desired width
    height: 30, // Set your desired height
    marginRight: 8,
  },
  buttonStyle: {
    marginVertical: 10, // Adjust this value to control the vertical spacing between buttons
  },
  buttonTextStyle: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 4,
  },
});
