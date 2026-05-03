const monUrlBase = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function getStages(token) {
    const settings = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    console.log(`API : GET ${monUrlBase}/stages - ` + JSON.stringify(settings));
    let response = await fetch(`${monUrlBase}/stages`, settings);
    console.log(`API : GET ${monUrlBase}/stages - code statut ${response.status}`);

    const body = await response.json();
    if (!response.ok) {
        console.log(`API : GET ${monUrlBase}/stages - code statut ${response.status} - ${body?.message ?? 'Pas de message'}`);
        throw new Error(`Erreur réseau API stages - code statut ${response.status}`, {cause : response.status});
    }
    return body;
}

