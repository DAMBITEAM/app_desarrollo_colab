import { API_URL } from './config';
import { tokenStorage } from './tokenStorage';

export const authServices = {
  login: async (username: string, password: string) => {
    try {
      // El backend espera los datos en formato x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error en la autenticación');
      }

      const data = await response.json();
      // Guarda el token completo incluyendo el tipo
      await tokenStorage.setToken(`Bearer ${data.access_token}`);
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },

  logout: async () => {
    await tokenStorage.removeToken();
  }
}; 