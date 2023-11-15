import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';

export default function Ruleta() {
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [newParticipant, setNewParticipant] = useState('');

  const handleAddParticipant = () => {
    if (newParticipant.match(/^[A-Za-z]+$/)) {
      setParticipants([...participants, newParticipant]);
      setNewParticipant('');
    } else {
      alert('Por favor, introduce un nombre válido (solo letras).');
    }
  };

  const handleChooseRandomParticipant = () => {
    if (participants.length > 0) {
      const randomIndex = Math.floor(Math.random() * participants.length);
      setSelectedParticipant(participants[randomIndex]);
    } else {
      alert('Agrega participantes antes de elegir.');
    }
  };


  return (

    <ImageBackground
        source={require('../src/bgs/ru-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
    <View style={styles.container}>
      <View>
      {selectedParticipant !== '' && (
        <View style={styles.selectedParticipantContainer}>
          <Text style={styles.selectedParticipantText}>
            El participante seleccionado es: {selectedParticipant}
          </Text>
        </View>
      )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Introduce un nombre"
        value={newParticipant}
        onChangeText={(text) => setNewParticipant(text)}
      />
      <Button title="Guardar" onPress={handleAddParticipant} />
      <View style={styles.participantsContainer}>
        {participants.map((participant, index) => (
          <View key={index} style={styles.participant}>
            <Text>{participant}</Text>
          </View>
        ))}
      </View>
      <Button title="Elegir" onPress={handleChooseRandomParticipant} />
    </View>
    </ImageBackground>
  );
}

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
  input: {
    borderWidth: 1,
        borderRadius: 5,       
        borderColor: 'green',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        borderBottomWidth: 2,
        backgroundColor: 'rgba(230, 231, 254, 0.55)',
        marginBottom: 15,
  },
  participantsContainer: {
    marginBottom: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  participant: {
    marginBottom: 5,
  },
  selectedParticipantContainer: {
    marginBottom: 10,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
  },
  selectedParticipantText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
