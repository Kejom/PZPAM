import { configureStore } from "@reduxjs/toolkit";
import albumsReducer from './albums'

export const store = configureStore({
    reducer:{
        albums: albumsReducer
    }
});