import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { List } from "react-native-paper";
import ToggleSwitch from "toggle-switch-react-native";
import { COLORS, SIZES } from "../constants";
// ---------------------------------------------------------------------------------------------

const Settings = () => {
  // Component's Local States
  // ========================
  const [mapType, setMapType] = useState("Default");
  const [expanded, setExpanded] = useState(false);
  const [shareLocation, setShareLocation] = useState(true)
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
       <View
      style={{
        width:SIZES.width*.9,
        flexDirection:'row',
        margin:'5%',
        padding:'2%'
      }}
      >
        <Text
        style={{
          fontSize:30,
          fontWeight:'600',
          width:"80%"
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
     
    </View>
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
});

export default Settings;
