const fs = require('fs');
const csv = require('csv-parser');

class readerCsv {

    static getActivityData(db) {

        let results = [];
        let matrice = [];
        for (let i = 0; i < 8; i++) {
            matrice[i] = [];
        }

        fs.createReadStream('/home/ioan/Bureau/Tech. Prod. Log./Projet-REST-master/data/234400034_004-009_activites-des-fiches-equipements-rpdl.csv')
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(function (element) {
                    matrice[0].push(parseInt(element['Activité code'])); // Activité code
                    matrice[1].push(JSON.stringify(element['Activité libellé'])); // Activité libellé
                    matrice[2].push(parseInt(element['Numéro de la fiche équipement'])); // Numéro de la fiche équipement
                    matrice[3].push(JSON.stringify(element['Niveau de l\'activité - Classif.'])); // Niveau de l'activité
                });

                /************* Insertion Données dans la BD *************/

                /* for( let i = 0; i < matrice[0].length; i++ ){

                    db.run( "INSERT INTO activites (Activitecode,Activitelibelle,Numerodelaficheequipement,Niveaudelactivite)" +
                        " VALUES (" +
                        matrice[0][i] + "," +
                        matrice[1][i] + "," +
                        matrice[2][i] + "," +
                        matrice[3][i] + ")"
                    );
                } */

            });

    };

    static getInstallationData(db) {

        let results = [];
        let matrice = [];
        for (let i = 0; i < 17; i++) {
            matrice[i] = [];
        }

        fs.createReadStream('/home/ioan/Bureau/Tech. Prod. Log./Projet-REST-master/data/234400034_004-010_fiches-installations-rpdl.csv')
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', () => {

                let coordY = [];
                let coordX = [];

                results.forEach(function (element) {

                    /************* Coordonnées *************/

                    let coordonnees = JSON.stringify(element['localisation']);

                    coordX = coordonnees.replace(/^"(\d{2}\.\d+), -?\d\.\d+"$/, '$1');
                    coordY = coordonnees.replace(/^"\d{2}\.\d+, (-?\d\.\d+)"$/, '$1');

                    /************* Code Postal *************/

                    let codePostal;
                    if( element['Code postal'] === '' ){
                        codePostal = '10000';
                    } else {
                        codePostal = element['Code postal'];
                    }

                    /************* Adresse *************/

                    let adresse = '';
                    if( element['Numero de la voie'] === '' ){
                        adresse += '';
                    } else {
                        adresse = element['Numero de la voie'] + ' ';
                    }

                    if( element['Nom de la voie'] === '' ){
                        adresse += '';
                    } else {
                        adresse = element['Nom de la voie'] + ' ';
                    }

                    if( element['Nom du lieu dit'] === '' ){
                        adresse += '';
                    } else {
                        adresse = element['Nom du lieu dit'] + ' ';
                    }

                    if( adresse === '' ){
                        adresse = 'null';
                    }

                    /************* Déssertes Bus *************/

                    let bus;

                    bus = element['Desserte bus'] === 'Oui';

                    /************* Déssertes Train *************/

                    let train;

                    train = element['Desserte train'] === 'Oui';

                    /************* Déssertes Tram *************/

                    let tram;

                    tram = element['Desserte Tram'] === 'Oui';

                    /************* Accessibilité handicapés à mobilité réduite *************/

                    let accHand;

                    accHand = element['Accessibilité handicapés à mobilité réduite'] === 'Oui';

                    /************* Nombre total de place de parking *************/
                    
                    let nbPlacePark;
                    if( element['Nombre total de place de parking'] === '' ){
                        nbPlacePark = '0';
                    } else {
                        nbPlacePark = element['Nombre total de place de parking'];
                    }

                    /************* Nombre total de place de parking handicapés *************/

                    let nbPlaceParkHand;
                    if( element['Nombre total de place de parking handicapés'] === '' ){
                        nbPlaceParkHand = '0';
                    } else {
                        nbPlaceParkHand = element['Nombre total de place de parking handicapés'];
                    }

                    matrice[0].push(parseInt(element['Numéro de l\'installation'])); // Numéro de l'installation
                    matrice[1].push(JSON.stringify(element['Nom usuel de l\'installation'])); // Nom usuel de l'installation
                    matrice[2].push(parseInt(element['Code INSEE'])); // Code INSEE
                    matrice[3].push(parseInt(element['Code du département'])); // Code du département
                    matrice[4].push(parseInt(codePostal)); // Code postal
                    matrice[5].push(JSON.stringify(element['Département'])); // Département
                    matrice[6].push(JSON.stringify(element['Nom de la commune'])); // Nom de la commune
                    matrice[7].push(JSON.stringify(adresse)); // Adresse
                    matrice[8].push(parseFloat(coordX)); // Coordonnées X
                    matrice[9].push(parseFloat(coordY)); // Coordonnées Y
                    matrice[10].push(bus == true); // Désserte bus
                    matrice[11].push(train == true); // Désserte train
                    matrice[12].push(tram == true); // Désserte tram
                    matrice[13].push(JSON.stringify(element['Installation particulière'])); // Installation particulière
                    matrice[14].push(accHand == true); // Accessibilité handicapés à mobilité réduite
                    matrice[15].push(parseInt(nbPlacePark)); // Nombre total de place de parking
                    matrice[16].push(parseInt(nbPlaceParkHand)); // Nombre total de place de parking handicapés

                });

                /************* Insertion Données dans la BD *************/

                /* for( let j = 0; j < matrice[0].length; j++ ){

                    db.run( "INSERT INTO installations (NumInstallation,NomInstallation,CodeINSEE,CodeDepartement,CodePostal,NomDepartement,NomCommune,Adresse,LocX,LocY,DesserteBus,DesserteTrain,DesserteTram,InstalParticuliere,AccessibleHandicapés,NbplaceParking,NbplaceParkingHandicapés)" +
                        " VALUES (" +
                        matrice[0][j] + "," +
                        matrice[1][j] + "," +
                        matrice[2][j] + "," +
                        matrice[3][j] + "," +
                        matrice[4][j] + "," +
                        matrice[5][j] + "," +
                        matrice[6][j] + "," +
                        matrice[7][j] + "," +
                        matrice[8][j] + "," +
                        matrice[9][j] + "," +
                        matrice[10][j] + "," +
                        matrice[11][j] + "," +
                        matrice[12][j] + "," +
                        matrice[13][j] + "," +
                        matrice[14][j] + "," +
                        matrice[15][j] + "," +
                        matrice[16][j] + ")"
                    );
                } */

            });
    }

    static getStuffData(db) {
        let results = [];
        let matrice = [];
        for (let i = 0; i < 60; i++) {
            matrice[i] = [];
        }

        fs.createReadStream('/home/ioan/Bureau/Tech. Prod. Log./Projet-REST-master/data/234400034_004-011_fiches-equipements-rpdl.csv')
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(function (element) {
                    matrice[0].push(element['Numéro de la fiche équipement']); // Numéro de la fiche équipement
                    matrice[1].push(element['Equipement']); // Équipement
                    matrice[2].push(element['Numéro de l\'installation']); // Numéro de l'installation
                    matrice[3].push(element['Type d\'équipement']); // Type d'équipement
                    matrice[4].push(element['Propriétaire principal']); // Propriétaire principal
                    matrice[5].push(element['Gestionnaire principal']); // Gestionnaire principal
                    matrice[6].push(element['Présence d\'un éclairage']); // Présence d'un éclairage
                    matrice[7].push(element['Salle polyvalente']); // Salle polyvalente
                    matrice[8].push(element['Etablissement de plein air']); // Etablissement de plein air
                    matrice[9].push(element['Etablissement sportif couvert']); // Etablissement sportif couvert
                    matrice[10].push(element['Nombre de place en tribune']); // Nombre de place en tribune
                    matrice[11].push(element['Libellé de la nature du sol']); // Libellé de la nature du sol
                    matrice[12].push(element['Aire d\'évolution Longueur']); // Aire d'évolution Longueur
                    matrice[13].push(element['Aire d\'évolution Largeur']); // Aire d'évolution Largeur
                    matrice[14].push(element['Nombre de couloir / piste / poste / etc.']); // Nombre de couloir / piste / poste / etc.
                    matrice[15].push(element['Nombre de vestiaire sportif']); // Nombre de vestiaire sportif
                    matrice[16].push(element['Sono fixe']); // Sono fixe
                    matrice[17].push(element['Tableau fixe']); // Tableau fixe
                    matrice[18].push(element['Chronométrage']); // Chronométrage
                    matrice[19].push(element['Nombre de sanitaire public']); // Nombre de sanitaire public
                    matrice[20].push(element['Accès handicapé mobilité Aire d\'évolution']); // Accès handicapé mobilité Aire d'évolution
                    matrice[21].push(element['Accès handicapé mobilité Tribune']); // Accès handicapé mobilité Tribune
                    matrice[22].push(element['Accès handicapé mobilité Vestiaire']); // Accès handicapé mobilité Vestiaire
                    matrice[23].push(element['Accès handicapé mobilité sanitaire sportif']); // Accès handicapé mobilité sanitaire sportif
                    matrice[24].push(element['Accès handicapé mobilité sanitaire public']); // Accès handicapé mobilité sanitaire public
                    matrice[25].push(element['Accueil club']); // Accueil club
                    matrice[26].push(element['Accueil salle de réunion']); // Accueil salle de réunion
                    matrice[27].push(element['Accueil buvette']); // Accueil buvette
                    matrice[28].push(element['Accueil infirmerie']); // Accueil infirmerie
                    matrice[29].push(element['Accueil réception']); // Accueil réception
                    matrice[30].push(element['Accueil local rangement']); // Accueil local rangement
                    matrice[31].push(element['Nombre de couloirs pour les structures artificielles d\'escalade']); // Nombre de couloirs pour les structures artificielles d'escalade
                    matrice[32].push(element['Hauteur pour les structures artificielles d\'escalade']); // Hauteur pour les structures artificielles d'escalade
                    matrice[33].push(element['Surface pour les structures artificielles d\'escalade']); // Surface pour les structures artificielles d'escalade
                    matrice[34].push(element['Nombre d\'aires de saut']); // Nombre d'aires de saut
                    matrice[35].push(element['Nombre d\'aires de saut en hauteur']); // Nombre d'aires de saut en hauteur
                    matrice[36].push(element['Nombre d\'aires de saut en longueur']); // Nombre d'aires de saut en longueur
                    matrice[37].push(element['Nombre d\'aires de saut en triple saut']); // Nombre d'aires de saut en triple saut
                    matrice[38].push(element['Nombre d\'aires de saut en longueur et triple saut']); // Nombre d'aires de saut en longueur et triple saut
                    matrice[39].push(element['Nombre d\'aires de saut en sautoir perche']); // Nombre d'aires de saut en sautoir perche
                    matrice[40].push(element['Nombre d\'aires de poids']); // Nombre d'aires de poids
                    matrice[41].push(element['Nombre d\'aires de disques']); // Nombre d'aires de disques
                    matrice[42].push(element['Nombre d\'aires de disques']); // Nombre d'aires de disques
                    matrice[43].push(element['Nombre d\'aires de disques']); // Nombre d'aires de disques

                    //matrice[0].push(element['']); // Code du département
                    //matrice[1].push(string.replace(/.*"Departement":"(.*)","Code INSEE.*/, '$1')); // Departement
                    //matrice[2].push(string.replace(/.*"Code INSEE":"(\d{5})".*/, '$1')); // Code INSEE
                    //matrice[3].push(string.replace(/.*"Commune":"(.*)","Numéro de l'installation.*/, '$1')); // Commune
                    //matrice[5].push(string.replace(/.*"Nom usuel de l'installation":"(.*)","Numéro de la fiche équipement.*/, '$1')); // Nom usuel de l'installation
                    //matrice[8].push(string.replace(/.*"Batiment":"(.*)","Nombre d'équipements identiques.*/, '$1')); // Batiment --
                    //matrice[9].push(string.replace(/.*"Type d'équipement_Code":"(\d*)".*/, '$1')); // Type d'équipement_Code
                    //matrice[17].push(string.replace(/.*"Catégorie établissement recevant du public de 1 à 5":"(.*)","Année de mise en service.*/, '$1')); // Catégorie établissement recevant du public de 1 à 5
                    //matrice[27].push(string.replace(/.*"localisation":"(.*)"}/, '$1')); // Localisation
                    //matrice[37].push(string.replace(/.*"Accueil bureau":"(Oui|Non)".*/, '$1')); // Accueil bureau
                    //matrice[43].push(string.replace(/.*"Site escalade Nombre de voies":"(\d*)","Classe fédérale mi.*/, '$1')); // Site escalade Nombre de voies
                });

                // console.log(matrice[31])
            });
    }

}

module.exports = readerCsv;