import { Ionicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { GlobalColors } from '../constants/colors';
import UnauthorizedScreen from './unauthorized/UnauthorizedScreen';
import AlbumsMainScreen from './albums/AlbumsMainScreen';
import UserProfileScreen from './UserProfileScreen';
import PostsScreen from './posts/PostsScreen';
import { useEffect } from 'react';

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
        tabBarInactiveTintColor: GlobalColors.primaryLight,
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
            title: 'Profil Użytkownika',
            tabBarLabel: 'Profil',
            headerShown: true,
            tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />
        }
    }
]

export default function MainNavigation() {
    const currentUserId = useSelector(state => state.users.loggedUserId);

    let body = (
        <Tab.Navigator screenOptions={tabScreenOptions}>
            {tabs.map(screen => <Tab.Screen key={screen.name} {...screen} />)}
        </Tab.Navigator>
    )

    if (!currentUserId)
        body = <UnauthorizedScreen />

    return (
        <NavigationContainer>
            {body}
        </NavigationContainer>
    )
}