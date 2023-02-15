import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { emergencyCallImage } from "../../constants/images";
import { useEffect, useState } from "react";

const EmergencyTimerScreen = ({ navigation }: any) => {
  const [counter, setCounter] = useState(10);

  // Third Attempts
  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      alert("Emergency Alert Sent Successfully");
      redirectBack();
    }
    return () => clearInterval(timer);
  }, [counter]);

  const redirectBack = () => {
    navigation.navigate("EmergencyContactsListing");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={emergencyCallImage}
        resizeMode="contain"
        style={{
          height: SIZES.width * 0.4,
          width: SIZES.width * 0.8,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Pressable>
          <View style={styles.image}>
            <Text style={styles.needHelp}>{counter}</Text>
          </View>
        </Pressable>
      </ImageBackground>

      <Text
        style={{
          fontSize: 40,
          fontWeight: "300",
          padding: "2%",
        }}
      >
        We will send you an alert message to your contacts when count will be 0.
      </Text>

      <TouchableOpacity
        style={{
          marginTop: "20%",
          width: SIZES.width * 0.4,
          height: 60,
          justifyContent: "center",
          borderRadius: 30,
          backgroundColor: COLORS.white,
          borderColor: COLORS.black,
          borderWidth: 1,
        }}
        onPress={() => redirectBack()}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: SIZES.width > 300 && SIZES.height > 600 ? 25 : 20,
            color: "black",
            alignSelf: "center",
          }}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    alignItems: "center",
    flexDirection: "column",
    height: SIZES.height,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: SIZES.height > 700 ? 40 : 30,
    textAlign: "center",
    color: "#000000",
  },
  image: {
    width: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,
    height: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,

    backgroundColor: "#FF0000",
    position: "relative",
    borderRadius: 91,
    justifyContent: "center",
    alignContent: "center",
    padding: "2%",
    alignSelf: "center",
  },
  needHelp: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },
  pressHere: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
});
export default EmergencyTimerScreen;
