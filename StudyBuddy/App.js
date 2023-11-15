import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import NavegacionApp from './components/Navegacion';



const App = () => {
 
  return (
    <NavegacionApp/>
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
