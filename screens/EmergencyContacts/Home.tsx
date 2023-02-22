import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { images, SIZES } from "../../constants";
const { emergencyContactHome } = images;
import { useState, useEffect, useContext } from "react";
import { UserDetailsContext } from "../../App";
// -----------------------------------------------------------------

const EmergencyContactsScreen = ({ navigation }: any) => {
  const userDetailsContextData: any = useContext(UserDetailsContext);

  const [contactsFound, setContactsFound] = useState(false);

  useEffect(() => {
    if (userDetailsContextData?.userContactsList?.length > 0)
      setContactsFound(true);
    else setContactsFound(false);
  }, [userDetailsContextData?.userContactsList]);

  useEffect(() => {
    if (contactsFound) navigation.navigate("ContactsListingWithHelp");
    else navigation.navigate("Emergency");
  }, [contactsFound]);
  // ----------------------------------------------------------------------------------------

  return !contactsFound ? (
    <>
      <View style={styles.container}>
        <Image source={emergencyContactHome} style={styles.image} />
        <Text style={styles.noContact}>No Contacts Added</Text>
        <Text style={styles.message}>Add emergency contact to your circle</Text>

        <Pressable
          style={styles.addContactBtn}
          onPress={() => navigation.navigate("PhonebookContactList")}
        >
          <Text style={styles.addContactBtnText}>Add Contact</Text>
        </Pressable>
      </View>
    </>
  ) : (
    <>{navigation.navigate("Main")}</>
  );
};

// =========================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
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
});
export default EmergencyContactsScreen;
// =============================================== THE END =======================================================
