'use strict';

var game = require( '../model/game' ).model;

module.exports.gameTitlesAction = function( req, res, next ){

    game.find().exec().then( function( gameTitles ){

        if( gameTitles ){

            return res.send( {
                titles: gameTitles
            } );

        } else {

            return res.send( {
                message: 'Sorry no game titles found!'
            } );

        }

    }, function( err ){

        return res.send( {
            error: err
        } );

    } );
}