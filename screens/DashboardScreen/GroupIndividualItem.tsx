import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "./style";
import { COLORS, SIZES } from "../../constants";

// -------------------------------------------------------------------------------------

// This component is used to render Groups Individual Item
const GroupIndividualItem = ({
  groupDetails,
  selectedGroupDetails,
  selectedGroupData,
}: any) => {
  const handleGroupItemClick = () => {
    selectedGroupDetails(groupDetails);
  };

  return (
    <Pressable style={[styles.groupListItem]} onPress={handleGroupItemClick}>
      <View
        style={{
          width: SIZES.width > 400 ? "80%" : "70%",
        }}
      >
        <Text style={styles.groupListItemName}>
          {groupDetails?.title ? groupDetails?.title : "N.A"}
        </Text>
        <Text style={styles.groupListItemCode}>
          {groupDetails?.group_code ? groupDetails?.group_code : "N.A"}
        </Text>
      </View>
      <View
        style={[
          styles.groupListItemType,
          {
            backgroundColor:
              selectedGroupData?.group_code === groupDetails?.group_code
                ? COLORS.voilet
                : "green",
          },
        ]}
      >
        <Text
          style={[
            {
              color: "white",
              fontWeight: "700",
            },
          ]}
        >
          {groupDetails?.group_type && groupDetails?.group_type === 1
            ? "PUBLIC"
            : "PRIVATE"}
        </Text>
      </View>
    </Pressable>
  );
};

export default GroupIndividualItem;
// ----------------------------------------- THE END --------------------------------------------
