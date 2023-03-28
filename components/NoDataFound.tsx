import { Text, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const NoDataFound = ({ message = "No Data Found" }) => {
  return <Text style={styles.message}>{message}</Text>;
};

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.width > 400 ? 25 : 20,
    marginTop: 20,
    color: COLORS.voilet,
  },
});

export default NoDataFound;
