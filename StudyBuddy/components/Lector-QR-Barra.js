import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Button, Alert, Clipboard } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
//import Clipboard from '@react-native-clipboard/clipboard';

export default function LectorCodigos() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = useCallback(({ data }) => {
    setScanned(true);
    setData(data);
  }, []);

  const handleCopyToClipboard = useCallback(() => {
    if (data) {
      Clipboard.setString(data);
      Alert.alert('Copiado al portapapeles', `"${data}" copiada al portapapeles.`);
    }
  }, [data]);

  const handleScanAgain = useCallback(() => {
    setScanned(false);
    setData(null);
  }, []);

  if (hasPermission === null) {
    return <Text>Solicitando permiso para la cámara</Text>;
  }
  if (hasPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <BarcodeMask width={300} height={300} edgeColor="#62B1F6" showAnimatedLine />
      </BarCodeScanner>
      {scanned && (
        <View style={styles.infoContainer}>
          <Text style={styles.dataText}>Enlace:</Text>
          <Text style={styles.data}>{data}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Copiar" onPress={handleCopyToClipboard} />
            <View style={styles.buttonSeparator}></View>
            <Button title="Escanear de Nuevo" onPress={handleScanAgain} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  dataText: {
    fontSize: 18,
    textAlign: 'center',
  },
  data: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSeparator: {
    width: 10,
  },
});