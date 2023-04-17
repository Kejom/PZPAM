import { createSlice } from "@reduxjs/toolkit";

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        data: []
    },
    reducers: {
        setPhotos: (state, action) => {state.data = [...action.payload, ...state.data]},
        addPhoto: (state, action) => {state.data.push(action.payload)},
        updatePhoto: (state, action) => {state.data = [...state.data, action.payload]},
        removePhoto: (state, action) => {state.data = state.data.filter(a => a.id !== action.payload)}
    }
})

export const setPhotos = photosSlice.actions.setPhotos;
export const addPhoto = photosSlice.actions.addPhoto;
export const updatePhoto = photosSlice.actions.updatePhoto;
export const removePhoto = photosSlice.actions.removePhoto;

export default photosSlice.reducer;