const monUrlBase = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function postConnexion(email, mdp) {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: email, password: mdp })
    }

    console.log(`API : POST ${monUrlBase}/login - ` + JSON.stringify(settings));
    let response = await fetch(`${monUrlBase}/login`, settings);

    const body = await response.json();
    if (response.status === 401 && body.message !== null) {
        throw new Error(`Connexion - Identifiants erronés`);
    }
    if (!response.ok) {
        throw new Error(`Erreur réseau API login - code statut ${response.status}`);
    }
    console.log(`API : POST ${monUrlBase}/login - code statut ${response.status}`);
    return body;
}
