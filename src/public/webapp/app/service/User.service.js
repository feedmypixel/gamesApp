(function( angular, JSON ){
    'use strict';

    var USER_ID_SESSION_NAME = 'userId';
    var userService = angular.module( 'gamesApp.userService', [] );

    userService.factory( 'UserService', [ '$window', function( $window ){

        return {

            storeUserDetail: function( userId ){

                $window.sessionStorage.setItem( USER_ID_SESSION_NAME, userId );
            },

            getUserId: function(){

                return $window.sessionStorage.getItem( USER_ID_SESSION_NAME );
            },

            isLoggedIn: function(){

                return !!this.getUserId();
            },

            logout: function(){

                $window.sessionStorage.removeItem( USER_ID_SESSION_NAME );

            }
        }

    } ] );

}( angular, JSON ) );