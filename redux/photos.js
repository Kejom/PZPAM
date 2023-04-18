import { createSlice } from "@reduxjs/toolkit";

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

export const setPhotos = photosSlice.actions.setPhotos;
export const addPhoto = photosSlice.actions.addPhoto;
export const updatePhoto = photosSlice.actions.updatePhoto;
export const removePhoto = photosSlice.actions.removePhoto;

export default photosSlice.reducer;