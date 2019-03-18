/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init car and driver tables if they don't exist */
let init = function () {
    db.run("CREATE TABLE if not exists installations (" +
        "NumInstallation INTEGER PRIMARY KEY AUTOINCREMENT," +
        "NomInstallation TEXT" +
        "CodeINSEE INT," +
        "CodeDepartement INT," +
        "CodePostal INT," +
        "NomDepartement TEXT" +
        "NomCommune TEXT" +
        "Adresse TEXT" +
        "LocX  DECIMAL(9,6)" +
        "LocY DECIMAL(9,6)" +
        "DesserteBus BOOLEAN"+
        "DesserteTrain BOOLEAN"+
        "DesserteTram BOOLEAN"+
        "InstalParticuliere  TEXT" +
        "AccessibleHandicapés  BOOLEAN" +
        "NbplaceParking  INT" +
        "NbplaceParkingHandicapés  INT" +
        ")");

    db.run("CREATE TABLE if not exists equipement (" +
        "Numequipement INTEGER PRIMARY KEY AUTOINCREMENT," +
        "equipement TEXT," +
        "NumInstallation TEXT," +
        "Typeequipement TEXT" +
        "Proprietaire TEXT" +
        "Gestionnaire TEXT" +
        "Eclairage BOOLEAN" +
        "Sallepolyvalente BOOLEAN" +
        "EtabPleinAir BOOLEAN" +
        "EtabSportifCouvert BOOLEAN" +
        "NbplaceTribune INT" +
        "typedusol TEXT"+
        "AireEvolLongueur INT" +
        "AireEvolLargeur INT" +
        "NbCouloir INT" +
        "NbVerstiaireStortif INT" +
        "SonoFixe BOOLEAN" +
        "TableauFixe BOOLEAN" +
        "Chronometrage BOOLEAN" +
        "SanitairePublic BOOLEAN" +
        "AcHandMobiAireEvol BOOLEAN" +
        "AcHandMobiTribune BOOLEAN" +
        "AcHandMobiVestiaire BOOLEAN" +
        "AcHandMobiSanitairePublic BOOLEAN" +
        "AcHandMobiSanitaireSportif BOOLEAN" +
        "AcHandSensoAireEvol BOOLEAN" +
        "AcHandSensoTribune BOOLEAN" +
        "AcHandSensoVestiaire BOOLEAN" +
        "AcHandSensoSanitairePublic BOOLEAN" +
        "AcHandSensoSanitaireSportif BOOLEAN" +
        "AccueilClub BOOLEAN" +
        "AccueilSalledeReunion BOOLEAN" +
        "AccueilBuvette BOOLEAN" +
        "AccueilInfirmerie BOOLEAN" +
        "AccueilReception BOOLEAN" +
        "AccueilLocalRangement BOOLEAN" +
        "NbcouloirE scalade" +
        ")");

    db.run("CREATE TABLE if not exists activites (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " firstName TEXT," +
        " lastName TEXT," +
        " car INT" +
        ")");
};



module.exports = {
    init: init,
    db: db
};

