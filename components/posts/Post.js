import { FlatList, Pressable, StyleSheet, Text, View, LayoutAnimation, Platform, UIManager } from "react-native";
import { useSelector } from "react-redux";
import { truncate } from "../../util/stringUtil";
import { GlobalColors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { initComments } from "../../redux/comments";
import Comment from "./Comment";


export default function Post({ userId, id, title, body }) {
    if(Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental)
    UIManager.setLayoutAnimationEnabledExperimental(true);

    const [expanded, setExpanded] = useState(false);
    const author = useSelector(state => state.users.data.find(u => u.id === userId));
    const comments = useSelector(state => state.comments.data.filter(c => c.postId === id));

    function onPostPress() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(state => !state);
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={onPostPress} style={styles.button}>
                <View >
                    <View style={styles.header}>
                        <Text style={styles.authorText}>{author.username} ({author.email})</Text>
                        <Text style={styles.titleText}>{truncate(title, 40)}</Text>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.bodyText}>{body}</Text>
                    </View>
                </View>
            
            {expanded &&
                <View style={styles.commentsContainer}>
                    <Text style={styles.titleText}>Komentarze:</Text>
                    <FlatList
                        data={comments}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item }) => <Comment {...item} />} />
                </View>}
                </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1
    },
    container: {
        backgroundColor: GlobalColors.primary,
        margin: 8,
        borderRadius: 8,
        elevation: 4,
        borderBottomColor: GlobalColors.greyDark,
        borderWidth: 1
    },
    header: {
        backgroundColor: GlobalColors.lemon,
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
    },
    commentsContainer: {
        padding: 8,
    }
})