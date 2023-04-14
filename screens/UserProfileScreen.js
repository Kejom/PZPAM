import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { GlobalColors } from "../constants/colors";
import { GlobalStyles } from "../constants/style";

export default function UserProfileScreen(){
    return (
        <View style={GlobalStyles.defaultContainer}>
            <Text style={GlobalStyles.defaultText}>User Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})