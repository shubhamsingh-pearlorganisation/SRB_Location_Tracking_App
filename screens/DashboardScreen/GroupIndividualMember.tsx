import { View, Text, Pressable, Image } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";

// -------------------------------------------------------------------------------------

// This component is used to render Groups individual Member
const GroupIndividualMember = ({ navigation, member }: any) => {
  return (
    <Pressable
      style={styles.memberListItem}
      onPress={() =>
        navigation.navigate("MemberHistoryScreen", {
          memberName: member?.name,
          userId: member?.users_id,
        })
      }
    >
      {!member?.image ? (
        <View style={styles.memberListItemImage}>
          <Ionicons name="person-sharp" size={20} color={COLORS.voilet} />
        </View>
      ) : (
        <>
          <Image
            source={{ uri: member?.image }}
            style={{
              width: SIZES.width > 400 ? 50 : 35,
              height: SIZES.width > 400 ? 50 : 35,
              borderRadius: 30,
              marginRight: "2%",
            }}
          />
        </>
      )}
      <View>
        <Text style={styles.memberListItemName}>
          {member?.name ? member?.name : "N.A"}
        </Text>
        <Text style={styles.memberListItemCode}>Location</Text>
        <Text style={styles.memberListItemCode}>Location line</Text>
      </View>
      <View style={styles.memberListItemType}>
        <Text
          style={{
            color: "black",
            fontWeight: "700",
          }}
        >
          07th Feb {"\n"} 05:16 pm
        </Text>
      </View>
    </Pressable>
  );
};
export default GroupIndividualMember;
// ----------------------------------------- THE END --------------------------------------------
