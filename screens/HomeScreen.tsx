import tw from "twrnc";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Pressable,
  NativeModules,
  Animated,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { getCurrentLocation } from "../core/utils/helper";
import imagePath from "../core/utils/constants";
import { GOOGLE_API_KEY } from "../core/utils/constants";
import Otp from "./Login";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { animated, useSpring } from "@react-spring/native";

type locationTypes = {
  latitude: number;
  longitude: number;
};

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const HomeScreen = ({ navigation }: any) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const mapRef: any = useRef();
  const markerRef: any = useRef();
  const [drop, setDrop] = useState(false);
  const onPressDropDownBtn = () => {
    setDrop(!drop);
    setOnUp(false);
  };

  const redirectToAddGroupScreen = () => {
    navigation.navigate("AddGroup");
  };

  const [onUp, setOnUp] = useState(false);

  const onPressUpBtn = () => {
    setOnUp(!onUp);
  };

  const customStyle2 = onUp ? styles.expand : styles.collapse;
  const customStyle = drop ? styles.dropDownEnabled : styles.dropDownDisabled;

  const [state, setState] = useState<any>({
    curLoc: {
      latitude: 30.7333,
      longitude: 76.7794,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7333,
      longitude: 76.7794,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;

  const updateState = (data: any) =>
    setState((state: any) => ({ ...state, ...data }));
  useEffect(() => {
    if (!curLoc && !destinationCords) return;
    handleZoomOut();
  }, [curLoc, destinationCords]);

  const handleZoomOut = () => {
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  };

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    getCurrentLocation()
      .then((success: locationTypes | any) => {
        const { latitude, longitude } = success;
        console.log("get live location after 6 second");
        animate(latitude, longitude);
        updateState({
          heading: heading,
          curLoc: { latitude, longitude },
          coordinate: new AnimatedRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }),
        });
      })
      .catch((err) => {
        setErrorMsg(err);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const onPressLocation = () => {
    navigation.navigate("SelectLocation", { getCordinates: fetchValue });
  };

  const fetchValue = (data: any) => {
    console.log("***************************");
    console.log("this is data", data);
    console.log("***************************");
    updateState({
      destinationCords: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  };

  const animate = (latitude: number, longitude: number) => {
    const newCoordinate: any = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef?.current) {
        markerRef?.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  function renderGroups(){
    return(
      <Pressable style={styles.groupListItem}>
        <View>
          <Text style={styles.groupListItemName}>
            Group Name
          </Text>
          <Text  style={styles.groupListItemCode}>
            Group Code
          </Text>
        </View>
        <View style={styles.groupListItemType}>
          <Text style={{
            color:'white',
            fontWeight:'700'
          }}>
          Group Type
        </Text>
        </View>
        
      </Pressable>
    );

    
  }

  function renderMembers(){
    return(
      <Pressable style={styles.memberListItem}>
        <View style={styles.memberListItemImage}>
          <Ionicons name="person-sharp" size={20} color={COLORS.voilet}/>
        </View>
        <View>
          <Text style={styles.memberListItemName}>
            Username
          </Text>
          <Text  style={styles.memberListItemCode}>
            Location
          </Text>
          <Text  style={styles.memberListItemCode}>
            Location line
          </Text>
        </View>
        <View style={styles.memberListItemType}>
          <Text style={{
            color:'black',
            fontWeight:'700'
          }}>
          07th Feb {'\n'}05:16 pm
        </Text>
        </View>
        
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.homeWrapper}>
      <View style={styles.mapBox}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <Marker.Animated
            ref={markerRef}
            identifier={"origin"}
            coordinate={coordinate}
          >
            <Image
              source={imagePath.originMarker}
              style={{
                width: 40,
                height: 40,
                // transform: [{rotate: `${heading}deg`}]
              }}
              resizeMode="contain"
            />
          </Marker.Animated>

          {Object.keys(destinationCords).length > 0 && (
            <Marker
              identifier="destination"
              coordinate={destinationCords}
              image={imagePath.destinationMarker}
            />
          )}

          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={GOOGLE_API_KEY}
              strokeWidth={6}
              strokeColor="black"
              optimizeWaypoints={true}
              onStart={(params) => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`
                );
              }}
              onReady={(result) => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 30,
                    bottom: 300,
                    left: 30,
                    top: 100,
                  },
                });
              }}
              onError={(errorMessage) => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>

        {/* ___________________button for taking location and dropping path on the map____________________  */}
        {/* <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
          onPress={onCenter}
        >
          <Image source={imagePath.centerBtn} />
        </TouchableOpacity> */}
      </View>
      {/* Top group list drop down button */}
      <Pressable
        style={styles.groupListDropDownBtn}
        onPress={onPressDropDownBtn}
      >
        <Text>Group Name</Text>
        <MaterialIcons name="keyboard-arrow-down" size={20} />
      </Pressable>
      {/* Drop Down Group List */}
      <View
        style={[
          styles.groupListDropDown,
          customStyle,
          { paddingTop: SIZES.height > 700 ? "10%" : "20%" },
        ]}
      >
        <ScrollView
          style={{
            width:"100%",
            margin: "2%",
            marginBottom: SIZES.height > 700 ? "12%" : "17%",
          }}
        >
          {renderGroups()}
        </ScrollView>

        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            bottom: "10%",
            position: "absolute",
            padding: "2%",
          }}
        >
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.25,
              height: "auto",
              borderRadius: 30,
              backgroundColor: "#705ECF",
              padding: 4,
            }}
            onPress={redirectToAddGroupScreen}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: SIZES.width > 400 ? 20 : 12,
                color: "white",
                alignSelf: "center",
              }}
            >
              New Group
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.25,
              height: "auto",
              borderRadius: 30,
              backgroundColor: "#705ECF",
              padding: 4,
            }}
            onPress={redirectToAddGroupScreen}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: SIZES.width > 400 ? 20 : 12,
                color: "white",
                alignSelf: "center",
              }}
            >
              Join Group
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.25,
              height: "auto",
              borderRadius: 30,
              backgroundColor: "#705ECF",
              padding: 4,
            }}
            // onPress={redirectToAddGroupScreen}
          >
            <Text
              style={{
                fontWeight: "400",
                fontSize: SIZES.width > 400 ? 20 : 12,
                color: "white",
                alignSelf: "center",
              }}
            >
              Invite Group
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            bottom: "2%",
            position: "absolute",
            width: "8%",
            height: "auto",
            backgroundColor: "rgba(0,0,0,.2)",
            alignSelf: "center",
            borderRadius: 30,
          }}
          onPress={onPressDropDownBtn}
        >
          <MaterialIcons name="keyboard-arrow-up" size={20} />
        </TouchableOpacity>
      </View>

      {/* ______________view having location mapping button________________ */}
      {/* <View
        style={[
          // styles.buttonBox,
          tw`justify-center`,
        ]}
      >
        <TouchableOpacity onPress={onPressLocation}>
          <Text
            style={tw`bg-black text-white w-64 p-4 mx-auto text-center text-lg`}
          >
            Enter Location
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* Bottom users View  */}
      <View
        style={[
          styles.memberList,
          customStyle2,
          {
            paddingBottom: SIZES.height > 700 ? "3%" : "1%",
            justifyContent: "center",
          },
        ]}
      >
        <TouchableOpacity
          style={{
            top: "2%",
            position: "absolute",
            width: "8%",
            height: "auto",
            backgroundColor: "rgba(0,0,0,.2)",
            alignSelf: "center",
            borderRadius: 30,
          }}
          onPress={onPressUpBtn}
        >
          <MaterialIcons
            name={onUp ? "keyboard-arrow-down" : "keyboard-arrow-up"}
            size={20}
          />
        </TouchableOpacity>
        <ScrollView
          style={{
            height: "70%",
          }}
        >
          {renderMembers()}
        </ScrollView>
        <Pressable
          style={{
            width: SIZES.width * 0.06,
            height: SIZES.width * 0.06,
            backgroundColor: "white",
            alignSelf: "center",
            shadowColor: "black",
            shadowOpacity: 0.4,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            elevation: 5,
            shadowRadius: 5,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            size={40}
            name="add"
            color={COLORS.voilet}
            // onPress={newGroup}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeWrapper: {
    flex: 1,
  },
  mapBox: {
    flex: 1,
  },
  memberListItem:{
    alignItems:'center',
    height:'auto',
    flexDirection:'row',
    borderBottomWidth:1,
    borderTopWidth:1,
    padding:'2%'
  },
  memberListItemImage:{
    backgroundColor:'white',
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    elevation: 5,
    shadowRadius: 5,
    padding:'1%',
    marginRight:10,
    marginLeft:0,
    borderRadius:20
  },
  memberListItemName:{
    fontSize:20,
  },
  memberListItemCode:{
    fontSize:15,
    color:'grey'
  },
  memberListItemType:{
    borderRadius:10,
    width:'auto',
    height:'auto',
    padding:5,
    alignContent:'center',
    justifyContent:'center',
    fontWeight:'700',
    fontSize:15,
    right:'1%',
    position:'absolute',
  },
  memberList: {
    bottom: 0,
    position: "absolute",
    backgroundColor: "white",
    width: SIZES.width,
    zIndex: 0,
    padding: 30,
    borderTopLeftRadius: SIZES.width > 350 ? 40 : 20,
    borderTopRightRadius: SIZES.width > 350 ? 40 : 20,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    elevation: 5,
    shadowRadius: 5,
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
  groupListItem:{
    alignItems:'center',
    height:'auto',
    flexDirection:'row',
    borderBottomWidth:1,
    borderTopWidth:1,
    padding:'2%'
  },
  groupListItemName:{
    fontSize:20,
  },
  groupListItemCode:{
    fontSize:15,
    color:'grey'
  },
  groupListItemType:{
    backgroundColor:'green',
    borderRadius:10,
    width:'auto',
    height:'auto',
    padding:5,
    alignContent:'center',
    justifyContent:'center',
    fontWeight:'700',
    fontSize:15,
    right:'1%',
    position:'absolute',
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
    justifyContent:'center',
    alignItems:'center'
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
    height: SIZES.height * 0.8,
  },
  collapse: {
    height: SIZES.height * 0.3,
  },
});

export default HomeScreen;
