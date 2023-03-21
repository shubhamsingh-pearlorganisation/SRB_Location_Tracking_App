import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Pressable,
} from "react-native";
import { COLORS, SIZES } from "../constants";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Feather } from "@expo/vector-icons";

// ==========================================================================

const ImageUploadDialog = ({
  visibility,
  sendData,
  updateModalVisibility,
}: any) => {
  const [pickedImagePath, setPickedImagePath] = useState<any>({});

  // This method is used to find selected image file size.
  const getFileInfo = async (fileURI: string) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI);
    return fileInfo;
  };

  // This method is used to check file size length with 5 MB
  const isLessThanTheMB = (fileSize: number, smallerThanSizeMB: number) => {
    // By default fileSize is in bytes format
    // Convert in MB - fileSize / 1024 / 1024

    // console.log("fileSize:: ", fileSize);
    // console.log("smallerThanSizeMB:: ", smallerThanSizeMB);

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
      // console.log("isLt5MB:: ", isLt5MB);
      if (!isLt5MB) {
        alert(`Image size must be smaller than 5 MB!`);
        return;
      }
    }

    if (!result.canceled) {
      setPickedImagePath(result.assets[0]);
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
      // console.log("isLt5MB::: ", isLt5MB);
      if (!isLt5MB) {
        alert(`Image size must be smaller than 5 MB!`);
        return;
      }
    }

    if (!result.canceled) {
      setPickedImagePath(result.assets[0]);
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
              width: "90%",
              borderWidth: 1,
              borderColor: "#fff",
              borderRadius: 7,
              elevation: 10,
              flexDirection:'column',
              height:'auto'
            }}
          >
            <View
              style={{
                justifyContent: "space-around",
                margin: 10,
                flexDirection: "row",
                width:'100%',
                alignItems:'center',
                paddingHorizontal:'2%'
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.width > 400 ? 30 : 22,
                  marginTop: "1%",
                  width:'90%',
                  textAlign:'center'
                }}
              >
                Upload Profile Image
              </Text>
              <Pressable onPress={() => updateModalVisibility("close")}>
                <Feather name="x-circle" size={SIZES.width>400?35:24} color="black" />
              </Pressable>
            </View>

            <View style={{width:'100%', height:1, backgroundColor:COLORS.voilet}}/>

            <View
              style={{
                width:'100%',
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignSelf:'center',
                paddingVertical:30
              }}
            >
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => uploadImageFromGallery()}
                style={{
                  alignItems: "center",
                  borderBottomWidth: 0,
                  width: "auto",
                  justifyContent: "center",
                  backgroundColor:COLORS.voilet,
                  borderRadius:10,
                  paddingHorizontal:'8%',
                  paddingVertical:"2%",
                  marginVertical:'2%'
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: SIZES.width > 400 ? 22 : 18,
                    
                  }}
                >
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
                  
                  justifyContent: "center",
                  backgroundColor:COLORS.voilet,
                  borderRadius:10,
                  paddingHorizontal:'8%',
                  paddingVertical:"2%",
                  marginVertical:'2%'
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    
                    fontSize: SIZES.width > 400 ? 22 : 18,
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

export default ImageUploadDialog;
// =============================================== THE END =====================================================
