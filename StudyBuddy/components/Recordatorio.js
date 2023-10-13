import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Recordatorio() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
      // Solicitar permiso para notificaciones al iniciar la aplicación
      async function requestNotificationPermission() {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          setError('Se requieren permisos de notificación para usar esta función.');
        }
      }
  
      requestNotificationPermission()
    // Cargar recordatorios almacenados en AsyncStorage al iniciar la aplicación
    loadReminders();
  }, []);

  const scheduleNotification = async (title, date) => {
    if (!title || !date) {
      setError('Título y fecha son requeridos');
      return;
    }
    setError('');

    // Obtener una marca de tiempo a partir de la fecha y hora seleccionadas
    const timestamp = date.getTime();

    // Crear una notificación programada
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
      },
      trigger: {
        date: timestamp,
      },
    });

    // Actualizar la lista de recordatorios inmediatamente
    loadReminders();

    // Guardar el recordatorio en AsyncStorage
    saveReminder(title, date);
    setTimeout(() => {
      loadReminders();
    }, 1000);

    // Borrar la fecha y hora seleccionadas
    setDate(null);
    setTime(null);
  };

  const saveReminder = async (title, date) => {
    const reminder = { title, date };
    const existingReminders = await AsyncStorage.getItem('reminders');
    const remindersArray = existingReminders ? JSON.parse(existingReminders) : [];
    remindersArray.push(reminder);
    await AsyncStorage.setItem('reminders', JSON.stringify(remindersArray));
  };

  const loadReminders = async () => {
    const existingReminders = await AsyncStorage.getItem('reminders');
    const remindersArray = existingReminders ? JSON.parse(existingReminders) : [];
    setReminders(remindersArray);
  };

  const clearReminder = async (index) => {
    const updatedReminders = [...reminders];
    updatedReminders.splice(index, 1);
    setReminders(updatedReminders);
    await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Recordatorio</Text>
      <Text style={styles.errorText}>{error}</Text>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.input}
      />
      {date && (
        <Text>Fecha Seleccionada: {date.toDateString()}</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Seleccionar Fecha"
          onPress={() => setShowDatePicker(true)}
          color="blue" // Color de fondo del botón
        />
        <Button
          title="Seleccionar Hora"
          onPress={() => setShowTimePicker(true)}
          color="blue" // Color de fondo del botón
        />
        </View>
      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={time || new Date()}
          mode="time"
          display="default"
          is24Hour={true}
          onChange={onChangeTime}
        />
      )}
      <Button
        title="Programar Recordatorio"
        onPress={() => {
          const selectedDateTime = date && time
            ? new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes())
            : null;
      
          if (!title || !selectedDateTime) {
            setError('Título y fecha son requeridos');
            return;
          }
      
          setError('');
      
          // Luego, puedes programar la notificación y realizar otras acciones aquí
          scheduleNotification(title, selectedDateTime);
        }}
        color="green" // Color de fondo del botón
      />

      <Text style={styles.listHeader}>Lista de Recordatorios:</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <Text>{item.title} - {item.date.toLocaleString()}</Text>
            <Button
              title="Borrar"
              onPress={() => clearReminder(index)}
              color="red" // Color de fondo del botón
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  listHeader: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
});
