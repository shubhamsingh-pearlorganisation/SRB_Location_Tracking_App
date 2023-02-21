import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../../constants";
import { useState, useContext, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { AuthContext, UserDetailsContext } from "../../App";
import { useToast } from "react-native-toast-notifications";
import { instance } from "../../core/utils/AxiosInterceptor";
import Loader from "../../components/Loader";
import NoDataFound from "../../components/NoDataFound";
import AlertDialog from "../../components/AlertDialog";
// -----------------------------------------------------------------

const ContactsListingWithHelp = ({ navigation }: any) => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);
  const userDetailsContextData: any = useContext(UserDetailsContext);

  // Component's Local States
  // ========================
  const [contactsList, setContactsList] = useState<any>(
    userDetailsContextData?.userContactsList?.length > 0
      ? userDetailsContextData?.userContactsList
      : []
  );
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setContactsList(
      userDetailsContextData?.userContactsList?.length > 0
        ? userDetailsContextData?.userContactsList
        : []
    );
  }, [userDetailsContextData?.userContactsList]);

  const [showDeleteConfirmationPopup, setShowDeleteConfirmationPopup] =
    useState<any>({ contactId: "", visibility: false });

  const [showLoaderForDeleteContact, setShowLoaderForDeleteContact] =
    useState(false);

  // This method is used to delete the contact based on id from the database.
  const deleteContactFromDatabase = async (contactId: any) => {
    if (!contactId) return;
    try {
      setShowLoaderForDeleteContact(true);
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("id", contactId);

      const response = await instance.post(
        "/emergency_contact_delete",
        formData
      );
      if (response.status === 200 && response.data?.status) {
        setShowLoaderForDeleteContact(false);

        toast.show(`Contact having id ${contactId} deleted successfully`, {
          type: "success",
        });
        userDetailsContextData?.updateContactList(true); //Updating Contact List Globally
      } else {
        setShowLoaderForDeleteContact(false);

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
      setShowLoaderForDeleteContact(false);

      toast.show(
        error.message
          ? error.message
          : "Getting an error while deleting contact. Please try again later.",
        {
          type: "error",
        }
      );
    } finally {
      setShowDeleteConfirmationPopup({
        ...setShowDeleteConfirmationPopup,
        visibility: false,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {showLoader && <Loader />}
      <Pressable
        onPress={() => navigation.navigate("EmergencyTimer")}
        disabled={contactsList?.length === 0}
      >
        <View
          style={[
            styles.image,
            {
              backgroundColor:
                contactsList?.length === 0 ? "darkgrey" : "#FF0000",
            },
          ]}
        >
          <Text style={styles.needHelp}>NEED HELP ?</Text>
          <View style={styles.lineStyle} />
          <Text style={styles.pressHere}>PRESS HERE</Text>
        </View>
      </Pressable>

      <Text style={styles.title}>Emergency Contacts</Text>
      <View>
        <Pressable onPress={() => navigation.navigate("PhonebookContactList")}>
          <Text style={styles.addMoreContacts}>
            {contactsList?.length > 0 ? "Add More Contacts" : "Add Contacts"}
          </Text>
        </Pressable>
      </View>
      <Text style={styles.totalContactsLength}>
        {contactsList?.length > 0 && (
          <>
            <Text>{contactsList?.length} Contacts Found </Text>
          </>
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
                      padding: "2%",
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
                      onPress={() => {
                        setShowDeleteConfirmationPopup({
                          contactId: contact?.id,
                          visibility: true,
                        });
                      }}
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
            <NoDataFound message="No Contacts Found" />
          )}
        </ScrollView>
      </View>
      {showDeleteConfirmationPopup?.visibility ? (
        <>
          <AlertDialog
            mainDisplayMsg="Contact Delete Confirmation"
            subDisplayMsg="Are you sure you want to permanently delete this contact?"
            visibility={showDeleteConfirmationPopup?.visibility}
            dismissAlert={(value: any) =>
              setShowDeleteConfirmationPopup({
                ...setShowDeleteConfirmationPopup,
                visibility: value,
              })
            }
            confirmAction={() =>
              deleteContactFromDatabase(
                showDeleteConfirmationPopup?.contactId
                  ? showDeleteConfirmationPopup?.contactId
                  : ""
              )
            }
            messageForSuccess=" Yes, remove This Contact"
            messageForSkip="No Keep This Contact"
            showLoader={showLoaderForDeleteContact}
          />
        </>
      ) : null}
    </SafeAreaView>
  );
};
// ====================================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    alignItems: "center",
    height: SIZES.height,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: SIZES.height > 700 ? 40 : 25,
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
    marginBottom: "5%",
    position: "relative",
    borderRadius: 91,
    justifyContent: "center",
    alignContent: "center",
    padding: "2%",
  },
  needHelp: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 19,
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
    fontSize: SIZES.width > 400 ? 22 : 17,
  },
  contactumber: {
    fontSize: SIZES.width > 400 ? 18 : 15,
  },
  totalContactsLength: {
    margin: 10,
    color: COLORS.voilet,
    fontWeight: "bold",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
  addMoreContacts: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.voilet,
    padding: "2%",
    marginTop: "10%",
    marginLeft: "2%",
    borderRadius: 10,
    fontSize: SIZES.width > 400 ? 17 : 14,
    fontWeight: "bold",
    color: "white",
  },
});

export default ContactsListingWithHelp;
// =============================================== THE END =====================================================
