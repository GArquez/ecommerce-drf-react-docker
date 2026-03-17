import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const ApiUrl = axios.create({
    baseURL: `${BASE_URL}/api/`,
})

export const getProducts = () => {
    return ApiUrl.get('/products/')
}

export const productsCategory = () => {
    return ApiUrl.get('/categories/')
}

export const createOrder = (order) => {
    return ApiUrl.post('/orders/', order)
}