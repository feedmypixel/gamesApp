(function( angular ){
    'use strict';

    var PASSWORD_INPUT_TYPE = 'password';
    var gamesAppDirective = angular.module( 'gamesApp.directive' );

    gamesAppDirective.directive( 'showPassword', function(){

        return {

            restrict: 'E',

            scope: {

                passwordInputType: '='
            },

            templateUrl: '/views/templates/ShowPasswordTemplate.html',

            link: function( scope ){

                scope.passwordInputType = PASSWORD_INPUT_TYPE;
            }
        };

    } );

}( angular ) );