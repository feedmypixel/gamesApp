'use strict';

var API_VERSION         = '/v1';
var authController      = require( './controller/authController' );
var userController      = require( './controller/userController' );
var gameController      = require( './controller/gameController' );
var path                = require( 'path' );
var pathToAngularIndex  = path.resolve( __dirname + '/../public/index.html' );
var authSentry          = require( './middleware/authSentry' );


module.exports = function( express, app ){

    var router = express.Router();

    router.put( API_VERSION + '/register', authController.registerAction );

    router.post( API_VERSION + '/signin', authController.signinAction );

    router.post( API_VERSION + '/signout', authController.signoutAction );

    router.route( API_VERSION + '/user/profile' )
        .get( authSentry, userController.getProfileDetailAction )
        .put( authSentry, userController.setProfileDetailAction );

    router.get( API_VERSION + '/user/profile/titles', authSentry, userController.getUserGameTitles );

    router.route( API_VERSION + '/user/profile/titles/alter' )
        .put( authSentry, userController.addUserGameTitle )
        .delete( authSentry, userController.deleteUserGameTitle );

    router.get( API_VERSION + '/gametitles/list', gameController.gameTitlesAction );

    router.get( API_VERSION + '/user/details', authController.userDetailAction );

    router.get( '*', function( req, res, next ){

        res.sendfile( pathToAngularIndex );
    } );

    app.use( router );
};