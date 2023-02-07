import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
        }}
      >
        <MaterialIcons
          style={[styles.icons, { paddingLeft: 5 }]}
          name="keyboard-arrow-left"
          size={30}
          color={"black"}
        />
        <Text
          style={{
            fontSize: 30,
            alignSelf: "center",
            fontWeight: "600",
          }}
        >
          User Name
        </Text>
        <FontAwesome5
          style={[styles.icons, { right: 0, position: "absolute" }]}
          name="user-circle"
          size={30}
          color={"black"}
        />
      </View>
      <View
        style={{
          width: "99%",
          flexDirection: "row",
          marginTop: "5%",
          borderBottomColor: "black",
          borderBottomWidth: 2,
          margin: 10,
        }}
      >
        <FontAwesome5
          style={[styles.icons, { left: 0 }]}
          name="user-circle"
          size={30}
          color={"black"}
        />
        <Text
          style={{
            fontSize: 30,
            alignSelf: "center",
            fontWeight: "600",
          }}
        >
          Profile
        </Text>
        <MaterialIcons
          style={[styles.icons, { right: 0, position: "absolute" }]}
          name="keyboard-arrow-right"
          size={30}
          color={"black"}
        />
      </View>

      <View
        style={{
          width: "99%",
          borderBottomColor: "black",
          borderBottomWidth: 2,
          margin: 10,
        }}
      >
        <View
          style={{
            width: "99%",
            flexDirection: "row",
          }}
        >
          <Ionicons
            style={[styles.icons,]}
            name="ios-share-outline"
            size={30}
            color={"black"}
          />

          <Text
            style={{
              fontSize: 30,
              alignSelf: "center",
              fontWeight: "600",
            }}
          >
            Share Temporary Location
          </Text>
        </View>
        <View
          style={{
            width: "99%",
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            style={[styles.icons,]}
            name="car-brake-alert"
            size={30}
            color={"black"}
          />

          <Text
            style={{
              fontSize: 30,
              alignSelf: "center",
              fontWeight: "600",
            }}
          >
            Emergency
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "99%",
          flexDirection: "row",
        }}
      >
        <Ionicons
          style={[styles.icons, { paddingLeft: 5 }]}
          name="settings-sharp"
          size={30}
          color={"black"}
        />

        <Text
          style={{
            fontSize: 30,
            alignSelf: "center",
            fontWeight: "600",
          }}
        >
          Settings
        </Text>
        <MaterialIcons
          style={[styles.icons, { right: 0, position: "absolute" }]}
          name="keyboard-arrow-right"
          size={30}
          color={"black"}
        />
      </View>
      <View
        style={{
          bottom: 0,
          position: "absolute",
          marginBottom:'5%',
          borderTopColor:'black',
          borderTopWidth:2,
          width:'99%',
          margin:10
        }}
      >
        <View
          style={{
            width: "99%",
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            style={[styles.icons, { paddingLeft: 5 }]}
            name="frequently-asked-questions"
            size={30}
            color={"black"}
          />

          <Text
            style={{
              fontSize: 30,
              alignSelf: "center",
              fontWeight: "600",
            }}
          >
            FAQ & Support
          </Text>
        </View>
        <View
          style={{
            width: "99%",
            flexDirection: "row",
          }}
        >
          <MaterialCommunityIcons
            style={[styles.icons, { paddingLeft: 5 }]}
            name="thought-bubble"
            size={30}
            color={"black"}
          />

          <Text
            style={{
              fontSize: 30,
              alignSelf: "center",
              fontWeight: "600",
            }}
          >
            Feeback & suggestions
          </Text>
        </View>
        <View
          style={{
            width: "99%",
            flexDirection: "row",
          }}
        >
          <MaterialIcons
            style={[styles.icons, { paddingLeft: 5 }]}
            name="logout"
            size={30}
            color={"black"}
          />

          <Text
            style={{
              fontSize: 30,
              alignSelf: "center",
              fontWeight: "600",
            }}
          >
            Logout
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: "100%",
  },
  icons: {
    margin: 10,
  },
});
export default MenuScreen;
