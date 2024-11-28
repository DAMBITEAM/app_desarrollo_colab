import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import tw from 'twrnc';
import GlobalActionButton from '../../components/GlobalActionButton';
import { NavigationProp } from '@react-navigation/native';

const SubjectsScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [subjects, setSubjects] = useState([
    { id: '1', code: 'ISSC712', name: 'Minería de Datos', professor: 'Dr. José Pérez' },
    { id: '2', code: 'ISSC711', name: 'Desarrollo Colaborativo', professor: 'Ing. Ana Gómez' },
    { id: '3', code: 'ISSC710', name: 'Desarrollo Sustentable', professor: 'Mtro. Carlos Ruiz' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>({
    code: '',
    name: '',
    professor: '',
  });

  const handleSaveSubject = () => {
    const { code, name, professor } = selectedSubject;

    if (!code || !name || !professor) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (editMode) {
      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === selectedSubject.id ? selectedSubject : subject
        )
      );
    } else {
      setSubjects((prev) => [
        ...prev,
        { id: (prev.length + 1).toString(), ...selectedSubject },
      ]);
    }

    setSelectedSubject({ code: '', name: '', professor: '' });
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
        <Text style={tw`text-xl font-bold`}>Materias registradas</Text>
      </View>

      {/* Tabla de Materias */}
      <View style={tw`bg-gray-200 rounded-lg p-4 shadow-md`}>
        <FlatList
          data={subjects}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={tw`flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-2`}
            >
              <Text style={tw`text-base`}>{`${item.code} - ${item.name}`}</Text>
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
                  onPress={() =>
                    setSubjects((prev) =>
                      prev.filter((subject) => subject.id !== item.id)
                    )
                  }
                >
                  <Text style={tw`text-white font-bold`}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      {/* Botón para añadir materias */}
      <TouchableOpacity
        style={tw`mt-6 bg-blue-700 rounded-lg p-3 shadow-md self-center`}
        onPress={() => {
          setSelectedSubject({ code: '', name: '', professor: '' });
          setEditMode(false);
          setModalVisible(true);
        }}
      >
        <Text style={tw`text-white font-bold`}>Añadir materia</Text>
      </TouchableOpacity>

      {/* Modal para añadir/editar materias */}
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
              value={selectedSubject?.code || ''}
              onChangeText={(text) =>
                setSelectedSubject((prev: any) => ({ ...prev, code: text }))
              }
            />
            <Text style={tw`text-xl mb-2`}>Nombre de la Materia</Text>
            <TextInput
              placeholder="Nombre de la materia"
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              value={selectedSubject?.name || ''}
              onChangeText={(text) =>
                setSelectedSubject((prev: any) => ({ ...prev, name: text }))
              }
            />
            <Text style={tw`text-xl mb-2`}>Profesor</Text>
            <TextInput
              placeholder="Profesor"
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              value={selectedSubject?.professor || ''}
              onChangeText={(text) =>
                setSelectedSubject((prev: any) => ({ ...prev, professor: text }))
              }
            />
            <View style={tw`flex-row justify-between`}>
              <TouchableOpacity
                style={tw`bg-red-500 rounded-lg px-4 py-2`}
                onPress={() => setModalVisible(false)}
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
};

export default SubjectsScreen;
