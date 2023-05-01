import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Post from "../../components/posts/Post";
import IconButton from "../../components/shared/IconButton";
import AddPostModal from "../../components/posts/AddPostModal";
import { GlobalStyles } from "../../constants/style";


export default function PostFeedScreen({navigation}) {

    const posts = useSelector(state => state.posts.data);
    const [showAddPostModal, setShowAddPostModal] = useState(false);


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="add-circle-outline" size={30} color='white' onPress={() => setShowAddPostModal(true)} />
        })
    }, [])

    return (
        <View style={GlobalStyles.defaultContainer}>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index}
                initialNumToRender={7}
                renderItem={({ item }) => <Post {...item}/>} />
                <AddPostModal isVisible={showAddPostModal} onClose={() => setShowAddPostModal(false)}/>
        </View>
    )
}