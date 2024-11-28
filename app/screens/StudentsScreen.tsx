import React, { useState } from 'react';
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

const StudentsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [students, setStudents] = useState([
    {
      id: '1',
      matricula: '73071',
      name: 'Alejandro',
      apellidoPaterno: 'Díaz',
      apellidoMaterno: 'B',
      correo: 'alejandro.diaz@example.com',
    },
    {
      id: '2',
      matricula: '73072',
      name: 'María',
      apellidoPaterno: 'López',
      apellidoMaterno: 'C',
      correo: 'maria.lopez@example.com',
    },
    {
      id: '3',
      matricula: '73073',
      name: 'Carlos',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'D',
      correo: 'carlos.perez@example.com',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>({
    matricula: '',
    name: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
  });

  const handleSaveStudent = () => {
    const { matricula, name, apellidoPaterno, apellidoMaterno, correo } =
      selectedStudent;

    if (!matricula || !name || !apellidoPaterno || !apellidoMaterno || !correo) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (editMode) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id ? selectedStudent : student
        )
      );
    } else {
      setStudents((prev) => [
        ...prev,
        { id: (prev.length + 1).toString(), ...selectedStudent },
      ]);
    }

    setSelectedStudent({
      matricula: '',
      name: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      correo: '',
    });
    setModalVisible(false);
    setEditMode(false);
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={tw`flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-2`}
            >
              <Text style={tw`text-base`}>{`${item.matricula} - ${item.name} ${item.apellidoPaterno} ${item.apellidoMaterno}`}</Text>
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
            name: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            correo: '',
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
            {['matricula', 'name', 'apellidoPaterno', 'apellidoMaterno', 'correo'].map(
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
