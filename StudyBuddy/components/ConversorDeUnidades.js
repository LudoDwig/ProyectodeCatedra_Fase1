import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ConversorDeUnidades = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('metros');
  const [convertedValue, setConvertedValue] = useState('');

  const units = {
    metros: 1,
    kilometros: 0.001,
    centimetros: 100,
    millas: 0.000621371,
    pies: 3.28084,
  };

  const convertLength = (unit) => {
    const inputValueFloat = parseFloat(inputValue);
    if (!isNaN(inputValueFloat)) {
      const conversionFactor = units[unit];
      setConvertedValue((inputValueFloat * conversionFactor).toFixed(3));
    } else {
      setConvertedValue('Valor inválido');
    }
  };

  const renderButtons = () => {
    return Object.keys(units).map((unit) => (
      <TouchableOpacity
        key={unit}
        style={styles.button}
        onPress={() => {
          setSelectedUnit(unit);
          convertLength(unit);
        }}
      >
        <Text style={styles.buttonText}>{unit}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversor de Longitud</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese un valor"
        keyboardType="numeric"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <View style={styles.buttonContainer}>{renderButtons()}</View>
      {convertedValue !== '' && <Text style={styles.resultText}>Resultado: {convertedValue} metros</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    textAlign: 'center',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  resultText: {
    fontSize: 18,
  },
});

export default ConversorDeUnidades;
