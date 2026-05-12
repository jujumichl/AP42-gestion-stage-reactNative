import React, { useState } from 'react';

export default function AjouterContactScreen() {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [fonction, setFonction] = useState('');

    return (
        <View style={styles.container}>
            <Text>Ajouter un contact</Text>
        </View>
    );
}
