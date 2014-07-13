(function( angular ){
    'use strict';

    var INDEX_PAGE_URL                  = '/';
    var SIGNIN_PAGE_URL                 = '/signin';
    var REGISTER_PAGE_URL               = '/register';
    var DEFAULT_ERROR_RESPONSE_MESSAGE  = 'There has been an error!';
    var httpInterceptor                 = angular.module( 'gamesApp.httpInterceptor', [] );

    httpInterceptor.factory( 'HttpInterceptor', [ '$q', '$location', 'FlashMessageService', 'UserService', 'HttpStatus',
        function( $q, $location, FlashMessageService, UserService, HttpStatus ){

            return {

                request: function( config ){

                    var userId = UserService.getUserId();
                    var locationPath = $location.path();

                    /* route back to Index if not authorized and trying to access a page that requires authorization
                       this is also covered on the server but this stops the flash of content you get waiting for the
                       server to respond
                       */
                    if( !userId && INDEX_PAGE_URL !== locationPath && SIGNIN_PAGE_URL !== locationPath && REGISTER_PAGE_URL !== locationPath ){

                        $location.path( INDEX_PAGE_URL );
                    }

                    return config || $q.when( config );
                },

                response: function( response ){

                    var data = response.data && response.data;

                    if( data.redirectTo ){

                        $location.path( data.redirectTo );
                    }

                    FlashMessageService.setSuccessMessage( data.message );

                    return response || $q.when( response );
                },


                requestError: function( rejection ){

                    return $q.reject( rejection );
                },

                responseError: function( response ){

                    var data = response.data && response.data;
                    var errorMessage;

                    if( data.redirectTo ){

                        $location.path( data.redirectTo );
                    }

                    errorMessage = data.message || DEFAULT_ERROR_RESPONSE_MESSAGE;
                    FlashMessageService.setErrorMessage( errorMessage );

                    return $q.reject( response );
                }
            };

        }
    ] );

}( angular ));