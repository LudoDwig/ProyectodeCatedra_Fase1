import React from 'react';
import { Image, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function Inicio({ navigation }) {
  const gadgets = [
    { name: 'Bloc de Notas', image: require('../src/img/bloc-notas.jpg'), screen: 'Notas' },
    { name: 'Cronometro', image: require('../src/img/cronometro.jpg'), screen: 'Cronómetro'},
    { name: 'Recordatorio', image: require('../src/img/recordatorio.jpg'), screen: 'Recordatorio'},
    { name: 'Numero Aleatorio', image: require('../src/img/dado.jpg'), screen: 'Aleatorio' },
    { name: 'Texto a voz', image: require('../src/img/texto-a-voz.jpg'), screen: 'Texto a Voz' },
    { name: 'Generador QR', image: require('../src/img/codigoqr.jpg'), screen: 'Generador QR'},
    { name: 'Gadget 2', image: require('../src/img/mapa-ubicacion.jpg'), screen: 'Gadget2' },
    { name: 'Calendario', image: require('../src/img/agenda.jpg'), screen: 'Calendario' },
    { name: 'Lector QR-Barra', image: require('../src/img/agenda.jpg'), screen: 'Lector QR-Barra' },
    { name: 'Speed test', image: require('../src/img/speedtest.png'), screen: 'Speed test' },
    { name: 'Gadget 4', image: require('../src/img/user.png'), screen: 'Gadget4' },
    

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
    borderWidth: 4,
    borderRadius: 50,
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
