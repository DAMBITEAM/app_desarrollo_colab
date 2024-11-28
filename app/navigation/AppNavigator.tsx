import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importa tus pantallas
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import StudentsScreen from '../screens/StudentsScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import InscriptionScreen from '../screens/InscriptionScreen';
import GradesScreen from '../screens/GradesScreen';
import GlobalActionButton from '../../components/GlobalActionButton';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login" // Primera pantalla que se mostrará
        screenOptions={{
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Iniciar Sesión', headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen
          name="Students"
          component={StudentsScreen}
          options={{ title: 'Estudiantes' }}
        />
        <Stack.Screen
          name="Subjects"
          component={SubjectsScreen}
          options={{ title: 'Materias' }}
        />
        <Stack.Screen
          name="Inscription"
          component={InscriptionScreen}
          options={{ title: 'Inscripción' }}
        />
        <Stack.Screen
          name="Grades"
          component={GradesScreen}
          options={{ title: 'Calificaciones' }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
