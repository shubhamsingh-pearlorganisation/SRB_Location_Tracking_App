import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import Timeline from "react-native-timeline-flatlist";

const timelineData = [
  {
    time: "09:00",
    title: "Archery Training",
    // description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
    // lineColor:'#009688',
    // icon: require('../img/archery.png'),
    // imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
  },
  {
    time: "10:45",
    title: "Play Badminton",
    // description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
    // icon: require('../img/badminton.png'),
    // imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
  },
  {
    time: "12:00",
    title: "Lunch",
    // icon: require('../img/lunch.png'),
  },
  {
    time: "12:00",
    title: "Lunch",
    // icon: require('../img/lunch.png'),
  },
  {
    time: "12:00",
    title: "Lunch",
    // icon: require('../img/lunch.png'),
  },
  {
    time: "12:00",
    title: "Lunch",
    // icon: require('../img/lunch.png'),
  },
  {
    time: "12:00",
    title: "Lunch",
    // icon: require('../img/lunch.png'),
  },
  {
    time: "14:00",
    title: "Watch Soccer",
    // description: 'Team sport played between two teams of eleven players with a spherical ball. ',
    // lineColor:'#009688',
    // icon: require('../img/soccer.png'),
    // imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
  },
  {
    time: "16:30",
    title: "Go to Fitness center",
    // description: 'Look out for the Best Gym & Fitness Centers around me :)',
    // icon: require('../img/dumbbell.png'),
    // imageUrl: 'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
  },
];

// ---------------------------------------------------------------------------------------------

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
          <MaterialIcons name="keyboard-arrow-left" size={SIZES.width>400?30:25} color={"black"} />
        </View>

        <View style={styles.userInfoHolder}>
          <Text style={styles.heading}>Name</Text>
          <Text style={styles.subHeading}>Last Location</Text>
          <Text style={styles.subHeading}>LastUpdated</Text>
        </View>
        <Pressable style={styles.getDirection}>
          <Entypo name="direction" size={SIZES.width>400?24:18} color="black" />
          <Text>GET Direction</Text>
        </Pressable>
      </View>
      <View style={styles.dateDataHolder}>
        <Pressable>
          <MaterialIcons
            name={"keyboard-arrow-left"}
            size={SIZES.width>400?24:18}
            color={"black"}
          />
        </Pressable>
        <Pressable
          onPress={showDatePicker}
          style={styles.dateHolder}
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
          <AntDesign name="calendar" size={SIZES.width>400?24:18} color="black" style={{marginHorizontal:"5%"}}/>
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
            size={SIZES.width>400?24:18}
            color={"black"}
          />
        </Pressable>
      </View>

{/* ---------------------------------------location history timeline-------------------------------------- */}

      <View style={styles.locationLineHolder}>
        <Timeline
          style={[styles.list, { paddingTop: 5 }]}
          data={timelineData}
          circleSize={SIZES.width>400?30:20}
          circleColor={COLORS.voilet}
          circleStyle={{
            borderColor: COLORS.white,
            borderWidth: 2,
          }}
          titleStyle={styles.listItemTitle}
          lineColor={COLORS.voilet}
          timeContainerStyle={{width:"auto",marginTop: -5 }}
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

const styles = StyleSheet.create({
  container: {
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
    marginLeft:'2%'
  },
  heading: {
    fontSize: SIZES.width>400?24:18,
    fontWeight: "500",
  },
  subHeading: {
    fontSize: SIZES.width>400?18:15,
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
    flexDirection: "row", marginHorizontal: "1%" 
  },
  getDirection: {
    right: "2%",
    top: "2%",
    position: "absolute",
    width: SIZES.width>400?"10%":"20%",
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
    fontSize: SIZES.width>400?18:15,
    fontWeight: "400",
  },
  listItemTime: {
    textAlign: "center",
    padding: 0,
    color: "grey",
    fontSize:SIZES.width>400?15:12
  },
});

export default MemberHistory;
