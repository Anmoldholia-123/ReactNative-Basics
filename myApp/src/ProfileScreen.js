import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState('');

  const { authorizedFetch } = useContext(AuthContext); // Secure fetch from context

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        setId(user.id);

        if (!user?.id) {
          console.error('User ID not found');
          setLoading(false);
          return;
        }

        const response = await authorizedFetch(`http://192.168.18.56:3000/user-profile?id=${user.id}`);
        const data = await response.json();

        if (data && data.name && data.email) {
          setProfileData(data);
        } else {
          console.error('Invalid profile data');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { email: profileData.email });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteAccount() },
      ],
      { cancelable: false }
    );
  };

  const deleteAccount = async () => {
    try {
      const response = await authorizedFetch(`http://192.168.18.56:3000/delete-user?id=${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.message === 'User deleted successfully') {
        Alert.alert('Success', 'Your account has been deleted');
        navigation.navigate('Signup');
      } else {
        Alert.alert('Error', 'Unable to delete account');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      Alert.alert('Error', 'An error occurred while deleting your account');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!profileData) {
    return (
      <View style={styles.container}>
        <Text>Error loading profile</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#007BFF', '#9D50BB']} style={styles.container}>
      <Text style={styles.heading}>PROFILE SCREEN</Text>
      <Text style={styles.label}>Name: {profileData.name}</Text>
      <Text style={styles.label}>Email: {profileData.email}</Text>
      <Text style={styles.label}>Contact: {profileData.contact}</Text>
      <Text style={styles.label}>Password: {profileData.password}</Text>

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    color: '#fff',
  },
  button: {
    backgroundColor: '#ff4d4d',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
