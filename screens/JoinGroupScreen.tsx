import { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import {
  AuthContext,
  FirebaseLocationContext,
  GroupsAndMembersContext,
  UserDetailsContext,
} from "../App";
import { SIZES } from "../constants";
import { instance } from "../core/utils/AxiosInterceptor";
import { useToast } from "react-native-toast-notifications";
import Loader from "../components/Loader";

import { db } from "../firebaseConfig";
import { ref, set, update } from "firebase/database";
// -------------------------------------------------------------------------------------

const JoinGroup = ({ navigation }: any) => {
  const toast = useToast();

  const authContextData: any = useContext(AuthContext);
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);
  const userDetailsContextData: any = useContext(UserDetailsContext);
  const firebaseLocationContextData: any = useContext(FirebaseLocationContext);

  const [groupsData, setGroupsData] = useState<any>([]);

  useEffect(() => {
    if (groupsAndMembersData.groupsAndMembersDetails.length > 0) {
      setGroupsData(groupsAndMembersData.groupsAndMembersDetails);
    }
  }, [groupsAndMembersData.groupsAndMembersDetails]);

  // Used for Input Fields Autofocusing
  const codeFirstCharacter: any = useRef(null);
  const codeSecondCharacter: any = useRef(null);
  const codeThirdCharacter: any = useRef(null);
  const codeFourthCharacter: any = useRef(null);
  const codeFifthCharacter: any = useRef(null);
  const codeSixthCharacter: any = useRef(null);

  // Component's Local States
  // =========================
  const [showLoader, setShowLoader] = useState(false);

  const [groupCode, setGroupCode] = useState<any>({
    firstCharacter: null,
    secondCharacter: null,
    thirdCharacter: null,
    fourthCharacter: null,
    fifthCharacter: null,
    sixthCharacter: null,
  });
  const {
    firstCharacter,
    secondCharacter,
    thirdCharacter,
    fourthCharacter,
    fifthCharacter,
    sixthCharacter,
  } = groupCode;

  const [disableCreate, setDisableCreate] = useState(true);
  const [userId, setUserId] = useState<any>(null);
  const [locationData, setLocationData] = useState<any>(null);
  const [lastCreatedGroupCode, setLastCreatedGroupCode] = useState<any>("");

  // This method is used to call group join API
  const handleGroupJoin = async () => {
    const finalCode = `${firstCharacter}${secondCharacter}${thirdCharacter}${fourthCharacter}${fifthCharacter}${sixthCharacter}`;
    if (finalCode && finalCode.toString().length === 6) {
      setLastCreatedGroupCode(finalCode);

      try {
        const formData = new FormData();
        formData.append("token_id", authContextData?.token);
        formData.append("group_code", finalCode);

        setShowLoader(true);
        const response = await instance.post("/group_join", formData);
        if (response.status === 200 && response.data?.status === true) {
          setShowLoader(false);
          toast.show("Group Joining successful!", {
            type: "success",
          });
          groupsAndMembersData.fetchGroupsAndMembersList(true); //Update Groups Listing
        } else {
          setShowLoader(false);
          toast.show(
            response.data?.message
              ? response.data?.message
              : "Getting an error while joining group. Please try again later.",
            {
              type: "error",
            }
          );
        }
      } catch (error: any) {
        setShowLoader(false);
        toast.show(
          error.message
            ? error.message
            : "Getting an error while joining group. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } else return;
  };

  useEffect(() => {
    if (
      firstCharacter &&
      secondCharacter &&
      thirdCharacter &&
      fourthCharacter &&
      fifthCharacter &&
      sixthCharacter
    )
      setDisableCreate(false);
    else setDisableCreate(true);
  }, [groupCode, disableCreate]);

  // This method is used to send group specific location data to firebase realtime database.
  const sendGroupDataToFirebase = async () => {
    try {
      await update(
        ref(db, `groups/${lastCreatedGroupCode}/${userId}/location/`),
        locationData
      );
      navigation.navigate("Home");
    } catch (error: any) {
      console.log(
        "Getting an error while saving group specific location data to firebase realtime database: ",
        error
      );
    }
  };

  useEffect(() => {
    if (locationData && lastCreatedGroupCode && userId)
      sendGroupDataToFirebase();
  }, [lastCreatedGroupCode, userId, locationData]);

  useEffect(() => {
    if (userDetailsContextData?.userDetails?.user_id) {
      setUserId(userDetailsContextData?.userDetails?.user_id);
    }
  }, [userDetailsContextData]);

  useEffect(() => {
    if (firebaseLocationContextData)
      setLocationData(firebaseLocationContextData?.firebaseLocationData);
  }, [firebaseLocationContextData]);

  // -------------------------------------------------------------------------------------------
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          width: SIZES.width > 400 ? "50%" : "80%",
          alignItems: "center",
        }}
      >
        {showLoader && <Loader />}
        <Text style={styles.headingText}>Enter The Invite Code</Text>
        <View style={styles.codeBoxHolder}>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) => {
              if (val?.toString().length > 0)
                codeSecondCharacter.current.focus();
              else codeFirstCharacter.current.focus();

              setGroupCode({ ...groupCode, firstCharacter: val });
            }}
            maxLength={1}
            autoFocus
            ref={codeFirstCharacter}
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) => {
              if (val?.toString().length > 0)
                codeThirdCharacter.current.focus();
              else codeFirstCharacter.current.focus();

              setGroupCode({ ...groupCode, secondCharacter: val });
            }}
            maxLength={1}
            ref={codeSecondCharacter}
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 5 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) => {
              if (val?.toString().length > 0)
                codeFourthCharacter.current.focus();
              else codeSecondCharacter.current.focus();

              setGroupCode({ ...groupCode, thirdCharacter: val });
            }}
            maxLength={1}
            ref={codeThirdCharacter}
          ></TextInput>
          <Text style={{ fontSize: 30 }}>-</Text>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) => {
              if (val?.toString().length > 0)
                codeFifthCharacter.current.focus();
              else codeThirdCharacter.current.focus();
              setGroupCode({ ...groupCode, fourthCharacter: val });
            }}
            maxLength={1}
            ref={codeFourthCharacter}
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) => {
              if (val?.toString().length > 0)
                codeSixthCharacter.current.focus();
              else codeFourthCharacter.current.focus();
              setGroupCode({ ...groupCode, fifthCharacter: val });
            }}
            maxLength={1}
            ref={codeFifthCharacter}
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) => {
              if (val?.toString().length > 0)
                codeSixthCharacter.current.focus();
              else codeFifthCharacter.current.focus();
              setGroupCode({ ...groupCode, sixthCharacter: val });
            }}
            maxLength={1}
            ref={codeSixthCharacter}
          ></TextInput>
        </View>
        <Text style={styles.subText}>
          Get the code from the person who created the Group.
        </Text>
        <TouchableOpacity
          style={{
            marginTop: "5%",
            alignSelf: "center",
            width: SIZES.width - SIZES.width * 0.2,
            height: SIZES.width > 400 ? 60 : 40,
            justifyContent: "center",
            borderRadius: 30,
            backgroundColor: !disableCreate ? "#705ECF" : "darkgrey",
          }}
          onPress={handleGroupJoin}
          disabled={disableCreate}
        >
          <Text
            style={{
              fontWeight: "400",
              fontSize: SIZES.width > 400 ? 25 : 20,
              color: "white",
              alignSelf: "center",
            }}
          >
            Join Group
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
// ==================================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    height: SIZES.height,
    alignItems: "center",
    padding: "2%",
  },
  headingText: {
    fontSize: SIZES.width > 400 ? 30 : 25,
    fontWeight: "600",
    margin: "2%",
    marginTop: "15%",
  },
  subText: {
    fontSize: SIZES.width > 400 ? 25 : 20,
    marginTop: "2%",
  },
  codeBoxHolder: {
    flexDirection: "row",
    alignItems: "center",
    margin: "5%",
    padding: "5%",
  },
  codeBox: {
    width: SIZES.width > 400 ? 40 : 35,
    height: SIZES.width > 400 ? 50 : 45,
    fontSize: SIZES.width > 400 ? 40 : 30,
    borderRadius: 8,
    margin: "1%",
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlign: "center",
    alignContent: "center",
  },
});

export default JoinGroup;

// ========================================== THE END ========================================================
