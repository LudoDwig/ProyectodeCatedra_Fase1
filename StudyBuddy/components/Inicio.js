import React, { useState } from 'react';
import { Image, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions, TextInput, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function Inicio({ navigation }) {
  const [searchTerm, setSearchTerm] = useState('');

  const gadgets = [
    { name: 'Bloc de Notas', image: require('../src/img/bloc-notas.jpg'), screen: 'Notas' },
    { name: 'Recordatorio', image: require('../src/img/recordatorio.jpg'), screen: 'Recordatorio'},
    { name: 'Cronometro', image: require('../src/img/cronometro.jpg'), screen: 'Cronómetro'},
    
    { name: 'Numero Aleatorio', image: require('../src/img/dado.jpg'), screen: 'Aleatorio' },
    { name: 'Ruleta', image: require('../src/img/ruleta.jpg'), screen: 'Ruleta' },
    { name: 'Texto a voz', image: require('../src/img/texto-a-voz.jpg'), screen: 'Texto a Voz' },
    { name: 'Generador QR', image: require('../src/img/codigoqr.jpg'), screen: 'Generador QR'},
    { name: 'Lector QR-Barra', image: require('../src/img/lector-qr.jpg'), screen: 'Lector QR-Barra' },
    { name: 'X y O', image: require('../src/img/equis-cero.jpg'), screen: 'X y O' },
    { name: 'Gadget 2', image: require('../src/img/mapa-ubicacion.jpg'), screen: 'Gadget2' },
    { name: 'Calendario', image: require('../src/img/agenda.jpg'), screen: 'Calendario' },
    { name: 'Gadget 4', image: require('../src/img/user.png'), screen: 'Gadget4' },
   
  
  ];

  // Filtrar gadgets basados en el término de búsqueda
  const filteredGadgets = gadgets.filter((gadget) =>
    gadget.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Contenedor para el campo de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar gadgets..."
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
          style={styles.searchInput}
        />
      </View>

      {/* Mapeo y renderizado de gadgets filtrados */}
      {filteredGadgets.map((gadget, index) => (
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
  searchContainer: {
    width: '100%', // Ancho del 100% del contenedor principal
    marginBottom: 10, // Espaciado entre el campo de búsqueda y los gadgets
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%', // Ancho del 100% del contenedor de búsqueda
  },
});

export default Inicio;
