import { useEffect, useState, useCallback } from 'react';
import * as Battery from 'expo-battery';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { useBatteryState, useLowPowerMode } from 'expo-battery';

export default function InfBateria() {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const batState = useBatteryState();
  const estBateria =
    batState === 1
      ? 'Desconectado'
      : batState === 2
      ? 'Cargando'
      : batState === 3
      ? 'Carga completa'
      : 'Estado desconocido';
  const esAhorro = useLowPowerMode();

  const _subscribe = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(batteryLevel);

    setSubscription(
      Battery.addBatteryLevelListener(({ batteryLevel }) => {
        setBatteryLevel(batteryLevel);
        console.log('batteryLevel changed!', batteryLevel);
      })
    );
  };

  const _unsubscribe = useCallback(() => {
    subscription && subscription.remove();
    setSubscription(null);
  }, [subscription]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, [_unsubscribe]);

  return (
    <ImageBackground
      source={require('../src/bgs/bg-inf-bateria.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.overlayContainer}>
          {batteryLevel !== null && (
            <View style={styles.imageContainer}>
              <Image
                source={
                  batteryLevel > 0.8
                    ? require('../src/bgs/niv-bateria.jpg')
                    : batteryLevel <= 0.8
                    ? require('../src/bgs/niv-bateria80.jpg')
                    : batteryLevel <= 0.6
                    ? require('../src/bgs/niv-bateria60.jpg')
                    : batteryLevel <= 0.4
                    ? require('../src/bgs/niv-bateria40.jpg')
                    : batteryLevel <= 0.2
                    ? require('../src/bgs/niv-bateria20.jpg')
                    : require('../src/bgs/niv-bateria0.jpg')
                }
                style={styles.batteryImage}
              />
            </View>
          )}
          <Text style={styles.title}>Nivel de batería</Text>
          <Text style={styles.text}> {Math.round(batteryLevel * 100)}%</Text>
          <Text style={styles.title}>Estado de la batería</Text>
          <Text style={styles.text}>{estBateria}</Text>
          <Text style={styles.title}>Modo Ahorro de Energía</Text>
          <Text style={styles.text}>{esAhorro ? 'Activado' : 'Desactivado'}</Text>
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
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlayContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 50,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  batteryImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  title: {
    color: 'white',
    fontSize: 20, // Tamaño de fuente más grande
    fontWeight: 'bold', // Texto en negrita
  },
  text: {
    color: 'white',
    fontSize: 18, // Tamaño de fuente más grande
  },
});
