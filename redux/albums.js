import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAlbums, postAlbum, deleteAlbum, putAlbum } from "../clients/jsonPlaceholderClient";
import { removePhotosByAlbumId } from "./photos";
import { setShowLoading } from "./appState";

const albumsSlice = createSlice({
    name: 'albums',
    initialState: {
        data: []
    },
    reducers: {
        setAlbums: (state, action) => { state.data = action.payload },
        addAlbum: (state, action) => { state.data.unshift(action.payload) },
        removeAlbum: (state, action) => { state.data = state.data.filter(a => a.id !== action.payload) },
        updateAlbum: (state, action) => {
            let index = state.data.findIndex(a => a.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export function initAlbums(){
    return async function(dispatch, getState){
        dispatch(setShowLoading(true));
        const albums = await getAlbums();
        dispatch(albumsSlice.actions.setAlbums(albums));
        dispatch(setShowLoading(false));
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
        dispatch(removePhotosByAlbumId(id));
        dispatch(albumsSlice.actions.removeAlbum(id));
    }
}

export function updateAlbum(album){
    return async function(dispatch, getState){
        //await putAlbum(album);
        dispatch(albumsSlice.actions.updateAlbum(album));
    }
}

export default albumsSlice.reducer;