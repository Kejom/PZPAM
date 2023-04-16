import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from './albums'
import photosReducer from './photos'

export const store = configureStore({
    reducer:{
        albums: albumsReducer,
        photos: photosReducer
    }
});