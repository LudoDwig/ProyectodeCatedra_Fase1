import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function CronometroApp() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [capturedTimes, setCapturedTimes] = useState([]);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 100); // Incrementar en 100 milisegundos
      }, 100);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [running]);

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setCapturedTimes([]);
    setRunning(false);
    setTime(0);
  };

  const handleCaptureTime = () => {
    if (running) {
      setCapturedTimes([...capturedTimes, time]);
    }
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = (milliseconds % 1000).toString().slice(0, 1); // Solo un dígito de los milisegundos
    return `${padTime(minutes)}:${padTime(seconds)}:${ms}`;
  };

  const padTime = (time) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  const capturing = running || capturedTimes.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timer}>{formatTime(time)}</Text>
      </View>
      {capturing ? (
        <TouchableOpacity style={styles.captureButton} onPress={handleCaptureTime}>
          <Text style={styles.captureButtonText}>Capturar</Text>
        </TouchableOpacity>
      ) : null}
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
      {capturedTimes.length > 0 && (
        <ScrollView style={styles.timesContainer}>
          {capturedTimes.map((capturedTime, index) => (
            <Text key={index} style={styles.capturedTime}>
              <Text style={styles.boldText}>Tiempo {index + 1}:</Text> <Text>{formatTime(capturedTime)}</Text>
            </Text>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6D2E6',
  },
  timerContainer: {
    borderWidth: 5,
    backgroundColor: '#5EBF5E',
    borderRadius: 50,
    padding: 20,
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
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
  captureButton: {
    backgroundColor: '#FFD070',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  captureButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  timesContainer: {
    maxHeight: 200,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  capturedTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    paddingBottom: 20,
    fontWeight: 'bold',
  },
});
