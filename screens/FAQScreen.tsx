import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SIZES } from "../constants";
import { List } from "react-native-paper";
import { UserDetailsContext } from "../App";
import NoDataFound from "../components/NoDataFound";
// ------------------------------------------------------------------
const FAQScreen = () => {
  const userDetailsContextData: any = useContext(UserDetailsContext);
  // Component's Local States
  // ========================
  const [expanded, setExpanded] = useState(false);
  const [faqList, setFaqList] = useState<any>(
    userDetailsContextData?.faqData?.length > 0
      ? userDetailsContextData?.faqData
      : []
  );
  useEffect(() => {
    userDetailsContextData?.faqData &&
      setFaqList(userDetailsContextData?.faqData);
  }, [userDetailsContextData?.faqData]);

  return (
    <View>
      {faqList?.length > 0 ? (
        <>
          <List.Section title="Frequently asked Questions">
            <ScrollView
              style={{
                height: "95%",
              }}
            >
              {faqList?.length > 0 ? (
                faqList.map((faq: any, i: number) => (
                  <List.Section key={i}>
                    <List.Accordion
                      title={faq.title}
                      titleStyle={styles.answerText}
                      titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
                      left={(props) => <List.Icon icon="folder" />}
                      onPress={() => setExpanded(!expanded)}
                    >
                      <List.Item
                        title={faq.description}
                        titleNumberOfLines={10}
                        titleStyle={styles.answerText}
                      />
                    </List.Accordion>
                  </List.Section>
                ))
              ) : (
                <NoDataFound message="No FAQ Found" />
              )}
            </ScrollView>
          </List.Section>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};
// =========================================================================================
// CSS CODE
const styles = StyleSheet.create({
  answerText: {
    width: "auto",
    height: "auto",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
});

export default FAQScreen;
// =============================================== THE END =======================================================
