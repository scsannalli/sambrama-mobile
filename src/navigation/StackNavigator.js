// Example using createNativeStackNavigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './src/screens/HomePage';
import VenuesPage from './src/screens/VenuesPage'; // if you have this

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="Venues" component={VenuesPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}