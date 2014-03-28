(function( angular ){
    'use strict';

    var gamesAppController = angular.module( 'gamesApp.controller' );

    var NavigationController = function( $scope, UserService ){

        $scope.user = UserService;
    };

    NavigationController.$inject = [ '$scope', 'UserService' ];

    gamesAppController.controller( 'NavigationController', NavigationController );

}( angular ) );