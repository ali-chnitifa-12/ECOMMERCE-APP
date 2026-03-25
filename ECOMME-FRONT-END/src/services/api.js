
import axios from 'axios';

// Create Axios instance with base URL for Laravel API
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor: attach Bearer token to all requests
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Response interceptor: handle 401 Unauthorized errors
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login if not already there
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

// Auth API Calls
export const login = async (email, password) => {
    return await api.post('/login', { email, password });
};

export const register = async (name, email, password) => {
    return await api.post('/register', { name, email, password });
};

export const logout = async () => {
    return await api.post('/logout');
};

export const getCurrentUser = async () => {
    return await api.get('/me');
};

// Product CRUD (Now using real API endpoints)
export const getProducts = async () => {
    return await api.get('/products');
};

export const getProduct = async (id) => {
    return await api.get(`/products/${id}`);
};

export const createProduct = async (productData) => {
    return await api.post('/products', productData);
};

export const updateProduct = async (id, productData) => {
    return await api.put(`/products/${id}`, productData);
};

export const deleteProduct = async (id) => {
    return await api.delete(`/products/${id}`);
};

export default api;
