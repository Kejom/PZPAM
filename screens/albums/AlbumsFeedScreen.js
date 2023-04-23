import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initAlbums} from "../../redux/albums";
import { getAlbums } from "../../clients/jsonPlaceholderClient";
import { GlobalStyles } from "../../constants/style";
import LoadingOverlay from "../../components/shared/LoadingOverlay";
import AlbumGridTile from "../../components/albums/AlbumGridTile";

export default function AlbumsFeedScreen() {
    const albums = useSelector(state => state.albums.data);
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {

        if(!albums.length)
            dispatch(initAlbums());
    }, [])
    

    if (showLoading)
        return <LoadingOverlay />

    return (
        <View style={GlobalStyles.defaultContainer}>
            <FlatList
                data={albums}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <AlbumGridTile {...item} />}
                numColumns={2} />
        </View>
    )
}