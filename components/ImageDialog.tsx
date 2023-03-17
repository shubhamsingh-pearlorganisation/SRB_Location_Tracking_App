import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { COLORS, SIZES } from "../constants";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const ImageDialog = ({ visibility, sendData, route }: any) => {
  console.log("visible:: ", visibility);

  const [userDetails, setUserDetails] = useState<any>({
    name: route?.params?.userDetails?.name
      ? route?.params?.userDetails?.name
      : "",
    emailId: route?.params?.userDetails?.email
      ? route?.params?.userDetails?.email
      : "",
    dob: route?.params?.userDetails?.dob ? route?.params?.userDetails?.dob : "",
    contact: route?.params?.userDetails?.contact
      ? route?.params?.userDetails?.contact
      : "",
  });

  const [pickedImagePath, setPickedImagePath] = useState<any>({});

  const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
    // By default fileSize is in bytes format
    // Convert in MB - fileSize / 1024 / 1024
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB;
    return isOk;
  };

  // This function is triggered when the "Select from Gallery" button pressed
  const uploadImageFromGallery = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Failed",
        "You've refused to allow this app to access your photos!"
      );
      return;
    }

    const result: any = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    const fileInfo = await getFileInfo(result?.assets[0]?.uri);

    if (!fileInfo?.size) {
      alert("Can't select this file as the size is unknown.");
      return;
    }

    if (result?.assets[0]?.type === "image") {
      const isLt5MB = isLessThanTheMB(fileInfo.size, 5);
      if (!isLt5MB) {
        alert(`Image size must be smaller than 5 MB!`);
        return;
      }
    }

    if (!result.canceled) {
      setPickedImagePath(result.assets[0]);
      setUserDetails({ ...userDetails, image: "" });
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const uploadImageFromCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Failed",
        "You've refused to allow this app to access your camera!"
      );
      return;
    }

    const result: any = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    const fileInfo = await getFileInfo(result?.assets[0]?.uri);

    if (!fileInfo?.size) {
      alert("Can't select this file as the size is unknown.");
      return;
    }

    if (result?.assets[0]?.type === "image") {
      const isLt5MB = isLessThanTheMB(fileInfo.size, 5);
      if (!isLt5MB) {
        alert(`Image size must be smaller than 5 MB!`);
        return;
      }
    }

    if (!result.canceled) {
      setPickedImagePath(result.assets[0]);
      setUserDetails({ ...userDetails, image: "" });
    }
  };

  useEffect(() => {
    if (Object.keys(pickedImagePath).length > 0) {
      sendData(pickedImagePath);
    }
  }, [pickedImagePath]);

  return (
    <View>
      <Modal visible={visibility} animationType={"fade"} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(52, 52, 52, 0.6)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "white",
              height:
                SIZES.height > 700 ? SIZES.height * 0.2 : SIZES.height * 0.15,
              width: "90%",
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 7,
              elevation: 10,
            }}
          >
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text
                style={{
                  fontSize: SIZES.width > 400 ? 30 : 22,
                  marginTop: "1%",
                }}
              >
                Upload Profile Image
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent:'flex-end',
                alignItems:'flex-end',
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => uploadImageFromGallery()}
                style={{
                  alignItems: "center",
                  borderBottomWidth: 0,
                  width: "auto",
                  height: "auto",
                  justifyContent: "center",
                }}
              >
                <Text style={{color: COLORS.voilet,
                fontSize:SIZES.width>400?22:18,
                    margin: 15,
                    textDecorationLine: "underline",}}>
                  Gallery
                </Text>
                {/* {showLoader && (
                <ActivityIndicator
                  size={SIZES.width > 400 ? 30 : 20}
                  color="white"
                />
              )} */}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => uploadImageFromCamera()}
                style={{
                  alignItems: "center",
                  borderBottomWidth: 0,
                  width: "auto",
                  height: "auto",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: COLORS.voilet,
                    margin: 15,
                    textDecorationLine: "underline",
                    fontSize:SIZES.width>400?22:18,
                  }}
                >
                  Take Picture
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageDialog;
