import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './Login';


const RegistroScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [usuarioRegistrado, setUsuarioRegistrado] = useState(false);

  useEffect(() => {
    const checkUsuarioRegistrado = async () => {
      const usuario = await AsyncStorage.getItem('usuarioRegistrado');
      setUsuarioRegistrado(usuario === 'true');
    };

    checkUsuarioRegistrado();
  }, []);
  
    const redirigirSiUsuarioRegistrado = () => {
        if (usuarioRegistrado) {
          navigation.replace('Login');
        }
      };
    
      useEffect(() => {
        redirigirSiUsuarioRegistrado();
      }, [usuarioRegistrado]);


    const handleCrearUsuario = async () => {
      if (password === confirmPassword) {
        // Guardar usuario en AsyncStorage
        await AsyncStorage.setItem('usuarioRegistrado', 'true');
        // Puedes guardar más información del usuario si es necesario
        await AsyncStorage.setItem('nombreUsuario', nombre);
        // Redirigir a la pantalla de login
        await AsyncStorage.setItem('passwordUsuario', password);

        alert('Usuario creado con exito');
        navigation.replace('Login');
      } else {
        // Manejar la situación en la que las contraseñas no coinciden
        alert('Las contraseñas no coinciden');
      }
    };

  
    return (
        <ImageBackground
      source={require('../src/bgs/bg-stu2.jpg')} // Reemplaza con la ruta de tu imagen de fondo
      style={styles.backgroundImage}
      >
        <View style={styles.container}>
        <Image
          source={require('../assets/icon1.png')} // Reemplaza con la ruta de tu logo
          style={styles.logo}
        />
          <Text style={styles.title}>Registrate</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Confirmar Contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <Button title="Crear" onPress={handleCrearUsuario} />
          </View>
        </View>
        </ImageBackground>
      );
    };
    
    const styles = StyleSheet.create({
         backgroundImage: {
         flex: 1,
            resizeMode: 'cover', // Puedes ajustar la propiedad de redimensionamiento según tus necesidades
        },
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(230, 231, 254, 0.6)',
       
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
     
        borderWidth: 1,
            borderRadius: 5,       
            borderColor: 'green',
            borderWidth: 0,
            borderRadius: 10,
            padding: 10,
            borderTopWidth: 2,
            borderBottomWidth: 2,
            backgroundColor: 'rgba(230, 231, 254, 0.55)',
            paddingBottom: 15,
            marginBottom:10,
      },
      logo: {
        width: 210, // Ajusta el ancho según sea necesario
        height: 210, // Ajusta la altura según sea necesario
        resizeMode: 'contain', // Puedes ajustar la propiedad de redimensionamiento según tus necesidades
        marginBottom: 20, // Espacio entre el logo y el título del formulario
      },
    });
    
    export default RegistroScreen;