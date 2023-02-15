import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Checkbox from 'expo-checkbox';


const Contact = ({ contact }: any) => {

    const [isChecked, setChecked] = useState(false);

  console.log("contacts:::", contact);
  //   console.log(
  //     "contact?.phoneNumbers[0]?.number::::",
  //     contact?.phoneNumbers[0]?.number
  //   );

  return (
    <View style={styles.contactCon}>
      <View style={styles.contactDat}>
        <Text style={styles.name}>{contact?.name}</Text>
        <Text style={styles.phoneNumber}>
          {Array.isArray(contact?.phoneNumbers) &&
            contact?.phoneNumbers?.length > 0 &&
            contact?.phoneNumbers[0]?.number}
        </Text>
      </View>
      <View style={{
       padding:'2%'
      }}>
      <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
    width: "95%",
    alignSelf:'center'
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },
  contactDat: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: "#888",
  },
  checkbox:{
    margin:10
  }
});
export default Contact;
