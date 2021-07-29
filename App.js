import React, { useState } from 'react'; 
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



function Accesso({ navigation }) {
  const [user, setuser] = useState('')
  const [pwd, setpwd] = useState('')
  var Value = user;
  var secret_Value = pwd;
  return (
    <View style={styles.container}>
      <View style={styles.divinterno1}>
        <Text style={styles.h2}>Effettua l'accesso:</Text>
        <Text style={styles.mt15}>Login:</Text>
        <TextInput 
          style={[styles.bordogrigio,styles.w100]}
          textAlign={'center'}
          onChangeText={(Value) => {
            setuser(Value)
          }}
          />
        <Text style={styles.mt15}>Password:</Text>
        <TextInput 
          style={[styles.bordogrigio,styles.w100]}
          secureTextEntry={true} 
          textAlign={'center'}
          onChangeText={(secret_Value) => {
            setpwd(secret_Value)
          }}
          />      
        <TouchableOpacity
          onPress={() => navigation.navigate('schermata1', {
            user: Value,
            pwd: secret_Value,
          })}
          style={[{ backgroundColor: 'lightgrey' }, styles.mt15, styles.py10, styles.w100, styles.centro]}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Accedi</Text>
        </TouchableOpacity>
        {/* <StatusBar style="auto" /> */}
      </View>
    </View>
  );
}
const schermata1 = ({ navigation, route }) => {
  if(route.params.user=="Utente" && route.params.pwd=="pwd"){
    return <Text>Profilo dell'utente {route.params.user}</Text>;
  } else {
    return <Text>Dati errati</Text>;
  }
}; 


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accesso" component={Accesso} />
        <Stack.Screen name="schermata1" component={schermata1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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
    maxHeight:280,
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
  px15:{
    paddingHorizontal: 15,
  },
  py10:{
    paddingVertical: 10,
  },
  h2: {
    fontSize: 30,
    fontWeight: "bold",
  },
  w100: {
    width:'100%',
  },
  centro: {
    alignItems: 'center',
  }
});