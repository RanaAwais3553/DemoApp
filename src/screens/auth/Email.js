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
  } from "react-native";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useEffect, useState } from "react";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import * as api from "../../api";
  import { useMutation } from "@tanstack/react-query";  
  
  import {
    Button,
    Checkbox,
    InputField,
    Seperator,
    Text,
  } from "../../components/ui";
  
  import {
    Eye,
    Eyeoff,
    Lock,
    Message,
  } from "../../components/icons";
  
  import Logo from "../../components/image/logo-black.png";

  
  const Email = ({ navigation }) => {

    const iOSPlatform = Platform.OS === "ios";
    const [isLoading, setIsLoading] = useState(false);
    const [isKeyboardShown, setIsKeyboardShown] = useState(false);
    const UserEmail = useMutation({ mutationFn: api.UserEmail });
    const { data, error, isSuccess, isError, mutateAsync } = UserEmail;

    const handleConfirm = () => {
        navigation.navigate("ConfirmScreen");
    };
  
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    });
  
    const formik = useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          mutateAsync(values);
          setIsLoading(true);
          console.log({ values });
        } catch (error) {
          console.log(error);
        }
      },
    });
  
    useEffect(() => {
      if (isSuccess) {
        // formik.resetForm();
        navigation.navigate("ConfirmScreen", { userEmail: formik.values.email } );
      } else if (isError) {
        console.log({ ff: error.response?.data });
  
        if (error.response?.data?.message === "Wrong email") {
          Alert.alert("Invalid Credentials", "Wrong email!", [
            {
              text: "OK",
              onPress: () => formik.setStatus("Wrong email"),
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
          <View style={[styles.box, { marginTop: isKeyboardShown ? 48 : 0 }]}>
            {/* <View
              style={[
                styles.logo_container,
                { display: isKeyboardShown ? "none" : "flex" },
              ]}
            >
              <Image style={styles.logo} source={Logo} />
            </View> */}
            <Text label="Forgot Password" size="xl_6" font="bold" />
  
            <InputField
              icons={{
                left: { icon: Message, size: 20, color: "#9E9E9E" },
              }}
              placeholder="Enter Your Email"
              value={formik.values.email}
              onChangeText={formik.handleChange("email")}
              onFieldBlur={() => formik.setFieldTouched("email", true)}
              onFieldFocus={() => formik.setFieldTouched("email", false)}
              error={
                Boolean(formik.errors.email) && formik.touched.email
                  ? formik.errors.email
                  : formik.status === "Wrong email"
                  ? formik.status
                  : null
              }
            />
  
            <Button
              label={{
                text: "Submit",
                size: "xl",
                style: { textTransform: "uppercase" },
              }}
              onPress={formik.handleSubmit}
              // onPress={handleConfirm}
              disabled={isLoading}
            />
  
          </View>
          </ScrollView>

      </SafeAreaView>
    );
  };
  
  export default Email;
  
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
      height: 125,
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
  