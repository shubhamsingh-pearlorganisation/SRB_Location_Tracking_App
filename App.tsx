import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SelectLocation from "./screens/SelectLocation";
import OnBoarding from "./screens/OnBoarding";
import SplashPartner from "./screens/SplashPartner";
import FlashMessage from "react-native-flash-message";
import Otp from "./screens/Otp";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaView } from "react-native-safe-area-context/lib/typescript/SafeAreaView";
import MainScreen from "./screens/MainScreen";
import Register from "./screens/RegisterScreen";
import { COLORS } from "./constants";
import AddGroup from "./screens/AddGroup";
import EditGroup from "./screens/EditGroup";
import ContactsListing from "./screens/EmergencyContacts/ContactsListing";
import EmergencyContactsScreen from "./screens/EmergencyContacts/Home";
import EmergencyTimerScreen from "./screens/EmergencyContacts/EmergencyTimerScreen";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="OnBoarding"
            component={OnBoarding}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="otp"
            component={Otp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddGroup"
            component={AddGroup}
            options={{
              title: "Add Group",
              headerTintColor: COLORS.voilet,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Emergency"
            component={EmergencyContactsScreen}
            options={{
              title: "Emergency Service",
              headerTintColor: COLORS.voilet,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="EmergencyContactsListing"
            component={ContactsListing}
            options={{
              title: "Emergency Service",
              headerTintColor: COLORS.voilet,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="EmergencyTimer"
            component={EmergencyTimerScreen}
            options={{
              title: "Emergency Service",
              headerTintColor: COLORS.voilet,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="EditGroup"
            component={EditGroup}
            options={{
              title: "Edit Group",
              headerTintColor: COLORS.voilet,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerBackVisible: false,
            }}
          />
        </Stack.Navigator>

        <FlashMessage position="bottom" />
      </NavigationContainer>
    </ToastProvider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
