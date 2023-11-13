
    import React, { useState } from 'react';
    import {
      Image,
      TouchableOpacity,
      Text,
      StyleSheet,
      ScrollView,
      Dimensions,
      TextInput,
      View,
      ImageBackground,
      
    } from 'react-native';
    
    const windowWidth = Dimensions.get('window').width;
    
    function Inicio({ navigation }) {
      const [searchTerm, setSearchTerm] = useState('');
    
      const gadgets = [
        { name: 'Bloc de Notas', image: require('../src/img/bloc-notas.jpg'), screen: 'Notas' },
    { name: 'Recordatorio', image: require('../src/img/recordatorio.jpg'), screen: 'Recordatorio'},
    { name: 'Cronometro', image: require('../src/img/cronometro.jpg'), screen: 'Cronómetro'},
    { name: 'Calculadora', image: require('../src/img/calculadora.jpg'), screen: 'Calculadora' },
    { name: 'Numero Aleatorio', image: require('../src/img/dado.jpg'), screen: 'Aleatorio' },
    { name: 'Ruleta', image: require('../src/img/ruleta.jpg'), screen: 'Ruleta' },
    { name: 'Texto a voz', image: require('../src/img/texto-a-voz.jpg'), screen: 'Texto a Voz' },
    { name: 'Generador QR', image: require('../src/img/codigoqr.jpg'), screen: 'Generador QR'},
    { name: 'Lector QR-Barra', image: require('../src/img/lector-qr.jpg'), screen: 'Lector QR-Barra' },
    { name: 'Generar contraseña', image: require('../src/img/gen-contra.jpg'), screen: 'Generar contraseña' },
    { name: 'X y O', image: require('../src/img/equis-cero.jpg'), screen: 'X y O' },
    { name: 'Subneteo', image: require('../src/img/ip-subnet.jpg'), screen: 'Subneteo' },
    { name: 'Calculadora IMC', image: require('../src/img/imc.jpg'), screen: 'Calculadora IMC' },
    { name: 'Calculadora de periodo', image: require('../src/img/calc-menstru.jpg'), screen: 'Calculadora de periodo' },
    { name: 'Conversor de monedas', image: require('../src/img/conv-mon.jpg'), screen: 'Conversor de monedas' },
    { name: 'Calculador de tiempo', image: require('../src/img/calen-diferencia.jpg'), screen: 'Calculador de tiempo' },
    { name: 'Informacion del dispositivo', image: require('../src/img/info.jpg'), screen: 'Informacion del dispositivo' },
    { name: 'Informacion de Bateria', image: require('../src/img/inf-bateria.jpg'), screen: 'Informacion de Bateria' },
      ];
    
      // Filtrar gadgets basados en el término de búsqueda
      const filteredGadgets = gadgets.filter((gadget) =>
        gadget.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      return (
        <ImageBackground
        source={require('../src/bgs/bg-stu2.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          {/* Contenedor para el campo de búsqueda */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Buscar gadgets..."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
              style={styles.searchInput}
            />
          </View>
    
          {/* Contenedor para los gadgets con scroll */}
          <ScrollView contentContainerStyle={styles.gadgetsContainer}>
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
        </View>
        </ImageBackground>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Puedes ajustar la propiedad de redimensionamiento según tus necesidades
      },
      searchContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: 'rgba(230, 231, 254, 0.55)', // Puedes ajustar el color de fondo según tus preferencias
        elevation: 5, // Esto agrega una sombra en Android (opcional)
      },
      searchInput: {       
        borderWidth: 1,
        borderRadius: 5,       
        borderColor: 'green',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        borderBottomWidth: 2,
        backgroundColor: 'rgba(230, 231, 254, 0.55)'
      },
      gadgetsContainer: {
        marginLeft: 7,
        marginRight: 7,
        borderRadius: 50,
        backgroundColor: 'rgba(230, 231, 254, 0.5)',
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 15,
      },
      column: {
        width: '48%',
        alignItems: 'center',
        marginBottom: 20,
      },
      image: {
        borderWidth: 4,
        borderRadius: 50,
        aspectRatio: 1,
        width: '100%',
        height: undefined,
      },
      text: {
        marginTop: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
      },
    });
    
    export default Inicio;
    