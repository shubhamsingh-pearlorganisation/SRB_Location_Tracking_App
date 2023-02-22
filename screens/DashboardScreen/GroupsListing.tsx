import { View, ScrollView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SIZES } from "../../constants";
import NoDataFound from "../../components/NoDataFound";
import { GroupsAndMembersContext } from "../../App";
import GroupAvailableOptions from "./GroupAvailableOptions";
import GroupIndividualItem from "./GroupIndividualItem";
import Loader from "../../components/Loader";
// -------------------------------------------------------------------------------------

const 
GroupsListing = ({ navigation, sendGroupDetails }: any) => {
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  const [groupMembersList, setGroupMembersList] = useState<any>([]);
  const [selectedGroupData, setSelectedGroupData] = useState<any>(
    groupsAndMembersData?.groupsAndMembersDetails[0]
  );

  const selectedGroupDetails = (selGroupDetails: any) =>
    selGroupDetails && setSelectedGroupData(selGroupDetails);

  useEffect(() => {
    sendGroupDetails(selectedGroupData);
  }, [selectedGroupData]);

  return (
<<<<<<< Updated upstream
    <View style={{ width: "100%", justifyContent: "center" }}>
=======
    <View
    style={{
      width:'100%',
      justifyContent:'center'
    }}
    >
>>>>>>> Stashed changes
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
                  // Calling Individual Group Icon Screen
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
          <>
            {groupsAndMembersData.isDetailsLoaded &&
            groupsAndMembersData.groupsAndMembersDetails?.length === 0 ? (
              <View style={{ marginTop: 15 }}>
                <NoDataFound message="No Groups Found" />
              </View>
            ) : (
              <Loader message="Please wait we are fetching available groups" />
            )}
          </>
        )}
      </ScrollView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          bottom: "5%",
<<<<<<< Updated upstream
          justifyContent: "space-evenly",
=======
          justifyContent:'space-evenly',
>>>>>>> Stashed changes
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
