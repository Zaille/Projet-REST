//https://nouvelle-techno.fr/actualites/2018/05/11/pas-a-pas-inserer-une-carte-openstreetmap-sur-votre-site
let coord = [];
let macarte = null;
let codePostaux = new Object();
let codeInstallations = [];
let nomInstallation = [];
let marqueur = [];
let idInstallation;
let numActivite = new Object();
let numEquipement = new Object();
let numDeInstallation;
$(document).ready(function() {
    fillSelects();

    //ECOUTEUR POUR LE BOUTON DE RECHERCHE PAR LIEU
    $("#rechercheLieuBT").click(function(){                      //RECHERCHE PAR LIEU
        $("#detailsDiv").hide(500);
        $("#activitiesSelect").hide(500);
        $("#departementsSelect").show(500);
        $("#villesSelect").show(500);
        $("#rechercheLieuBT").css('color', 'black');
        $("#rightContainer").hide(500);
        $("#leftContainer").hide(500);
        $("#leftList").empty();
        $("#rightList").empty();
        $("#rechercheLieuBT").css('color', 'white');
        $("#rechercheActiviteBT").css('color', 'black');
    });

    //ECOUTEUR POUR LE BOUTON DE RECHERCHE PAR ACTIVITE
    $("#rechercheActiviteBT").click(function(){                     //RECHERCHE PAR ACTIVITE
        $("#activitiesSelect").show(500);
        $("#departementsSelect").hide(500);
        $("#villesSelect").hide(500);
        $("#detailsDiv").hide(500);
        $("#rechercheLieuBT").css('color', 'black');
        $("#rechercheActiviteBT").css('color', 'white');
        $("#rechercheLieuBT").css('color', 'black');
        $("#rightContainer").hide(500);
        $("#leftContainer").hide(500);
        $("#leftList").empty();
        $("#rightList").empty();
        // REQUETE LISTE DES ACTIVITES
    });

    //ECOUTEUR POUR DES SELECT
    $('#departementsSelect').on('change', function() {   //selection d'un département

        $("#leftList").empty();

        if (marqueur[0]) {
            for( let i = 0; i < marqueur.length; i++  ){
                macarte.removeLayer(marqueur[i]);
            }
            marqueur = [];
        }

        let selected = codePostaux[$('#departementsSelect').find(":selected").val()]; //on récupère le département séléctionné

        // REQUETE LISTE ACTIVITES PAR département
        $.ajax({
            url: 'http://127.0.0.1:3000/api/installation/departement/' + selected, //on prépare l'envoi
            type: 'GET',
            dataType: 'json',
            data: '', //on créer les parametres d'url
            success: function (data) { //si réussite
                nomInstallation = [];
                codeInstallation = [];
                coord = [];
                $.each(data, function (index, element) { //on parcourstout les élements du tableau
                    codeInstallations[index] = element.numInstallation;
                    coord[index] = [2];
                    let adresse;
                    if (element.adresse == "null") {
                        adresse = 'Non communiqué';
                    } else {
                        adresse = element.adresse;
                    }
                    $("#leftList").append('<li class="leftLi"  style="cursor: pointer"><a  href="#"  onclick="openInstallationDetails(this)"  style="text-decoration: none; font-size: 23px; color:#404040fa" > ' + "<b>" + element.nomInstallation + "</b>" + " - " + element.nomCommune + ", " + adresse + '</a></li>');
                    nomInstallation[index] = element.nomInstallation;
                    coord[index][0] = element.locX;
                    coord[index][1] = element.locY;
                });

                if (macarte == null) {
                    initMap();
                }

                for( let i = 0; i < coord.length; i++ ){
                    marqueur.push(L.marker([coord[i][0], coord[i][1]]).bindPopup(nomInstallation[i]).addTo(macarte));
                }

                $("#googleMap").show(500);
            },
            error: function (resultat, statut, erreur) {
                console.log(erreur);
            },
            complete: function (resultat, statut) {
            }
        });
        $("#leftContainer").show(500);
        $("#rightContainer").hide(500);
        $("#detailsDiv").show(500);    });

    $('#activitiesSelect').on('change', function() {   //selection d'un département
        $("#rightList").empty();
        numEquipement = new Object();
        let idSelected = numActivite[$('#activitiesSelect').find(":selected").val()]; //football
        $.ajax({
            url: 'http://127.0.0.1:3000/api/activite/id/' + idSelected, //on prépare l'envoi
            type: 'GET',
            dataType: 'json',
            data: '',
            success: function (data) { //si réussite
                $.each(data, function (index, element) { //on parcourstout les élements du tableau
                    numEquipement[index] = element.numerodelaficheequipement;
                });
            },
            error : function(resultat, statut, erreur){ console.log(erreur); },
            complete : function(resultat, statut){      // permet de synchroniser les données lues
                let i =0;
                while (numEquipement[i] !=undefined) {
                        $.ajax({
                            url: 'http://127.0.0.1:3000/api/equipement/'+numEquipement[i], //on prépare l'envoi
                            type: 'GET',
                            dataType: 'json',
                            data: '',
                            success: function(data) { //si réussite
                                $.each(data, function(index, element) {
                                    $("#rightList").append('<li class="rightLi" id="ListEquipements" style="cursor: pointer"><a  href="#"  onclick="displayActivityInfos(this)" style="text-decoration: none; font-size: 23px; color:#404040fa" > ' +element.equipement+'</li>');
                                });

                            },
                            error : function(resultat, statut, erreur){ console.log(erreur); },
                            complete : function(resultat, statut){}
                        });
                    i++;
                    }
                $("#rightContainer").show();
                }
        });
    });

    $('#villesSelect').on('change', function () {   //selection d'une ville

        $("#leftList").empty();

        let selected = $('#villesSelect').find(":selected").text(); //on récupère le département séléctionné

        //TODO REQUETE LISTE ACTIVITES PAR VILLE
        $.ajax({
            url: 'http://127.0.0.1:3000/api/installation/ville/' + selected, //on prépare l'envoi
            type: 'GET',
            dataType: 'json',
            data: '',
            success: function (data) { //si réussite
                nomInstallation = [];
                codeInstallation = [];
                coord = [];
                $.each(data, function (index, element) { //on parcourstout les élements du tableau
                    codeInstallations[index] = element.numInstallation;
                    coord[index] = [2];
                    let adresse;
                    if (element.adresse == null) {
                        adresse = 'Non communiqué';
                    } else {
                        adresse = element.adresse;
                    }
                    $("#leftList").append('<li class="leftLi"  style="cursor: pointer"><a  href="#" onclick="openInstallationDetails(this)"  style="text-decoration: none; font-size: 23px; color:#404040fa" > ' + "<b>" + element.nomInstallation + "</b>" + " - " + element.nomCommune + ", " + adresse + '</a></li>');
                    nomInstallation[index] = element.nomInstallation;
                    coord[index][0] = element.locX;
                    coord[index][1] = element.locY;
                });

                if (macarte == null) {
                    initMap();
                }

                if (marqueur[0]) {
                    for( let i = 0; i < marqueur.length; i++  ){
                        macarte.removeLayer(marqueur[i]);
                    }
                    marqueur = [];
                }

                for( let i = 0; i < coord.length; i++ ){
                    marqueur.push(L.marker([coord[i][0], coord[i][1]]).bindPopup(nomInstallation[i]).addTo(macarte));
                }

                $("#googleMap").show(500);
            },
            error: function (resultat, statut, erreur) {
                console.log(erreur);
            },
            complete: function (resultat, statut) {
            }
        });
        $("#leftContainer").show(500);
        $("#rightContainer").hide(500);
        $("#detailsDiv").show(500);
    });

});

//INITIALISATION DE LA CARTE
function initMap() {

    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([coord[0][0], coord[0][1]], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);

}

//ON AFFICHE LES DETAILS DE L'INSTALLATION SELECTIONNEE
function openInstallationDetails(received) {
    let liClicked = $(received).parents("li").index();
    $("#rightList").empty();
    $("#detailsInfos").empty();
    $("#rightContainer").show(500);
    idInstallation = codeInstallations[liClicked];
    // REQUETE DETAILS DUNE INSTALLATION
    $.ajax({
        url: 'http://127.0.0.1:3000/api/installation/id/' + idInstallation, //on prépare l'envoi
        type: 'GET',
        dataType: 'json',
        data: '', //on créer les parametres d'url
        success: function (data) { //si réussite
            coord = [];
            coord[0] = [2];
            $("#detailsInfos").append('<li class="leftLi"><b> Nom de l\'installation: </b>' + data.nomInstallation + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Numéro de l\'installation: </b>' + data.numInstallation + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Code du département: </b>' + data.codeDepartement + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Nom du département: </b>' + data.nomDepartement + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Nom de la commune: </b>' + data.nomCommune + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Adresse: </b>' + data.adresse + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Bus à proximité: </b>' + data.desserteBus + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Trains à proximité: </b>' + data.desserteTrain + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Possède des installations particulières: </b>' + data.instalParticuliere + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Accessible aux handicapés:</b> ' + data.accessibleHandicapes + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Nombre de place sur le parking: </b>' + data.nbplaceParking + '</li>');
            $("#detailsInfos").append('<li class="leftLi"><b> Nombre de places pour handicapés sur le parking:</b> ' + data.nbplaceParkingHandicapes + '</li>');
            coord[0][0] = data.locX;
            coord[0][1] = data.locY;

            if( marqueur[0] ){
                for( let i = 0; i < marqueur.length; i++  ){
                    macarte.removeLayer(marqueur[i]);
                }
                marqueur = [];
            }

            marqueur.push(L.marker([coord[0][0], coord[0][1]]).bindPopup(data.nomInstallation).addTo(macarte));
        },
        error: function (resultat, statut, erreur) {
            console.log(erreur);
        },
        complete: function (resultat, statut) {
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:3000/api/equipement/installation/' + idInstallation, //on prépare l'envoi
        type: 'GET',
        dataType: 'json',
        data: '', //on créer les parametres d'url
        success: function (data) { //si réussite
            $.each(data, function (index, element) {
                $("#rightList").append('<li class="rightLi"><a href="#" onclick="displayEquipmentInfos(this)" style="text-decoration: none; font-size: 23px; color:#404040fa">' + element.typeequipement + '</a></li>');
            });
        },
        error: function (resultat, statut, erreur) {
            console.log(erreur);
        },
        complete: function (resultat, statut) {
        }
    });


    //COLORATION LORS DUNE SELECTION
    $('#leftList li').click(function() {    //activité selectionnée
        $tailleListe = $("#leftList");
        $("#leftList li").each(function (index) {    //refresh couleur vue
            let $allLi = $("#leftList li").eq(index);
            $allLi.css("background-color", "#00000000");
        });
        $(this).css("background-color", "#25252525");
        $('#rightContainer').show(500);
    });
}

function displayEquipmentInfos(received) {
    $("#detailsInfosEquipment").empty();
    let numEquipement = $(received).parents("li").index();

    $.ajax({
        url: 'http://127.0.0.1:3000/api/equipement/installation/' + idInstallation, //on prépare l'envoi
        type: 'GET',
        dataType: 'json',
        data: '',
        success: function(data) { //si réussite
            $.each(data, function(index, element) {
                if (index==numEquipement){
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Equipement:</b>' + element.equipement + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Numéro d\'équipement:</b>' + element.numequipement + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Typeequipement:</b>' + element.typeequipement + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Proprietaire:</b>' + element.proprietaire + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Gestionnaire:</b>' + element.gestionnaire + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Eclairage:</b>' + element.eclairage + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Salle polyvalente:</b>' + element.sallepolyvalente + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Etablissement sportif en plein air:</b>' + element.etabPleinAir + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Etablissement sportif couvert:</b>' + element.etabSportifCouvert + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de places en tribunes:</b>' + element.nbplaceTribune + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Type du sol:</b>' + element.typedusol + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Longueur de l\'aire d\'évolution:</b>' + element.aireEvolLongueur + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Largeur de l\'aire d\'évolution:</b>' + element.aireEvolLargeur + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de couloirs:</b>' + element.nbCouloir + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de vestiaires sportifs:</b>' + element.nbVerstiaireStortif + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Contient une/des sono fixes:</b>' + element.sonoFixe + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Contient un/des tableau(x) fixe:</b>' + element.tableauFixe + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Contient un/des chronométrage(s):</b>' + element.chronometrage + '</li>');
                    $("#detailsInfosEquipment").append('<li class="rightLi"><b>Contient un/des sanitaires publics: </b>' + element.sanitairePublic + '</li>');
                    if(element.acHandMobiAireEvol)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accès pour handicapés aux aires d\'évolution: </b>' + element.acHandMobiAireEvol + '</li>');
                    if(element.acHandMobiVestiaire)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accès pour handicapés aux vestiaires:</b>' + element.acHandMobiVestiaire + '</li>');
                    if(element.acHandMobiSanitairePublic)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accès pour handicapés aux sanitaires publics:</b>' + element.acHandMobiSanitairePublic + '</li>');
                    if(element.acHandMobiSanitaireSportif)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accès pour handicapés aux sanitaires stportifs:</b>' + element.acHandMobiSanitaireSportif + '</li>');
                    if(element.accueilSalledeReunion)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accueil de salle de Reunion:</b>' + element.accueilSalledeReunion + '</li>');
                    if(element.accueilBuvette)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accueil de buvette:</b>' + element.accueilBuvette + '</li>');
                    if(element.accueilInfirmerie)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accueil d\'infirmerie:</b>' + element.accueilInfirmerie + '</li>');
                    if(element.accueilReception)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accueil de Reception:</b>' + element.accueilReception + '</li>');
                    if(element.accueilLocalRangement)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Acceuil/local de rangement:</b>' + element.accueilLocalRangement + '</li>');
                    if(element.nbcouloirEscalade)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de couloirs d\'escalade:</b>' + element.nbcouloirEscalade + '</li>');
                    if(element.hauteurescalade)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Hauteur mur(s) d\'escalade:</b>' + element.hauteurescalade + '</li>');
                    if(element.surfaceescalade)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de surfaces d\'escalade:</b>' + element.surfaceescalade + '</li>');
                    if(element.nbairesdesaut)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut:</b>' + element.nbairesdesaut + '</li>');
                    if(element.nbairesauthauteur)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut en hauteur:</b>' + element.nbairesauthauteur + '</li>');
                    if(element.nbairessautlongueur)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut en longeur:</b>' + element.nbairessautlongueur + '</li>');
                    if(element.nbairessautlongueurettriplesaut)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut en longueur/triple saut:</b>' + element.nbairessautlongueurettriplesaut + '</li>');
                    if(element.nbairessautsautoirperche)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut à la perche:</b>' + element.nbairessautsautoirperche + '</li>');
                    if(element.nbaireslancer)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer:</b>' + element.nbaireslancer + '</li>');
                    if(element.nbairespoid)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer de poinds:</b>' + element.nbairespoid + '</li>');
                    if(element.nbairesdisque)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer de disques:</b>' + element.nbairesdisque + '</li>');
                    if(element.nbairesjavelot)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer de javelot:</b>' + element.nbairesjavelot + '</li>');
                    if(element.nombreairesmarteau)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer de marteaux:</b>' + element.nombreairesmarteau + '</li>');
                    if(element.nombreaireslancermixtedisquemarteau)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Dombre d\'aires de lancer de disques/marteaux:</b>' + element.nombreaireslancermixtedisquemarteau + '</li>');
                    if(element.longueurbassin)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Longeur du bassin:</b>' + element.longueurbassin + '</li>');
                    if(element.largeurbassin)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Largeur du bassin:</b>' + element.largeurbassin + '</li>');
                    if(element.profondeurmini)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Profondeurminimale:</b>' + element.profondeurmini + '</li>');
                    if(element.profondeurmaxi)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Profondeur maximale:</b>' + element.profondeurmaxi + '</li>');
                    if(element.nbtotaltremplins)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de tremplins:</b>' + element.nbtotaltremplins + '</li>');
                }
            });
        },
        error: function (resultat, statut, erreur) {
            console.log(erreur);
        },
        complete: function (resultat, statut) {
        }
    });

    $('#rightList li').click(function() {    //activité selectionnée
        $tailleListe = $("#rightList");
        $( "#leftList li" ).each(function( index ) {    //refresh couleur vue
            let $allLi = $("#rightList li").eq(index);
            $allLi.css("background-color", "#00000000");
        });
        $(this).css("background-color", "#25252525");
        $('#rightContainer').show(500);
    });
}

//INITIALISE LES SELECT AU DEBUT
function fillSelects(){     //gère l'insertion des villes et départements dans les select
    $.ajax({
        url: 'http://127.0.0.1:3000/api/installation/departement', //on prépare l'envoi
        type: 'GET',
        dataType: 'json',
        data: '', //on créer les parametres d'url
        success: function (data) { //si réussite
            $.each(data, function (index, element) { //on parcourt tout les élements du tableau
                $("#departementsSelect").append(new Option(element.NomDepartement, element.codeDepartement));
                codePostaux[element.NomDepartement] = element.CodeDepartement;
            });
        },
        error: function (resultat, statut, erreur) {
            console.log(erreur);
        },
        complete: function (resultat, statut) {
        }
    });


    $.ajax({
        url: 'http://127.0.0.1:3000/api/installation/ville', //on prépare l'envoi
        type: 'GET',
        dataType: 'json',
        data: '', //on créer les parametres d'url
        success: function (data) { //si réussite
            $.each(data, function (index, element) { //on parcourt tout les élements du tableau
                $("#villesSelect").append(new Option(element.NomCommune, element.NomCommune));
            });
        },
        error: function (resultat, statut, erreur) {
            console.log(erreur);
        },
        complete: function (resultat, statut) {
        }
    });

    $.ajax({
        url: 'http://127.0.0.1:3000/api/activite', //on prépare l'envoi
        type: 'GET',
        dataType: 'json',
        data: '', //on créer les parametres d'url
        success: function (data) { //si réussite
            $.each(data, function (index, element) { //on parcourt tout les élements du tableau
                $("#activitiesSelect").append(new Option(element.Activitelibelle, element.Activitelibelle));
                numActivite[element.Activitelibelle] = element.Activitecode;
            });
        },
        error: function (resultat, statut, erreur) {
            console.log(erreur);
        },
        complete: function (resultat, statut) {
        }
    });


}

function displayActivityInfos(received){
    $("#detailsInfosEquipment").empty();
    let num = $(received).parents("li").index();

    $.ajax({
        url: 'http://127.0.0.1:3000/api/equipement/'+numEquipement[num], //on prépare l'envoi
        type: 'GET',
        dataType: 'json',
        data: '', //on créer les parametres d'url
        success: function(data) { //si réussite
            $.each(data, function(index, element) { //on parcourt tout les élements du tableau
                numDeInstallation = element.numInstallation;
                //ajout détails de l'installation
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Equipement:</b>' + element.equipement + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Numéro d\'équipement:</b>' + element.numequipement + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Typeequipement:</b>' + element.typeequipement + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Proprietaire:</b>' + element.proprietaire + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Gestionnaire:</b>' + element.gestionnaire + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Eclairage:</b>' + element.eclairage + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Salle polyvalente:</b>' + element.sallepolyvalente + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Etablissement sportif en plein air:</b>' + element.etabPleinAir + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Etablissement sportif couvert:</b>' + element.etabSportifCouvert + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de places en tribunes:</b>' + element.nbplaceTribune + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Type du sol:</b>' + element.typedusol + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Longueur de l\'aire d\'évolution:</b>' + element.aireEvolLongueur + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Largeur de l\'aire d\'évolution:</b>' + element.aireEvolLargeur + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de couloirs:</b>' + element.nbCouloir + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de vestiaires sportifs:</b>' + element.nbVerstiaireStortif + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Contient une/des sono fixes:</b>' + element.sonoFixe + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Contient un/des tableau(x) fixe:</b>' + element.tableauFixe + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Contient un/des chronométrage(s):</b>' + element.chronometrage + '</li>');
                $("#detailsInfosEquipment").append('<li class="rightLi"><b>Contient un/des sanitaires publics: </b>' + element.sanitairePublic + '</li>');
                if(element.acHandMobiAireEvol)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accès pour handicapés aux aires d\'évolution: </b>' + element.acHandMobiAireEvol + '</li>');
                if(element.acHandMobiVestiaire)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accès pour handicapés aux vestiaires:</b>' + element.acHandMobiVestiaire + '</li>');
                if(element.acHandMobiSanitairePublic)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accès pour handicapés aux sanitaires publics:</b>' + element.acHandMobiSanitairePublic + '</li>');
                if(element.acHandMobiSanitaireSportif)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accès pour handicapés aux sanitaires stportifs:</b>' + element.acHandMobiSanitaireSportif + '</li>');
                if(element.accueilSalledeReunion)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accueil de salle de Reunion:</b>' + element.accueilSalledeReunion + '</li>');
                if(element.accueilBuvette)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accueil de buvette:</b>' + element.accueilBuvette + '</li>');
                if(element.accueilInfirmerie)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accueil d\'infirmerie:</b>' + element.accueilInfirmerie + '</li>');
                if(element.accueilReception)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Accueil de Reception:</b>' + element.accueilReception + '</li>');
                if(element.accueilLocalRangement)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Acceuil/local de rangement:</b>' + element.accueilLocalRangement + '</li>');
                if(element.nbcouloirEscalade)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de couloirs d\'escalade:</b>' + element.nbcouloirEscalade + '</li>');
                if(element.hauteurescalade)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Hauteur mur(s) d\'escalade:</b>' + element.hauteurescalade + '</li>');
                if(element.surfaceescalade)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de surfaces d\'escalade:</b>' + element.surfaceescalade + '</li>');
                if(element.nbairesdesaut)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut:</b>' + element.nbairesdesaut + '</li>');
                if(element.nbairesauthauteur)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut en hauteur:</b>' + element.nbairesauthauteur + '</li>');
                if(element.nbairessautlongueur)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut en longeur:</b>' + element.nbairessautlongueur + '</li>');
                if(element.nbairessautlongueurettriplesaut)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut en longueur/triple saut:</b>' + element.nbairessautlongueurettriplesaut + '</li>');
                if(element.nbairessautsautoirperche)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de saut à la perche:</b>' + element.nbairessautsautoirperche + '</li>');
                if(element.nbaireslancer)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer:</b>' + element.nbaireslancer + '</li>');
                if(element.nbairespoid)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer de poinds:</b>' + element.nbairespoid + '</li>');
                if(element.nbairesdisque)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer de disques:</b>' + element.nbairesdisque + '</li>');
                if(element.nbairesjavelot)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer de javelot:</b>' + element.nbairesjavelot + '</li>');
                if(element.nombreairesmarteau)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre d\'aires de lancer de marteaux:</b>' + element.nombreairesmarteau + '</li>');
                if(element.nombreaireslancermixtedisquemarteau)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Dombre d\'aires de lancer de disques/marteaux:</b>' + element.nombreaireslancermixtedisquemarteau + '</li>');
                if(element.longueurbassin)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Longeur du bassin:</b>' + element.longueurbassin + '</li>');
                if(element.largeurbassin)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Largeur du bassin:</b>' + element.largeurbassin + '</li>');
                if(element.profondeurmini)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Profondeurminimale:</b>' + element.profondeurmini + '</li>');
                if(element.profondeurmaxi)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Profondeur maximale:</b>' + element.profondeurmaxi + '</li>');
                if(element.nbtotaltremplins)$("#detailsInfosEquipment").append('<li class="rightLi"><b>Nombre de tremplins:</b>' + element.nbtotaltremplins + '</li>');
            });
        },
        error : function(resultat, statut, erreur){ console.log(erreur); },
        complete : function(resultat, statut){
            $.ajax({
                url: 'http://127.0.0.1:3000/api/installation/id/'+numDeInstallation, //on prépare l'envoi
                type: 'GET',
                dataType: 'json',
                data: '', //on créer les parametres d'url
                success: function(data) { //si réussite

                    if (marqueur[0]){
                        for( let i = 0; i < marqueur.length; i++  ){
                            macarte.removeLayer(marqueur[i]);
                        }
                        marqueur = [];
                    }

                    coord = [];

                    $.each(data, function(index, element) { //on parcourt tout les élements du tableau

                        coord[index] = [2];

                        $("#detailsInfos").empty();
                        $("#detailsInfos").append('<li class="leftLi"><b> Nom de l\'installation: </b>'+data.nomInstallation+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Numéro de l\'installation: </b>'+data.numInstallation+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Code du département: </b>'+data.codeDepartement+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Nom du département: </b>'+data.nomDepartement+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Nom de la commune: </b>'+data.nomCommune+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Adresse: </b>'+data.adresse+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Bus à proximité: </b>'+data.desserteBus+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Trains à proximité: </b>'+data.desserteTrain+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Possède des installations particulières: </b>'+data.instalParticuliere+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Accessible aux handicapés:</b> '+data.accessibleHandicapes+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Nombre de place sur le parking: </b>'+data.nbplaceParking+'</li>');
                        $("#detailsInfos").append('<li class="leftLi"><b> Nombre de places pour handicapés sur le parking:</b> '+data.nbplaceParkingHandicapes+'</li>');
                        coord[index][0] = data.locX;
                        coord[index][1] = data.locY;
                    });

                    for( let i = 0; i < coord.length; i++ ){
                        marqueur.push(L.marker([coord[i][0], coord[i][1]]).bindPopup(nomInstallation[i]).addTo(macarte));
                    }

                },
                error : function(resultat, statut, erreur){ console.log(erreur); },
                complete : function(resultat, statut){}
            });
        }
    });


    //coloration
    $('#rightList li').click(function() {    //activité selectionnée
        $tailleListe = $("#rightList");
        $( "#rightList li" ).each(function( index ) {    //refresh couleur vue
            let $allLi = $("#rightList li").eq(index);
            $allLi.css("background-color", "#00000000");
        });
        $(this).css("background-color", "#25252525");
    });
}