const monUrlBase = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function getOrganisations(token) {
    const settings = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    };

    console.log(`API : GET ${monUrlBase}/organisations - ` + JSON.stringify(settings));
    let response = await fetch(`${monUrlBase}/organisations`, settings);
    console.log(`API : GET ${monUrlBase}/organisations - code statut ${response.status}`);

    const body = await response.json();
    if (!response.ok) {
        console.log(`API : GET ${monUrlBase}/organisations - code statut ${response.status} - ${body?.message ?? 'Pas de message'}`);
        throw new Error(`Erreur réseau API organisations - code statut ${response.status}`, {cause : response.status});
    }
    return body;
}

export async function putOrganisation(token, id, unBody) {
    let settings = {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(unBody)
    }

    console.log(`API : PUT ${monUrlBase}/organisations - ` + JSON.stringify(settings));
    let response = await fetch(`${monUrlBase}/organisations/${id}`, settings);
    console.log(`API : PUT ${monUrlBase}/organisations - code statut ${response.status}`);
    const body = await response.json();
    if (!response.ok) {
        console.log(`API : PUT ${monUrlBase}/organisations - code statut ${response.status} - ${body?.message ?? 'Pas de message'}`);
        throw new Error(`Erreur réseau API organisations - code statut ${response.status}`, {cause : response.status});
    }    

    return body;
}
