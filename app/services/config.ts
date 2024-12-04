import { tokenStorage } from './tokenStorage';

export const API_URL = 'http://127.0.0.1:8000';

export const getHeaders = async () => {
  return {
    'Content-Type': 'application/json'
  };
}; 