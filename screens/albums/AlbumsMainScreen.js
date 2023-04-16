import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { GlobalStyles } from "../../constants/style";
import AlbumsFeedScreen from "./AlbumsFeedScreen";
import AlbumDetailsScreen from "./AlbumDetailsScreen";
import PhotoDetailsScreen from "./PhotoDetailsScreen";
import StackNavigation from "../../components/shared/StackNavigation";

const screens = [{
    name: 'Albums',
    component: AlbumsFeedScreen,
    options: {
        title: 'Lista Albumów'
    }
},
{
    name: 'AlbumDetails',
    component: AlbumDetailsScreen,
    options: {
        presentation: 'modal'
    }
},
{
    name: 'PhotoDetails',
    component: PhotoDetailsScreen,
    options: {
        presentation: 'modal'
    }
}]

export default function AlbumsMainScreen(){
    return  <StackNavigation screens={screens}/>
}

const styles = StyleSheet.create({

})