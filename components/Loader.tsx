import { View, Text, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { COLORS, SIZES } from "../constants";
// ----------------------------------------------------------------------------
// This is the common component for Showing Loader.
const Loader = ({
  message = "Please wait ...",
  msgTextColor = COLORS.voilet,
}) => {
  return (
    <View>
      <Modal visible={true} animationType={"fade"} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(52, 52, 52, 0.6)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={SIZES.width > 400 ? 40 : 30} />
            <Text
              style={[styles.loadingDescriptionMsg, { color: msgTextColor }]}
            >
              {message}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ============================================================================
// CSS CODE
const styles = StyleSheet.create({
  loadingContainer: {
    margin: "5%",
    backgroundColor: COLORS.white,
    height: SIZES.width * 0.3,
    width: SIZES.width * 0.4,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
  },
  loadingDescriptionMsg: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
});
export default Loader;

// ===================================== THE END =======================================
