import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useState } from 'react';


export default function HeaderInput({ organisation }) {

    const [rue, setRue] = useState(organisation.rue);
    const [ville, setVille] = useState(organisation.ville);
    const [codePostal, setCodePostal] = useState(organisation.codePostal);
    const [tel, setTel] = useState(organisation.tel);
    const [email, setEmail] = useState(organisation.email);
    const [urlSiteWeb, setUrlSiteWeb] = useState(organisation.urlSiteWeb);
    
    return (
        <View style={styles.formCard}>
            <Text style={styles.title}>{organisation.nom}</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Adresse</Text>
                <TextInput style={styles.details}
                    placeholder="100 boulevard de l'Europe"
                    value={rue}
                    onChangeText={setRue}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Code postal</Text>
                <TextInput style={styles.details}
                    placeholder='35200'
                    value={codePostal}
                    onChangeText={setCodePostal}
                    keyboardType="numeric" // Petit bonus pour l'UX
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Ville</Text>
                <TextInput style={styles.details}
                    placeholder='Rennes'
                    value={ville}
                    onChangeText={setVille}
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
                <Text style={styles.label}>Url Site Web</Text>
                <TextInput style={styles.details}
                    placeholder='https://www.exemple.com'
                    value={urlSiteWeb}
                    onChangeText={setUrlSiteWeb}
                    keyboardType="url"
                    autoCapitalize="none"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formCard: {
        width: '80%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        marginBottom: 5,
        fontWeight: '600',
        color: '#333',
    },
    details: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
})