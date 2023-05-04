import { createSlice } from "@reduxjs/toolkit";
import { deletePost, getPosts, postPost, putPost } from "../clients/jsonPlaceholderClient";
import { setShowLoading } from "./appState";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: []
    },
    reducers: {
        setPosts: (state, action) => { state.data = action.payload },
        addPost: (state, action) => { state.data.unshift(action.payload) },
        removePost: (state, action) => { state.data = state.data.filter(a => a.id !== action.payload) },
        updatePost: (state, action) => {
            let index = state.data.findIndex(p => p.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export function initPosts(){
    return async function(dispatch, getState){
        dispatch(setShowLoading(true));
        const posts = await getPosts();
        dispatch(postsSlice.actions.setPosts(posts));
        dispatch(setShowLoading(false));
    }
}

export function addPost(post){
    return async function(dispatch, getState){
        const addedPost = await postPost(post);
        dispatch(postsSlice.actions.addPost(addedPost));
    }
}

export function removePost(id){
    return async function(dispatch, getState){
        await deletePost(id);
        dispatch(postsSlice.actions.removePost(id));
    }
}

export function updatePost(post){
    return async function(dispatch, getState){
        //const updatedpost = await putPost(post);
        dispatch(postsSlice.actions.updatePost(post));
    }
}

export default postsSlice.reducer;