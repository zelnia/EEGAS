import React, { useState } from 'react'; 
import { StyleSheet, Text,FlatList, TextInput, View, TouchableOpacity, Platform, Alert, SafeAreaView, ScrollView } from 'react-native';
import NetInfo  from "@react-native-community/netinfo";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function storeData(key,value){
  try {
    await AsyncStorage.setItem(key, value)
    console.log('Data successfully saved '+key+" "+value);
  } catch (e) {
    console.log(e);
  }
}

async function getData(key){
    let value = await AsyncStorage.getItem(key);
    return value;
}

async function getLocal(navigation) {  
  let lstoken = await getData('@token_cliente');
  let nome_cliente = await getData('@nome_cliente');  
  if(lstoken!==null){ 
    navigation.navigate('schermata1', {
      user: nome_cliente,
      token: lstoken,
    });  
  }
};  

const apiroot="https://www.m2r-crm-test.it/dashboard/app/script/backend5/api/V1/";
const XAUTHTOKEN="hbGciOiJIUzI1NiJ9.Sb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2";
async function ApiRequest(endpoint,jbody,token,callback){
  await fetch(apiroot+endpoint, {
    //ode: "no-cors",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN': XAUTHTOKEN,
      'TOKEN-CLIENTE': token
    }, 
    body: jbody    
  })    
  .then((response) => response.json())
  .then((json) => { 
    if(callback!==null){
      callback(json);
    }
  })
  .catch((error) => {
    console.error(error);
  }); 
}

function Accesso({ navigation }) {
  getLocal(navigation);
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
                  fetch(apiroot+'chiamata_1.php', {
                    //ode: "no-cors",
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'X-AUTH-TOKEN': 'hbGciOiJIUzI1NiJ9.Sb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2'
                    },
                    // body: JSON.stringify({
                    //   "input_data": {
                    //     "cf": "BRTLSE86A66G224X",
                    //     "cc": "C0000005"
                    //   }
                    // })    
                    body: JSON.stringify({
                      "input_data": {
                          "cf": Value,
                          "cc": secret_Value
                      }
                    })    
                  })    
                  .then((response) => response.json())
                  .then((json) => { 
                    storeData("@token_cliente",json.output_data.token_cliente);  
                    storeData("@nome_cliente",json.output_data.nome_cliente);          
                    navigation.navigate('schermata1', {
                      user: json.output_data.nome_cliente,
                      token: json.output_data.token_cliente
                    });
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
const schermata1 = ({ navigation, route }) => {console.log(route.params.token);
  const janagrafici=JSON.stringify({
    "input_data": {
      "tipo_richiesta":"dati_anagrafici"
    }
  }); 
  const jfatt=JSON.stringify({
    "input_data": {
        "tipo_richiesta":"dati_fatture"
    }
  }); 
  return (
    <View style={styles.container}>
      <View style={[{maxHeight:400}, styles.divinterno2, styles.w100]}>
        <Text style={styles.h2}>Benvenuto, {route.params.user}</Text> 
        {/* <Text style={styles.h2}>Benvenuto, {route.params.user}</Text>  */}
        <Text style={styles.mt15}>Ti trovi nel tuo centro di controllo: da qui potrai verificare le tue fatture e molto altro...</Text> 
        <TouchableOpacity
          onPress={
            () => ApiRequest("dati_anagrafici.php",janagrafici,route.params.token,
              function naviga(async_anagraf){
                navigation.navigate('DatiAnagrafici', {
                  user: route.params.user,
                  token: route.params.token,
                  jdati: async_anagraf
                });
              }
            )
          }
          style={[styles.bordomsblu, styles.mt15, styles.py10, styles.w100, styles.centro]}>
          <Text style={{ fontSize: 20, color: 'mediumslateblue' }}>Dati Anagrafici</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={
            
            () => ApiRequest("dati_fatture.php",jfatt,route.params.token,
              function naviga(async_fatt){
                navigation.navigate('DatiFatture', {
                  user: route.params.user,
                  token: route.params.token,
                  jdati: async_fatt
                });
              }
            )
          }
          style={[styles.bordomsblu, styles.mt15, styles.py10, styles.w100, styles.centro]}>
          <Text style={{ fontSize: 20, color: 'mediumslateblue' }}>Fatture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Registrazione')}
          style={[styles.bordomsblu, styles.mt15, styles.py10, styles.w100, styles.centro]}>
          <Text style={{ fontSize: 20, color: 'mediumslateblue' }}>Modulistica</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}; 

const DatiAnagrafici = ({ navigation, route }) => { 
  var dati=route.params.jdati;
  const renderItem = ({ item }) => (
    <View style={[styles.container2, styles.w100]}>
      <Text>Punto: <strong>{item.punto}</strong></Text>
      <View  style={[styles.separator]}></View>
      <Text>Indirizzo: {item.indirizzo}</Text>
      <Text>Città: {item.citta} {item.provincia} {item.cap}</Text>
      <Text>Riferimento Email: {item.email}</Text>
      <Text>Cumulo: {item.cumulo}</Text>
      <Text>Classe Utenza: {item.classe_utenza}</Text>
      <Text>Data: {item.data_apertura}</Text>
      <Text>Numero Utenza: {item.nr_utenza}</Text>
      <Text>Numero Cliente: {item.nr_cliente}</Text>
      <Text>Offerta: {item.descrizione_offerta}</Text>
      <Text>Tensione: {item.tens_nominale}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[{maxHeight:400}, styles.divinterno2, styles.w100]}>
        <Text style={[styles.w100]}>Dati Anagrafici di punti di</Text> 
        <Text style={[styles.h2,styles.w100]}>{route.params.user}</Text> 
        <FlatList
          style={{width:'100%'}}
          data={dati.output_data}
          renderItem={renderItem}
          keyExtractor={item => item.punto}
        />
      </View>
    </View>
  );
}; 

const DatiFatture = ({ navigation, route }) => { 
  var dati=route.params.jdati;
  console.log("Test");
  console.log({dati});
  const renderItem = ({ item }) => (
    <View style={[styles.container2, styles.w100]}>
      <Text>Emissione: <strong>{item.emissione}</strong></Text>
      <View  style={[styles.separator]}></View>
      <Text>Documento: <strong>{item.doc}</strong></Text>
      <Text>Utenza:: <strong>{item.nr_utenza}</strong></Text>
      <Text>Cliente: <strong>{item.nr_cliente}</strong></Text>
      <Text>Nominativo: <strong>{item.nome_completo}</strong></Text>
      <Text>Data di apertura: <strong>{item.data_apertura}</strong></Text>
      <Text>Data di chiusura: <strong>{item.data_chiusura}</strong></Text>
      <Text>Data di emissione: <strong>{item.emissione}</strong></Text>
      <Text>Data di scadenza: <strong>{item.scadenza}</strong></Text>
      <Text>Totale: <strong>{item.tot_a_pagare}</strong></Text>
      <Text>Indirizzo: <strong>{item.indirizzo_sped}</strong></Text>
      <Text>Cap: <strong>{item.cap_sped}</strong></Text>
      <Text>Città: <strong>{item.citta_sped}</strong></Text>
      <Text>Provincia: <strong>{item.prov_sped}</strong></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[{maxHeight:400}, styles.divinterno2, styles.w100]}>
        <Text style={[styles.w100]}>Dati Fatture</Text> 
        <Text style={[styles.h2,styles.w100]}>{route.params.user}</Text> 
        <FlatList
          style={{width:'100%'}}
          data={dati.output_data}
          renderItem={renderItem}
          keyExtractor={item => item.punto}
        />
      </View>
    </View>
    
  );
}; 
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accesso" component={Accesso} />
        <Stack.Screen name="schermata1" component={schermata1} options={{ title: 'Centro di controllo' }} />
        <Stack.Screen name="Registrazione" component={Registrazione} />
        <Stack.Screen name="DatiAnagrafici" component={DatiAnagrafici} />
        <Stack.Screen name="DatiFatture" component={DatiFatture} />
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
  container2: {
    flex: 1,
    backgroundColor: '#f7f4ee',
    justifyContent: 'left',
    padding:5,
    margin:5
  },
  separator: {
    flex: 1,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    width:'100%',
    padding:1,
    marginBottom:5
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
  },item: {
    backgroundColor: "#f7ead7",
    padding: 20,
    marginVertical: 8
  },
  title: {
    fontSize: 24
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  }
});