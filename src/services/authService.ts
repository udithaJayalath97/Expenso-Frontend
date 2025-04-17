import { LoginRequest, LoginResponse } from '../types/auth';

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const res = await fetch('http://your-api-url/api/auth/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'Login failed');
  }

  return await res.json();
};
