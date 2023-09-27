import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

function Inicio({ navigation }) {
  const gadgets = [
    { name: 'Bloc de Notas', image: require('../src/img/to-do-list.png'), screen: 'Notas' },
    { name: 'Gadget 2', image: require('../src/img/map.png'), screen: 'Gadget2' },
    { name: 'Gadget 3', image: require('../src/img/user.png'), screen: 'Gadget3' },
    { name: 'Gadget 4', image: require('../src/img/calendar.png'), screen: 'Gadget4' },
    { name: 'Gadget 5', image: require('../src/img/chronometer.png'), screen: 'Gadget5'},
  ];

  return (
    
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10, // Espaciado entre las columnas
  },
  image: {
    flex: 1,
    aspectRatio: 1, // Mantiene la relación de aspecto original de la imagen
    width: 100, // Ancho de la columna
    height: undefined, // Altura se ajusta automáticamente
  },
  text: {
    marginTop: 10, // Espaciado hacia arriba desde la imagen
    fontWeight: 'bold',
  },
});

export default Inicio;
