import React from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { useNavigation } from "@react-navigation/native";

// constants
import { images, theme } from "../constants";
const { onboarding1, onboarding2, onboarding3, onboarding4 } = images;

// theme
const { COLORS, FONTS, SIZES } = theme;

const onBoardings = [
  {
    title: "Stay close with family in one touch,\nwe can help you.",
    // description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding1,
  },
  {
    title: "With us you can be calm to your\nfriends and parents.",
    // description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding2,
  },
  {
    title: "We will help you in your\n aspects.",
    // description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding3,
  },
  {
    title: "We will also help you with\nvehicle tracking.",
    // description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    img: onboarding4,
  },
];

const OnBoarding = ({ navigation }: any) => {
  const onPressSubmit = () => {
    navigation.navigate("otp");
  };
  const [completed, setCompleted] = React.useState(false);

  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (Math.floor(value / SIZES.width) === onBoardings.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  // Render

  function renderContent() {
    return (
      <View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEnabled
          decelerationRate={0}
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {onBoardings.map((item, index) => (
            <View
              //center
              //bottom

              key={`img-${index}`}
              style={[
                styles.imageAndTextContainer,
                { flex: 2, alignItems: "center", justifyContent: "center" },
              ]}
            >
              <View
                style={{
                  // flex: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  zIndex: -1,
                  width: "100%",
                  height: "100%",
                }}
              >
                <Image
                  source={item.img}
                  resizeMode="stretch"
                  style={{
                    top: "5%",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </View>

              <View
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  zIndex: 1,
                  paddingTop: "50%",
                  justifyContent: "center",
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <Text
                  style={{
                    ...FONTS.h1,
                    color: COLORS.white,
                    textAlign: "center",
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
        {/* Button */}
        <TouchableOpacity
          style={{
            position: "absolute",
            // left: "40%",
            alignSelf: "center",
            bottom: "15%",
            width: SIZES.width - SIZES.width * 0.2,
            height: 60,
            justifyContent: "center",
            borderTopLeftRadius: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: "white",
          }}
          onPress={onPressSubmit}
        >
          <Text
            style={{
              fontWeight: "400",
              fontSize: SIZES.width > 300 && SIZES.height > 600 ? 25 : 20,
              color: "Black",
              alignSelf: "center",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            ...FONTS.body3,
            textAlign: "center",
            marginTop: 0,
            color: COLORS.white,
            bottom: "10%",
            fontSize: 18,

            justifyContent: "center",
          }}
        >
          You already have an account?
          <TouchableOpacity
            onPress={onPressSubmit}
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "800",
                fontSize: SIZES.width > 400 && SIZES.height > 600 ? 20 : 15,
                minHeight: SIZES.width > 400 && SIZES.height > 600 ? 30 : 50,
                padding: SIZES.width > 400 && SIZES.height > 600 ? 5 : 10,
                paddingTop: SIZES.width > 400 && SIZES.height > 600 ? 5 : 10,
                width: "100%",
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotsContainer}>
        {onBoardings.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [8, 8, 10],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot, { width: dotSize, height: dotSize }]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "WHITE",
  },
  imageAndTextContainer: {
    width: SIZES.width,
  },
  dotsRootContainer: {
    position: "absolute",
    bottom: "15%",
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding * 3,
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.radius / 2,
  },
});

export default OnBoarding;
