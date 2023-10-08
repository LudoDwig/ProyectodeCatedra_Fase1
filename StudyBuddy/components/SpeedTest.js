import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const SpeedTestApp = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [progress, setProgress] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: downloadSpeed ? 100 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [downloadSpeed, progress]);

  const measureSpeed = async () => {
    try {
      const startTimestamp = Date.now();
      const response = await fetch('https://autogestion.metrotel.com.ar/speedtest/archivo10MB.zip');
      const endTimestamp = Date.now();
      const contentLength = parseInt(response.headers.get('Content-Length'), 10);
      const fileSizeInMB = contentLength / 1024 / 1024; // Tamaño del archivo en megabytes
      const durationInSeconds = (endTimestamp - startTimestamp) / 1000; // Tiempo en segundos
      const downloadSpeed = (fileSizeInMB / durationInSeconds).toFixed(2); // Calcular velocidad en MB/s
      setDownloadSpeed(downloadSpeed + ' MB/s');
    } catch (error) {
      console.error('Error al medir la velocidad: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speed Test</Text>
      <TouchableOpacity style={styles.button} onPress={measureSpeed}>
        <Text style={styles.buttonText}>Medir Velocidad de Descarga</Text>
      </TouchableOpacity>
      {downloadSpeed && <Text style={styles.speedText}>Velocidad de descarga: {downloadSpeed} MB/s</Text>}

      <View style={styles.meterContainer}>
        <Animated.View style={[styles.meter, { width: progress.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        }) }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  speedText: {
    fontSize: 18,
    marginVertical: 10,
  },
  meterContainer: {
    width: '80%',
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  meter: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
});

export default SpeedTestApp;
