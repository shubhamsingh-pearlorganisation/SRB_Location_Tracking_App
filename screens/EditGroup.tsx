import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../App";
import { useToast } from "react-native-toast-notifications";
// -----------------------------------------------------------------

const EditGroup = ({ route, navigation }: any) => {
  console.log("groupDetails::: ", route?.params?.groupDetails);
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);

  // Component's Local States
  // ========================
  const [state, setState] = useState("public");
  const [publicChecked, setpublicChecked] = useState("true");
  const [privateChecked, setprivateChecked] = useState("false");

  function renderMembers() {
    return (
      <Pressable style={styles.memberListItem}>
        <View style={styles.memberListItemImage}>
          <MaterialCommunityIcons
            name="numeric-1"
            size={SIZES.width > 400 ? 25 : 20}
            color={COLORS.voilet}
          />
        </View>
        <View>
          <Text style={styles.memberListItemName}>Username</Text>
          <Text style={styles.memberListItemCode}>Location</Text>
          <Text style={styles.memberListItemCode}>Location line</Text>
        </View>
        <View style={styles.memberListItemType}>
          <Text
            style={{
              color: "black",
              fontWeight: "700",
            }}
          >
            07th Feb {"\n"}05:16 pm
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <Text style={styles.textInput}>Group Title</Text>
        <MaterialIcons name="edit" size={SIZES.width > 400 ? 30 : 25} />
      </View>
      <View style={styles.cardHolder}>
        <View style={styles.card}>
          <Pressable
            style={{
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              setState("public");
              setpublicChecked("true");
              setprivateChecked("false");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                margin: 10,
              }}
            >
              <Text style={styles.cardHeading}>Public</Text>
              <Pressable
                style={[
                  publicChecked == "true" ? styles.checked : styles.unchecked,
                  styles.radio,
                ]}
              />
            </View>
            <Text style={styles.cardText}>
              All members can see eachother & their location.
            </Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <Pressable
            style={{
              width: "100%",
              height: "100%",
            }}
            onPress={() => {
              setState("private");
              setpublicChecked("false");
              setprivateChecked("true");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                margin: 10,
              }}
            >
              <Text style={styles.cardHeading}>Private</Text>
              <Pressable
                style={[
                  privateChecked == "true" ? styles.checked : styles.unchecked,
                  styles.radio,
                ]}
              />
            </View>
            <Text style={styles.cardText}>Only you can see other members</Text>
          </Pressable>
        </View>
      </View>

      <TouchableOpacity
        style={{
          marginTop: "5%",
          marginBottom: "10%",
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
          Update
        </Text>
      </TouchableOpacity>
      <View style={styles.memberList}>
        <ScrollView
          style={{
            backgroundColor: "grey",
          }}
        >
          {renderMembers()}
          {renderMembers()}
          {renderMembers()}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
// =========================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  memberListItem: {
    backgroundColor: "white",
    alignItems: "center",
    height: "auto",
    flexDirection: "row",
    padding: "2%",
    marginBottom: 2,
  },
  memberListItemImage: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    elevation: 5,
    shadowRadius: 5,
    padding: "1%",
    marginRight: 10,
    marginLeft: 0,
    borderRadius: 20,
  },
  memberListItemName: {
    fontSize: SIZES.width > 400 ? 20 : 18,
  },
  memberListItemCode: {
    fontSize: SIZES.width > 400 ? 18 : 15,
    color: "grey",
  },
  memberListItemType: {
    borderRadius: 10,
    width: "auto",
    height: "auto",
    padding: 5,
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: SIZES.width > 400 ? 18 : 15,
    right: "1%",
    position: "absolute",
  },
  memberList: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "transparent",
    width: SIZES.width,
    zIndex: 0,
    padding: SIZES.width > 400 ? "3%" : "4%",
    height: "40%",
  },
  textInput: {
    fontSize: SIZES.width > 400 ? 50 : 40,
    backgroundColor: "transparent",
    textAlign: "center",
    borderBottomWidth: 0,
    margin: 20,
  },
  focusedTextInput: {
    borderBottomWidth: 0,
  },
  card: {
    width: SIZES.width * 0.4,
    height: SIZES.height * 0.2,
    margin: SIZES.width * 0.05,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.7,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    padding: "2%",
    borderRadius: 20,
  },
  cardHolder: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
    alignContent: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: "#66BD6F",
  },
  unchecked: {
    backgroundColor: "white",
  },
  radio: {
    height: SIZES.width > 400 ? 25 : 20,
    width: SIZES.width > 400 ? 25 : 20,
    borderRadius: 30,
    right: 0,
    position: "absolute",
  },
  cardHeading: {
    fontSize: SIZES.width > 400 ? 30 : 20,
  },
  cardText: {
    fontSize: SIZES.width > 400 ? 20 : 15,
    width: SIZES.width > 400 ? "70%" : "90%",
    bottom: "20%",
    position: "absolute",
  },
});

export default EditGroup;
// =============================================== THE END =======================================================
