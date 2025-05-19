import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  const handleDetailsPress = () => {
    navigation.navigate('ProductDetails', { product });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.likeContainer}>
        <AntDesign name="hearto" size={20} color="#E55B5B" />
      </View>

      <Image source={{ uri: product.imageUrl }} style={styles.coverImage} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description} numberOfLines={2}>{product.description}</Text>

      <View style={styles.detailsButton}>
        <Button title="Details" onPress={handleDetailsPress} color="#E55B5B" />
      </View>

    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  coverImage: {
    height: 150,
    width: '100%',
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#777',
    marginTop: 5,
  },
  description: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  likeContainer: {
    height: 34,
    width: 34,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    position: 'absolute',
    top: 10,
    right: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  detailsButton: {
    marginTop: 10,
    width: '100%',
  },
});
