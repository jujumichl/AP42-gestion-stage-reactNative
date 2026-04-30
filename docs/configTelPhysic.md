# Configuration nécessaire pour la mise en place de Expo Go sur un Téléphone physique 
## Sur votre téléphone : 
Vérifier que vous avez installer l'application Expo Goà disponnible sur play Store ou sur Apple Store

Aller dans les paramètres puis noter le SDK supporter (dans notre exemple c'est le 54)

## Sur votre ordinateur :
Rétrograder Expo Go avec les commandes suivantes :  
 ```bash
 npx install expo@<SDK_SUPPORTER>
 npx install --fix # µTrès importante pour que ExpoGo fonctionne
 ```

Une fois que cela est fait il vous suffit de lancer votre expo avec `npx expo start -c` (le `-c` sert a vider le cache).

> [!WARNING]
> Dans votre .env.local l'URL de l'API doit être accessible depuis votre mobile. 
> Vous pouvez passer par votre IP si vous être sur le même réseaux. N'oubliez pas de vérifier vos configuration Apache (écoute du port 80) et que le port est ouvert.

# Remise en état de ExpoGo (dernière version)
Pour revenir a la dernière version de Expo Go il vous suffit d'exécuter ces 2 commandes :
```bash
npx install expo@latest
npx install --fix
```