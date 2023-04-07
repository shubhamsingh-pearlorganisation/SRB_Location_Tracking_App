import { Text, Pressable } from "react-native";
import { useContext } from "react";
import { SIZES } from "../../constants";
import { GroupsAndMembersContext } from "../../App";
import { styles } from "./style";
// -------------------------------------------------------------------------------------

const GroupAvailableOptions = ({ navigation, selectedGroupDetails }: any) => {
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);
  return (
    <>
      <Pressable
        style={styles.groupScreenOptionsForNavigate}
        onPress={() => navigation.navigate("AddGroup")}
      >
        <Text
          style={{
            fontWeight: "400",
            fontSize: SIZES.width > 400 ? 20 : 12,
            color: "white",
            alignSelf: "center",
          }}
        >
          New Group
        </Text>
      </Pressable>
      <Pressable
        style={styles.groupScreenOptionsForNavigate}
        onPress={() => navigation.navigate("JoinGroupScreen")}
      >
        <Text
          style={{
            fontWeight: "400",
            fontSize: SIZES.width > 400 ? 20 : 12,
            color: "white",
            alignSelf: "center",
          }}
        >
          Join Group
        </Text>
      </Pressable>

      {groupsAndMembersData?.groupsAndMembersDetails?.length > 0 && (
        <Pressable
          style={{
            width: SIZES.width * 0.25,
            height: "auto",
            borderRadius: 30,
            backgroundColor: "#705ECF",
            padding: 4,
            marginHorizontal: 10,
          }}
          onPress={() =>
            navigation.navigate("AddMember", {
              groupDetails: selectedGroupDetails,
            })
          }
        >
          <Text
            style={{
              fontWeight: "400",
              fontSize: SIZES.width > 400 ? 20 : 12,
              color: "white",
              alignSelf: "center",
            }}
          >
            Invite Group
          </Text>
        </Pressable>
      )}
    </>
  );
};
export default GroupAvailableOptions;
// ----------------------------------------- THE END --------------------------------------------
