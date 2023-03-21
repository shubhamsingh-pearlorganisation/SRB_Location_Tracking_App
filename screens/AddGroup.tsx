import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { SIZES } from "../constants";
import { useToast } from "react-native-toast-notifications";
import { AuthContext, GroupsAndMembersContext } from "../App";
import { instance } from "../core/utils/AxiosInterceptor";
import Loader from "../components/Loader";
// ----------------------------------------------------------------------------
const AddGroup = ({ navigation }: any) => {
  const toast = useToast();

  const authContextData: any = useContext(AuthContext);
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  // Component's Local States
  // ========================
  const [showLoader, setShowLoader] = useState(false);
  const [publicChecked, setPublicChecked] = useState(true);

  // This "addGroupFormData" state is used to store form data
  const [addGroupFormData, setAddGroupFormData] = useState<any>({
    title: "",
    group_type: 1,
  });

  // This method is used to create new group
  const addNewGroup = async () => {
    if (
      addGroupFormData.title === "" ||
      addGroupFormData.title.toString().length < 3
    ) {
      Alert.alert(
        "Validation Failed",
        "Group title is required and should contain minimum 3 characters"
      );
      return;
    } else {
      try {
        const formData = new FormData();
        formData.append("token_id", authContextData?.token);
        formData.append("title", addGroupFormData?.title);
        formData.append("group_type", addGroupFormData?.group_type);
        setShowLoader(true);

        const response = await instance.post("/group_create", formData);
        if (response.status === 200 && response.data?.status === true) {
          setShowLoader(false);
          toast.show("Group created successfully!", {
            type: "success",
          });

          groupsAndMembersData.fetchGroupsAndMembersList(true); //Update Groups Listing Globally
          navigation.navigate("Groups"); // Redirect back to Groups Listing Screen
        } else {
          setShowLoader(false);
          toast.show(
            response.data?.message
              ? response.data?.message
              : "Getting an error while creating a new group. Please try again later.",
            {
              type: "error",
            }
          );
        }
      } catch (error: any) {
        setShowLoader(false);
        toast.show(
          error.message
            ? error.message
            : "Getting an error while creating a new group. Please try again later.",
          {
            type: "error",
          }
        );
      }
    }
  };
  // ----------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <View>
        {showLoader && <Loader />}
      <View>
        <View>
          <TextInput
            placeholder="Enter Group Title ..."
            style={styles.textInput}
            placeholderTextColor="rgba(0,0,0,0.4)"
            underlineColor="transparent"
            autoFocus
            onChangeText={(val: any) =>
              setAddGroupFormData({
                ...addGroupFormData,
                title: val?.toString(),
              })
            }
            maxLength={15}
          />
        </View>
        <View style={styles.cardHolder}>
          <View style={styles.card}>
            <Pressable
              style={{
                width: "100%",
                height: "100%",
              }}
              onPress={() => {
                setAddGroupFormData({ ...addGroupFormData, group_type: 0 });
                setPublicChecked(true);
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
                    publicChecked ? styles.checked : styles.unchecked,
                    styles.radio,
                  ]}
                />
              </View>
              <Text style={styles.cardText}>
                All members can see each other & their location.
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
                setAddGroupFormData({ ...addGroupFormData, group_type: 1 });
                setPublicChecked(false);
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
                    !publicChecked ? styles.checked : styles.unchecked,
                    styles.radio,
                  ]}
                />
              </View>
              <Text style={styles.cardText}>
                Only you can see other members
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      </View>
      

      <TouchableOpacity
        style={{
          marginTop: "5%",
          alignSelf: "center",
          width: SIZES.width - SIZES.width * 0.2,
          height: SIZES.width > 400 ? 60 : 40,
          justifyContent: "center",
          borderRadius: 30,
          backgroundColor: "#705ECF",
          marginBottom: "5%",
        }}
        onPress={addNewGroup}
      >
        <Text
          style={{
            fontWeight: "400",
            fontSize: SIZES.width > 400 ? 25 : 20,
            color: "white",
            alignSelf: "center",
          }}
        >
          Create Group
        </Text>
      </TouchableOpacity>
    </View>
  );
};
// =========================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textInput: {
    fontSize: SIZES.width > 400 ? 34 : 26,
    backgroundColor: "transparent",
    textAlign: "center",
    borderBottomWidth: 0,
    marginVertical: 10,
    marginHorizontal: 20,
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
    bottom: "10%",
    position: "absolute",
    paddingLeft: 10,
  },
});

export default AddGroup;

// ============================================== THE END ===================================================
