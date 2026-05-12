const monUrlBase = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function getContact(token) {

    const settings = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    console.log(`API : GET ${monUrlBase}/contacts - ` + JSON.stringify(settings));
    let response = await fetch(`${monUrlBase}/contacts`, settings);
    console.log(`API : GET ${monUrlBase}/contacts - code statut ${response.status}`);

    const body = await response.json();
    if (!response.ok) {
        console.log(`API : GET ${monUrlBase}/contacts - code statut ${response.status} - ${body?.message ?? 'Pas de message'}`);
        throw new Error(`Erreur réseau API contacts - code statut ${response.status}`, { cause: response.status });
    }
    return body;
};

export async function getContactsOrganisation(token, idOragnisation) {
    const settings = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }
    console.log(`API : GET ${monUrlBase}/organisation/${idOragnisation}/contacts - ` + JSON.stringify(settings));
    let response = await fetch(`${monUrlBase}/organisation/${idOragnisation}/contacts`, settings);
    console.log(`API : GET ${monUrlBase}/organisation/${idOragnisation}/contacts - code statut ${response.status}`);
    const body = await response.json();
    if (!response.ok) {
        console.log(`API : GET ${monUrlBase}/contacts - code statut ${response.status} - ${body?.message ?? 'Pas de message'}`);
        throw new Error(`Erreur réseau API contacts - code statut ${response.status}`, { cause: response.status });
    }
    return body;
}

export async function postContactOragnisation(token, unBody) {
    let settings = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(unBody)
    }

    console.log(`API : POST ${monUrlBase}/contact - ` + JSON.stringify(settings));
    let response = await fetch(`${monUrlBase}/contact`, settings);
    console.log(`API : POST ${monUrlBase}/contact - code statut ${response.status}`);
    const body = await response.json();
    if (!response.ok) {
        console.log(`API : POST ${monUrlBase}/contact - code statut ${response.status} - ${body?.message ?? 'Pas de message'}`);
        throw new Error(`Erreur réseau API contact - code statut ${response.status}`, {cause : response.status});
    }    

    return body;
}