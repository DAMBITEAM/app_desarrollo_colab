import AsyncStorage from '@react-native-async-storage/async-storage';

export const tokenStorage = {
  async setToken(token: string) {
    await AsyncStorage.setItem('userToken', token);
  },

  async getToken() {
    return await AsyncStorage.getItem('userToken');
  },

  async removeToken() {
    await AsyncStorage.removeItem('userToken');
  }
}; 