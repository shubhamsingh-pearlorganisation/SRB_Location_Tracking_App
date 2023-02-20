import { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AuthContext, GroupsAndMembersContext } from "../App";
import { SIZES } from "../constants";
import { instance } from "../core/utils/AxiosInterceptor";
import { useToast } from "react-native-toast-notifications";
import Loader from "../components/Loader";

// -------------------------------------------------------------------------------------

const JoinGroup = ({ navigation }: any) => {
  const toast = useToast();

  const authContextData: any = useContext(AuthContext);
  const groupsAndMembersData: any = useContext(GroupsAndMembersContext);

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

  useEffect(() => {
    const emptyData: any = Object.keys(groupCode).filter((k) => !groupCode[k]);
    // const filledData: any = Object.keys(groupCode).filter((k) => groupCode[k]);
    if (emptyData?.length > 0) {
      const val =
        "code" + emptyData[0].slice(0, 1).toUpperCase() + emptyData[0].slice(1);

      if (val === "codeFirstCharacter") codeFirstCharacter.current.focus();
      if (val === "codeSecondCharacter") codeSecondCharacter.current.focus();
      if (val === "codeThirdCharacter") codeThirdCharacter.current.focus();
      if (val === "codeFourthCharacter") codeFourthCharacter.current.focus();
      if (val === "codeFifthCharacter") codeFifthCharacter.current.focus();
      if (val === "codeSixthCharacter") codeSixthCharacter.current.focus();
    } else;

    // if (
    //   filledData?.length > 0 &&
    //   !emptyData.includes(filledData[filledData.length - 1])
    // ) {
    //   const val =
    //     "code" +
    //     filledData[filledData.length].slice(0, 1).toUpperCase() +
    //     filledData[filledData.length].slice(1);

    //   console.log("val::: ", val);
    //   if (val === "codeFirstCharacter") codeFirstCharacter.current.focus();
    //   if (val === "codeSecondCharacter") codeSecondCharacter.current.focus();
    //   if (val === "codeThirdCharacter") codeThirdCharacter.current.focus();
    //   if (val === "codeFourthCharacter") codeFourthCharacter.current.focus();
    //   if (val === "codeFifthCharacter") codeFifthCharacter.current.focus();
    //   if (val === "codeSixthCharacter") codeSixthCharacter.current.focus();
    // }
    // console.log("emptyData::: ", emptyData);
    // console.log("filledData::: ", filledData);
  }, [groupCode]);

  // This method is used to call group join API
  const handleGroupJoin = async () => {
    const finalCode = `${firstCharacter}${secondCharacter}${thirdCharacter}${fourthCharacter}${fifthCharacter}${sixthCharacter}`;
    if (finalCode && finalCode.toString().length === 6) {
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
          navigation.navigate("Home");
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
            onChangeText={(val: any) =>
              setGroupCode({ ...groupCode, firstCharacter: val })
            }
            maxLength={1}
            ref={codeFirstCharacter}
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) =>
              setGroupCode({ ...groupCode, secondCharacter: val })
            }
            maxLength={1}
            ref={codeSecondCharacter}
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 5 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) =>
              setGroupCode({ ...groupCode, thirdCharacter: val })
            }
            maxLength={1}
            ref={codeThirdCharacter}
          ></TextInput>
          <Text style={{ fontSize: 30 }}>-</Text>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) =>
              setGroupCode({ ...groupCode, fourthCharacter: val })
            }
            maxLength={1}
            ref={codeFourthCharacter}
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) =>
              setGroupCode({ ...groupCode, fifthCharacter: val })
            }
            maxLength={1}
            ref={codeFifthCharacter}
          ></TextInput>
          <TextInput
            style={styles.codeBox}
            theme={{ roundness: 8 }}
            placeholder=" "
            underlineColor="transparent"
            onChangeText={(val: any) =>
              setGroupCode({ ...groupCode, sixthCharacter: val })
            }
            maxLength={1}
            ref={codeSixthCharacter}
          ></TextInput>
        </View>
        <Text style={styles.subText}>
          Get the code from the person who created the Group
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
    width: SIZES.width > 400 ? 40 : 30,
    fontSize: SIZES.width > 400 ? 40 : 30,
    borderRadius: 8,
    margin: "1%",
    paddingHorizontal: 2,
    textAlign: "center",
  },
});

export default JoinGroup;

// ========================================== THE END ========================================================
