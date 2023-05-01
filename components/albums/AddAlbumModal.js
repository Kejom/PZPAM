import { Modal, StyleSheet, View, ToastAndroid } from "react-native";
import Input from "../shared/Input";
import { useState } from "react";
import Button from "../shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { addAlbum } from "../../redux/albums";
import { GlobalStyles } from "../../constants/style";

export default function AddAlbumModal({ isVisible, onClose }) {
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.users.loggedUserId);
    const [albumTitle, setAlbumTitle] = useState("");

    function onCreatePress(){
        if(!albumTitle)
            return ToastAndroid.showWithGravity("Tytuł albumu nie może być pusty", ToastAndroid.LONG, ToastAndroid.TOP);
        
        const newAlbum = {userId: currentUserId, title: albumTitle};
        dispatch(addAlbum(newAlbum));
        onClose();
    } 

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}>
            <View style={GlobalStyles.defaultModalContainer}>
                <Input
                    label="Tytuł Albumu:"
                    isValid={true}
                    textInputConfig={{
                        inputMode: 'text',
                        onChangeText: setAlbumTitle,
                        value: albumTitle
                    }} />
                    <View style={styles.buttonsRow}>
                    <Button style={styles.button} onPress={onCreatePress}>Stwórz Album</Button>
                    <Button style={styles.button} onPress={onClose}>Anuluj</Button>
                    </View>

            </View>
        </Modal>
    )
}

styles = StyleSheet.create({
    buttonsRow: {
        flexDirection: 'row',

    },
    button: {
        flex: 1,
        marginHorizontal: 10
    }
})