/*jslint node: true */
'use strict';

var database = require( './database' );
var passport = require( './passport' );


module.exports = {

    database: database,

    passport: passport,

    detail: {

        port: 8090
    }
};
