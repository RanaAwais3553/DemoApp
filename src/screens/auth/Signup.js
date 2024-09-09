import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
  Alert,
  Image,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";

import { wait } from "../../helpers";

import { useAuth } from "../../hooks";

import { Button, InputField, Seperator, Text } from "../../components/ui";

import {
  Apple,
  Eye,
  Eyeoff,
  Facebook,
  Google,
  Lock,
  Message,
  SignupSuccess,
  User,
} from "../../components/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight } from "lucide-react-native";
import {EXPO_PUBLIC_API_URL} from '@env'

const SSO_btn = [
  { name: "facebook", icon: Facebook },
  { name: "google", icon: Google },
  { name: "apple", icon: Apple },
];

const Signup = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [isButtonShown, setIsButtonShown] = useState(false);
  const [form, setForm] = useState(1);
  const iOSPlatform = Platform.OS === "ios";

  const UserSignup = useMutation({ mutationFn: api.UserSignup });
  const { data, error, isSuccess, isError, mutateAsync } = UserSignup;

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
  console.log("API_BASE in component",process.env.EXPO_PUBLIC_API_URL,EXPO_PUBLIC_API_URL)
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "First name must be at least 3 characters long")
      .required("First name is required"),
    surname: Yup.string()
      .min(3, "Last name must be at least 3 characters long")
      .required("Last name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .matches(
        /^[a-zA-Z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        const caseSensitiveEmail = values.email.toLowerCase();
        const newValues = {...values, email: caseSensitiveEmail, password: values.password }
        console.log("mutation",newValues)
        mutateAsync(newValues);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
    setIsButtonShown(true); 
    console.log("submit");
  };

  const handleOnboarding = () => {
    formik.resetForm();
    navigation.navigate("OnboardingScreens", {
      screen: "GenderScreen",
      params: { _id: data?.user._id },
    });
    wait(500).then(() => setIsModalShown(false));
  };

  useEffect(() => {
    console.log("error status is:#@#@",isError)
    if (isSuccess) {
      setIsModalShown(true);
    } else if (isError) {
      console.log("error in useeffect",error.response?.data?.message);

      if (error.response?.data?.message === "email already in use") {
        Alert.alert("Registration Failed!", "Email is already registered!", [
          {
            text: "OK",
            onPress: () => {
              formik.setStatus("Email is already registered");
              formik.setErrors(false)
            },
          },
        ]);
      }
    }

    setIsLoading(false);
  }, [isSuccess, isError, data, error]);

  return (
    <SafeAreaView
      style={{ backgroundColor: "#ffffff", flex: 1, position: "relative" }}
      edges={["right", "left", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingTop: 24,
          paddingBottom: iOSPlatform && isKeyboardShown ? 275 : 48,
        }}
        keyboardShouldPersistTaps="handled"
        decelerationRate="normal"
        showsVerticalScrollIndicator={false}
        scrollEnabled={isKeyboardShown}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <Text label="Create your Account" size="xl_6" font="bold" />
            <>
              <InputField
                placeholder="First name"
                icons={{
                  left: { icon: User, size: 20, color: "#9E9E9E" },
                }}
                value={formik.values.name}
                onChangeText={formik.handleChange("name")}
                onFieldBlur={() => formik.setFieldTouched("name", true)}
                error={
                  Boolean(formik.errors.name) && formik.touched.name
                    ? formik.errors.name
                    : null
                }
                onFieldFocus={() => formik.setFieldTouched("name", false)}
              />
              <InputField
                placeholder="Last name"
                icons={{
                  left: { icon: User, size: 20, color: "#9E9E9E" },
                }}
                value={formik.values.surname}
                onChangeText={formik.handleChange("surname")}
                error={
                  Boolean(formik.errors.surname) && formik.touched.surname
                    ? formik.errors.surname
                    : null
                }
                onFieldBlur={() => formik.setFieldTouched("surname", true)}
                onFieldFocus={() => formik.setFieldTouched("surname", false)}
              />
              <InputField
                placeholder="Email"
                icons={{
                  left: { icon: Message, size: 20, color: "#9E9E9E" },
                }}
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                error={
                  Boolean(formik.errors.email) && formik.touched.email
                    ? formik.errors.email
                    : formik.status === "Email is already registered"
                    ? formik.status
                    : null
                }
                onFieldBlur={() => formik.setFieldTouched("email", true)}
                onFieldFocus={() => formik.setFieldTouched("email", false)}
              />
              <InputField
                placeholder="Password"
                icons={{
                  left: { icon: Lock, size: 20, color: "#9E9E9E" },
                  right: {
                    icon: isPasswordShown ? Eye : Eyeoff,
                    size: 26,
                    onPress: () => setIsPasswordShown(!isPasswordShown),
                  },
                }}
                showPassword={!isPasswordShown}
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                error={
                  Boolean(formik.errors.password) && formik.touched.password
                    ? formik.errors.password
                    : null
                }
                onFieldBlur={() => formik.setFieldTouched("password", true)}
                onFieldFocus={() => formik.setFieldTouched("password", false)}
              />
            </>
{/* 
            { isButtonShown && (
                <Text label="Button Pressed" size="xl_6" font="bold" />
            )} */}
           
            <Button
              label={{
                text: "Sign up",
                size: "xl",
                style: { textTransform: "uppercase" },
              }}
              onPress={handleSubmit}
              disabled={isLoading}
              style={{ marginTop: 10 }}
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
                    onPress={() => console.log({ sso: sso.name })}
                    style={styles.sso_btn}
                  >
                    <sso.icon size={29} />
                  </Button>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text
          label={"Already have an account? "}
          size="sm"
          font="semibold"
          style={{ color: "#9E9E9E" }}
        />
        <TouchableOpacity
          activeOpacity={0.45}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text
            label="Sign in"
            size="sm"
            font="bold"
            style={{ color: "#6842FF" }}
          />
        </TouchableOpacity>
      </View>

      <Modal animationType="fade" visible={isModalShown} transparent={true}>
        <View style={styles.modal_container}>
          <View style={styles.modal}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 24,
                  gap: 24,
                }}
              >
                <SignupSuccess size={34} color="#ffffff" />
                <Text
                  label="Congratulations"
                  size="xl_4"
                  font="bold"
                  style={{ color: "#6842FF" }}
                />
                <Text
                  label="Your account was registered, please proceed to onboarding to generate your workout plan!"
                  font="medium"
                  style={{
                    textAlign: "center",
                  }}
                />
              </View>

              <Button
                onPress={handleOnboarding}
                style={{ marginTop: 10, width: "100%" }}
              >
                <Text
                  label="Onboarding"
                  size="xl"
                  font="bold"
                  style={{
                    color: "#ffffff",
                    textTransform: "uppercase",
                    paddingRight: 6,
                  }}
                />
                <ArrowRight color="white" size={28} />
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#ffffff",
    height: "100%",
    gap: 24,
  },
  box: {
    gap: 24,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignContent: "center",
    flexGrow: 1,
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
  vector: {
    height: "75%",
    width: "75%",
    alignSelf: "center",
    padding: 12,
  },
  modal: {
    position: "absolute",
    zIndex: 25,
    flex: 1,
    top: "20%",
    bottom: "20%",
    left: 4,
    right: 4,
    height: 480,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    position: "relative",
  },
});
