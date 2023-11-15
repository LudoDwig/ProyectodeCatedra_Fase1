import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async () => {
      // Obtener la información del usuario registrado desde AsyncStorage
      const nombreGuardado = await AsyncStorage.getItem('nombreUsuario');
      const passwordGuardada = await AsyncStorage.getItem('passwordUsuario');

  
      if (nombre === nombreGuardado && password === passwordGuardada) {
        // Lógica de inicio de sesión exitosa
        // Redirigir a la pantalla principal (NavegacionApp)
        navigation.navigate('Inicio');
      } else {
        // Lógica para manejar el inicio de sesión fallido
        alert('Nombre de usuario o contraseña incorrectos');
      }
    };
  
    const handleBorrarUsuario = async () => {
      try {
        await AsyncStorage.removeItem('usuarioRegistrado');
        await AsyncStorage.removeItem('nombreUsuario');
        await AsyncStorage.removeItem('passwordUsuario');
  
        alert('Usuario y contraseña eliminados con éxito');
      } catch (error) {
        console.error('Error al borrar usuario:', error);
      }
    };
  
    return (
        <ImageBackground
          source={require('../src/bgs/bg-stu2.jpg')}
          style={styles.backgroundImage}
        >
          <View style={styles.container}>
            <Image
              source={require('../assets/icon1.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>Ingresa</Text>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={(text) => setNombre(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.entrarButton]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.borrarButton]}
            onPress={handleBorrarUsuario}
          >
            <Text style={styles.buttonText}>Borrar Usuario</Text>
          </TouchableOpacity>
        </View>
            </View>
          </View>
        </ImageBackground>
      );
    };
    
    const styles = StyleSheet.create({
        backgroundImage: {
          flex: 1,
          resizeMode: 'cover',
        },
        container: {
          flex: 1,
          borderRadius: 50,
          backgroundColor: 'rgba(230, 231, 254, 0.85)',
          marginTop: 20,
          paddingLeft: 7,
          padding: 15,
          marginBottom: 30,
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
        },
        formContainer: {
          width: '80%',
        },
        input: {
          height: 40,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'green',
          padding: 10,
          marginTop: 10,
          backgroundColor: 'rgba(230, 231, 254, 0.55)',
        },
        logo: {
          width: 210,
          height: 210,
          resizeMode: 'contain',
          marginBottom: 20,
        },
        buttonText: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          },
          entrarButton: {
            backgroundColor: 'green',
            marginTop: 20,
            
           
          },
          borrarButton: {
            backgroundColor: 'red',
             marginTop: 20,
            
          },
      });
    
    export default LoginScreen;