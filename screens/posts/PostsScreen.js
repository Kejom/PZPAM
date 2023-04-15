import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { GlobalStyles } from "../../constants/style";
import PostFeedScreen from "./PostsFeedScreen";
import PostDetailsScreen from "./PostDetailsScreen";
import StackNavigation from "../../components/shared/StackNavigation";

const screens = [{
    name: 'PostsFeed',
    component: PostFeedScreen,
    options: {
        title: 'Lista Wpisów'
    }
},
{
    name: 'PostDetails',
    component: PostDetailsScreen
}
]

export default function PostsScreen(){
    return <StackNavigation screens={screens}/>
}

const styles = StyleSheet.create({

})