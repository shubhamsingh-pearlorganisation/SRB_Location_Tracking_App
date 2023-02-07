import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  Pressable,
} from "react-native";

const ContactsListing = ({ navigation }: any) => {
  const redirectToTimerScreen = () => {
    navigation.navigate("EmergencyTimer");
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => redirectToTimerScreen()}>
        <View style={styles.image}>
          <Text style={styles.needHelp}>NEED HELP?</Text>
          <View style={styles.lineStyle} />
          <Text style={styles.pressHere}>PRESS HERE</Text>
        </View>
      </Pressable>
      <Text style={styles.title}>Emergency Contacts</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 108,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
    color: "#000000",
    marginBottom: 47,
  },
  image: {
    width: 142,
    height: 142,
    marginBottom: 87,
    backgroundColor: "#FF0000",
    position: "relative",
    borderRadius: 91,
  },
  needHelp: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
    position: "absolute",
    top: 36,
    right: 12,
  },
  pressHere: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
    position: "absolute",
    top: 81,
    right: 12,
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    position: "absolute",
    width: "80%",
    textAlign: "center",
    left: 12,
    top: 71,
  },
});

export default ContactsListing;
