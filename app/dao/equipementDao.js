"use strict";

const daoCommon = require('./commons/daoCommon');
const Equipement = require('../model/equipement');

/**
 * Activites Data Access Object
 */
class EquipementDao {

    constructor() {
        this.common = new daoCommon();
    }

    listEquipements() {

        let sqlRequest = "SELECT Numequipement,Equipement FROM equipement group by 1,2";
        return this.common.findAll(sqlRequest).then(row => {

            return row;

        });

    };

    getEquipementId(id){

        let sqlRequest = "SELECT * FROM equipement where Numequipement like $id";
        let sqlParams = {$id: id};

        return this.common.findAll(sqlRequest,sqlParams).then(rows => {

            let activ = [];

            rows.forEach(function (row) {
                activ.push(new Equipement(row.Numequipement,row.Equipement,row.NumInstallation,row.Typeequipement,row.Proprietaire,row.Gestionnaire,row.Eclairage ===1,row.Sallepolyvalente ===1,row.EtabPleinAir===1,row.EtabSportifCouvert===1,row.NbplaceTribune,row.Typedusol,row.AireEvolLongueur,row.AireEvolLargeur,row.NbCouloir,row.NbVerstiaireStortif,row.SonoFixe===1,row.TableauFixe===1,row.Chronometrage===1,row.SanitairePublic===1,row.AcHandMobiAireEvol===1,row.AcHandMobiTribune===1,row.AcHandMobiVestiaire===1,row.AcHandMobiSanitairePublic===1,row.AcHandMobiSanitaireSportif===1,row.AccueilClub === 1,row.AccueilSalledeReunion===1,row.AccueilBuvette===1,row.AccueilInfirmerie===1,row.AccueilReception===1,row.AccueilLocalRangement===1,row.NbcouloirEscalade,row.Hauteurescalade,row.Surfaceescalade,row.Nbairesdesaut,row.Nbairesauthauteur,row.Nbairessautlongueur,row.Nbairessautlongueurettriplesaut,row.Nbairessautsautoirperche,row.Nbaireslancer,row.Nbairespoid,row.Nbairesdisque,row.Nbairesjavelot,row.Nombreairesmarteau,row.Nombreaireslancermixtedisquemarteau,row.Longueurbassin,row.Largeurbassin,row.Profondeurmini,row.Profondeurmaxi,row.Nbtotaltremplins));
            });

            return activ;

        });

    }
    getEquipementparinstal(id){

        let sqlRequest = "SELECT * FROM equipement where NumInstallation = $id";
        let sqlParams = {$id: id};

        return this.common.findAll(sqlRequest,sqlParams).then(rows => {

            let activ = [];

            rows.forEach(function (row) {
                activ.push(new Equipement(row.Numequipement,row.Equipement,row.NumInstallation,row.Typeequipement,row.Proprietaire,row.Gestionnaire,row.Eclairage ===1,row.Sallepolyvalente ===1,row.EtabPleinAir===1,row.EtabSportifCouvert===1,row.NbplaceTribune,row.Typedusol,row.AireEvolLongueur,row.AireEvolLargeur,row.NbCouloir,row.NbVerstiaireStortif,row.SonoFixe===1,row.TableauFixe===1,row.Chronometrage===1,row.SanitairePublic===1,row.AcHandMobiAireEvol===1,row.AcHandMobiTribune===1,row.AcHandMobiVestiaire===1,row.AcHandMobiSanitairePublic===1,row.AcHandMobiSanitaireSportif===1,row.AccueilClub === 1,row.AccueilSalledeReunion===1,row.AccueilBuvette===1,row.AccueilInfirmerie===1,row.AccueilReception===1,row.AccueilLocalRangement===1,row.NbcouloirEscalade,row.Hauteurescalade,row.Surfaceescalade,row.Nbairesdesaut,row.Nbairesauthauteur,row.Nbairessautlongueur,row.Nbairessautlongueurettriplesaut,row.Nbairessautsautoirperche,row.Nbaireslancer,row.Nbairespoid,row.Nbairesdisque,row.Nbairesjavelot,row.Nombreairesmarteau,row.Nombreaireslancermixtedisquemarteau,row.Longueurbassin,row.Largeurbassin,row.Profondeurmini,row.Profondeurmaxi,row.Nbtotaltremplins));
            });

            return activ;

        });

    }
}

module.exports = EquipementDao;