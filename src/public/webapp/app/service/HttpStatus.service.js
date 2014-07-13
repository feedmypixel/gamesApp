(function( angular ){
    'use strict';

    var httpStatusService = angular.module( 'gamesApp.httpStatusService', [] );

    httpStatusService.factory( 'HttpStatus', function(){

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