(function( angular ){
    'use strict';

    var preserveObjectOrderFilter = angular.module( 'gamesApp.preserveObjectOrderFilter', [] );

    preserveObjectOrderFilter.filter( 'preserveObjectOrder', function(){

        return function( obj ){

            if( !obj ){

                return [];
            }

            return Object.keys( obj ).map( function( key ){

                var newObj = {};
                newObj[ key ] = obj[ key ];

                return newObj;
            } );
        }
    } );

}( angular ) );