import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

// Configura la localización en español para react-native-calendars
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
};

LocaleConfig.defaultLocale = 'es';

function CalendarioOvulacion() {
  const [lastPeriodDate, setLastPeriodDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [cycleLength, setCycleLength] = useState('28');
  const [markedDates, setMarkedDates] = useState({});
  const [fertilePeriodLabel, setFertilePeriodLabel] = useState('');
  const [infertilePeriodLabel, setInfertilePeriodLabel] = useState('');


  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setLastPeriodDate(selectedDate);
    }
  };

  const calculateFertileDays = () => {
    const cycleLengthInt = parseInt(cycleLength, 10);
    if (isNaN(cycleLengthInt) || cycleLengthInt < 21 || cycleLengthInt > 35) {
      return;
    }

    const ovulationDate = new Date(lastPeriodDate);
    ovulationDate.setDate(ovulationDate.getDate() + Math.floor(cycleLengthInt / 2));

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 4);

    const cycleStartDate = new Date(lastPeriodDate);
    const cycleEndDate = new Date(lastPeriodDate);
    cycleEndDate.setDate(cycleEndDate.getDate() + cycleLengthInt);

    // Marca los días fértiles en rojo
    let newMarkedDates = {};

    let currentDate = new Date(fertileStart);
    while (currentDate <= fertileEnd) {
      const dateStr = currentDate.toISOString().split('T')[0];
      newMarkedDates[dateStr] = { selected: true, selectedColor: 'red' };
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Marca los días infértiles en verde
    currentDate = new Date(cycleStartDate);
    while (currentDate <= cycleEndDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      if (!newMarkedDates[dateStr]) {
        newMarkedDates[dateStr] = { selected: true, selectedColor: 'green' };
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setMarkedDates({ ...newMarkedDates });

    setFertilePeriodLabel(`Días Fértiles: ${fertileStart.toDateString()} - ${fertileEnd.toDateString()}`);
    setInfertilePeriodLabel(`Días de poca fertilidad' : ${cycleStartDate.toDateString()} - ${cycleEndDate.toDateString()}`);
  };

  return (
    <ImageBackground
        source={require('../src/bgs/ov-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.mainTitle}>Calculadora de Ovulación</Text>
      <Calendar
        onDayPress={calculateFertileDays}
        markedDates={markedDates}
        style={styles.calendar}
        theme={{
          calendarBackground: 'rgba(165, 231, 218, 0.45)',
        }}
      />
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Ingresa la fecha de tu último período:</Text>
        <Button title="Seleccionar Fecha" onPress={() => setShowDatePicker(true)} />
        <Text>Fecha seleccionada: {lastPeriodDate.toDateString()}</Text>
        
        {showDatePicker && (
          <DateTimePicker
            value={lastPeriodDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )
        }

        <Text style={styles.formTitle}>Ingresa la duración de tu ciclo menstrual promedio:</Text>
        <TextInput
          value={cycleLength}
          onChangeText={text => setCycleLength(text)}
          keyboardType="numeric"
          placeholder="28"
          style={styles.textInput}
        />

        <Button title="Calcular Días Fértiles" onPress={calculateFertileDays} />
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>Resultados</Text>
        <Text style={styles.fertileLabel}>Días Fértiles</Text>
        <View style={styles.fertileBox}>
          <Text style={styles.fertileText}>{fertilePeriodLabel}</Text>
        </View>
        <Text style={styles.infertileLabel}>Días Infértiles</Text>
        <View style={styles.infertileBox}>
          <Text style={styles.infertileText}>{infertilePeriodLabel}</Text>
        </View>
      </View>
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
    flexGrow:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
    marginTop: 20,
    paddingLeft: 7,
    padding: 15,
    marginBottom: 30,
    marginLeft: 10,
    marginRight: 10,
    paddingBottom:50,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calendar: {
    width: 350,
    height: 350,
    borderColor: 'gray',
    borderWidth: 1,
    color: 'gray',
    borderRadius: 30,
  },
  resultContainer: {
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fertileLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fertileBox: {
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  fertileText: {
    color: 'white',
  },
  infertileLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infertileBox: {
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 5,
  },
  infertileText: {
    color: 'white',
  },
  textInput: {
    borderWidth: 1,
        borderRadius: 5,       
        borderColor: 'green',
        
        borderRadius: 10,
        padding: 10,
        borderBottomWidth: 4,
        backgroundColor: 'rgba(230, 231, 254, 0.55)',
        marginBottom: 15,
  },
});

export default CalendarioOvulacion;
