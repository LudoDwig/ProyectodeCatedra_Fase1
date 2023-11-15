import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';

const UnitConverter = () => {
  const [amount, setAmount] = useState(''); // Cantidad a convertir
  const [conversionType, setConversionType] = useState('peso');
  const [fromUnit, setFromUnit] = useState('kg');
  const [toUnit, setToUnit] = useState('lb');
  const [result, setResult] = useState('');

  // Función para realizar la conversión
  const convertUnits = () => {
    // Agrega lógica de conversión aquí
    // Puedes usar un objeto con factores de conversión para diferentes tipos de unidades
    const conversionFactors = {
      peso: {
        kg: 1,
        lb: 2.20462,
      },
      // Agrega más tipos y unidades según tus necesidades
    };

    const factor = conversionFactors[conversionType][toUnit] / conversionFactors[conversionType][fromUnit];
    setResult((parseFloat(amount) * factor).toFixed(2));
  };

  // Usa useEffect para realizar la conversión cuando cambian los valores
  useEffect(() => {
    convertUnits();
  }, [amount, conversionType, fromUnit, toUnit]);

  return (
    <View>
      <TextInput
        placeholder="Cantidad"
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={conversionType}
        onValueChange={(itemValue) => setConversionType(itemValue)}
      >
        <Picker.Item label="Peso" value="peso" />
        {/* Agrega más opciones de conversión aquí */}
      </Picker>

      <Picker
        selectedValue={fromUnit}
        onValueChange={(itemValue) => setFromUnit(itemValue)}
      >
        <Picker.Item label="Kg" value="kg" />
        <Picker.Item label="Lb" value="lb" />
        {/* Agrega más unidades según el tipo de conversión */}
      </Picker>

      <Picker
        selectedValue={toUnit}
        onValueChange={(itemValue) => setToUnit(itemValue)}
      >
        <Picker.Item label="Kg" value="kg" />
        <Picker.Item label="Lb" value="lb" />
        {/* Agrega más unidades según el tipo de conversión */}
      </Picker>

      <Text>Resultado: {result}</Text>
    </View>
  );
};

export default UnitConverter;
