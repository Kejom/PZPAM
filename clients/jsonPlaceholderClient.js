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
    console.log(response.data);
    return response.data;
}

export async function putUser(user){
    const response = await axios.put(API_URL + `/users/${user.id}`, user);
    return response.data;
}

export async function deleteUser(id){
    await axios.delete(API_URL + `/users/${id}`);
}

export async function getPosts(){
    const response = await axios.get(API_URL + '/posts');
    return response.data;
}

export async function postPost(post){
    const response = await axios.post(API_URL + '/posts', post);
    return response.data;
}

export async function putPost(post){
    const response = await axios.put(API_URL + `/posts/${post.id}`, post);
    return response.data;
}

export async function deletePost(postId){
    await axios.delete(API_URL  + `/posts/${postId}`);
}

export async function getComments(){
    const response = await axios.get(API_URL + '/comments');
    return response.data;
}

export async function getCommentsByPostId(postId){
    const response = await axios.get(API_URL + `/post/${postId}/comments`);
    return response.data;
}

export async function postComment(comment){
    const response = await axios.post(API_URL + '/comments', comment);
    return response.data;
}

export async function putComment(comment){
    const response = await axios.put(API_URL + `/comments/${comment.id}`, comment);
    return response.data;
}

export async function deleteComment(commentId){
    await axios.delete(API_URL + `/comments/${comment.id}`)
}