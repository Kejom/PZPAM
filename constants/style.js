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
    }
})