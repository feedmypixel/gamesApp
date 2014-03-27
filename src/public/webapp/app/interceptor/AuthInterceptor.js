(function( angular ){
    'use strict';

    var gamesAppService = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'AuthInterceptor', [ '$q', '$window', 'FlashMessageService', function( $q, $window, FlashMessageService ){

        return {

            request: function( config ){

                var sessionId = $window.sessionStorage.getItem( 'sessionId' );

                config.headers = config.headers || {};

                if( sessionId ){

                    config.headers.sessionId = sessionId;
                }

                console.log( config, 'request' );

                return config || $q.when( config );
            },

            requestError: function( rejection ){

                console.log( rejection, 'requestError' );

                return $q.reject( rejection );
            },

            response: function( response ){

                console.log( response, 'response' );

                return response || $q.when( response );
            },

            responseError: function( rejection ){

                console.log( rejection, 'responseError' );

                switch( rejection.status ){

                    case 401:
                        break;

                    case 403:

                        break;

                    case 500:
                        break;

                    default:

                        FlashMessageService.setMessage( {

                            type: 'failure',
                            msg: 'there has been an error!'

                        } );

                }

                return $q.reject( rejection );
            }
        };

    } ] );

}( angular ));