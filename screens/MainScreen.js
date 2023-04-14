import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { GlobalColors } from "../constants/colors";
import { GlobalStyles } from "../constants/style";

export default function MainScreen(){
    return (
        <View style={GlobalStyles.defaultContainer}>
            <Text style={GlobalStyles.defaultText}>Main Feed</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
})