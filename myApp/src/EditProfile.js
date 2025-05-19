import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext'; // adjust path if needed

const EditProfile = ({ navigation }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const { authorizedFetch } = useContext(AuthContext);  // get authorizedFetch

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          setId(userData.id);
          setName(userData.name);
          setContact(userData.contact);
          setPassword(userData.password);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };
    getUserData();
  }, []);

  const handleSaveChanges = async () => {
    const updatedData = { name, contact, password };

    try {
      const response = await authorizedFetch(`http://192.168.18.56:3000/update-profile?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),//body me updated data JSON string banakar bheja.
      });

      const data = await response.json();

      if (response.ok) {
        // Update AsyncStorage with new user data
        await AsyncStorage.setItem('user', JSON.stringify({ ...data, name, contact, password }));
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'Could not update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Could not update profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>EDIT PROFILE</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Contact" value={contact} onChangeText={setContact} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} color="#ff5c5c" />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: { height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 20, paddingLeft: 10, borderRadius: 5 },
});

export default EditProfile;
