# Clonage du dépôt
En mode ssh, le clonage du dépôt sur votre poste local se fait par la commande suivante :
```bash
git clone git@gitlab.siovhb.lycee-basch.fr:annie-baraban/ap41-stages-reactnat.git
```
Une fois le dépôt cloné, votre répertoire courant disposera d'un nouveau sous répertoire nommé `ap41-stages-reactnat`.

# Installer les modules node et configurer votre application
Assurez-vous d'avoir installé au préalable nodejs de version >= à 18.

- Se positionner dans le répertoire local contenant votre dépôt
- Lancer la commande suivante pour installer les modules spécifiés dans package.json sous `node_modules` :
```bash
npm install  
```

Ce projet utilise des variables d'environnement pour gérer les endpoints d'API. Nous utilisons le système natif d'Expo (`EXPO_PUBLIC_`).

Les variables d'environnement réelles ne sont pas versionnées pour des raisons de sécurité et de flexibilité locale. Pour commencer, créez votre propre fichier `.env` à la racine du projet en vous basant sur le modèle fourni :

```bash
# Copier le modèle vers le fichier local
cp .env.dist .env
```
Dans ce fichier `.env`, adapter la valeur de la variable `EXPO_PUBLIC_API_BASE_URL` de l'API-Rest en fonction de l'environnement d'exécution de l'API-Rest.

>>>[!IMPORTANT]
Note sur l'adresse IP : Si vous testez sur un appareil physique (Android/iOS) via Expo Go, n'utilisez pas localhost. Utilisez l'adresse IP locale de votre machine (ex: 192.168.x.x).
>>>

# Lancer l'application sur terminal Android
## Démarrer le serveur Expo
Dans une fenêtre terminal, depuis le dossier du projet :
```bash
npx expo start
```
Vous verrez apparaître dans le terminal un QR code ainsi qu'un menu d'options.
## Tester sur terminal Android
1. Démarrez un terminal virtuel Android sur votre poste ou branchez un smartphone par câble usb sur votre poste de travail.
2. Appuyez sur a dans la fenêtre terminal pour y charger votre application. Vous devriez voir apparaître un écran de connexion.
3. Démarrez l'API-Rest ap32-stages-apirest avec l'authentification JWT
4. Saisissez l'adresse mail et le mot de passe d'un étudiant connu de votre API-Rest. Vous devriez voir la liste des organisations, nom et ville pour chacune d'elles. Les écrans liés aux contacts et stages sont en cours de construction.



## Pour tester sous un terminal virtualisé avec virtualbox:
Testé sous [android-x86](https://www.android-x86.org/).


1. Configurer le réseau de la machine virtuelle en mode pont.
2. Activer le débug usb dans son terminal android.
3. Noter l'adresse IP de la machine virtuelle: Systeme -> A propos -> Adresse IP
4. Dans la machine hôte démarrer le serveur `adb` en mode `tcpip`
    ```
    adb tcpip 5555
    ```
5. Dans la machine hôte, se connecter à la VM:
    ```
    adb connect IP:5555
    ```
6. Vérifier que la machine est listée en retour de la commande `adb devices`.
7. Lancer 
8. Démarrer le serveur Expo
    ```bash
    npx expo start
    ```
9. Taper `Shift + a` pour sélectionner une machine
10. Sélectionner votre machine virtuelle et appuyer sur entrer.

