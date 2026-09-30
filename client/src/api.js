import axios from 'axios';

const http = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getHistory = () => http.get('/history').then((r) => r.data);

export const sendChat = (prompt, systemPrompt) =>
  http.post('/chat', { prompt, systemPrompt }).then((r) => r.data);

export const removeChat = (id) => http.delete(`/delete-chat/${id}`);
