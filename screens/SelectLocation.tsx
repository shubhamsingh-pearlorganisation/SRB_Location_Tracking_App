import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SrbButton from "../components/SrbButton";
import { showError } from "../core/utils/helper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../core/utils/constants";
// ---------------------------------------------------------------------------------------------

const SelectLocation = (props: any) => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    destinationCords: {
      latitude: 30.3165,
      longitude: 78.0322,
    },
  });

  const { destinationCords } = state;

  const checkValid = () => {
    if (Object.values(destinationCords).length === 0) {
      showError("Please enter your destination location");
      return false;
    }
    return true;
  };

  const onDone = () => {
    const isValid = checkValid();
    if (isValid) {
      props.route.params.getCordinates({
        ...destinationCords,
      });
      navigation.goBack();
    }
  };

  const fetchDestinationCords = (lat: number, lng: number) => {
    setState({
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: "white", flex: 1, padding: 12 }}
      >
        <GooglePlacesAutocomplete
          placeholder={"Enter destination"}
          fetchDetails={true}
          enablePoweredByContainer={false}
          nearbyPlacesAPI={"GooglePlacesSearch"}
          debounce={400}
          onPress={(data, details: any) => {
            fetchDestinationCords(
              details.geometry.location.lat,
              details.geometry.location.lng
            );
          }}
          query={{
            key: GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            textInputContainer: styles.containerStyle,
            textInput: styles.textInputStyle,
          }}
        />
        <View style={{ marginBottom: 16 }} />
        <SrbButton
          btnText="Done"
          onPress={onDone}
          btnStyle={{ marginTop: 24 }}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: "white",
  },
  textInputStyle: {
    height: 48,
    color: "black",
    fontSize: 16,
    backgroundColor: "#f3f3f3",
  },
});
export default SelectLocation;

// ------------------------------------------ THE END ---------------------------------------------------
