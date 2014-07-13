(function( angular ){
    'use strict';

    var PASSWORD_INPUT_TYPE = 'password';
    var showPasswordDirective = angular.module( 'gamesApp.showPasswordDirective', [] );

    showPasswordDirective.directive( 'showPassword', function(){

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