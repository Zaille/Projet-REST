    "use strict";

const daoCommon = require('./commons/daoCommon');
const Activite = require('../model/activite');

/**
 * Activites Data Access Object
 */
class ActivitesDao {

    constructor() {
        this.common = new daoCommon();
    }

    listActivites() {

        let sqlRequest = "SELECT Activitecode,Activitelibelle FROM activites group by 1,2";
        return this.common.findAll(sqlRequest).then(row => {

            return row;

        });

    };

    getActivitesId(id){

        let sqlRequest = "SELECT * FROM activites where Activitecode like $id";
        let sqlParams = {$id: id};

        return this.common.findAll(sqlRequest,sqlParams).then(rows => {

            let activ = [];

            rows.forEach(function (row) {
                activ.push(new Activite(row.Activitecode,row.Activitelibelle,row.Numerodelaficheequipement,row.Niveaudelactivite));
            });

            return activ;

        });

    }

    getactquip(id) {

        let sqlRequest = "SELECT * FROM activites where Numerodelaficheequipement = $id";
        let sqlParams = {$id: id};

        return this.common.findAll(sqlRequest, sqlParams).then(rows => {

            let activ = [];

            rows.forEach(function (row) {
                activ.push(new Activite(row.Activitecode, row.Activitelibelle, row.Numerodelaficheequipement, row.Niveaudelactivite));
            });

            return activ;

        });
    }


}

module.exports = ActivitesDao;