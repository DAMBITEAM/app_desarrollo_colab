import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import GlobalActionButton from '../../components/GlobalActionButton';

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  return (
    <View style={tw`flex-1 bg-gray-100 items-center px-5`}>
      <GlobalActionButton navigation={navigation} />
      {/* Imagen del logo */}
      <Image
        source={require('../../assets/image1.png')}
        style={tw`w-40 h-40 mt-10`}
        resizeMode="contain"
      />

      {/* Texto debajo del logo */}
      <Text style={tw`text-red-500 text-lg font-semibold mt-4`}>
        Este es un portal exclusivo para administradores
      </Text>

      {/* Contenedor de botones */}
      <View style={tw`mt-10 w-full items-center`}>
        {/* Botón de Alumnos */}
        <TouchableOpacity
          style={tw`bg-blue-700 py-3 px-10 rounded-lg shadow-md mb-4 w-4/5`}
          onPress={() => navigation.navigate('Students')}
        >
          <Text style={tw`text-white text-center font-bold text-base`}>Alumnos</Text>
        </TouchableOpacity>

        {/* Botón de Materias */}
        <TouchableOpacity
          style={tw`bg-blue-700 py-3 px-10 rounded-lg shadow-md mb-4 w-4/5`}
          onPress={() => navigation.navigate('Subjects')}
        >
          <Text style={tw`text-white text-center font-bold text-base`}>Materias</Text>
        </TouchableOpacity>

        {/* Botón de Inscripción */}
        <TouchableOpacity
          style={tw`bg-blue-700 py-3 px-10 rounded-lg shadow-md mb-4 w-4/5`}
          onPress={() => navigation.navigate('Inscription')}
        >
          <Text style={tw`text-white text-center font-bold text-base`}>Inscripción de materias</Text>
        </TouchableOpacity>

        {/* Botón de Calificaciones */}
        <TouchableOpacity
          style={tw`bg-blue-700 py-3 px-10 rounded-lg shadow-md w-4/5`}
          onPress={() => navigation.navigate('Grades')}
        >
          <Text style={tw`text-white text-center font-bold text-base`}>Calificaciones</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
