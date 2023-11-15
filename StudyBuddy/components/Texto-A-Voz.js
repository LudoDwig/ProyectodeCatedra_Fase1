import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import * as Speech from 'expo-speech';

function TextoAVoz() {
  const [text, setText] = useState('');

  const playText = async () => {
    if (text) {
      await Speech.speak(text, { language: 'es-ES', rate: 1.5 });
    }
  };

  const clearText = () => {
    setText('');
  };

  return (
    <ImageBackground
        source={require('../src/bgs/tex-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
    <View style={styles.container}>
      <Text style={styles.header}>Texto a Voz</Text>
      <TextInput
        placeholder="Ingrese texto"
        value={text}
        multiline={true}
        style={styles.input}
        onChangeText={(text) => setText(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Reproducir" onPress={playText} color="green" />
        <Button title="Limpiar" onPress={clearText} color="blue" />
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Puedes ajustar la propiedad de redimensionamiento según tus necesidades
  },
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
    marginTop: 20,
    paddingLeft: 7,
    padding: 15,
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 300,
    width:300,
    borderWidth: 1,
    borderRadius: 5,       
    borderColor: 'green',
   
    borderRadius: 10,
    padding: 10,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    backgroundColor: 'rgba(230, 231, 254, 0.55)',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default TextoAVoz;
