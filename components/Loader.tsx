import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
// ----------------------------------------------------------------------------
const Loader = ({
  message = "Please wait ...",
  msgTextColor = COLORS.voilet,
}) => {
  return (
    <>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.width > 400 ? 40 : 20} />
        <Text style={[styles.loadingDescriptionMsg, { color: msgTextColor }]}>
          {message}
        </Text>
      </View>
    </>
  );
};

// ============================================================================
// CSS CODE
const styles = StyleSheet.create({
  loadingContainer: {
    margin: 20,
  },
  loadingDescriptionMsg: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
});
export default Loader;

// ===================================== THE END =======================================
