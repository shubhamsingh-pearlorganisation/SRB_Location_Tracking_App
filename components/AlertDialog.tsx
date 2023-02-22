import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { COLORS, SIZES } from "../constants";
// ----------------------------------------------------------------------------
// This is the common Alert Dialog Component through which we can display an alert box to user.
export default function AlertDialog({
  mainDisplayMsg,
  subDisplayMsg,
  visibility,
  dismissAlert,
  confirmAction,
  messageForSuccess = "Yes, I confirm",
  messageForSkip = "Skip for now",
  showLoader,
}: any) {
  return (
    <View>
      <Modal visible={visibility} animationType={"fade"} transparent={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(52, 52, 52, 0.8)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "white",
              height:
                SIZES.height > 700 ? SIZES.height * 0.2 : SIZES.height * 0.35,
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
                  fontSize: SIZES.width > 400 ? 30 : 20,
                  marginTop: "2%",
                }}
              >
                {mainDisplayMsg}
              </Text>
              <Text
                style={{ fontSize: SIZES.width > 400 ? 18 : 15, margin: 5 }}
              >
                {subDisplayMsg}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => confirmAction()}
              style={{
                alignItems: "center",
                position: "absolute",
                borderBottomWidth: 0,
                width:
                  SIZES.width > 400 ? SIZES.width * 0.5 : SIZES.width * 0.8,
                height: "20%",
                justifyContent: showLoader ? "space-around" : "center",
                borderRadius: 30,
                backgroundColor: COLORS.voilet,
                bottom: "25%",
                flexDirection: "row",
              }}
            >
              <Text style={{ color: "white", margin: 15 }}>
                {messageForSuccess}
              </Text>
              {showLoader && (
                <ActivityIndicator
                  size={SIZES.width > 400 ? 30 : 20}
                  color="white"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => dismissAlert(false)}
              style={{
                alignItems: "center",
                position: "absolute",
                borderBottomWidth: 0,
                width:
                  SIZES.width > 400 ? SIZES.width * 0.4 : SIZES.width * 0.8,
                height: "auto",
                justifyContent: "center",
                borderRadius: 30,
                backgroundColor: COLORS.white,

                bottom: "1%",
              }}
            >
              <Text
                style={{
                  color: COLORS.voilet,
                  margin: 15,
                  textDecorationLine: "underline",
                }}
              >
                {messageForSkip}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ===================================== THE END =======================================
