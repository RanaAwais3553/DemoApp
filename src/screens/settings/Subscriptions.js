import { Alert, Platform, StyleSheet, View, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useAuth } from "../../hooks";
import { useMutation } from "@tanstack/react-query";
import * as api from "../../api";

import { usePaymentSheet } from "@stripe/stripe-react-native";

import { Button, Text } from "../../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import YooMoneyCheckoutForm from "./YooMoneyCheckoutForm";
// import * as Localization from 'expo-localization';

const PaymentType = [
  {
    label: "Monthly",
    amount: 19.99,
    value: "month",
    des:"Pay once, cancel any time."
  },
  {
    label: "Yearly",
    amount: 99.99,
    value: "year",
    des:"Yearly subscription includes access to all of our content. Pay once, cancel any time."
  },
];

const Checkbox = ({ isChecked }) => {
  return (
    <View
      style={[
        styles.checkbox,
        {
          backgroundColor: isChecked ? "#6842FF" : "transparent",
          borderColor: isChecked ? "#6842FF" : "#BDBDBD",
        },
      ]}
    >
      {isChecked && <View style={styles.checkmark} />}
    </View>
  );
};

const Subscriptions = ({ navigation, route }) => {
  // let [locale, setLocale] = useState(Localization.getLocales());
  // console.log(locale[0].regionCode);
  const _id = route?.params?._id;
  const plan =
    route?.params?.payment !== "trial" ? route?.params?.payment : null;
  const iOS = Platform.OS === "ios";
  const { setUser, user } = useAuth();
  const [paymentPlan, setPaymentPlan] = useState(plan);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubsLoading, setSubsLoading] = useState(false);
  const [yooCheckoutForm, setYooCheckoutForm] = useState(false);

  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();

  const SubscriptionIntent = useMutation({
    mutationFn: api.SubscriptionIntent,
    onSuccess: async (data, variables) => {
      console.log({ data });
      handleStripePay(data);
    },
    onError: () => {
      Alert.alert(`Payment Failed`, "Oh no, something went wrong!", [
        {
          text: "Ok",
          onPress: () => {
            setSubsLoading(false);
            setIsLoading(false);
          },
        },
      ]);
    },
  });

  //Credit card payment
  const Subscribe = useMutation({
    mutationFn: api.Subscribe,
    onSuccess: async (data, variables) => {
      console.log({ data });
      Alert.alert("Payment Success", "Your payment was succesful");
      UserUpdate.mutateAsync({ _id, paymentSchedule: paymentPlan });
    },
    onError: () => {
      Alert.alert(
        `Payment Failed`,
        "Please check you card status, and try again later.",
        [
          {
            text: "Ok",
            onPress: () => {
              setSubsLoading(false);
              setIsLoading(false);
            },
          },
        ]
      );
    },
  });

  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onMutate: (variables) => console.log({ variables }),
    onSuccess: async (data) => {
      console.log({ useraaa: data });
      setUser(data);
      setSubsLoading(false);
      navigation.goBack();
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const UserUpdate = useMutation({
    mutationFn: api.UserUpdate,
    onSuccess: async (data) => {
      console.log({ upddd: data });
      GetUser.mutateAsync(data._id);
    },
  });

  const handlePaymentUI = async (setupId) => {
    const { error } = await presentPaymentSheet();

    if (error) {
      if (error.code === "Canceled") {
        Alert.alert(`Payment Canceled`, error.message);
      } else {
        Alert.alert(`${error.code}`, error.message);
      }
      setSubsLoading(false);
      setIsLoading(false);
    } else {
      Subscribe.mutateAsync({ _id, setupId, plan: paymentPlan });
    }
  };

  const handleStripePay = async (data) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Fit Space",
      customerId: data.customer,
      customerEphemeralKeySecret: data.ephemeralKey,
      setupIntentClientSecret: data.paymentIntent,
      allowsDelayedPaymentMethods: true,
      returnURL: "stripe-example://stripe-redirect",
      applePay: {
        merchantCountryCode: "US",
        cartItems: [
          {
            label: `${
              PaymentType.find((type) => type.value === paymentPlan).label
            } Plan`,
            amount: PaymentType.find(
              (type) => type.value === paymentPlan
            ).amount.toString(),
            paymentType: "Recurring",
            intervalCount: 1,
            intervalUnit: PaymentType.find((type) => type.value === paymentPlan)
              .value,
          },
        ],
        buttonType: 7,
        currencyCode: "USD",
      },
      googlePay: {
        merchantCountryCode: "US",
        testEnv: true,
        currencyCode: "usd",
        amount: PaymentType.find(
          (type) => type.value === paymentPlan
        ).amount.toString(),
        label: `${
          PaymentType.find((type) => type.value === paymentPlan).label
        } Plan`,
      },
      primaryButtonLabel: "Subscribe",
    });

    if (error) {
      Alert.alert(error.code, error.localizedMessage);
      setSubsLoading(false);
      setIsLoading(false);
    } else {
      console.log(JSON.stringify(data.paymentIntent, null, 2));
      handlePaymentUI(data.setupId);
    }
  };

  const handleSubmit = async () => {
    try {
      if (paymentPlan !== "trial") {
        console.log("paymnet initiated");
        SubscriptionIntent.mutateAsync({ _id });
      } else {
        UserUpdate.mutateAsync({ _id, paymentSchedule: paymentPlan });
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("execute the rest of the codes");
      setIsLoading(true);
      setSubsLoading(true);
    }
  };


  handleYooCheckoutFormData = (data) => {
    console.log("Data received from child:", data);
    if(data == 'close') {
      setYooCheckoutForm(false);
    }
    if(data && data != 'close') {
      console.log("paymnet initiated");
      PayloadYoomoney.mutateAsync({ userId:_id, token: data, plan: paymentPlan });
    }
  }

  //Credit card payment for YooMoney
  const PayloadYoomoney = useMutation({
    mutationFn: api.PayloadYoomoney,
    onSuccess: async (data, variables) => {
      console.log({ data });
      // console.log({variables});
      // Alert.alert("Payment Success", "Your payment was succesful");
      UserUpdate.mutateAsync({ _id, paymentSchedule: paymentPlan });
    },
    onError: () => {
      Alert.alert(
        `Payment Failed`,
        "Please check you card status, and try again later."
      );
      setIsLoading(false);
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            marginTop: 4,
          }}
          disabled={isSubsLoading}
        >
          <ArrowLeft color="black" size={28} />
        </Pressable>
      ),
    });
  }, [navigation]);

  const selectPaymentMethod = ()=>{
    // if (locale.length > 0 && locale[0].regionCode == 'RU') {  
      if (false) {        
      setYooCheckoutForm(true);
    } else {
      handleSubmit();
    } 
  }

  return (
    <>
    { yooCheckoutForm ? (
      <YooMoneyCheckoutForm onDataReceived={handleYooCheckoutFormData}/>
      ):(
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <View style={{ alignItems: "center", gap: 6 }}>
          <Text
            label={`${plan ? "Change" : "Choose"} your payment plan`}
            size="xl_4"
            font="semibold"
            style={{ textAlign: "center", width: 250 }}
          />
          <Text
            label={"Enjoy workout access without ads and restrictions."}
            font="medium"
            style={{ textAlign: "center", lineHeight: 24 }}
          />
          {/* <View style={styles.subs}>
            <Text
              label={`${plan ? `${plan}ly Premium` : "7 days trial"}`}
              size="base"
              font="bold"
              style={{
                textAlign: "center",
                color: "#fff",
                textTransform: "uppercase",
              }}
            />
          </View> */}
        </View>

        <View style={styles.btn_select}>
          {PaymentType.map((item, i) => (
            <Button
              key={i}
              onPress={() => setPaymentPlan(item.value)}
              variant="outline"
              style={[
                styles.goal_btn,
                {
                  borderColor:
                    paymentPlan === item.value ? "#6842FF" : "#BDBDBD",
                },
              ]}
              disabled={isSubsLoading}
            >
              <Checkbox isChecked={paymentPlan === item.value} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View style={{width:"75%", textAlign: "left"}}>
                  <Text
                    label={item.label}
                    size="lg"
                    font="bold"
                    style={{
                      color: paymentPlan === item.value ? "#6842FF" : "#BDBDBD",
                    }}
                  />
                  <Text
                    label={item.des}
                    size="sm"
                    font="medium"
                    style={{
                      color: paymentPlan === item.value ? "#6842FF" : "#BDBDBD",
                    }}
                  />
                </View>
                <Text
                  label={item.amount !== 0 ? `$${item.amount} ` : "Free"}
                  font="bold"
                  style={{
                    color: paymentPlan === item.value ? "#6842FF" : "#BDBDBD", width : "25%", textAlign: "right"
                  }}
                />
              </View>
            </Button>
          ))}
        </View>

        {/* <Button
          label={{ text: "Subscribe", size: "xl" }}
          onPress={handleSubmit}
          style={{ width: "100%" }}
          disabled={
            !paymentPlan || isLoading || route?.params?.payment === paymentPlan
          }
        /> */}

        <Button
          label={{ text: "Subscribe", size: "xl" }}
          onPress={()=> selectPaymentMethod() }
          style={{ width: "100%" }}
        />

      </View>
    </SafeAreaView>
    )}
    </>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contents: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  btn_select: { width: "100%", alignItems: "center", gap: 15 },
  goal_btn: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 12,
    gap: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: "#6842FF",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  checkmark: {
    position: "absolute",
    borderColor: "#ffffff",
    borderWidth: 3,
    width: 18,
    height: 18,
    borderRadius: 50,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  subs: {
    backgroundColor: "#6842FF",
    borderColor: "#6842FF",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderWidth: 2,
    marginTop: 12,
  },
});
