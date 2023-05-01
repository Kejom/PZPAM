import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector} from "react-redux";
import Post from "../../components/posts/Post";
import IconButton from "../../components/shared/IconButton";
import AddPostModal from "../../components/posts/AddPostModal";
import SearchInput from "../../components/shared/SearchInput";
import { GlobalStyles } from "../../constants/style";


export default function PostFeedScreen({navigation}) {

    let posts = useSelector(state => state.posts.data);
    let users = useSelector(state => state.users.data);
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <IconButton icon="add-circle-outline" size={30} color='white' onPress={() => setShowAddPostModal(true)} />
        })
    }, [])

    function applySearchFilter(){
        const lowerCaseSearchText = searchText.toLowerCase();
        const userIds = users.filter(u => u.username.toLowerCase().includes(lowerCaseSearchText)).map(u => u.id);
        posts = posts.filter(p => p.title.toLowerCase().includes(lowerCaseSearchText) || userIds.includes(p.userId));
    }

    if(searchText.length > 3)
        applySearchFilter();

    return (
        <View style={GlobalStyles.defaultContainer}>
            <SearchInput value={searchText} onValueChange={setSearchText}/>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index}
                initialNumToRender={7}
                renderItem={({ item }) => <Post {...item}/>} />
                <AddPostModal isVisible={showAddPostModal} onClose={() => setShowAddPostModal(false)}/>
        </View>
    )
}