import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  Image
} from 'react-native';
import tw from 'twrnc';
import GlobalActionButton from '../../components/GlobalActionButton';
import { NavigationProp } from '@react-navigation/native';

const GradesScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [grades, setGrades] = useState([
    {
      id: '1',
      student: 'Alejandro Díaz Becerra',
      subject: 'Desarrollo Colaborativo',
      absences: 6,
      grade: 10,
    },
    {
      id: '2',
      student: 'Alejandro Díaz Becerra',
      subject: 'Minería de Datos',
      absences: 0,
      grade: 10,
    },
    {
      id: '3',
      student: 'Alejandro Díaz Becerra',
      subject: 'Desarrollo de Negocios',
      absences: 2,
      grade: 10,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<any>({
    student: '',
    subject: '',
    absences: '',
    grade: '',
  });

  const handleSaveGrade = () => {
    if (!selectedGrade.student || !selectedGrade.subject || !selectedGrade.absences || !selectedGrade.grade) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (editMode) {
      setGrades((prev) =>
        prev.map((grade) =>
          grade.id === selectedGrade.id ? selectedGrade : grade
        )
      );
    } else {
      setGrades((prev) => [
        ...prev,
        { id: (prev.length + 1).toString(), ...selectedGrade },
      ]);
    }

    setSelectedGrade({ student: '', subject: '', absences: '', grade: '' });
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
        <Text style={tw`text-xl font-bold`}>Captura de calificaciones</Text>
      </View>

      {/* Tabla de Calificaciones */}
      <View style={tw`bg-gray-200 rounded-lg p-4 shadow-md`}>
        <FlatList
          data={grades}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={tw`flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-2`}
            >
              <Text style={tw`text-base`}>
                {`${item.subject} - ${item.absences}F - ${item.grade}`}
              </Text>
              <TouchableOpacity
                style={tw`bg-blue-700 rounded-lg px-3 py-1`}
                onPress={() => {
                  setSelectedGrade(item);
                  setEditMode(true);
                  setModalVisible(true);
                }}
              >
                <Text style={tw`text-white font-bold`}>Editar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      {/* Botón para registrar calificaciones */}
      <TouchableOpacity
        style={tw`mt-6 bg-blue-700 rounded-lg p-3 shadow-md self-center`}
        onPress={() => {
          setSelectedGrade({ student: '', subject: '', absences: '', grade: '' });
          setEditMode(false);
          setModalVisible(true);
        }}
      >
        <Text style={tw`text-white font-bold`}>Registrar calificaciones</Text>
      </TouchableOpacity>

      {/* Modal para registrar/editar calificaciones */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white rounded-lg p-6 w-4/5 shadow-lg`}>
            <Text style={tw`text-xl font-bold mb-4`}>
              {editMode ? 'Editar Calificación' : 'Registrar Calificación'}
            </Text>
            <Text style={tw`text-lg mb-2`}>Alumno</Text>
            <TextInput
              placeholder="Nombre del alumno"
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              value={selectedGrade.student}
              onChangeText={(text) =>
                setSelectedGrade((prev: any) => ({ ...prev, student: text }))
              }
            />
            <Text style={tw`text-lg mb-2`}>Materia</Text>
            <TextInput
              placeholder="Nombre de la materia"
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              value={selectedGrade.subject}
              onChangeText={(text) =>
                setSelectedGrade((prev: any) => ({ ...prev, subject: text }))
              }
            />
            <Text style={tw`text-lg mb-2`}>Faltas</Text>
            <TextInput
              placeholder="Número de faltas"
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              keyboardType="numeric"
              value={selectedGrade.absences.toString()}
              onChangeText={(text) =>
                setSelectedGrade((prev: any) => ({
                  ...prev,
                  absences: parseInt(text, 10) || '',
                }))
              }
            />
            <Text style={tw`text-lg mb-2`}>Calificación</Text>
            <TextInput
              placeholder="Calificación"
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              keyboardType="numeric"
              value={selectedGrade.grade.toString()}
              onChangeText={(text) =>
                setSelectedGrade((prev: any) => ({
                  ...prev,
                  grade: parseInt(text, 10) || '',
                }))
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
                onPress={handleSaveGrade}
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

export default GradesScreen;
