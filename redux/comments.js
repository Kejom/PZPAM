import { createSlice } from "@reduxjs/toolkit";
import { deleteComment, getComments, getCommentsByPostId, postComment, putComment } from "../clients/jsonPlaceholderClient";
import { setShowLoading } from "./appState";

const commentsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: []
    },
    reducers: {
        setComments: (state, action) => { state.data = [...state.data, ...action.payload] },
        addComment: (state, action) => { state.data.push(action.payload) },
        removeComment: (state, action) => { state.data = state.data.filter(a => a.id !== action.payload) },
        updateComment: (state, action) => {
            let index = state.data.findIndex(c => c.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export function initComments() {
    return async function (dispatch, getState) {
        dispatch(setShowLoading(true));
        const comments = await getComments();
        dispatch(commentsSlice.actions.setComments(comments));
        dispatch(setShowLoading(false));
    }
}

export function addComment(comment) {
    return async function (dispatch, getState) {
        const addedComment = await postComment(comment);
        dispatch(commentsSlice.actions.addComment(addedComment));
    }
}

export function removeComment(id) {
    return async function (dispatch, getState) {
        await deleteComment(id);
        dispatch(commentsSlice.actions.removeComment(id));
    }
}

export function updateComment(comment) {
    return async function (dispatch, getState) {
        //updatedComment = await putComment(comment);
        dispatch(commentsSlice.actions.updateComment(comment));
    }
}

export default commentsSlice.reducer;