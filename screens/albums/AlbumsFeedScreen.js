import { View, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initAlbums } from "../../redux/albums";
import { getAlbums } from "../../clients/jsonPlaceholderClient";
import { GlobalStyles } from "../../constants/style";
import LoadingOverlay from "../../components/shared/LoadingOverlay";
import AlbumGridTile from "../../components/albums/AlbumGridTile";
import IconButton from "../../components/shared/IconButton";
import AddAlbumModal from "../../components/albums/AddAlbumModal";

export default function AlbumsFeedScreen({ navigation }) {
    const albums = useSelector(state => state.albums.data);
    const [showLoading, setShowLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const dispatch = useDispatch();

    async function init() {
        if (albums.length)
            return;

        setShowLoading(true);
        await dispatch(initAlbums());
        setShowLoading(false);
    }
    useEffect(() => {
        init();
        navigation.setOptions({
            headerRight: (params) => <IconButton icon="add-circle-outline" size={30} color='white' onPress={() => setShowAddModal(!showAddModal)} />
        })
    }, [])




    if (showLoading)
        return <LoadingOverlay />

    return (
        <View style={GlobalStyles.defaultContainer}>
            <FlatList
                data={albums}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <AlbumGridTile {...item} />}
                numColumns={2} />
            <AddAlbumModal isVisible={showAddModal} onClose={() => setShowAddModal(false)}/>
        </View>
    )
}