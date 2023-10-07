import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import * as Calendar from 'expo-calendar';
import * as Notifications from 'expo-notifications';

function Calendario() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [title, setTitle] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();

    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync();
      const defaultCalendar = calendars.find((cal) => cal.isPrimary);

      const startDate = new Date();
      const endDate = new Date();
      endDate.setFullYear(endDate.getFullYear() + 1);

      const events = await Calendar.getEventsAsync(
        [defaultCalendar.id],
        startDate,
        endDate
      );

      setEvents(events);
    }
  };

  const addEvent = async () => {
    if (!title) {
      alert('Ingrese un título para el evento.');
      return;
    }

    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);
    endDate.setHours(endDate.getHours() + 1);

    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    const newEvent = {
      title,
      startDate,
      endDate,
      timeZone: 'America/Los_Angeles',
      location: 'Ubicación del evento',
      notes: 'Notas del evento',
      calendarId: defaultCalendar.id,
    };

    await Calendar.createEventAsync(defaultCalendar.id, newEvent);
    loadEvents();
    setTitle('');
  };

  const scheduleNotification = async (eventId, eventTitle, eventDate) => {
    const trigger = new Date(eventDate);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Recordatorio de evento',
        body: `No olvides tu evento: ${eventTitle}`,
      },
      trigger,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendario de Eventos</Text>
      <Button title="Cargar Eventos" onPress={loadEvents} />

      <Text style={styles.title}>Agregar Evento</Text>
      <Text>Fecha del Evento:</Text>
      <Button
        title={selectedDate.toDateString()}
        onPress={() => {
          /* Implementa una selección de fecha aquí */
        }}
      />
      <Text>Título del Evento:</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button title="Agregar Evento" onPress={addEvent} />

      <Text style={styles.title}>Eventos Programados</Text>
      {events.map((event) => (
        <Text key={event.id}>{event.title} - {event.startDate.toDateString()}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Calendario;
