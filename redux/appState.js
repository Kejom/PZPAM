import { createSlice } from "@reduxjs/toolkit";

const appStateSlice = createSlice({
    name: 'appState',
    initialState: {
        showLoading: false,
    },
    reducers: {
        setShowLoading: (state, action) => {state.showLoading = action.payload}
    }
})

export const setShowLoading = appStateSlice.actions.setShowLoading;

export default appStateSlice.reducer;