import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialScreen = ({ navigation }) => {
  useEffect(() => {
    const checkAccountStatus = async () => {
      try {
        const accountExists = await AsyncStorage.getItem('account');
        if (accountExists) {
          // If account exists, go to Login
          navigation.navigate('Login');
        } else {
          // If no account, go to Signup
          navigation.navigate('Signup');
        }
      } catch (e) {
        // If error occurs, go to Signup
        navigation.navigate('Signup');
      }
    };

    checkAccountStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InitialScreen;
