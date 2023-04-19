import { StyleSheet } from "react-native"
import { GlobalColors } from "../../constants/colors"
import { View, Text, TextInput} from "react-native"

export default function Input({label, style, isValid, textInputConfig}){
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, !isValid && styles.invalidLabel]}>{label}</Text>
            <TextInput style={[styles.input, !isValid && styles.invalidInput]} {...textInputConfig}/>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalColors.primaryLight,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalColors.primaryLight,
        color: GlobalColors.primaryDark,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel: {
        color: 'red'
    },
    invalidInput: {
        backgroundColor: 'red'
    }
})