import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeCalculator = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [timeDifferences, setTimeDifferences] = useState({});
  const [error, setError] = useState('');

  const handleStartDateChange = (event, date) => {
    if (event.type === "set") {
      setStartDate(date || startDate);
      setShowStartDatePicker(false);
    } else {
      setShowStartDatePicker(false);
    }
  };

  const handleEndDateChange = (event, date) => {
    if (event.type === "set") {
      setEndDate(date || endDate);
      setShowEndDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }
  };

  const calculateTimeDifference = () => {
    if (startDate > endDate) {
      setError('La fecha de inicio no puede ser posterior a la fecha de finalización.');
      setTimeDifferences({});
      return;
    }

    setError('');

    const timeDiff = Math.abs(endDate - startDate);
    const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const weeks = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
   

    const differences = {
      'Años': years,
      'Meses': months,
      'Semanas': weeks,
      'Días': days,
      
     
    };

    setTimeDifferences(differences);
  };

  return (
    <ImageBackground
        source={require('../src/bgs/calc-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
        
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Calculadora de Tiempo</Text>
      </View>
      <Button title="Seleccionar Fecha de Inicio" onPress={() => setShowStartDatePicker(true)} />
      <Text style={styles.text}>Fecha de Inicio: {startDate.toDateString()}</Text>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleStartDateChange}
        />)
      }

      <Button title="Seleccionar Fecha de Finalización" onPress={() => setShowEndDatePicker(true)} />
      <Text style={styles.text}>Fecha de Finalización: {endDate.toDateString()}</Text>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleEndDateChange}
        />)
      }

      <Button title="Calcular Diferencia" onPress={calculateTimeDifference} />

      {error && <Text style={styles.error}>{error}</Text>}

      {Object.keys(timeDifferences).length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Diferencias de Tiempo:</Text>
          {Object.entries(timeDifferences).map(([label, value]) => (
            <Text key={label} style={styles.resultText}>{`${label}: ${value}`}</Text>
          ))}
        </View>
      )}
    </ScrollView>
    
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
    marginBottom: 30,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
  resultContainer: {
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    padding: 10,
  },
  resultTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TimeCalculator;
