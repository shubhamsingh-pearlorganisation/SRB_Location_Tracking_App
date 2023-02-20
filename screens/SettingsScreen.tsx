import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { List } from "react-native-paper";
import ToggleSwitch from "toggle-switch-react-native";
import { COLORS, SIZES } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

// ---------------------------------------------------------------------------------------------

const Settings = () => {
  // Component's Local States
  // ========================
  const [mapType, setMapType] = useState("Default");
  const [expanded, setExpanded] = useState(false);
  const [shareLocation, setShareLocation] = useState(true);
  const [milesChecked, setmilesChecked] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  // --------------------------- Time Picker Handling -- Start -----------------------------------
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [startTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [endTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const showstartTimePicker = () => setStartTimePickerVisible(true);

  const hideStartTimePicker = () => setStartTimePickerVisible(false);

  const handleStartConfirm = (date: any) => {
    setStartTime(date);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => setEndTimePickerVisible(true);

  const hideEndTimePicker = () => setEndTimePickerVisible(false);

  const handleEndConfirm = (date: any) => {
    setEndTime(date);
    hideEndTimePicker();
  };

  // --------------------------- Time Picker Handling -- Finished -----------------------------------

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          width: SIZES.width * 0.9,
          flexDirection: "row",
          margin: "5%",
          padding: "2%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "600",
            width: "80%",
          }}
        >
          Share My Location
        </Text>
        <ToggleSwitch
          isOn={shareLocation}
          onColor={COLORS.voilet}
          offColor="rgba(52,52,52,0.2)"
          size="medium"
          onToggle={() => setShareLocation(!shareLocation)}
        />
      </View>

      {/* --------------------------------Distance Cards------------------------------------- */}

      <View style={styles.distanceUnitHolder}>
        <View
          style={{
            width: "60%",
          }}
        >
          <Text style={styles.textHeading}>Distance Unit</Text>
        </View>

        <View style={styles.distanceCardHolder}>
          <View style={styles.card}>
            <Text
              style={[
                styles.cardText,
                milesChecked ? styles.unSelected : styles.selected,
              ]}
            >
              Kilometers
            </Text>
          </View>
          <ToggleSwitch
            isOn={milesChecked}
            onColor={COLORS.voilet}
            offColor={COLORS.voilet}
            size="medium"
            onToggle={() => setmilesChecked(!milesChecked)}
          />
          <View style={styles.card}>
            <Text
              style={[
                styles.cardText,
                milesChecked ? styles.selected : styles.unSelected,
              ]}
            >
              Miles
            </Text>
          </View>
        </View>
      </View>

      {/* -----------------------------------------Tracking Time Cards----------------------------------------- */}

      <View style={styles.trackingTimeView}>
        <View style={styles.trackingFromTimeHolder}>
          <Text style={styles.textHeading}>Tracking from Time</Text>
          <View>
            <Pressable
              onPress={showstartTimePicker}
              style={{ flexDirection: "row", marginHorizontal: "1%" }}
            >
              <DateTimePickerModal
                date={startTime}
                isVisible={startTimePickerVisible}
                mode="time"
                onConfirm={handleStartConfirm}
                onCancel={hideStartTimePicker}
              />
              <Ionicons
                name="timer-outline"
                size={24}
                color="black"
                style={{ marginBottom: "2%", marginTop: "2%" }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: "2%",
                  marginTop: "2%",
                }}
              >
                {startTime
                  ? startTime.toLocaleTimeString()
                  : "No date selected"}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.trackingToTimeHolder}>
          <Text style={styles.textHeading}>Tracking to Time</Text>
          <View>
            <Pressable
              onPress={showEndTimePicker}
              style={{ flexDirection: "row", marginHorizontal: "1%" }}
            >
              <DateTimePickerModal
                date={endTime}
                isVisible={endTimePickerVisible}
                mode="time"
                onConfirm={handleEndConfirm}
                onCancel={hideEndTimePicker}
              />
              <Ionicons
                name="timer-outline"
                size={24}
                color="black"
                style={{ marginBottom: "2%", marginTop: "2%" }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: "2%",
                  marginTop: "2%",
                }}
              >
                {endTime ? endTime.toLocaleTimeString() : "No date selected"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* --------------------------------------------Subscribed or not card----------------------------------- */}

      <View style={styles.subscriptionView}>
        <Text style={styles.textHeading}>Subscription Plan:-</Text>
        <Pressable style={styles.memberShipCard}>
          <Text style={styles.subContent}>Not Subscribed</Text>
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={24}
            color={"white"}
          />
        </Pressable>
      </View>
      <List.Section title="">
        <List.Accordion
          title="Select Map Mode"
          titleStyle={styles.textHeading}
          onPress={handlePress}
        >
          <View style={styles.item}>
            <List.Item
              title="Default"
              style={{ width: "40%" }}
              titleStyle={{ fontSize: 20, color: "black" }}
            />

            <View style={styles.itemButtonContainer}>
              <ToggleSwitch
                isOn={mapType == "Default" ? true : false}
                onColor={COLORS.voilet}
                offColor="rgba(52,52,52,0.2)"
                size="medium"
                onToggle={() => setMapType("Default")}
              />
            </View>
          </View>
          <View style={styles.item}>
            <List.Item
              title="Satellite"
              style={{ width: "40%" }}
              titleStyle={{ fontSize: 20, color: "black" }}
            />

            <View style={styles.itemButtonContainer}>
              <ToggleSwitch
                isOn={mapType == "Satellite" ? true : false}
                onColor={COLORS.voilet}
                offColor="rgba(52,52,52,0.2)"
                size="medium"
                onToggle={() => setMapType("Satellite")}
              />
            </View>
          </View>
          <View style={styles.item}>
            <List.Item
              title="Terrain"
              style={{ width: "40%" }}
              titleStyle={{ fontSize: 20, color: "black" }}
            />
            <View style={styles.itemButtonContainer}>
              <ToggleSwitch
                isOn={mapType == "Terrain" ? true : false}
                onColor={COLORS.voilet}
                offColor="rgba(52,52,52,0.2)"
                size="medium"
                onToggle={() => setMapType("Terrain")}
              />
            </View>
          </View>
        </List.Accordion>
        <List.Accordion
          title="Privacy Policy, Terms and Conditons"
          titleStyle={styles.textHeading}
          titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
          onPress={handlePress}
        >
          <List.Item
            title="Privacy Policy"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <List.Item
            title="Terms and Conditions"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
        </List.Accordion>
      </List.Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
  },
  textHeading: {
    fontSize: SIZES.width > 400 ? 30 : 20,
    fontWeight: "600",
    color: "black",
    padding: "1%",
    textAlign: "left",
  },
  subContainer: {
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    padding: ".5%",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  itemButtonContainer: {
    top: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: COLORS.voilet,
  },
  unchecked: {
    backgroundColor: "rgba(52,5,52,0.3)",
  },
  radio: {
    height: SIZES.width > 400 ? 18 : 15,
    width: SIZES.width > 400 ? 18 : 15,
    borderRadius: 30,
    right: 0,
    position: "absolute",
  },
  distanceUnitHolder: {
    width: SIZES.width * 0.9,
    margin: "5%",
    padding: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  distanceCardHolder: {
    width: "40%",
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
  selected: {
    color: COLORS.voilet,
  },
  unSelected: {
    color: "rgba(0,0,0,0.2)",
  },
  trackingTimeView: {
    width: SIZES.width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  trackingFromTimeHolder: {
    width: "45%",
    alignItems: "center",
  },
  trackingToTimeHolder: {
    width: "45%",
    alignItems: "center",
  },
  subscriptionView: {
    width: SIZES.width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "5%",
    padding: "2%",
  },
  memberShipCard: {
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    borderRadius: 5,
    backgroundColor: COLORS.voilet,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  subContent: {
    color: "white",
    fontSize: SIZES.width > 400 ? 18 : 15,
    marginHorizontal: "2%",
  },
});

export default Settings;
