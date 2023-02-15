import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import Contact from "./Contact";
import * as Contacts from "expo-contacts";
const ContactsList = () => {
    // alert();
  const [contacts, setContacts] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.PHONE_NUMBERS],
        });
        if (data.length > 0) {
          setContacts(data);
          console.log(data[0]);
        }
      }
    })();
  }, []);
  const keyExtractor = ({item, idx}:any) => {
    return item?.id?.toString() || idx.toString();
  };
  const renderItem = ({ item, index }:any) => {
    return <Contact contact={item} />;
  };
  return (
    <FlatList
      data={contacts}
      renderItem={renderItem}
    //   keyExtractor={keyExtractor}
      style={styles.list}
      initialNumToRender={100}
      maxToRenderPerBatch={50}
      windowSize={10}
    />
  );
};
const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
export default ContactsList;