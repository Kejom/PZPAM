import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { GlobalStyles } from "../constants/style";

export default function PostsScreen(){
    return (
        <View style={GlobalStyles.defaultContainer}>
            <Text style={GlobalStyles.defaultText}>Posts go here</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})