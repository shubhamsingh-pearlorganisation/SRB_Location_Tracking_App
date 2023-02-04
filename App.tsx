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

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <ToastProvider
    
    >
      <NavigationContainer>
        <Stack.Navigator style={{
      height:"100%"
    }}>
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }} />
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
    height:"100%"
  },
});
