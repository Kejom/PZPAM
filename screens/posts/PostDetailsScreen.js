import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getCommentsByPostId } from "../../clients/jsonPlaceholderClient";
import { setComments } from "../../redux/comments";
import { useEffect, useState } from "react";
import { truncate } from "../../util/stringUtil";
import Comment from "../../components/posts/Comment";
import LoadingOverlay from "../../components/shared/LoadingOverlay";
import { GlobalStyles } from "../../constants/style";
import { FlatList } from "react-native";
import { GlobalColors } from "../../constants/colors";


export default function PostDetailsScreen({route, navigation}){
    const dispatch = useDispatch();
    const id = route.params.id
    const post = useSelector(state => state.posts.data.find(p => p.id === id));
    const author = useSelector(state => state.users.data.find(u => u.id === post.userId));
    const comments = useSelector(state => state.comments.data.filter(c => c.postId === id));
    const [showLoading, setShowLoading] = useState(false);

    useEffect(() => {
        async function InitComments(){
            if(comments.length !== 0)
                return;
            setShowLoading(true);
            let newComments = await getCommentsByPostId(id);
            dispatch(setComments(newComments));
            setShowLoading(false);
        }
        InitComments();
        navigation.setOptions({
            title: truncate(post.title, 24)
        })
    }, [id])
    
    if (showLoading)
    return <LoadingOverlay />

    return (
        <View style={GlobalStyles.defaultContainer}>
            <View style={styles.header}>
                <Text style={styles.authorText}>{author.username} ({author.email})</Text>
                <Text style={styles.titleText}>{post.title}</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>{post.body}</Text>
            </View>
            <Text style={GlobalStyles.defaultText}>Comments:</Text>
            <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Comment {...item}/>} />
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        backgroundColor: GlobalColors.lemon,
        padding: 8,
        margin: 2,
        marginBottom: 0,
        borderBottomColor: GlobalColors.greyDark,
        borderWidth: 1,
        borderBottomWidth: 0,
    },
    authorText: {
        fontStyle: 'italic',
        textAlign: 'left',
        fontSize: 14
    },
    titleText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    body: {
        padding: 8,
        margin: 2,
        marginTop: 0,
        backgroundColor: GlobalColors.primaryLight,
        marginBottom: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderWidth: 1,
        borderBottomColor: GlobalColors.greyDark,
    },
    bodyText: {
        fontSize: 14,
    }
})