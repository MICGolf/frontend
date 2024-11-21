import axios from 'axios';

axios.defaults.withCredentials = true;

export const client = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
