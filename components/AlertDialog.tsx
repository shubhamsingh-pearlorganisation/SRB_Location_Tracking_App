import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

import { COLORS, SIZES } from "../constants";

export default function AlertDialog({
  mainDisplayMsg,
  subDisplayMsg,
  visibility,
  dismissAlert,
  confirmAction,
}: any) {
  return (
    <View>
      <Modal
        visible={visibility}
        animationType={"fade"}
        transparent={true}
        //   animationType="slide"
      >
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
              height: SIZES.width * 0.3,
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
                style={{ fontSize: SIZES.width > 400 ? 18 : 12, marginTop: 5 }}
              >
                {subDisplayMsg}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => confirmAction(false)}
              style={{
                //   borderRadius: 0,
                alignItems: "center",
                position: "absolute",
                borderBottomWidth: 0,
                width: SIZES.width * 0.4,
                height: "auto",
                justifyContent: "center",
                borderRadius: 30,
                backgroundColor: COLORS.voilet,
                bottom: "25%",
              }}
            >
              <Text style={{ color: "white", margin: 15 }}>
                Yes Remove This Contact
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => dismissAlert(false)}
              style={{
                alignItems: "center",
                position: "absolute",
                borderBottomWidth: 0,
                width: SIZES.width * 0.4,
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
                No Keep This Contact
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
