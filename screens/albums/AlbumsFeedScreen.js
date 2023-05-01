import { View, FlatList, TextInput } from "react-native";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initAlbums } from "../../redux/albums";
import { GlobalStyles } from "../../constants/style";
import LoadingOverlay from "../../components/shared/LoadingOverlay";
import AlbumGridTile from "../../components/albums/AlbumGridTile";
import IconButton from "../../components/shared/IconButton";
import AddAlbumModal from "../../components/albums/AddAlbumModal";
import SearchInput from "../../components/shared/SearchInput";

export default function AlbumsFeedScreen({ navigation }) {
    let albums = useSelector(state => state.albums.data);
    let users = useSelector(state => state.users.data);
    const [showLoading, setShowLoading] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        navigation.setOptions({
            headerRight: (params) => <IconButton icon="add-circle-outline" size={30} color='white' onPress={() => setShowAddModal(!showAddModal)} />
        })
    }, [])

    function applySearchFilter(){
        const lowerCaseSearchText = searchText.toLowerCase();
        const userIds = users.filter(u => u.username.toLowerCase().includes(lowerCaseSearchText)).map(u => u.id);
        albums = albums.filter(a => a.title.toLowerCase().includes(lowerCaseSearchText) || userIds.includes(a.userId));
    }

    if(searchText.length > 3)
        applySearchFilter();



    if (showLoading)
        return <LoadingOverlay />

    return (
        <View style={GlobalStyles.defaultContainer}>
            <SearchInput value={searchText} onValueChange={setSearchText}/>
            <FlatList
                data={albums}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <AlbumGridTile {...item} />}
                numColumns={2} />
            <AddAlbumModal isVisible={showAddModal} onClose={() => setShowAddModal(false)}/>
        </View>
    )
}