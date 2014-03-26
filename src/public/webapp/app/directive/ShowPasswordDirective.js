(function( angular ){
    'use strict';

    var gamesAppDirective = angular.module( 'gamesApp.directive' );

    gamesAppDirective.directive( 'showPassword', function(){

        return {

            restrict: 'E',

            scope: {

                passwordInputType: '='
            },

            templateUrl: '/templates/ShowPasswordTemplate.html',

            link: function( scope, element, attributes ){

                scope.passwordInputType = 'password';
            }
        };

    } );

}( angular ) );