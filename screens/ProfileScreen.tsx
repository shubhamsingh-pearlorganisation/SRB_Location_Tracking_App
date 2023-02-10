import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { profile } from "../constants/images";

const ProfileScreen = ({ navigation }: any) => {
  const goBack = () => {
    navigation.navigate("Main");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View
          style={{
            top: "2%",
            left: "2%",
            right: "2%",
            position: "absolute",
            flexDirection: "row",
            width: "auto",
          }}
        >
          <TouchableOpacity
            style={{
              top: 0,
              left: 0,
              position: "absolute",
              flexDirection: "row",
              width: "100%",
            }}
            onPress={() => goBack()}
          >
            <MaterialIcons
              name="keyboard-arrow-left"
              size={40}
              color={COLORS.white}
            />
            <Text
              style={[
                styles.textView,
                {
                  fontWeight: "600",
                  color: COLORS.white,
                  alignSelf: "center",
                  textAlign: "left",
                  padding: 0,
                  borderWidth: 0,
                },
              ]}
            >
              Back
            </Text>
          </TouchableOpacity>

          {/* -------------------------Edit Profile Button--------------------------------------  */}
          <TouchableOpacity
            style={{
              right: 0,
              top: 0,
              position: "absolute",
            }}
          >
            <MaterialIcons name="edit" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        <Image source={profile} style={styles.profileImage} />
        <Text
          style={[
            styles.textView,
            { fontWeight: "600", color: COLORS.white, padding: 0 },
          ]}
        >
          User Name
        </Text>
      </View>
      <View style={styles.bottomView}>
        <Text style={styles.textView}>Email</Text>
        <Text style={styles.textView}>Date Of Birth</Text>
        <Text style={styles.textView}>Contact Number</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    height: "40%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: COLORS.voilet,
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
  },
  profileImage: {
    width: SIZES.width * 0.2,
    height: SIZES.width * 0.2,
    borderRadius: 40,
    marginBottom: "5%",
  },
  bottomView: {
    margin: "5%",
    alignItems: "center",
    height: "30%",
    justifyContent: "space-evenly",
  },
  textView: {
    fontSize: 25,
    fontWeight: "600",
    color: COLORS.voilet,
    borderColor: COLORS.voilet,
    borderWidth: 1,
    width: SIZES.width * 0.7,
    textAlign: "center",
    padding: "2%",
    borderRadius: 30,
  },
});
export default ProfileScreen;
