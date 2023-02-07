import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Pressable,
} from "react-native";
import { TextInput, RadioButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { SIZES } from "../constants";


const EditGroup = () => {

    const [focus, setFocus] = useState(false);
    const customStyle = focus ? styles.focusedTextInput : styles.textInput;
  
    const [state, setState] = useState("public");
    const [publicChecked, setpublicChecked] = useState("true");
    const [privateChecked, setprivateChecked] = useState("false");
  
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <Text
          style={
            styles.textInput
          }
          >
            Group Title
          </Text>
        </View>
        <View style={styles.cardHolder}>
          <View style={styles.card}>
            <Pressable
              style={{
                width: "100%",
                height: "100%",
              }}
              onPress={() => {
                setState("public");
                setpublicChecked("true");
                setprivateChecked("false");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: "10",
                }}
              >
                <Text style={styles.cardHeading}>Public</Text>
                <Pressable
                  style={[
                    publicChecked == "true" ? styles.checked : styles.unchecked,
                    styles.radio,
                  ]}
                />
              </View>
              <Text style={styles.cardText}>Only you can see other members</Text>
            </Pressable>
          </View>
  
          <View style={styles.card}>
            <Pressable
              style={{
                width: "100%",
                height: "100%",
              }}
              onPress={() => {
                setState("private");
                setpublicChecked("false");
                setprivateChecked("true");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  margin: "10",
                }}
              >
                <Text style={styles.cardHeading}>Private</Text>
                <Pressable
                  style={[
                    privateChecked == "true" ? styles.checked : styles.unchecked,
                    styles.radio,
                  ]}
                />
              </View>
              <Text style={styles.cardText}>Only you can see other members</Text>
            </Pressable>
          </View>
        </View>
  
        <TouchableOpacity
            style={{
              position: SIZES.height>500?"absolute":"relative",
              bottom:SIZES.height>500 ?"20%":"10%",
              marginTop:"5%",
              alignSelf: "center",
              width: SIZES.width - SIZES.width * 0.2,
              height: 60,
              justifyContent: "center",
              borderRadius:30,
              backgroundColor: "#705ECF",
            }}
          //   onPress={onPressSubmit}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: SIZES.width > 300 && SIZES.height > 600 ? 25 : 20,
                color: "white",
                alignSelf: "center",
              }}
            >
              Create
            </Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      height: "100%",
    },
    textInput: {
      fontSize: SIZES.width>300?50:30,
      backgroundColor: "transparent",
      textAlign: "center",
      borderBottomWidth: 0,
      margin: 20,
    },
    focusedTextInput: {
      borderBottomWidth: 0,
    },
    card: {
      width: SIZES.width * 0.4,
      height: SIZES.height * 0.2,
      margin: SIZES.width * 0.05,
      backgroundColor: "white",
      shadowColor: "black",
      shadowOpacity: 0.7,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 5,
      padding: "2%",
      borderRadius: 20,
    },
    cardHolder: {
      flexDirection: "row",
      width: "100%",
      height: "auto",
      alignContent: "center",
      justifyContent: "center",
    },
    checked: {
      backgroundColor: "#66BD6F",
    },
    unchecked: {
      backgroundColor: "white",
    },
    radio: {
      height: 30,
      width: 30,
      borderRadius: 30,
      right: 0,
      position: "absolute",
    },
    cardHeading: {
      fontSize: SIZES.width > 600 ? 30 : 20,
    },
    cardText: {
      fontSize: SIZES.width > 600 ? 20 : 15,
      width:'50%',
      bottom:0,
      position:'absolute'
    },
  });

export default EditGroup;