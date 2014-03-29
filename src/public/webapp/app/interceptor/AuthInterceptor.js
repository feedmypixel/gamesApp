(function( angular ){
    'use strict';

    var INDEX_PAGE_URL                  = '/';
    var SIGNIN_PAGE_URL                 = '/signin';
    var REGISTER_PAGE_URL               = '/register';
    var UNAUTHORIZED_MESSAGE            = 'You need to login to view that page!';
    var DEFAULT_ERROR_RESPONSE_MESSAGE  = 'there has been an error!';
    var gamesAppService                 = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'AuthInterceptor', [ '$q', '$location', 'FlashMessageService', 'UserService', function( $q, $location, FlashMessageService, UserService ){

        return {

            request: function( config ){

                var sessionToken = UserService.getSessionId();
                var locationPath = $location.path();

                config.headers = config.headers || {};

                if( sessionToken ){

                    config.headers.sessionId = sessionToken;
                }

                if( !sessionToken && INDEX_PAGE_URL !== locationPath && SIGNIN_PAGE_URL !== locationPath && REGISTER_PAGE_URL !== locationPath ){

                    $location.path( INDEX_PAGE_URL );
                    FlashMessageService.setInformationMessage( UNAUTHORIZED_MESSAGE );
                }

                console.log( config, 'request' );

                return config || $q.when( config );
            },

            response: function( response ){

                console.log( response, 'response' );

                return response || $q.when( response );
            },


            requestError: function( rejection ){

                console.log( rejection, 'requestError' );

                return $q.reject( rejection );
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

                        FlashMessageService.setErrorMessage( DEFAULT_ERROR_RESPONSE_MESSAGE );
                        rejection.data = { status: 401, description: 'unauthorized' }
                        break;
                }

                return $q.reject( rejection );
            }
        };

    } ] );

}( angular ));