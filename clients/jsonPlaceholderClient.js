import axios from "axios";

const API_URL = 'https://jsonplaceholder.typicode.com';

export async function getAlbums(){
    const response = await axios.get(API_URL + '/albums');
    return response.data;
}

export async function postAlbum(album){
    const response = await axios.post(API_URL + '/albums', album);
    return response.data;
}

export async function putAlbum(album){
    const response = await axios.put(API_URL + `/albums/${album.id}`, album);
    return response.data;
}

export async function deleteAlbum(id){
    await axios.delete(API_URL + `/albums/${id}`);
}

export async function getPhotos(){
    const response = await axios.get(API_URL + '/photos');
    return response.data;
}

export async function getPhotosByAlbumId(albumId){
    const response = await axios.get(API_URL + `/photos?albumId=${albumId}`)
    return response.data;
}

export async function postPhoto(photo){
    const response = await axios.post(API_URL + '/photos', photo);
    return response.data;
}

export async function putPhoto(photo){
    const response = await axios.put(API_URL + `/photos/${photo.id}`, photo);
    return response.data;
}

export async function deletePhoto(id){
    await axios.delete(API_URL + `/photos/${id}`);
}

export async function getUsers(){
    const response = await axios.get(API_URL + '/users');
    return response.data;
}

export async function getUserById(id){
    const response = await axios.get(API_URL + `/users?id=${id}`);
    return response.data.length > 0? response.data[0] : null;
}

export async function getUserByUsername(username){
    const response = await axios.get(API_URL + `/users?username=${username}`);
    return response.data.length > 0? response.data[0] : null;
}

export async function postUser(user){
    const response = await axios.post(API_URL + '/users', user);
    return response.data;
}

export async function putUser(user){
    const response = await axios.put(API_URL + `/users/${user.id}`, user);
    return response.data;
}

export async function deleteUser(id){
    await axios.delete(API_URL + `/users/${id}`);
}