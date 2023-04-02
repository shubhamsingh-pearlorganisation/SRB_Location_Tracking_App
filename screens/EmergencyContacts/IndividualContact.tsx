import React, { useState, memo } from "react";
import { View, Text, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { styles } from "./style";
// -----------------------------------------------------------------

const IndividualContact = ({ contact, sendSelectedContact }: any) => {
  // Component's Local States
  // ========================
  const [isChecked, setChecked] = useState(false);

  return (
    <Pressable
      onPress={() => {
        setChecked(!isChecked);
        sendSelectedContact(contact);
      }}
    >
      <View style={styles.contactCon}>
        <View style={styles.contactDat}>
          <Text style={styles.name}>{contact?.name}</Text>
          <Text style={styles.phoneNumber}>
            {Array.isArray(contact?.phoneNumbers) &&
              contact?.phoneNumbers?.length > 0 &&
              contact?.phoneNumbers[0]?.number}
          </Text>
        </View>
        <View
          style={{
            padding: "2%",
          }}
        >
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default memo(IndividualContact);
// =============================================== THE END =====================================================
