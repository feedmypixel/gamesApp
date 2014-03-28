(function( angular ){
    'use strict';

    var DEFAULT_ERROR_RESPONSE_MESSAGE  = 'there has been an error!';
    var gamesAppService                 = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'AuthInterceptor', [ '$q', 'FlashMessageService', 'UserService', function( $q, FlashMessageService, UserService ){

        return {

            request: function( config ){

                var sessionToken = UserService.getSessionId();

                config.headers = config.headers || {};

                if( sessionToken ){

                    config.headers.sessionId = sessionToken;
                }

                //console.log( config, 'request' );

                return config || $q.when( config );
            },

            requestError: function( rejection ){

                //console.log( rejection, 'requestError' );

                return $q.reject( rejection );
            },

            response: function( response ){

                //console.log( response, 'response' );

                return response || $q.when( response );
            },

            responseError: function( rejection ){

                //console.log( rejection, 'responseError' );

                switch( rejection.status ){

                    case 401:

                        break;

                    case 403:

                        break;

                    case 500:

                        break;

                    default:

                        FlashMessageService.setErrorMessage( DEFAULT_ERROR_RESPONSE_MESSAGE );
                        break;
                }

                return $q.reject( rejection );
            }
        };

    } ] );

}( angular ));