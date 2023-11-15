import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function CalculadoraReact() {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState([]);



  const handleButtonPress = (value) => {
    if (value === '=') {
      try {
        const result = eval(display);
        setDisplay(result.toFixed(2).toString());
        setHistory([...history, { expression: display, result: result.toFixed(2) }]);
      } catch (error) {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('');
    } else if (value === 'DEL') {
      setDisplay(display.slice(0, -1));
    } else if (value === '√') {
      const squareRoot = Math.sqrt(parseFloat(display));
      setDisplay(squareRoot.toFixed(2).toString());
    } else {
      setDisplay(display + value);
    }
  };





  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{display}</Text>
      </View>
      <ScrollView style={styles.historyContainer}>
        {history.map((entry, index) => (
          <Text key={index} style={styles.historyText}>
            {entry.expression} = {entry.result}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.buttonsContainer}>
        {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '.',  '0', '=', '/', 'DEL','C', '√'].map((button) => (
          <TouchableOpacity
            key={button}
            onPress={() => handleButtonPress(button)}
            style={
              button === '+' || button === '-' || button === '*' || button === '/'
                ? styles.operationButton
                : button === 'DEL' || button === 'C' || button === '=' || button === '.' || button === '√'
                ? styles.specialButton
                : styles.button
            }
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',

  },
  display: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 10,
  },


  displayText: {
    fontSize: 48,
    color: '#ffffff',
  },
  historyContainer: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
  },
  historyText: {
    fontSize: 16,
    color: '#ffffff',
  },

  buttonsContainer: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },


  button: {
    width: '25%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#444',
    borderRadius: 10,
  },
  operationButton: {
    width: '25%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'orange',
    borderRadius: 10,

  },
  specialButton: {
    width: '25%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: 'purple',
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 24,
    color: '#ffffff',
  },


});
