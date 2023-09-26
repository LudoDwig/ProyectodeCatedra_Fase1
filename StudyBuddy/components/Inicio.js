import React from 'react';
import { View, Button } from 'react-native';
//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
function Inicio({ navigation }) {
  return (
    <View>
      <Button
        title="Bloc de Notas"
        onPress={() => navigation.navigate('Notas')}
      />
      {/* Agrega otros botones o elementos para otros gadgets */}
    </View>
  );
}

export default Inicio;
