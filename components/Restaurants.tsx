import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { restaurants } from "@/assets/data/home";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
const Restaurants = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}>
      {restaurants.map((rest, index) => {
        return (
          <Link href={"/details"} asChild key={index}>
            <TouchableOpacity>
              <View style={styles.restaurantCard}>
                <Image
                  source={rest.img}
                  style={styles.img}
                  resizeMode="contain"
                />
                <View style={styles.restaurantBox}>
                  <Text style={styles.restaurantText}>{rest.name}</Text>
                  <Text style={{ color: Colors.green }}>
                    {rest.rating} {rest.ratings}
                  </Text>
                  <Text style={{ color: Colors.medium }}>{rest.distance}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  restaurantCard: {
    width: 300,
    height: 250,
    backgroundColor: "#fff",
    marginRight: 10,
    borderRadius: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 0.5,
  },
  restaurantBox: {
    flex: 3,
    padding: 10,
  },
  restaurantText: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  img: {
    flex: 5,
    width: undefined,
    height: undefined,
  },
});
export default Restaurants;
