'use strict';
var NOT_ACCEPTABLE = '406';
var NOT_AUTHORIZED = '401';
var passport = require( 'passport' );

module.exports.signinAction = function( req, res, next ){

    passport.authenticate( 'local-login', function( err, user, message ){

        if( err ){
            return next( err );
        }

        if( !user ){

            return res.send( NOT_ACCEPTABLE, {
                message: message
            } );
        }

        req.logIn( user, function( err ){

            if( err ){
                return next( err );
            }

            return res.send( {
                redirectTo: '/',
                message: 'Congratulations your are now signed in!',
                userId: user._id
            } );
        } );

    } )( req, res, next );
};

module.exports.registerAction = function( req, res, next ){

    passport.authenticate( 'local-signup', function( err, user, message ){

        if( err ){

            return next( err );
        }

        if( !user ){
            return res.send( NOT_AUTHORIZED, {
                message: message
            } );
        }

        req.logIn( user, function( err ){

            if( err ){
                return next( err );
            }

            return res.send( {
                redirectTo: '/',
                message: message,
                userId: user._id
            } );
        } );

    } )( req, res, next );
};

module.exports.signoutAction = function( req, res ){

    req.logout();

    return res.send( {
        redirectTo: '/',
        message: 'All logged out! Bye bye and see you soon :)'
    } );
};

module.exports.userDetailAction = function( req, res ){

    res.json( req.isAuthenticated() ? req.user : 'not authenticated' );
};