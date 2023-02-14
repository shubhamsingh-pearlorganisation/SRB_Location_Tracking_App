import { View, StyleSheet, ScrollView } from "react-native";

import { useState } from "react";

import { COLORS, SIZES } from "../constants";

import { List } from "react-native-paper";

const FeedBackScreen = () => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View>
      <List.Section title="Feedbacks">
        <ScrollView
          style={{
            height: "95%",
          }}
        >
          <List.Accordion
            title="First Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
          <List.Accordion
            title="Second Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
          <List.Accordion
            title="Third Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
          <List.Accordion
            title="Fourth Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
          <List.Accordion
            title="Fifth Feedback"
            titleStyle={styles.answerText}
            titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
            left={(props) => <List.Icon {...props} icon="account" />}
            // expanded={expanded}
            onPress={handlePress}
          >
            <List.Item
              title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
              titleNumberOfLines={10}
              titleStyle={styles.answerText}
            />
          </List.Accordion>
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

export default FeedBackScreen;
