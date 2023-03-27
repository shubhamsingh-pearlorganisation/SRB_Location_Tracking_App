import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useState, useEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import {
  convertDateIn_DDMMYYYY_Format,
  convertMonthNumberToName,
} from "../core/utils/helper";
import Loader from "../components/Loader";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import NoDataFound from "../components/NoDataFound";
// -----------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------

const MemberHistory = ({ navigation, route }: any) => {
  const memberName = route?.params?.memberName;
  const uId = route?.params?.userId;

  // Fetching Current User Id
  const [userId] = useState<any>(uId);
  const [showLoader, setShowLoader] = useState(false);
  const [firebaseLocationData, setFirebaseLocationData] = useState<any>({});

  const fetchLocationDataFromFirebase = () => {
    // const startingTime = "2:39:14 PM";
    const startingDate = historyDate
      ? convertDateIn_DDMMYYYY_Format(new Date(historyDate))
      : "";

    if (startingDate) {
      try {
        console.log("startingDate::: ", startingDate);
        setShowLoader(true);
        const startCountRef = ref(
          db,
          `users/${userId}/location/${startingDate}`
        );
        onValue(startCountRef, (snapshot) => {
          const locationData = snapshot.val();
          if (locationData) {
            setShowLoader(false);
            setFirebaseLocationData(locationData);
            setLocationsTimelineData([]);
          } else {
            setShowLoader(false);
            setFirebaseLocationData([]);
            setLocationsTimelineData([]);
          }
        });
      } catch (error: any) {
        setShowLoader(false);

        console.log(
          "Getting error while fetching posts:: ",
          error?.message ? error?.message : error
        );
      }
    }
  };

  // --------------------------- Date Picker Handling -- Start -----------------------------------

  const [historyDate, setHistoryDate] = useState<any>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateValue, setDateValue] = useState<any>("");
  const [locationsTimelineData, setLocationsTimelineData] = useState<any>([]);

  useEffect(() => {
    if (Object.keys(firebaseLocationData).length > 0) {
      console.log("firebaseL ocationData::: ", firebaseLocationData);

      for (let key in firebaseLocationData) {
        const time = key;
        const placeName = firebaseLocationData[key][0].address;
        console.log("time::: ", time);
        setLocationsTimelineData((prevState: any) => [
          ...prevState,
          { time, title: placeName },
        ]);
      }
    }
  }, [firebaseLocationData]);

  useEffect(() => {
    console.log("locationsTimelineData::: ", locationsTimelineData);
  }, [locationsTimelineData]);

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

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: any) => {
    let tempDate = new Date(date);
    setHistoryDate(tempDate);
    hideDatePicker();
  };

  useEffect(() => {
    userId && historyDate && fetchLocationDataFromFirebase();
  }, [userId, historyDate]);
  // --------------------------- Date Picker Handling -- Finished -----------------------------------

  return showLoader ? (
    <Loader message="Please wait ..." />
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
            <Text style={styles.heading}>
              {memberName ? memberName?.toString().split(" ")[0] : "N.A"}
            </Text>
            <Text style={styles.subHeading}>
              {locationsTimelineData.length > 0
                ? locationsTimelineData[locationsTimelineData.length - 1]?.title
                : "N.A"}
            </Text>
            <Text style={styles.subHeading}>
              {locationsTimelineData.length > 0
                ? locationsTimelineData[locationsTimelineData.length - 1]?.time
                : "N.A"}
            </Text>
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
          <View
            style={{
              flexDirection: "row",
              width: SIZES.width > 400 ? "30%" : "50%",
              justifyContent: "space-between",
            }}
          >
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
              <View style={{ marginHorizontal: "2%", flexDirection: "row" }}>
                <AntDesign
                  name="calendar"
                  size={SIZES.width > 400 ? 30 : 22}
                  color="black"
                />
                <Text style={[styles.subHeading, { marginLeft: "5%" }]}>
                  {/* {Object.keys(historyDate).length} */}
                  {`${dateValue}`}
                  {/* {typeof historyDate} */}
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={() => nextDate()}>
              <MaterialIcons
                name={"keyboard-arrow-right"}
                size={SIZES.width > 400 ? 30 : 25}
                color={"black"}
              />
            </Pressable>
          </View>
        </View>

        {/* ---------------------------------------location history timeline-------------------------------------- */}

        {locationsTimelineData.length > 0 ? (
          <View style={[styles.locationLineHolder]}>
            <Timeline
              style={[styles.list, { paddingTop: 5 }]}
              data={locationsTimelineData}
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
              separator={false}
              detailContainerStyle={styles.listItem}
              columnFormat="two-column"
            />
          </View>
        ) : (
          <NoDataFound />
        )}
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
    height: SIZES.height,
    position: "relative",
  },
  holder: {
    flexDirection: "row",
    width: SIZES.width * 0.95,
    alignSelf: "flex-start",
    marginBottom: "5%",
  },
  userInfoHolder: {
    width: SIZES.width > 400 ? "40%" : "50%",
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
    width: SIZES.width > 400 ? "4%" : "8%",
  },
  locationLineHolder: {
    height: SIZES.width > 400 ? SIZES.height * 0.68 : SIZES.height * 0.62,
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.width * 0.98,
    position: "absolute",
    bottom: 0,
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
    marginHorizontal: "1%",
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
