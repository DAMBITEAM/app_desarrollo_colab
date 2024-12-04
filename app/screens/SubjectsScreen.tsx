import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { subjectServices } from '../services/api';
import { Subject } from '../types';
import GlobalActionButton from '../../components/GlobalActionButton';
import { NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';

export default function SubjectsScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject>({
    codigo: '',
    nombre: '',
    creditos: 0,
  });

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await subjectServices.getAll();
      setSubjects(data);
    } catch (error) {
      console.error('Error loading subjects:', error);
      Alert.alert('Error', 'No se pudieron cargar las materias');
    }
  };

  const handleSaveSubject = async () => {
    try {
      if (!selectedSubject.codigo || !selectedSubject.nombre) {
        Alert.alert('Error', 'Por favor completa todos los campos.');
        return;
      }

      if (editMode && selectedSubject.id) {
        await subjectServices.update(selectedSubject.id, selectedSubject);
      } else {
        await subjectServices.create(selectedSubject);
      }
      loadSubjects();
      setModalVisible(false);
      resetForm();
    } catch (error) {
      console.error('Error saving subject:', error);
      Alert.alert('Error', 'No se pudo guardar la materia');
    }
  };

  const handleDeleteSubject = async (id: string) => {
    try {
      await subjectServices.delete(id);
      loadSubjects();
    } catch (error) {
      console.error('Error deleting subject:', error);
      Alert.alert('Error', 'No se pudo eliminar la materia');
    }
  };

  const resetForm = () => {
    setSelectedSubject({
      codigo: '',
      nombre: '',
      creditos: 0,
    });
    setEditMode(false);
  };

  return (
    <View style={tw`flex-1 bg-gray-100 px-5`}>
      <GlobalActionButton navigation={navigation} />

      <View style={tw`flex-row items-center mb-6 mt-4`}>
        <Image
          source={require('../../assets/image1.png')}
          style={tw`w-20 h-20 mr-4`}
          resizeMode="contain"
        />
        <Text style={tw`text-xl font-bold`}>Materias registradas</Text>
      </View>

      <View style={tw`bg-gray-200 rounded-lg p-4 shadow-md`}>
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id || ''}
          renderItem={({ item }) => (
            <View style={tw`flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-2`}>
              <Text style={tw`text-base`}>{`${item.codigo} - ${item.nombre}`}</Text>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`bg-blue-700 rounded-lg px-4 py-1 mr-2`}
                  onPress={() => {
                    setSelectedSubject(item);
                    setEditMode(true);
                    setModalVisible(true);
                  }}
                >
                  <Text style={tw`text-white font-bold`}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`bg-red-700 rounded-lg px-3 py-1`}
                  onPress={() => handleDeleteSubject(item.id!)}
                >
                  <Text style={tw`text-white font-bold`}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={tw`mt-6 bg-blue-700 rounded-lg p-3 shadow-md self-center`}
        onPress={() => {
          resetForm();
          setModalVisible(true);
        }}
      >
        <Text style={tw`text-white font-bold`}>Añadir materia</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white rounded-lg p-6 w-4/5 shadow-lg`}>
            <Text style={tw`text-xl font-bold mb-4`}>
              {editMode ? 'Editar Materia' : 'Añadir Materia'}
            </Text>
            <Text style={tw`text-xl mb-2`}>Código de la Materia</Text>
            <TextInput
              placeholder="Código de la materia"
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              value={selectedSubject.codigo}
              onChangeText={(text) =>
                setSelectedSubject((prev) => ({ ...prev, codigo: text }))
              }
            />
            <Text style={tw`text-xl mb-2`}>Nombre de la Materia</Text>
            <TextInput
              placeholder="Nombre de la materia"
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              value={selectedSubject.nombre}
              onChangeText={(text) =>
                setSelectedSubject((prev) => ({ ...prev, nombre: text }))
              }
            />
            <Text style={tw`text-xl mb-2`}>Créditos</Text>
            <TextInput
              placeholder="Créditos"
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              keyboardType="numeric"
              value={selectedSubject.creditos.toString()}
              onChangeText={(text) =>
                setSelectedSubject((prev) => ({ ...prev, creditos: parseInt(text) || 0 }))
              }
            />
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-red-500 rounded-lg px-4 py-2`}
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}
              >
                <Text style={tw`text-white font-bold`}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-blue-700 rounded-lg px-4 py-2`}
                onPress={handleSaveSubject}
              >
                <Text style={tw`text-white font-bold`}>
                  {editMode ? 'Guardar Cambios' : 'Guardar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
