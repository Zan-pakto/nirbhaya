import api from './api';

export const getProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

export const updateProfile = async (userData) => {
  const response = await api.put('/users/profile', userData);
  return response.data;
};

export const addTrustedContact = async (contactData) => {
  const response = await api.post('/users/trusted-contacts', contactData);
  return response.data;
};

export const removeTrustedContact = async (contactId) => {
  const response = await api.delete(`/users/trusted-contacts/${contactId}`);
  return response.data;
};

