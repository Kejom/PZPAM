import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getPhotosByAlbumId } from "../../clients/jsonPlaceholderClient";
import { setPhotos } from "../../redux/photos";
import LoadingOverlay from "../../components/shared/LoadingOverlay";
import PhotoGridTile from "../../components/albums/PhotoGridTile";
import { GlobalStyles } from "../../constants/style";
import { StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/colors";
import { truncate } from "../../util/stringUtil";

export default function AlbumDetailsScreen({ route, navigation }) {
    const dispatch = useDispatch();
    const id = route.params.id;
    const album = useSelector(state => state.albums.data.find(a => a.id === id));

    if (!album)
        navigation.goBack();

    const photos = useSelector(state => state.photos.data.filter(p => p.albumId === id));
    const [showLoading, setShowLoading] = useState(false);


    useEffect(() => {
        async function initPhotos() {
            if (photos.length !== 0)
                return;
            setShowLoading(true);
            let newPhotos = await getPhotosByAlbumId(id);
            dispatch(setPhotos(newPhotos));
            setShowLoading(false);
        }
        navigation.setOptions({
            title: truncate(album.title, 24)
        })
        initPhotos();
    }, [id])

    if (showLoading)
        return <LoadingOverlay />



    return (
        <View style={GlobalStyles.defaultContainer}>
            <View style={styles.listContainer}>
                <FlatList
                    data={photos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <PhotoGridTile {...item} />}
                    numColumns={2} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    albumTitleContainer: {
        margin: 8,
        padding: 8,
        borderRadius: 8,
        backgroundColor: GlobalColors.lemon
    },
    TitleText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalColors.greyDark,
        textAlign: 'center'
    },
    listContainer: {
    }
})