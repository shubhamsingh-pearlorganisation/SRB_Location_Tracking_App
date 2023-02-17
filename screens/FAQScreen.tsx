import { View, StyleSheet, ScrollView, Text } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SIZES } from "../constants";
import { List } from "react-native-paper";
import { instance } from "../core/utils/AxiosInterceptor";
import { useToast } from "react-native-toast-notifications";
import Loader from "../components/Loader";
import { UserDetailsContext } from "../App";
// ------------------------------------------------------------------
const FAQScreen = () => {
  const toast = useToast();
  const userDetailsContextData: any = useContext(UserDetailsContext);

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);
  const [faqList, setFaqList] = useState<any>(
    userDetailsContextData?.faqData?.length > 0
      ? userDetailsContextData?.faqData
      : []
  );

  const handlePress = () => setExpanded(!expanded); //Used for Expanding and Collapsing accordion item

  useEffect(() => {
    userDetailsContextData?.faqData &&
      setFaqList(userDetailsContextData?.faqData);
  }, [userDetailsContextData?.faqData]);

  return (
    <View>
      {showLoader && <Loader message="Please wait.. we are fetching FAQs" />}

      {faqList?.length > 0 ? (
        <>
          <List.Section title="Frequently asked Questions">
            <ScrollView
              style={{
                height: "95%",
              }}
            >
              {faqList?.length > 0 &&
                faqList.map((faq: any, i: number) => (
                  <List.Section key={i}>
                    <List.Accordion
                      title={faq.title}
                      titleStyle={styles.answerText}
                      titleNumberOfLines={SIZES.width > 400 ? 5 : 10}
                      left={(props) => <List.Icon icon="folder" />}
                      onPress={handlePress}
                    >
                      <List.Item
                        title={faq.description}
                        titleNumberOfLines={10}
                        titleStyle={styles.answerText}
                      />
                    </List.Accordion>
                  </List.Section>
                ))}
            </ScrollView>
          </List.Section>
        </>
      ) : (
        <></>
      )}
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
