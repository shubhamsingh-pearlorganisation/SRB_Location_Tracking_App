import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";

// const plans = [
//   {
//     title: "Plan 1",
//     // description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
//     //   img: onboarding1,
//   },
//   {
//     title: "Plan 2",
//     // description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
//     //   img: onboarding2,
//   },
//   {
//     title: "Plan 3",
//     // description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
//     //   img: onboarding3,
//   },
//   {
//     title: "Plan 4",
//     // description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
//     //   img: onboarding4,
//   },
// ];

const MemberShip = () => {
  const [selectedPlan, setSelectedPlan] = useState("basic");

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.plan, selectedPlan === "basic" && styles.selected]}
        onPress={() => setSelectedPlan("basic")}
      >
        <Text style={[styles.planTitle]}>Basic</Text>
        <Text style={styles.planPrice}>$0/month</Text>
        <Text style={styles.planDescription}>Access to basic features</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.plan, selectedPlan === "premium" && styles.selected]}
        onPress={() => setSelectedPlan("premium")}
      >
        <Text style={styles.planTitle}>Premium</Text>
        <Text style={styles.planPrice}>$20/month</Text>
        <Text style={styles.planDescription}>Access to all features</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.plan, selectedPlan === "platinum" && styles.selected]}
        onPress={() => setSelectedPlan("platinum")}
      >
        <Text style={styles.planTitle}>Platinum</Text>
        <Text style={styles.planPrice}>$50/month</Text>
        <Text style={styles.planDescription}>Access to premium features</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: SIZES.width > 400 ? 24 : 18,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  plan: {
    backgroundColor: "#f2f2f2",
    padding: "2%",
    borderRadius: 10,
    marginBottom: "2%",
    width: "80%",
  },
  planTitle: {
    fontSize: SIZES.width > 400 ? 20 : 15,
    fontWeight: "bold",
    marginBottom: "2%",
  },
  planPrice: {
    fontSize: SIZES.width > 400 ? 16 : 12,
    fontWeight: "bold",
    color: COLORS.voilet,
    marginBottom: "1%",
  },
  planDescription: {
    fontSize: SIZES.width > 400 ? 14 : 10,
    marginBottom: "1%",
  },
  button: {
    backgroundColor: COLORS.voilet,
    padding: "2%",
    borderRadius: 5,
    marginTop: "2%",
  },
  buttonText: {
    color: "#fff",
    fontSize: SIZES.width > 400 ? 16 : 12,
    fontWeight: "bold",
  },
  selected: {
    borderColor: COLORS.voilet,
    borderWidth: 2,
  },
});

export default MemberShip;
