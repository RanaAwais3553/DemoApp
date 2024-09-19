import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Alert,
  Modal,
  Text as RNText,
} from "react-native";
import { useRef, useState,useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "../../api";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks";
import { usePaymentSheet } from "@stripe/stripe-react-native";
import { Button, Text } from "../../components/ui";

import {
  Ban,
  ChevronDown,
  ChevronRight,
  ChevronRightCircle,
  RefreshCcw,
  WalletCards,
  X,
} from "lucide-react-native";
import { About, Calendar, Logout,ChartOutline } from "../../components/icons";
// import * as Localization from 'expo-localization';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from 'react-native-restart';
import { useQueryClient } from '@tanstack/react-query';
const AboutModal = ({ isModalShown, setIsModalShown }) => {
  return (
    <Modal animationType="fade" visible={isModalShown} transparent={true}>
      <View style={styles.modal_container}>
        <View style={styles.modal}>
          <Button
            variant="icon"
            onPress={() => setIsModalShown(false)}
            style={{
              position: "absolute",
              height: 45,
              width: 45,
              zIndex: 35,
              right: 12,
              top: 12,
            }}
          >
            <X color="#9E9E9E" size={32} />
          </Button>

          <View style={[styles.logo_container]}>
            <Image style={styles.logo} source={{uri:'https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/logo-black.png'}} />
          </View>
          <ScrollView
            contentContainerStyle={styles.scroll_container}
            keyboardShouldPersistTaps="handled"
            decelerationRate="normal"
            bounces="false"
          >
            <View style={{ width: "100%" }}>
              <RNText style={styles.paragraph}>
                Users will have their own public or private profiles where they
                can add information about themselves and their current fitness
                level.
              </RNText>
              <RNText style={styles.paragraph}>
                You will choose categories of the type of workouts to meet your
                fitness goals.
              </RNText>
              <RNText style={styles.paragraph}>
                Once complete, the application will create a customisable 4-5
                week plan.
              </RNText>
              <RNText style={styles.paragraph}>
                As each week is compoleted, a new week will be generated based
                on the current metrics.
              </RNText>
              <RNText style={styles.paragraph}>
                The FitSpace app will track your overall performance and how you
                have progressed within your fitness goals.
              </RNText>
              <RNText style={styles.paragraph}>
                These metrics will include the exercises you've completed weight
                and steps.
              </RNText>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const Settings = ({ navigation, route }) => {
  // let [locale, setLocale] = useState(Localization.getLocales());
  // console.log(locale[0].regionCode);
  // const option = locale.length > 0 && locale[0].regionCode == 'RU'
  const [isTabVisible, setIsTabVisible] = useState(false);
  const queryClient = useQueryClient();
  const option = false
  ? [
      {
        label: "Subscription",
        icon: Calendar,
        child: [
          { label: "Change Subscription", icon: RefreshCcw },
          { label: "Cancel Subscription", icon: Ban },
        ],
      },
      { label: "About Us", icon: About },
      { label: "Logout", icon: Logout },
    ]
  : [
      {
        label: "Subscription",
        icon: Calendar,
        child: [
          { label: "Payment Methods", icon: WalletCards },
          { label: "Change Subscription", icon: RefreshCcw },
          { label: "Cancel Subscription", icon: Ban },
        ],
      },
      { label: "About Us", icon: About },
      { label: "Show Leader Board", icon: ChartOutline },
      { label: "Logout", icon: Logout },
    ];

  const { user, setUser } = useAuth();
  const scrollViewRef = useRef(null);
  const [showSubs, setShowSubs] = useState(false);
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet();
  useEffect(() => {
    (async() => {
      const isLeaderBoard = await AsyncStorage.getItem("isLeaderBoardShown");
      console.log("isLeaderBoard isLeaderBoard isLeaderBoard",isLeaderBoard == 'false')
  setIsTabVisible(isLeaderBoard == 'true')
    })()
  },[])
  console.log("isTabVisible isTabVisible",isTabVisible)
  const GetUser = useMutation({
    mutationFn: api.GetUser,
    onSuccess: async (data) => {
      console.log( {data} );
      setUser(data);
    },
  });

  const PaymentMethodIntent = useMutation({
    mutationFn: api.SubscriptionIntent,
    onSuccess: async (data, variables) => {
      console.log({ data });
      handleAddPaymentMethods(data);
    },
  });

  const CancelSubscription = useMutation({
    mutationFn: api.CancelSubscription,
    onSuccess: async () => {
      setPaymentLoading(false);
      GetUser.mutateAsync({ _id: user?.data?._id });
      Alert.alert("Subscription Canceled", "Your subscription is now removed");
    },
  });


  // CancelYooMoneySubscription
  const CancelYooMoneySubscription = useMutation({
    mutationFn: api.CancelYooMoneySubscription,
    onSuccess: async () => {
      setPaymentLoading(false);
      GetUser.mutateAsync({ _id: user?.data?._id });
      Alert.alert("Subscription Canceled", "Your subscription is now removed");
    },
  });

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;

    if (contentOffset.y <= 0) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      queryClient?.clear();
      console.log("User data removed from AsyncStorage");
      setUser({});
      navigation.navigate("AuthScreens", { screen: "LoginScreen" });
      setShowSubs(false);
    } catch (error) {
      console.error("Failed to remove user data from AsyncStorage", error);
    }
  };

  const handleChangeSubscription = () => {
    setShowSubs(!showSubs);
    navigation.navigate("AppScreens", {
      screen: "SubscriptionScreen",
      params: {
        _id: user?.data?._id,
        payment: user?.data?.paymentSchedule,
      },
    });
  };

  const handlePaymentMethods = () => {
    PaymentMethodIntent.mutateAsync({ _id: user?.data?._id });
    setPaymentLoading(true);
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel your current subscription?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // if (locale.length > 0 && locale[0].regionCode == 'RU') {
              if (false) { 
              CancelYooMoneySubscription.mutateAsync({ _id: user?.data?._id }); //CancelYooMoneySubscription
            } else {
              CancelSubscription.mutateAsync({ _id: user?.data?._id }); //CancelStripSubscription
            }
            setPaymentLoading(true);
            setShowSubs(false);
          },
        },
      ]
    );
  };

  const handleAboutUs = () => {
    setIsModalShown(true);
  };
const handleToggleLeaderBoard = async () => {
  const isLeaderBoard = await AsyncStorage.getItem("isLeaderBoardShown");
  await AsyncStorage.setItem("isLeaderBoardShown", isLeaderBoard == 'false' ? 'true' : 'false');
  RNRestart?.Restart();
}
  const handleButton = (type) => {
    console.log({ type });
    switch (type) {
      case "Subscription":
        setShowSubs(!showSubs);
        break;
      case "Logout":
        handleLogout();
        break;
      case "Change Subscription":
        handleChangeSubscription();
        break;
      case "Payment Methods":
        handlePaymentMethods();
        break;
      case "Cancel Subscription":
        handleCancelSubscription();
        break;
      case "About Us":
        handleAboutUs();
        break;
      case "Show Leader Board":
        handleToggleLeaderBoard();
        break;
      default:
        break;
    }
  };

  const handlePaymentMethodstUI = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.log({ ff: error.code });
      if (error.code === "Canceled") {
        Alert.alert(
          `Payment Method Canceled`,
          "Adding new payment method has been canceled"
        );
      } else {
        Alert.alert(`${error.code}`, error.message);
      }
      setPaymentLoading(false);
    } else {
      Alert.alert("Payment Method Saved", "Your new payment method was saved");
      setPaymentLoading(false);
    }
  };

  const handleAddPaymentMethods = async (data) => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Fit Space",
      customerId: data.customer,
      customerEphemeralKeySecret: data.ephemeralKey,
      setupIntentClientSecret: data.paymentIntent,
      allowsDelayedPaymentMethods: true,
      returnURL: "stripe-example://stripe-redirect",
      primaryButtonLabel: "Setup Payment Methods",
    });

    if (error) {
      Alert.alert(error.code, error.localizedMessage);
      setPaymentLoading(false);
    } else {
      console.log(JSON.stringify(data.paymentIntent, null, 2));
      handlePaymentMethodstUI();
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["right", "left"]}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 12,
          paddingBottom: 45,
        }}
        keyboardShouldPersistTaps="handled"
        decelerationRate="normal"
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={() =>
          scrollViewRef?.current?.scrollToEnd({ animated: true })
        }
        bounces="false"
      >
        <View
          style={{
            flex: 1,
            gap: 24,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View style={styles.avatar_container}>
              <Image style={styles.avatar} source={{uri:'https://fitspace-app-assets.s3.ap-southeast-2.amazonaws.com/image/avatar.png'}} />
            </View>
            <Text
              label={`${user?.data?.name} ${user?.data?.surname}`}
              size="xl_2"
              font="semibold"
              style={{ textAlign: "center" }}
            />
            <Text
              label={user?.data?.email}
              size="base"
              font="medium"
              style={{ textAlign: "center" }}
            />
            {user?.data?.paymentActive ? (
              <View style={styles.subs}>
                <Text
                  label={
                    user?.data?.paymentSchedule !== "trial"
                      ? `${user?.data?.paymentSchedule}ly Premium`
                      : "Trial"
                  }
                  size="base"
                  font="bold"
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                />
              </View>
            ) : null}
          </View>

          {!user?.data?.paymentActive ? (
            <Button
              style={[styles.goal_btn]}
              onPress={() =>
                navigation.navigate("AppScreens", {
                  screen: "SubscriptionScreen",
                  params: { _id: user?.data?._id },
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <View>
                  <Text
                    label={"Subscribe Now!"}
                    size="xl_2"
                    font="bold"
                    style={{ color: "#fff" }}
                  />
                  <Text
                    label={"Pay once, cancel any time"}
                    size="sm"
                    font="medium"
                    style={{ color: "#fff" }}
                  />
                </View>
                <ChevronRightCircle color="white" size={28} />
              </View>
            </Button>
          ) : null}

          <View style={{ gap: 8 }}>
            {option
              .filter((option) =>
                Object.keys(user?.data || {}).length !== 0 &&
                !user?.data?.paymentActive
                  ? option.label !== "Subscription"
                  : option
              )
              .map((type, i) => (
                <>
                  <Button
                    key={`${i}-${type.label}`}
                    variant="outline"
                    style={styles.btn_container}
                    onPress={() => handleButton(type.label)}
                    disabled={isPaymentLoading}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 12,
                        }}
                      >
                        <type.icon
                          color={type.label === "Logout" ? "red" : "black"}
                          size={28}
                        />
                        <Text
                          label={type.label == "Show Leader Board" ? !!isTabVisible ? 'Hide Leader Board' : "Show Leader Board"  : type.label}
                          size="xl"
                          font="medium"
                          style={{
                            textAlign: "center",
                            color: type.label === "Logout" ? "red" : "black",
                          }}
                        />
                      </View>
                      {type.child ? (
                        !showSubs ? (
                          <ChevronRight color="black" size={24} />
                        ) : (
                          <ChevronDown color="black" size={24} />
                        )
                      ) : null}
                    </View>
                  </Button>
                  {type.child && showSubs
                    ? type.child.map((child, index) => (
                        <Button
                          key={`${i}-${child.label}-${index}`}
                          variant="gray"
                          style={styles.btn_container}
                          onPress={() => handleButton(child.label)}
                          disabled={isPaymentLoading}
                        >
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 12,
                              }}
                            >
                              <child.icon
                                color={
                                  child.label === "Cancel Subscription"
                                    ? "red"
                                    : "black"
                                }
                                size={18}
                              />
                              <Text
                                label={child.label}
                                size="lg"
                                font="medium"
                                style={{
                                  textAlign: "center",
                                  color:
                                    child.label === "Cancel Subscription"
                                      ? "red"
                                      : "black",
                                }}
                              />
                            </View>
                          </View>
                        </Button>
                      ))
                    : null}
                </>
              ))}
          </View>
          <AboutModal
            isModalShown={isModalShown}
            setIsModalShown={setIsModalShown}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  goal_btn: {
    width: "100%",
    height: 95,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    paddingHorizontal: 28,
    borderRadius: 12,
    gap: 12,
  },
  btn_container: {
    borderColor: "transparent",
    borderRadius: 8,
    height: 58,
    justifyContent: "flex-start",
  },
  avatar: { width: 145, height: 145, borderRadius: 100 },
  avatar_container: {
    borderColor: "#6842FF",
    borderRadius: 100,
    padding: 2,
    borderWidth: 2,
    margin: 16,
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
  modal: {
    position: "absolute",
    zIndex: 25,
    flex: 1,
    top: "18%",
    bottom: "18%",
    left: 4,
    right: 4,
    height: 520,
    backgroundColor: "white",
    margin: 20,
    paddingTop: 10,
    paddingBottom: 24,
    borderRadius: 20,
    paddingHorizontal: 14,
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
  paragraph: {
    fontSize: 14,
    marginBottom: 16,
    fontFamily: "Montserrat_400Regular", // Paragraph font
    textAlign: "justify",
  },
  logo_container: {
    width: "100%",
    height: 125,
  },
  logo: {
    height: "65%",
    width: "65%",
    alignSelf: "center",
    flex: 1,
  },
  scroll_container: {
    // backgroundColor: "red",
    paddingTop: 6,
    paddingHorizontal: 14,
  },
});
