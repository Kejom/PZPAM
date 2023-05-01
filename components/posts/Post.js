import { FlatList, Pressable, StyleSheet, Text, View, LayoutAnimation, Platform, UIManager, ToastAndroid } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { truncate } from "../../util/stringUtil";
import { GlobalColors } from "../../constants/colors";
import { useState } from "react";
import Comment from "./Comment";
import IconButton from "../shared/IconButton";
import { removePost } from "../../redux/posts";
import AddCommentForm from "./AddCommentForm";

export default function Post({ userId, id, title, body }) {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental)
        UIManager.setLayoutAnimationEnabledExperimental(true);

    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    
    const author = useSelector(state => state.users.data.find(u => u.id === userId));
    const comments = useSelector(state => state.comments.data.filter(c => c.postId === id));
    const loggedUserId = useSelector(state => state.users.loggedUserId);
    const canEdit = userId === loggedUserId;


    function onPostPress() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(state => !state);
    }

    async function onRemovePress() {
        await dispatch(removePost(id));
        setExpanded(false);
    }



    return (
        <View style={styles.container}>
            <Pressable onPress={onPostPress} style={styles.button}>
                <View >
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.authorText}>{author.username} ({author.email})</Text>
                            <Text style={styles.titleText}>{truncate(title, 40)}</Text>
                        </View>
                        {canEdit && <IconButton icon="trash-outline" size={30} color={GlobalColors.primaryDark} onPress={onRemovePress} />}
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
                            keyExtractor={(item, index) => index}
                            scrollEnabled={false}
                            renderItem={({ item }) => <Comment {...item} loggedUserId={loggedUserId} />} />
                        <AddCommentForm loggedUserId={loggedUserId} postId={id}/>
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
        flexDirection: 'row',
        backgroundColor: GlobalColors.lemon,
        padding: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderBottomColor: GlobalColors.greyDark,
        borderBottomWidth: 1
    },
    titleContainer: {
        flex: 1
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