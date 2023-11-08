import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: 300,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
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
