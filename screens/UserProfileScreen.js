import { FlatList, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { GlobalStyles } from "../constants/style";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initAlbums } from "../redux/albums";
import { initPosts } from "../redux/posts";
import { initComments } from "../redux/comments";
import Accordian from "../components/shared/Accordian";
import AlbumGridTile from "../components/albums/AlbumGridTile";
import Post from "../components/posts/Post"
import UserDataForm from "../components/userProfile/UserDataForm";



export default function UserProfileScreen() {
    const dispatch = useDispatch();
    const loggedUserId = useSelector(state => state.users.loggedUserId);
    const loggedUser = useSelector(state => state.users.data.find(u => u.id === loggedUserId));
    const shouldInitAlbums = useSelector(state => state.albums.data.length === 0);
    const shouldInitPosts = useSelector(state => state.posts.data.length === 0);
    const shouldInitComments = useSelector(state => state.comments.data.length === 0);
    const albums = useSelector(state => state.albums.data.filter(a => a.userId === loggedUserId));
    const posts = useSelector(state => state.posts.data.filter(p =>p.userId === loggedUserId));

    useEffect(() => {
        if (shouldInitAlbums)
            dispatch(initAlbums());
        if(shouldInitPosts)
            dispatch(initPosts());
        if(shouldInitComments)
            dispatch(initComments());
    }, [shouldInitAlbums, shouldInitPosts, shouldInitComments])

    return (
        <View style={[GlobalStyles.defaultContainer, styles.container]}>
            <ScrollView>
                <Accordian title="Moje Dane" style={styles.accordian}>
                    <UserDataForm user={loggedUser}/>
                </Accordian>
                <Accordian title="Moje Albumy" style={styles.accordian}>
                    <FlatList
                        data={albums}
                        scrollEnabled={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <AlbumGridTile {...item} />}
                        numColumns={2} />
                </Accordian>
                <Accordian title="Moje Posty" style={styles.accordian}>
                <FlatList
                        data={posts}
                        scrollEnabled={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <Post {...item} />}/>
                </Accordian>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    accordian: {
        marginBottom: 8
    }
})