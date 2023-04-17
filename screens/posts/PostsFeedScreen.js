import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, getPosts } from "../../clients/jsonPlaceholderClient";
import { setUsers } from "../../redux/users";
import { setPosts } from "../../redux/posts";
import LoadingOverlay from "../../components/shared/LoadingOverlay";
import Post from "../../components/posts/Post";
import { GlobalStyles } from "../../constants/style";

export default function PostFeedScreen() {

    const posts = useSelector(state => state.posts.data);
    const [showLoading, setShowLoading] = useState(false);
    const dispatch = useDispatch();


    useEffect(() => {
        async function InitPosts() {
            if (posts.length !== 0)
                return;
            setShowLoading(true);
            let users = await getUsers();
            let newPosts = await getPosts();
            dispatch(setUsers(users));
            dispatch(setPosts(newPosts));
            setShowLoading(false);
        }
        InitPosts();
    }, [])

    if (showLoading)
        return <LoadingOverlay />

    return (
        <View style={GlobalStyles.defaultContainer}>
            <FlatList
                data={posts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Post {...item}/>} />
        </View>
    )
}