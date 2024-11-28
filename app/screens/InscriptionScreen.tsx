import React, { useState } from 'react';
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

const EnrollmentScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [enrollments, setEnrollments] = useState([
        { id: '1', student: 'Alejandro Díaz Becerra', subject: 'Minería de datos' },
        { id: '2', student: 'Alejandro Díaz Becerra', subject: 'Desarrollo Colaborativo' },
        { id: '3', student: 'Alejandro Díaz Becerra', subject: 'Desarrollo Sustentable' },
    ]);

    const [students] = useState([
        { id: '1', name: 'Alejandro Díaz Becerra' },
        { id: '2', name: 'María López' },
        { id: '3', name: 'Carlos Pérez' },
    ]);

    const [subjects] = useState([
        { id: '1', name: 'Minería de datos' },
        { id: '2', name: 'Desarrollo Colaborativo' },
        { id: '3', name: 'Desarrollo Sustentable' },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    const handleEnroll = () => {
        if (!selectedStudent || !selectedSubject) {
            Alert.alert('Error', 'Por favor selecciona un alumno y una materia.');
            return;
        }

        const newEnrollment = {
            id: (enrollments.length + 1).toString(),
            student: selectedStudent,
            subject: selectedSubject,
        };

        setEnrollments([...enrollments, newEnrollment]);
        setSelectedStudent('');
        setSelectedSubject('');
        setModalVisible(false);
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
                <Text style={tw`text-xl font-bold`}>Inscripción a materias</Text>
            </View>

            {/* Lista de Inscripciones */}
            <View style={tw`bg-gray-200 rounded-lg p-4 shadow-md`}>
                <FlatList
                    data={enrollments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={tw`flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-2`}
                        >
                            <Text style={tw`text-base`}>
                                {`${item.student} - ${item.subject}`}
                            </Text>
                        </View>
                    )}
                />
            </View>

            {/* Botón para añadir inscripción */}
            <TouchableOpacity
                style={tw`mt-6 bg-blue-700 rounded-lg p-3 shadow-md self-center`}
                onPress={() => setModalVisible(true)}
            >
                <Text style={tw`text-white font-bold`}>Inscribir alumno</Text>
            </TouchableOpacity>

            {/* Modal para inscripción */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={tw`flex-1 justify-center items-center bg-black/50`}>
                    <View style={tw`bg-white rounded-lg p-6 w-4/5 shadow-lg`}>
                        <Text style={tw`text-xl font-bold mb-4`}>Inscribir Alumno</Text>

                        {/* Selector de alumnos */}
                        <Text style={tw`text-lg mb-2`}>Selecciona un alumno:</Text>
                        <Picker
                            selectedValue={selectedStudent}
                            onValueChange={(itemValue) => setSelectedStudent(itemValue)}
                            style={tw`rounded-md mb-4 bg-gray-100 bg-black/50`}
                        >
                            <Picker.Item label="Selecciona un alumno" value="" style={tw`text-black`} />
                            {students.map((student) => (
                                <Picker.Item
                                    key={student.id}
                                    label={student.name}
                                    value={student.name}
                                    style={tw`text-black`}
                                />
                            ))}
                        </Picker>

                        {/* Selector de materias */}
                        <Text style={tw`text-lg mb-2`}>Selecciona una materia:</Text>
                        <Picker
                            selectedValue={selectedSubject}
                            onValueChange={(itemValue) => setSelectedSubject(itemValue)}
                            style={tw`border border-gray-300 rounded-md mb-4 bg-gray-100 text-black`}
                        >
                            <Picker.Item label="Selecciona una materia" value="" style={tw`text-black`} />
                            {subjects.map((subject) => (
                                <Picker.Item
                                    key={subject.id}
                                    label={subject.name}
                                    value={subject.name}
                                    style={tw`text-black`}
                                />
                            ))}
                        </Picker>

                        {/* Botones */}
                        <View style={tw`flex-row justify-between`}>
                            <TouchableOpacity
                                style={tw`bg-red-500 rounded-lg px-4 py-2`}
                                onPress={() => setModalVisible(false)}
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

export default EnrollmentScreen;
