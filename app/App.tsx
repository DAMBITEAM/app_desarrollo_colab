import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import tw from 'twrnc';
import AppNavigator from './navigation/AppNavigator'; // Ajusta la ruta según tu estructura de carpetas

const App = () => {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
export default App;
