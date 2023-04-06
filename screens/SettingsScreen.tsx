import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { List } from "react-native-paper";
import ToggleSwitch from "toggle-switch-react-native";
import { COLORS, SIZES } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { AuthContext } from "../App";
import { instance } from "../core/utils/AxiosInterceptor";
import { useToast } from "react-native-toast-notifications";
import Loader from "../components/Loader";

// ---------------------------------------------------------------------------------------------

const Settings = ({ navigation }: any) => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);

  // Component's Local States
  // ========================
  const [userSettings, setUserSettings] = useState<any>({}); // Used to store get settings api data
  const [expanded, setExpanded] = useState(false);
  const [kilometerChecked, setKilometerChecked] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  // This "updatedSettingsData" state is used to prefilled settings data and also use to update settings data
  const [updatedSettingsData, setUpdatedSettingsData] = useState<any>({
    allow_location: null,
    distance_unit: "",
    tracking_from_time: new Date(),
    tracking_to_time: new Date(),
    map_mode: "",
    fromTime: "",
    toTime: "",
  });

  // This method is used to fetch complete settings list from the database.
  const fetchSettings = async () => {
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      const response = await instance.post("/user_setting_get", formData);
      if (response.status === 200 && response.data?.status === true) {
        setUserSettings(response.data?.setting[0]);
      } else {
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while fetching app settings. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } catch (error: any) {
      toast.show(
        error.message
          ? error.message
          : "Getting an error while fetching app settings. Please try again later.",
        {
          type: "error",
        }
      );
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // ================================================================

  useEffect(() => {
    if (userSettings && Object.keys(userSettings).length > 0) {
      setKilometerChecked(
        !userSettings?.distance_unit?.toString().includes("kilometer")
          ? true
          : false
      );
      setUpdatedSettingsData({
        ...updatedSettingsData,
        allow_location: userSettings?.allow_location,
        distance_unit: userSettings?.distance_unit
          ?.toString()
          .includes("kilometer")
          ? "kilometer"
          : "mile",
        map_mode: userSettings?.map_mode,
        tracking_from_time: new Date(),
        tracking_to_time: new Date(),
      });
    }
  }, [userSettings]);

  const handlePress = () => setExpanded(!expanded);

  // --------------------------- Time Picker Handling -- Start -----------------------------------

  const [startTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [endTimePickerVisible, setEndTimePickerVisible] = useState(false);

  const [from_time, set_From_Time] = useState<any>("");
  const [to_time, set_To_Time] = useState<any>("");

  const showstartTimePicker = () => setStartTimePickerVisible(true);
  const hideStartTimePicker = () => setStartTimePickerVisible(false);
  const showEndTimePicker = () => setEndTimePickerVisible(true);
  const hideEndTimePicker = () => setEndTimePickerVisible(false);

  const handleStartConfirm = (date: any) => {
    const trackingFromTime = date ? new Date(date).toLocaleTimeString() : "";

    setUpdatedSettingsData({
      ...updatedSettingsData,
      fromTime: trackingFromTime,
    });
    updateSettings({
      tracking_from_time: trackingFromTime,
    });
    set_From_Time(trackingFromTime);
    hideStartTimePicker();
  };

  const handleEndConfirm = (date: any) => {
    const trackingToTime = date ? new Date(date).toLocaleTimeString() : "";

    setUpdatedSettingsData({
      ...updatedSettingsData,
      toTime: trackingToTime,
    });
    updateSettings({
      tracking_to_time: trackingToTime,
    });
    set_To_Time(trackingToTime);

    hideEndTimePicker();
  };

  // --------------------------- Time Picker Handling -- Finished -----------------------------------

  const redirectToMemberShipScreen = () =>
    navigation.navigate("MemberShipScreen");

  // This method is used to update user's settings
  const updateSettings = async (settingData: any) => {
    try {
      if (Object.keys(settingData).length !== 0) {
        let key: any = Object.keys(settingData)[0].toString();
        let value: any = Object.values(settingData)[0];

        if (key === "allow_location" && value == true) {
          value = parseInt("1");
        } else if (key === "allow_location" && value == false) {
          value = parseInt("0");
        } else value = value;

        const formData: any = new FormData();
        formData.append("token_id", authContextData?.token);
        formData.append("key", key);
        formData.append("value", value);

        const response = await instance.post("/user_setting_update", formData);
        if (response.status === 200 && response.data?.status === true) {
          toast.show("User settings updated successfully", {
            type: "success",
          });
        } else {
          toast.show(
            response.data?.message
              ? response.data?.message
              : "Getting an error while updating settings. Please try again later.",
            {
              type: "error",
            }
          );
        }
      } else return;
    } catch (error: any) {
      toast.show(
        error.message
          ? error.message
          : "Getting an error while updating settings. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  // =======================================================================================

  return (
    <View style={styles.container}>
      <ScrollView style={{}}>
        {showLoader ? (
          <Loader
            message={"Please wait ... \nWe are fetching user's settings"}
          />
        ) : (
          <>
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
                isOn={updatedSettingsData?.allow_location == 1 ? true : false}
                onColor={COLORS.voilet}
                offColor="rgba(52,52,52,0.2)"
                size={SIZES.width > 400 ? "medium" : "small"}
                onToggle={() => {
                  setUpdatedSettingsData({
                    ...updatedSettingsData,
                    allow_location: !updatedSettingsData?.allow_location,
                  });
                  updateSettings({
                    allow_location: !updatedSettingsData?.allow_location,
                  });
                }}
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
                      kilometerChecked ? styles.unSelected : styles.selected,
                    ]}
                  >
                    Kilometers
                  </Text>
                </View>
                <ToggleSwitch
                  isOn={kilometerChecked}
                  onColor={COLORS.voilet}
                  offColor={COLORS.voilet}
                  size={SIZES.width > 400 ? "medium" : "small"}
                  onToggle={() => {
                    setKilometerChecked(!kilometerChecked);
                    updateSettings({
                      distance_unit: kilometerChecked ? "kilometer" : "mile",
                    });
                  }}
                />
                <View style={styles.card}>
                  <Text
                    style={[
                      styles.cardText,
                      kilometerChecked ? styles.selected : styles.unSelected,
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
                      date={updatedSettingsData?.tracking_from_time}
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
                      {from_time === "" &&
                      updatedSettingsData?.tracking_from_time
                        ? new Date(
                            updatedSettingsData?.tracking_from_time
                          ).toLocaleTimeString()
                        : from_time
                        ? from_time
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
                      date={updatedSettingsData?.tracking_to_time}
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
                      {to_time === "" && updatedSettingsData?.tracking_from_time
                        ? new Date(
                            updatedSettingsData?.tracking_to_time
                          ).toLocaleTimeString()
                        : to_time
                        ? to_time
                        : "No date selected"}
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
                  {userSettings?.is_subscription == 1
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
                      isOn={
                        updatedSettingsData?.map_mode.includes("default") ||
                        updatedSettingsData?.map_mode.includes("auto")
                          ? true
                          : false
                      }
                      onColor={COLORS.voilet}
                      offColor="rgba(52,52,52,0.2)"
                      size={SIZES.width > 400 ? "medium" : "small"}
                      onToggle={() => {
                        setUpdatedSettingsData({
                          ...updatedSettingsData,
                          map_mode: "default",
                        });
                        updateSettings({
                          map_mode: "default",
                        });
                      }}
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
                      isOn={
                        updatedSettingsData?.map_mode.includes("satellite")
                          ? true
                          : false
                      }
                      onColor={COLORS.voilet}
                      offColor="rgba(52,52,52,0.2)"
                      size={SIZES.width > 400 ? "medium" : "small"}
                      onToggle={() => {
                        setUpdatedSettingsData({
                          ...updatedSettingsData,
                          map_mode: "satellite",
                        });
                        updateSettings({
                          map_mode: "satellite",
                        });
                      }}
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
                      isOn={
                        updatedSettingsData?.map_mode.includes("terrain")
                          ? true
                          : false
                      }
                      onColor={COLORS.voilet}
                      offColor="rgba(52,52,52,0.2)"
                      size={SIZES.width > 400 ? "medium" : "small"}
                      onToggle={() => {
                        setUpdatedSettingsData({
                          ...updatedSettingsData,
                          map_mode: "terrain",
                        });
                        updateSettings({
                          map_mode: "terrain",
                        });
                      }}
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
          </>
        )}
      </ScrollView>
    </View>
  );
};
// ---------------------------------------------------------------------------------------------
// CSS CODE
// =========
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "1%",
    position: "relative",
    height: SIZES.height,
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
