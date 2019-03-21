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
                activ.push(new Equipement(row.Numequipement,row.Equipement,row.NumInstallation,row.Typeequipement,row.Proprietaire,row.Gestionnaire,row.Eclairage,row.Sallepolyvalente,row.EtabPleinAir,row.EtabSportifCouvert,row.NbplaceTribune,row.Typedusol,row.AireEvolLongueur,row.AireEvolLargeur,row.NbCouloir,row.NbVerstiaireStortif,row.SonoFixe,row.TableauFixe,row.Chronometrage,row.SanitairePublic,row.AcHandMobiAireEvol,row.AcHandMobiTribune,row.AcHandMobiVestiaire,row.AcHandMobiSanitairePublic,row.AcHandMobiSanitaireSportif,row.AccueilClub,row.AccueilSalledeReunion,row.AccueilBuvette,row.AccueilInfirmerie,row.AccueilReception,row.AccueilLocalRangement,row.NbcouloirEscalade,row.Hauteurescalade,row.Surfaceescalade,row.Nbairesdesaut,row.Nbairesauthauteur,row.Nbairessautlongueur,row.Nbairessautlongueurettriplesaut,row.Nbairessautsautoirperche,row.Nbaireslancer,row.Nbairespoid,row.Nbairesdisque,row.Nbairesjavelot,row.Nombreairesmarteau,row.Nombreaireslancermixtedisquemarteau,row.Longueurbassin,row.Largeurbassin,row.Profondeurmini,row.Profondeurmaxi,row.Nbtotaltremplins));
            });

            return activ;

        });

    }

}

module.exports = EquipementDao;