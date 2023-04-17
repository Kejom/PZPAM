import { Text, View } from "react-native";

export default function PostDetailsScreen({route, navigation}){
    const id = route.params.id
    return (
        <View>
            <Text>Post Details for post with id: {id}</Text>
        </View>
    )
}