import { createSlice } from "@reduxjs/toolkit";

const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        data: []
    },
    reducers: {
        setAlbums: (state, action) => { state.data = [...action.payload, ...state.data] },
        addAlbum: (state, action) => { state.data.push(action.payload) },
        removeAlbum: (state, action) => { state.data = state.data.filter(a => a.id !== action.payload) },
        updateAlbum: (state, action) => {
            let index = state.data.findIndex(a => a.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export const setAlbums = albumsSlice.actions.setAlbums;
export const addAlbum = albumsSlice.actions.addAlbum;
export const updateAlbum = albumsSlice.actions.updateAlbum;
export const removeAlbum = albumsSlice.actions.removeAlbum;

export default albumsSlice.reducer;