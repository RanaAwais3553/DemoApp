import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
  Alert,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { wait } from "../../helpers";
import { Button, InputField, Seperator, Text } from "../../components/ui";

import {
  Eye,
  Eyeoff,
  Lock,
  Message,
  SignupSuccess,
  User,
} from "../../components/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowRight, Pin } from "lucide-react-native";
import { useRoute } from '@react-navigation/native';


const Signup = ({ navigation }) => {

  const route = useRoute();
  const { userEmail } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const iOSPlatform = Platform.OS === "ios";
  const UserConfirm = useMutation({ mutationFn: api.UserConfirm });
  const { data, error, isSuccess, isError, mutateAsync } = UserConfirm;

  // console.log(userEmail);

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

  const validationSchema = Yup.object({
    token: Yup.string()
      .min(6, "Pin must be at least 6 characters long")
      .required("Pin is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    confirm_password: Yup.string()
      .min(6, "Confirm Password must be at least 6 characters long")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email:userEmail,
      token: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      try {
        mutateAsync(values);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
    console.log("submit");
  };

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
      navigation.navigate("LoginScreen");
    } else if (isError) {
      console.log({ error });

      if (error.response?.data?.message === "email already in use") {
        Alert.alert("Registration Failed!", "Email is already registered!", [
          {
            text: "OK",
            onPress: () => formik.setStatus("Email is already registered"),
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
            <Text label="Create your Password" size="xl_6" font="bold" />
            <>

              <InputField
                placeholder="Pin"
                icons={{
                  left: { icon: Pin, size: 20, color: "#9E9E9E" },
                }}
                value={formik.values.token}
                onChangeText={formik.handleChange("token")}
                error={
                  Boolean(formik.errors.token) && formik.touched.token
                    ? formik.errors.token
                    : null
                }
                onFieldBlur={() => formik.setFieldTouched("token", true)}
                onFieldFocus={() => formik.setFieldTouched("token", false)}
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

              <InputField
                placeholder="Confirm Password"
                icons={{
                  left: { icon: Lock, size: 20, color: "#9E9E9E" },
                  right: {
                    icon: isConfirmPasswordShown ? Eye : Eyeoff,
                    size: 26,
                    onPress: () => setIsConfirmPasswordShown(!isConfirmPasswordShown),
                  },
                }}
                showPassword={!isConfirmPasswordShown}
                value={formik.values.confirm_password}
                onChangeText={formik.handleChange("confirm_password")}
                error={
                  Boolean(formik.errors.confirm_password) && formik.touched.confirm_password
                    ? formik.errors.confirm_password
                    : null
                }
                onFieldBlur={() => formik.setFieldTouched("confirm_password", true)}
                onFieldFocus={() => formik.setFieldTouched("confirm_password", false)}
              />

            </>

            <Button
              label={{
                text: "Create Password",
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

});
