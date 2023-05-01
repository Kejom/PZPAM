import { useEffect, useState } from "react";
import { FlatList, View, ToastAndroid, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../../components/shared/LoadingOverlay";
import PhotoGridTile from "../../components/albums/PhotoGridTile";
import IconButton from "../../components/shared/IconButton";
import Input from "../../components/shared/Input";
import AddPhotoModal from "../../components/albums/AddPhotoModal";
import { GlobalStyles } from "../../constants/style";
import { StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/colors";
import { InitPhotos } from "../../redux/photos";
import { removeAlbum, updateAlbum } from "../../redux/albums";
import { truncate } from "../../util/stringUtil";


export default function AlbumDetailsScreen({ route, navigation }) {
    const dispatch = useDispatch();
    const id = route.params.id;
    const album = useSelector(state => state.albums.data.find(a => a.id === id));

    if (!album)
        navigation.goBack();

    const currentUserId = useSelector(state => state.users.loggedUserId);
    const canEdit = currentUserId === album.userId;

    const photos = useSelector(state => state.photos.data.filter(p => p.albumId === id));
    const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
    const [albumTitle, setAlbumTitle] = useState(album.title);

    function onDeletePress() {
        dispatch(removeAlbum(id));
        navigation.goBack();
    }

    function onUpdatePress() {
        if (albumTitle)
            dispatch(updateAlbum({ ...album, title: albumTitle }));
        else
            ToastAndroid.showWithGravity("Tytuł albumu nie może byc pusty!", ToastAndroid.LONG, ToastAndroid.TOP);
        Keyboard.dismiss();
    }
    useEffect(() => {
        navigation.setOptions({
            title: truncate(album.title, 16),
            headerRight: () => canEdit &&
                <View style={styles.buttonsRow}>
                    <IconButton icon="add-circle-outline" size={30} color='white' onPress={() => setShowAddPhotoModal(true)} />
                    <IconButton icon="trash-outline" size={30} color='white' onPress={onDeletePress} />
                </View>
        })
    }, [id, album])

    return (
        <View style={GlobalStyles.defaultContainer}>
            <View style={styles.inputContainer}>
                <Input
                    style={styles.input}
                    label="Tytuł Albumu:"
                    isValid={true}
                    textInputConfig={{
                        inputMode: 'text',
                        multiline: true,
                        onChangeText: setAlbumTitle,
                        value: albumTitle,
                        editable: canEdit
                    }} />
                {canEdit && <IconButton icon="pencil-sharp" size={30} color='white' onPress={onUpdatePress} />}
            </View>
            <View>
                <FlatList
                    data={photos}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => <PhotoGridTile {...item} />}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }} />
            </View>
            <AddPhotoModal isVisible={showAddPhotoModal} albumId={id} onClose={() => setShowAddPhotoModal(false)} />
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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        margin: 2,
        borderWidth: 1,
        borderColor: GlobalColors.primaryDark,
    },
    input: {
        flex: 1,
    },
    buttonsRow: {
        flexDirection: 'row'
    }
})