import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import BottomSheet from "./BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const openModal = () => {
    bottomSheetRef.current?.present();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <TouchableOpacity onPress={openModal}>
          <Image
            style={styles.bike}
            source={require("@/assets/images/bike.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
          <Text style={styles.title}>Delivery - Now</Text>
          <View style={styles.locationName}>
            <Text style={styles.subtitle}>Ankara</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.primary} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};
const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchSection}>
        <View style={styles.searchField}>
          <Ionicons name="search" color={Colors.medium} size={20} />
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            multiline={false}
            numberOfLines={1}
            placeholder="Search"
          />
        </View>
        <Link href={"/filter"} asChild>
          <TouchableOpacity>
            <Ionicons
              name="options-outline"
              style={styles.optionButton}
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 20,
  },
  bike: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.medium,
  },
  profileButton: {
    borderRadius: 50,
    backgroundColor: Colors.lightGrey,
    padding: 10,
  },
  locationName: { flexDirection: "row", alignItems: "center" },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    height: 60,
    backgroundColor: "#fff",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.grey,
    flex: 1,
    padding: 10,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
});
export default CustomHeader;
