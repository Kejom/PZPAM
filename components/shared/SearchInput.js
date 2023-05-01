import { StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons'
import { GlobalColors } from "../../constants/colors";
import IconButton from "./IconButton";

export default function SearchInput({value, onValueChange}){

    function onClearPress(){
        onValueChange('');
    }

    return (
        <View style={styles.container}>
            <Ionicons style={styles.searchIcon} name="search-outline" size={30} color={GlobalColors.primaryDark}/>
            <TextInput
            style={styles.input}
            placeholder="Szukaj..."
            placeholderTextColor={GlobalColors.greyLight}
            value={value}
            onChangeText={onValueChange}/>
            <IconButton icon="close-outline" size={30} color={GlobalColors.primaryDark} onPress={onClearPress}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: GlobalColors.primaryLight,
        borderWidth: 1,
        borderColor: GlobalColors.primaryDark,
        margin: 8,
        padding: 8,
        borderRadius: 8,
        elevation: 4
    },
    searchIcon:{
        padding: 8
    },
    input: {
        flex: 1,
        fontSize: 30,
        color: GlobalColors.primaryDark
    }
})