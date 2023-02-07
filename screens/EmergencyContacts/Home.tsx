import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  Pressable,
} from "react-native";

// constants
import { images } from "../../constants";
const { emergencyContactHome } = images;

const EmergencyContactsScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={emergencyContactHome} style={styles.image} />
      <Text style={styles.noContact}>No Contacts Added</Text>
      <Text style={styles.message}>Add emergency contact to your circle</Text>

      <Pressable
        style={styles.addContactBtn}
        onPress={() => Alert.alert("Add contact button pressed")}
      >
        <Text style={styles.addContactBtnText}>Add Contact</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 142,
    height: 142,
    marginTop: 108,
  },
  noContact: {
    fontStyle: "normal",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 32,
    color: "#000000",
  },
  message: {
    marginTop: 20,
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 20,
    lineHeight: 30,
    color: "rgba(0, 0, 0, 0.6)",
  },
  addContactBtn: {
    width: 188,
    height: 48,
    backgroundColor: "#705ECF",
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  addContactBtnText: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#FFFFFF",
    fontStyle: "normal",
  },
});
export default EmergencyContactsScreen;
