

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // use FontAwesome (not FontAwesome6)

import HomeScreen from './src/HomeScreen';
import LoginScreen from './src/Login';

const Tab = createBottomTabNavigator();

function DummyScreen() {
  return null;
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#E96E6E',
        }}
      >
      <Tab.Screen
                name="ACCOUNT"
                component={LoginScreen}
                options={{
                  tabBarIcon: ({ size, color }) => (
                    <FontAwesome name="user" size={size} color={color} />
                  ),
                }}
              />

              <Tab.Screen
                      name="HOME"
                         component={HomeScreen}
                                options={{
                                  tabBarIcon: ({ size, color }) => (
                                    <Entypo name="home" size={size} color={color} />
                                  ),
                                }}
                              />



           <Tab.Screen
          name="RECORDER"
          component={DummyScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialIcons name="fiber-manual-record" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="CART"
          component={DummyScreen}
          options={{
            tabBarIcon: ({ size, color }) => (
              <MaterialCommunityIcons name="cart" size={size} color={color} />
            ),
          }}
        />





      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
