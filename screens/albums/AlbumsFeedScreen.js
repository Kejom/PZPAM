import { Text, View, FlatList } from "react-native";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAlbums } from "../../redux/albums";
import { getAlbums } from "../../clients/jsonPlaceholderClient";

export default function AlbumsFeedScreen(){
    const albums = useSelector(state => state.albums.albumsData);
    const dispatch = useDispatch();

    useEffect(() => {
        async function initAlbums(){
            if(albums.length !== 0)
                return;
            newAlbums = await getAlbums();
            console.log(albums.length)
            dispatch(setAlbums(newAlbums));
        }
        console.log("album useEffect")
        initAlbums();
    }, [])

    return (
        <View>
            <FlatList data={albums} keyExtractor={item => item.id} renderItem={({item}) => <Text>{item.title}</Text>}/></View>
    )
}