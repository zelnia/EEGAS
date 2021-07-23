import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, TextInputComponent, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.divinterno1}>
        <Text style={styles.h2}>Effettua l'accesso:</Text>
        <Text style={styles.mt15}>Login:</Text>
        <TextInput 
          style={styles.bordogrigio}
          textAlign={'center'}
        />
        <Text style={styles.mt15}>Password:</Text>
        <TextInput 
          style={styles.bordogrigio}
          secureTextEntry={true} 
          textAlign={'center'}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  divinterno1: {
    flex: 1,
    marginVertical:50,
    paddingHorizontal:50,
    paddingTop:25,
    paddingBottom:50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "#444",
    borderRadius: 4,
    maxHeight:220,
  },
  container: {
    flex: 1,
    backgroundColor: '#444',
    alignItems: 'center',
    padding:25,
  },
  bordogrigio: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 2,
    backgroundColor: "#aaddff",
  },
  mt15:{
    marginTop: 15,
  },
  h2: {
    fontSize: 30,
    fontWeight: "bold",
  }
});
