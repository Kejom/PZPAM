import { createSlice } from "@reduxjs/toolkit";
import { ToastAndroid } from "react-native";
import { deleteUser, getUsers, postUser, putUser } from "../clients/jsonPlaceholderClient";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loggedUserId: null
    },
    reducers: {
        setUsers: (state, action) => { state.data = action.payload },
        addUser: (state, action) => { state.data.push(action.payload) },
        removeUser: (state, action) => { state.data = state.data.filter(a => a.id !== action.payload) },
        setLoggedUser: (state, action) => { state.loggedUserId = action.payload },
        logOutUser: (state, action) => {state.loggedUserId = null},
        updateUser: (state, action) => {
            let index = state.data.findIndex(u => u.id === action.payload.id);
            state.data[index] = action.payload;
        },
    }
})

export function initUsers() {
    return async function (dispatch, getState) {
        const users = await getUsers();
        dispatch(usersSlice.actions.setUsers(users));
    }
}

export function addUser(user) {
    return async function (dispatch, getState) {
        const newUser = await postUser(user);
        dispatch(usersSlice.actions.addUser(newUser));
    }
}

export function removeUser(id) {
    return async function (dispatch, getState) {
        await deleteUser(id);
        dispatch(usersSlice.actions.removeUser(user));
    }
}

export function updateUser(user) {
    return async function (dispatch, getState) {
        //const updatedUser = await putUser(user);
        dispatch(usersSlice.actions.updateUser(user));
    }
}

export function registerUser(user){
    return async function (dispatch, getState){
        await dispatch(addUser(user));
        await dispatch(setLoggedUser(user.username));

    }
}

export function setLoggedUser(login) {
    return async function (dispatch, getState) {
        const state = getState();
        const user = state.users.data.find(u => u.username === login)

        if (user)
            dispatch(usersSlice.actions.setLoggedUser(user.id));
        else
            ToastAndroid.showWithGravity("Podano niepoprawną nazwę użytkownika albo hasło", ToastAndroid.LONG, ToastAndroid.TOP)
    }
}

export const logoutUser = usersSlice.actions.logOutUser;

export default usersSlice.reducer;