import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function BlocNotas({ navigation }) {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('notes');
      if (savedNotes !== null) {
        setNotesList(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error('Error al cargar las notas:', error);
    }
  };

  const addNote = async () => {
    if (note.trim() !== '') {
      const newNotesList = [...notesList, note];
      setNotesList(newNotesList);
      setNote('');
      try {
        await AsyncStorage.setItem('notes', JSON.stringify(newNotesList));
      } catch (error) {
        console.error('Error al guardar la nota:', error);
      }
    }
  };

  const deleteNote = async (index) => {
    const updatedNotes = [...notesList];
    updatedNotes.splice(index, 1);
    setNotesList(updatedNotes);
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error al borrar la nota:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bloc de Notas, haz tus anotaciones escribiendo en el cuadro de texto.</Text>

      <TextInput
        placeholder="Escribe aquí..."
        value={note}
        onChangeText={(text) => setNote(text)}
        multiline={true}
        style={styles.input}
      />

      <Button
        title="Guardar Nota"
        onPress={addNote}
        color="green" // Color de fondo del botón
      />

      <FlatList
        data={notesList}
        renderItem={({ item, index }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>{item}</Text>
            <Button
              title="Borrar"
              onPress={() => deleteNote(index)}
              color="red" // Color de fondo del botón
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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
  input: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
  },
  noteText: {
    flex: 1,
  },
});

export default BlocNotas;
