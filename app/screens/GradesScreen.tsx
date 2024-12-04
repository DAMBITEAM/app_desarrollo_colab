import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { gradeServices, studentServices, subjectServices } from '../services/api';
import { Grade, Student, Subject } from '../types';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';
import GlobalActionButton from '../../components/GlobalActionButton';
import { NavigationProp } from '@react-navigation/native';


export default function GradesScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade>({
    alumno_id: '',
    materia_id: '',
    calificacion: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      console.log('Iniciando carga de datos...');
      
      const [studentsData, subjectsData, gradesData] = await Promise.all([
        studentServices.getAll(),
        subjectServices.getAll(),
        gradeServices.getAll()
      ]);

      console.log('Estudiantes cargados:', studentsData);
      console.log('Materias cargadas:', subjectsData);
      console.log('Calificaciones cargadas:', gradesData);

      setStudents(studentsData);
      setSubjects(subjectsData);
      setGrades(gradesData);
      
    } catch (error) {
      console.error('Error cargando datos:', error);
      Alert.alert('Error', 'No se pudieron cargar los datos');
    }
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student ? `${student.nombre} ${student.apellido}` : 'Desconocido';
  };

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.nombre : 'Desconocido';
  };

  const handleSaveGrade = async () => {
    try {
      if (!selectedGrade.alumno_id || !selectedGrade.materia_id) {
        Alert.alert('Error', 'Por favor completa todos los campos');
        return;
      }

      if (editMode && selectedGrade.id) {
        await gradeServices.update(selectedGrade.id, selectedGrade);
      } else {
        await gradeServices.create(selectedGrade);
      }
      
      loadData();
      setModalVisible(false);
      resetForm();
    } catch (error) {
      console.error('Error guardando calificación:', error);
      Alert.alert('Error', 'No se pudo guardar la calificación');
    }
  };

  const resetForm = () => {
    setSelectedGrade({
      alumno_id: '',
      materia_id: '',
      calificacion: 0,
    });
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
          keyExtractor={(item) => item.id || ''}
          renderItem={({ item }) => (
            <View style={tw`flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-2`}>
              <View>
                <Text style={tw`text-base font-bold`}>{getStudentName(item.alumno_id)}</Text>
                <Text style={tw`text-sm text-gray-600`}>
                  {getSubjectName(item.materia_id)} - Calif: {item.calificacion}
                </Text>
              </View>
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
          resetForm();
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
            <View style={tw`border border-gray-300 rounded-lg mb-4`}>
              <Picker
                selectedValue={selectedGrade.alumno_id}
                onValueChange={(value) => {
                  console.log('Alumno seleccionado:', value);
                  setSelectedGrade(prev => ({...prev, alumno_id: value}))
                }}
              >
                <Picker.Item label="Seleccione un alumno" value="" />
                {Array.isArray(students) && students.length > 0 ? (
                  students.map((student) => (
                    <Picker.Item
                      key={student.id}
                      label={`${student.nombre} ${student.apellido}`}
                      value={student.id}
                    />
                  ))
                ) : (
                  <Picker.Item label="No hay alumnos disponibles" value="" />
                )}
              </Picker>
            </View>

            <Text style={tw`text-lg mb-2`}>Materia</Text>
            <View style={tw`border border-gray-300 rounded-lg mb-4`}>
              <Picker
                selectedValue={selectedGrade.materia_id}
                onValueChange={(value) => {
                  console.log('Materia seleccionada:', value);
                  setSelectedGrade(prev => ({...prev, materia_id: value}))
                }}
              >
                <Picker.Item label="Seleccione una materia" value="" />
                {Array.isArray(subjects) && subjects.length > 0 ? (
                  subjects.map((subject) => (
                    <Picker.Item
                      key={subject.id}
                      label={subject.nombre}
                      value={subject.id}
                    />
                  ))
                ) : (
                  <Picker.Item label="No hay materias disponibles" value="" />
                )}
              </Picker>
            </View>


            <Text style={tw`text-lg mb-2`}>Calificación</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-md p-2 mb-4`}
              keyboardType="numeric"
              value={selectedGrade.calificacion.toString()}
              onChangeText={(text) =>
                setSelectedGrade(prev => ({...prev, calificacion: parseInt(text) || 0}))
              }
            />

            <Text style={tw`text-lg mb-2`}>Faltas</Text>
            

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
}
