import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SelectLocation from "./screens/SelectLocation";
import SplashChild from "./screens/OnBoarding";
import SplashPartner from "./screens/SplashPartner";
import FlashMessage from "react-native-flash-message";
import Otp from "./screens/Otp";
import { ToastProvider } from "react-native-toast-notifications";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SplashChild"
            component={SplashChild}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SplashPartner"
            component={SplashPartner}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectLocation"
            component={SelectLocation}
            options={{ headerShown: false }}
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
  },
});
