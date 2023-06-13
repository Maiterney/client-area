import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'nextAuth.token': token } = parseCookies()

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'content-type': 'application/json'
    }
})

if(token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}