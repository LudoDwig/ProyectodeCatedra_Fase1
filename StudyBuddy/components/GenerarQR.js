import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
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
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 10,
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
  );
}
