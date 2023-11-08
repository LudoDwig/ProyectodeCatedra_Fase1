import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
  },
  input: {
    width: 100,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  result: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default CalculadoraIMC;
