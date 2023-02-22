import { useEffect, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import { View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
// ----------------------------------------------------------------------------

// This is the common component through which we can list country name with their flag and country code
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
    width: SIZES.width > 400 ? SIZES.width * 0.8 : SIZES.width * 0.9,
  },
  textContainerStyle: {
    backgroundColor: COLORS.voilet,
    width: "auto",
  },
  textInputStyle: {
    textAlign: "left",
    color: COLORS.white,
    alignItems: "center",
    fontSize: SIZES.width > 400 ? 25 : 20,
    width: "auto",
  },
  codeTextStyle: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: SIZES.width > 400 ? 25 : 18,
    width: "25%",
  },
  flagStyle: {
    width: "20%",
    height: "auto",
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default CountryDropdown;
// ===================================== THE END =======================================
