import React, { useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Text, TextInput, FlatList, Button } from 'react-native';
import { postContactOragnisation } from '../api/contacts';
import { useAuth } from '../context/AuthProvider';
import { useNavigation } from '@react-navigation/native';

export default function AjouterContactScreen({ route }) {
    const navigation = useNavigation();
    const [civilite, setCivilite] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [fonction, setFonction] = useState('');

    const { user } = useAuth();
    const token = user?.token;

    async function validerContact() {
    const organisation_id = route?.params?.organisation?.id || '';

        let unBody = {
            civilite,
            nom,
            prenom,
            email,
            tel,
            fonction,
            organisation_id,
        };
        if (!nom && !prenom && (!email || !tel)) {
        alert('Veuillez renseigner au moins un champ');
        return;
    }
        try {
            const body = await postContactOragnisation(token, unBody);
            console.log(`AjouterContactScreen - Ajout enregistrée : ${body.message}`);
            alert('Contact enregistrée !');
            navigation.goBack();
        }
        catch (error) {
            console.log(`AjouterContactScreen - Erreur lors de l'ajout du contact : ${error}`);
            if (error.cause === 400) {
                alert(`Les données entrées ne sont pas correcte. Veuillez réessayer.`)
            }
            if (error.cause === 401) {
                alert(`Connexion échue. Il faut vous reconnecter`);
                logout();
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter un contact</Text>
            <View style={styles.formCard}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Civilité</Text>
                    <TextInput style={styles.details}
                        placeholder="Mr, Mme"
                        value={civilite}
                        onChangeText={setCivilite}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nom</Text>
                    <TextInput style={styles.details}
                        placeholder="Dupont"
                        value={nom}
                        onChangeText={setNom}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Prénom</Text>
                    <TextInput style={styles.details}
                        placeholder="Jack"
                        value={prenom}
                        onChangeText={setPrenom}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Téléphone</Text>
                    <TextInput style={styles.details}
                        placeholder='0123456789'
                        value={tel}
                        onChangeText={setTel}
                        keyboardType="phone-pad" // Petit bonus pour l'UX
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.details}
                        placeholder='nom.prenom@exemple.com'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Fonction</Text>
                    <TextInput style={styles.details}
                        placeholder='Commerciale'
                        value={fonction}
                        onChangeText={setFonction}
                        autoCapitalize="none"
                    />
                </View>
            </View>
            <Button style={styles.bouton} title="Ajouter" onPress={validerContact} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginLeft: 20,
        fontSize: 30
    },
    details: {
        marginLeft: 10,
        marginBottom: 10
    }
})