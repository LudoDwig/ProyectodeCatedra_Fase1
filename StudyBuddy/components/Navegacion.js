import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './Inicio';
import BlocNotas from './BlocDeNotas';
import CronometroApp from './Cronometro';
// Importa otras pantallas si es necesario

const Stack = createNativeStackNavigator();
const NavegacionApp = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Notas" component={BlocNotas} />
        <Stack.Screen name="Crono" component={CronometroApp}/>
        {/* Agrega otras pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavegacionApp;
