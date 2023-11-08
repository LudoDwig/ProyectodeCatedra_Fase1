import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

function InfoDispositivo() {
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    async function fetchDeviceInfo() {
      const deviceName = Device.deviceName;
      const osName = Device.osName;
      const osVersion = Device.osVersion;
      const modelId = Device.modelId;
      const platform = Constants.platform.os; // Accede a la propiedad 'os'
      const deviceId = Constants.installationId;
      const deviceBrand = Device.brand;
      const desingName = Device.designName;
      const tipDispo = Device.deviceType === 1 ? 'Celular' : Device.deviceType === 2 ? 'Tablet' : Device.deviceType === 3 ? 'Computadora' : 'No reconocido';
      const disAño = Device.deviceYearClass;
      const esSimu = Device.isDevice === true? 'Dispositivo Fisico' : 'Simulador';
      const disFabri = Device.manufacturer;
      const disAPI = Device.platformApiLevel;
      const disRAM = Device.totalMemory / 1000000000;
      const decRAM = disRAM.toFixed(2);
      

      setDeviceInfo({
        deviceName,
        osName,
        osVersion,
        modelId,
        platform,
        deviceId,
        deviceBrand,
        desingName,
        tipDispo,
        disAño,
        esSimu,
        disFabri,
        disAPI,
        decRAM,
        
      });
    }

    fetchDeviceInfo();
  }, []);
  return (
    <ImageBackground
    source={require('../src/bgs/fondo-inf-dispo.jpg')} // Ruta de la imagen semitransparente
    style={styles.container}
  >
   
      <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Información del Dispositivo:</Text>
      </View>
      <View style={styles.infoContainer}>
        {deviceInfo ? (
          <View>
            <Text style={styles.text}>
              <Text style={styles.label}>Nombre del dispositivo:</Text>{' '}
              {deviceInfo.deviceName}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Tipo de dispositivo:</Text>{' '}
              {deviceInfo.tipDispo}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Marca:</Text> {deviceInfo.deviceBrand}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Año:</Text> {deviceInfo.disAño}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Nombre de diseño:</Text>{' '}
              {deviceInfo.desingName}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Sistema operativo:</Text>{' '}
              {deviceInfo.osName}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Versión del sistema operativo:</Text>{' '}
              {deviceInfo.osVersion}
            </Text>
           
            <Text style={styles.text}>
              <Text style={styles.label}>ID de instalación:</Text>{' '}
              {deviceInfo.deviceId}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Tipo de Ejecución:</Text>{' '}
              {deviceInfo.esSimu}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Fabricante:</Text> {deviceInfo.disFabri}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Nivel de API:</Text> {deviceInfo.disAPI}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Total de RAM:</Text>{' '}
              {deviceInfo.decRAM} GB
            </Text>
          </View>
        ) : (
          <Text style={styles.text}>Cargando información del dispositivo...</Text>
        )}
      </View>
   
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    padding: 10, // Espacio más pequeño
    backgroundColor: 'rgba(199, 188, 170, 0.75)', // Fondo semitransparente
    borderRadius: 10, // Borde curvo
  },
  infoContainer: {
    borderWidth: 2,
    marginTop:20,
    paddingTop: 10,
    padding: 50,
    backgroundColor: 'rgba(198, 179, 198, 0.85)',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default InfoDispositivo;