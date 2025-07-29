import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/screens/HomePage';
import VenuesPage from './src/screens/VenuesPage';
import VenueDetails from './src/screens/VenueDetails';
import VenueBookingPage from './src/screens/VenueBookingPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Venues" component={VenuesPage} />
        <Stack.Screen name="VenueDetails" component={VenueDetails} />
        <Stack.Screen name="VenueBookingPage" component={VenueBookingPage} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
