import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet} from 'react-native';
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
    <View>
      <Text>Bloc de Notas, haz tus anotaciones escribiendo en el cuadro de texto.</Text>

      <TextInput
        placeholder="Escribe aquí..."
        value={note}
        onChangeText={(text) => setNote(text)}
        multiline={true}
        style={{ height: 100, borderColor: 'gray', borderWidth: 1, margin: 10 }}
      />

      <Button
        title="Guardar Nota"
        onPress={addNote}
      />

      <FlatList
        data={notesList}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item}</Text>
            <Button
              title="Borrar"
              onPress={() => deleteNote(index)}
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

    
    </View>
  );
}
const styles = StyleSheet.create({
  text:{
    fontWeight: 'bold',
    fontSize: 10,
  }
});

export default BlocNotas;
