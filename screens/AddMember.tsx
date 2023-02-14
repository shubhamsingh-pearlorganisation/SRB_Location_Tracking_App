import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Share,
} from "react-native";

import { COLORS, SIZES } from "../constants";

const AddMember = ({ route, navigation }: any) => {
  const shareData = async () => {
    try {
      await Share.share({
        message: `Person has invited you to \nJoin The Group\n\n click the below link \n "https://www.google.com/" \n or manually enter the code \n ${
          route?.params?.groupDetails?.group_code
            ? route?.params?.groupDetails?.group_code
            : "N.A"
        }`,
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingText}>{"Invite members to the Group"}</Text>
        <Text style={styles.subText}>
          {"Share your code out loud or send it in  a message"}
        </Text>
      </View>

      <View style={styles.codeHolderView}>
        <Text style={styles.code}>
          {route?.params?.groupDetails?.group_code
            ? route?.params?.groupDetails?.group_code
            : "N.A"}
        </Text>
        <TouchableOpacity
          style={{
            position: "absolute",
            // left: "40%",
            alignSelf: "center",
            bottom: "15%",
            width: SIZES.width * 0.6,
            height: SIZES.width > 400 ? 60 : 40,
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: COLORS.voilet,
          }}
          onPress={shareData}
        >
          <Text
            style={{
              fontWeight: "600",
              fontSize: SIZES.width > 400 ? 25 : 20,
              color: "white",
              alignSelf: "center",
            }}
          >
            Send Code
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    marginTop: "5%",
  },
  headingTextContainer: {
    justifyContent: "flex-start",
    width: "85%",
  },
  headingText: {
    fontSize: SIZES.width > 400 ? 50 : 20,
    fontWeight: "700",
    color: COLORS.black,
    margin: "2%",
  },
  subText: {
    fontSize: SIZES.width > 400 ? 25 : 15,
    fontWeight: "400",
    color: "rgba(0,0,0,0.6)",
    margin: "2%",
  },
  codeHolderView: {
    width: SIZES.width * 0.8,
    height: SIZES.width > 400 ? SIZES.width * 0.4 : SIZES.width * 0.5,
    borderRadius: 30,
    backgroundColor: "rgba(112, 94, 207, .4)",
    justifyContent: "center",
    alignItems: "center",
  },
  code: {
    fontSize: SIZES.width > 400 ? 50 : 30,
    marginBottom: "10%",
    fontWeight: "700",
    color: COLORS.voilet,
  },
});
export default AddMember;
