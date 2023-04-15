import axios from "axios";

const API_URL = 'https://jsonplaceholder.typicode.com'

export async function getAlbums(){
    const response = await axios.get(API_URL + '/albums')
    return response.data;
}