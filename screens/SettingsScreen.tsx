import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { List } from "react-native-paper";
import ToggleSwitch from "toggle-switch-react-native";
import { COLORS, SIZES } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { AppSettingsContext } from "../App";

// ---------------------------------------------------------------------------------------------

const Settings = ({ navigation }: any) => {
  const userSettings: any = useContext(AppSettingsContext);

  // Component's Local States
  // ========================
  const [userSettingsData, setUserSettingsData] = useState<any>([]);
  const [userGlobalSettingsData, setUserGlobalSettingsData] = useState<any>([]);
  const [expanded, setExpanded] = useState(false);

  const [shareLocation, setShareLocation] = useState(
    userSettingsData[0]?.allow_location == 1 ? true : false
  );
  const [milesChecked, setmilesChecked] = useState(
    userSettingsData[0]?.distance_unit?.toString().includes("kilometer")
      ? true
      : false
  );

  // This "updatedSettingsData" state is used to prefilled settings data and also use to update settings data
  const [updatedSettingsData, setUpdatedSettingsData] = useState<any>({
    allowLocation: userSettingsData[0]?.allow_location == 1 ? 1 : 0,
    distanceUnit: userSettingsData[0]?.distance_unit,
    trackingFromTime: userSettingsData[0]?.tracking_from_time?.toString()
      ? new Date(userSettingsData[0]?.tracking_from_time)
      : new Date(),
    trackingToTime: userSettingsData[0]?.tracking_to_time?.toString()
      ? new Date(userSettingsData[0]?.tracking_to_time)
      : new Date(),
    mapMode: userSettingsData[0]?.map_mode?.toString()
      ? userSettingsData[0]?.map_mode?.toString()
      : "default",
  });

  useEffect(() => {
    shareLocation &&
      setUpdatedSettingsData({
        ...updatedSettingsData,
        allowLocation: shareLocation ? 1 : 0,
      });
  }, [shareLocation]);

  useEffect(() => {
    milesChecked &&
      setUpdatedSettingsData({
        ...updatedSettingsData,
        distanceUnit: milesChecked ? "kilometer" : "miles",
      });
  }, [milesChecked]);

  useEffect(() => {
    setUserSettingsData(userSettings?.appSettings?.userSettings[0]);
    setUserGlobalSettingsData(userSettings?.appSettings?.userGlobalSettings);
  }, [userSettings]);

  const [mapType, setMapType] = useState(
    userSettings[0]?.map_mode ? userSettings[0]?.map_mode : "default"
  );

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

  const redirectToMemberShipScreen = () =>
    navigation.navigate("MemberShipScreen");

  const handleSettingsUpdate = () => {
    console.log("updatedSettingsData::: ", updatedSettingsData);
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          width: SIZES.width * 0.95,
          flexDirection: "row",
          margin: "2%",
          padding: "2%",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.textHeading}>Share My Location</Text>
        <ToggleSwitch
          isOn={shareLocation}
          onColor={COLORS.voilet}
          offColor="rgba(52,52,52,0.2)"
          size={SIZES.width > 400 ? "medium" : "small"}
          onToggle={() => setShareLocation(!shareLocation)}
        />
      </View>
      <View style={styles.distanceUnitHolder}>
        <View
          style={{
            width: "40%",
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
            size={SIZES.width > 400 ? "medium" : "small"}
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
              style={{
                flexDirection: "row",
                marginHorizontal: "1%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DateTimePickerModal
                date={updatedSettingsData?.trackingFromTime}
                isVisible={startTimePickerVisible}
                mode="time"
                onConfirm={handleStartConfirm}
                onCancel={hideStartTimePicker}
              />
              <Ionicons
                name="timer-outline"
                size={SIZES.width > 400 ? 25 : 20}
                color="black"
                style={{ marginBottom: "2%", marginTop: "2%" }}
              />
              <Text
                style={{
                  fontSize: SIZES.width > 400 ? 24 : 18,
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
              style={{
                flexDirection: "row",
                marginHorizontal: "1%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DateTimePickerModal
                date={updatedSettingsData?.trackingToTime}
                isVisible={endTimePickerVisible}
                mode="time"
                onConfirm={handleEndConfirm}
                onCancel={hideEndTimePicker}
              />
              <Ionicons
                name="timer-outline"
                size={SIZES.width > 400 ? 25 : 20}
                color="black"
                style={{ marginBottom: "2%", marginTop: "2%" }}
              />
              <Text
                style={{
                  fontSize: SIZES.width > 400 ? 24 : 18,
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
      <View style={styles.subscriptionView}>
        <Text style={styles.textHeading}>Subscription Plan</Text>
        <Pressable
          style={styles.memberShipCard}
          onPress={redirectToMemberShipScreen}
        >
          <Text style={styles.subContent}>
            {userSettingsData?.is_subscription == 1
              ? "Subscribed"
              : "Not Subscribed"}
          </Text>
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
          expanded={true}
        >
          <View style={styles.item}>
            <List.Item
              title="Default"
              style={{ width: "40%" }}
              titleStyle={{
                fontSize: SIZES.width > 400 ? 20 : 18,
                color: "black",
              }}
            />

            <View style={styles.itemButtonContainer}>
              <ToggleSwitch
                isOn={mapType.includes("default") ? true : false}
                onColor={COLORS.voilet}
                offColor="rgba(52,52,52,0.2)"
                size={SIZES.width > 400 ? "medium" : "small"}
                onToggle={() => setMapType("default")}
              />
            </View>
          </View>
          <View style={styles.item}>
            <List.Item
              title="Satellite"
              style={{ width: "40%" }}
              titleStyle={{
                fontSize: SIZES.width > 400 ? 20 : 18,
                color: "black",
              }}
            />

            <View style={styles.itemButtonContainer}>
              <ToggleSwitch
                isOn={mapType.includes("satellite") ? true : false}
                onColor={COLORS.voilet}
                offColor="rgba(52,52,52,0.2)"
                size={SIZES.width > 400 ? "medium" : "small"}
                onToggle={() => setMapType("satellite")}
              />
            </View>
          </View>
          <View style={styles.item}>
            <List.Item
              title="Terrain"
              style={{ width: "40%" }}
              titleStyle={{
                fontSize: SIZES.width > 400 ? 20 : 18,
                color: "black",
              }}
            />
            <View style={styles.itemButtonContainer}>
              <ToggleSwitch
                isOn={mapType.includes("terrain") ? true : false}
                onColor={COLORS.voilet}
                offColor="rgba(52,52,52,0.2)"
                size={SIZES.width > 400 ? "medium" : "small"}
                onToggle={() => setMapType("terrain")}
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
      <Pressable
        style={styles.memberShipCard}
        onPress={() => handleSettingsUpdate()}
      >
        <Text style={styles.subContent}>Save Settings</Text>
      </Pressable>
    </ScrollView>
  );
};
// ---------------------------------------------------------------------------------------------
// CSS CODE
// =========
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "1%",
  },
  textHeading: {
    fontSize: SIZES.width > 400 ? 25 : 18,
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
    width: SIZES.width * 0.95,
    margin: "2%",
    padding: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  distanceCardHolder: {
    width: "60%",
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
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
    width: SIZES.width,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    margin: "2%",
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
    width: SIZES.width * 0.95,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2%",
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
// ------------------------------------------- THE END --------------------------------------------------
