import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
//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
const windowWidth = Dimensions.get('window').width;
function Inicio({ navigation }) {
  return (
    <View styles={styles.container}>
      <View styles={styles.row}>
      <TouchableOpacity
        onPress={()=>navigation.navigate('Notas')}
        style={styles.column}>
        <Image
        source={require('../src/img/to-do-list.png')}
        style={styles.image}/>
        
      </TouchableOpacity>
      {/* Agrega otros botones o elementos para otros gadgets */}
      <Text>Bloc de Notas</Text>
      </View>
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
  row: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Espaciado entre las filas
  },
  column: {
    paddingLeft: 20,
    paddingTop: 50,
    flex: 1,
    marginRight: 10, // Espaciado entre las columnas
  },
  image: {
    
    width: (windowWidth - 200) / 2, // Ancho de la imagen para 2 columnas con espaciado
    height: 100, // Altura deseada

  },
});
export default Inicio;
