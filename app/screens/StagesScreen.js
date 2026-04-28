import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthProvider';
import { getStages } from '../api/stages';

export default function StagesScreen() {   
   const [listeStages, setlisteStages] = useState([]);
       const navigation = useNavigation();
       const {user} = useAuth();
   
       // callback appelée à chaque fois que l'écran reçoit le focus
       useFocusEffect(
         React.useCallback(() => {
           async function fetchData() {        
               const token = user.token;
               try {
                   let body = await getStages(token);              
                   setlisteStages(body.data);
               } 
               catch (error) {
                 console.log(`StagesScreen - Erreur lors de la récupération des stages : ${error}`);  
                 if (error.cause === 401) {
                     alert(`Connexion échue. Il faut vous reconnecter`);
                     logout();
                 }
              }
           }
   
           fetchData();
   
           // Optionnel : une fonction de nettoyage si nécessaire
           return () => {}; 
         }, []) 
       );
   
       const renderItem = ({ item }) => (
           <TouchableOpacity onPress={() => navigation.navigate('StageDetail', { stage: item })}>
               <View style={styles.card}>
                 <Text style={styles.nom}>{item.organisation.nom} - {item.organisation.ville}</Text>            
                 <Text style={styles.details}>{item.descriptifMissions ?? null }</Text>   
               </View>
           </TouchableOpacity>
       );    
       return (
           <View style={styles.container}>
             <FlatList
               data={listeStages}
               keyExtractor={item => item.id.toString()}
               renderItem={renderItem}
               contentContainerStyle={{ paddingBottom: 20 }}
             />
           </View>
       );
   };
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: 'white',
       padding: 8,
     },
     card: {
       flexDirection: 'column',
       backgroundColor: '#F5F5F5',
       borderRadius: 10,
       marginVertical: 8,
       padding: 10,
       elevation: 2,
     },
     nom: {
       fontSize: 18,
       fontWeight: 'bold',
       marginBottom: 4,
     },
     details: {
       fontSize: 12,
       color: '#666',
     },
   });