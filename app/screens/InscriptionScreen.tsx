import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    Alert,
    Image
} from 'react-native';
import tw from 'twrnc';
import { Picker } from '@react-native-picker/picker';
import GlobalActionButton from '../../components/GlobalActionButton';
import { NavigationProp } from '@react-navigation/native';
import { enrollmentServices, studentServices, subjectServices } from '../services/api';
import { Enrollment, Student, Subject } from '../types';

const InscriptionScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment>({
        alumno_id: '',
        materia_id: '',
    });

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (selectedEnrollment.alumno_id) {
            loadData();
        }
    }, [selectedEnrollment.alumno_id]);

    const loadData = async () => {
        try {
            const [studentsData, subjectsData] = await Promise.all([
                studentServices.getAll(),
                subjectServices.getAll(),
            ]);
            setStudents(studentsData);
            setSubjects(subjectsData);

            const enrollmentsData = await enrollmentServices.getAll();
            setEnrollments(Array.isArray(enrollmentsData) ? enrollmentsData : []);
        } catch (error) {
            console.error('Error loading data:', error);
            Alert.alert('Error', 'No se pudieron cargar los datos');
        }
    };

    const handleEnroll = async () => {
        try {
            if (!selectedEnrollment.alumno_id || !selectedEnrollment.materia_id) {
                Alert.alert('Error', 'Por favor selecciona un alumno y una materia.');
                return;
            }

            const exists = enrollments.some(
                e => e.alumno_id === selectedEnrollment.alumno_id && 
                    e.materia_id === selectedEnrollment.materia_id
            );

            if (exists) {
                Alert.alert('Error', 'El estudiante ya está inscrito en esta materia');
                return;
            }
            console.log('aaaaa:', selectedEnrollment.alumno_id);

            console.log('Enviando inscripción:', selectedEnrollment); // Para debug

            const response = await enrollmentServices.create({
                alumno_id: selectedEnrollment.alumno_id,
                materia_id: selectedEnrollment.materia_id
            });

            console.log('Respuesta:', response); // Para debug
            
            await loadData();
            setModalVisible(false);
            resetForm();
            Alert.alert('Éxito', 'Inscripción realizada correctamente');
        } catch (error) {
            console.error('Error saving enrollment:', error);
            Alert.alert('Error', 'No se pudo guardar la inscripción');
        }
    };

    const resetForm = () => {
        setSelectedEnrollment({
            alumno_id: '',
            materia_id: '',
        });
    };

    const getStudentName = (studentId: string) => {
        const student = students.find(s => s.id === studentId);
        return student ? `${student.nombre} ${student.apellido}` : 'N/A';
    };

    const getSubjectName = (subjectId: string) => {
        const subject = subjects.find(s => s.id === subjectId);
        return subject ? subject.nombre : 'N/A';
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
                <Text style={tw`text-xl font-bold`}>Inscripción a materias</Text>
            </View>

            <View style={tw`bg-gray-200 rounded-lg p-4 shadow-md`}>
                <FlatList
                    data={enrollments}
                    keyExtractor={(item) => item.id || ''}
                    renderItem={({ item }) => (
                        <View style={tw`flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-2`}>
                            <Text style={tw`text-base`}>
                                {`${getStudentName(item.alumno_id)} - ${getSubjectName(item.materia_id)}`}
                            </Text>
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
                <Text style={tw`text-white font-bold`}>Inscribir alumno</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={tw`flex-1 justify-center items-center bg-black/50`}>
                    <View style={tw`bg-white rounded-lg p-6 w-4/5 shadow-lg`}>
                        <Text style={tw`text-xl font-bold mb-4`}>Inscribir Alumno</Text>

                        <Text style={tw`text-lg mb-2`}>Selecciona un alumno:</Text>
                        <View style={tw`border border-gray-300 rounded-lg mb-4`}>
                            <Picker
                                selectedValue={selectedEnrollment.alumno_id}
                                onValueChange={(value) => 
                                    setSelectedEnrollment(prev => ({...prev, alumno_id: value}))
                                }
                            >
                                <Picker.Item label="Seleccione un alumno" value="" />
                                {students.map((student) => (
                                    <Picker.Item
                                        key={student.id}
                                        label={`${student.nombre} ${student.apellido}`}
                                        value={student.id}
                                    />
                                ))}
                            </Picker>
                        </View>

                        <Text style={tw`text-lg mb-2`}>Selecciona una materia:</Text>
                        <View style={tw`border border-gray-300 rounded-lg mb-4`}>
                            <Picker
                                selectedValue={selectedEnrollment.materia_id}
                                onValueChange={(value) => 
                                    setSelectedEnrollment(prev => ({...prev, materia_id: value}))
                                }
                            >
                                <Picker.Item label="Seleccione una materia" value="" />
                                {subjects.map((subject) => (
                                    <Picker.Item
                                        key={subject.id}
                                        label={subject.nombre}
                                        value={subject.id}
                                    />
                                ))}
                            </Picker>
                        </View>

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
                                onPress={handleEnroll}
                            >
                                <Text style={tw`text-white font-bold`}>Guardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default InscriptionScreen;
