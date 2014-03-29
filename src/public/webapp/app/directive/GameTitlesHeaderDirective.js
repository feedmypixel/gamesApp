(function( angular ){
    'use strict';

    var gamesAppDirective = angular.module( 'gamesApp.directive' );

    gamesAppDirective.directive( 'gameTitlesHeader', [ 'UserService', function( UserService ){

        return {

            restrict: 'E',

            templateUrl: '/views/templates/GameTitlesHeaderTemplate.html',

            link: function( scope ){

                scope.user = UserService;
            }
        }
    } ] );

}( angular ) );