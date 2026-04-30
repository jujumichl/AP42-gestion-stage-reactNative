import { StyleSheet, View, Text, FlatList } from 'react-native';

export default function ContactsOrganisation({ contact }) {
    console.log(contact);
    return (
        <FlatList
            data={contact}
            keyExtractor={(item, index) => item[0]?.toString() || index.toString()}
            renderItem={({ item }) => (
                <View style={{ marginBottom: 16 }}>
                    <View style={styles.contactCard}>
                        <Text style={styles.details}>Nom : </Text>
                        <Text style={styles.info}>{item[1]?.nom}</Text>
                    </View>
                    <View style={styles.contactCard}>
                        <Text style={styles.details}>Prénom : </Text>
                        <Text style={styles.info}>{item[1]?.prenom}</Text>
                    </View>
                    <View style={styles.contactCard}>
                        <Text style={styles.details}>Email : </Text>
                        <Text style={styles.info}>{item[1]?.email}</Text>
                    </View>
                    <View style={styles.contactCard}>
                        <Text style={styles.details}>Téléphone : </Text>
                        <Text style={styles.info}>{item[1]?.tel}</Text>
                    </View>
                    <View style={styles.contactCard}>
                        <Text style={styles.details}>Fonction : </Text>
                        <Text style={styles.info}>{item[1]?.fonction}</Text>
                    </View>
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
    contactCard: {
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    details: {
        flexDirection: 'row',
        marginBottom: 5,
        fontWeight: '600',
        color: '#333',
    },
    info: {
        flexDirection: 'row',
        marginBottom: 5,
        fontWeight: '400',
        color: '#666',
    },
})