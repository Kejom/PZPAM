import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { GlobalColors } from '../constants/colors';
import UnauthorizedScreen from './unauthorized/UnauthorizedScreen';
import AlbumsMainScreen from './albums/AlbumsMainScreen';
import UserProfileScreen from './UserProfileScreen';
import PostFeedScreen from './posts/PostsFeedScreen';
import { useEffect} from 'react';
import { initAlbums } from '../redux/albums';
import { initPhotos } from '../redux/photos';
import { initPosts } from '../redux/posts';
import { initComments } from '../redux/comments';
import LoadingOverlay from '../components/shared/LoadingOverlay';
import { Pressable, Text } from 'react-native';
import { logoutUser} from '../redux/users';
import { View } from 'react-native';

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

function LogOutComponent(){
    return null;
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
        component: PostFeedScreen,
        options: {
            title: 'Lista Wpisów',
            tabBarLabel: 'Wpisy',
            headerShown: true,
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
    const showLoading = useSelector(state => state.appState.showLoading);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(initPhotos());
        dispatch(initAlbums());
        dispatch(initPosts());
        dispatch(initComments());
    }, [])

    if (showLoading)
        return <LoadingOverlay />

    let body = (
        <Tab.Navigator screenOptions={tabScreenOptions}>
            {tabs.map(screen => <Tab.Screen key={screen.name} {...screen} />)}
            <Tab.Screen
                    name='Logout'
                    component={LogOutComponent}
                    options={{
                        title: 'Wyloguj',
                        tabBarButton: () => <View style={{paddingHorizontal: 16}}>
                            <Pressable onPress={() => dispatch(logoutUser())}>
                            <Ionicons name='log-out-outline' color={GlobalColors.primaryLight} size={30}/>
                            <Text style={{color: GlobalColors.primaryLight, fontSize: 10}}>Wyloguj</Text>
                            </Pressable>
                            </View>
                    }}/>
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