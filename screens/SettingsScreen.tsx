import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Pressable,
  NativeModules,
  Animated,
  ScrollView,
} from "react-native";
<<<<<<< Updated upstream

const Settings = () => {
  return (
    <View>
      <Text>Settings Screen</Text>
    </View>
  );
};

=======
import { List } from "react-native-paper";
import ToggleSwitch from "toggle-switch-react-native";
import { COLORS, SIZES } from "../constants";

const Settings = () => {
  const [mapType, setMapType] = useState("Default");
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <List.Section title="">
        {/* <Text style={styles.textHeading}>Select Map Mode</Text> */}
        <List.Accordion
          title="Select Map Mode"
          titleStyle={styles.textHeading}
          // expanded={expanded}
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
        // expanded={expanded}
        onPress={handlePress}
        >
            <List.Item title = "Privacy Policy" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
            <List.Item title = "Terms and Conditions" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."/>
        </List.Accordion>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
  },
  textHeading: {
    fontSize: SIZES.width>400? 30:20,
    fontWeight: "600",
    color: "black",
    // backgroundColor: COLORS.white,
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
});

>>>>>>> Stashed changes
export default Settings;
