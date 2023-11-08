import React from 'react'
import { View } from 'react-native'
import { CalculatorInput } from 'react-native-calculator'
import { Calculator } from 'react-native-calculator'
 
export default function CalculaldoraReact(){
    return (
        <View>
          <CalculatorInput
            fieldTextStyle={{ fontSize: 24 }}
            fieldContainerStyle={{ height: 36 }}
          />
        </View>
      );
  }

