import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { categories } from "@/assets/data/home";
const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}>
      {categories.map((category, index) => {
        return (
          <View style={styles.categoryCard} key={index}>
            <Image source={category.img} style={styles.img} />
            <Text style={styles.categoryText}>{category.text}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  categoryCard: {
    overflow: "hidden",
    alignItems: "center",
    width: 100,
    height: 100,
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
  img: {},
  categoryText: {
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
  },
});
export default Categories;
