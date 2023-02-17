import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext, GroupsAndMembersContext } from "../App";
import { useToast } from "react-native-toast-notifications";
import { TextInput } from "react-native-paper";
import { instance } from "../core/utils/AxiosInterceptor";
import Loader from "../components/Loader";

// -----------------------------------------------------------------

const EditGroup = ({ route, navigation }: any) => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext); //Used for fetching authentication token
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  // Component's Local States
  // ========================
  const [showLoader, setShowLoader] = useState(false);
  const [publicChecked, setpublicChecked] = useState<any>(
    route?.params?.groupDetails?.group_type === 1 ? true : false
  );

  // This "editGroupFormDetails" state is used to store edit form details
  const [editGroupFormDetails, setEditGroupFormDetails] = useState<any>({
    title: route?.params?.groupDetails?.title
      ? route?.params?.groupDetails?.title
      : "",
    groupMembers: route?.params?.groupDetails?.users
      ? route?.params?.groupDetails?.users
      : [],
  });

  // This component is used to iterate group members on the screen
  const renderGroupMembers = (member: any) => {
    return (
      <Pressable style={styles.memberListItem}>
        {!member?.image ? (
          <View style={styles.memberListItemImage}>
            <MaterialCommunityIcons
              name="numeric-1"
              size={SIZES.width > 400 ? 25 : 20}
              color={COLORS.voilet}
            />
          </View>
        ) : (
          <>
            <Image
              source={{ uri: member?.image }}
              style={{
                width: SIZES.width > 400 ? 50 : 35,
                height: SIZES.width > 400 ? 50 : 35,
                borderRadius: 30,
                marginRight: "2%",
              }}
            />
          </>
        )}

        <View>
          <Text style={styles.memberListItemName}>
            {member?.name ? member?.name : "N.A"}
          </Text>
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
  };

  // This method is used to group update
  const handleGroupUpdate = async () => {
    if (
      editGroupFormDetails.title === "" ||
      editGroupFormDetails.title.toString().length < 3
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
        formData.append("id", route?.params?.groupDetails?.group_id);
        formData.append("title", editGroupFormDetails?.title);
        formData.append("group_type", publicChecked ? "1" : "2");
        setShowLoader(true);

        const response = await instance.post("/group_update", formData);
        if (response.status === 200 && response.data?.status === true) {
          setShowLoader(false);
          toast.show("Group details updated successfully!", {
            type: "success",
          });

          groupsAndMembersData.fetchGroupsAndMembersList(true); //Update Groups Listing
          navigation.navigate("Groups"); // Redirect back to Groups Listing Screen
        } else {
          setShowLoader(false);
          toast.show(
            response.data?.message
              ? response.data?.message
              : "Getting an error while updating a group details. Please try again later.",
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
            : "Getting an error while updating a group details. Please try again later.",
          {
            type: "error",
          }
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {showLoader && <Loader />}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <TextInput
          placeholder="Enter Group Title ..."
          style={styles.textInput}
          placeholderTextColor="rgba(0,0,0,0.4)"
          underlineColor="transparent"
          value={editGroupFormDetails?.title}
          maxLength={15}
          onChangeText={(val: any) =>
            setEditGroupFormDetails({
              ...editGroupFormDetails,
              title: val?.toString().trim(),
            })
          }
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
              setpublicChecked(true);
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
              setpublicChecked(false);
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
        onPress={handleGroupUpdate}
      >
        <Text
          style={{
            fontWeight: "400",
            fontSize: SIZES.width > 400 ? 25 : 20,
            color: "white",
            alignSelf: "center",
          }}
        >
          Update Group Details
        </Text>
      </TouchableOpacity>
      <View style={styles.memberList}>
        <ScrollView
          style={{
            backgroundColor: "lightgrey",
          }}
        >
          {editGroupFormDetails?.groupMembers?.length > 0 ? (
            editGroupFormDetails?.groupMembers.map((member: any, i: number) => (
              <View key={member?.group_code ? member?.group_code : i}>
                {renderGroupMembers(member)}
              </View>
            ))
          ) : (
            <>
              <Text>No Member Found</Text>
            </>
          )}
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
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
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
    fontSize: SIZES.width > 400 ? 40 : 30,
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
    paddingLeft: 10,
  },
});

export default EditGroup;
// =============================================== THE END =======================================================
