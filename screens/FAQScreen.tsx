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

const FAQScreen = () => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  const FAQ = [
    {
      Question: "Stay close with family in one touch,\nwe can help you.",
      Solution:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    },
    {
      Question: "With us you can be calm to your\nfriends and parents.",
      Solution:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    },
    {
      Question: "We will help you in your\n aspects.",
      Solution:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    },
    {
      Question: "We will also help you with\nvehicle tracking.",
      Solution:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut",
    },
  ];

  return (
    <View>
      {FAQ.map((item) => (
        <List.Section>
          <List.Accordion
            title={item.Question}
            left={(props) => <List.Icon {...props} icon="folder" />}
            onPress={handlePress}
          >
            <List.Item title={item.Solution} />
          </List.Accordion>
        </List.Section>
      ))}
    </View>
  );
};

export default FAQScreen;
