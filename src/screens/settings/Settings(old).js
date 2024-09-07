import { StyleSheet, View, Alert, Image, Modal } from "react-native";
import React, { useState } from "react";

import { Button, Text } from "../../components/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks";
import button_icon from "../../../assets/splash.png";
import {
  PlatformPay,
  usePlatformPay,
  useStripe,
  usePaymentSheet,
} from "@stripe/stripe-react-native";
import { useMutation } from "@tanstack/react-query";
import * as api from "../../api";

// const PaymentMethods = () => {
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [addingPaymentMethod, setAddingPaymentMethod] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState({
//     type: '', // 'paypal' or 'creditCard'
//     cardNumber: '',
//     expiryDate: '',
//     cardName: '',
//     cvv: '',
//   });
//   const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();

//   const addPaymentMethod = () => {
//     if (paymentMethod.type === 'paypal' || (paymentMethod.type === 'creditCard' && validateCreditCard())) {
//       setPaymentMethods([...paymentMethods, paymentMethod]);
//       setPaymentMethod({
//         type: '',
//         cardNumber: '',
//         expiryDate: '',
//         cardName: '',
//         cvv: '',
//       });
//       setAddingPaymentMethod(false);
//     }
//   };

//   const validateCreditCard = () => {
//     // Add your credit card validation logic here
//     return true; // Replace with your actual validation
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Payment Methods</Text>
//       {paymentMethods.map((method, index) => (
//         <View key={index} style={styles.methodContainer}>
//           {method.type === 'paypal' ? (
//             <Text>PayPal</Text>
//           ) : (
//             <Text>
//               Card Number: {method.cardNumber}
//               {'\n'}
//               Expiry Date: {method.expiryDate}
//               {'\n'}
//               Name on Card: {method.cardName}
//               {'\n'}
//               CVV: {method.cvv}
//             </Text>
//           )}
//         </View>
//       ))}
//       {addingPaymentMethod ? (
//         <View style={styles.methodContainer}>
//           <Text style={styles.subheading}>Add Payment Method</Text>
//           <TextInput
//             placeholder="Type (PayPal or Credit Card)"
//             value={paymentMethod.type}
//             onChangeText={(text) => setPaymentMethod({ ...paymentMethod, type: text })}
//           />
//           {paymentMethod.type === 'creditCard' && (
//             <>
//               <TextInput
//                 placeholder="Card Number"
//                 value={paymentMethod.cardNumber}
//                 onChangeText={(text) => setPaymentMethod({ ...paymentMethod, cardNumber: text })}
//               />
//               <TextInput
//                 placeholder="Expiry Date"
//                 value={paymentMethod.expiryDate}
//                 onChangeText={(text) => setPaymentMethod({ ...paymentMethod, expiryDate: text })}
//               />
//               <TextInput
//                 placeholder="Name on Card"
//                 value={paymentMethod.cardName}
//                 onChangeText={(text) => setPaymentMethod({ ...paymentMethod, cardName: text })}
//               />
//               <TextInput
//                 placeholder="CVV"
//                 value={paymentMethod.cvv}
//                 onChangeText={(text) => setPaymentMethod({ ...paymentMethod, cvv: text })}
//               />
//             </>
//           )}
//           <Button title="Add" onPress={addPaymentMethod} />
//         </View>
//       ) : (
//         <Button title="Add Payment Method" onPress={() => setAddingPaymentMethod(true)} />
//       )}
//     </View>
//   );
// };

const Settings = ({ navigation, route }) => {
  const { user } = useAuth();
  const appVersion = "1.0";
  const description = "Fitspace is your personal fitness program coach.";
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handlePaymentMethodsPress = () => {
    console.log(`Setting paymnet initiated ${JSON.stringify(user.data._id)}`);
    let _id = user.data._id;
    SubscriptionIntent.mutateAsync({ _id });
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
    } else {
      console.log(JSON.stringify(data.paymentIntent, null, 2));
      handlePaymentUI(data.setupId);
    }
  };

  //Credit card payment
  const Subscribe = useMutation({
    mutationFn: api.Subscribe,
    onSuccess: async (data, variables) => {
      console.log({ data });
      Alert.alert("Payment Success", "Your payment was succesful");
      UserUpdate.mutateAsync({ _id, paymentSchedule: paymentPlan });
    },
  });

  const SubscriptionIntent = useMutation({
    mutationFn: api.SubscriptionIntent,
    onSuccess: async (data, variables) => {
      console.log({ data });
      handleStripePay(data);
    },
  });

  const handleAboutPress = () => {
    const aboutMessage = `
      Users will have their own public or private profiles where they can add information about themselves
      and their current fitness level.  You will choose categories of the type of workouts to meet your
      fitness goals.  Once compolete, the application will create a customisable 4-5 week plan.  As each week
      is compoleted, a new week will be generated based on the current metrics.  The FitSpace app will
      track your overall performance and how you have progressed within your fitness goals. These metrics
      will include the exercises you've completed weight and steps.
    `;

    Alert.alert("About Fitspace", aboutMessage, [{ text: "OK" }], {
      cancelable: false,
    });
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Button
          title={`Payment Methods`}
          onPress={handlePaymentMethodsPress}
          style={styles.buttonStyle}
          disabled={false}
        >
          <Image
            source={require("../../../assets/favicon.png")}
            style={styles.iconStyle}
          />
          <Text
            label="Payment Methods"
            size="sm"
            font="bold"
            style={styles.buttonTextStyle}
          />
        </Button>
        {showPaymentMethods && <PaymentMethods />}
      </View>
      <View>
        <Button
          title={`About`}
          onPress={handleAboutPress}
          style={styles.buttonStyle} // You might have a different function for resetting workouts
        >
          <Image
            source={require("../../../assets/favicon.png")}
            style={styles.iconStyle}
          />
          <Text
            label="About Fitspace"
            size="sm"
            font="bold"
            style={styles.buttonTextStyle}
          />
        </Button>
      </View> */}
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  iconStyle: {
    width: 30, // Set your desired width
    height: 30, // Set your desired height
    marginRight: 8,
  },
  buttonTextStyle: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 4,
  },
  buttonStyle: {
    marginVertical: 10, // Adjust this value to control the vertical spacing between buttons
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  methodContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
  },
});
