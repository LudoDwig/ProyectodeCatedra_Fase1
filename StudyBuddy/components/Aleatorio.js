import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';

function NumAleatorio() {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [randomNumber, setRandomNumber] = useState(null);

  const generateRandomNumber = () => {
    const minNumber = parseInt(min);
    const maxNumber = parseInt(max);

    if (isNaN(minNumber) || isNaN(maxNumber) || minNumber >= maxNumber) {
      Alert.alert('Error', 'Ingrese un rango válido.');
      return;
    }

    const random = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    setRandomNumber(random);
  };

  return (
    <ImageBackground
      source={require('../src/bgs/al-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
      style={styles.backgroundImage}
      >
    <View style={styles.container}>
      <Text style={styles.header}>Generador de Números Aleatorios</Text>
      <TextInput
        style={styles.input}
        placeholder="Número mínimo"
        value={min}
        onChangeText={(text) => setMin(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Número máximo"
        value={max}
        onChangeText={(text) => setMax(text)}
        keyboardType="numeric"
      />
      <Button title="Generar" onPress={generateRandomNumber} />

      {randomNumber !== null && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Número aleatorio:</Text>
          <Text style={styles.resultNumber}>{randomNumber}</Text>
        </View>
      )}
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
    borderWidth: 1,
        borderRadius: 5,       
        borderColor: 'green',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        backgroundColor: 'rgba(230, 231, 254, 0.55)',
        paddingBottom: 15,
        marginBottom:10,
  },
  resultBox: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default NumAleatorio;
