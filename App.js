import React, { useState } from 'react'; 
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Platform, Alert, SafeAreaView, ScrollView } from 'react-native';
import NetInfo  from "@react-native-community/netinfo";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// var CheckConnectivity = () => {
//   // For Android devices
//   if (Platform.OS === "android") {
//     NetInfo.isConnected.fetch().then(isConnected => {
//       if (isConnected) {
//         Alert.alert("You are online!");
//       } else {
//         Alert.alert("You are offline!");
//       }
//     });
//   } else if (Platform.OS === "ios")  {
//     // For iOS devices
//     NetInfo.isConnected.addEventListener(
//       "connectionChange",
//       this.handleFirstConnectivityChange
//     );
//   }
// };


// var handleFirstConnectivityChange = isConnected => {
//   NetInfo.isConnected.removeEventListener(
//     "connectionChange",
//     this.handleFirstConnectivityChange
//   );
//   if (isConnected === false) {
//     Alert.alert("You are offline!");
//   } else {
//     Alert.alert("You are online!");
//   }
// };

function Accesso({ navigation }) {
  const [user, setuser] = useState('')
  const [pwd, setpwd] = useState('')
  var Value = user;
  var secret_Value = pwd;
  return (
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView>
        <View style={styles.container}>
          <View style={[{maxHeight:320}, styles.divinterno1]}>
            <Text style={styles.h2}>Effettua l'accesso:</Text>
            <Text style={styles.mt15}>Codice Fiscale:</Text>
            <TextInput 
              style={[styles.bordogrigio,styles.w100]}
              textAlign={'center'}
              onChangeText={(Value) => {
                setuser(Value)
              }}
              />
            <Text style={styles.mt15}>Codice Cliente:</Text>
            <TextInput 
              style={[styles.bordogrigio,styles.w100]}
              secureTextEntry={true} 
              textAlign={'center'}
              onChangeText={(secret_Value) => {
                setpwd(secret_Value)
              }}
              />      
            <TouchableOpacity
              onPress={
                () => {
                  //CheckConnectivity();
                  NetInfo.fetch().then(state => {
                    console.log("Connection type", state.type);
                    console.log("Is connected?", state.isConnected);
                      if (state.isConnected) {
                        Alert.alert("Sei connesso!");
                      } else {
                        Alert.alert("Sei offline!");
                      }
                  });                    
                  fetch('https://www.m2r-crm-test.it/dashboard/app/script/backend5/api/V1/chiamata_1.php', {
                    //ode: "no-cors",
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'X-AUTH-TOKEN': 'hbGciOiJIUzI1NiJ9.Sb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2'
                    },
                    body: JSON.stringify({
                      "input_data": {
                        "cf": "BRTLSE86A66G224X",
                        "cc": "C0000005"
                      }
                    })    
                    // body: JSON.stringify({
                    //   "input_data": {
                    //       "cf": Value,
                    //       "cc": secret_Value
                    //   }
                    // })    
                  })    
                  .then((response) => response.json())
                  .then((json) => {                
                    navigation.navigate('schermata1', {
                      user: json.output_data.nome_cliente,
                      //pwd: secret_Value,
                    });
                    console.log("XXX "+json.output_data.nome_cliente);
                  })
                  .catch((error) => {
                    console.error(error);
                  });                
                  // .then((response) => response.json())
                  // .then((output_data) => {
                  //   Alert.alert(output_data.nome_cliente);
                  // })
                  // .catch((error) => {
                  //   console.error(error);
                  // });
                  // navigation.navigate('schermata1', {
                  //   user: Value,
                  //   pwd: secret_Value,
                  // })
                }
              }
              style={[{ backgroundColor: 'lightgrey' }, styles.mt15, styles.py10, styles.w100, styles.centro]}>
              <Text style={{ fontSize: 20, color: '#fff' }}>Accedi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Registrazione')}
              style={[{ backgroundColor: 'limegreen' }, styles.mt15, styles.py10, styles.w100, styles.centro]}>
              <Text style={{ fontSize: 20, color: '#fff' }}>Registrati</Text>
            </TouchableOpacity>
            {/* <StatusBar style="auto" /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function Registrazione({ navigation }) {
  const [nome, set_nome] = useState('');
  var v_nome = nome;
  const [cognome, set_cognome] = useState('');
  var v_cognome = cognome;
  const [CF, set_CF] = useState('');
  var v_CF = CF;
  const [tel, set_tel] = useState('');
  var v_tel = tel;
  const [utente, set_utente] = useState('');
  var v_utente = utente;
  const [pass, set_pass] = useState('');
  var v_pass = pass;
  const [cpass, set_cpass] = useState('');
  var v_cpass = cpass;
  return (
    
    <SafeAreaView style={styles.safeareaview}>
      <ScrollView>
        <View style={[{maxHeight:600}, styles.divinterno1]}>
          <Text style={styles.h2}>Registrati:</Text>
          <Text style={styles.mt15}>Nome:</Text>
          <TextInput 
            style={[styles.bordogrigio,styles.w100]}
            textAlign={'center'}
            onChangeText={(nome) => {
              set_nome(nome)
            }}
          />     
          <Text style={styles.mt15}>Cognome:</Text>
          <TextInput 
            style={[styles.bordogrigio,styles.w100]}
            textAlign={'center'}
            onChangeText={(cognome) => {
              set_cognome(cognome)
            }}
          />     
          <Text style={styles.mt15}>Codice Fiscale:</Text>
          <TextInput 
            style={[styles.bordogrigio,styles.w100]}
            textAlign={'center'}
            onChangeText={(CF) => {
              set_CF(CF)
            }}
          />     
          <Text style={styles.mt15}>Telefono:</Text>
          <TextInput 
            style={[styles.bordogrigio,styles.w100]}
            textAlign={'center'}
            onChangeText={(tel) => {
              set_tel(tel)
            }}
          />     
          <Text style={styles.mt15}>Nome utente:</Text>
          <TextInput 
            style={[styles.bordogrigio,styles.w100]}
            textAlign={'center'}
            onChangeText={(utente) => {
              set_utente(utente)
            }}
          />     
          <Text style={styles.mt15}>Password:</Text>
          <TextInput 
            style={[styles.bordogrigio,styles.w100]}
            textAlign={'center'}
            onChangeText={(pass) => {
              set_pass(pass)
            }}
          />     
          <Text style={styles.mt15}>Conferma password:</Text>
          <TextInput 
            style={[styles.bordogrigio,styles.w100]}
            textAlign={'center'}
            onChangeText={(cpass) => {
              set_cpass(cpass)
            }}
          />     
          <TouchableOpacity
            style={[{ backgroundColor: 'lightgrey' }, styles.mt15, styles.py10, styles.w100, styles.centro]}>
            <Text style={{ fontSize: 20, color: '#fff' }}>Invia</Text>
          </TouchableOpacity>
        </View>
      </ScrollView >
    </SafeAreaView>
  );
}
const schermata1 = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <View style={[{maxHeight:400}, styles.divinterno2, styles.w100]}>
        <Text style={styles.h2}>Benvenuto, {route.params.user}</Text> 
        <Text style={styles.mt15}>Ti trovi nel tuo centro di controllo: da qui potrai verificare le tue fatture e molto altro...</Text> 
        <TouchableOpacity
          onPress={() => navigation.navigate('Accesso')}
          style={[styles.bordomsblu, styles.mt15, styles.py10, styles.w100, styles.centro]}>
          <Text style={{ fontSize: 20, color: 'mediumslateblue' }}>Fatture Elettricità</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Registrazione')}
          style={[styles.bordomsblu, styles.mt15, styles.py10, styles.w100, styles.centro]}>
          <Text style={{ fontSize: 20, color: 'mediumslateblue' }}>Fatture Gas Naturale</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Registrazione')}
          style={[styles.bordomsblu, styles.mt15, styles.py10, styles.w100, styles.centro]}>
          <Text style={{ fontSize: 20, color: 'mediumslateblue' }}>Modulistica</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  // } else {
  //   return (
  //     <View style={styles.container}>
  //       <View style={[{maxHeight:350}, styles.divinterno1]}>
  //         <Text style={styles.h2}>Dati errati</Text> 
  //         <Text style={styles.mt15}>Per favore inserisci i dati corretti oppure procedi alla registrazione</Text> 
  //         <TouchableOpacity
  //           onPress={() => navigation.navigate('Accesso')}
  //           style={[{ backgroundColor: 'lightgrey' }, styles.mt15, styles.py10, styles.w100, styles.centro]}>
  //           <Text style={{ fontSize: 20, color: '#fff' }}>Accedi</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           onPress={() => navigation.navigate('Registrazione')}
  //           style={[{ backgroundColor: 'limegreen' }, styles.mt15, styles.py10, styles.w100, styles.centro]}>
  //           <Text style={{ fontSize: 20, color: '#fff' }}>Registrati</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }
}; 


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accesso" component={Accesso} />
        <Stack.Screen name="schermata1" component={schermata1} options={{ title: 'Centro di controllo' }} />
        <Stack.Screen name="Registrazione" component={Registrazione} />
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
  },
  divinterno2: {
    flex: 1,
    marginVertical:50,
    paddingHorizontal:20,
    paddingTop:15,
    paddingBottom:20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: "#444",
    borderRadius: 4,
  },
  container: {
    flex: 1,
    backgroundColor: '#444',
    alignItems: 'center',
    padding:25,
  },
  safeareaview: {
    flex: 1,
    backgroundColor: '#444',
  },
  bordogrigio: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 2,
    backgroundColor: "#aaddff",
  },
  bordomsblu: {
    borderWidth: 1,
    borderColor: "mediumslateblue",
    borderRadius: 2,
    backgroundColor: "#cceeff",
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
    fontSize: 20,
    fontWeight: "bold",
  },
  w100: {
    alignSelf: 'stretch',
    width:'100%',
    minWidth:200,
  },
  centro: {
    alignItems: 'center',
  }
});