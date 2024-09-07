import {
  Animated,
  Easing,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  StatusBar
} from "react-native";
import { useLayoutEffect, useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import { Button, Text } from "../../components/ui";

import Spinner from "../../components/image/spinner.png";
import { Play } from "../../components/icons";
import { ArrowLeft, CloudCog, X as Exit } from "lucide-react-native";


const WorkoutVideo = ({ navigation, route }) => {
  const iOS = Platform.OS === "ios";
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [showStatusBar, setShowStatusBar] = useState(false);
  const [playerOpacity, setPlayerOpacity] = useState(0);
  const [isPlayerShow, setPlayerShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const Link = route.params.link;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            setShowStatusBar(false);
            setTimeout(() => navigation.goBack(), 100);
          }}
          style={{
            marginLeft: iOS ? -14 : -4,
            marginTop: 4,
          }}
        >
          <ArrowLeft color="#ffffff" size={28} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    setTimeout(() => setShowStatusBar(true), 700);

    return () => setShowStatusBar(false);
  }, []);

  const rotate = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();
  };

  useEffect(() => {
    rotate();
  }, [isLoading]);

  const rotateAnimStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  useEffect(() => {
    console.log({ header: !isPlayerShow });

    navigation.setOptions({
      headerShown: !isPlayerShow,
    });
  }, [isPlayerShow]);

  const handleOpen = () => {
    setTimeout(() => setPlayerOpacity(1), 2000);
    setPlayerShow(!isPlayerShow);
  };

  const handleClose = () => {
    console.log("touched");
    setLoading(true);
    setShowStatusBar(true);
    setTimeout(() => {
      navigation.goBack();
      setPlayerShow(!isPlayerShow);
    }, 1000);
  };
console.log("video link is:#@#@#@",Link)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }} edges={['right', 'left', 'bottom']}>
      <StatusBar hidden={showStatusBar} animated style="dark" />
      {Link ? (
        <>
          {isLoading ? (
            <View style={styles.container}>
              <Animated.Image
                source={Spinner}
                style={[rotateAnimStyle, styles.spinner]}
              />
            </View>
          ) : (
            <>
              {isPlayerShow ? (
                <View style={{ flex: 1, position: "relative" }}>
                  {isPlayerShow && (
                    <View
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        alignItems: "flex-end",
                        opacity: playerOpacity,
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={handleClose}
                      >
                        <Exit color="#e0e0e0" size={32} />
                      </TouchableOpacity>
                    </View>
                  )}
                  <WebView
                    source={{
                      uri: Link,
                    }}
                    // javaScriptEnabled={true}
                    // allowsInlineMediaPlayback={true}
                    allowsFullscreenVideo={true}
                    style={{ opacity: playerOpacity }}
                  />
                  {/* <WebView
                            style={{ flex: 1 }}
                            javaScriptEnabled={true}
                            renderLoading={ActivityIndicatorElement}
                            startInLoadingState={true}
                            allowsInlineMediaPlayback={true}
                            allowsFullscreenVideo={true}
                            source={{
                                uri:
                                    utils.userEducationVideoUrl() +
                                    '?rel=0&autoplay=1&showinfo=1&controls=1&playsinline=1',
                            }}
                        /> */}
                  <View
                    style={{
                      position: "absolute",
                      top: "45%",
                      left: "40%",
                      opacity: playerOpacity ? 0 : 1,
                    }}
                  >
                    <Animated.Image
                      source={Spinner}
                      style={[rotateAnimStyle, styles.spinner]}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.container}>
                  <TouchableOpacity activeOpacity={0.85} onPress={handleOpen}>
                    <Play color="#e0e0e0" size={90} />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <Text
            label={"Ops!"}
            size="xl_6"
            font="extrabold"
            style={{ textAlign: "center", color: "#E0E0E0" }}
          />
          <Text
            label={"Video not found"}
            size="xl_6"
            font="extrabold"
            style={{ textAlign: "center", color: "#E0E0E0" }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default WorkoutVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  spinner: {
    height: 75,
    width: 75,
  },
});
