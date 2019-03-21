"use strict";

const daoCommon = require('./commons/daoCommon');

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

            console.log(row);
            return row;

        });

    };

}

module.exports = ActivitesDao;