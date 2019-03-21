/* Load Car entity */
//const Ville = require('../model/ville');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

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

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM car";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Car
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Car) {
        let sqlRequest = "UPDATE car SET " +
            "maker=$maker, " +
            "model=$model, " +
            "year=$year, " +
            "driver=$driver " +
            "WHERE id=$id";

        let sqlParams = {
            $maker: Car.maker,
            $model: Car.model,
            $year: Car.year,
            $driver: Car.driver,
            $id: Car.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Car
     * returns database insertion status
     */
    create(Car) {
        let sqlRequest = "INSERT into car (maker, model, year, driver) " +
            "VALUES ($maker, $model, $year, $driver)";
        let sqlParams = {
            $maker: Car.maker,
            $model: Car.model,
            $year: Car.year,
            $driver: Car.driver
        };
        return this.common.run(sqlRequest, sqlParams);
    };


}

module.exports = InstallationDao;