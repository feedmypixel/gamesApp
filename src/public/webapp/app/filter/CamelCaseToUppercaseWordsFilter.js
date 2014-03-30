(function( angular ){
    'use strict';

    var gamesAppFilter = angular.module( 'gamesApp.filter' );

    gamesAppFilter.filter( 'camelCaseToUppercaseWords', function(){

        return function( string ){

            var words = string.split( /(?=[A-Z])/ );
            var firstWord = words.shift();

            words.unshift( firstWord[ 0 ].toUpperCase() + firstWord.slice( 1 ) );

            return words.join( ' ' );
        };
    });
}( angular ) );