import { StyleSheet, View, Text } from "react-native";
import { GlobalColors } from "../../constants/colors";
import { truncate } from "../../util/stringUtil";

export default function Comment({id, name, email , body}){
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{truncate(name, 15)}({email})</Text>
            <Text style={styles.body}>{body}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        padding: 8,
        borderRadius: 8,
        backgroundColor: GlobalColors.primaryLight,
        elevation: 4,
    },
    header: {
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 12,
        color: 'black',

    },
    body: {
        marginTop: 8,
        fontSize: 10,

    }
})