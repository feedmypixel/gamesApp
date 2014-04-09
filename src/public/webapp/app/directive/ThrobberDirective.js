(function( angular ){
    'use strict';

    var gamesAppDirective = angular.module( 'gamesApp.directive' );

    gamesAppDirective.directive( 'throbber', [ 'HttpStatus', function( HttpStatus ){

        return {

            restrict: 'E',

            template: '<div class="font-size-30pt icon-throbber" ng-show="throbber.isInProgress()"></div>',

            link: function( scope, element, attributes){

                scope.throbber = HttpStatus;
            }
        }
    } ] );

}( angular ) );