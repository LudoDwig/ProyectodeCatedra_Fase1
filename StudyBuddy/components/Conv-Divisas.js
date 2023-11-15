import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ConvMonedas = () => {
  const [fromCurrency, setFromCurrency] = useState('USD'); // Moneda de origen
  const [toCurrency, setToCurrency] = useState('USD'); // Moneda de destino
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [conversionDone, setConversionDone] = useState(false);


  const exchangeRates = {
    'USD': 1,
    'Bolívar Venezolano': 33670.5,
    'Corona Checa': 23.191901798234,
    'Corona Danesa': 7.0349968659523,
    'Corona Noruega': 11.047140295989,
    'Corona Sueca': 10.959684731813,
    'Dinar Kuwait': 0.30885276771227,
    'Dirham Emiratos': 3.6689952015318,
    'Dólar Australiano': 1.583695615656,
    'Dólar Canadiense': 1.3699446659614,
    'Dólar Hong Kong': 7.814835998309,
    'Dólar Neozelandés': 1.713773095129,
    'Dólar Singapur': 1.3707932150553,
    'Euro': 0.942774,
    'Florín Húngaro': 360.3876146789,
    'Franco Suizo': 0.89243022608603,
    'Libra': 0.82295216480447,
    'Lira Turca': 27.982962809059,
    'Litas Lituano': 2.934001811239,
    'Peso Argentino': 349.69362017804,
    'Peso Chileno': 942.774,
    'Peso Colombiano': 4227.6860986547,
    'Peso Mexicano': 18.233710472875,
    'Peso Uruguayo': 39.885518466811,
    'Rand Sudafricano': 18.989163712536,
    'Real Brasileño': 5.0285571035395,
    'Rial Saudí': 3.7502595578963,
    'Ringgit Malasio': 4.7672392433291,
    'Rublo Ruso': 95.441789835999,
    'Rupia India': 83.247152317881,
    'Shekel Israelí': 3.6864982384246,
    'Yen': 149.76552819698,
    'Yuan': 7.3082689281478,
    'Zloty Polaco': 4.2009919034654,
  };

  
  const convertCurrency = () => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const result = (amount / fromRate) * toRate;
    setConvertedAmount(result.toFixed(8));
    setConversionDone(true);

  };

  const handleConvertPress = () => {
    convertCurrency();
  };

  const handleFromCurrencyChange = (itemValue) => {
    setFromCurrency(itemValue);
    if (conversionDone) {
      setConversionDone(false);
    }
  };

  const handleToCurrencyChange = (itemValue) => {
    setToCurrency(itemValue);
    if (conversionDone) {
      setConversionDone(false);
    }
  };

  return (
    <ImageBackground
        source={require('../src/bgs/ru-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
    <View style={styles.container}>
      <Text style={styles.title}>Moneda de Origen:</Text>
      <Picker
        selectedValue={fromCurrency}
        onValueChange={handleFromCurrencyChange}
        style={styles.field}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <Picker.Item label={currency} value={currency} key={currency} />
        ))}
      </Picker>

      <Text style={styles.title}>Moneda de Destino:</Text>
      <Picker
        selectedValue={toCurrency}
        onValueChange={handleToCurrencyChange}
        style={styles.field}
      >
        {Object.keys(exchangeRates).map((currency) => (
          <Picker.Item label={currency} value={currency} key={currency} />
        ))}
      </Picker>

      <Text style={styles.title}>Cantidad en {fromCurrency}:</Text>
      <TextInput
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
        style={[styles.field, styles.input]}
      />

      <Button
        title="Convertir"
        onPress={handleConvertPress}
        color="green"
        style={styles.convertButton}
      />

      {conversionDone && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            {amount} {fromCurrency} equivale a {convertedAmount} {toCurrency}
          </Text>
        </View>
      )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Puedes ajustar la propiedad de redimensionamiento según tus necesidades
  },
  container: {
   flex:1,
    justifyContent: 'center',
    
    borderRadius: 50,
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
    marginTop: 20,
    paddingLeft: 7,
    padding: 15,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10, // Margen vertical de 10 unidades
  },
  resultContainer: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginTop: 10, // Margen vertical de 10 unidades
  },
  resultText: {
    fontSize: 18,
  },
  field: {
    marginBottom: 10, // Margen vertical de 10 unidades
  },
  input: {
    width: 60,
    borderWidth: 1,
    borderRadius: 5,       
    borderColor: 'green',
    borderWidth: 0,
    borderRadius: 10,
    padding: 10,
    borderBottomWidth: 2,
    backgroundColor: 'rgba(230, 231, 254, 0.55)'
  },
  convertButton: {
    // Estilo del botón de conversión (color configurado arriba)
  },
});


export default ConvMonedas;