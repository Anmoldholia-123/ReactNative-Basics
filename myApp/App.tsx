import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { AuthProvider,AuthContext } from './src/AuthContext'; // ✅ Correctly import the provider

// Screens
import Signup from './src/signup';
import Login from './src/Login';
import HomeScreen from './src/HomeScreen';
import SearchScreen from './src/SearchScreen';
import CartScreen from './src/CartScreen';
import ProfileScreen from './src/ProfileScreen';
import EditProfile from './src/EditProfile';
import ProductForm from './src/ProductForm';
import ProductDetails from './src/ProductDetails';
import EditProduct from './src/EditProduct';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNav = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen name="Home" component={HomeScreen} options={{
      tabBarIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />),
    }} />
    <Tab.Screen name="Search" component={SearchScreen} options={{
      tabBarIcon: ({ color, size }) => (<Icon name="search" color={color} size={size} />),
    }} />
    <Tab.Screen name="Cart" component={CartScreen} options={{
      tabBarIcon: ({ color, size }) => (<Icon name="cart" color={color} size={size} />),
    }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{
      tabBarIcon: ({ color, size }) => (<Icon name="person" color={color} size={size} />),
    }} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <AuthProvider> {/* ✅ Must wrap here */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Signup">
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="TabNav" component={TabNav} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ProductForm" component={ProductForm} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="EditProduct" component={EditProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
