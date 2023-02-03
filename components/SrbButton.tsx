import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import tw from "twrnc";

const SrbButton = ({ onPress = () => {}, btnStyle = {}, btnText }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.btnStyle, ...btnStyle }}
    >
      <Text style={tw`text-white text-xl`}>{btnText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: 16,
    borderWidth: 1,
  },
});

export default SrbButton;
