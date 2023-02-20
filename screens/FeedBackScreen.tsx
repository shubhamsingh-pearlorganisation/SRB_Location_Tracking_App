import {
  Text,
  View,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { COLORS, SIZES } from "../constants";
import { List } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { instance } from "../core/utils/AxiosInterceptor";
import { useToast } from "react-native-toast-notifications";
import { AuthContext } from "../App";
import Loader from "../components/Loader";

// ================================================================================================

const FeedbackScreen = () => {
  const toast = useToast();
  const authContextData: any = useContext(AuthContext);

  // Local Component's State
  // =======================
  const [expanded, setExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbacksList, setFeedbacksList] = useState<any>([]); //Used to store FAQs List
  const [addFeedbackData, setAddFeedbackData] = useState<any>({
    title: "",
    description: "",
  });
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    fetchFeedbacksList();
  }, []);

  // This method is used to add Feedback on the database.
  const addNewFeedback = async () => {
    // Add Feedback Form Validations Handling
    if (!addFeedbackData.title || !addFeedbackData.description) {
      Alert.alert("Validation Failed", "Title and Description is required");
      return;
    }
    if (addFeedbackData.title?.length < 5) {
      Alert.alert(
        "Validation Failed",
        "Feedback title should contain minimum 5 characters."
      );
      return;
    }
    if (addFeedbackData.description?.length < 10) {
      Alert.alert(
        "Validation Failed",
        "Feedback description should contain minimum 10 characters."
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);
      formData.append("title", authContextData?.token);
      formData.append("description", addFeedbackData.description);
      formData.append("type", "1");
      setShowLoader(true);

      const response = await instance.post("/feedback_add", formData);
      if (response.status === 200 && response.data?.status === true) {
        toast.show("Feedback Added Successfully", {
          type: "success",
        });
        setModalVisible(false);
        fetchFeedbacksList();
        setShowLoader(false);
      } else {
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while adding a new feedback. Please try again later.",
          {
            type: "error",
          }
        );
        setModalVisible(false);
        setShowLoader(false);
      }
    } catch (error: any) {
      toast.show(
        error.message
          ? error.message
          : "Getting an error while adding a new feedback. Please try again later.",
        {
          type: "error",
        }
      );
      setModalVisible(false);
      setShowLoader(false);
    }
  };

  // This method is used to fetch Feedback list from the database.
  const fetchFeedbacksList = async () => {
    try {
      setShowLoader(true);
      const formData = new FormData();
      formData.append("token_id", authContextData?.token);

      const response = await instance.post("/feedback_get", formData);
      if (response.status === 200 && response.data?.status === true) {
        setFeedbacksList(response.data?.data);
        setShowLoader(false);
      } else {
        setShowLoader(false);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while fetching Feedback List. Please try again later.",
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
          : "Getting an error while fetching Feedback List. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  return (
    <View style={{ height: SIZES.height * 0.9 }}>
      {showLoader && !addFeedbackData.title ? (
        <Loader message="Please wait.. We are Fetching Feedbacks" />
      ) : feedbacksList?.length > 0 ? (
        <>
          <List.Section title="Feedbacks">
            <ScrollView
              style={{
                height: "95%",
              }}
            >
              {feedbacksList?.length > 0 &&
                feedbacksList.map((feedback: any, i: number) => {
                  return (
                    <List.Accordion
                      key={feedback?.id ? feedback?.id : i}
                      title={feedback?.title}
                      titleStyle={styles.answerText}
                      titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
                      left={(props) => <List.Icon {...props} icon="account" />}
                      onPress={() => setExpanded(!expanded)}
                    >
                      <List.Item
                        title={feedback?.description}
                        titleNumberOfLines={10}
                        titleStyle={styles.answerText}
                      />
                    </List.Accordion>
                  );
                })}
            </ScrollView>
          </List.Section>
        </>
      ) : (
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 22,
            marginTop: 20,
          }}
        >
          No Feedback Found
        </Text>
      )}

      {/* ------------------------ Add Feeback Section ------------------------ */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {showLoader ? <Loader /> : null}

            <Text style={styles.textStyleHeading}>
              Your Feedback is Valuable To us
            </Text>
            <Text style={styles.textStyle}>Title</Text>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Feedback Heading"
              multiline={true}
              numberOfLines={2}
              onChangeText={(val: any) =>
                setAddFeedbackData({ ...addFeedbackData, title: val })
              }
            ></TextInput>
            <Text style={styles.textStyle}>Description</Text>
            <TextInput
              style={[styles.textInputStyle, { height: "30%" }]}
              placeholder="Feedback Description"
              multiline={true}
              numberOfLines={5}
              onChangeText={(val: any) =>
                setAddFeedbackData({ ...addFeedbackData, description: val })
              }
            ></TextInput>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={[
                    {
                      color: "white",
                      textAlign: "center",
                      width: 120,
                      padding: 20,
                      fontSize: 20,
                    },
                  ]}
                >
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  addNewFeedback();
                }}
              >
                <Text
                  style={[
                    {
                      color: "white",
                      textAlign: "center",
                      width: 100,
                      padding: 20,
                      fontSize: 20,
                    },
                  ]}
                >
                  Send
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.createFeedbackIcon}
        onPress={() => setModalVisible(true)}
      >
        <Entypo
          name="new-message"
          size={SIZES.width > 400 ? 35 : 25}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};
// ================================================================================================
// CSS CODE
const styles = StyleSheet.create({
  answerText: {
    width: "auto",
    height: "auto",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
  },
  modalView: {
    width: SIZES.width * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: "5%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyleHeading: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    margin: "5%",
    fontSize: SIZES.width > 400 ? 30 : 20,
  },
  textStyle: {
    color: "black",
    fontWeight: "600",
    margin: "5%",
    marginTop: "2%",
    marginBottom: "2%",
    alignSelf: "flex-start",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
  textInputStyle: {
    color: "black",
    margin: "5%",
    marginTop: "1%",
    marginBottom: "1%",
    alignSelf: "flex-start",
    fontSize: SIZES.width > 400 ? 20 : 15,
    borderColor: "black",
    borderWidth: 1,
    padding: "2%",
    borderRadius: 5,
    width: "80%",
    justifyContent: "center",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 0,
    elevation: 2,
    marginTop: "2%",
    marginHorizontal: 15,
  },
  buttonClose: {
    backgroundColor: COLORS.voilet,
  },
  createFeedbackIcon: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: SIZES.width * 0.08,
    position: "absolute",
    bottom: "2%",
    right: "2%",
    height: SIZES.width * 0.08,
    backgroundColor: COLORS.voilet,
    borderRadius: 100,
  },
});

export default FeedbackScreen;
// ========================================== THE END ======================================================
