import { View, ToastAndroid, Keyboard } from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addComment } from "../../redux/comments";
import Input from "../shared/Input"
import Button from "../shared/Button"

export default function AddCommentForm({loggedUserId, postId}){
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.users.data.find(u => u.id === loggedUserId));
    const [newCommentText, setNewCommentText] = useState("");

    function onCommentSubmitPress() {
        if(!newCommentText || newCommentText.length < 10)
            return ToastAndroid.showWithGravity("Komentarz musi zawierac przynajmniej 10 znaków", ToastAndroid.LONG, ToastAndroid.TOP);
        
        const newComment = {
            postId: postId,
            userId: loggedUserId,
            name: loggedUser.username,
            email: loggedUser.email,
            body: newCommentText
        }

        dispatch(addComment(newComment));
        setNewCommentText("");
        Keyboard.dismiss();
    }

    return (
        <View>
        <Input label="Nowy Komentarz:"
            isValid={true}
            textInputConfig={{
                inputMode: 'text',
                onChangeText: setNewCommentText,
                value: newCommentText,
                multiline: true,
                numberOfLines: 6
            }} />
            <Button onPress={onCommentSubmitPress}>Dodaj Komentarz</Button>
    </View>
    )
}