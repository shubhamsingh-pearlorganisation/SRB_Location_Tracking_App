import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { animated, useSpring } from "@react-spring/native";

const Groups = ({ navigation }: any) => {
  const onPressSubmit = () => {
    navigation.navigate("EditGroup");
  };

  function renderGroups() {
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
                fontSize: SIZES.width>400?15:12,
                color: "white",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Group Type
            </Text>
          </View>
          <Text style={styles.groupListItemName}>Group Name</Text>
          <Text style={styles.groupListItemCode}>Group Code</Text>
        </View>
        <View style={styles.groupListItemMemberCount}>
          <Text
            style={{
              fontSize: SIZES.width>400?20:18,
              fontWeight: "600",
            }}
          >
            00
          </Text>
          <Text
            style={{
              fontSize: SIZES.width>400?20:18,
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
            onPress={onPressSubmit}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                fontSize: SIZES.width>400?20:18,
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
  }

  return <View>{renderGroups()}</View>;
};

const styles = StyleSheet.create({
  groupListItem: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "auto",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: SIZES.width>400?"3%":"4%",
    margin: "2%",
  },
  groupListItemName: {
    fontSize: SIZES.width>400?20:18,
  },
  groupListItemCode: {
    fontSize: SIZES.width>400?18:15,
    color: "grey",
  },
  groupListItemType: {
    backgroundColor: "green",
    borderRadius: 10,
    width: "auto",
    height: "auto",
    padding: 5,
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "700",
    
  },
  groupListItemMemberCount: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: SIZES.width>400?20:18,
    fontWeight: "600",
  },
});

export default Groups;
