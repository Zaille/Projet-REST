$(document).ready(function() {

    $("#rechercheDepartementBT").click(function(){
        $selecteurs = $("#lieuxBox");
        if ($selecteurs.is(":visible") == true){
            $("#rechercheDepartementBT").css('color', 'black');
            $selecteurs.toggle(500);
            $("#rightContainer").hide(500);
            $("#leftContainer").hide(500);
            $("#leftList").empty();
            $("#rightList").empty();
        }else{
            $selecteurs.toggle(500);
            $("#rechercheDepartementBT").css('color', 'white');
        }
    });


    $('select').on('change', function() {
        $partieGauche = $("#leftContainer");
        $("#leftList").empty();
        for (let $i=0;$i<20;$i++){      //affiche les activités
            $("#leftList").append('<li class="leftLi"><a  href="#" style="text-decoration: none; font-size: 23px; color:#1e9841" onclick="displayActivity()" >'   + $i+   '</a></li>')
        }
        $partieGauche.show(500);
    });
});

function displayActivity() {
    $("#rightList").empty();
    $partieDroite = $("#rightContainer");
    $partieDroite.show(500);
    for (var $i = 0; $i < 20; $i++) {      //affiche les activités
        $("#rightList").append('<li class="rightLi"><a href="#" style="text-decoration: none; font-size: 23px; color:#1e9841">' + $i + '</a></li>');
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
}
