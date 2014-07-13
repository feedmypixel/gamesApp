'use strict';

var game = require( '../model/game' ).model;
var gameTitlesJSON = require( '../data/gameTitles' );

function populateGameTitlesCollection(){

    gameTitlesJSON.games.forEach( function( gameTitle ){

        var newGame = new game();

        newGame.id = gameTitle.id;
        newGame.name = gameTitle.name;
        newGame.description = gameTitle.description;

        newGame.save();
    } );

    console.log( 'db - gameTitles collection populated' );
}

module.exports.start = function( db ){

    // remove gameTitles collection
    db.collections['gameTitles'].drop( function( err ){

        console.log( 'db - gameTitles collection dropped' );
        populateGameTitlesCollection();
    } );
};