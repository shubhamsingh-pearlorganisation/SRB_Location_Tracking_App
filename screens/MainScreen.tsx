import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Groups from "./Groups";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import MenuScreen from "./MenuScreen";
import EmergencyContactsScreen from "./EmergencyContacts/Home";

const MainScreen = ({ navigation }: any) => {
  const newGroup = () => {
    navigation.navigate("AddGroup");
  };

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Groups") {
            iconName = focused ? "people" : "people-outline";
          } else if (rn === "Menu") {
            iconName = focused ? "menu" : "menu-outline";
          }

          return <Ionicons name={iconName} size={size} color={"#705ECF"} />;
        },
        tabBarActiveTintColor: COLORS.voilet,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Groups"
        component={Groups}
        options={{
          title: "Group List",
          headerTintColor: COLORS.voilet,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
          headerRight: () => (
            <Ionicons
              containerStyle={styles.iconContainer}
              size={40}
              name="add"
              color={COLORS.voilet}
              onPress={newGroup}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          title: "Menu",
          headerTintColor: COLORS.voilet,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 30,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
    paddingLeft: 10,
  },
  // icon: {
  //   width: 100,
  //   height: 100,
  //   paddingLeft: 10,
  // },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120,
  },
});

export default MainScreen;
