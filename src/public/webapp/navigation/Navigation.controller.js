(function( angular ){
    'use strict';

    var navigationController = angular.module( 'gamesApp.navigationController', [] );

    var NavigationController = function( $scope, UserService ){

        $scope.user = UserService;
    };

    NavigationController.$inject = [ '$scope', 'UserService' ];

    navigationController.controller( 'NavigationController', NavigationController );

}( angular ) );