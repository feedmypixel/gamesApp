'use strict';

var express             = require( 'express' );
var morgan              = require( 'morgan' );
var app                 = express();
var path                = require( 'path' );
var pathToAngularIndex  = path.resolve( __dirname + '/../public/index.html' );
var port                = 8089;

app.use( express.static( __dirname + '/../public' ) );
app.use( morgan( 'dev' ) );

app.route( '*' ).get( function( req, res, next ){

    res.sendfile( pathToAngularIndex );
} );

app.listen( port , function(){

    console.log( 'Server listening on port: ' + port );

} );