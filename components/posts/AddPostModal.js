import { View, Modal, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/style";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { useDispatch, useSelector } from "react-redux";
import { stringIsEmptyOrSpaces } from "../../util/stringUtil";
import { addPost } from "../../redux/posts";
import { useState } from "react";

export default function AddPostModal({ isVisible, onClose }) {
    const dispatch = useDispatch();
    const loggedUserId = useSelector(state => state.users.loggedUserId);

    const [formData, setFormData] = useState({
        title: { value: '', isValid: true },
        body: { value: '', isValid: true }
    })

    function onFormChange(key, value){
        setFormData(state => {return {...formData, [key]: {value: value, isValid: true}}});
    }

    function validateForm(){
        const isTitleValid = !stringIsEmptyOrSpaces(formData.title.value);
        const isBodyValid = !stringIsEmptyOrSpaces(formData.body.value);

        setFormData(state => {
            return {
                title: {value: formData.title.value, isValid: isTitleValid},
                body: {value: formData.body.value, isValid: isBodyValid}
            }
        })

        return isTitleValid && isBodyValid;
    }

    function onSavePress(){
        if(!validateForm())
            return;
        
        const newPost = {
            userId: loggedUserId,
            title: formData.title.value,
            body: formData.body.value
        }

        dispatch(addPost(newPost));
        setFormData({
            title: { value: '', isValid: true },
            body: { value: '', isValid: true }
        });
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
                    label="Tytuł Wpisu:"
                    isValid={formData.title.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        onChangeText: onFormChange.bind(this, "title"),
                        value: formData.title.value
                    }} />
                <Input
                    label="Treść:"
                    isValid={formData.body.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        onChangeText: onFormChange.bind(this, "body"),
                        value: formData.body.value,
                        multiline: true,
                        numberOfLines: 6
                    }} />
                <View style={styles.buttonsRow}>
                    <Button style={styles.button} onPress={onSavePress}>Dodaj Wpis</Button>
                    <Button style={styles.button} onPress={onClose}>Anuluj</Button>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    buttonsRow: {
        marginTop: 8,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        marginHorizontal: 10
    }
})