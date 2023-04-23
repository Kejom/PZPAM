import { createSlice } from "@reduxjs/toolkit";
import { deletePhoto, getPhotosByAlbumId, postPhoto, putPhoto } from "../clients/jsonPlaceholderClient";

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        data: []
    },
    reducers: {
        setPhotos: (state, action) => { state.data = [...action.payload, ...state.data] },
        addPhoto: (state, action) => { state.data.push(action.payload) },
        removePhoto: (state, action) => { state.data = state.data.filter(a => a.id !== action.payload) },
        updatePhoto: (state, action) => {
            let index = state.data.findIndex(p => p.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export function InitPhotos(albumId){
    return async function(dispatch, getState){
        const photos = await getPhotosByAlbumId(albumId);
        dispatch(photosSlice.actions.setPhotos(photos));
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
        const updatedPhoto = await putPhoto();
        dispatch(photosSlice.actions.updatePhoto(updatedPhoto));
    }
}

export default photosSlice.reducer;