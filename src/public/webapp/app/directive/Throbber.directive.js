(function( angular ){
    'use strict';

    var throbberDirective = angular.module( 'gamesApp.throbberDirective', [] );

    throbberDirective.directive( 'throbber', [ 'HttpStatus', function( HttpStatus ){

        return {

            restrict: 'E',

            template: '<div class="font-size-30pt icon-throbber" ng-show="throbber.isInProgress()"></div>',

            link: function( scope, element, attributes){

                scope.throbber = HttpStatus;
            }
        }
    } ] );

}( angular ) );