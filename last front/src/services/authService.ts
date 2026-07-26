import { User } from '../types/user';

const API_BASE = 'http://localhost:5000/api';

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
};

export const verifyToken = async (token: string) => {
  const response = await fetch(`${API_BASE}/auth/verify`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-auth-token': token
    }
  });

  if (!response.ok) {
    throw new Error('Token verification failed');
  }

  return await response.json();
};
