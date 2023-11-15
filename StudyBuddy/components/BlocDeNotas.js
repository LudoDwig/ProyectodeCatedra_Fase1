import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ImageBackground } from 'react-native';
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
    <ImageBackground
      source={require('../src/bgs/bn-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
      style={styles.backgroundImage}
      >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    borderRadius: 50,
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
    marginTop: 20,
    paddingLeft: 7,
    padding: 15,
    marginBottom: 30,
    },
  headerText: {
    paddingLeft: 30,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Puedes ajustar la propiedad de redimensionamiento según tus necesidades
  },
  input: {
    height: 100,
    borderWidth: 1,
        borderRadius: 5,       
        borderColor: 'green',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        backgroundColor: 'rgba(230, 231, 254, 0.55)',
        paddingBottom: 15,
        marginBottom:10,
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
