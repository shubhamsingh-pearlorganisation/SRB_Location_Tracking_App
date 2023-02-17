import {
  Text,
  View,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  TextInput,
} from "react-native";

import React, { useState } from "react";

import { COLORS, SIZES } from "../constants";

import { List } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

const FeedBackScreen = () => {
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <List.Section title="Feedbacks">
        <ScrollView
          style={{
            height: "95%",
          }}
        >
          <List.Accordion
            title="First Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
          <List.Accordion
            title="Second Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
          <List.Accordion
            title="Third Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
          <List.Accordion
            title="Fourth Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
          <List.Accordion
            title="Fifth Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
        </ScrollView>
      </List.Section>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.textStyleHeading}>
              Your Feedback is Valuable To us
            </Text>
            <Text style={styles.textStyle}>Title</Text>
            <TextInput
             style={styles.textStyle}
            placeholder="Feedback Heading"
            multiline={true}
            numberOfLines={2}
            >

            </TextInput>
            <Text style={styles.textStyle}>Description</Text>
            <TextInput
             style={styles.textStyle}
            placeholder="Feedback Description"
            multiline={true}
            numberOfLines={5}
            >

            </TextInput>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
          alignItems: "center",
          justifyContent: "center",
          width: SIZES.width * 0.08,
          position: "absolute",
          bottom: "2%",
          right: "2%",
          height: SIZES.width * 0.08,
          backgroundColor: COLORS.voilet,
          borderRadius: 100,
        }}
        onPress={() => setModalVisible(true)}
      >
        <Entypo
          name="new-message"
          size={SIZES.width > 400 ? 35 : 25}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  answerText: {
    width: "auto",
    height: "auto",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyleHeading: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    margin: "5%",
    fontSize: 30,
  },
  textStyle: {
    color: "black",
    fontWeight: "600",
    margin: "5%",
    marginTop:'2%',
    marginBottom:'2%',
    alignSelf:'flex-start',
    fontSize: 30,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});

export default FeedBackScreen;
