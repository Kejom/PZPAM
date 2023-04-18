import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: []
    },
    reducers: {
        setComments: (state, action) => {state.data = action.payload},
        addComment: (state, action) => {state.data.push(action.payload)},
        removeComment: (state, action) => {state.data = state.data.filter(a => a.id !== action.payload)},
        updateComment: (state, action) => {
            let index = state.data.findIndex(c => c.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export const setComments = commentsSlice.actions.setComments;
export const addComment = commentsSlice.actions.addComment;
export const updateComment = commentsSlice.actions.updateComment;
export const removeComment = commentsSlice.actions.removeComment;

export default commentsSlice.reducer;