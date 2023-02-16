import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SIZES } from "../../constants";
import CustomAlert from "../../components/AlertDialog";
import { useState, useContext, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../App";
import { useToast } from "react-native-toast-notifications";
import { instance } from "../../core/utils/AxiosInterceptor";
// -----------------------------------------------------------------

const ContactsListingWithHelp = ({ navigation }: any) => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);

  // Component's Local States
  // ========================
  const [contactsList, setContactsList] = useState<any>([]);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    fetchContactsFromDatabase(true);
    return () => setContactsList([]);
  }, []);

  // This method is used to show delete contact confirmation popup
  const deleteContactConfirmation = async (contactId: any) => {
    Alert.alert(
      "Contact Delete Confirmation",
      "Are you sure you want to permanently delete this contact?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => deleteContactFromDatabase(contactId),
          style: "default",
        },
      ]
    );
  };

  // This method is used to fetch complete contacts list from the database.
  const fetchContactsFromDatabase = async (showToast = false) => {
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      const response = await instance.post("/emergency_contact_get", formData);
      if (response.status === 200 && response.data?.status === true) {
        setContactsList(response.data?.data?.reverse());
        setShowLoader(false);
        showToast &&
          toast.show("Contacts Fetched Successfully", { type: "success" });
      } else {
        setShowLoader(false);

        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while fetching contacts. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } catch (error: any) {
      setShowLoader(false);

      toast.show(
        error.message
          ? error.message
          : "Getting an error while fetching contacts. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  // This method is used to delete the contact based on id from the database.
  const deleteContactFromDatabase = async (contactId: any) => {
    try {
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("id", contactId);

      // setShowLoader(true);

      const response = await instance.post(
        "/emergency_contact_delete",
        formData
      );
      if (response.status === 200 && response.data?.status) {
        toast.show(`Contact having id ${contactId} deleted successfully`, {
          type: "success",
        });
        fetchContactsFromDatabase(false);
      } else {
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while deleting contact. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } catch (error: any) {
      toast.show(
        error.message
          ? error.message
          : "Getting an error while deleting contact. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {showLoader && <ActivityIndicator size={SIZES.width > 400 ? 50 : 30} />}
      <Pressable onPress={() => navigation.navigate("EmergencyTimer")}>
        <View style={styles.image}>
          <Text style={styles.needHelp}>NEED HELP?</Text>
          <View style={styles.lineStyle} />
          <Text style={styles.pressHere}>PRESS HERE</Text>
        </View>
      </Pressable>

      <Text style={styles.title}>Emergency Contacts</Text>
      <Text style={styles.totalContactsLength}>
        {contactsList?.length > 0 && (
          <Text>Total Contacts: {contactsList?.length}</Text>
        )}
      </Text>

      <View
        style={{
          height: "50%",
          width: "100%",
          padding: "2%",
        }}
      >
        <ScrollView style={styles.listContainer}>
          {contactsList?.length > 0 ? (
            contactsList.map((contact: any, i: number) => {
              return (
                <View key={contact?.id ? contact?.id : i}>
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
                        {contact?.name ? contact?.name : "N.A"}
                      </Text>
                      <Text style={styles.contactumber}>
                        {contact?.contact ? contact?.contact : "N.A"}
                      </Text>
                    </View>
                    <Pressable
                      style={{
                        right: "2%",
                        position: "absolute",
                        alignSelf: "center",
                      }}
                      onPress={() => deleteContactConfirmation(contact?.id)}
                    >
                      <Feather
                        name="minus-circle"
                        size={SIZES.width > 400 ? 30 : 25}
                      />
                    </Pressable>
                  </View>
                </View>
              );
            })
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 22,
                marginTop: 20,
              }}
            >
              No Contacts Found
            </Text>
          )}
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
  },
  image: {
    width: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,
    height: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,
    marginBottom: "10%",
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
  totalContactsLength: {
    margin: 20,
    color: "blue",
    fontWeight: "bold",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
});

export default ContactsListingWithHelp;
// =============================================== THE END =====================================================
