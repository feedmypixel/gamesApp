(function( angular ){
    'use strict';

    var FADEOUT_CLASS_TIMEOUT   = 2000;
    var gamesAppDirective       = angular.module( 'gamesApp.directive' );

    gamesAppDirective.directive( 'flashMessage', [ '$timeout', 'FlashMessageService', function( $timeout, FlashMessageService ){

        return {

            restrict: 'E',

            templateUrl: '/templates/FlashMessageTemplate.html',

            link: function( scope, element, attributes ){

                scope.$on( 'flash:message', function(){

                    scope.flashMessage = FlashMessageService.getMessage();

                    if( scope.flashMessage ){

                        $timeout( function(){

                            element.addClass( 'fade' );

                        }, FADEOUT_CLASS_TIMEOUT );
                    }
                } );
            }
        };

    } ] );

}( angular ) );