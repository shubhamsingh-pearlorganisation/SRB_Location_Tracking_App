import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SIZES } from "../constants";

const JoinGroup = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          width: SIZES.width > 400 ? "50%" : "80%",
          alignItems: "center",
        }}
      >
        <Text style={styles.headingText}>Enter The Invite Code</Text>
        <View style={styles.codeBoxHolder}>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 5 }}
            placeholder=" "
            underlineColor="transparent"
          ></TextInput>
          <Text style={{ fontSize: 30 }}>-</Text>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
          ></TextInput>
        </View>
        <Text style={styles.subText}>
          Get The code from the person who created the Group
        </Text>
        <TouchableOpacity
          style={{
            // position: SIZES.height > 400 ? "absolute" : "relative",
            // bottom: SIZES.height > 400 ? "20%" : "10%",
            marginTop: "5%",
            alignSelf: "center",
            width: SIZES.width - SIZES.width * 0.2,
            height: SIZES.width > 400 ? 60 : 40,
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: "#705ECF",
          }}
          //   onPress={onPressSubmit}
        >
          <Text
            style={{
              fontWeight: "400",
              fontSize: SIZES.width > 400 ? 25 : 20,
              color: "white",
              alignSelf: "center",
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    alignItems: "center",
    padding: "2%",
  },
  headingText: {
    fontSize: SIZES.width > 400 ? 30 : 25,
    fontWeight: "600",
    margin: "2%",
    marginTop: "15%",
  },
  subText: {
    fontSize: SIZES.width > 400 ? 25 : 20,
    marginTop: "2%",
  },
  codeBoxHolder: {
    flexDirection: "row",
    alignItems: "center",
    margin: "5%",
    padding: "5%",
  },
  codeBox: {
    width: 30,
    fontSize: SIZES.width > 400 ? 25 : 20,
    borderRadius: 8,
    margin: "1%",
    paddingHorizontal: 2,
    textAlign: "center",
  },
});

export default JoinGroup;
