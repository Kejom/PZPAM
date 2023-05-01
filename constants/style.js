import { StyleSheet } from "react-native";
import { GlobalColors } from "./colors";

export const GlobalStyles = StyleSheet.create({
    defaultContainer:{
        flex: 1,
        backgroundColor: GlobalColors.primary
    },
    defaultText: {
        textAlign: 'center',
        color: GlobalColors.greyDark
    },
    defaultModalContainer: {
        backgroundColor: GlobalColors.primary,
        padding: 16,
        marginTop: 100,
        margin: 10,
        borderRadius: 8,
        elevation: 8,
        borderWidth: 1,
        borderColor: GlobalColors.primaryDark
    }
})