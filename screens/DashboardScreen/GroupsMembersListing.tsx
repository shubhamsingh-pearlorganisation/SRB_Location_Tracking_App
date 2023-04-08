import { View } from "react-native";
import { SIZES } from "../../constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect, useContext } from "react";
import GroupIndividualMember from "./GroupIndividualMember";
import { GroupsAndMembersContext } from "../../App";
import NoDataFound from "../../components/NoDataFound";
import Loader from "../../components/Loader";

// -------------------------------------------------------------------------------------

const GroupsMembersListing = ({
  navigation,
  selectedGroupData,
  locationCoordinates,
}: any) => {
  // console.log("selectedGroupData:::: ", selectedGroupData);
  // console.log("locationCoordinates::: ", locationCoordinates);
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(
        translateY.value,
        -SIZES.height + SIZES.height * 0.1
      );
    })
    .onEnd(() => {
      if (translateY.value > -SIZES.height / 2.5)
        translateY.value = withSpring(-SIZES.height / 2.5, { damping: 50 });
      else if (translateY.value < -SIZES.height / 4)
        translateY.value = withSpring(-SIZES.height + SIZES.height * 0.1, {
          damping: 50,
        });
    });

  const BottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    translateY.value = withSpring(-SIZES.height / 2.5, { damping: 50 });
  });

  // ------------------------------------------------------------------------------------
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          BottomSheetStyle,
          {
            height: SIZES.height,
            width: SIZES.width,
            backgroundColor: "white",
            position: "absolute",
            top: SIZES.height / 1,
            borderRadius: 30,
          },
        ]}
      >
        <View
          style={{
            width: "10%",
            height: 4,
            backgroundColor: "grey",
            alignSelf: "center",
            marginVertical: "1%",
            borderRadius: 10,
          }}
        />

        {Array.isArray(selectedGroupData?.users) &&
        selectedGroupData?.users?.length > 0 ? (
          selectedGroupData?.users.map((groupMember: any, i: number) => {
            return (
              <View key={groupMember?.users_id ? groupMember?.users_id : i}>
                {/* Calling Individual Group's Member Screen */}
                <GroupIndividualMember
                  navigation={navigation}
                  member={groupMember}
                />
              </View>
            );
          })
        ) : (
          <>
            {groupsAndMembersData.isDetailsLoaded &&
            groupsAndMembersData.groupsAndMembersDetails?.length === 0 ? (
              <View style={{ marginTop: 15 }}>
                <NoDataFound message="No Group Member Found" />
              </View>
            ) : (
              <Loader message={"Please wait..."} />
            )}
          </>
        )}
      </Animated.View>
    </GestureDetector>
  );
};
export default GroupsMembersListing;
// ----------------------------------------- THE END --------------------------------------------
