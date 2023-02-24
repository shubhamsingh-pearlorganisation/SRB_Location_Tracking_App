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
      <View
        style={[styles.planCard, selectedPlan === "basic" && styles.selected]}
      >
        <TouchableOpacity
          style={[styles.plan]}
          onPress={() => setSelectedPlan("basic")}
        >
          <Text style={[styles.planTitle]}>Basic</Text>
          <Text style={styles.planPrice}>$0/month</Text>
          <Text style={styles.planDescription}>Access to basic features</Text>
        </TouchableOpacity>
      </View>

      <View
        style={[styles.planCard, selectedPlan === "premium" && styles.selected]}
      >
        <TouchableOpacity
          style={[styles.plan]}
          onPress={() => setSelectedPlan("premium")}
        >
          <Text style={styles.planTitle}>Premium</Text>
          <Text style={styles.planPrice}>$20/month</Text>
          <Text style={styles.planDescription}>Access to all features</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.planCard,
          selectedPlan === "platinum" && styles.selected,
        ]}
      >
        <TouchableOpacity
          style={[styles.plan]}
          onPress={() => setSelectedPlan("platinum")}
        >
          <Text style={styles.planTitle}>Platinum</Text>
          <Text style={styles.planPrice}>$50/month</Text>
          <Text style={styles.planDescription}>Access to premium features</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Subscribe</Text>
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
  planCard: {
    backgroundColor: "transparent",
    padding: SIZES.width > 400 ? ".8%" : "1%",
    borderRadius: 10,
    marginBottom: SIZES.width > 400 ? "2%" : "4%",
    width: SIZES.width > 400 ? "80%" : "90%",
  },
  plan: {
    backgroundColor: "#f2f2f2",
    padding: SIZES.width > 400 ? "2%" : "4%",
    borderRadius: 8,
  },
  planTitle: {
    fontSize: SIZES.width > 400 ? 24 : 18,
    fontWeight: "bold",
    marginBottom: SIZES.width > 400 ? "2%" : "4%",
  },
  planPrice: {
    fontSize: SIZES.width > 400 ? 18 : 15,
    fontWeight: "bold",
    color: COLORS.voilet,
    marginBottom: SIZES.width > 400 ? "1%" : "2%",
  },
  planDescription: {
    fontSize: SIZES.width > 400 ? 18 : 15,
    marginBottom: SIZES.width > 400 ? "1%" : "2%",
    alignSelf: "baseline",
  },
  button: {
    backgroundColor: COLORS.voilet,
    padding: SIZES.width > 400 ? "2%" : "4%",
    borderRadius: 5,
    marginTop: SIZES.width > 400 ? "2%" : "4%",
  },
  buttonText: {
    color: "#fff",
    fontSize: SIZES.width > 400 ? 20 : 18,
    fontWeight: "bold",
  },
  selected: {
    backgroundColor: COLORS.voilet,
  },
});

export default MemberShip;
