import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import albumsReducer from './albums'
import photosReducer from './photos'
import postsReducer from './posts'
import usersReducer from './users'
import commentsReducer from './comments'
import appStateReducer from './appState'

export const store = configureStore({
    reducer:{
        albums: albumsReducer,
        comments: commentsReducer,
        photos: photosReducer,
        posts: postsReducer,
        users: usersReducer,
        appState: appStateReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })
});