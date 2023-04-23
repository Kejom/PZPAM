import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { GlobalColors } from "../constants/colors";
import { GlobalStyles } from "../constants/style";
import { useSelector } from "react-redux";

export default function UserProfileScreen(){
    const loggedUserId = useSelector(state => state.users.loggedUserId);
    console.log(loggedUserId);
    const loggedUser = useSelector(state => state.users.data.find(u => u.id === loggedUserId));
    return (
        <View style={GlobalStyles.defaultContainer}>
            <Text style={GlobalStyles.defaultText}>User Profile for {loggedUser.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})