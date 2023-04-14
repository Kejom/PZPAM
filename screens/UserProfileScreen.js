import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { GlobalColors } from "../constants/colors";

export default function UserProfileScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>User Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalColors.primaryDark
    },
    text: {
        textAlign: 'center',
        color: 'white'
    }
})