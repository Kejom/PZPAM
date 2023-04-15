import { createSlice } from "@reduxjs/toolkit";

const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        albumsData: []
    },
    reducers: {
        setAlbums: (state, action) => {state.albumsData = action.payload},
        addAlbum: (state, action) => {state.albumsData.push(action.payload)},
        removeAlbum: (state, action) => {state.albumsData = state.albumsData.filter(a => a.id !== action.payload)}
    }
})

export const setAlbums = albumsSlice.actions.setAlbums;
export const addAlbum = albumsSlice.actions.addAlbum;
export const removeAlbum = albumsSlice.actions.removeAlbum;

export default albumsSlice.reducer;