import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

const CalculadoraIMC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateIMC = () => {
    if (weight && height) {
      const weightValue = parseFloat(weight);
      const heightValue = parseFloat(height) / 100; // Convert height to meters
      const imc = weightValue / (heightValue * heightValue);

      let classification = '';
      if (imc < 18.5) {
        classification = 'Bajo peso';
      } else if (imc < 24.9) {
        classification = 'Peso saludable';
      } else if (imc < 29.9) {
        classification = 'Sobrepeso';
      } else {
        classification = 'Obesidad';
      }

      setResult(`IMC: ${imc.toFixed(2)}\n${classification}`);
    } else {
      setResult(null);
    }
  };

  return (
    <ImageBackground
        source={require('../src/bgs/img-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
    <View style={styles.container}>
      <Text style={styles.label}>Peso (kg):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={(text) => setWeight(text)}
      />
      <Text style={styles.label}>Altura (cm):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={(text) => setHeight(text)}
      />
      <Button title="Calcular IMC" onPress={calculateIMC} />

      {result && <Text style={styles.result}>{result}</Text>}
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
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
    marginTop: 20,
    paddingLeft: 7,
    padding: 15,
    marginBottom: 100,
    marginTop: 100,
  },
  label: {
    fontSize: 18,
  },
  input: {
    width: 70,
        borderWidth: 1,
        borderRadius: 5,       
        borderColor: 'green',
       
        borderRadius: 10,
        padding: 10,
        borderBottomWidth: 4,
        backgroundColor: 'rgba(230, 231, 254, 0.85)',
        marginBottom: 20,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default CalculadoraIMC;
