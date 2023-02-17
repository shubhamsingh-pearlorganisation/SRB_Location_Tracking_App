import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SIZES } from "../constants";
import { List } from "react-native-paper";
import { instance } from "../core/utils/AxiosInterceptor";
import { useToast } from "react-native-toast-notifications";
// ------------------------------------------------------------------
const FAQScreen = () => {
  const toast = useToast();

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);
  const [faqList, setFaqList] = useState<any>([]);

  const handlePress = () => setExpanded(!expanded); //Used for Expanding and Collapsing accordion item

  useEffect(() => {
    fetchFAQList();
  }, []);

  useEffect(() => {
    if (faqList) console.log("faqList::: ", faqList);
  }, [faqList]);

  // This method is used to fetch FAQs list from the database.
  const fetchFAQList = async () => {
    try {
      setShowLoader(true);
      const response = await instance.get("/faqs_get");
      if (response.status === 200 && response.data?.status === true) {
        setFaqList(response.data?.data);
        toast.show("FAQs Fetched Successfully", { type: "success" });
        setShowLoader(false);
      } else {
        setShowLoader(false);
        toast.show(
          response.data?.message
            ? response.data?.message
            : "Getting an error while fetching faqs. Please try again later.",
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
          : "Getting an error while fetching faqs. Please try again later.",
        {
          type: "error",
        }
      );
    }
  };

  return (
    <View>
      {showLoader && <ActivityIndicator size={SIZES.width > 400 ? 40 : 20} />}

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
