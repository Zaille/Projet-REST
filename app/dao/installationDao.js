/* Load Car entity */
//const Ville = require('../model/ville');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');
const Installation = require('../model/installation');
/**
 * Car Data Access Object
 */
class InstallationDao {

    constructor() {
        this.common = new daoCommon();
    }


    listdepartement() {
        let sqlRequest = "SELECT CodeDepartement,NomDepartement FROM installations group by 1,2 ";
        return this.common.findAll(sqlRequest).then(row => {

                console.log(row)
                return row;

        });


    };

    listville() {
        let sqlRequest = "SELECT CodePostal, NomCommune FROM installations group by 1,2";

        return this.common.findAll(sqlRequest).then(row => {
            console.log(row);
            return row;
        });

    };
    getVillesId(id){
        let sqlRequest = "SELECT * FROM installations where NomCommune like $id";
        let sqlParams = {$id: id};
        return this.common.findAll(sqlRequest,sqlParams).then(rows => {
            let instal = [];
            rows.forEach(function (row) {
                console.log(row.NumInstallation+row.NomInstallation+row.CodeINSEE+row.CodeDepartement+row.CodePostal+row.NomDepartement+row.NomCommune+row.Adresse +row.LocX +row.LocY);

                instal.push(new Installation(row.NumInstallation,row.NomInstallation ,row.CodeINSEE ,row.CodeDepartement ,row.CodePostal ,row.NomDepartement ,row.NomCommune ,row.Adresse ,row.LocX ,row.LocY ,row.DesserteBus,row.DesserteTrain,row.DesserteTram,row.InstalParticuliere,row.AccessibleHandicapés,row.NbplaceParking,row.NbplaceParkingHandicapés));

            });
            console.log(instal);
            return instal;
        });
    }

    findAll() {
        let sqlRequest = "SELECT * FROM installations";
        return this.common.findAll(sqlRequest).then(rows => {
            let cars = [];
            for (const row of rows) {
                cars.push(new Car(row.id, row.maker, row.model, row.year, row.driver));
            }
            return cars;
        });
    };





}

module.exports = InstallationDao;