import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAlbums, postAlbum, deleteAlbum, putAlbum } from "../clients/jsonPlaceholderClient";

const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        data: []
    },
    reducers: {
        setAlbums: (state, action) => { state.data = action.payload },
        addAlbum: (state, action) => { state.data.push(action.payload) },
        removeAlbum: (state, action) => { state.data = state.data.filter(a => a.id !== action.payload) },
        updateAlbum: (state, action) => {
            let index = state.data.findIndex(a => a.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export function initAlbums(){
    return async function(dispatch, getState){
        const albums = await getAlbums();
        dispatch(albumsSlice.actions.setAlbums(albums));
    }
}

export function addAlbum(album){
    return async function(dispatch, getState){
        const addedAlbum = await postAlbum(album);
        dispatch(albumsSlice.actions.addAlbum(album));
    }
}

export function removeAlbum(id){
    return async function(dispatch, getState){
        await deleteAlbum(id);
        dispatch(albumsSlice.actions.removeAlbum(id));
    }
}

export function updateAlbum(album){
    return async function(dispatch, getState){
        await putAlbum(album);
        dispatch(albumsSlice.actions.updateAlbum(album));
    }
}

export default albumsSlice.reducer;