import axios from 'axios'

export const userApi = axios.create({
    baseURL : 'http://localhost:3002'
})

export const adminApi = axios.create({
    baseURL : 'http://localhost:3002/admin'
})