import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Category = ({ item, SelectedCategory, setSelectedCategory }) => {
  return (
    <View>
      <Text
        style={[
          styles.CategoryText,
          SelectedCategory === item ? styles.selectedCategory : null,
        ]}
      >
        {item}
      </Text>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  CategoryText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#E96E6E",
    padding: 20,
    textAlign: "center",
    borderRadius: 16,
  },
  selectedCategory: {
    backgroundColor: "#D64D4D",
  },
});
