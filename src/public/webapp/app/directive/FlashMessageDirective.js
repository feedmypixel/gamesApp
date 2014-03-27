(function( angular ){
    'use strict';

    var gamesAppDirective = angular.module( 'gamesApp.directive' );

    gamesAppDirective.directive( 'flashMessage', [ '$timeout', 'FlashMessageService', function( $timeout, FlashMessageService ){

        return {

            restrict: 'E',

            template: '<p ng-show="isFlashMsgAvailable"></p>',

            link: function( scope, element, attributes ){

                scope.$on( 'flash:message', function(){

                    var flashMsg = FlashMessageService.getMessage();

                    scope.isFlashMsgAvailable = flashMsg;

                    element.addClass( flashMsg.className );
                    element.text( flashMsg.msg );

                    $timeout( function(){

                        element.addClass( 'fade' );

                    }, 1000 );
                });
            }
        };

    } ] );

}( angular ) );