import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import tw from 'twrnc';
import GlobalActionButton from '../../components/GlobalActionButton';
import { NavigationProp } from '@react-navigation/native';
import { studentServices } from '../services/api';
import { Student } from '../types';

const StudentsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [students, setStudents] = useState<Student[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>({
    matricula: '',
    nombre: '',
    apellido: '',
    email: '',
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await studentServices.getAll();
      setStudents(data);
    } catch (error) {
      console.error('Error loading students:', error);
      Alert.alert('Error', 'No se pudieron cargar los estudiantes');
    }
  };

  const handleSaveStudent = async () => {
    try {
      if (editMode) {
        await studentServices.update(selectedStudent.id, selectedStudent);
      } else {
        await studentServices.create(selectedStudent);
      }
      loadStudents();
      setModalVisible(false);
    } catch (error) {
      console.error('Error saving student:', error);
      Alert.alert('Error', 'No se pudo guardar el estudiante');
    }
  };

  return (
    <View style={tw`flex-1 bg-gray-100 px-5`}>
      <GlobalActionButton navigation={navigation} />
      {/* Header */}
      <View style={tw`flex-row items-center mb-6 mt-4`}>
        <Image
          source={require('../../assets/image1.png')}
          style={tw`w-20 h-20 mr-4`}
          resizeMode="contain"
        />
        <Text style={tw`text-xl font-bold`}>Alumnos registrados</Text>
      </View>

      {/* Tabla de Alumnos */}
      <View style={tw`bg-gray-200 rounded-lg p-4 shadow-md`}>
        <FlatList
          data={students}
          keyExtractor={(item) => item.id || item.matricula}
          renderItem={({ item }) => (
            <View
              style={tw`flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-2`}
            >
              <Text style={tw`text-base`}>{`${item.matricula} - ${item.nombre} ${item.apellido} ${item.email}`}</Text>
              <View style={tw`flex-row`}>
                <TouchableOpacity
                  style={tw`bg-blue-700 rounded-lg px-3 py-1 mr-2`}
                  onPress={() => {
                    setSelectedStudent(item);
                    setEditMode(true);
                    setModalVisible(true);
                  }}
                >
                  <Text style={tw`text-white font-bold`}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw`bg-red-700 rounded-lg px-3 py-1`}
                  onPress={() =>
                    setStudents((prev) => prev.filter((student) => student.id !== item.id))
                  }
                >
                  <Text style={tw`text-white font-bold`}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* Botón para añadir alumnos */}
      <TouchableOpacity
        style={tw`mt-6 bg-blue-700 rounded-lg p-3 shadow-md self-center`}
        onPress={() => {
          setSelectedStudent({
            matricula: '',
            nombre: '',
            apellido: '',
            email: '',
          });
          setEditMode(false);
          setModalVisible(true);
        }}
      >
        <Text style={tw`text-white font-bold`}>Añadir alumno</Text>
      </TouchableOpacity>

      {/* Modal para añadir/editar alumno */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white rounded-lg p-6 w-4/5 shadow-lg`}>
            <Text style={tw`text-xl font-bold mb-4`}>
              {editMode ? 'Editar Alumno' : 'Añadir Alumno'}
            </Text>
            {['matricula', 'nombre', 'apellido', 'email'].map(
              (field, index) => (
                <View key={index}>
                  <Text style={tw`text-xl mb-2 capitalize`}>{field}</Text>
                  <TextInput
                    placeholder={field}
                    style={tw`border border-gray-300 rounded-md p-2 mb-4`}
                    value={selectedStudent[field] || ''}
                    onChangeText={(text) =>
                      setSelectedStudent((prev: any) => ({
                        ...prev,
                        [field]: text,
                      }))
                    }
                  />
                </View>
              )
            )}
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-red-500 rounded-lg px-4 py-2`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={tw`text-white font-bold`}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-blue-700 rounded-lg px-4 py-2`}
                onPress={handleSaveStudent}
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
};

export default StudentsScreen;
