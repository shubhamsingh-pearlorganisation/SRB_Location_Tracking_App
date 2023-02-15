import { View, StyleSheet, ScrollView } from "react-native";

import { useState } from "react";

import { COLORS, SIZES } from "../constants";

import { List } from "react-native-paper";

const FAQScreen = () => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  const FAQ = [
    {
      Question: "Stay close with family in one touch, we can help you.",
      Solution:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      Question: "With us you can be calm to your friends and parents.",
      Solution:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      Question: "We will help you in your aspects.",
      Solution:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      Question: "We will also help you with vehicle tracking.",
      Solution:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <View>
      <List.Section title="Frequently asked Questions">
        <ScrollView
          style={{
            height: "95%",
          }}
        >
          {FAQ.map((item, i) => (
            <List.Section key={i}>
              <List.Accordion
                title={item.Question}
                titleStyle={styles.answerText}
                titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
                left={(props) => <List.Icon icon="folder" />}
                onPress={handlePress}
              >
                <List.Item
                  title={item.Solution}
                  titleNumberOfLines={10}
                  titleStyle={styles.answerText}
                />
              </List.Accordion>
            </List.Section>
          ))}
        </ScrollView>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  answerText: {
    width: "auto",
    height: "auto",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
});

export default FAQScreen;
