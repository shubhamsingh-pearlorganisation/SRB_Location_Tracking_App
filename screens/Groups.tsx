import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GroupsAndMembersContext } from "../App";
import { SIZES } from "../constants";
import Loader from "../components/Loader";
import NoDataFound from "../components/NoDataFound";
// -----------------------------------------------------------------
const Groups = ({ navigation }: any) => {
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  const [showLoader] = useState<boolean>(false);

  // This method is used to redirect user to edit/view group screen.
  const redirectToEditViewGroupScreen = (
    groupDetails: any,
    editGroupAllowed: boolean
  ) => {
    navigation.navigate("EditViewGroup", { groupDetails, editGroupAllowed });
  };

  // This renderGroups component is used to render group list
  const renderGroups = (groupDetails: any) => {
    //condition to handle the height of item according to the length of group title
    const customStyle =
      groupDetails?.title?.toString().length >= 10 &&
      groupDetails?.title?.toString().length <= 20
        ? styles.bigTitle
        : groupDetails?.title?.toString().length < 10
        ? styles.normalTitle
        : !groupDetails?.title
        ? styles.normalTitle
        : styles.largeTitle;
    return (
      <Pressable style={[styles.groupListItem, customStyle]}>
        <View
          style={{
            left: 0,
            position: "absolute",
            width: "40%",
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
              right: "2%",
              position: "absolute",
              backgroundColor: "transparent",
            },
          ]}
        >
          <Pressable
            onPress={() =>
              redirectToEditViewGroupScreen(
                groupDetails,
                groupDetails?.is_delete == 1 ? true : false
              )
            }
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: SIZES.width > 400 ? 20 : 18,
                fontWeight: "600",
              }}
            >
              {groupDetails?.is_delete == 1 ? "Edit" : "View"}
            </Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} />
          </Pressable>
        </View>
      </Pressable>
    );
  };

  return (
    <ScrollView>
      {showLoader && <Loader />}
      {groupsAndMembersData?.groupsAndMembersDetails.length > 0 ? (
        groupsAndMembersData?.groupsAndMembersDetails.map(
          (group: any, i: number) => (
            <View key={group?.group_code ? group?.group_code : i}>
              {group?.title && group?.group_code && renderGroups(group)}
            </View>
          )
        )
      ) : (
        <NoDataFound message="No Groups Found" />
      )}
    </ScrollView>
  );
};
// =========================================================================================
// CSS CODE
const styles = StyleSheet.create({
  groupListItem: {
    justifyContent: "space-evenly",
    alignItems: "center",
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
  largeTitle: {
    paddingVertical: SIZES.width < 400 ? "18%" : "8%",
  },
  bigTitle: {
    paddingVertical: SIZES.width < 400 ? "10%" : "5%",
  },
  normalTitle: {},
});

export default Groups;
// =============================================== THE END =======================================================
