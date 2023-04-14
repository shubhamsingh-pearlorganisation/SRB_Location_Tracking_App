import { View, ScrollView } from "react-native";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { COLORS, SIZES } from "../../constants";
import NoDataFound from "../../components/NoDataFound";
import { GroupsAndMembersContext } from "../../App";
import GroupAvailableOptions from "./GroupAvailableOptions";
import GroupIndividualItem from "./GroupIndividualItem";
import Loader from "../../components/Loader";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";

// -------------------------------------------------------------------------------------

const GroupsListing = ({
  navigation,
  sendGroupDetails,
  sendFirebaseData,
}: any) => {
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  console.log("groupsAndMembersData::: ", groupsAndMembersData);

  // Component's Local States
  // ========================
  const [selectedGroupData, setSelectedGroupData] = useState<any>(
    groupsAndMembersData?.groupsAndMembersDetails[0]
  );

  const [selectedGroup_GroupCode, setSelectedGroup_GroupCode] =
    useState<any>("");

  const [
    groupSpecificFirebaseLocationData,
    setGroupSpecificFirebaseLocationData,
  ] = useState<any>({
    groupCode: "",
    groupMembers: [
      {
        id: "",
        lat: "",
        lng: "",
      },
    ],
  });

  const selectedGroupDetails = useCallback(
    (selGroupDetails: any) =>
      selGroupDetails && setSelectedGroupData(selGroupDetails),
    []
  );

  useEffect(() => {
    if (selectedGroupData) {
      setSelectedGroup_GroupCode(selectedGroupData?.group_code);
    }
  }, [selectedGroupData]);

  useEffect(() => {
    if (selectedGroup_GroupCode) {
      fetchGroupSpecificLocationData();
    }
  }, [selectedGroup_GroupCode]);

  // This method is used to fetch Group Specific Location Data from Firebase Realtime Database.
  const fetchGroupSpecificLocationData = () => {
    try {
      const url = `groups/${selectedGroup_GroupCode}/`;
      // console.log("URL::: ", url);

      const startCountRef = ref(db, url);
      onValue(startCountRef, (snapshot) => {
        const locationData = snapshot.val();

        let groupMembersData = [];
        for (let key in locationData) {
          groupMembersData.push({
            id: key,
            lat: locationData[key]?.location?.lat,
            lng: locationData[key]?.location?.lng,
          });
        }
        setGroupSpecificFirebaseLocationData({
          ...groupSpecificFirebaseLocationData,
          groupCode: selectedGroup_GroupCode,
          groupMembers: groupMembersData,
        });
      });
    } catch (error: any) {
      console.log(
        "Getting error while fetching location data from firebase realtime database:: ",
        error?.message ? error?.message : error
      );
    }
  };

  useEffect(() => {
    if (groupSpecificFirebaseLocationData) {
      sendFirebaseData(groupSpecificFirebaseLocationData);
    }
  }, [groupSpecificFirebaseLocationData]);

  useEffect(() => {
    sendGroupDetails(selectedGroupData);
  }, [selectedGroupData]);

  useEffect(() => {
    groupsAndMembersData?.groupsAndMembersDetails?.length > 0 &&
      setSelectedGroupData(groupsAndMembersData?.groupsAndMembersDetails[0]);
  }, [groupsAndMembersData?.groupsAndMembersDetails]);

  // -----------------------------------------------------------------------------------------
  return (
    <View
      style={{
        width: "100%",
        height: "90%",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
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
                    selectedGroupDetails={selectedGroupDetails}
                    selectedGroupData={selectedGroupData}
                  />
                )}
                <View
                  style={{
                    backgroundColor: COLORS.voilet,
                    opacity: 0.3,
                    height: 3,
                    width: SIZES.width,
                  }}
                />
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
          justifyContent: "space-evenly",
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
