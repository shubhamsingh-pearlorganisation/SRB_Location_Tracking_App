import { useEffect, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import { View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const CountryDropdown = (props: any) => {
  // Component's Local States
  const [value, setValue] = useState(""); // Mobile Number without country code
  const [formattedValue, setFormattedValue] = useState(""); // Mobile Number with country code

  // Sending Complete Mobile Number to Login Component
  useEffect(() => {
    props.getCompleteMobileNumber(formattedValue, value); //Mobile Number with & without country code respectively
  }, [value]);

  return (
    <View>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        defaultCode="IN"
        containerStyle={styles.countryCodeContainer}
        textContainerStyle={styles.textContainerStyle}
        textInputStyle={styles.textInputStyle}
        codeTextStyle={styles.codeTextStyle}
        flagButtonStyle={styles.flagStyle}
        textInputProps={{ placeholderTextColor: COLORS.white }}
        layout="first"
        onChangeText={(text) => {
          setValue(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedValue(text);
        }}
      />
    </View>
  );
};
// =============================================================
// CSS CODE
const styles = StyleSheet.create({
  countryCodeContainer: {
    backgroundColor: COLORS.voilet,
    // width: SIZES.width * 0.5,
  },
  textContainerStyle: {
    backgroundColor: COLORS.voilet,
  },
  textInputStyle: {
    // textAlign: "center",
    color: COLORS.white,
    alignItems: "center",
    // fontSize: 20,
    fontSize:18
  },
  codeTextStyle: {
    textAlign: "center",
    color: COLORS.white,
    alignItems: "center",
    fontSize: 20,
  },
  flagStyle: {
    width: "20%",
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default CountryDropdown;
