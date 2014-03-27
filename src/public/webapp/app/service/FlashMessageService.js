(function( angular ){
    'use strict';

    var gamesAppService = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'FlashMessageService', [ '$rootScope', function( $rootScope ){

        var currentMessage;

        return {

            setMessage: function( message ){

                currentMessage = message;

                $rootScope.$broadcast( 'flash:message' );
            },

            getMessage: function(){

                return currentMessage;
            }
        };

    } ] );

}( angular ) );