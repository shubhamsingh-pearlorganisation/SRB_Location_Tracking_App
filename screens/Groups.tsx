import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SIZES } from "../constants";
import { useToast } from "react-native-toast-notifications";
import { AuthContext } from "../App";
import { instance } from "../core/utils/AxiosInterceptor";
// -----------------------------------------------------------------------------
const Groups = ({ navigation }: any) => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);

  // Component's Local States
  // ========================
  const [groupsList, setGroupsList] = useState<any>([]);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    alert("component mounted");
    fetchGroups(); // Fetching Groups during component mount
  }, []);

  // This method is used to fetch Groups from the Api
  const fetchGroups = async () => {
    try {
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      setShowLoader(true);

      const response = await instance.post("/group_list", formData);
      console.log(
        "Groupps fetched Response:: ",
        response.data,
        response.status
      );
      if (response.status === 200 && response.data?.status === true) {
        setShowLoader(false);
        setGroupsList(response.data?.data ? response.data?.data : []);
        toast.show("Groups fetched successfully!", {
          type: "success",
        });
      } else {
        setShowLoader(false);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while fetching groups. Please try again later.",
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
          : "Getting an error while fetching groups. Please try again later.",
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
              right: "1%",
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
      {groupsList.length > 0 ? (
        groupsList.map((group: any, i: number) => (
          <View key={group?.group_code ? group?.group_code : i}>
            {renderGroups(group)}
          </View>
        ))
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
            No Group Found
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
    backgroundColor: "green",
    borderRadius: 10,
    width: 100,
    height: "auto",
    padding: 5,
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
// ======================================================= THE END ===============================================================
