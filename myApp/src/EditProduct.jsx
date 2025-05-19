import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProduct = ({ route, navigation }) => { //route se screen ko parameter milte hain phele screen se bheje gae
  const { product } = route.params;//route parame se product object liya means jo product edit krna hai wo available hai

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [category, setCategory] = useState(product.category);

  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');  // Token fetch karo

      const response = await fetch(`http://192.168.18.56:3000/update-product/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',  // Token header mein add karo
        },
        body: JSON.stringify({// json string me convert krke bheja body me product ka updated data
          name,
          description,
          price,
          category,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Product updated successfully");
        navigation.goBack(); // Go back to previous screen
      } else {
        Alert.alert("Error", "Failed to update product");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update product");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>EDIT PRODUCT</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />

      <Button title="Save Changes" onPress={handleUpdate} color="#E55B5B" />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'stretch',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default EditProduct;
