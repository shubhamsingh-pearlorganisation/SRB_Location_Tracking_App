import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import Groups from "./Groups";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import MenuScreen from "./MenuScreen";
import Dashboard from "./DashboardScreen";
// ---------------------------------------------------------------------------------------------

const MainScreen = ({ navigation }: any) => {
  const newGroup = () => {
    navigation.navigate("AddGroup");
  };

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: any;
          let rn = route.name;

          if (rn === "Home") iconName = focused ? "home" : "home-outline";
          else if (rn === "Groups")
            iconName = focused ? "people" : "people-outline";
          else if (rn === "Menu") iconName = focused ? "menu" : "menu-outline";
          else iconName = "menu";

          return <Ionicons name={iconName} size={size} color={"#705ECF"} />;
        },
        tabBarActiveTintColor: COLORS.voilet,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Dashboard}
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
            fontSize: SIZES.width > 400 ? 30 : 20,
          },
          headerRight: () => (
            <Ionicons
              size={SIZES.width > 400 ? 40 : 30}
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
            fontSize: SIZES.width > 400 ? 30 : 20,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default MainScreen;

// --------------------------------------- THE END ------------------------------------------------------
