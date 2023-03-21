import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MembershipContext } from "../App";
import { COLORS, SIZES } from "../constants";
// ----------------------------------------------------------------------------------
const MemberShip = () => {
  const membershipData: any = useContext(MembershipContext);
  const [selectedPlan, setSelectedPlan] = useState<any>({});

  // Selecting Plan 1st for First Time when user come to this screen.
  useEffect(() => {
    if (membershipData?.membershipPlans?.length > 0)
      setSelectedPlan(membershipData?.membershipPlans?.[0]);
  }, []);

  // This method is used for handling membership subscription through Payment Gateway API
  const handleSubscribe = () => {
    Alert.alert(
      "Membership Plan Subscription",
      "Your selected plan will be subscribed successfully once you made payment successful."
    );
  };

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView
        style={{
          paddingTop:"2%",
          width:'100%'
        }}
      >
        <View style={styles.container}>
          {membershipData?.membershipPlans?.length > 0 &&
            membershipData?.membershipPlans.map(
              (membership: any, i: number) => {
                return (
                  <View
                    key={i}
                    style={[
                      styles.planCard,
                      selectedPlan?.title === membership?.title &&
                        styles.selected,
                    ]}
                  >
                    <TouchableOpacity
                      style={[styles.plan]}
                      onPress={() => setSelectedPlan(membership)}
                    >
                      <Text style={[styles.planTitle]}>
                        {membership?.title}
                      </Text>
                      <Text style={styles.planPrice}>
                        {membership?.price}&nbsp;$/month
                      </Text>
                      <Text style={styles.planDescription}>
                        {membership?.description}
                      </Text>
                      <Text style={styles.planDescription}>
                        {membership?.duration} days validity
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleSubscribe}>
          Subscribe Now
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// ===========================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    width: "100%",
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
    fontSize: SIZES.width > 400 ? 26 : 18,
    fontWeight: "bold",
    marginBottom: SIZES.width > 400 ? "2%" : "4%",
  },
  planPrice: {
    fontSize: SIZES.width > 400 ? 20 : 15,
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
    paddingHorizontal: SIZES.width > 400 ? "6%" : "10%",
    paddingVertical: SIZES.width > 400 ? "2%" : "3%",
    borderRadius: 5,
    marginTop: SIZES.width > 400 ? "2%" : "3%",
    marginBottom:SIZES.width > 400 ? "2%" : "3%",
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
// ============================================ THE END ===============================================
