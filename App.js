import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { GlobalColors } from './constants/colors';
import MainScreen from './screens/MainScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import PostsScreen from './screens/PostsScreen';

const Tab = createBottomTabNavigator();

function tabScreenOptions({navigation}) {
  return {
    headerShown: false,
    tabBarStyle: {
      backgroundColor: GlobalColors.primaryDark
    },
    tabBarActiveTintColor: GlobalColors.greyLight,
    tabBarInactiveTintColor: GlobalColors.greyDark
  }
}

const Tabs = [
  {
    name: 'MainScreen',
    component: MainScreen,
    options: {
      title: 'Main Feed',
      tabBarLabel: 'Strona Główna',
      tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
    }
  },
  {
    name: 'UserProfile',
    component: UserProfileScreen,
    options: {
      title: 'User Profile',
      tabBarLabel: 'Profil',
      tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />
    }
  },
  {
    name: 'Posts',
    component: PostsScreen,
    options: {
      title: 'Wpisy',
      tabBarLabel: 'Wpisy',
      tabBarIcon: ({ color, size }) => <Ionicons name="md-chatbox" color={color} size={size} />
    }
  }
]

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Tab.Navigator screenOptions={tabScreenOptions}>
          {Tabs.map(screen => <Tab.Screen key={screen.name} {...screen}/>)}
        </Tab.Navigator>
      </NavigationContainer>

    </>
  );
}

const styles = StyleSheet.create({

});
