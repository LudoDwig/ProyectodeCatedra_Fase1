import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Clipboard, ImageBackground } from 'react-native';

const GenContra = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState('8'); // Longitud predeterminada como cadena
  const minLength = 5;
  const maxLength = 15;
  const [copied, setCopied] = useState(false); // Estado para controlar si se ha copiado la contraseña

  const generateRandomPassword = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    return newPassword;
  };

  const handleGeneratePassword = () => {
    const length = parseInt(passwordLength);

    if (isNaN(length) || length < minLength || length > maxLength) {
      alert(`Ingrese un largo válido de contraseña entre ${minLength} y ${maxLength} caracteres.`);
      return;
    }

    const newPassword = generateRandomPassword(length);
    setPassword(newPassword);
    setCopied(false); // Reiniciar el estado de copiado al generar una nueva contraseña
  };

  const handleCopyPassword = async () => {
    if (password) {
      await Clipboard.setString(password);
      setCopied(true);
      alert('Contraseña copiada al portapapeles.');
    }
  };

  return (
    <ImageBackground
      source={require('../src/bgs/gen-contra-bg.jpg')} // Ruta de la imagen semitransparente
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordText}>{password}</Text>
          {password && (
            <View style={styles.copyButtonContainer}>
              <Button
                title={copied ? 'Copiado' : 'Copiar'}
                onPress={handleCopyPassword}
                disabled={copied}
              />
            </View>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={passwordLength}
            onChangeText={(text) => setPasswordLength(text)}
          />
          <Button title="Generar Contraseña" onPress={handleGeneratePassword} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    marginTop: 300,
    backgroundColor: 'rgba(238, 190, 252, 0.7)', // Fondo semitransparente
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  passwordContainer: {

    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  passwordText: {
    fontSize: 24,
  },
  copyButtonContainer: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  
  
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
    textAlign: 'center',
    marginRight: 10,
  },
});

export default GenContra;
