//https://nouvelle-techno.fr/actualites/2018/05/11/pas-a-pas-inserer-une-carte-openstreetmap-sur-votre-site
var lat;
var lon;
var macarte = null;
var codePostaux = new Object();
var codeInstallations = new Object();
$(document).ready(function() {
    fillSelects();

    $("#rechercheLieuBT").click(function(){
        $selecteurs = $("#lieuxBox");
        $("#rechercheLieuBT").css('color', 'black');
        $("#rightContainer").hide(500);
        $("#leftContainer").hide(500);
        $("#leftList").empty();
        $("#rightList").empty();
        //TODO REQUETE LISTE VILLE ET DEPARTEMENTS
        $selecteurs.toggle(500);
        $("#rechercheLieuBT").css('color', 'white');
        $("#rechercheActiviteBT").css('color', 'black');
    });

    $("#rechercheActiviteBT").click(function(){
        $selecteurs = $("#lieuxBox");
        $("#rechercheLieuBT").css('color', 'black');
        $("#rechercheActiviteBT").css('color', 'white');
        $("#rechercheLieuBT").css('color', 'black');
        $selecteurs.hide(500);
        $("#rightContainer").hide(500);
        $("#leftList").empty();
        $("#rightList").empty();
        $("#leftContainer").show(500);
        //TODO REQUETE LISTE DES ACTIVITES
        for (let $i=0;$i<20;$i++){      //affiche les activités
            $("#leftList").append('<li class="leftLi"  style="cursor: pointer"><a  href="#" style="text-decoration: none; font-size: 23px; color:#404040fa" >'   + $i+   '</a></li>')
        }
    });

    $('#departementsSelect').on('change', function() {   //selection d'un département
        $partieGauche = $("#leftContainer");
        $("#leftList").empty();

        var selected = codePostaux[$('#departementsSelect').find(":selected").val()]; //on récupère le département séléctionné
        //TODO REQUETE LISTE ACTIVITES PAR département
        $.ajax({
            url: 'http://127.0.0.1:3000/api/installation/departement/'+selected, //on prépare l'envoi
            type: 'GET',
            dataType: 'json',
            data: '', //on créer les parametres d'url
            success: function(data) { //si réussite
                $.each(data, function(index, element) { //on parcourstout les élements du tableau
                    codeInstallations[index] = element.numInstallation;
                    var adresse;
                    if (element.adresse == "null"){
                        adresse= 'Non communiqué';
                    }else {
                        adresse= element.adresse;
                    }
                    $("#leftList").append('<li class="leftLi"  style="cursor: pointer"><a  href="#" style="text-decoration: none; font-size: 23px; color:#404040fa" > '  +"<b>"+element.nomInstallation+"</b>"+" - "+ element.nomCommune+", "+ adresse+ '</a></li>');
                });
            },
            error : function(resultat, statut, erreur){ console.log(erreur); },
            complete : function(resultat, statut){}
        });
        $partieGauche.show(500);
    });

    $('#villesSelect').on('change', function() {   //selection d'une ville
        $partieGauche = $("#leftContainer");
        $("#leftList").empty();
        var selected = $('#villesSelect').find(":selected").text(); //on récupère le département séléctionné
        //TODO REQUETE LISTE ACTIVITES PAR VILLE
        $.ajax({
            url: 'http://127.0.0.1:3000/api/installation/ville/'+selected, //on prépare l'envoi
            type: 'GET',
            dataType: 'json',
            data: '', //on créer les parametres d'url
            success: function(data) { //si réussite
                $.each(data, function(index, element) { //on parcourstout les élements du tableau
                    codeInstallations[index] = element.numInstallation;
                    var adresse;
                    if (element.adresse == null){
                        adresse= 'Non communiqué';
                    }else {
                        adresse= element.adresse;
                    }
                    $("#leftList").append('<li class="leftLi"  style="cursor: pointer"><a  href="#" style="text-decoration: none; font-size: 23px; color:#404040fa" > '  +"<b>"+element.nomInstallation+"</b>"+" - "+ element.nomCommune+", "+adresse+ '</a></li>');
                });
            },
            error : function(resultat, statut, erreur){ console.log(erreur); },
            complete : function(resultat, statut){}
        });
        $partieGauche.show(500);
    });

    $("static .leftLi").click(function(){
        console.log("clicked: "+ $(this).parent('li').index());
        $("#rightList").empty();
        $partieDroite = $("#rightContainer");
        $partieDroite.show(500);
        //TODO REQUETE DETAILS DUNE ACTIVITE

        lat = 48.852969;
        lon = 2.349903;
        if (macarte == null){
            initMap();
        }
        var marker = L.marker([lat, lon]).addTo(macarte);
        for (var $i = 0; $i < 20; $i++) {      //affiche les activités
            $("#rightList").append('<li class="rightLi"><a href="#" style="text-decoration: none; font-size: 23px; color:#404040fa">' + $i + '</a></li>');
        }
        $('#leftList li').click(function() {    //activité selectionnée
            $tailleListe = $("#leftList");
            $( "#leftList li" ).each(function( index ) {    //refresh couleur vue
                var $allLi = $("#leftList li").eq(index);
                $allLi.css("background-color", "#00000000");
            });
            $(this).css("background-color", "#25252525");
            $partieDroite.show(500);
        });
        $map = $("#googleMap");
        $map.show(500);
    });

});



function initMap() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    macarte = L.map('map').setView([lat, lon], 11);
    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        // Il est toujours bien de laisser le lien vers la source des données
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);
}

function fillSelects(){     //gère l'insertion des villes et départements dans les select
    $.ajax({
        url: 'http://127.0.0.1:3000/api/installation/departement', //on prépare l'envoi
        type: 'GET',
        dataType: 'json',
        data: '', //on créer les parametres d'url
        success: function(data) { //si réussite
            $.each(data, function(index, element) { //on parcourt tout les élements du tableau
                $("#departementsSelect").append(new Option(element.NomDepartement, element.codeDepartement));
                codePostaux[element.NomDepartement] = element.CodeDepartement;
            });
        },
        error : function(resultat, statut, erreur){ console.log(erreur); },
        complete : function(resultat, statut){}
    });


    $.ajax({
        url: 'http://127.0.0.1:3000/api/installation/ville', //on prépare l'envoi
        type: 'GET',
        dataType: 'json',
        data: '', //on créer les parametres d'url
        success: function(data) { //si réussite
            $.each(data, function(index, element) { //on parcourt tout les élements du tableau
                $("#villesSelect").append(new Option(element.NomCommune, element.NomCommune));
            });
        },
        error : function(resultat, statut, erreur){ console.log(erreur); },
        complete : function(resultat, statut){}
    });
}