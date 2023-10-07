import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default TextoAVoz;
