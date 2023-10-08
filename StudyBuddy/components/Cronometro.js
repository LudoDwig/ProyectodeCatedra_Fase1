import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CronometroApp({ navigation }) {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  const handleStartStop = useCallback(() => {
    setRunning((prevRunning) => !prevRunning);
  }, []);

  const handleReset = useCallback(() => {
    setRunning(false);
    setTime(0);
  }, []);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 100); // Cambiado a 10 para representar milisegundos
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (milliseconds) => {
    const totalMilliseconds = milliseconds % 1000;
    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);

    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}.${padTime(totalMilliseconds, 3)}`;
  };

  const padTime = (time, length = 2) => {
    return String(time).padStart(length, '0');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStartStop}>
          <Text style={styles.buttonText}>
            {running ? 'Parar' : 'Iniciar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  configButton: {
    marginTop: 20,
  },
  configButtonText: {
    color: '#007AFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
