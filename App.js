import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { GlobalColors } from './constants/colors';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AlbumsMainScreen from './screens/albums/AlbumsMainScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import PostsScreen from './screens/posts/PostsScreen';

const Tab = createBottomTabNavigator();

function tabScreenOptions({ navigation }) {
  return {
    headerShown: false,
    headerStyle: { backgroundColor: GlobalColors.primaryDark },
    headerTintColor: GlobalColors.greyLight,
    headerTitleAlign: 'center',
    tabBarStyle: {
      backgroundColor: GlobalColors.primaryDark
    },
    tabBarActiveTintColor: GlobalColors.greyLight,
    tabBarInactiveTintColor: GlobalColors.primaryLight
  }
}

const tabs = [
  {
    name: 'AlbumsScreen',
    component: AlbumsMainScreen,
    options: {
      title: 'Albums Feed',
      tabBarLabel: 'Albumy i Zdjęcia',
      tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />
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
  },
  {
    name: 'UserProfile',
    component: UserProfileScreen,
    options: {
      title: 'User Profile',
      tabBarLabel: 'Profil',
      headerShown: true,
      tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />
    }
  }
]

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator screenOptions={tabScreenOptions}>
            {tabs.map(screen => <Tab.Screen key={screen.name} {...screen} />)}
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({

});
