// ProductCard.jsx
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProductCard = () => {
  return (
    <View style={styles.cardContainer}>
      {/* Heart Like Button */}
      <View style={styles.likeContainer}>
        <AntDesign name="hearto" size={20} color="#E55B5B" />
      </View>

      {/* Product Image & Details */}
      <Image source={require('./girl.png')} style={styles.coverImage} />
   <Text style={styles.title}>Cute Girl</Text> }
    <Text style={styles.price}>$45.9</Text> }
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%', // Two images per row
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow effect
    position: 'relative', // ✅ Allows absolute positioning inside
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
  likeContainer: {
    height: 34,
    width: 34,
    backgroundColor: '#fff', // ✅ Change this to 'red' to test visibility
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17, // Make it circular
    position: 'absolute', // ✅ Ensures it floats over the card
    top: 10,
    right: 10,
    elevation: 5, // ✅ Add a shadow for better visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
