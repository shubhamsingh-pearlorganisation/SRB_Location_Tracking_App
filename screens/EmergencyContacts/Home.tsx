import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { COLORS, images, SIZES } from "../../constants";
import ContactsList from "../../components/ContactList";
import Contact from "../../components/Contact";
import { useState } from "react";
import { TouchableRipple } from "react-native-paper";
const { emergencyContactHome } = images;
// -----------------------------------------------------------------
const EmergencyContactsScreen = ({ navigation }: any) => {
  const [showContactList, setShowContactList] = useState(false);
  const [onUp, setOnUp] = useState(false);

  const handleAddContact = () => {
    setShowContactList(true);
    setOnUp(true);
    // navigation.navigate("EmergencyContactsListing");
  };
  const onDonePressed = () => {
    setShowContactList(false);
    setOnUp(false);
  };

  const customStyle = onUp ? styles.expand : styles.collapse;

  return (
    <View>
      <View style={styles.container}>
        <Image source={emergencyContactHome} style={styles.image} />
        <Text style={styles.noContact}>No Contacts Added</Text>
        <Text style={styles.message}>Add emergency contact to your circle</Text>

        <Pressable
          style={styles.addContactBtn}
          onPress={() => handleAddContact()}
        >
          <Text style={styles.addContactBtnText}>Add Contact</Text>
        </Pressable>
      </View>
      <View
        style={[
          styles.contactListView,
          customStyle,
          { flexDirection: "column" },
        ]}
      >
        {showContactList ? (
          <>
            <TouchableOpacity
              onPress={onDonePressed}
              style={{
                alignSelf: "flex-end",
                backgroundColor: COLORS.voilet,
                padding: "2%",
                margin: "2%",
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: COLORS.white,
                }}
              >
                Done
              </Text>
            </TouchableOpacity>
            <ContactsList />
          </>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

// =========================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    height: SIZES.height,
    top: "1%",
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
  expand: {
    height: SIZES.height * 0.9,
  },
  collapse: {
    height: SIZES.height * 0,
  },
  contactListView: {
    position: "absolute",
    width: "100%",
    height: SIZES.height * 0,
    backgroundColor: COLORS.white,
  },
});
export default EmergencyContactsScreen;
// =============================================== THE END =======================================================
