import { FlatList, ScrollView, StyleSheet } from "react-native";
import { View, Text} from "react-native";
import { GlobalStyles } from "../constants/style";
import { useSelector } from "react-redux";

import Accordian from "../components/shared/Accordian";
import AlbumGridTile from "../components/albums/AlbumGridTile";
import Post from "../components/posts/Post"
import UserDataForm from "../components/userProfile/UserDataForm";



export default function UserProfileScreen() {
    const loggedUserId = useSelector(state => state.users.loggedUserId);
    const loggedUser = useSelector(state => state.users.data.find(u => u.id === loggedUserId));
    const albums = useSelector(state => state.albums.data.filter(a => a.userId === loggedUserId));
    const posts = useSelector(state => state.posts.data.filter(p =>p.userId === loggedUserId));


    return (
        <View style={[GlobalStyles.defaultContainer, styles.container]}>
            <ScrollView>
                <Accordian title="Moje Dane" style={styles.accordian}>
                    <UserDataForm user={loggedUser}/>
                </Accordian>
                <Accordian title="Moje Albumy" style={styles.accordian}>
                    {!albums.length && <Text style={GlobalStyles.defaultText}>Brak Albumów do wyświetlenia</Text>}
                    <FlatList
                        data={albums}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => <AlbumGridTile {...item} />}
                        numColumns={2} />
                </Accordian>
                <Accordian title="Moje Wpisy" style={styles.accordian}>
                    {!posts.length && <Text style={GlobalStyles.defaultText}>Brak Wpisów do wyświetlenia</Text>}
                <FlatList
                        data={posts}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index}
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