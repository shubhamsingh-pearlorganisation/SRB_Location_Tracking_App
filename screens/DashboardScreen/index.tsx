import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from "react-native";
import GroupsListing from "./GroupsListing";
import ManageMap from "./ManageMap";
import { styles } from "./style";
import { useState, useEffect, useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SIZES } from "../../constants";
import { GroupsAndMembersContext } from "../../App";
// --------------------------------------------------------------------------------------
const Dashboard = ({ navigation }: any) => {
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  const [showGroupsListing, setGroupListing] = useState(false);
  const [selectedGroupData, setSelectedGroupData] = useState<any>({});

  useEffect(() => {
    if (
      groupsAndMembersData?.groupsAndMembersDetails &&
      groupsAndMembersData?.groupsAndMembersDetails?.length > 0
    )
      setSelectedGroupData(groupsAndMembersData?.groupsAndMembersDetails[0]);
  }, [groupsAndMembersData?.groupsAndMembersDetails]);

  const customStyle = showGroupsListing
    ? styles.dropDownEnabled
    : styles.dropDownDisabled;

  const receiveGroupDetails = (groupData: any) =>
    setSelectedGroupData(groupData);

  useEffect(() => {
    groupsAndMembersData?.groupsAndMembersDetails?.length > 0 &&
      setSelectedGroupData(groupsAndMembersData?.groupsAndMembersDetails[0]);
  }, [groupsAndMembersData?.groupsAndMembersDetails]);

  return (
    <SafeAreaView style={styles.homeWrapper}>
      {/* ---------------------------------------------------- */}
      {/* Map Section  */}
      <ManageMap navigation={navigation} />
      {/* ---------------------------------------------------- */}

      {/* Group Screen Up Icon Section  */}
      {selectedGroupData && Object.keys(selectedGroupData).length > 0 ? (
        <>
          <Pressable
            style={styles.groupListDropDownBtn}
            onPress={() => setGroupListing(!showGroupsListing)}
          >
            <Text style={{ fontWeight: "bold", color: "blue" }}>
              {selectedGroupData?.title
                ? selectedGroupData?.title?.toString().slice(0, 15) +
                  "-" +
                  selectedGroupData?.group_code
                : "Group Name"}
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={20}
              style={{
                textAlign: "center",
                fontSize: 20,
              }}
            />
          </Pressable>
        </>
      ) : null}

      {/* ---------------------------------------------------- */}

      {/* Group Listing screen section  */}
      <View
        style={[
          styles.groupListDropDown,
          customStyle,
          { paddingTop: SIZES.height > 700 ? "10%" : "20%" },
        ]}
      >
        <GroupsListing
          navigation={navigation}
          sendGroupDetails={receiveGroupDetails}
        />
        {/* ---------------------------------------------------- */}

        {/* Group Screen down icon Section */}
        <TouchableOpacity
          style={styles.groupScreenDownIcon}
          onPress={() => setGroupListing(!showGroupsListing)}
        >
          <MaterialIcons
            name="keyboard-arrow-up"
            size={SIZES.width > 400 ? 20 : 15}
            style={{
              textAlign: "center",
            }}
          />
        </TouchableOpacity>
        {/* ---------------------------------------------------- */}

        {/* Member Section will come here  */}
      </View>
    </SafeAreaView>
  );
};
export default Dashboard;
// ----------------------------------------- THE END --------------------------------------------
