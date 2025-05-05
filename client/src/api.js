import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

export const getPets = () => api.get('/pets');
export const getOwners = () => api.get('/owners');
export const createPet = (data) => api.post('/pets', data);
export const createOwner = (data) => api.post('/owners', data);
