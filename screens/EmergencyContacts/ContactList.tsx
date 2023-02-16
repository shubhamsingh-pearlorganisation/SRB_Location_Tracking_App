import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from "react-native";
import * as Contacts from "expo-contacts";
import { COLORS, SIZES } from "../../constants";
import IndividualContact from "./IndividualContact";
// -------------------------------------------------------------------------------

const ContactsList = ({ navigation }: any) => {
  // Component's Local States
  // ========================
  const [contacts, setContacts] = useState<any>({
    contactList: [],
    isContactListEmpty: false,
  });
  const [showLoader, setShowLoader] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<any>([]);

  // Fetch Contacts on component mount stage
  useEffect(() => {
    fetchContactsFromUserPhoneDirectory();

    // We set contacts length to zero and clear contacts data when component destroy (un-mounted).
    return () => {
      setContacts({
        contactList: [],
        isContactListEmpty: true,
      });
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
          setContacts({
            contactList: data,
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

  const onDonePressed = () => {
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
    console.log("Request Data::: ", requestData);
    navigation.navigate("EmergencyContactsListing", {
      selectedContacts: requestData,
    });
  };

  const receiveSelectedContact = (contact: any) => {
    const index = selectedContacts.findIndex((e: any) => e.id === contact.id);
    if (index === -1) setSelectedContacts([...selectedContacts, contact]);
    else {
      const allContacts = [...selectedContacts];
      allContacts.splice(index, 1);
      setSelectedContacts(allContacts);
    }
  };

  useEffect(() => {
    console.log("Selected Contacts ::: ", selectedContacts);
    console.log("Selected Contacts ::: ", selectedContacts?.length);
  }, [selectedContacts]);

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
        <>
          <View style={{ marginTop: 30 }}>
            <ActivityIndicator size={SIZES.width > 400 ? 50 : 30} />
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 22,
              }}
            >
              Please wait. We are fetching contacts
            </Text>
          </View>
        </>
      )}
      {contacts.isContactListEmpty && contacts.contactList.length === 0 ? (
        <>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 20,
            }}
          >
            Contacts not Available
          </Text>
        </>
      ) : (
        <>
          {!contacts.isContactListEmpty && contacts.contactList.length > 0 && (
            <TouchableOpacity
              onPress={onDonePressed}
              style={{
                alignSelf: "flex-end",
                backgroundColor:
                  selectedContacts?.length > 0 ? COLORS.voilet : "darkgrey",
                padding: "2%",
                marginTop: "2%",
                marginRight: "2%",
                borderRadius: 10,
              }}
              disabled={!selectedContacts?.length}
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
          )}

          <FlatList
            data={contacts.contactList}
            renderItem={renderItem}
            style={styles.list}
            initialNumToRender={100}
            maxToRenderPerBatch={200}
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
    flex: 1,
  },
});
export default ContactsList;
// =============================================== THE END =====================================================
