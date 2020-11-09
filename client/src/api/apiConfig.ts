import axios from 'axios'
export const axiosInstanceChuckNorris = axios.create({
    baseURL: 'https://api.chucknorris.io/jokes',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
})
