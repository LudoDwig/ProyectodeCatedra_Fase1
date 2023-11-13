import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet, ImageBackground } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

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
    backgroundColor: 'rgba(230, 231, 254, 0.65)',
    marginTop: 20,
    paddingLeft: 7,
    padding: 15,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
        borderWidth: 1,
        borderRadius: 5,       
        borderColor: 'green',
        borderWidth: 0,
        borderRadius: 10,
        padding: 10,
        borderBottomWidth: 4,
        borderTopWidth: 4,
        backgroundColor: 'rgba(230, 231, 254, 0.9)'
  },
  qrCodeContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  qrCodeImage: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  generateButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'green',
  },
  clearButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'red',
  },
});

export default function QRGenerador() {
  const [url, setUrl] = useState('');
  const [qrCode, setQRCode] = useState(null);

  const generateQRCode = () => {
    if (url) {
      setQRCode(url);
    } else {
      Alert.alert('URL vacía', 'Por favor, introduce una URL antes de generar el código QR.');
    }
  };

  const clearInput = () => {
    setUrl('');
    setQRCode(null);
  };

  
  return (
    <ImageBackground
        source={require('../src/bgs/qr-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
    <View style={styles.container}>
      <Text style={styles.title}>Generador de Código QR</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Introduce una URL"
          onChangeText={(text) => setUrl(text)}
          value={url}
        />
      </View>
      <View style={styles.qrCodeContainer}>
        {qrCode && (
          <>
            <Text>Código QR generado:</Text>
            <QRCode
              value={qrCode}
              size={200}
              color="black"
              backgroundColor="white"
              style={styles.qrCodeImage}
            />
          </>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Generar QR" onPress={generateQRCode} style={styles.generateButton} />
        <Button title="Limpiar" onPress={clearInput} style={styles.clearButton} />
      </View>
    </View>
    </ImageBackground>
  );
}
