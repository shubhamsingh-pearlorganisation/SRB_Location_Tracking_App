import { useEffect, useState } from "react";
import PhoneInput from "react-native-phone-number-input";
import { View, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const CountryDropdown = () => {
  const [value, setValue] = useState<any>("");
  useEffect(() => {
    console.log(value);
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
        textInputProps = {{placeholderTextColor:COLORS.white}}
        layout="first"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  countryCodeContainer: {
    backgroundColor: COLORS.voilet,
    width: SIZES.width * 0.5,
  },
  textContainerStyle: {
    backgroundColor: COLORS.voilet,
    // width:SIZES.width*.1,
  },
  textInputStyle: {
    textAlign: "center",
    color: COLORS.white,
    alignItems: "center",
    fontSize: 20,
  },
  codeTextStyle: {
    textAlign: "center",
    color: COLORS.white,
    alignItems: "center",
    fontSize: 20,  },
  flagStyle: {
    width: "20%",
    backgroundColor: "white",
    borderRadius: 5,
  },
});

export default CountryDropdown;
