import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import { AuthContext, GroupsAndMembersContext } from "../App";
import { instance } from "../core/utils/AxiosInterceptor";
import { SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";
// -----------------------------------------------------------------
const Groups = ({ navigation }: any) => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  const [showLoader, setShowLoader] = useState<boolean>(false);

  // This method is used to show delete confirmation popup
  const deleteGroupConfirmation = async (groupDetails: any) => {
    Alert.alert(
      "Group Delete Confirmation",
      "Are you sure you want to permanently delete this group?",
      [
        {
          text: "No",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => deleteGroup(groupDetails),
          style: "default",
        },
      ]
    );
  };

  // This method is used to delete the Group
  const deleteGroup = async (groupDetails: any) => {
    try {
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("added_by", groupDetails?.group_type);
      formData.append("id", groupDetails?.group_id);

      // setShowLoader(true);

      const response = await instance.post("/group_delete", formData);
      if (response.status === 200 && response.data?.status) {
        // setShowLoader(false);
        console.log("response::SHUBHAM ", response);
        toast.show(
          `Group with id ${groupDetails?.group_id} deleted successfully`,
          {
            type: "success",
          }
        );
        groupsAndMembersData.fetchGroupsAndMembersList(true); //Update Groups Listing
      } else {
        // setShowLoader(false);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while deleting group. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } catch (error: any) {
      // setShowLoader(false);
      toast.show(
        error.message
          ? error.message
          : "Getting an error while deleting group. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  // This method is used to redirect user to edit group screen.
  const redirectToEditGroupScreen = (groupDetails: any) => {
    navigation.navigate("EditGroup", { groupDetails });
  };

  // This renderGroups component is used to render group list
  const renderGroups = (groupDetails: any) => {
    return (
      <Pressable style={styles.groupListItem}>
        <View
          style={{
            left: 0,
            position: "absolute",
          }}
        >
          <View style={styles.groupListItemType}>
            <Text
              style={{
                fontSize: SIZES.width > 400 ? 15 : 12,
                color: "white",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {groupDetails?.group_type && groupDetails?.group_type === 1
                ? "PUBLIC"
                : "PRIVATE"}
            </Text>
          </View>
          <Text style={styles.groupListItemName}>
            {groupDetails?.title ? groupDetails?.title : "N.A"}
          </Text>
          <Text style={styles.groupListItemCode}>
            {groupDetails?.group_code ? groupDetails?.group_code : "N.A"}
          </Text>
        </View>
        <View style={styles.groupListItemMemberCount}>
          <Text
            style={{
              fontSize: SIZES.width > 400 ? 20 : 18,
              fontWeight: "600",
            }}
          >
            {groupDetails?.users ? groupDetails?.users.length : "N.A"}
          </Text>
          <Text
            style={{
              fontSize: SIZES.width > 400 ? 20 : 18,
              fontWeight: "500",
            }}
          >
            Members
          </Text>
        </View>
        <View
          style={[
            styles.groupListItemType,
            {
              alignSelf: "center",
              right: SIZES.width > 400 ? "5%" : "8%",
              position: "absolute",
              backgroundColor: "transparent",
            },
          ]}
        >
          <Pressable
            onPress={() => redirectToEditGroupScreen(groupDetails)}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: SIZES.width > 400 ? 20 : 18,
                fontWeight: "600",
              }}
            >
              Edit
            </Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} />
          </Pressable>
        </View>
        <View
          style={[
            styles.groupListItemType,
            {
              alignSelf: "center",
              right: "1%",
              position: "absolute",
              backgroundColor: "transparent",
            },
          ]}
        >
          <Pressable onPress={() => deleteGroupConfirmation(groupDetails)}>
            <AntDesign name="delete" size={20} />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return showLoader ? (
    <>
      <ActivityIndicator size={50} />
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 22 }}>
        Please wait. We are fetching Groups.
      </Text>
    </>
  ) : (
    <View>
      {groupsAndMembersData?.groupsAndMembersDetails.length > 0 ? (
        groupsAndMembersData?.groupsAndMembersDetails.map(
          (group: any, i: number) => (
            <View key={group?.group_code ? group?.group_code : i}>
              {renderGroups(group)}
            </View>
          )
        )
      ) : (
        <>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 22,
              marginTop: 20,
            }}
          >
            Groups not Available
          </Text>
        </>
      )}
    </View>
  );
};
// =========================================================================================
// CSS CODE
const styles = StyleSheet.create({
  groupListItem: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "auto",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: SIZES.width > 400 ? "3%" : "4%",
    margin: "2%",
  },
  groupListItemName: {
    fontSize: SIZES.width > 400 ? 20 : 18,
  },
  groupListItemCode: {
    fontSize: SIZES.width > 400 ? 18 : 15,
    color: "grey",
  },
  groupListItemType: {
    alignSelf: "flex-start",
    backgroundColor: "green",
    borderRadius: 10,
    width: "auto",
    height: "auto",
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "700",
  },
  groupListItemMemberCount: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: SIZES.width > 400 ? 20 : 18,
    fontWeight: "600",
  },
});

export default Groups;
// =============================================== THE END =======================================================
