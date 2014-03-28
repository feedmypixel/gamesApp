(function( angular ){
    'use strict';

    var gamesAppService = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'ApiService', [ '$resource', function( $resource ){

        var HOST                = 'http://217.18.25.29:10070';
        var GAMES_TITLES_URL    = '/gametitles/list';
        var REGISTER_USER_URL   = '/register/:username';
        var SIGN_IN_USER_URL    = '/signin/:username/:password';
        var USER_URL            = '/profile/:userId';

        return $resource( null, {}, {

            registerUser: { url: HOST + REGISTER_USER_URL, method: 'PUT', isArray: false, params: { username: '@username' } },

            signinUser: { url: HOST + SIGN_IN_USER_URL, method: 'GET', isArray: false, params: { username: '@username', password: '@password' } },

            getAllGameTitles: { url: HOST + GAMES_TITLES_URL, method: 'GET', isArray: false },

            getUserDetail: {
                data: {},
                url: HOST + USER_URL,
                method: 'GET',
                isArray: false,
                params: { userId: '@userId' },
                headers: { 'Content-Type': 'application/json; charset=UTF-8' }
            },

            setUserDetail: { url: HOST + USER_URL, method: 'PUT', isArray: false, params: { userId: '@userId' } }

        });

    } ] );

}( angular ) );