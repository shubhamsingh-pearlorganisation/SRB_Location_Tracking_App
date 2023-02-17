import React, { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import * as Contacts from "expo-contacts";
import { COLORS, SIZES } from "../../constants";
import IndividualContact from "./IndividualContact";
import { useToast } from "react-native-toast-notifications";
import { instance } from "../../core/utils/AxiosInterceptor";
import { AuthContext, UserDetailsContext } from "../../App";
import Loader from "../../components/Loader";

// -------------------------------------------------------------------------------

const PhonebookContactList = ({ navigation }: any) => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);
  const userDetailsContextData: any = useContext(UserDetailsContext);

  // Component's Local States
  // ========================
  const [contacts, setContacts] = useState<any>({
    contactList: [],
    isContactListEmpty: false,
  });
  const [showLoader, setShowLoader] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<any>([]);
  const [showDoneLoader, setShowDoneLoader] = useState(false);

  // Fetch Contacts on component mount stage
  useEffect(() => {
    fetchContactsFromUserPhoneDirectory();

    // We set contacts length to zero and clear contacts data when component destroy (un-mounted).
    return () => {
      setContacts({
        contactList: [],
        isContactListEmpty: true,
      });
      setSelectedContacts([]);
    };
  }, []);

  // This method is used to fetch contacts list from user's phone directory by using "expo-contacts" package.
  const fetchContactsFromUserPhoneDirectory = async () => {
    try {
      setShowLoader(true);
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.PHONE_NUMBERS],
        });
        setShowLoader(false);

        if (data.length > 0) {
          const contactsWithName = data.filter((contact) => {
            return (
              contact.name !== null &&
              contact.name !== "" &&
              contact.name.length !== 0 &&
              !contact.name.includes("null") &&
              Array.isArray(contact?.phoneNumbers) &&
              contact?.phoneNumbers?.length > 0 &&
              contact?.phoneNumbers[0]?.number
            );
          });
          setContacts({
            contactList: contactsWithName,
            isContactListEmpty: false,
          });
        } else
          setContacts({
            contactList: [],
            isContactListEmpty: true,
          });
      } else {
        setShowLoader(false);
        setContacts({
          contactList: [],
          isContactListEmpty: true,
        });
        Alert.alert(
          "Permission Failed",
          "You've refused to allow this app to access your contacts!"
        );
      }
    } catch (error: any) {
      setShowLoader(false);
      setContacts({
        contactList: [],
        isContactListEmpty: true,
      });
      Alert.alert(
        "Contacts API Failed",
        error?.message
          ? error.message
          : "We are unable to fetch contacts list. Please try again later"
      );
    }
  };

  // This method is used to collect data and send to api calling method
  const submitContacts = () => {
    setShowDoneLoader(true);
    const requestData = selectedContacts.map((contact: any) => {
      return {
        id: contact?.id,
        contactName: contact.name,
        phoneNumber:
          Array.isArray(contact?.phoneNumbers) &&
          contact?.phoneNumbers?.length > 0 &&
          contact?.phoneNumbers[0]?.number,
      };
    });
    saveContactsToDatabase(requestData);
  };

  // This method is used to add and remove contacts during checkbox change
  const receiveSelectedContact = (contact: any) => {
    const index = selectedContacts.findIndex((e: any) => e.id === contact.id);
    if (index === -1) setSelectedContacts([...selectedContacts, contact]);
    else {
      const allContacts = [...selectedContacts];
      allContacts.splice(index, 1);
      setSelectedContacts(allContacts);
    }
  };

  // This method is used to save contacts list in database
  const saveContactsToDatabase = async (contactsData: any) => {
    let contactNames = "";
    let contactPhoneNumbers = "";

    if (contactsData.length > 0) {
      contactNames = contactsData
        .map(
          (contact: any) =>
            contact.contactName !== "" &&
            contact.contactName !== null &&
            contact.contactName
        )
        .toString();
      contactPhoneNumbers = contactsData
        .map(
          (contact: any) =>
            contact.phoneNumber !== "" &&
            contact.phoneNumber !== null &&
            contact.phoneNumber
        )
        .toString();
    } else return;
    try {
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("name", contactNames);
      formData.append("contact", contactPhoneNumbers);
      const response = await instance.post("/emergency_contact_add", formData);
      if (response.status === 200 && response.data?.status === true) {
        setShowDoneLoader(false);

        toast.show(
          "Your all selected contacts were successfully added in database.",
          { type: "success" }
        );
        userDetailsContextData?.updateContactList(true); //Updating Contact List Globally
        navigation.navigate("ContactsListingWithHelp");
      } else {
        setShowDoneLoader(false);

        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while adding contacts. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } catch (error: any) {
      setShowDoneLoader(false);

      toast.show(
        error.message
          ? error.message
          : "Getting an error while adding contacts. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  // Send Contact Data to Contact Screen
  const renderItem = ({ item }: any) => {
    return (
      <IndividualContact
        contact={item}
        sendSelectedContact={receiveSelectedContact}
      />
    );
  };
  return (
    <>
      {showLoader && (
        <Loader message=" Please wait. We are fetching contacts" />
      )}

      {contacts.isContactListEmpty && contacts.contactList.length === 0 ? (
        <>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 22,
            }}
          >
            Contacts not Available
          </Text>
        </>
      ) : (
        <>
          {!contacts.isContactListEmpty && contacts.contactList.length > 0 && (
            <>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.selectedAndAddContactBtns}>
                  Selected: {selectedContacts?.length}
                </Text>
                <TouchableOpacity
                  onPress={submitContacts}
                  disabled={!selectedContacts?.length}
                >
                  <Text
                    style={[
                      {
                        alignSelf: "flex-start",
                        padding: "2%",
                        marginTop: "10%",
                        marginRight: "5%",
                        borderRadius: 10,
                        fontSize: SIZES.width > 400 ? 20 : 15,
                        fontWeight: "bold",
                        color: "white",
                        backgroundColor: !selectedContacts?.length
                          ? "darkgrey"
                          : COLORS.voilet,
                      },
                    ]}
                  >
                    Add Contacts
                    {showDoneLoader && (
                      <View>
                        <ActivityIndicator size={19} />
                      </View>
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          <FlatList
            data={contacts.contactList}
            renderItem={renderItem}
            style={styles.list}
            initialNumToRender={20}
            maxToRenderPerBatch={50}
          />
        </>
      )}
    </>
  );
};
// ====================================================================================================
// CSS CODE
const styles = StyleSheet.create({
  list: {
    // flex: 1,
  },
  selectedAndAddContactBtns: {
    backgroundColor: COLORS.voilet,
    padding: "2%",
    margin: "5%",
    borderRadius: 10,
    fontSize: SIZES.width > 400 ? 20 : 15,
    fontWeight: "bold",
    color: "white",
  },
});
export default PhonebookContactList;
// =============================================== THE END =====================================================
