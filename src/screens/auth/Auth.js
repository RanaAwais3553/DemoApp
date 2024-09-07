import { StyleSheet, View, TouchableOpacity, Image,StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, Seperator, Text } from "../../components/ui";
import { Apple, Facebook, Google } from "../../components/icons";
import Logo from "../../components/image/logo-black.png";
import { useMutation } from "@tanstack/react-query";
import * as api from "../../api";

const SSO_btn = [
  { name: "Facebook", icon: Facebook },
  { name: "Google", icon: Google },
  { name: "Apple", icon: Apple },
];

const Auth = ({ navigation, route }) => {
  const ApiTest = useMutation({ mutationFn: api.ApiTest });

  const handleSSOLogin = (type) => {
    console.log({ sso: type });
    ApiTest.mutateAsync();
    console.log({ api: process.env.EXPO_PUBLIC_API_URL });
    //bypass auth screen for dev
    // navigation.navigate("NavigationScreens");
  };

  console.log({ data: ApiTest?.data });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar hidden={false} />
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.logo_container}>
              <Image style={styles.logo} source={require('../../components/image/logo-black.png')} />
            </View>
            {false && (
              <View style={styles.sso_container}>
                {SSO_btn.map((sso, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="icon"
                    onPress={() => handleSSOLogin(sso.name)}
                    style={styles.sso_btn}
                  >
                    <sso.icon size={29} />
                    <Text
                      label={`Continue with ${sso.name}`}
                      font="semibold"
                      style={{ paddingLeft: 12 }}
                    />
                  </Button>
                ))}
              </View>
            )}
            {false && (
              <View style={{ paddingVertical: 12 }}>
                <Seperator label="or" size="lg" color="#E0E0E0" />
              </View>
            )}

            <Button
              label={{
                text: "Email Login",
                size: "lg",
              }}
              onPress={() => navigation.navigate("LoginScreen")}
            />
          </View>

          <View style={styles.footer}>
            <Text
              label={"Don't have an account? "}
              size="sm"
              font="semibold"
              style={{ color: "#9E9E9E" }}
            />
            <TouchableOpacity
              activeOpacity={0.45}
              onPress={() => navigation.navigate("SignupScreen")}
            >
              <Text
                label="Sign up"
                size="sm"
                font="bold"
                style={{ color: "#6842FF" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#ffffff",
    paddingBottom: 24,
    height: "100%",
    gap: 24,
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
  box: {
    gap: 28,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignContent: "center",
    flexGrow: 1,
  },
  sso_container: {
    justifyContent: "center",
    rowGap: 20,
  },
  sso_btn: { width: "100%", borderRadius: 16 },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 14,
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
