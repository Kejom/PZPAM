import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import Input from "../shared/Input";
import { useState } from "react";
import Button from "../shared/Button";
import { updateUser } from "../../redux/users";
import { useDispatch } from "react-redux";
import { stringIsEmptyOrSpaces } from "../../util/stringUtil";

export default function UserDataForm({ user }) {
    const dispatch = useDispatch();
    const [isDirty, setIsDirty] = useState(false);
    const [formData, setFormData] = useState({
        name: { value: user.name, isValid: true },
        email: { value: user.email, isValid: true },
        street: { value: user.address.street, isValid: true },
        suite: { value: user.address.suite, isValid: true },
        city: { value: user.address.city, isValid: true },
        zipcode: { value: user.address.city, isValid: true }
    })

    function onFormChange(key, value) {
        setFormData(state => { return { ...state, [key]: { value: value, isValid: true } } });
        setIsDirty(true);
    }

    function validateForm() {
        let result = true;
        let newFormData = {}
        Object.keys(formData).forEach(key => {
            newFormData[key] = {
                value: formData[key].value,
                isValid: !stringIsEmptyOrSpaces(formData[key].value)
            }

            if (!newFormData[key].isValid)
                result = false;
        })
        setFormData(newFormData);
        return result;
    }

    function onSaveChangesPress(){
        if(!validateForm())
            return;
        
        const userToUpdate = { ...user};

        userToUpdate.name = formData.name.value;
        userToUpdate.email = formData.email.value;
        userToUpdate.address.street = formData.street.value;
        userToUpdate.address.suite = formData.suite.value;
        userToUpdate.address.city = formData.city.value;
        userToUpdate.address.zipcode = formData.zipcode.value;

        dispatch(updateUser(userToUpdate));
        ToastAndroid.showWithGravity("Dane zostały zaaktualizowane", ToastAndroid.LONG, ToastAndroid.TOP);
    }

    return (
        <View style={styles.container}>
            <Input
                label="Nazwa Użytkownika:"
                isValid={true}
                textInputConfig={{
                    inputMode: 'text',
                    value: user.username,
                    editable: false
                }}
            />
            <Input
                label="Imię i Nazwisko:"
                isValid={formData.name.isValid}
                textInputConfig={{
                    inputMode: 'text',
                    value: formData.name.value,
                    onChangeText: onFormChange.bind(this, 'name')
                }}
            />
            <Input
                label="Email:"
                isValid={formData.email.isValid}
                textInputConfig={{
                    inputMode: 'text',
                    value: formData.email.value,
                    onChangeText: onFormChange.bind(this, 'email')
                }}
            />
            <Text style={styles.header}>Adres:</Text>
            <View style={styles.formRow}>
                <Input
                    style={styles.formRowInput}
                    label="Ulica:"
                    isValid={formData.street.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        value: formData.street.value,
                        onChangeText: onFormChange.bind(this, 'street')
                    }}
                />
                <Input
                    style={styles.formRowInput}
                    label="Numer Domu/Mieszkania:"
                    isValid={formData.suite.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        value: formData.suite.value,
                        onChangeText: onFormChange.bind(this, 'suite')
                    }}
                />
            </View>
            <View style={styles.formRow}>
                <Input
                    style={styles.formRowInput}
                    label="Miasto:"
                    isValid={formData.city.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        value: formData.city.value,
                        onChangeText: onFormChange.bind(this, 'city')
                    }}
                />
                <Input
                    style={styles.formRowInput}
                    label="Kod Pocztowy:"
                    isValid={formData.zipcode.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        value: formData.zipcode.value,
                        editable: false
                    }}
                />
            </View>
            <Button disabled={!isDirty} onPress={onSaveChangesPress}>Zapisz Zmiany</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        margin: 8
    },
    formRow: {
        flexDirection: 'row'
    },
    formRowInput: {
        flex: 1,
    },
})