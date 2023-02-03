import tw from "twrnc";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import React from "react";
import { useNavigation } from "@react-navigation/native";

const SplashPartner = ({ navigation }: any) => {
  const onPressSubmit = () => {
    navigation.navigate("otp");
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.top}
        source={require("../assets/partnerSplash.png")}
      />

      <View style={styles.inputWrapper}></View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.sendCode} onPress={onPressSubmit}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SplashPartner;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#9b59b6",
  },
  top: {
    flex: 1,
    width: "100%",
  },
  bottom: {
    flex: 0.2,
    color: "#000F3B",
    fontSize: 30,
  },

  titleWrapper: {},
  inputWrapper: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  footer: {
    height: 100,
  },
  sendCode: {
    padding: 20,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
});
