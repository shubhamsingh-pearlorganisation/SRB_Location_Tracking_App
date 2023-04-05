import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  Share,
  Platform,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthContext,
  LocationTrackingContext,
  UserDetailsContext,
} from "../App";
// ---------------------------------------------------------------------------------------------

const MenuScreen = ({ navigation }: any) => {
  const authContextData: any = useContext(AuthContext);
  const userDetailsContextData: any = useContext(UserDetailsContext);

  // This method is used to show Logout confirmation popup
  const logoutConfirmation = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout from the app?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => handleLogout(),
          style: "default",
        },
      ]
    );
  };

  // This method is used to logout the user
  const handleLogout = () => {
    try {
      const result: any = AsyncStorage.clear();
      if (result) {
        Alert.alert(
          "Logout",
          "You are logout Successfully. Please login to continue."
        );
        // Sending back token value to app component so that we can redirect to splash screen
        authContextData.setTokenAfterLogin(null);
      }
    } catch (error: any) {
      Alert.alert("Getting an error during logout: ", error?.message);
    }
  };

  const locTrackingContext: any = useContext(LocationTrackingContext);
  const [lat, setLat] = useState<any>("");
  const [lng, setLng] = useState<any>("");

  useEffect((): any => {
    const interval = setInterval(() => {
      setLat(locTrackingContext?.locationData?.lat);
      setLng(locTrackingContext?.locationData?.lng);
    }, 6000);
    return () => clearInterval(interval);
  }, [locTrackingContext]);

  const scheme = Platform.select({ ios: "maps:0,0?q=", android: "geo:0,0?q=" });
  const latLng = `${lat},${lng}`;
  const label = userDetailsContextData?.userDetails?.name;
  const url: any = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  const shareLocation = () => {
    Linking.openURL(url);
  };
  // ---------------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: SIZES.width > 400 ? 30 : 20,
            alignSelf: "center",
            fontWeight: "600",
            marginLeft: "2%",
          }}
        >
          {userDetailsContextData?.userDetails?.name
            ? userDetailsContextData?.userDetails?.name
            : "N.A"}
        </Text>

        {!userDetailsContextData?.userDetails?.image ? (
          <FontAwesome5
            style={[styles.icons, { right: 0, position: "absolute" }]}
            name="user-circle"
            size={SIZES.width > 400 ? 30 : 20}
            color={"black"}
          />
        ) : (
          <>
            <Image
              source={{ uri: userDetailsContextData?.userDetails?.image }}
              style={[styles.profileImage, { right: 0, position: "absolute" }]}
            />
          </>
        )}
      </View>
      <View>
        <Pressable
          style={{
            width: "99%",
            flexDirection: "row",
            marginTop: "5%",
            borderBottomColor: "black",
            borderBottomWidth: 2,
            margin: 10,
          }}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <FontAwesome5
            style={[styles.icons, { left: 0 }]}
            name="user-circle"
            size={SIZES.width > 400 ? 30 : 20}
            color={"black"}
          />
          <Text
            style={{
              fontSize: SIZES.width > 400 ? 30 : 20,
              alignSelf: "center",
              fontWeight: "600",
            }}
          >
            Profile
          </Text>
          <MaterialIcons
            style={[styles.icons, { right: 0, position: "absolute" }]}
            name="keyboard-arrow-right"
            size={SIZES.width > 400 ? 30 : 20}
            color={"black"}
          />
        </Pressable>
      </View>

      <View
        style={{
          width: "99%",
          borderBottomColor: "black",
          borderBottomWidth: 2,
          margin: 10,
        }}
      >
        <View>
          <Pressable
            style={{
              width: "99%",
              flexDirection: "row",
            }}
            onPress={() => shareLocation()}
          >
            <Ionicons
              style={[styles.icons]}
              name="ios-share-outline"
              size={SIZES.width > 400 ? 30 : 20}
              color={"black"}
            />

            <Text
              style={{
                fontSize: SIZES.width > 400 ? 30 : 20,
                alignSelf: "center",
                fontWeight: "600",
              }}
            >
              Share Temporary Location
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={{
              width: "99%",
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("Emergency")}
          >
            <MaterialCommunityIcons
              style={[styles.icons]}
              name="car-brake-alert"
              size={SIZES.width > 400 ? 30 : 20}
              color={"black"}
            />

            <Text
              style={{
                fontSize: SIZES.width > 400 ? 30 : 20,
                alignSelf: "center",
                fontWeight: "600",
              }}
            >
              Emergency
            </Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Pressable
          style={{
            alignItems: "center",
            width: "99%",
            flexDirection: "row",
          }}
          onPress={() => navigation.navigate("SettingsScreen")}
        >
          <Ionicons
            style={[styles.icons, { paddingLeft: 5, top: "1%" }]}
            name="settings-sharp"
            size={SIZES.width > 400 ? 30 : 20}
            color={"black"}
          />

          <Text
            style={{
              fontSize: SIZES.width > 400 ? 30 : 20,
              alignSelf: "center",
              fontWeight: "600",
            }}
          >
            Settings
          </Text>
          <MaterialIcons
            style={[
              styles.icons,
              { right: 0, position: "absolute", top: "5%" },
            ]}
            name="keyboard-arrow-right"
            size={SIZES.width > 400 ? 30 : 20}
            color={"black"}
          />
        </Pressable>
      </View>
      <View
        style={{
          bottom: 0,
          position: "absolute",
          marginBottom: "5%",
          borderTopColor: "black",
          borderTopWidth: 2,
          width: "99%",
          margin: 10,
        }}
      >
        <View>
          <Pressable
            style={{
              width: "99%",
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("FAQScreen")}
          >
            <MaterialCommunityIcons
              style={[styles.icons, { paddingLeft: 5 }]}
              name="frequently-asked-questions"
              size={SIZES.width > 400 ? 30 : 20}
              color={"black"}
            />

            <Text
              style={{
                fontSize: SIZES.width > 400 ? 30 : 20,
                alignSelf: "center",
                fontWeight: "600",
              }}
            >
              FAQ & Support
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={{
              width: "99%",
              flexDirection: "row",
            }}
            onPress={() => navigation.navigate("FeedbackScreen")}
          >
            <MaterialCommunityIcons
              style={[styles.icons, { paddingLeft: 5 }]}
              name="thought-bubble"
              size={SIZES.width > 400 ? 30 : 20}
              color={"black"}
            />

            <Text
              style={{
                fontSize: SIZES.width > 400 ? 30 : 20,
                alignSelf: "center",
                fontWeight: "600",
              }}
            >
              Feeback & suggestions
            </Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={{
              width: "99%",
              flexDirection: "row",
            }}
            onPress={() => logoutConfirmation()}
          >
            <MaterialIcons
              style={[styles.icons, { paddingLeft: 5 }]}
              name="logout"
              size={SIZES.width > 400 ? 30 : 20}
              color={"black"}
            />

            <Text
              style={{
                fontSize: SIZES.width > 400 ? 30 : 20,
                alignSelf: "center",
                fontWeight: "600",
              }}
            >
              Logout
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
// ---------------------------------------------------------------------------------------------
// CSS CODE
const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
    backgroundColor: COLORS.white,
  },
  icons: {
    margin: 10,
  },
  profileImage: {
    width: SIZES.width > 400 ? 50 : 35,
    height: SIZES.width > 400 ? 50 : 35,
    borderRadius: 25,
  },
});
export default MenuScreen;
// ------------------------------------------- THE END --------------------------------------------------
