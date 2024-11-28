import React from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import CustomButton from '../../components/button/CustomButton';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={tw`flex-1 bg-gray-100 items-center justify-center px-5 mt-50`}>
      {/* Logo */}
      <Image
        source={require('../../assets/image1.png')}
        style={tw`w-40 h-40 mb-8`}
        resizeMode="contain"
      />

      {/* Inputs */}
      <TextInput
        placeholder="Usuario"
        placeholderTextColor="#888"
        style={tw`w-4/5 h-12 bg-white rounded-md px-4 mb-4 border border-gray-300 shadow-sm`}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#888"
        style={tw`w-4/5 h-12 bg-white rounded-md px-4 mb-4 border border-gray-300 shadow-sm`}
        secureTextEntry
      />

      {/* Botón */}
      <CustomButton
        content="Iniciar sesión"
        onPress={() => navigation.navigate('Home')} // Navegar a la vista "Home"
        textColor="white"
        backgroundColor="blue-700"
        borderColor="blue-700"
        width="auto"
        height="12"
        disabled={false}
      />
    </View>
  );
};

export default LoginScreen;
