import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ActivitiesScreen from './screens/ActivitiesScreen';
import DietScreen from './screens/DietScreen';
import SettingsScreen from './screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AddActivitiesScreen from './screens/AddActivitiesScreen';
import { createStackNavigator } from '@react-navigation/stack';
import AddDietsScreen from './screens/AddDietsScreen';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { useContext } from 'react';
import { colors } from './utils/styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const context = useContext(ThemeContext);
  const { theme } = context;
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Activities') {
            iconName = focused ? 'walk' : 'walk-outline';
          } else if (route.name === 'Diet') {
            iconName = focused ? 'nutrition' : 'nutrition-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarStyle: {
          backgroundColor: theme === 'light' ? colors.light: colors.dark,
        },
        headerStyle: {
          backgroundColor: theme === 'light' ? colors.light: colors.dark,
        },
      })}
    >
      <Tab.Screen name="Activities" component={ActivitiesScreen} />
      <Tab.Screen name="Diet" component={DietScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (

    <NavigationContainer>
      <ThemeProvider>
        <Stack.Navigator>
          <Stack.Screen name=" " component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="AddActivity" component={AddActivitiesScreen} />
          <Stack.Screen name="AddDiet" component={AddDietsScreen} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}