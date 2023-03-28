import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import { emergencyCallImage } from "../../constants/images";
import { useEffect, useState, useContext } from "react";
import { useToast } from "react-native-toast-notifications";
import { instance } from "../../core/utils/AxiosInterceptor";
import { AuthContext } from "../../App";
import Loader from "../../components/Loader";
import { styles } from "./style";
// -----------------------------------------------------------------

const EmergencyTimerScreen = ({ navigation }: any) => {
  const toast = useToast();

  // Component's Local States
  // ========================
  const [counter, setCounter] = useState(10);
  const [showLoader, setShowLoader] = useState(false);
  const authContextData: any = useContext(AuthContext);

  useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      sendEmergencyAlert();
    }
    return () => clearInterval(timer);
  }, [counter]);

  // This method is used to redirect user to Dashboard Screen
  const redirectBack = () => navigation.navigate("Main");

  // This method is used to send emergency alert to all the contacts which are saved in database.
  const sendEmergencyAlert = async () => {
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      const response = await instance.post("/emergency_alert", formData);
      if (response.status === 200 && response.data?.status === true) {
        toast.show("Emergency alert sent Successfully to all the contacts", {
          type: "success",
        });
        setShowLoader(false);
        setTimeout(() => {
          redirectBack();
        }, 2000);
      } else {
        setShowLoader(false);

        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while sending emergency alert to your contacts. Please try again later.",
          {
            type: "error",
          }
        );
      }
    } catch (error: any) {
      setShowLoader(false);

      toast.show(
        error.message
          ? error.message
          : "Getting an error while sending emergency alert to your contacts. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };
  // ----------------------------------------------------------------------------------------

  return (
    <SafeAreaView style={styles.emergencyScreenContainer}>
      {showLoader && <Loader />}

      <ImageBackground
        source={emergencyCallImage}
        resizeMode="contain"
        style={{
          height: SIZES.width * 0.4,
          width: SIZES.width * 0.8,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Pressable>
          <View style={styles.emergencyScreenImage}>
            <Text style={styles.emergencyScreenNeedHelp}>{counter}</Text>
          </View>
        </Pressable>
      </ImageBackground>

      <Text
        style={{
          fontSize: SIZES.width > 400 ? 40 : 30,
          fontWeight: "300",
          padding: "5%",
        }}
      >
        We will send you an alert message to your contacts when count will be 0.
      </Text>

      <TouchableOpacity
        style={{
          marginTop: "20%",
          width: SIZES.width * 0.4,
          height: 60,
          justifyContent: "center",
          borderRadius: 30,
          backgroundColor: COLORS.white,
          borderColor: COLORS.black,
          borderWidth: 1,
        }}
        onPress={() => redirectBack()}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: SIZES.width > 300 && SIZES.height > 600 ? 25 : 20,
            color: "black",
            alignSelf: "center",
          }}
        >
          Cancel
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EmergencyTimerScreen;
// =============================================== THE END =====================================================
