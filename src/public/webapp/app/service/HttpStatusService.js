(function( angular ){
    'use strict';

    var gamesAppService = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'HttpStatus', function(){

        var BOOLEAN_FALSE = false;
        var BOOLEAN_TRUE = true;

        var httpIsInProgress = BOOLEAN_FALSE;

        return {

            inProgress: function(){

                httpIsInProgress = BOOLEAN_TRUE;
            },

            finished: function(){

                httpIsInProgress = BOOLEAN_FALSE;

            },

            isInProgress: function(){

                return httpIsInProgress;
            }
        };
    });


}( angular ) );