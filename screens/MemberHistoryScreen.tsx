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

const MemberHistory = () => {
  // Fetching Current User Id
  const userSettings: any = useContext(AppSettingsContext);
  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    if (userSettings?.loggedInUserId) setUserId(userSettings?.loggedInUserId);
  }, [userSettings?.loggedInUserId]);

  const fetchLocationDataFromFirebase = () => {
    // const startingTime = "2:39:14 PM";
    try {
      const startCountRef = ref(db, `users/${userId}/location/`);
      // console.log("startCountRef:: ", startCountRef);
      onValue(startCountRef, (snapshot) => {
        const locationData = snapshot.val();
        console.log(
          `Retrieved Location data From Firebase Realtime database ::: ${locationData} and total objects found: ${locationData.length}`
        );
      });
    } catch (error: any) {
      console.log(
        "Getting error while fetching posts:: ",
        error?.message ? error?.message : error
      );
    }
  };

  useEffect(() => {
    userId && fetchLocationDataFromFirebase();
  }, [userId]);

  // --------------------------- Date Picker Handling -- Start -----------------------------------

  //  const [historyDate, setHistoryDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //  const nextDate = () =>{
  //   setHistoryDate(new Date().setDate(new Date().getDate()+1))
  //  }
  //  const previousDate = () =>{
  //   setHistoryDate(new Date().getDate()-1)
  //  }

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

    //  setUserDetails({ ...userDetails, dob: fullDate });
    hideDatePicker();
  };

  // --------------------------- Date Picker Handling -- Finished -----------------------------------

  return (
    <View style={styles.container}>
      <View style={styles.holder}>
        <View style={styles.backBtn}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={SIZES.width > 400 ? 30 : 25}
            color={"black"}
          />
        </View>

        <View style={styles.userInfoHolder}>
          <Text style={styles.heading}>Name</Text>
          <Text style={styles.subHeading}>Last Location</Text>
          <Text style={styles.subHeading}>LastUpdated</Text>
        </View>
        <Pressable style={styles.getDirection}>
          <Entypo
            name="direction"
            size={SIZES.width > 400 ? 24 : 18}
            color="black"
          />
          <Text>GET Direction</Text>
        </Pressable>
      </View>
      <View style={styles.dateDataHolder}>
        <Pressable>
          <MaterialIcons
            name={"keyboard-arrow-left"}
            size={SIZES.width > 400 ? 24 : 18}
            color={"black"}
          />
        </Pressable>
        <Pressable onPress={showDatePicker} style={styles.dateHolder}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
            minimumDate={new Date("1930-01-01")}
            // date={historyDate}
          />
          <AntDesign
            name="calendar"
            size={SIZES.width > 400 ? 24 : 18}
            color="black"
            style={{ marginHorizontal: "5%" }}
          />
          <Text style={styles.subHeading}>
            20 Feb
            {/* {Object.keys(historyDate).length} */}
            {/* {new Date(historyDate)} */}
            {/* {typeof historyDate} */}
          </Text>
        </Pressable>
        <Pressable
        // onPress={() => nextDate()}
        >
          <MaterialIcons
            name={"keyboard-arrow-right"}
            size={SIZES.width > 400 ? 24 : 18}
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
    marginHorizontal: "1%",
  },
  getDirection: {
    right: "2%",
    top: "2%",
    position: "absolute",
    width: SIZES.width > 400 ? "10%" : "20%",
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 1,
    padding: "8%",
    backgroundColor: "rgba(52,52,52,0.1)",
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
