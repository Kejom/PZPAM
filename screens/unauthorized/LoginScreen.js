import { View } from "react-native";
import { GlobalStyles } from "../../constants/style";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import { StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initUsers, setLoggedUser } from "../../redux/users";
import { stringIsEmptyOrSpaces } from "../../util/stringUtil";

export default function LoginScreen({ navigation }) {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.data);

    const [inputs, setInputs] = useState({
        login: {
            value: '',
            isValid: true
        },
        password: {
            value: '',
            isValid: true
        }
    })

    useEffect(() => {
        if (!users.length)
            dispatch(initUsers());
    }, [])

    function onInputChange(inputId, newValue) {
        setInputs(state => { return { ...state, [inputId]: { value: newValue, isValid: true } } })
    }
    function onLoginPress() {
        if (!validateInputs())
            return;

        dispatch(setLoggedUser(inputs.login.value));
    }

    function validateInputs() {
        const loginIsValid = !stringIsEmptyOrSpaces(inputs.login.value);
        const passwordIsValid = !stringIsEmptyOrSpaces(inputs.password.value);

        if (loginIsValid && passwordIsValid)
            return true;

        setInputs(state => {
            return {
                login: { value: state.login.value, isValid: loginIsValid },
                password: { value: state.password.value, isValid: passwordIsValid }
            }
        })

        return false;
    }


    return (
        <View style={[GlobalStyles.defaultContainer, styles.container]}>
            <Input
                label='Nazwa Użytkownika:'
                isValid={inputs.login.isValid}
                textInputConfig={{
                    inputMode: 'text',
                    onChangeText: onInputChange.bind(this, 'login'),
                    value: inputs.login.value
                }} />
            <Input
                label='Hasło:'
                isValid={inputs.password.isValid}
                textInputConfig={{
                    inputMode: 'text',
                    secureTextEntry: true,
                    onChangeText: onInputChange.bind(this, 'password'),
                    value: inputs.password.value
                }} />
            <View style={styles.buttonsContainer}>
                <Button onPress={onLoginPress} style={styles.button}>Zaloguj</Button>
                <Button onPress={() => navigation.navigate("Register")} style={styles.button}>Stwórz Nowe Konto</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        padding: 10
    },
    buttonsContainer: {
        padding: 8,
        margin: 8,
        borderWidth: 1,
        borderColor: GlobalColors.primaryDark,
        backgroundColor: GlobalColors.primaryLight
    },
    button: {
        margin: 8
    }
})