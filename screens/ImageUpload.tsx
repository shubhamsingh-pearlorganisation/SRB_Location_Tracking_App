import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useToast } from "react-native-toast-notifications";
import { instance } from "../core/utils/AxiosInterceptor";

// -------------------------------------------------------------------------------------

function ImageUpload() {
  const toast = useToast();

  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState<any>({});

  useEffect(() => {
    console.log("pickedImagePath:: ", pickedImagePath);
  }, [pickedImagePath]);

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result: any = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    // Explore the result
    console.log("result:: open gallery", result);

    if (!result.canceled) {
      setPickedImagePath(result.assets[0]);
      console.log(result.assets[0]);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result: any = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    // Explore the result
    console.log("result:: open camera", result);

    if (!result.canceled) {
      setPickedImagePath(result.assets[0]);
      console.log(result.assets[0]);
    }
  };

  // This method is used to update user's profile image using an API
  const updateUserProfileImage = async (imageData: any) => {
    console.log("imageData::: ", imageData);
    try {
      const formData = new FormData();
      formData.append("token_id", "1a99f54d2c259de751b9be63c4a85224");
      formData.append("image", imageData);

      const response = await instance.post("/users_image_update", formData);

      console.log("data::: ", response.data);

      if (response.status === 200 && response.data?.status === true) {
        toast.show("Profile Image updated successfully!", {
          type: "success",
        });
      } else {
        console.log("response.data?.message::: ", response.data?.message);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while updating user's profile image. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } catch (error: any) {
      console.log("error::: ", error);

      toast.show(
        error.message
          ? error.message
          : "Getting an error while updating user's profile image. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  const uploadImage = () => {
    // Image URL
    const uri = pickedImagePath?.uri ? pickedImagePath?.uri : "";

    const uriLastSegment = pickedImagePath?.uri
      ? pickedImagePath?.uri.toString().split("/")[
          pickedImagePath?.uri.toString().split("/").length - 1
        ]
      : "";

    const fileExtension = uriLastSegment && uriLastSegment.split(".")[1];

    // Image Type
    let type;
    if (
      pickedImagePath?.type &&
      pickedImagePath?.type.toString().includes("image/") === true
    ) {
      type = pickedImagePath?.type;
    } else if (
      pickedImagePath?.type &&
      pickedImagePath?.type.toString().includes("image/") === false
    ) {
      type = "image/" + pickedImagePath?.type;
    } else type = "";

    // Name
    const name = pickedImagePath?.name ? pickedImagePath?.name : uriLastSegment;

    // File Name
    const filename = pickedImagePath?.filename
      ? pickedImagePath?.filename
      : uriLastSegment;

    const imageData = {
      uri,
      type,
      name,
      filename,
    };

    if (
      fileExtension === "png" ||
      fileExtension === "jpg" ||
      fileExtension === "jpeg"
    )
      updateUserProfileImage(imageData);
    else alert("The selected file type is invalid");
  };
  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={showImagePicker} title="Select an image" />
        <Button onPress={openCamera} title="Open camera" />
      </View>

      <View style={styles.imageContainer}>
        {pickedImagePath?.uri !== "" && (
          <Image source={{ uri: pickedImagePath?.uri }} style={styles.image} />
        )}
      </View>
      <Pressable onPress={uploadImage}>
        <Text>Upload Image</Text>
      </Pressable>
    </View>
  );
}

// Just some styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: 400,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    padding: 30,
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: "cover",
  },
});

export default ImageUpload;
