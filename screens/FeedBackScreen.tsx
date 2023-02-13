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
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <List.Section title="Feedbacks">
        <ScrollView>
          <List.Accordion
            title="First Feedback"
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          </List.Accordion>
          <List.Accordion
            title="Second Feedback"
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          </List.Accordion>
          <List.Accordion
            title="Third Feedback"
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
          </List.Accordion>
        </ScrollView>
      </List.Section>
    </View>
  );
};

export default FeedBackScreen;
