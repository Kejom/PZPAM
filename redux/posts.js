import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: []
    },
    reducers: {
        setPosts: (state, action) => { state.data = [...state.data, ...action.payload] },
        addPost: (state, action) => { state.data.push(action.payload) },
        removePost: (state, action) => { state.data = state.data.filter(a => a.id !== action.payload) },
        updatePost: (state, action) => {
            let index = state.data.findIndex(p => p.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export const setPosts = postsSlice.actions.setPosts;
export const addPost = postsSlice.actions.addPost;
export const updatePost = postsSlice.actions.updatePost;
export const removePost = postsSlice.actions.removePost;

export default postsSlice.reducer;