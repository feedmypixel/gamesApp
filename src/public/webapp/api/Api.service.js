(function( angular ){
    'use strict';

    var API_VERSION = '/v1';
    var apiService = angular.module( 'gamesApp.apiService', [ 'gamesApp.httpStatusService' ] );

    apiService.factory( 'ApiService', [ '$resource', function( $resource ){

        //TODO angular config service

        var HOST                    = 'http://localhost:8090';
        var GAMES_TITLES_URL        = '/gametitles/list';
        var REGISTER_USER_URL       = '/register';
        var SIGN_IN_USER_URL        = '/signin';
        var USER_URL                = '/user/profile';
        var USER_GAME_TITLES_URL    = '/user/profile/titles';
        var ALTER_USER_TITLE_URL    = '/user/profile/titles/alter';
        var LOGOUT_URL              = '/signout'

        return $resource( null, {}, {

            registerUser: { url: HOST + API_VERSION + REGISTER_USER_URL, method: 'PUT', isArray: false },

            signinUser: { url: HOST + API_VERSION + SIGN_IN_USER_URL, method: 'POST', isArray: false },

            getAllGameTitles: { url: HOST + API_VERSION + GAMES_TITLES_URL, method: 'GET', isArray: false },

            getUserDetail: { url: HOST + API_VERSION + USER_URL, method: 'GET', isArray: false },

            setUserDetail: { url: HOST + API_VERSION + USER_URL, method: 'PUT', isArray: false },

            getUserGameTitles: { url: HOST + API_VERSION + USER_GAME_TITLES_URL, method: 'GET', isArray: false },

            addUserTitle: { url: HOST + API_VERSION + ALTER_USER_TITLE_URL, method: 'PUT', isArray: false },

            deleteUserTitle: { url: HOST + API_VERSION + ALTER_USER_TITLE_URL, method: 'DELETE', isArray: false },

            logoutUser: { url: HOST + API_VERSION + LOGOUT_URL, method: 'POST', isArray: false }
        } );

    } ] );

}( angular ) );