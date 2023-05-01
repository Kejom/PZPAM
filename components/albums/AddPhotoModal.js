import { Modal, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useState } from "react";
import { stringIsEmptyOrSpaces } from "../../util/stringUtil";
import { useDispatch } from "react-redux";
import { addPhoto } from "../../redux/photos";

export default function AddPhotoModal({ isVisible, onClose, albumId }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: { value: "", isValid: true },
        url: { value: "", isValid: true }
    })

    function onInputChange(key, value){
        setFormData(state =>  {return {...state, [key]: {value: value, isValid: true}}});
    }

    function validateInputs(){
        const isTitleValid = !stringIsEmptyOrSpaces(formData.title.value);
        const isUrlValid = !stringIsEmptyOrSpaces(formData.url.value);

        setFormData(state => {return {
            title: {value: formData.title.value, isValid: isTitleValid},
            url: {value: formData.url.value, isValid:  isUrlValid}
        }})

        return isTitleValid && isUrlValid;
    }


    function onSavePress(){
        if(!validateInputs())
            return;

        const newPhoto = {
            albumId: albumId,
            title: formData.title.value,
            url: formData.url.value,
            thumbnailUrl: formData.url.value
        }

        dispatch(addPhoto(newPhoto));
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
                    label="Tytuł Zdjęcia:"
                    isValid={formData.title.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        onChangeText: onInputChange.bind(this, "title"),
                        value: formData.title.value
                    }} />
                <Input 
                    label="Url Zdjęcia:"
                    isValid={formData.url.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        onChangeText: onInputChange.bind(this, "url"),
                        value: formData.url.value
                    }} />
                <View style={styles.buttonsRow}>
                    <Button style={styles.button} onPress={onSavePress}>Dodaj Zdjęcie</Button>
                    <Button style={styles.button} onPress={onClose}>Anuluj</Button>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    buttonsRow: {
        flexDirection: 'row',

    },
    button: {
        flex: 1,
        marginHorizontal: 10
    }
})