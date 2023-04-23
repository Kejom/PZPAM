import { StyleSheet, Text, View, ScrollView, ToastAndroid } from "react-native";
import { GlobalColors } from "../../constants/colors";
import { GlobalStyles } from "../../constants/style";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { stringIsEmptyOrSpaces } from "../../util/stringUtil";
import { registerUser } from "../../redux/users";

export default function RegisterScreen() {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        firstName: { value: '', isValid: true, },
        lastName: { value: '', isValid: true, },
        username: { value: '', isValid: true, },
        password: { value: '', isValid: true, },
        repeatPassword: { value: '', isValid: true, },
        email: { value: '', isValid: true, },
        street: { value: '', isValid: true, },
        suite: { value: '', isValid: true, },
        city: { value: '', isValid: true, },
        zipcode: { value: '', isValid: true, },
    })

    function onInputChange(inputId, newValue) {
        setInputs(state => { return { ...state, [inputId]: { value: newValue, isValid: true } } })
    }

    function onRegisterPress(){
        if(!validateInputs())
            return;
        
        const user = {
            name: `${inputs.firstName.value} ${inputs.lastName.value}`,
            username: inputs.username.value,
            email: inputs.email.value,
            address: {
                street: inputs.street.value,
                suite: inputs.suite.value,
                city: inputs.city.value,
                zipcode: inputs.zipcode.value
            }
        };

        dispatch(registerUser(user));

    }

    function validateInputs(){
        let result = true;
        let newInput = {}
        Object.keys(inputs).forEach(key => {
            newInput[key] = {
                value: inputs[key].value,
                isValid: !stringIsEmptyOrSpaces(inputs[key].value)
            }
            inputs[key].isValid = !stringIsEmptyOrSpaces(inputs[key].value);

            if(!newInput[key].isValid)
                result = false;
        })


        if(newInput.password.value !== newInput.repeatPassword.value){
            newInput.password.isValid = false;
            newInput.repeatPassword.isValid = false;
            result = false;
            ToastAndroid.showWithGravity("Hasło oraz Powtórz Hasło mają inne wartości", ToastAndroid.LONG, ToastAndroid.TOP);
        }
        setInputs(newInput);
        return result;

    }


    return (
        <ScrollView style={GlobalStyles.defaultContainer}>
            <View style={styles.formGroup}>
                <Text style={styles.header}>Dane Użytkownika:</Text>
                <Input
                    label="Nazwa Użytkownika:"
                    isValid={inputs.username.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        onChangeText: onInputChange.bind(this, 'username'),
                        value: inputs.username.value
                    }}
                />
                <Input
                    label='Hasło:'
                    isValid={inputs.password.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        secureTextEntry: true,
                        onChangeText: onInputChange.bind(this, 'password'),
                        value: inputs.password.value
                    }} />
                <Input
                    label='Powtórz Hasło:'
                    isValid={inputs.repeatPassword.isValid}
                    textInputConfig={{
                        inputMode: 'text',
                        secureTextEntry: true,
                        onChangeText: onInputChange.bind(this, 'repeatPassword'),
                        value: inputs.repeatPassword.value
                    }} />
                <View style={styles.formRow}>
                    <Input
                    style={styles.formRowInput}
                        label="Imię:"
                        isValid={inputs.firstName.isValid}
                        textInputConfig={{
                            inputMode: 'text',
                            onChangeText: onInputChange.bind(this, 'firstName'),
                            value: inputs.firstName.value
                        }}
                    />
                    <Input
                    style={styles.formRowInput}
                        label="Nazwisko:"
                        isValid={inputs.lastName.isValid}
                        textInputConfig={{
                            inputMode: 'text',
                            onChangeText: onInputChange.bind(this, 'lastName'),
                            value: inputs.lastName.value
                        }}
                    />
                </View>
                <Input
                    label="Email:"
                    isValid={inputs.email.isValid}
                    textInputConfig={{
                        inputMode: 'email',
                        onChangeText: onInputChange.bind(this, 'email'),
                        value: inputs.email.value
                    }}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.header}>Adres:</Text>
                <View style={styles.formRow}>
                    <Input
                    style={styles.formRowInput}
                        label="Ulica:"
                        isValid={inputs.street.isValid}
                        textInputConfig={{
                            inputMode: 'text',
                            onChangeText: onInputChange.bind(this, 'street'),
                            value: inputs.street.value
                        }}
                    />
                    <Input
                    style={styles.formRowInput}
                        label="Numer Domu/Mieszkania:"
                        isValid={inputs.suite.isValid}
                        textInputConfig={{
                            inputMode: 'text',
                            onChangeText: onInputChange.bind(this, 'suite'),
                            value: inputs.suite.value
                        }}
                    />
                </View>
                <View style={styles.formRow}>
                    <Input
                        style={styles.formRowInput}
                        label="Miasto:"
                        isValid={inputs.city.isValid}
                        textInputConfig={{
                            inputMode: 'text',
                            onChangeText: onInputChange.bind(this, 'city'),
                            value: inputs.city.value
                        }}
                    />
                    <Input
                    style={styles.formRowInput}
                        label="Kod Pocztowy:"
                        isValid={inputs.zipcode.isValid}
                        textInputConfig={{
                            inputMode: 'text',
                            onChangeText: onInputChange.bind(this, 'zipcode'),
                            value: inputs.zipcode.value
                        }}
                    />
                </View>
            </View>

            <Button onPress={onRegisterPress} style={styles.button}>Utwórz Konto</Button>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formGroup:{
        padding: 8,
        margin: 8,
        borderWidth: 1,
        borderColor: GlobalColors.primaryDark,
    },
    formRow: {
        flexDirection: 'row'
    },
    formRowInput:{
        flex: 1,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        margin: 8
    },
    button: {
        margin: 8
    }
})