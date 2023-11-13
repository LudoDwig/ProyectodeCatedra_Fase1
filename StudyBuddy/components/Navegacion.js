import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './Inicio';
import BlocNotas from './BlocDeNotas';
import CronometroApp from './Cronometro';
import Recordatorio from './Recordatorio';
import NumAleatorio from './Aleatorio';
import TextoAVoz from './Texto-A-Voz';
import QRGenerador from './GenerarQR';
import CalendarioOvulacion from './Calendario';
import LectorCodigos from './Lector-QR-Barra';
import TicTacToe from './XyO';
import Ruleta from './Ruleta';
import Color from './Conv-Divisas';
import InfBateria from './Info-Bateria';
import TimeCalculator from './CalculadoradeTiempo';
import ConvMonedas from './Conv-Divisas';
import CalculadoraIMC from './IMC';
import CalculaldoraReact from './Calcu';
import InfDispositivo from './Informacion';
import GenContra from './ContraseñasAleatorias';
//<Stack.Screen name="Ruleta" component={Ruleta}/>


// Importa otras pantallas si es necesario

const Stack = createNativeStackNavigator();
const NavegacionApp = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Notas" component={BlocNotas} />
        <Stack.Screen name="Cronómetro" component={CronometroApp}/>
        <Stack.Screen name="Recordatorio" component={Recordatorio}/>
        <Stack.Screen name="Aleatorio" component={NumAleatorio}/>
        <Stack.Screen name="Texto a Voz" component={TextoAVoz}/>
        <Stack.Screen name="Generador QR" component={QRGenerador}/>
        <Stack.Screen name="Calculadora de periodo" component={CalendarioOvulacion}/>
        <Stack.Screen name="Lector QR-Barra" component={LectorCodigos}/>
        <Stack.Screen name="X y O" component={TicTacToe}/>
        <Stack.Screen name="Ruleta" component={Ruleta}/>
        <Stack.Screen name="Calculadora menstrual" component={Color}/>
      
        <Stack.Screen name="Calculador de tiempo" component={TimeCalculator}/>
        <Stack.Screen name="Conversor de monedas" component={ConvMonedas}/>
        <Stack.Screen name="Calculadora IMC" component={CalculadoraIMC}/>
        <Stack.Screen name="Calculadora" component={CalculaldoraReact}/>
        <Stack.Screen name="Informacion del dispositivo" component={InfDispositivo}/>
        <Stack.Screen name="Generar contraseña" component={GenContra}/>
        <Stack.Screen name="Informacion de Bateria" component={InfBateria}/>
        
      
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavegacionApp;
