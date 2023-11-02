import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  ListRenderItem,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { useNavigation } from "expo-router";
import categories from "@/assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Category[]>(categories);
  const [selected, setSelected] = useState<Category[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);
  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;
    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }
    setSelected(selectedItems);
  }, [items]);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });
  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updatedItems);
  };
  const renderItem: ListRenderItem<Category> = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.itemText}>
          {item.name} ({item.count})
        </Text>
        <BouncyCheckbox
          disableBuiltInState
          size={25}
          fillColor={Colors.primary}
          unfillColor="#FFFFFF"
          iconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
          innerIconStyle={{ borderWidth: 2, borderRadius: 4 }}
          textStyle={{ fontFamily: "JosefinSans-Regular" }}
          onPress={() => {
            const isChecked = items[index].checked;
            const updatedItems = items.map((item) => {
              if (item.name == items[index].name) {
                item.checked = !isChecked;
              }
              return item;
            });
            setItems(updatedItems);
          }}
          isChecked={items[index].checked}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox />}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ height: 80 }} />
      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Animated.View style={[styles.outlineButton, animatedStyle]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Animated.Text style={[styles.outlineButtonTitle, animatedText]}>
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.doneTitle}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const ItemBox = () => {
  return (
    <>
      <View style={styles.itemContainer}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Sort</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Hygiene Rating</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Offers</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Dietary</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Categories</Text>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    padding: 24,
  },
  footer: {
    paddingHorizontal: 50,

    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    height: 100,
    shadowColor: "black",
    elevation: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  doneButton: {
    flex: 1,
    height: 60,
    backgroundColor: Colors.primary,
    padding: 10,

    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  doneTitle: {
    color: Colors.lightGrey,
    fontSize: 20,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.grey,
  },
  itemText: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  outlineButton: {
    height: 60,

    borderRadius: 10,
    borderColor: Colors.primary,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonTitle: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Filter;
