import { View, Text,  StyleSheet } from "react-native";
import Input from "../shared/Input";

export default function UserDataForm({ user }) {
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
                isValid={true}
                textInputConfig={{
                    inputMode: 'text',
                    value: user.name,
                    editable: false
                }}
            />
                        <Input
                label="Email:"
                isValid={true}
                textInputConfig={{
                    inputMode: 'text',
                    value: user.email,
                    editable: false
                }}
            />
            <Text style={styles.header}>Adres:</Text>
            <View style={styles.formRow}>
                    <Input
                    style={styles.formRowInput}
                        label="Ulica:"
                        isValid={true}
                        textInputConfig={{
                            inputMode: 'text',
                            value: user.address.street,
                            editable: false
                        }}
                    />
                    <Input
                    style={styles.formRowInput}
                        label="Numer Domu/Mieszkania:"
                        isValid={true}
                        textInputConfig={{
                            inputMode: 'text',
                            value: user.address.suite,
                            editable: false
                        }}
                    />
                </View>
                <View style={styles.formRow}>
                    <Input
                        style={styles.formRowInput}
                        label="Miasto:"
                        isValid={true}
                        textInputConfig={{
                            inputMode: 'text',
                            value: user.address.city,
                            editable: false
                        }}
                    />
                    <Input
                    style={styles.formRowInput}
                        label="Kod Pocztowy:"
                        isValid={true}
                        textInputConfig={{
                            inputMode: 'text',
                            value: user.address.zipcode,
                            editable: false
                        }}
                    />
                </View>
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
    formRowInput:{
        flex: 1,
    },
})