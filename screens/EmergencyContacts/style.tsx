import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
// ------------------------------------------------------------
// Global Stylesheet for Emergency Contacts Module
export const styles = StyleSheet.create({
  // ------------------------------- Index.tsx Screen CSS ------------------------------
  container: {
    flexDirection: "column",
    alignItems: "center",
    height: SIZES.height,
    top: "1%",
  },
  image: {
    width: 142,
    height: 142,
    marginTop: 108,
  },
  noContact: {
    fontStyle: "normal",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 32,
    color: "#000000",
  },
  message: {
    marginTop: 20,
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "center",
    fontSize: 20,
    lineHeight: 30,
    color: "rgba(0, 0, 0, 0.6)",
  },
  addContactBtn: {
    width: 188,
    height: 48,
    backgroundColor: "#705ECF",
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  addContactBtnText: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 24,
    color: "#FFFFFF",
    fontStyle: "normal",
  },
  //--------------------- Contacts Listing with help Screen CSS ---------------------
  listingHelpContainer: {
    marginTop: "10%",
    alignItems: "center",
    height: SIZES.height,
  },
  title: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: SIZES.height > 700 ? 40 : 25,
    height: "auto",
    textAlign: "center",
    color: "#000000",
  },
  listContainer: {
    height: "100%",
    width: "100%",
  },
  listingHelpScreenImage: {
    width: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,
    height: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,
    marginBottom: "5%",
    position: "relative",
    borderRadius: 91,
    justifyContent: "center",
    alignContent: "center",
    padding: "2%",
  },
  needHelp: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 19,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },
  pressHere: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },

  lineStyle: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
  contactName: {
    fontSize: SIZES.width > 400 ? 22 : 17,
  },
  contactumber: {
    fontSize: SIZES.width > 400 ? 18 : 15,
  },
  totalContactsLength: {
    margin: 10,
    color: COLORS.voilet,
    fontWeight: "bold",
    fontSize: SIZES.width > 400 ? 20 : 15,
  },
  addMoreContacts: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.voilet,
    padding: "2%",
    marginTop: "10%",
    marginLeft: "2%",
    borderRadius: 10,
    fontSize: SIZES.width > 400 ? 17 : 14,
    fontWeight: "bold",
    color: "white",
  },

  // ---------------------  Emergency Timer Screen CSS ---------------------
  emergencyScreenContainer: {
    marginTop: "20%",
    alignItems: "center",
    flexDirection: "column",
    height: SIZES.height,
  },
  emergencyScreenTitle: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: SIZES.height > 700 ? 40 : 30,
    textAlign: "center",
    color: "#000000",
  },
  emergencyScreenImage: {
    width: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,
    height: SIZES.width > 400 ? SIZES.width * 0.2 : SIZES.width * 0.4,

    backgroundColor: "#FF0000",
    position: "relative",
    borderRadius: 91,
    justifyContent: "center",
    alignContent: "center",
    padding: "2%",
    alignSelf: "center",
  },
  emergencyScreenNeedHelp: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },
  emergencyScreenPressHere: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 20,
    lineHeight: 25,
    textAlign: "center",
    color: "#FFFFFF",
  },

  emergencyScreenLineStyle: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },

  // ----------------------------- Individual Contact Screen CSS ---------------------------------------
  contactCon: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#d9d9d9",
    width: "95%",
    alignSelf: "center",
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#d9d9d9",
    alignItems: "center",
    justifyContent: "center",
  },
  contactDat: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: "#888",
  },
  checkbox: {
    margin: 10,
  },

  // ----------------------- PhonebookContactList Screen CSS ---------------------------
  selectedAndAddContactBtns: {
    backgroundColor: COLORS.voilet,
    padding: "2%",
    margin: "5%",
    borderRadius: 10,
    fontSize: SIZES.width > 400 ? 20 : 15,
    fontWeight: "bold",
    color: "white",
  },
});
// ----------------------------------------- THE END --------------------------------------------
