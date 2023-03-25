import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState, useEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import { AppSettingsContext } from "../App";
import {
  convertDateIn_DDMMYYYY_Format,
  convertMonthNumberToName,
} from "../core/utils/helper";
import Loader from "../components/Loader";
import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
// -----------------------------------------------------------------------------------

const timelineData = [
  {
    time: "09:00",
    title: "Archery Training",
  },
  {
    time: "10:45",
    title: "Play Badminton",
  },
  {
    time: "12:00",
    title: "Lunch",
  },
  {
    time: "12:00",
    title: "Lunch",
  },
  {
    time: "12:00",
    title: "Lunch",
  },
  {
    time: "12:00",
    title: "Lunch",
  },
  {
    time: "12:00",
    title: "Lunch",
  },
  {
    time: "14:00",
    title: "Watch Soccer",
  },
  {
    time: "16:30",
    title: "Go to Fitness center",
  },
];

// ---------------------------------------------------------------------------------------------

const MemberHistory = ({ navigation }: any) => {
  // Fetching Current User Id
  const userSettings: any = useContext(AppSettingsContext);
  const [userId, setUserId] = useState<any>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [firebaseLocationData, setFirebaseLocationData] = useState<any>({});

  useEffect(() => {
    if (userSettings?.loggedInUserId) setUserId(userSettings?.loggedInUserId);
  }, [userSettings?.loggedInUserId]);

  const fetchLocationDataFromFirebase = () => {
    // const startingTime = "2:39:14 PM";
    const startingDate = historyDate
      ? convertDateIn_DDMMYYYY_Format(new Date(historyDate))
      : "";
    console.log("Starting Date:: ", startingDate);
    if (startingDate) {
      try {
        setShowLoader(true);
        const startCountRef = ref(
          db,
          `users/${userId}/location/${startingDate}`
        );
        // console.log("startCountRef:: ", startCountRef);
        onValue(startCountRef, (snapshot) => {
          const locationData = snapshot.val();
          console.log("Firebase Response::: ", locationData);
          if (locationData) setFirebaseLocationData(locationData);
          // console.log("locationData::: ", locationData);
          // console.log(
          //   "Location Objects Length: ",
          //   Object.keys(locationData),
          //   Object.keys(locationData).length
          // );
          for (let key in locationData) {
            console.log(
              `Key ${key} contains ${locationData[key].length} location objects.`
            );
          }
        });
      } catch (error: any) {
        console.log(
          "Getting error while fetching posts:: ",
          error?.message ? error?.message : error
        );
      } finally {
        setShowLoader(false);
      }
    }
  };

  // --------------------------- Date Picker Handling -- Start -----------------------------------

  const [historyDate, setHistoryDate] = useState<any>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [dateValue, setDateValue] = useState<any>("");

  useEffect(() => {
    console.log("history date:: ", new Date(historyDate));
    const monthName = convertMonthNumberToName(
      new Date(historyDate).getMonth()
    );
    setDateValue(`${new Date(historyDate).getDate()} ${monthName}`);
  }, [historyDate]);

  const nextDate = () => {
    setHistoryDate(
      new Date(historyDate).setDate(new Date(historyDate).getDate() + 1)
    );
    console.log("next date:: ", new Date(historyDate));
  };
  const previousDate = () => {
    setHistoryDate(
      new Date(historyDate).setDate(new Date(historyDate).getDate() - 1)
    );
    console.log("previous date:: ", new Date(historyDate));
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    let tempDate = new Date(date);

    const currentDate = tempDate.getDate();
    const month = tempDate.getMonth() + 1;
    const year = tempDate.getFullYear();

    // Making Full Date of Birth which we need to send in API
    let fullDate = `${year}-${month < 10 ? "0" + month : month}-${
      currentDate < 10 ? "0" + currentDate : currentDate
    }`;
    setHistoryDate(tempDate);
    //  setUserDetails({ ...userDetails, dob: fullDate });
    hideDatePicker();
  };

  useEffect(() => {
    userId && historyDate && fetchLocationDataFromFirebase();
  }, [userId, historyDate]);
  // --------------------------- Date Picker Handling -- Finished -----------------------------------

  return showLoader ? (
    <Loader message="Please wait ... We are fetching Locations Records." />
  ) : (
    <>
      <View style={styles.container}>
        <View style={styles.holder}>
          <View style={styles.backBtn}>
            <Pressable onPress={() => navigation.navigate("Main")}>
              <MaterialIcons
                name="keyboard-arrow-left"
                size={SIZES.width > 400 ? 30 : 25}
                color={"black"}
              />
            </Pressable>
          </View>

          <View style={styles.userInfoHolder}>
            <Text style={styles.heading}>Name</Text>
            <Text style={styles.subHeading}>Last Location</Text>
            <Text style={styles.subHeading}>LastUpdated</Text>
          </View>
          <Pressable style={styles.getDirection}>
            <Text style={{ color: "black" }}>{"Get\nDirection"}</Text>

            <Entypo
              name="direction"
              size={SIZES.width > 400 ? 40 : 30}
              color="black"
              style={{ margin: "5%" }}
            />
          </Pressable>
        </View>
        <View style={styles.dateDataHolder}>
          <Pressable onPress={previousDate}>
            <MaterialIcons
              name={"keyboard-arrow-left"}
              size={SIZES.width > 400 ? 30 : 25}
              color={"black"}
            />
          </Pressable>
          <Pressable onPress={showDatePicker} style={styles.dateHolder}>
            {isDatePickerVisible && (
              <RNDateTimePicker
                mode="date"
                display="spinner"
                maximumDate={new Date()}
                minimumDate={new Date("1930-01-01")}
                value={new Date(historyDate)}
                onChange={(val: any) =>
                  handleConfirm(val.nativeEvent.timestamp)
                }
                positiveButton={{ label: "OK", textColor: "green" }}
              />
            )}

            <AntDesign
              name="calendar"
              size={SIZES.width > 400 ? 30 : 22}
              color="black"
              style={{ marginHorizontal: "5%" }}
            />
            <Text style={styles.subHeading}>
              {/* {Object.keys(historyDate).length} */}
              {`${dateValue}`}
              {/* {typeof historyDate} */}
            </Text>
          </Pressable>
          <Pressable onPress={() => nextDate()}>
            <MaterialIcons
              name={"keyboard-arrow-right"}
              size={SIZES.width > 400 ? 30 : 25}
              color={"black"}
            />
          </Pressable>
        </View>

        {/* ---------------------------------------location history timeline-------------------------------------- */}

        <View style={styles.locationLineHolder}>
          <Timeline
            style={[styles.list, { paddingTop: 5 }]}
            data={timelineData}
            circleSize={SIZES.width > 400 ? 30 : 20}
            circleColor={COLORS.voilet}
            circleStyle={{
              borderColor: COLORS.white,
              borderWidth: 2,
            }}
            titleStyle={styles.listItemTitle}
            lineColor={COLORS.voilet}
            timeContainerStyle={{ width: "auto", marginTop: -5 }}
            timeStyle={styles.listItemTime}
            descriptionStyle={{ color: "gray" }}
            rowContainerStyle={{ paddingTop: "2%" }}
            // options={{
            //   style:{paddingTop:5}
            // }}
            // innerCircle={"icon"}
            // onEventPress={this.onEventPress}
            separator={false}
            detailContainerStyle={styles.listItem}
            columnFormat="two-column"
          />
        </View>
      </View>
    </>
  );
};
// =========================================================================================
// CSS CODE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "1%",
    backgroundColor: COLORS.white,
  },
  holder: {
    flexDirection: "row",
    width: SIZES.width * 0.95,
    alignSelf: "flex-start",
    marginBottom: "5%",
  },
  userInfoHolder: {
    width: "30%",
    marginLeft: "2%",
  },
  heading: {
    fontSize: SIZES.width > 400 ? 24 : 18,
    fontWeight: "500",
  },
  subHeading: {
    fontSize: SIZES.width > 400 ? 18 : 15,
  },
  backBtn: {
    height: "100%",
    width: "8%",
  },
  locationLineHolder: {
    height: SIZES.height * 0.65,
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.width,
  },
  dateDataHolder: {
    borderColor: "black",
    margin: "2%",
    padding: "3%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dateHolder: {
    flexDirection: "row",
    marginHorizontal: "2%",
  },
  getDirection: {
    right: "2%",
    top: "2%",
    position: "absolute",
    width: SIZES.width > 400 ? "20%" : "30%",
    borderColor: COLORS.voilet,
    borderRadius: 15,
    borderWidth: 1,
    padding: "8%",
    flexDirection: "row",
    backgroundColor: "rgba(112, 94, 207, .5)",
    alignItems: "center",
  },
  list: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    height: "100%",
    padding: "5%",
  },
  listItem: {
    marginBottom: 20,
    backgroundColor: "rgba(112, 94, 207, .3)",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  listItemTitle: {
    fontSize: SIZES.width > 400 ? 18 : 15,
    fontWeight: "400",
  },
  listItemTime: {
    textAlign: "center",
    padding: 0,
    color: "grey",
    fontSize: SIZES.width > 400 ? 15 : 12,
  },
});

export default MemberHistory;
// ========================================= THE END ================================================
