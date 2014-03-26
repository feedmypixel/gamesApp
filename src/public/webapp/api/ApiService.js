(function( angular ){
    'use strict';

    var gamesAppService = angular.module( 'gamesApp.service' );

    gamesAppService.factory( 'ApiService', [ '$resource', function( $resource ){

        var HOST = 'http://217.18.25.29:10070';
        var GAMES_TITLES_URL = '/gametitles/list';

        return $resource( null, {}, {

            getAllGameTitles: { url: HOST + GAMES_TITLES_URL, method: 'GET', isArray: false }

        });

    } ] );

}( angular ) );