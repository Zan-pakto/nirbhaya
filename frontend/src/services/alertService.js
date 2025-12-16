import api from './api';

export const createAlert = async (alertData) => {
  const response = await api.post('/alerts', alertData);
  return response.data;
};

export const getMyAlerts = async () => {
  const response = await api.get('/alerts/my-alerts');
  return response.data;
};

export const getAllAlerts = async () => {
  const response = await api.get('/alerts');
  return response.data;
};

export const resolveAlert = async (alertId, status, notes) => {
  const response = await api.put(`/alerts/${alertId}/resolve`, { status, notes });
  return response.data;
};

