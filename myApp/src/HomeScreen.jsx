import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, FlatList, Button } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import LinearGradient from 'react-native-linear-gradient';
import ProductCard from './ProductCard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Categories = ['Trending Now', 'All', 'New', 'Men', 'Women'];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch('http://192.168.18.56:3000/products', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
          },
        });
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);// similar
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const renderItem = ({ item }) => (
    <ProductCard product={item} onPress={() => navigation.navigate('ProductDetails', { product: item })} />
  );

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <Text style={styles.matchText}>Match Your Style</Text>

      <View style={styles.inputContainer}>
        <Fontisto name="search" size={26} color="black" style={styles.iconContainer} />
        <TextInput
          style={styles.textInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {Categories.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ))}
      </ScrollView>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}// product card se display render item
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.footerButtonContainer}>
            <Button
              title="Add New Product"
              onPress={() => navigation.navigate('ProductForm')}
              color="#E55B5B" // pink color
            />
          </View>

        }
      />
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
    marginBottom: 5,
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
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginVertical: 5,
    height: 50,
  },
  categoryItem: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productGrid: {
    marginTop: 10,
    paddingBottom: 20,
  },
  footerButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
});
