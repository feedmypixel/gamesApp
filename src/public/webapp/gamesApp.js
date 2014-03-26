(function( angular ){
    'use strict';

    var gamesApp = angular.module( 'gamesApp', [

        'ngRoute',
        'ngResource',
        'gamesApp.controller',
        'gamesApp.service',
        'gamesApp.directive'

    ]);

    gamesApp.config( [ '$httpProvider', '$routeProvider', '$locationProvider', function( $httpProvider, $routeProvider, $locationProvider ){

        $httpProvider.defaults.withCredentials = true;

        $routeProvider.when( '/', {

            templateUrl: '/partials/index.html',
            controller: 'IndexController'

        } ).when( '/login', {

            templateUrl: '/partials/login.html',
            controller: 'LoginController'

        } ).when( '/register', {

            templateUrl: '/partials/register.html',
            controller: 'RegisterController'

        } ).otherwise( { redirectTo: '/' } );

        $locationProvider.html5Mode( true ).hashPrefix( '!' );

    } ] );

    // init app modules
    angular.module( 'gamesApp.controller', [] );
    angular.module( 'gamesApp.service', [] );
    angular.module( 'gamesApp.directive', [] );

}( angular ) );