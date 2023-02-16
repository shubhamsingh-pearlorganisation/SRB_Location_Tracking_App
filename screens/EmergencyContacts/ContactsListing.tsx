import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../../constants";
import CustomAlert from "../../components/AlertDialog";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
// -----------------------------------------------------------------

const ContactsListing = ({ navigation, route }: any) => {
  console.log(
    "route.params.selectedContacts",
    route?.params?.selectedContacts,
    route?.params?.selectedContacts?.length
  );

  const [contactsList, setContactsList] = useState<any>(
    route?.params?.selectedContacts?.length > 0
      ? route?.params?.selectedContacts
      : []
  );

  // Component's Local States
  // ========================
  const [showAlert, setShowAlert] = useState(false);
  const [deleteContact, setDeleteContact] = useState(false);

  const redirectToTimerScreen = () => {
    navigation.navigate("EmergencyTimer");
  };

  function renderEmergencyContactListItem(contact: any) {
    return (
      <View
        style={{
          flexDirection: "row",
          borderColor: "black",
          marginBottom: ".5%",
          padding: "1%",
          backgroundColor: "white",
        }}
      >
        <View>
          <Text style={styles.contactName}>
            {contact?.contactName ? contact?.contactName : "N.A"}
          </Text>
          <Text style={styles.contactumber}>
            {contact?.phoneNumber ? contact?.phoneNumber : "N.A"}
          </Text>
        </View>
        <Pressable
          style={{
            right: "2%",
            position: "absolute",
            alignSelf: "center",
          }}
          onPress={() => setShowAlert(true)}
        >
          <Feather name="minus-circle" size={SIZES.width > 400 ? 30 : 25} />
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => redirectToTimerScreen()}>
        <View style={styles.image}>
          <Text style={styles.needHelp}>NEED HELP?</Text>
          <View style={styles.lineStyle} />
          <Text style={styles.pressHere}>PRESS HERE</Text>
        </View>
      </Pressable>
      <CustomAlert
        mainDisplayMsg={"Sure you want to delete this contact"}
        subDisplayMsg={
          "If you change your mind, you’ll have to resend an invite."
        }
        visibility={showAlert}
        dismissAlert={() => {
          setShowAlert(false);
          setDeleteContact(false);
        }}
        confirmAction={() => {
          setDeleteContact(true);
          setShowAlert(false);
        }}
      />
      <Text style={styles.title}>Emergency Contacts</Text>

      <View
        style={{
          height: "50%",
          width: "100%",
          padding: "2%",
        }}
      >
        <ScrollView style={styles.listContainer}>
          {contactsList?.length > 0 &&
            contactsList.map((contact: any, i: number) => (
              <View key={contact?.id ? contact?.id : i}>
                {renderEmergencyContactListItem(contact)}
              </View>
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
// ====================================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    alignItems: "center",
    height: SIZES.height,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: SIZES.height > 700 ? 40 : 30,
    height: "auto",
    textAlign: "center",
    color: "#000000",
  },
  listContainer: {
    height: "100%",
    width: "100%",
    // backgroundColor: "rgba(0,0,0,0.1)",
  },
  image: {
    width: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,
    height: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,
    marginBottom: "20%",
    backgroundColor: "#FF0000",
    position: "relative",
    borderRadius: 91,
    justifyContent: "center",
    alignContent: "center",
    padding: "2%",
  },
  needHelp: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },
  pressHere: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  contactName: {
    fontSize: SIZES.width > 400 ? 22 : 20,
  },
  contactumber: {
    fontSize: SIZES.width > 400 ? 18 : 15,
  },
});

export default ContactsListing;
// =============================================== THE END =====================================================
