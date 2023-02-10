import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { profile } from "../constants/images";
import { List } from "react-native-paper";

const FeedBackScreen = () => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <List.Section title="Accordions">
        <List.Accordion
          title="Uncontrolled Accordion"
          left={(props) => <List.Icon {...props} icon="folder" />}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>

        <List.Accordion
          title="Controlled Accordion"
          left={(props) => <List.Icon {...props} icon="folder" />}
          expanded={expanded}
          onPress={handlePress}
        >
          <List.Item title="First item" />
          <List.Item title="Second item" />
        </List.Accordion>
      </List.Section>
    </View>
  );
};

export default FeedBackScreen;
