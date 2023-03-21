import React, { useEffect, useState, useContext, memo } from "react";
import {
  FlatList,
  Text,
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
import NoDataFound from "../../components/NoDataFound";
import { styles } from "./style";
import { Searchbar } from "react-native-paper";

// -------------------------------------------------------------------------------

const PhonebookContactList = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const toast = useToast();
  const authContextData: any = useContext(AuthContext);
  const userDetailsContextData: any = useContext(UserDetailsContext);

  // Component's Local States
  // ========================
  const [contacts, setContacts] = useState<any>({
    contactList: [],
    isContactListEmpty: false,
  });
  const [backupContacts, setBackupContacts] = useState<any>([]);
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

  // ============================= Contacts List Filtering based on Search - Code Start ===============================
  const onChangeSearch = (query: string) => setSearchQuery(query);

  // This method is used to filter contacts list
  const filterSearchedContacts = () => {
    if (contacts.contactList?.length > 0 && searchQuery.length > 0) {
      const filteredContacts = contacts.contactList.filter((contact: any) =>
        contact.name.match(searchQuery)
      );
      setContacts({ ...contacts, contactList: filteredContacts });
    } else {
      setContacts({ ...contacts, contactList: backupContacts });
    }
  };

  useEffect(() => {
    filterSearchedContacts();
  }, [searchQuery]);
  // ============================= Contacts List Filtering based on Search - Code Finish ===============================

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

          // Finding those contacts which are not available in database but available in
          // complete phone book list.
          const uniqueContacts = contactsWithName.filter((indContact: any) => {
            return !userDetailsContextData?.userContactsList.some(
              (selContact: any) => {
                return (
                  Array.isArray(indContact.phoneNumbers) &&
                  indContact.phoneNumbers.length > 0 &&
                  selContact.contact &&
                  selContact.contact === indContact.phoneNumbers[0].number
                );
              }
            );
          });
          setContacts({
            contactList: uniqueContacts,
            isContactListEmpty: false,
          });
          setBackupContacts(uniqueContacts);
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
  // -----------------------------------------------------------------------------
  return (
    <>
      {showLoader && (
        <Loader message={" Please wait. \nWe are fetching contacts"} />
      )}

      {contacts.isContactListEmpty && contacts.contactList.length === 0 ? (
        <NoDataFound message="No Contacts found in your Phonebook. Please add some contacts first." />
      ) : (
        <>
          {!contacts.isContactListEmpty && contacts.contactList.length > 0 && (
            <>
              <Searchbar
                placeholder="Search Contacts here.."
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ marginHorizontal: 20, marginVertical: 20 }}
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.selectedAndAddContactBtns}>
                  Selected: {selectedContacts?.length} out of{" "}
                  {contacts?.contactList?.length}
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
            initialNumToRender={20}
            maxToRenderPerBatch={50}
          />
        </>
      )}
    </>
  );
};

export default memo(PhonebookContactList);
// =============================================== THE END =====================================================
