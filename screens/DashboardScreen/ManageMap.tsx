import {
  View,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef, memo, useContext } from "react";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import {
  add_AMPM_With_Date,
  convertDateIn_DDMMYYYY_Format,
  getCurrentLocation,
} from "../../core/utils/helper";
import imagePath from "../../core/utils/constants";
import { GOOGLE_API_KEY } from "../../core/utils/constants";
import { styles } from "./style";
import { db } from "../../firebaseConfig";
import { ref, set } from "firebase/database";
import { AppSettingsContext, FirebaseLocationContext } from "../../App";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constants";

// --------------------------------------------------------------------------------------------------------
const ManageMap = ({ navigation }: any) => {
  const firebaseLocationContextData: any = useContext(FirebaseLocationContext);

  // -------------------------------------------------------------------------------------------------------
  // Fetching Current User Id
  const userSettings: any = useContext(AppSettingsContext);
  const [userId, setUserId] = useState<any>(null);

  useEffect(() => {
    if (userSettings?.loggedInUserId) setUserId(userSettings?.loggedInUserId);
  }, [userSettings?.loggedInUserId]);

  // -------------------------------------------------------------------------------------------------------
  type locationTypes = {
    latitude: number;
    longitude: number;
    timestamp: number;
  };

  const screen = Dimensions.get("window");
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.04;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const mapRef: any = useRef();
  const markerRef: any = useRef();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
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
  const [locationData, setLocationData] = useState<any>([]); // Used to store user's location data
  const [individualLocationObj, setIndividualLocationObj] = useState<any>({
    startingTime: "",
    tenMinutesLocationData: [],
  });
  const [timeLeft, setTimeLeft] = useState<any>(600); // 600 seconds => 10 minutes

  const updateState = (data: any) =>
    setState((state: any) => ({ ...state, ...data }));

  const handleZoomOut = () => {
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  };

  // ==========================================================================================
  const getLiveLocation = async (time: any) => {
    getCurrentLocation()
      .then((locationResponse: locationTypes | any) => {
        const { latitude, longitude, timestamp, geolocationAddress } =
          locationResponse;

        // Formatted Location Data for Firebase
        const formattedData = {
          latitude: latitude,
          longitude: longitude,
          datetime: new Date(timestamp),
          address: geolocationAddress,
        };

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

        if (time === 600) {
          sendUsersLiveLocation(formattedData);
        }

        setIndividualLocationObj({
          ...individualLocationObj,
          startingTime:
            individualLocationObj.tenMinutesLocationData.length == 0
              ? formattedData.datetime
              : individualLocationObj?.tenMinutesLocationData[0]?.datetime,
          tenMinutesLocationData: [
            ...individualLocationObj.tenMinutesLocationData,
            formattedData,
          ],
        });
      })
      .catch((err) => {
        setErrorMsg(err);
      });
  };

  // This method is used to save 10-10 minutes location data (100 Location objects - 1 object in 6 second) to Firebase Realtime Database.
  const addLocationsObjectsToFirebase = async (locData: any) => {
    let finalData: any = {};
    const updatedLocationData = {
      ...locData,
      startingTime: add_AMPM_With_Date(new Date(locData?.startingTime)),
    };
    if (
      Array.isArray(updatedLocationData?.tenMinutesLocationData) &&
      updatedLocationData?.tenMinutesLocationData.length > 0
    ) {
      const updatedData = updatedLocationData?.tenMinutesLocationData.map(
        (item: any) => {
          return {
            ...item,
            datetime: add_AMPM_With_Date(new Date(item?.datetime)),
          };
        }
      );
      finalData = {
        ...updatedLocationData,
        tenMinutesLocationData: updatedData,
      };
    }

    if (finalData.startingTime && finalData.tenMinutesLocationData.length > 0) {
      const selectedDate = convertDateIn_DDMMYYYY_Format(new Date());
      try {
        await set(
          ref(
            db,
            `users/${userId}/location/${selectedDate}/${finalData.startingTime}`
          ),
          finalData.tenMinutesLocationData
        );
      } catch (error: any) {
        console.log(
          "Getting an error while saving location data to firebase: ",
          error
        );
      }
    }
  };

  useEffect((): any => {
    if (userId) {
      if (timeLeft === 0) {
        console.log("TIME LEFT IS 0");
        setTimeLeft(null);
      }
      if (!timeLeft) return;

      const interval = setInterval(() => {
        getLiveLocation(timeLeft); // Fetching User's Location in every 6 seconds
        setTimeLeft(timeLeft - 6);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [locationData, userId]);

  useEffect(() => {
    if (individualLocationObj) {
      setLocationData([...locationData, individualLocationObj]);
      console.log(
        "individualLocationObj::: ",
        individualLocationObj?.tenMinutesLocationData?.length
      );
    }
  }, [individualLocationObj]);

  useEffect(() => {
    if (
      timeLeft === 0 &&
      individualLocationObj?.tenMinutesLocationData.length == 100 &&
      userId
    ) {
      addLocationsObjectsToFirebase(individualLocationObj);
      setTimeLeft(600);
      setIndividualLocationObj({
        startingTime: "",
        tenMinutesLocationData: [],
      });
    }
  }, [timeLeft, individualLocationObj, userId]);

  // This method is used to send users live location to App.tsx component
  const sendUsersLiveLocation = (data: any) => {
    firebaseLocationContextData?.liveLocationData(data);
  };

  // ==========================================================================================

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

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;

  useEffect(() => {
    if (!curLoc && !destinationCords) return;
    handleZoomOut();
  }, [curLoc, destinationCords]);

  return (
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
          <View style={{ height: 70 }}>
            <FontAwesome
              name="map-marker"
              size={60}
              color={COLORS.voilet}
              style={{ backgroundColor: "transparent", marginTop: 0 }}
            />
            <Text
              style={{
                marginTop: -50,
                alignSelf: "center",
                textAlignVertical: "top",
              }}
            >
              Y
            </Text>
          </View>
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
              // console.log(
              //   `Started routing between "${params.origin}" and "${params.destination}"`
              // );
            }}
            onReady={(result) => {
              // console.log(`Distance: ${result.distance} km`);
              // console.log(`Duration: ${result.duration} min.`);
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                },
              });
            }}
            onError={(errorMessage: any) => {
              // console.log("GOT AN ERROR: ", errorMessage);
            }}
          />
        )}
      </MapView>
    </View>
  );
};
export default memo(ManageMap);
// ----------------------------------------- THE END --------------------------------------------
