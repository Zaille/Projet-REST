const fs = require('fs');
const csv = require('csv-parser');

class readerCsv {

    getActivityData(){

        let results = [];
        let matrice = [];
        for( let i = 0; i < 8; i++ ){ matrice[i] = []; }

        fs.createReadStream('/home/ioan/Bureau/Tech. Prod. Log./Projet-REST-master/data/234400034_004-009_activites-des-fiches-equipements-rpdl.csv')
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(function (element) {
                    let string = JSON.stringify(element);
                    matrice[0].push(string.replace(/{"Code du département":"(\d{2})".*/, '$1')); // Code du département
                    matrice[1].push(string.replace(/.*,"Libellé du département":"(.*)","Code INSEE.*/, '$1')); // Libellé du département
                    matrice[2].push(string.replace(/.*,"Code INSEE":"(\d{5})".*/, '$1')); // Code INSEE
                    matrice[3].push(string.replace(/.*,"Nom de la commune":(.*)","Numéro de la fiche équipement.*/, '$1')); // Nom de la commune
                    matrice[4].push(string.replace(/.*,"Numéro de la fiche équipement":"(\d+)".*/, '$1')); // Numéro de la fiche équipement
                    matrice[5].push(string.replace(/.*,"Activité code":"(\d+)",.*/, '$1')); // Activité code
                    matrice[6].push(string.replace(/.*,"Activité libellé":"(.*)","Activité praticable.*/, '$1')); // Activité libellé
                    matrice[7].push(string.replace(/.*,"localisation":"(.*)"}/, '$1')); // Localisation
                });

                return matrice;
            });

    };

    getInstallationData(){

        let results = [];
        let matrice = [];
        for( let i = 0; i < 18; i++ ){ matrice[i] = []; }

        fs.createReadStream('/home/ioan/Bureau/Tech. Prod. Log./Projet-REST-master/data/234400034_004-010_fiches-installations-rpdl.csv')
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(function (element) {
                    let string = JSON.stringify(element);
                    matrice[0].push(string.replace(/{"Code du département":"(\d{2})".*/, '$1')); // Code du département
                    matrice[1].push(string.replace(/.*"Département":"(.*)","Code INSEE.*/, '$1')); // Département
                    matrice[2].push(string.replace(/.*"Code INSEE":"(\d{5})",.*/, '$1')); // Code INSEE
                    matrice[3].push(string.replace(/.*"Nom de la commune":"(.*)","Numéro de l'installation.*/, '$1')); // Nom de la commune
                    matrice[4].push(string.replace(/.*"Numéro de l'installation":"(\d{9})",.*/, '$1')); // Numéro de l'installation
                    matrice[5].push(string.replace(/.*"Nom usuel de l'installation":"(.*)","Numero de la voie.*/, '$1')); // Nom usuel de l'installation
                    matrice[6].push(string.replace(/.*"Code postal":"(\d{5})",.*/, '$1')); // Code postal
                    matrice[7].push(string.replace(/.*localisation":"(.*)"}/, '$1')); // Localisation
                    matrice[8].push(string.replace(/.*"Desserte bus":"(Oui|Non)",.*/, '$1')); // Desserte bus
                    matrice[9].push(string.replace(/.*"Desserte Tram":"(Oui|Non)",.*/, '$1')); // Desserte tram
                    matrice[10].push(string.replace(/.*"Numero de la voie":"(.*)","Nom de la voie.*/, '$1')); // Numero de la voie
                    matrice[11].push(string.replace(/.*"Nom de la voie":"(.*)","Nom du lieu dit.*/, '$1')); // Nom de la voie
                    matrice[12].push(string.replace(/.*"Nom du lieu dit":"(.*)","Code postal.*/, '$1')); // Nom du lieu dit
                    matrice[13].push(string.replace(/.*"Installation particulière":"(.*|Non)","Multi commune".*/, '$1')); // Installation particulière
                    matrice[14].push(string.replace(/.*"Aucun aménagement d'accessibilité":"(Oui|Non)".*/, '$1')); // Aucun aménagement d'accessibilité
                    matrice[15].push(string.replace(/.*"Accessibilité handicapés à mobilité réduite":"(Oui|Non)".*/, '$1')); // Accessibilité handicapés à mobilité réduite
                    matrice[16].push(string.replace(/.*"Nombre total de place de parking":"(\d+)?".*/, '$1')); // Nombre total de place de parking
                    matrice[17].push(string.replace(/.*"Nombre total de place de parking handicapés":"(\d+)?".*/, '$1')); // Nombre total de place de parking handicapés
                });

                return matrice;
            });

    };

    getStuffData(){
        let results = [];
        let matrice = [];
        for( let i = 0; i < 60; i++ ){ matrice[i] = []; }

        fs.createReadStream('/home/ioan/Bureau/Tech. Prod. Log./Projet-REST-master/data/234400034_004-011_fiches-equipements-rpdl.csv')
            .pipe(csv({separator: ';'}))
            .on('data', (data) => results.push(data))
            .on('end', () => {
                results.forEach(function (element) {
                    let string = JSON.stringify(element);
                    matrice[0].push(string.replace(/{"Code departement":"(\d{2})\.\d".*/, '$1')); // Code du département
                    matrice[1].push(string.replace(/.*"Departement":"(.*)","Code INSEE.*/, '$1')); // Departement
                    matrice[2].push(string.replace(/.*"Code INSEE":"(\d{5})".*/, '$1')); // Code INSEE
                    matrice[3].push(string.replace(/.*"Commune":"(.*)","Numéro de l'installation.*/, '$1')); // Commune
                    matrice[4].push(string.replace(/.*"Numéro de l'installation":"(\d{9})".*/, '$1')); // Numéro de l'installation --
                    matrice[5].push(string.replace(/.*"Nom usuel de l'installation":"(.*)","Numéro de la fiche équipement.*/, '$1')); // Nom usuel de l'installation
                    matrice[6].push(string.replace(/.*"Numéro de la fiche équipement":"(\d*)".*/, '$1')); // Numéro de la fiche équipement --
                    matrice[7].push(string.replace(/.*"Equipement":"(.*)","Batiment.*/, '$1')); // Équipement --
                    matrice[8].push(string.replace(/.*"Batiment":"(.*)","Nombre d'équipements identiques.*/, '$1')); // Batiment --
                    matrice[9].push(string.replace(/.*"Type d'équipement_Code":"(\d*)".*/, '$1')); // Type d'équipement_Code
                    matrice[10].push(string.replace(/.*"Type d'équipement":"(.*)","Propriétaire principal.*/, '$1')); // Type d'équipement --
                    matrice[11].push(string.replace(/.*"Propriétaire principal":"(.*)","Gestionnaire principal.*/, '$1')); // Propriétaire principal --
                    matrice[12].push(string.replace(/.*"Gestionnaire principal":"(.*)","Propriétaire secondaire.*/, '$1')); // Gestionnaire principal --
                    matrice[13].push(string.replace(/.*"Présence d'un éclairage":"(Oui|Non)".*/, '$1')); // Présence d'un éclairage --
                    matrice[14].push(string.replace(/.*"Salle polyvalente":"(Oui|Non)".*/, '$1')); // Salle polyvalente --
                    matrice[15].push(string.replace(/.*"Etablissement de plein air":"(Oui|Non)".*/, '$1')); // Etablissement de plein air --
                    matrice[16].push(string.replace(/.*"Etablissement sportif couvert":"(Oui|Non)".*/, '$1')); // Etablissement sportif couvert --
                    matrice[17].push(string.replace(/.*"Catégorie établissement recevant du public de 1 à 5":"(.*)","Année de mise en service.*/, '$1')); // Catégorie établissement recevant du public de 1 à 5
                    matrice[18].push(string.replace(/.*"Nombre de place en tribune":"(.*)","Libellé de la nature du sol.*/, '$1')); // Nombre de place en tribune --
                    matrice[19].push(string.replace(/.*"Libellé de la nature du sol":"(.*)","Libellé de la nature de l'équi.*/, '$1')); // Libellé de la nature du sol --
                    matrice[20].push(string.replace(/.*"Aire d'évolution Longueur":"(.*)","Aire d'évolution Largeur.*/, '$1')); // Aire d'évolution Longueur --
                    matrice[21].push(string.replace(/.*"Aire d'évolution Largeur":"(.*)","Aire d'évolution Surface.*/, '$1')); // Aire d'évolution Largeur --
                    matrice[22].push(string.replace(/.*Nombre de couloir \/ piste \/ poste \/ etc.":"(.*)","Nombre de vestiaire sportif.*/, '$1')); // Nombre de couloir / piste / poste / etc. --
                    matrice[23].push(string.replace(/.*"Nombre de vestiaire sportif":"(\d*)".*/, '$1')); // Nombre de vestiaire sportif --
                    matrice[24].push(string.replace(/.*"Sono fixe":"(Oui|Non)".*/, '$1')); // Sono fixe --
                    matrice[25].push(string.replace(/.*"Tableau fixe":"(Oui|Non)".*/, '$1')); // Tableau fixe --
                    matrice[26].push(string.replace(/.*"Chronométrage":"(Oui|Non)".*/, '$1')); // Chronométrage --
                    matrice[27].push(string.replace(/.*"localisation":"(.*)"}/, '$1')); // Localisation
                    matrice[28].push(string.replace(/.*"Accès handicapé mobilité Aire d'évolution":"(.*)","Accès handicapé mobilité Tribune.*/, '$1')); // Accès handicapé mobilité Aire d'évolution --
                    matrice[29].push(string.replace(/.*"Accès handicapé mobilité Tribune":"(.*)","Accès handicapé mobilité Vestiaire.*/, '$1')); // Accès handicapé mobilité Tribune --
                    matrice[30].push(string.replace(/.*"Accès handicapé mobilité Vestiaire":"(.*)","Accès handicapé mobilité sanitaire sportif.*/, '$1')); // Accès handicapé mobilité Vestiaire --
                    matrice[31].push(string.replace(/.*"Accès handicapé mobilité sanitaire sportif":"(.*)","Accès handicapé mobilité sanitaire public.*/, '$1')); // Accès handicapé mobilité sanitaire sportif --
                    matrice[32].push(string.replace(/.*"Accès handicapé mobilité Aucun":"(.*)","Accès handicapé sensoriel Aucun.*/, '$1')); // Accès handicapé mobilité Aucun
                    matrice[33].push(string.replace(/.*"Accueil club":"(Oui|Non)".*/, '$1')); // Accueil club --
                    matrice[34].push(string.replace(/.*"Accueil salle de réunion":"(Oui|Non)".*/, '$1')); // Accueil salle de réunion --
                    matrice[35].push(string.replace(/.*"Accueil buvette":"(Oui|Non)".*/, '$1')); // Accueil buvette --
                    matrice[36].push(string.replace(/.*"Accueil infirmerie":"(Oui|Non)".*/, '$1')); // Accueil buvette --
                    matrice[37].push(string.replace(/.*"Accueil bureau":"(Oui|Non)".*/, '$1')); // Accueil bureau
                    matrice[38].push(string.replace(/.*"Accueil réception":"(Oui|Non)".*/, '$1')); // Accueil réception --
                    matrice[39].push(string.replace(/.*"Accueil local rangement":"(Oui|Non)".*/, '$1')); // Accueil local rangement --
                    matrice[40].push(string.replace(/.*"Nombre de couloirs pour les structures artificielles d'escalade":"(\d*)".*/, '$1')); // Nombre de couloirs pour les structures artificielles d'escalade --
                    matrice[41].push(string.replace(/.*"Hauteur pour les structures artificielles d'escalade":"(.*)","Surface pour les structures artific.*/, '$1')); // Hauteur pour les structures artificielles d'escalade
                    matrice[42].push(string.replace(/.*"Surface pour les structures artificielles d'escalade":"(.*)","Présence d'une signa.*/, '$1')); // Surface pour les structures artificielles d'escalade
                    matrice[43].push(string.replace(/.*"Site escalade Nombre de voies":"(\d*)","Classe fédérale mi.*/, '$1')); // Site escalade Nombre de voies
                    matrice[44].push(string.replace(/.*"Nombre d'aires de saut":"(\d*)","Nombre d'aires de saut en hauteur.*/, '$1')); // Nombre d'aires de saut
                    matrice[45].push(string.replace(/.*"Nombre d'aires de saut en hauteur":"(\d*)","Nombre d'aires de saut en longueur.*/, '$1')); // Nombre d'aires de saut en hauteur
                    matrice[46].push(string.replace(/.*"Nombre d'aires de saut en longueur":"(\d*)","Nombre d'aires de saut en longueur et triple saut.*/, '$1')); // Nombre d'aires de saut en longueur
                    matrice[47].push(string.replace(/.*"Nombre d'aires de saut en longueur et triple saut":"(\d*)","Nombre d'aires de saut en sautoir perche.*/, '$1')); // Nombre d'aires de saut en longueur et triple saut
                    matrice[48].push(string.replace(/.*"Nombre d'aires de saut en sautoir perche":"(\d*)","Nombre d'aires de lancer.*/, '$1')); // Nombre d'aires de saut en sautoir perche
                    matrice[49].push(string.replace(/.*"Nombre d'aires de poids":"(\d*)","Nombre d'aires de disque.*/, '$1')); // Nombre d'aires de poids
                    matrice[50].push(string.replace(/.*"Nombre d'aires de disque":"(\d*)","Nombre d'aires de javelot.*/, '$1')); // Nombre d'aires de disque
                    matrice[51].push(string.replace(/.*"Nombre d'aires de javelot":"(\d*)","Nombre d'aires de marteau.*/, '$1')); // Nombre d'aires de javelot
                    matrice[52].push(string.replace(/.*"Nombre d'aires de marteau":"(\d*)","Nombre d'aires de lancer mixte.*/, '$1')); // Nombre d'aires de marteau
                    matrice[53].push(string.replace(/.*"Nombre d'aires de lancer mixte disque\/marteau":"(\d*)","Forme du bassin.*/, '$1')); // Nombre d'aires de lancer mixte disque/marteau
                    matrice[54].push(string.replace(/.*"Longueur du bassin":"(.*)","Largeur du bassin.*/, '$1')); // Longueur du bassin
                    matrice[55].push(string.replace(/.*"Largeur du bassin":"(.*)","Surface du bassin.*/, '$1')); // Largueur du bassin
                    matrice[56].push(string.replace(/.*"Surface du bassin":"(.*)","Profondeur mini.*/, '$1')); // Surface du bassin
                    matrice[57].push(string.replace(/.*"Profondeur mini":"(.*)","Profondeur maxi.*/, '$1')); // Profondeur mini
                    matrice[58].push(string.replace(/.*"Profondeur maxi":"(.*)","Nombre de couloirs.*/, '$1')); // Profondeur maxi
                    matrice[59].push(string.replace(/.*"Nombre total de tremplins":"(\d*)","Nombre de tremplins de 1 m.*/, '$1')); // Nombre total de tremplins
                });

                return matrice;
            });
    }

}

module.exports = readerCsv;