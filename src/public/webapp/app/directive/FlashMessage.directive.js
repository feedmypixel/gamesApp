(function( angular ){
    'use strict';

    var FADE_CLASS_NAME         = 'flash-fade';
    var FADEOUT_CLASS_TIMEOUT   = 4000;
    var flashMessageDirective = angular.module( 'gamesApp.flashMessageDirective', [] );

    flashMessageDirective.directive( 'flashMessage', [ '$timeout', 'FlashMessageService', function( $timeout, FlashMessageService ){

        return {

            restrict: 'E',

            templateUrl: '/views/templates/FlashMessageTemplate.html',

            link: function( scope, element ){

                var timer;

                scope.$on( 'flash:message', function(){

                    scope.flashMessage = FlashMessageService.getMessage();

                    if( scope.flashMessage ){

                        var $paragraphElem = element.find( 'p' );

                        $paragraphElem.removeClass( FADE_CLASS_NAME );

                        if( timer ){
                            $timeout.cancel( timer );
                        }

                        timer = $timeout( function(){

                            $paragraphElem.addClass( FADE_CLASS_NAME );

                        }, FADEOUT_CLASS_TIMEOUT );
                    }
                } );
            }
        };

    } ] );

}( angular ) );