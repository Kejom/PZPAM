import { createSlice } from "@reduxjs/toolkit";
import { deletePhoto, getPhotos, postPhoto, putPhoto } from "../clients/jsonPlaceholderClient";
import { setShowLoading } from "./appState";

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        data: []
    },
    reducers: {
        setPhotos: (state, action) => { state.data = action.payload},
        addPhoto: (state, action) => { state.data.unshift(action.payload) },
        removePhoto: (state, action) => { state.data = state.data.filter(a => a.id !== action.payload) },
        removeByAlbumId: (state, action) => {state.data = state.data.filter(a => a.albumId !== action.payload)},
        updatePhoto: (state, action) => {
            let index = state.data.findIndex(p => p.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export function initPhotos(){
    return async function(dispatch, getState){
        dispatch(setShowLoading(true));
        const photos = await getPhotos();
        dispatch(photosSlice.actions.setPhotos(photos));
        dispatch(setShowLoading(false));
    }
}

export function addPhoto(photo){
    return async function(dispatch, getState){
        const addedPhoto = await postPhoto(photo);
        dispatch(photosSlice.actions.addPhoto(addedPhoto));
    }
}

export function removePhoto(id){
    return async function(dispatch, getState){
        await deletePhoto(id);
        dispatch(photosSlice.actions.removePhoto(id));
    }
}

export function updatePhoto(photo){
    return async function(dispatch, getState){
        //const updatedPhoto = await putPhoto(photo);
        dispatch(photosSlice.actions.updatePhoto(photo));
    }
}

export const removePhotosByAlbumId = photosSlice.actions.removeByAlbumId; 

export default photosSlice.reducer;