import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { profile } from "../constants/images";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <TouchableOpacity 
        style={{ top: "2%", left: "2%", position: "absolute", flexDirection:'row' }}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={40}
          color={COLORS.white}
        />
        <Text style={[styles.textView, { fontWeight: "600", color: COLORS.white, alignSelf:'center' }]} >Back</Text>
        </TouchableOpacity>
        
        <Image source={profile} style={styles.profileImage} />
        <Text
          style={[styles.textView, { fontWeight: "600", color: COLORS.white }]}
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
  bottomView:{
    margin:"5%",
    alignItems:'center',
    height:'50%',
    justifyContent:'space-evenly'
  },
  textView: {
    fontSize: 25,
    fontWeight: "600",
    color: COLORS.voilet,
    borderColor:COLORS.voilet,
    borderWidth:1,
    width:SIZES.width*.7,
    margin:"1%"
  },
});
export default ProfileScreen;
