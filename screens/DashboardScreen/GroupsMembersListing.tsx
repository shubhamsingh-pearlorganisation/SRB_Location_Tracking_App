import { View, Text, Pressable,Image } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated,{useAnimatedStyle,useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import {useEffect} from 'react';
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";


// -------------------------------------------------------------------------------------

const GroupsMembersListing = ({ navigation }: any) => {

  const translateY = useSharedValue(0)

  const context = useSharedValue({y:0})
  const gesture = Gesture.Pan().onStart(()=>{
    context.value = {y:translateY.value}
  }) .onUpdate((event)=>{
    // if(translateY.value > -SIZES.height*.6 && translateY.value < SIZES.height*.2)
    translateY.value = event.translationY + context.value.y
    translateY.value = Math.max(translateY.value, -SIZES.height+SIZES.height*.1)
    // else

  })
  .onEnd(()=>{
    if(translateY.value > -SIZES.height/2.5)
    translateY.value = withSpring(-SIZES.height/2.5,{damping:50})
    else if(translateY.value < -SIZES.height/4)
    translateY.value = withSpring(-SIZES.height+SIZES.height*.1,{damping:50})
  })
  
  ;

  const BottomSheetStyle= useAnimatedStyle(()=>{
    return{
      transform:[{translateY: translateY.value}]
    }
  })

  useEffect(()=>{
    translateY.value = withSpring(-SIZES.height/2.5,{damping:50})
  })

  function renderMembers(member: any) {
    return (
      <Pressable style={styles.memberListItem} 
      // onPress={() => openProfile()}
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
            07th Feb {"\n"}05:16 pm
          </Text>
        </View>
      </Pressable>
    );
  }

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[BottomSheetStyle,{
          height: SIZES.height,
          width: SIZES.width,
          backgroundColor: "white",
          position: "absolute",
          top: SIZES.height / 1,
          borderRadius: 30,
        }]}
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

        {/* {renderMembers()} */}
        
      </Animated.View>
    </GestureDetector>
  );
};
export default GroupsMembersListing;
// ----------------------------------------- THE END --------------------------------------------
