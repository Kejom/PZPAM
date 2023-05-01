import { Image, StyleSheet, View, ToastAndroid, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { GlobalStyles } from "../../constants/style";
import { GlobalColors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { stringIsEmptyOrSpaces, truncate } from "../../util/stringUtil";
import { removePhoto, updatePhoto } from "../../redux/photos";
import IconButton from "../../components/shared/IconButton";
import Input from "../../components/shared/Input";

export default function PhotoDetailsScreen({ route, navigation }) {
    const id = route.params.id;
    const photo = useSelector(state => state.photos.data.find(p => p.id === id));

    if (!photo)
        navigation.goBack();

    const dispatch = useDispatch();
    const album = useSelector(state => state.albums.data.find(a => a.id === photo.albumId));
    const loggedUserId = useSelector(state => state.users.loggedUserId)
    const canEdit = loggedUserId === album.userId;
    const [photoTitle, setPhotoTitle] = useState(photo.title);

    function onDeletePress() {
        dispatch(removePhoto(id));
        navigation.goBack();
    }

    function onUpdatePress() {
        if(stringIsEmptyOrSpaces(photoTitle))
            return ToastAndroid.showWithGravity("Tytuł zdjęcia nie może być pusty", ToastAndroid.LONG, ToastAndroid.TOP);

        const photoToUpdate = {...photo, title: photoTitle};
        dispatch(updatePhoto(photoToUpdate));
        Keyboard.dismiss();
    }

    useEffect(() => {
        navigation.setOptions({
            title: truncate(photo.title, 16),
            headerRight: () => canEdit && <IconButton icon="trash-outline" size={30} color='white' onPress={onDeletePress} />
        })
    }, [photo])

    return (
        <View style={GlobalStyles.defaultContainer}>
            <View style={styles.inputContainer}>
                <Input
                    style={styles.input}
                    label="Tytuł Zdjęcia:"
                    isValid={true}
                    textInputConfig={{
                        inputMode: 'text',
                        onChangeText: setPhotoTitle,
                        value: photoTitle,
                        editable: canEdit,
                        multiline: true
                    }} />
                {canEdit && <IconButton icon="pencil-sharp" size={30} color='white' onPress={onUpdatePress}/>}

            </View>
            <View style={styles.container}>
                <Image source={{ uri: photo.url }} style={styles.image} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
        marginTop: 32,
        padding: 8,
        borderRadius: 8,
        backgroundColor: GlobalColors.lemon,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8
    },
    image: {
        height: 360,
        width: 360
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
    }
})