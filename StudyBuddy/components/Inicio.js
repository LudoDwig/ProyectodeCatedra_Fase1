import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function Inicio({ navigation }) {
  const gadgets = [
    { name: 'Bloc de Notas', image: require('../src/img/to-do-list.png'), screen: 'Notas' },
    { name: 'Gadget 2', image: require('../src/img/map.png'), screen: 'Gadget2' },
    { name: 'Gadget 3', image: require('../src/img/user.png'), screen: 'Gadget3' },
    { name: 'Gadget 4', image: require('../src/img/calendar.png'), screen: 'Gadget4' },
    { name: 'Cronometro', image: require('../src/img/chronometer.png'), screen: 'Cronómetro'},
    { name: 'Recordatorio', image: require('../src/img/pdf-file.png'), screen: 'Recordatorio'},

  ];
 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {gadgets.map((gadget, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(gadget.screen)}
          style={styles.column}
        >
          <Image
            source={gadget.image}
            style={styles.image}
          />
          <Text style={styles.text}>{gadget.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  column: {
    width: '48%', // Ancho de columna para dos columnas
    alignItems: 'center',
    marginBottom: 20, // Espaciado entre las filas
  },
  image: {
    aspectRatio: 1, // Mantiene la relación de aspecto original de la imagen
    width: '100%', // Ancho del 100% de la columna
    height: undefined, // Altura se ajusta automáticamente
  },
  text: {
    marginTop: 10, // Espaciado hacia arriba desde la imagen
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Inicio;
