import axios from 'axios'
export const apiInstance = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})