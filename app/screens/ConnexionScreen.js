import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthProvider';

export default function ConnexionScreen() {
    const [email, setEmail] = useState('nicolas.batauld@lycee-basch.fr'); // en dev valeur en dur
    const [password, setPassword] = useState('passe');// en dev valeur en dur
    const { login } = useAuth();

    async function handleSignIn() {
        if (!email || !password) {
            alert('Veuillez entrer un email et un mot de passe');
            return;
        }
        try {
            await login(email, password);
        }
        catch (error) {
            console.log(`Erreur réseau : ${error}`);
            alert('Erreur de connexion');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion étudiant</Text>
            <TextInput
                style={styles.input}
                placeholder="etudiant@gmail.com"
                keyboardType='email-address'
                value={email}// en dev valeur en dur

                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={password}// en dev valeur en dur

                onChangeText={setPassword}
            />
            <Button title="Sign In" onPress={handleSignIn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
});
