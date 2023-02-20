import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { SIZES } from "../constants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

const MemberHistory = () => {
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
          <MaterialIcons name="keyboard-arrow-left" size={30} color={"black"} />
        </View>

        <View style={styles.userInfoHolder}>
          <Text style={styles.heading}>Name</Text>
          <Text style={styles.subHeading}>Last Location</Text>
          <Text style={styles.subHeading}>LastUpdated</Text>
        </View>
        <Pressable style={styles.getDirection}>
          <Entypo name="direction" size={24} color="black" />
          <Text>GET Direction</Text>
        </Pressable>
      </View>
      <View style={styles.dateDataHolder}>
        <Pressable>
          <MaterialIcons
            name={"keyboard-arrow-left"}
            size={24}
            color={"black"}
          />
        </Pressable>
        <Pressable
          onPress={showDatePicker}
          style={{ flexDirection: "row", marginHorizontal: "1%" }}
        >
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
            minimumDate={new Date("1930-01-01")}
            // date={historyDate}
          />
          <AntDesign name="calendar" size={24} color="black" />
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
            size={24}
            color={"black"}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "1%",
  },
  holder: {
    flexDirection: "row",
    width: SIZES.width * 0.95,
    alignSelf: "flex-start",
    marginBottom: "5%",
  },
  userInfoHolder: {
    width: "30%",
  },
  heading: {
    fontSize: 24,
    fontWeight: "500",
  },
  subHeading: {
    fontSize: 18,
  },
  backBtn: {
    height: "100%",
    width: "5%",
  },
  locationLineHolder: {},
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
  dateHolder: {},
  getDirection: {
    right: "2%",
    top: "2%",
    position: "absolute",
    width: "10%",
    borderColor: "black",
    borderRadius: 15,
    borderWidth: 1,
    padding: "8%",
    backgroundColor: "rgba(52,52,52,0.1)",
  },
});

export default MemberHistory;
