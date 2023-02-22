import { View, Image, StyleSheet, Platform, Dimensions } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { getCurrentLocation } from "../../core/utils/helper";
import imagePath from "../../core/utils/constants";
import { GOOGLE_API_KEY } from "../../core/utils/constants";
import { styles } from "./style";

// -----------------------------------------------------------------------------------
const ManageMap = ({ navigation }: any) => {
  type locationTypes = {
    latitude: number;
    longitude: number;
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

  const updateState = (data: any) =>
    setState((state: any) => ({ ...state, ...data }));

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
        // console.log("get live location after 6 second");
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
      // getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
          <Image
            source={imagePath.originMarker}
            style={{
              width: 40,
              height: 40,
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
            onError={(errorMessage: any) => {
              console.log("GOT AN ERROR: ", errorMessage);
            }}
          />
        )}
      </MapView>
    </View>
  );
};
export default ManageMap;
// ----------------------------------------- THE END --------------------------------------------
