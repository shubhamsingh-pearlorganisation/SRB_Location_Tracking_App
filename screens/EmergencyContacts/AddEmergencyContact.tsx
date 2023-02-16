import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  Pressable,
} from "react-native";
import ContactsList from "../../components/ContactList";
import { images } from "../../constants";
const { emergencyContactHome } = images;

const AddEmergencyContact = () => {
  const loadContactList = () => {
    return <ContactsList />;
  };

  return <View>{loadContactList()}</View>;
};

const styles = StyleSheet.create({});

export default AddEmergencyContact;
