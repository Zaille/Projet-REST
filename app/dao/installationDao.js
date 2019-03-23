"use strict";

//const Ville = require('../model/ville');

const daoCommon = require('./commons/daoCommon');
const Installation = require('../model/installation');

/**
 * Installation Data Access Object
 */
class InstallationDao {

    constructor() {
        this.common = new daoCommon();
    }


    listdepartement() {

        let sqlRequest = "SELECT CodeDepartement,NomDepartement FROM installations group by 1,2";
        return this.common.findAll(sqlRequest).then(row => {
             return row;
        });

    };

    listville() {

        let sqlRequest = "SELECT NomCommune FROM installations group by 1 order by 1";

        return this.common.findAll(sqlRequest).then(row => {
            return row;
        });

    };

    getVillesId(id){
        let sqlRequest = "SELECT * FROM installations where NomCommune like $id";
        let sqlParams = {$id: id};
        return this.common.findAll(sqlRequest,sqlParams).then(rows => {
            let instal = [];
            rows.forEach(function (row) {
                instal.push(new Installation(row.NumInstallation,row.NomInstallation ,row.CodeINSEE ,row.CodeDepartement ,row.CodePostal ,row.NomDepartement ,row.NomCommune ,row.Adresse ,row.LocX ,row.LocY ,row.DesserteBus,row.DesserteTrain,row.DesserteTram,row.InstalParticuliere,row.AccessibleHandicapés,row.NbplaceParking,row.NbplaceParkingHandicapés));
            });

            return instal;
        });
    }

}

module.exports = InstallationDao;