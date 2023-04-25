import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getPosts } from "../../clients/jsonPlaceholderClient";
import { setUsers } from "../../redux/users";
import { initPosts, setPosts } from "../../redux/posts";
import LoadingOverlay from "../../components/shared/LoadingOverlay";
import Post from "../../components/posts/Post";
import { GlobalStyles } from "../../constants/style";
import { initComments } from "../../redux/comments";

export default function PostFeedScreen() {

    const posts = useSelector(state => state.posts.data);
    const shouldInitComments = useSelector(state => state.comments.data.length === 0);
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if(!posts.length)
            dispatch(initPosts());
        if(shouldInitComments)
            dispatch(initComments());
    }, [])

    if (showLoading)
        return <LoadingOverlay />

    return (
        <View style={GlobalStyles.defaultContainer}>
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                initialNumToRender={7}
                renderItem={({ item }) => <Post {...item}/>} />
        </View>
    )
}