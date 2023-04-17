import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { truncate } from "../../util/stringUtil";
import { GlobalColors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";


export default function Post({ userId, id, title, body }) {
    const author = useSelector(state => state.users.data.find(u => u.id === userId));
    const navigation = useNavigation();

    function onPostPress() {
        navigation.navigate("PostDetails", {id: id});
    }

    return (
        <Pressable onPress={onPostPress} style={styles.button}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.authorText}>{author.username} ({author.email})</Text>
                    <Text style={styles.titleText}>{truncate(title, 40)}</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.bodyText}>{body}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1
    },
    container: {
        backgroundColor: GlobalColors.lemon,
        margin: 8,
        borderRadius: 8,
        elevation: 4,
        borderBottomColor: GlobalColors.greyDark,
        borderWidth: 1
    },
    header: {
        backgroundColor: GlobalColors.greyLight,
        padding: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomColor: GlobalColors.greyDark,
        borderBottomWidth: 1
    },
    authorText: {
        fontStyle: 'italic',
        textAlign: 'left',
        fontSize: 12
    },
    titleText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14
    },
    body: {
        padding: 8,
    },
    bodyText: {
        fontSize: 12,
    }
})