import { StyleSheet, View, Text, TextInput, ToastAndroid, Keyboard } from "react-native";
import { GlobalColors } from "../../constants/colors";
import { stringIsEmptyOrSpaces, truncate } from "../../util/stringUtil";
import IconButton from "../shared/IconButton";
import { removeComment, updateComment } from "../../redux/comments";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";

export default function Comment({ postId, id, name, email, body, userId, loggedUserId }) {
    const dispatch = useDispatch()
    const mainView = useRef(null);
    const canEdit = loggedUserId === userId;
    const [commentText, setCommentText] = useState(body);

    function onRemovePress() {
        dispatch(removeComment(id));
    }

    function onEditConfirm() {
        if (stringIsEmptyOrSpaces(commentText))
            return ToastAndroid.showWithGravity("Komentarz nie może być pusty!", ToastAndroid.LONG, ToastAndroid.TOP);

        if(commentText === body)
            return;

        const updatedComment = {
            postId: postId,
            id: id,
            name: name,
            email: email,
            body: commentText,
            userId: userId,
        }

        dispatch(updateComment(updatedComment));

        ToastAndroid.showWithGravity("Komentarz Zaaktualizowany", ToastAndroid.LONG, ToastAndroid.TOP);
    }

    let bodyElement = <Text style={styles.body}>{body}</Text>

    if (canEdit)
        bodyElement = <TextInput
            style={styles.body}
            value={commentText}
            onChangeText={setCommentText}
            inputMode="text"
            multiline={true}
        />

    return (
        <View style={styles.container} ref={mainView}>
            <Text style={styles.header}>{truncate(name, 15)}({email})</Text>
            {bodyElement}
            {canEdit && <View style={styles.buttons}>
                <IconButton icon="pencil-sharp" size={24} color="black" onPress={onEditConfirm}/>
                <IconButton icon="trash-outline" size={24} color="black" onPress={onRemovePress} />
            </View>}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 4,
        padding: 8,
        borderRadius: 8,
        backgroundColor: GlobalColors.primaryLight,
        elevation: 8,
        borderWidth: 1,
        borderColor: GlobalColors.primaryDark
    },
    headerContainer: {
        flexDirection: 'row'
    },
    header: {
        flex: 1,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 12,
        color: 'black',

    },
    body: {
        marginTop: 8,
        fontSize: 10,
        flex: 1,
    },
    buttons: {
        position: 'absolute',
        right: 0,
        top: 0,
        flexDirection: 'row'
    }
})