(function( angular ){
    'use strict';

    var gamesAppService = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'FlashMessageService', [ '$rootScope', function( $rootScope ){

        var SUCCESS_MESSAGE_TYPE = 'flash-success';
        var ERROR_MESSAGE_TYPE   = 'flash-error';
        var INFO_MESSAGE_TYPE    = 'flash-info';
        var message;

        var setMessage = function( messageDetail ){

            message = messageDetail;

            $rootScope.$broadcast( 'flash:message' );
        };

        return {

            setSuccessMessage: function( message ){

                setMessage( { type: SUCCESS_MESSAGE_TYPE, msg: message } );
            },

            setErrorMessage: function( message ){

                setMessage( { type: ERROR_MESSAGE_TYPE, msg: message } );
            },

            setInformationMessage: function( message ){

                setMessage( { type: INFO_MESSAGE_TYPE, msg: message } );
            },

            getMessage: function(){

                return message;
            }
        };

    } ] );

}( angular ) );