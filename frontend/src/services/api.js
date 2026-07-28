import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('prm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const unwrap = (response) => response.data?.data ?? response.data;

export const authApi = {
  login: (payload) => client.post('/auth/login', payload).then(unwrap),
  register: (payload) => client.post('/auth/register', payload).then(unwrap),
  forgotPassword: (payload) => client.post('/auth/forgot-password', payload).then(unwrap),
  resetPassword: (payload) => client.post('/auth/reset-password', payload).then(unwrap),
  logout: () => client.post('/auth/logout').then(unwrap)
};

export const propertyApi = {
  list: (params) => client.get('/properties', { params }).then(unwrap),
  details: (id) => client.get(`/properties/${id}`).then(unwrap),
  create: (payload) => client.post('/properties', payload).then(unwrap),
  update: (id, payload) => client.put(`/properties/${id}`, payload).then(unwrap),
  remove: (id) => client.delete(`/properties/${id}`).then(unwrap),
  uploadImages: (id, formData) => client.post(`/properties/${id}/images`, formData).then(unwrap)
};

export const bookingApi = {
  create: (payload) => client.post('/bookings', payload).then(unwrap),
  mine: (params) => client.get('/bookings/me', { params }).then(unwrap),
  all: (params) => client.get('/bookings', { params }).then(unwrap),
  cancel: (id) => client.patch(`/bookings/${id}/cancel`).then(unwrap),
  updateStatus: (id, payload) => client.patch(`/bookings/${id}/status`, payload).then(unwrap)
};

export const favouriteApi = {
  list: (params) => client.get('/favourites', { params }).then(unwrap),
  add: (propertyId) => client.post(`/favourites/${propertyId}`).then(unwrap),
  remove: (propertyId) => client.delete(`/favourites/${propertyId}`).then(unwrap)
};

export const notificationApi = {
  list: (params) => client.get('/notifications', { params }).then(unwrap),
  unreadCount: () => client.get('/notifications/unread-count').then(unwrap),
  markRead: (id) => client.patch(`/notifications/${id}/read`).then(unwrap)
};

export const referenceApi = {
  categories: () => client.get('/categories').then(unwrap),
  propertyTypes: () => client.get('/property-types').then(unwrap),
  amenities: () => client.get('/amenities').then(unwrap),
  createCategory: (payload) => client.post('/categories', payload).then(unwrap),
  updateCategory: (id, payload) => client.put(`/categories/${id}`, payload).then(unwrap),
  deleteCategory: (id) => client.delete(`/categories/${id}`).then(unwrap),
  createPropertyType: (payload) => client.post('/property-types', payload).then(unwrap),
  updatePropertyType: (id, payload) => client.put(`/property-types/${id}`, payload).then(unwrap),
  deletePropertyType: (id) => client.delete(`/property-types/${id}`).then(unwrap),
  createAmenity: (payload) => client.post('/amenities', payload).then(unwrap),
  updateAmenity: (id, payload) => client.put(`/amenities/${id}`, payload).then(unwrap),
  deleteAmenity: (id) => client.delete(`/amenities/${id}`).then(unwrap)
};

export const userApi = {
  me: () => client.get('/users/me').then(unwrap),
  updateProfile: (payload) => client.put('/users/me', payload).then(unwrap),
  uploadAvatar: (formData) => client.post('/users/me/avatar', formData).then(unwrap)
};

export const ownerApi = {
  dashboard: () => client.get('/owner/dashboard').then(unwrap),
  properties: (params) => client.get('/owner/properties', { params }).then(unwrap),
  bookings: (params) => client.get('/owner/bookings', { params }).then(unwrap)
};

export const adminApi = {
  dashboard: () => client.get('/admin/dashboard').then(unwrap),
  reports: () => client.get('/admin/reports').then(unwrap),
  users: (params) => client.get('/admin/users', { params }).then(unwrap),
  setUserStatus: (id, enabled) => client.patch(`/admin/users/${id}/status`, null, { params: { enabled } }).then(unwrap),
  properties: (params) => client.get('/admin/properties', { params }).then(unwrap),
  bookings: (params) => client.get('/admin/bookings', { params }).then(unwrap)
};
