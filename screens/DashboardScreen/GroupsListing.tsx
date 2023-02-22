import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { styles } from "./style";
import { COLORS, SIZES } from "../../constants";
import NoDataFound from "../../components/NoDataFound";
import { GroupsAndMembersContext } from "../../App";
import GroupAvailableOptions from "./GroupAvailableOptions";
import GroupIndividualItem from "./GroupIndividualItem";
// -------------------------------------------------------------------------------------

const GroupsListing = ({ navigation, sendGroupDetails }: any) => {
  console.log("navigation:shubham:: ", navigation);
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  const [groupMembersList, setGroupMembersList] = useState<any>([]);
  const [selectedGroupData, setSelectedGroupData] = useState<any>({});

  const selectedGroupDetails = (selGroupDetails: any) =>
    selGroupDetails && setSelectedGroupData(selGroupDetails);

  useEffect(() => {
    sendGroupDetails(selectedGroupData);
  }, [selectedGroupData]);

  return (
    <View>
      <ScrollView
        style={{
          width: "100%",
          marginTop: SIZES.width > 400 && SIZES.height > 700 ? "4%" : "2%",
          marginBottom: SIZES.width > 400 && SIZES.height > 700 ? "15%" : "17%",
        }}
      >
        {groupsAndMembersData?.groupsAndMembersDetails?.length > 0 ? (
          groupsAndMembersData?.groupsAndMembersDetails.map(
            (group: any, i: number) => (
              <View key={group?.group_code ? group?.group_code : i}>
                {group?.title && group?.group_code && (
                  <GroupIndividualItem
                    groupDetails={group}
                    setGroupMembersList={setGroupMembersList}
                    selectedGroupDetails={selectedGroupDetails}
                    selectedGroupData={selectedGroupData}
                  />
                )}
              </View>
            )
          )
        ) : (
          <View style={{ marginTop: 15 }}>
            <NoDataFound message="No Groups Found" />
          </View>
        )}
      </ScrollView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          bottom: "10%",
        }}
      >
        {/* ---------------------------------------------------- */}
        {/* Group Screen Available Options Section */}

        <GroupAvailableOptions
          navigation={navigation}
          selectedGroupDetails={selectedGroupData}
        />
        {/* ---------------------------------------------------- */}
      </View>
    </View>
  );
};
export default GroupsListing;
// ----------------------------------------- THE END --------------------------------------------
