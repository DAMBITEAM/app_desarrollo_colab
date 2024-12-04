import React, { useState } from 'react';
import { View, Text, TextInput, Image, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import CustomButton from '../../components/button/CustomButton';
import { authServices } from '../services/authServices';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor ingrese usuario y contraseña');
      return;
    }

    setLoading(true);
    try {
      console.log('Intentando login con:', username);
      const response = await authServices.login(username, password);
      console.log('Login exitoso:', response);
      navigation.navigate('Home');
    } catch (error: any) {
      console.error('Error en login:', error);
      Alert.alert('Error', error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100 items-center justify-center px-5 mt-50`}>
      <Image
        source={require('../../assets/image1.png')}
        style={tw`w-40 h-40 mb-8`}
        resizeMode="contain"
      />
      <TextInput
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#888"
        style={tw`w-4/5 h-12 bg-white rounded-md px-4 mb-4 border border-gray-300 shadow-sm`}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#888"
        style={tw`w-4/5 h-12 bg-white rounded-md px-4 mb-4 border border-gray-300 shadow-sm`}
        secureTextEntry
      />
      <CustomButton
        content={loading ? "Cargando..." : "Iniciar sesión"}
        onPress={handleLogin}
        textColor="white"
        backgroundColor="blue-700"
        borderColor="blue-700"
        width="auto"
        height="12"
        disabled={loading}
      />
    </View>
  );
};

export default LoginScreen;
