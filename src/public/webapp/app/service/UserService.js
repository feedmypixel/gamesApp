(function( angular, JSON ){
    'use strict';

    var USER_SESSION_NAME = 'user';
    var gamesAppService = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'UserService', [ '$window', function( $window ){

        return {

            storeUserDetail: function( userDetail ){

                $window.sessionStorage.setItem( USER_SESSION_NAME, JSON.stringify( userDetail ) );
            },

            getSessionId: function(){

                var user = JSON.parse( $window.sessionStorage.getItem( USER_SESSION_NAME ) );

                return user && ( user.sessionId && user.sessionId );
            },

            getUserId: function(){

                var user = JSON.parse( $window.sessionStorage.getItem( USER_SESSION_NAME ) );

                return user && ( user.userId && user.userId );
            },

            isLoggedIn: function(){

                return !!this.getSessionId();
            },

            logout: function(){

                $window.sessionStorage.removeItem( USER_SESSION_NAME );

            }
        }

    } ] );

}( angular, JSON ) );