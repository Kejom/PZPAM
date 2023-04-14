import { StyleSheet } from "react-native";
import { GlobalColors } from "./colors";

export const GlobalStyles = StyleSheet.create({
    defaultContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalColors.primary
    },
    defaultText: {
        textAlign: 'center',
        color: GlobalColors.greyLight
    }
})