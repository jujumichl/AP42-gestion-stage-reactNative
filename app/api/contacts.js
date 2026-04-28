const monUrlBase = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function getContact(token, idOragnisation) {
    let body = {data : [{id: 1, nom: "John", prenom: "Doe", email: "john.doe@example.com", tel: "0123456789"}, {id: 2, nom: "Moisseron", prenom: "Luka", email: "mosseron.loku@lycee-basch.fr", tel: "0123456789"}]}

    // const settings = {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${token}`,
    //     }
    // }
    // console.log(`API : GET ${monUrlBase}/contacts - ` + JSON.stringify(settings));
    // let response = await fetch(`${monUrlBase}/contacts`, settings);
    // console.log(`API : GET ${monUrlBase}/contacts - code statut ${response.status}`);

    // const body = await response.json();
    // if (!response.ok) {
    //     console.log(`API : GET ${monUrlBase}/contacts - code statut ${response.status} - ${body?.message ?? 'Pas de message'}`);
    //     throw new Error(`Erreur réseau API contacts - code statut ${response.status}`, {cause : response.status});
    // }
    return body;
};
   
