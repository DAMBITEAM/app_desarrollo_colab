import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import tw from 'twrnc';
import { Icon } from '@rneui/themed';

const GlobalActionButton = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <View style={tw`absolute top-5 right-5 z-50`}>
            {/* Botón flotante */}
            <TouchableOpacity
                style={tw`bg-blue-700 rounded-full p-3 shadow-lg`}
                onPress={toggleMenu}
            >
                <Icon name="home" size={24} color="white" />
            </TouchableOpacity>

            {/* Menú flotante */}
            <Modal
                visible={menuVisible}
                transparent
                animationType="fade"
                onRequestClose={toggleMenu}
            >
                <TouchableOpacity
                    style={tw`flex-1 bg-black/30 justify-center items-center`}
                    activeOpacity={1}
                    onPress={toggleMenu}
                >
                    <View style={tw`bg-white rounded-lg p-4 shadow-lg w-60`}>
                        <Text style={tw`text-lg font-bold mb-2`}>Bienvenido:</Text>
                        <Text style={tw`text-base mb-4`}>Nombre de tutor</Text>
                        {/* Botón para ir al Home */}
                        <TouchableOpacity
                            style={tw`flex-row items-center`}
                            onPress={() => {
                                toggleMenu();
                                navigation.navigate('Home');
                            }}
                        >
                            <Icon name="home" size={20} color="black" />
                            <Text style={tw`text-base ml-2`}>Ir al Home</Text>
                        </TouchableOpacity>
                        {/* Botón para cerrar sesión */}
                        <TouchableOpacity
                            style={tw`flex-row items-center mt-4`}
                            onPress={() => {
                                toggleMenu();
                                navigation.navigate('Login');
                            }}
                        >
                            <Icon name="logout" size={20} color="black" />
                            <Text style={tw`text-base ml-2`}>Cerrar sesión</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default GlobalActionButton;
