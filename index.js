/* Load modules */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/* Database configuration */
const database =                                                                                                                                                                                                                                                                                                                                                                                                                                                        require('./app/config/dbconfig');

/** Init database **/

//database.init();

/** Init server listening **/
const port = process.argv[2] || 3000;
app.listen(port, function () {
    console.log("Server listening on port : " + port);
});

/** Express configuration **/
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Router configuration */
const REST_API_ROOT = '/api';

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(REST_API_ROOT, require('./app/routes/router'));

