(function( angular ){
    'use strict';

    var INDEX_PAGE_URL                  = '/';
    var SIGNIN_PAGE_URL                 = '/signin';
    var REGISTER_PAGE_URL               = '/register';
    var UNAUTHORIZED_MESSAGE            = 'You need to login to view that page!';
    var DEFAULT_ERROR_RESPONSE_MESSAGE  = 'There has been an error!';
    var ERROR_RESPONSE_MESSAGE_403      = 'Sorry that is just not allowed!';
    var DESCRIPTION_403                 = 'Forbidden';
    var DESCRIPTION_406                 = 'Not Acceptable';
    var DESCRIPTION_409                 = 'Conflict';
    var DESCRIPTION_500                 = 'Internal Server Error';
    var gamesAppService                 = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'HttpInterceptor', [ '$q', '$location', 'FlashMessageService', 'UserService', function( $q, $location, FlashMessageService, UserService ){

        return {

            request: function( config ){

                var sessionToken = UserService.getSessionId();
                var locationPath = $location.path();

                config.headers = config.headers || {};

                if( sessionToken ){

                    config.headers.sessionId = sessionToken;
                }

                // route to Index if not authorized and trying to access a page that requires authorization
                if( !sessionToken && INDEX_PAGE_URL !== locationPath && SIGNIN_PAGE_URL !== locationPath && REGISTER_PAGE_URL !== locationPath ){

                    $location.path( INDEX_PAGE_URL );
                    FlashMessageService.setInformationMessage( UNAUTHORIZED_MESSAGE );
                }

                return config || $q.when( config );
            },

            response: function( response ){

                return response || $q.when( response );
            },


            requestError: function( rejection ){

                return $q.reject( rejection );
            },

            responseError: function( rejection ){

                switch( rejection.status ){


                    case 403:

                        FlashMessageService.setErrorMessage( ERROR_RESPONSE_MESSAGE_403 );
                        rejection.data = { status: 403, description: DESCRIPTION_403 };

                        break;

                    case 409:

                        FlashMessageService.setErrorMessage( DEFAULT_ERROR_RESPONSE_MESSAGE );
                        rejection.data = { status: 409, description: DESCRIPTION_409 };

                        break;

                    case 500:

                        FlashMessageService.setErrorMessage( DEFAULT_ERROR_RESPONSE_MESSAGE );
                        rejection.data = { status: 500, description: DESCRIPTION_500 };

                        break;

                    default:

                        FlashMessageService.setErrorMessage( DEFAULT_ERROR_RESPONSE_MESSAGE );
                        rejection.data = { status: 406, description: DESCRIPTION_406 };
                        break;
                }

                return $q.reject( rejection );
            }
        };

    } ] );

}( angular ));