import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import Colors from "@/constants/Colors";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
const LocationSearch = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 39.886109,
    longitude: 32.856162,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  return (
    <View
      style={{
        flex: 1,
      }}>
      <GooglePlacesAutocomplete
        fetchDetails
        placeholder="Search or move the map"
        onPress={(data, details = null) => {
          const point = details?.geometry?.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "tr",
        }}
        renderLeftButton={() => {
          return (
            <View style={styles.boxIcon}>
              <Ionicons name="search-outline" size={20} color={Colors.medium} />
            </View>
          );
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.grey,
            paddingLeft: 30,
            borderRadius: 10,
          },
          textInputContainer: {
            padding: 10,
            backgroundColor: "#fff",
          },
        }}
      />
      <MapView showsUserLocation style={styles.map} region={location} />
      <View style={styles.absoluteBox}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  boxIcon: {
    position: "absolute",
    zIndex: 10,
    left: 15,
    top: 22,
  },
});
export default LocationSearch;
