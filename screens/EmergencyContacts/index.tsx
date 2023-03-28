import { View, Text, Image, Pressable } from "react-native";
import { images } from "../../constants";
const { emergencyContactHome } = images;
import { useState, useEffect, useContext } from "react";
import { UserDetailsContext } from "../../App";
import { styles } from "./style";
import ContactsListingWithHelp from "./ContactsListingWithHelp";
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
    <>
      <ContactsListingWithHelp navigation={navigation} />
    </>
  );
};

export default EmergencyContactsScreen;
// =============================================== THE END =======================================================
