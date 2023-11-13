import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const IpSubnet = () => {
  const [ipAddress, setIpAddress] = useState([0, 0, 0, 0]);
  const [slashValue, setSlashValue] = useState(24);
  const [networkAddress, setNetworkAddress] = useState([0, 0, 0, 0]);
  const [subnetMask, setSubnetMask] = useState([0, 0, 0, 0]);
  const [wildcardMask, setWildcardMask] = useState([0, 0, 0, 0]);
  const [addressClass, setAddressClass] = useState("");
  const [firstAddress, setFirstAddress] = useState([0, 0, 0, 0]);
  const [lastAddress, setLastAddress] = useState([0, 0, 0, 0]);
  const [broadcastAddress, setBroadcastAddress] = useState([0, 0, 0, 0]);
  const [nextNetwork, setNextNetwork] = useState([0, 0, 0, 0]);
  const [availableHosts, setAvailableHosts] = useState(0);
  const [numberSubnets, setNumberSubnets] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    const sanitizedIpAddress = ipAddress.map((quartet) => Math.min(quartet, 255));
    setIpAddress(sanitizedIpAddress);
  

    const isValid = ipAddress.every((quartet) => quartet <= 255);

    if (isValid) {
    const newSubnetMask = getSubnetMask();
    setSubnetMask(newSubnetMask);

    const newWildcardMask = getWildcardMask(newSubnetMask);
    setWildcardMask(newWildcardMask);

    const newNetworkAddress = getNetworkAddress(newSubnetMask);
    setNetworkAddress(newNetworkAddress);

    const newNextNetworkAddress = getNextNetworkAddress(
      newNetworkAddress,
      newSubnetMask
    );
    setNextNetwork(newNextNetworkAddress);

    const newFirstAddress = incrementIpAddress(newNetworkAddress);
    setFirstAddress(newFirstAddress);

    const newBroadcastAddress = decrementIpAddress(newNextNetworkAddress);
    setBroadcastAddress(newBroadcastAddress);

    const newLastAddress = decrementIpAddress(newBroadcastAddress);
    setLastAddress(newLastAddress);

    const newAvailableHosts = getAvailableHosts();
    setAvailableHosts(newAvailableHosts);

    const newAddressClass = getAddressClass();
    setAddressClass(newAddressClass);

    const newNumberSubnets = getNumberSubnets(newAddressClass);
    setNumberSubnets(newNumberSubnets);
    }else{
        Alert.alert('Advertencia', 'Ningún cuarteto debe ser mayor a 255');
    }
  };

  const getNetworkAddress = (subnetMask) => {
    let newNetworkAddress = [...ipAddress];
    for (let i = 0; i < subnetMask.length; i++) {
      newNetworkAddress[i] = newNetworkAddress[i] & subnetMask[i];
    }
    return newNetworkAddress;
  };

  const incrementIpAddress = (networkAddress) => {
    let newIpAddress = [...networkAddress];
    for (let i = 3; i >= 0; i--) {
      newIpAddress[i] = newIpAddress[i] + 1;
      if (newIpAddress[i] === 256) {
        newIpAddress[i] = 0;
      } else {
        break;
      }
    }
    return newIpAddress;
  };

  const incrementOctet = (networkAddress, octetIndex, increase) => {
    let newIpAddress = [...networkAddress];
    let carryOver = 0;
    for (let i = octetIndex; i >= 0; i--) {
      newIpAddress[i] = newIpAddress[i] + increase + carryOver;
      increase = 0;
      if (newIpAddress[i] >= 256) {
        carryOver = newIpAddress[i] - 255;
        newIpAddress[i] = 0;
      } else {
        break;
      }
    }
    return newIpAddress;
  };

  const decrementIpAddress = (networkAddress) => {
    let newIpAddress = [...networkAddress];
    for (let i = 3; i >= 0; i--) {
      newIpAddress[i] = newIpAddress[i] - 1;
      if (newIpAddress[i] === -1) {
        newIpAddress[i] = 255;
      } else {
        break;
      }
    }
    return newIpAddress;
  };

  const getNextNetworkAddress = (networkAddress) => {
    const increase = slashValue % 8 > 0 ? Math.pow(2, 8 - (slashValue % 8)) : 1;
    const changedOctet = Math.ceil(slashValue / 8) - 1;
    let newNextNetwork = [...networkAddress];
    newNextNetwork = incrementOctet(newNextNetwork, changedOctet, increase); //newNextNetwork[changedQuartet] + increase;
    return newNextNetwork;
  };

  const getSubnetMask = () => {
    const fullOctets = Math.floor(slashValue / 8);
    const remainingBits = slashValue % 8;
    const partialOctet =
      ("0b" + "1".repeat(remainingBits)) << (8 - remainingBits);
    let newSubnetMask = [0, 0, 0, 0];
    let i = 0;
    while (i < fullOctets) {
      newSubnetMask[i] = 255;
      i++;
    }
    newSubnetMask[i] = partialOctet;
    return newSubnetMask;
  };

  const getWildcardMask = (subnetMask) => {
    const newWildcardMask = [...subnetMask];
    for (let i = 0; i < subnetMask.length; i++) {
      newWildcardMask[i] = 255 - newWildcardMask[i];
    }
    return newWildcardMask;
  };

  const getAvailableHosts = () => {
    return Math.pow(2, 32 - slashValue) - 2;
  };

  const getNumberSubnets = (addressClass) => {
    const classMap = {
        A: 8,
        B: 16,
        C: 24,
        D: 0,
        E: 0,
    };

    if (slashValue <= classMap[addressClass]) {
        return 0;
    }

    const exp = slashValue - classMap[addressClass];
    return Math.pow(2, exp);
};

const getAddressClass = () => {
    const firstOctet = ipAddress[0];

    if (firstOctet >= 0 && firstOctet < 128) {
        return 'A';
    } else if (firstOctet >= 128 && firstOctet < 192) {
        return 'B';
    } else if (firstOctet >= 192 && firstOctet < 224) {
        return 'C';
    } else if (firstOctet >= 224 && firstOctet < 240) {
        return 'D';
    } else if (firstOctet >= 240 && firstOctet <= 255) {
        return 'E';
    } else {
        return 'Unknown';
    }
};




  const updateIpAddress = (e, quartetIndex) => {
    let newIpAddress = [...ipAddress];
    newIpAddress[quartetIndex] = parseInt(e.currentTarget.value);
    setIpAddress(newIpAddress);
  };

  const updateSlashValue = (e) => {
    const newSlashValue = parseInt(e.currentTarget.value.replace("/", ""));
    setSlashValue(newSlashValue);
  };



  return (
    <ImageBackground
        source={require('../src/bgs/sub-bg.jpg')} // Reemplaza con la ruta de tu imagen de fondo
        style={styles.backgroundImage}
      >
    <View>
    <View style={styles.container}>
    
    <View style={styles.row}>
  {[0, 1, 2, 3].map((quartetIndex) => (
    <View key={quartetIndex} style={styles.inputContainer}>
      <TextInput
  style={styles.input}
  keyboardType="numeric"
  maxLength={3}
  onChangeText={(text) => {
    const sanitizedText = text.replace(/[^0-9]/g, '');
    if (sanitizedText.length <= 3 && parseInt(sanitizedText) <= 255) {
      updateIpAddress({ currentTarget: { value: sanitizedText } }, quartetIndex);
    }
  }}
/>




    </View>
  ))}
  <View style={styles.inputContainer}>
    <Picker
      selectedValue={`/${slashValue}`}
      style={styles.picker}
      onValueChange={(itemValue) => updateSlashValue({ currentTarget: { value: itemValue } })}
    >
      {Array.from({ length: 32 }, (_, index) => (
        <Picker.Item key={index} label={`/${index + 1}`} value={`/${index + 1}`} />
      ))}
    </Picker>
   
  
    
  </View>
</View>

    </View>

    <View style={styles.listContainer}>
    <Button onPress={handleClick} title="Ok" color="#8B0AA0" style={styles.boton} />
    <View style={styles.listItem}>
    <Text style={styles.listHeader}>{`MASCARA SELECCIONADA: /${slashValue}`}</Text>
    </View>
    {/* Header: NETWORK ADDRESS */}
    <View style={styles.listItem}>
      <Text style={styles.listHeader}>DIRECCION DE RED</Text>
      <Text>{networkAddress.join('.')}</Text>
    </View>
  
    {/* Header: FIRST ADDRESS */}
    <View style={styles.listItem}>
      <Text style={styles.listHeader}>GATEWAY</Text>
      <Text>{firstAddress.join('.')}</Text>
    </View>
  
    {/* Header: LAST HOST ADDRESS */}
    <View style={styles.listItem}>
      <Text style={styles.listHeader}>ULTIMA IP DE HOST</Text>
      <Text>{lastAddress.join('.')}</Text>
    </View>
  
    {/* Header: BROADCAST ADDRESS */}
    <View style={styles.listItem}>
      <Text style={styles.listHeader}>DIRECCION DE BROADCAST</Text>
      <Text>{broadcastAddress.join('.')}</Text>
    </View>
  
    {/* Header: NEXT NETWORK */}
    <View style={styles.listItem}>
      <Text style={styles.listHeader}>SIGUIENTE RED</Text>
      <Text>{nextNetwork.join('.')}</Text>
    </View>
  
    {/* Header: AVAILABLE HOST ADDRESSES */}
    <View style={styles.listItem}>
      <Text style={styles.listHeader}>DIRECCIONES DE HOST DISPONIBLES</Text>
      <Text>{availableHosts.toLocaleString('en-US')}</Text>
    </View>
  
    {/* Header: CLASS */}
    <View style={styles.listItem}>
      <Text style={styles.listHeader}>CLASE</Text>
      <Text>{addressClass}</Text>
    </View>
  
    {/* Header: SUBNET MASK */}
    <View style={styles.listItem}>
      <Text style={styles.listHeader}>MASCARA DE RED</Text>
      <Text>{subnetMask.join('.')}</Text>
    </View>
    <View style={styles.listItem}>
    <Text style={styles.listHeader}>MASCARA DE WILDMASK</Text>
    <Text>{wildcardMask.join('.')}</Text>
  </View>

  {/* Header: NUMBER OF SUBNETS */}
  <View style={styles.listItem}>
    <Text style={styles.listHeader}>NUMERO DE SUBREDES</Text>
    <Text>{numberSubnets.toLocaleString('en-US')}</Text>
  </View>
</View>
</View>
</ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(230, 231, 254, 0.55)',
  },

    inputContainer: {
        
        flex: 0.5,  
        borderWidth: 0,
        
              
      },
      input: {
        borderWidth: 1,
        borderRadius: 5,       
        borderColor: 'blue',
        
        borderRadius: 10,
        padding: 10,
        borderBottomWidth: 3,
        backgroundColor: 'rgba(230, 231, 254, 0.55)'
      },
      picker: {
        fontSize: 16,  // Ajustamos el tamaño del texto
        // Otros estilos...
      },
      
    row: {
      marginTop: 30,
      flexDirection: 'row',
      
    },
    Container: {
      flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'rgba(230, 231, 254, 0.85)',
    marginTop: 20,
    paddingLeft: 7,
    padding: 15,
    marginBottom: 30,
    },
    
    listContainer: {
        height: 450, 
        marginTop: 20,
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: 'rgba(230, 231, 254, 0.85)',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'right',
      },
    listItem: {
     
    },
    listHeader: {
      fontWeight: 'bold',
     
    },
    boton:{
      color: 'black',
    },
  
  });
export default IpSubnet;