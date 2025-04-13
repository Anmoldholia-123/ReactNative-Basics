import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import ProductCard from './ProductCard';
import AntDesign from 'react-native-vector-icons/AntDesign'; // ✅ Fixed import syntax

const Categories = ['Trending Now', 'All', 'New', 'Men', 'Women'];

const HomeScreen = () => {
  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <Text style={styles.matchText}>Match Your Style</Text>

      {/* Search Bar */}
      <View style={styles.inputContainer}>
        <Fontisto name="search" size={26} color="black" style={styles.iconContainer} />
        <TextInput style={styles.textInput} placeholder="Search" />
      </View>

      {/* Categories Navbar (Single Row) */}
      <View style={styles.categoriesContainer}>
        {Categories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ))}
      </View>

      {/* Two Rows of Product Cards */}
      <View style={styles.productGrid}>
        <View style={styles.productRow}>
          <ProductCard />
          <ProductCard />
        </View>
        <View style={styles.productRow}>
          <ProductCard />
          <ProductCard />
        </View>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  matchText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  iconContainer: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  categoryItem: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productGrid: {
    marginTop: 20,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
