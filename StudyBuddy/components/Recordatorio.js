import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList} from 'react-native';
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
    <View>
      <Text>Recordatorio</Text>
      <Text style={{ color: 'red' }}>{error}</Text>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      {date && (
        <Text>Fecha Seleccionada: {date.toDateString()}</Text>
      )}
      <Button
        title="Seleccionar Fecha"
        onPress={() => setShowDatePicker(true)}
      />
      <Button
        title="Seleccionar Hora"
        onPress={() => setShowTimePicker(true)}
      />
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
      />

      <Text>Lista de Recordatorios:</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item.title} - {item.date.toLocaleString()}</Text>
            <Button
              title="Borrar"
              onPress={() => clearReminder(index)}
            />
          </View>
        )}
      />
    </View>
  );
}