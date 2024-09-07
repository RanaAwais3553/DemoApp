import { StyleSheet, View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as api from "../../api";

import { Button, Checkbox, Text as TextUI } from "../../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";

const Plan = ({ navigation, route }) => {
  const _id = route.params._id;
  const [isAgreeToTerms, setIsAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // move to payment screens
  // const GeneratePlan = useMutation({
  //   mutationFn: api.GeneratePlan,
  //   onSuccess: async (data) => {
  //     setIsLoading(false);
  //     console.log({ plan: data });
  //     console.log("plan generated");
  //     // navigation.navigate("PaymentScreen", { _id });
  //   },
  //   onError: (error) => {
  //     setIsLoading(false);
  //     console.log({ error });
  //   },
  // });

  const handleGeneretePlan = () => {
    // setIsLoading(true);
    navigation.navigate("PaymentScreen", { _id });
    //change this to pass only user id on the backend
    // GeneratePlan.mutateAsync({
    //   users: {
    //     _id,
    //     frequency: 3, //currently static
    //   },
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={{ alignItems: "center", gap: 6 }}>
          <TextUI
            label={"Great!"}
            size="xl_6"
            font="extrabold"
            style={{ textAlign: "center", color: "#6842FF" }}
          />
          <TextUI
            label={"Let's Workout!"}
            size="xl_5"
            font="extrabold"
            style={{ textAlign: "center", color: "#6842FF" }}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll_container}
          keyboardShouldPersistTaps="handled"
          decelerationRate="normal"
        >
          <View style={{ width: "100%" }}>
            <Text style={styles.heading}>FITSPACE APPLICATION</Text>
            <Text style={styles.heading}>TERMS AND CONDITIONS OF USE</Text>
            <Text style={styles.subHeading}>
              Welcome to FitSpace ("Application").
            </Text>
            <Text style={styles.paragraph}>
              These Terms and Conditions ("Terms") apply to the use of the
              FitSpace Application and all digital content, including any
              services or features accessible through the Application. By using
              this Application, you accept these Terms and the Privacy Policy.
            </Text>

            <Text style={styles.sectionHeading}>1. USE OF APPLICATION</Text>
            <Text style={styles.paragraph}>
              By purchasing and using the FitSpace Application, you agree to
              assume the risks and responsibilities associated with any use of
              the Application. You are responsible for reviewing the Terms and
              any content available on the Application.
            </Text>

            <Text style={styles.sectionHeading}>2. USER CONTENT</Text>
            <Text style={styles.paragraph}>
              Users are solely responsible for their content and use of the
              Application. By using the Application, you grant FitSpace
              permission to access and use any user-generated content. You agree
              that FitSpace is not liable for any user-generated content or
              actions on the Application.
            </Text>

            <Text style={styles.sectionHeading}>
              3. DISCLAIMER OF LIABILITY
            </Text>
            <Text style={styles.paragraph}>
              You understand that use of the Application is at your own risk.
              FitSpace is not responsible for any damages or injuries resulting
              from the use of the Application or any of the exercises or other
              content provided. You understand and acknowledge that any physical
              activity has associated risks, including the risk of personal
              injury or death.
            </Text>

            <Text style={styles.sectionHeading}>
              4. FITNESS INSTRUCTIONS AND ADVICE
            </Text>
            <Text style={styles.paragraph}>
              FitSpace may provide exercise instructions and advice, but they
              are for informational purposes only. You understand and
              acknowledge that the advice provided by FitSpace is not intended
              to replace professional medical advice, diagnosis or treatment.
              You are encouraged to consult with a physician before engaging in
              any fitness program.
            </Text>

            <Text style={styles.sectionHeading}>5. TERMS OF SALE</Text>
            <Text style={styles.paragraph}>
              a. Purchase of Digital Content: You agree that you are purchasing
              a subscription to access FitSpace digital content. Digital content
              is provided on a subscription basis and access may be limited
              based on the subscription you purchase.
            </Text>
            <Text style={styles.paragraph}>
              b. Payment Authorization: By making a purchase, you authorize
              FitSpace to charge your payment method for the purchase price and
              any other fees or charges related to your purchase.
            </Text>
            <Text style={styles.paragraph}>
              c. Cancellation of Subscription: You may cancel your subscription
              at any time. Any subscription fees paid are non-refundable.
            </Text>

            <Text style={styles.sectionHeading}>6. LAW AND JURISDICTION</Text>
            <Text style={styles.paragraph}>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of the State of Florida. Any disputes
              arising under or related to these Terms and Conditions shall be
              resolved in the courts of Miami-Dade County, Florida.
            </Text>

            <Text style={[styles.heading, { marginBottom: 16, marginTop: 24 }]}>
              FITSPACE APPLICATION WAIVER
            </Text>
            <Text style={styles.paragraph}>
              I acknowledge that I have voluntarily chosen to participate in a
              fitness program through the FitSpace Application. I understand
              that there are risks associated with exercise, including the risk
              of injury or death. I assume these risks and agree to hold
              FitSpace and its affiliates, officers, directors, employees, and
              agents harmless from any claim, demand, or damage, including
              reasonable attorneys' fees, arising out of or related to my use of
              the Application or any of the exercises provided by the
              Application.
            </Text>

            <Text style={styles.paragraph}>
              By using the FitSpace Application, I acknowledge that I have read
              and understood these Terms and that I agree to be bound by them.
            </Text>
          </View>
        </ScrollView>

        <Checkbox
          label="I agree to the terms and conditions"
          isChecked={isAgreeToTerms}
          onToggle={setIsAgreeToTerms}
        />

        <Button
          label={{ text: "Generate Workout Plan!", size: "xl" }}
          onPress={handleGeneretePlan}
          style={{ width: "100%" }}
          disabled={!isAgreeToTerms}
        />
      </View>
    </SafeAreaView>
  );
};

export default Plan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  scroll_container: {
    flexGrow: 1,
    width: "100%",
  },
  contents: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 48,
    paddingHorizontal: 24,
    gap: 32,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Montserrat_700Bold", // Heading font
    textAlign: "center",
  },
  subHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 32,
    fontFamily: "Montserrat_700Bold", // Sub-heading font
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "Montserrat_700Bold", // Section heading font
  },
  paragraph: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "Montserrat_400Regular", // Paragraph font
  },
});
