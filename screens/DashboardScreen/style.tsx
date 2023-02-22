import { StyleSheet } from "react-native";
import { SIZES } from "../../constants";
// ------------------------------------------------------------
// Global Stylesheet for Dashboard Screen Module

export const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
  },
  mapBox: {
    flex: 1,
  },

  //   memberListItem: {
  //     alignItems: "center",
  //     height: "auto",
  //     flexDirection: "row",
  //     padding: "2%",
  //   },
  //   memberListItemImage: {
  //     backgroundColor: "white",
  //     shadowColor: "black",
  //     shadowOpacity: 0.4,
  //     shadowOffset: {
  //       width: 0,
  //       height: -1,
  //     },
  //     elevation: 5,
  //     shadowRadius: 5,
  //     padding: "1%",
  //     marginRight: 10,
  //     marginLeft: 0,
  //     borderRadius: 20,
  //   },
  //   memberListItemName: {
  //     fontSize: SIZES.width > 400 ? 20 : 18,
  //   },
  //   memberListItemCode: {
  //     fontSize: SIZES.width > 400 ? 18 : 15,
  //     color: "grey",
  //   },
  //   memberListItemType: {
  //     borderRadius: 10,
  //     width: "auto",
  //     height: "auto",
  //     padding: 5,
  //     alignContent: "center",
  //     justifyContent: "center",
  //     fontWeight: "700",
  //     fontSize: SIZES.width > 400 ? 18 : 15,
  //     right: "1%",
  //     position: "absolute",
  //   },
  //   memberList: {
  //     bottom: 0,
  //     position: "absolute",
  //     backgroundColor: "white",
  //     width: SIZES.width,
  //     zIndex: 0,

  //     padding: SIZES.width > 400 ? "3%" : "1%",
  //     paddingTop: SIZES.width > 400 ? "4%" : "6%",
  //     borderTopLeftRadius: SIZES.width > 350 ? 40 : 20,
  //     borderTopRightRadius: SIZES.width > 350 ? 40 : 20,
  //     shadowColor: "black",
  //     shadowOpacity: 0.4,
  //     shadowOffset: {
  //       width: 0,
  //       height: -1,
  //     },
  //     elevation: 5,
  //     shadowRadius: 5,
  //   },

  groupScreenDownIcon: {
    bottom: "2%",
    position: "absolute",
    width: SIZES.width > 400 ? "8%" : "12%",
    height: "auto",
    backgroundColor: "rgba(0,0,0,.2)",
    alignSelf: "center",
    borderRadius: 30,
  },

  groupListDropDownBtn: {
    marginTop: SIZES.height * 0.05,
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "white",
    padding: 5,
    alignSelf: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 10,
    shadowRadius: 5,
    borderRadius: 20,
    justifyContent: "center",
    zIndex: 1,
  },
  groupListItem: {
    alignItems: "center",
    height: "auto",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: "2%",
  },
  groupListItemName: {
    fontSize: SIZES.width > 400 ? 20 : 18,
  },
  groupListItemCode: {
    fontSize: SIZES.width > 400 ? 18 : 15,
    color: "grey",
  },
  groupListItemType: {
    backgroundColor: "green",
    borderRadius: 10,
    width: "auto",
    height: "auto",
    padding: 5,
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: SIZES.width > 400 ? 18 : 15,
    right: "1%",
    position: "absolute",
  },
  groupListDropDown: {
    marginTop: -SIZES.height * 0.6,
    position: "absolute",
    height: SIZES.height * 0.5,
    backgroundColor: "white",
    width: SIZES.width,
    zIndex: 0,
    padding: "1%",
    borderBottomLeftRadius: SIZES.width > 350 ? 40 : 20,
    borderBottomRightRadius: SIZES.width > 350 ? 40 : 20,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    elevation: 5,
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDownEnabled: {
    transform: [
      {
        translateY: SIZES.height * 0.6,
      },
    ],
  },
  dropDownDisabled: {
    transform: [
      {
        translateY: -SIZES.height * 0.6,
      },
    ],
  },
  expand: {
    height: SIZES.height * 0.75,
  },
  collapse: {
    height: SIZES.height * 0.3,
  },
  groupScreenOptionsForNavigate: {
    width: SIZES.width * 0.25,
    height: "auto",
    borderRadius: 30,
    backgroundColor: "#705ECF",
    padding: 4,
    marginHorizontal: 10,
  },
});
// ----------------------------------------- THE END --------------------------------------------
