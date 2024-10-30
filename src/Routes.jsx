import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import GetStarted from './screens/GetStarted';
import Login from './screens/Login';
import Home from './screens/Home';
import ProductDetails from './screens/ProductDetails';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();
function HomeTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
function AppStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Get Started" component={GetStarted} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home Tabs" component={HomeTabNavigator} />
      <Stack.Screen name="Product Details" component={ProductDetails} />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
}