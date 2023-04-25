import { createSlice } from "@reduxjs/toolkit";
import { deleteComment, getComments, getCommentsByPostId, postComment, putComment } from "../clients/jsonPlaceholderClient";

const commentsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: []
    },
    reducers: {
        setComments: (state, action) => {state.data = [...state.data, ...action.payload]},
        addComment: (state, action) => {state.data.push(action.payload)},
        removeComment: (state, action) => {state.data = state.data.filter(a => a.id !== action.payload)},
        updateComment: (state, action) => {
            let index = state.data.findIndex(c => c.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export function initComments(){
    return async function(dispatch, getState){
        const comments = await getComments();
        dispatch(commentsSlice.actions.setComments(comments));
    }
}

export function addComment(comment){
    return async function(dispatch, getState){
        const addedComment = await postComment(comment);
        dispatch(commentsSlice.actions.addComment(addedComment));
    }
}

export function removeComment(id){
    return async function(dispatch, getState){
        await deleteComment(id);
        dispatch(commentsSlice.actions.removeComment(id));
    }
}

export function updateComment(comment){
    return async function(dispatch, getState){
        updatedComment = await putComment(comment);
        dispatch(commentsSlice.actions.updateComment(updatedComment));
    }
}

export default commentsSlice.reducer;