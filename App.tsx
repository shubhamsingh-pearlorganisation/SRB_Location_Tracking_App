import { createContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./screens/OnBoarding";
import FlashMessage from "react-native-flash-message";
import Login from "./screens/Login";
import { ToastProvider } from "react-native-toast-notifications";
import MainScreen from "./screens/MainScreen";
import Register from "./screens/Register";
import { COLORS, SIZES } from "./constants";
import AddGroup from "./screens/AddGroup";
import EditGroup from "./screens/EditGroup";
import ContactsListing from "./screens/EmergencyContacts/ContactsListing";
import EmergencyContactsScreen from "./screens/EmergencyContacts/Home";
import EmergencyTimerScreen from "./screens/EmergencyContacts/EmergencyTimerScreen";
import SelectLocation from "./screens/SelectLocation";
import AddMember from "./screens/AddMember";
import ProfileScreen from "./screens/ProfileScreen";
import FAQScreen from "./screens/FAQScreen";
import FeedBackScreen from "./screens/FeedBackScreen";
import SettingsScreen from "./screens/SettingsScreen";
import JoinGroup from "./screens/JoinGroupScreen";
import MemberHistory from "./screens/MemberHistoryScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instance } from "./core/utils/AxiosInterceptor";
import { useToast } from "react-native-toast-notifications";

// ----------------------------------------------------------------------------------
export const AuthContext: any = createContext(null);
export const GroupsAndMembersContext: any = createContext(null);

const App = () => {
  const Stack = createNativeStackNavigator();
  const toast = useToast();

  // Used to store authentication token
  const [authenticationToken, setAuthenticationToken] = useState<any>("");

  // Used to store Groups List
  const [groupsAndMembersDetails, setGroupAndMembersDetails] = useState<any>({
    update: false,
    groupsData: [],
  });

  // This method is used to receive authentication token from login screen after successful login
  const receiveAuthenticationToken = (jwtToken: any) => {
    if (jwtToken !== null) setAuthenticationToken(jwtToken);
    else setAuthenticationToken("");
  };
  // Fetching JWT Token when component's mounted
  useEffect(() => {
    fetchAuthenticationToken(); // Fetching Authentication Token
  }, []);

  //This method is used to fetch JWT Token from @react-native-async-storage/async-storage
  const fetchAuthenticationToken = async () => {
    try {
      const token = await AsyncStorage.getItem("authentication-token");
      if (token !== null) {
        console.log("Token Found : ", token);
        setAuthenticationToken(token);
      } else console.log("Token Not Found");
    } catch (e: any) {
      console.log("Getting an error while fetching JWT Token:: ", e.message);
    }
  };

  // This method is used to fetch Groups from the Api
  const fetchGroups = async (isUpdateRequired: boolean = false) => {
    alert(isUpdateRequired);
    try {
      const formData = new FormData();
      formData.append("token_id", authenticationToken);

      const response = await instance.post("/group_list", formData);
      if (response.status === 200 && response.data?.status === true) {
        setGroupAndMembersDetails({
          ...groupsAndMembersDetails,
          update: isUpdateRequired,
          groupsData: response.data?.data?.reverse(),
        });
      } else {
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while fetching groups. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } catch (error: any) {
      toast.show(
        error.message
          ? error.message
          : "Getting an error while fetching groups. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  useEffect(() => {
    authenticationToken && fetchGroups(false); //Fetching Groups and Members Details API
  }, [authenticationToken]);

  useEffect(() => {
    console.log("groupsAndMembersDetails:Shubham:: ", groupsAndMembersDetails);
  }, [groupsAndMembersDetails]);

  return (
    <ToastProvider>
      <NavigationContainer>
        <AuthContext.Provider
          value={{
            token: authenticationToken,
            setTokenAfterLogin: receiveAuthenticationToken,
          }}
        >
          <GroupsAndMembersContext.Provider
            value={{
              groupsAndMembersDetails: groupsAndMembersDetails.groupsData,
              fetchGroupsAndMembersList: (val: any) => fetchGroups(val),
            }}
          >
            <Stack.Navigator>
              {!authenticationToken ? (
                <>
                  <Stack.Screen
                    name="OnBoarding"
                    component={OnBoarding}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                  />
                </>
              ) : (
                <>
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
                    name="SelectLocation"
                    component={SelectLocation}
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
                        fontSize: SIZES.width > 400 ? 30 : 20,
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
                        fontSize: SIZES.width > 400 ? 30 : 20,
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
                        fontSize: SIZES.width > 400 ? 30 : 20,
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
                        fontSize: SIZES.width > 400 ? 30 : 20,
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
                        fontSize: SIZES.width > 400 ? 30 : 20,
                      },
                      headerBackVisible: false,
                    }}
                  />
                  <Stack.Screen
                    name="AddMember"
                    component={AddMember}
                    options={{
                      title: "Add Member",
                      headerTintColor: COLORS.voilet,
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: SIZES.width > 400 ? 30 : 20,
                      },
                      headerBackVisible: false,
                    }}
                  />

                  <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{
                      title: "Profile Page",
                      headerTintColor: COLORS.voilet,
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: SIZES.width > 400 ? 30 : 20,
                      },
                      headerBackVisible: false,
                    }}
                  />

                  <Stack.Screen
                    name="FAQScreen"
                    component={FAQScreen}
                    options={{
                      title: "FAQ & Support",
                      headerTintColor: COLORS.voilet,
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: SIZES.width > 400 ? 30 : 20,
                      },
                      headerBackVisible: false,
                    }}
                  />

                  <Stack.Screen
                    name="FeedBackScreen"
                    component={FeedBackScreen}
                    options={{
                      title: "FeedBackScreen",
                      headerTintColor: COLORS.voilet,
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: SIZES.width > 400 ? 30 : 20,
                      },
                      headerBackVisible: false,
                    }}
                  />
                  <Stack.Screen
                    name="SettingsScreen"
                    component={SettingsScreen}
                    options={{
                      title: "Settings",
                      headerTintColor: COLORS.voilet,
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: SIZES.width > 400 ? 30 : 20,
                      },
                      headerBackVisible: false,
                    }}
                  />
                  <Stack.Screen
                    name="JoinGroupScreen"
                    component={JoinGroup}
                    options={{
                      title: "Join A Group",
                      headerTintColor: COLORS.voilet,
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: SIZES.width > 400 ? 30 : 20,
                      },
                      headerBackVisible: false,
                    }}
                  />
                  <Stack.Screen
                    name="MemberHistoryScreen"
                    component={MemberHistory}
                    options={{
                      title: "History",
                      headerTintColor: COLORS.voilet,
                      headerTitleStyle: {
                        fontWeight: "bold",
                        fontSize: SIZES.width > 400 ? 30 : 20,
                      },
                      headerBackVisible: false,
                    }}
                  />
                </>
              )}
            </Stack.Navigator>

            <FlashMessage position="bottom" />
          </GroupsAndMembersContext.Provider>
        </AuthContext.Provider>
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
// =============================================== THE END =====================================================
