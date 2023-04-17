import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from './albums'
import photosReducer from './photos'
import postsReducer from './posts'
import usersReducer from './users'

export const store = configureStore({
    reducer:{
        albums: albumsReducer,
        photos: photosReducer,
        posts: postsReducer,
        users: usersReducer
    }
});